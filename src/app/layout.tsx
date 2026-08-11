import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "JobFit — 让每一段经历，更贴近理想岗位",
    template: "%s | JobFit",
  },
  description: "读懂岗位要求，匹配你的真实经历，生成更有针对性的简历。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link className="brand" href="/" aria-label="JobFit 首页">
              <span className="brand-mark" aria-hidden="true">
                J
              </span>
              <span>JobFit</span>
            </Link>
            <nav className="main-nav" aria-label="主导航">
              <Link href="/#how-it-works">工作原理</Link>
              <Link href="/#principles">产品原则</Link>
              <Link className="nav-cta" href="/analyze">
                开始分析
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div>
            <Link className="brand footer-brand" href="/">
              <span className="brand-mark" aria-hidden="true">
                J
              </span>
              <span>JobFit</span>
            </Link>
            <p>让你的真实经历，被更准确地看见。</p>
          </div>
          <p className="footer-note">当前为产品原型 · AI 不会虚构你的经历</p>
        </footer>
      </body>
    </html>
  );
}
