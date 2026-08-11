import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "输入岗位 JD",
    text: "粘贴岗位描述，快速开始一次有针对性的简历优化。",
  },
  {
    number: "02",
    title: "分析岗位",
    text: "提炼核心能力、关键词、岗位职责与加分项。",
  },
  {
    number: "03",
    title: "添加个人经历",
    text: "补充真实的项目、实习与校园经历，建立事实基础。",
  },
  {
    number: "04",
    title: "匹配相关经历",
    text: "找到与岗位要求最相关的内容，并清楚展示匹配依据。",
  },
  {
    number: "05",
    title: "生成定制简历",
    text: "只基于确认过的事实优化表达，生成岗位定制版本。",
  },
];

const IconArrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> 专为学生求职打造的 AI 简历助手
          </div>
          <h1>
            让每一段经历，
            <br />
            <em>更贴近理想岗位</em>
          </h1>
          <p className="hero-description">
            JobFit 帮你读懂岗位要求，从真实经历中找到最匹配的内容，
            写出更有针对性的简历。
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/analyze">
              分析一个岗位 <IconArrow />
            </Link>
            <a className="text-link" href="#how-it-works">
              看看如何工作 <span>↓</span>
            </a>
          </div>
          <div className="trust-row">
            <span>
              <i>✓</i> 无需注册即可体验
            </span>
            <span>
              <i>✓</i> 只基于真实经历
            </span>
            <span>
              <i>✓</i> 由你审核每项建议
            </span>
          </div>
        </div>
        <div className="hero-visual" aria-label="JobFit 岗位分析示意图">
          <div className="visual-card jd-card">
            <div className="card-topline">
              <span className="mini-icon">JD</span>
              <span>产品实习生</span>
              <i>已读取</i>
            </div>
            <div className="mock-line wide" />
            <div className="mock-line medium" />
            <div className="mock-line short" />
          </div>
          <div className="connector">
            <span>AI 分析中</span>
          </div>
          <div className="visual-card result-card">
            <div className="result-heading">
              <span className="sparkle">✦</span>
              <div>
                <small>岗位匹配洞察</small>
                <strong>发现 8 项关键要求</strong>
              </div>
            </div>
            <div className="tags">
              <span>用户研究</span>
              <span>数据分析</span>
              <span>跨团队协作</span>
              <span>原型设计</span>
            </div>
            <div className="match-preview">
              <span>经历匹配度</span>
              <strong>86%</strong>
              <div>
                <i />
              </div>
            </div>
          </div>
          <span className="float-badge badge-one">真实经历</span>
          <span className="float-badge badge-two">精准匹配 ✦</span>
        </div>
      </section>

      <section className="process-section" id="how-it-works">
        <div className="section-heading">
          <span className="section-kicker">简单五步</span>
          <h2>从岗位描述，到你的定制简历</h2>
          <p>不需要研究复杂工具，JobFit 会引导你完成每一步。</p>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => (
            <article className="step-card" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div className={`step-icon icon-${index + 1}`} aria-hidden="true">
                {["⌨", "✦", "＋", "⌁", "✓"][index]}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {index < steps.length - 1 && (
                <span className="step-arrow">→</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="principles-section" id="principles">
        <div className="principle-copy">
          <span className="section-kicker light">我们坚持</span>
          <h2>优化表达，不编造人生</h2>
          <p>
            JobFit 只使用你确认过的事实。每一条 AI
            建议都会保留来源，由你决定是否采用。
          </p>
        </div>
        <div className="principle-list">
          <div>
            <span>01</span>
            <strong>真实性优先</strong>
            <p>没有证据的项目、技能和数据，不会出现在简历中。</p>
          </div>
          <div>
            <span>02</span>
            <strong>过程可解释</strong>
            <p>清楚展示岗位要求与个人经历之间的匹配依据。</p>
          </div>
          <div>
            <span>03</span>
            <strong>最终由你决定</strong>
            <p>AI 提供草稿和建议，你审核后才生成最终版本。</p>
          </div>
        </div>
      </section>

      <section className="bottom-cta">
        <span className="sparkle large">✦</span>
        <h2>从一个岗位开始</h2>
        <p>粘贴你感兴趣的岗位描述，看看它真正需要什么。</p>
        <Link className="button button-primary" href="/analyze">
          免费分析岗位 <IconArrow />
        </Link>
      </section>
    </>
  );
}
