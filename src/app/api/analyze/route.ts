import { NextResponse } from "next/server";
import { z } from "zod";
import {
  jobAnalysisJsonSchema,
  jobAnalysisSchema,
} from "@/lib/job-analysis";

const requestSchema = z
  .object({
    jd: z.string().trim().min(1).max(12_000),
  })
  .strict();

const OPENAI_URL = "https://api.openai.com/v1/responses";
const REQUEST_TIMEOUT_MS = 25_000;

type OpenAIResponse = {
  output?: Array<{
    content?: Array<{ type?: string; text?: string }>;
  }>;
};

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("请求格式无效。", 400);
  }

  const parsedRequest = requestSchema.safeParse(body);
  if (!parsedRequest.success) {
    const isTooLong =
      typeof body === "object" &&
      body !== null &&
      "jd" in body &&
      typeof body.jd === "string" &&
      body.jd.trim().length > 12_000;

    return errorResponse(
      isTooLong ? "岗位描述不能超过 12,000 字。" : "请粘贴岗位描述后再分析。",
      400,
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("OPENAI_API_KEY is not configured");
    return errorResponse("分析服务暂未配置，请稍后再试。", 503);
  }

  try {
    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        instructions:
          "你是严谨的招聘岗位分析助手。只根据用户提供的 JD 提取信息，不推测未写明的要求。使用 JD 的语言回答；中文 JD 使用中文。合并重复项，保持每项简洁具体。",
        input: parsedRequest.data.jd,
        text: {
          format: {
            type: "json_schema",
            name: "job_analysis",
            strict: true,
            schema: jobAnalysisJsonSchema,
          },
        },
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error("OpenAI request failed", {
        status: response.status,
        requestId: response.headers.get("x-request-id"),
      });
      return errorResponse("AI 服务暂时不可用，请稍后重试。", 502);
    }

    const providerResult = (await response.json()) as OpenAIResponse;
    const outputText = providerResult.output
      ?.flatMap((item) => item.content ?? [])
      .find((content) => content.type === "output_text")?.text;

    if (!outputText) {
      console.error("OpenAI response did not contain output text");
      return errorResponse("AI 未能完成分析，请重试。", 502);
    }

    let analysisJson: unknown;
    try {
      analysisJson = JSON.parse(outputText);
    } catch {
      console.error("OpenAI returned invalid JSON");
      return errorResponse("AI 返回了无效结果，请重试。", 502);
    }

    const analysis = jobAnalysisSchema.safeParse(analysisJson);
    if (!analysis.success) {
      console.error("OpenAI response failed schema validation", {
        issues: analysis.error.issues.map((issue) => issue.path.join(".")),
      });
      return errorResponse("AI 返回的结果不完整，请重试。", 502);
    }

    return NextResponse.json({ analysis: analysis.data });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      return errorResponse("分析超时，请稍后重试。", 504);
    }

    console.error("Unexpected JD analysis error", error);
    return errorResponse("分析时发生错误，请稍后重试。", 500);
  }
}
