import type { Metadata } from "next";
import { JobAnalyzer } from "./job-analyzer";

export const metadata: Metadata = {
  title: "分析岗位",
  description: "粘贴岗位描述，提取核心能力、关键词、岗位职责和加分项。",
};

export default function AnalyzePage() {
  return (
    <div className="analyze-page">
      <div className="analyze-intro">
        <span className="section-kicker">第一步 · 了解岗位</span>
        <h1>这个岗位真正需要什么？</h1>
        <p>粘贴完整的岗位描述，JobFit 会帮你提炼最值得关注的信息。</p>
      </div>
      <JobAnalyzer />
    </div>
  );
}
