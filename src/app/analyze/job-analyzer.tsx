"use client";

import { useState } from "react";
import type { JobAnalysis } from "@/lib/job-analysis";

const exampleJd = `产品实习生

岗位职责：
1. 协助产品经理开展用户调研，整理并分析用户反馈；
2. 参与产品需求分析、原型设计和功能迭代；
3. 与设计、研发团队协作，跟进项目进度；
4. 关注核心业务数据，输出分析结论。

任职要求：
1. 本科或研究生在读，对互联网产品有热情；
2. 具备良好的逻辑分析、沟通表达和团队协作能力；
3. 熟悉 Axure、Figma 等原型工具，有 SQL 或数据分析经验者优先；
4. 有校园项目、产品设计比赛或相关实习经验者优先。`;

function SparkIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 1.5c.6 4.7 3.1 7.2 7.5 8.5-4.4 1.3-6.9 3.8-7.5 8.5C9.4 13.8 6.9 11.3 2.5 10 6.9 8.7 9.4 6.2 10 1.5Z" />
    </svg>
  );
}

export function JobAnalyzer() {
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<JobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!jd.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd }),
      });
      const data = (await response.json()) as {
        analysis?: JobAnalysis;
        error?: string;
      };

      if (!response.ok || !data.analysis) {
        throw new Error(data.error || "分析失败，请稍后重试。");
      }

      setResult(data.analysis);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "分析失败，请稍后重试。",
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="analyzer-shell">
      <section className="input-panel" aria-labelledby="jd-input-title">
        <div className="panel-heading">
          <div>
            <span className="panel-step">01</span>
            <h2 id="jd-input-title">粘贴岗位描述</h2>
          </div>
          <span className="privacy-hint">仅用于本次分析</span>
        </div>
        <div className="textarea-wrap">
          <textarea
            value={jd}
            maxLength={12_000}
            onChange={(event) => {
              setJd(event.target.value);
              setResult(null);
              setError(null);
            }}
            placeholder="在这里粘贴完整的岗位描述（JD）…"
            aria-describedby="jd-help"
          />
          <span className="char-count">
            {jd.length.toLocaleString("zh-CN")} 字
          </span>
        </div>
        <div className="input-actions">
          <button
            className="example-button"
            type="button"
            onClick={() => {
              setJd(exampleJd);
              setResult(null);
              setError(null);
            }}
          >
            使用示例 JD
          </button>
          <button
            className="button button-primary analyze-button"
            type="button"
            onClick={analyze}
            disabled={!jd.trim() || isAnalyzing}
          >
            <SparkIcon /> {isAnalyzing ? "正在分析…" : "分析岗位"}
          </button>
        </div>
        <p className="helper-text" id="jd-help">
          岗位描述会发送给 AI 服务进行本次分析，请勿粘贴敏感个人信息。
        </p>
        {error && (
          <p className="analysis-error" role="alert">
            {error}
          </p>
        )}
      </section>

      {result ? (
        <section className="results-section" aria-live="polite">
          <div className="results-title">
            <div>
              <span className="success-icon">✓</span>
              <div>
                <small>分析完成</small>
                <h2>岗位分析结果</h2>
              </div>
            </div>
            <span className="mock-label">AI 分析</span>
          </div>
          <div className="result-grid">
            <article className="analysis-card skills-card">
              <div className="analysis-card-heading">
                <span>✦</span>
                <h3>核心能力</h3>
                <i>{result.skills.length}</i>
              </div>
              <div className="skill-list">
                {result.skills.map((item, index) => (
                  <div key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </article>
            <article className="analysis-card">
              <div className="analysis-card-heading">
                <span>#</span>
                <h3>关键词</h3>
                <i>{result.keywords.length}</i>
              </div>
              <div className="keyword-list">
                {result.keywords.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
            <article className="analysis-card duties-card">
              <div className="analysis-card-heading">
                <span>≡</span>
                <h3>岗位职责</h3>
                <i>{result.duties.length}</i>
              </div>
              <ul>
                {result.duties.map((item) => (
                  <li key={item}>
                    <span>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="analysis-card bonus-card">
              <div className="analysis-card-heading">
                <span>＋</span>
                <h3>加分项</h3>
                <i>{result.bonuses.length}</i>
              </div>
              <ul>
                {result.bonuses.map((item) => (
                  <li key={item}>
                    <span>↑</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <div className="next-step-card">
            <div>
              <span>下一步</span>
              <h3>添加你的真实经历，与岗位要求进行匹配</h3>
              <p>经历匹配功能将在下一阶段开放。</p>
            </div>
            <button type="button" disabled>
              即将开放 →
            </button>
          </div>
        </section>
      ) : (
        <section
          className={`empty-result ${isAnalyzing ? "loading" : ""}`}
          aria-live="polite"
        >
          <span className="empty-spark">
            <SparkIcon />
          </span>
          <h2>{isAnalyzing ? "正在理解这个岗位…" : "分析结果会显示在这里"}</h2>
          <p>
            {isAnalyzing
              ? "正在提取岗位职责、能力和关键词"
              : "粘贴岗位描述并点击“分析岗位”开始"}
          </p>
        </section>
      )}
    </div>
  );
}
