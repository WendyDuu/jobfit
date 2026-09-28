import { z } from "zod";

const analysisItemSchema = z.string().trim().min(1).max(200);

export const jobAnalysisSchema = z
  .object({
    skills: z.array(analysisItemSchema).min(1).max(12),
    keywords: z.array(analysisItemSchema).min(1).max(15),
    duties: z.array(analysisItemSchema).min(1).max(12),
    bonuses: z.array(analysisItemSchema).max(12),
  })
  .strict();

export type JobAnalysis = z.infer<typeof jobAnalysisSchema>;

export const jobAnalysisJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    skills: {
      type: "array",
      description: "岗位要求的核心能力，使用简洁的中文短语。",
      minItems: 1,
      maxItems: 12,
      items: { type: "string", minLength: 1, maxLength: 200 },
    },
    keywords: {
      type: "array",
      description: "值得在求职材料中准确使用的岗位关键词。",
      minItems: 1,
      maxItems: 15,
      items: { type: "string", minLength: 1, maxLength: 200 },
    },
    duties: {
      type: "array",
      description: "JD 明确描述的主要岗位职责。",
      minItems: 1,
      maxItems: 12,
      items: { type: "string", minLength: 1, maxLength: 200 },
    },
    bonuses: {
      type: "array",
      description: "JD 中的优先条件或加分项；没有时返回空数组。",
      maxItems: 12,
      items: { type: "string", minLength: 1, maxLength: 200 },
    },
  },
  required: ["skills", "keywords", "duties", "bonuses"],
} as const;
