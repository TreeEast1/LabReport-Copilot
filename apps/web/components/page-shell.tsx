"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/profile", label: "科研画像" },
  { href: "/advisor", label: "导师画像" },
  { href: "/materials", label: "材料库" },
  { href: "/literature", label: "论文调研" },
  { href: "/reports/new", label: "生成组会" },
  { href: "/history", label: "历史记录" },
  { href: "/settings/llm", label: "LLM 配置" }
];

export function PageShell({
  title,
  description,
  eyebrow = "MVP 工作台",
  actions,
  sidebarNote,
  children
}: {
  title: string;
  description: string;
  eyebrow?: string;
  actions?: ReactNode;
  sidebarNote?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(21,94,239,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(15,118,110,0.10),_transparent_26%),linear-gradient(180deg,_#f7fafc_0%,_#eef4f8_100%)]">
      <div className="mx-auto flex min-h-screen max-w-[1480px] gap-6 px-4 py-4 lg:px-6 lg:py-6">
        <aside className="hidden w-[292px] shrink-0 rounded-[32px] border border-white/70 bg-white/78 p-5 shadow-soft backdrop-blur lg:flex lg:flex-col">
          <div className="mb-8 rounded-[28px] border border-slate-200/70 bg-[linear-gradient(135deg,_rgba(21,94,239,0.10),_rgba(255,255,255,0.85)_45%,_rgba(15,118,110,0.10))] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">LabReport Copilot</p>
            <h1 className="mt-3 font-serif text-[30px] font-semibold tracking-tight text-slate-900">科研汇报工作台</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              把科研画像、导师偏好、历史材料和本周进展收拢到一个连续工作流里。
            </p>
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  pathname === item.href
                    ? "bg-slate-900 text-white shadow-[0_10px_28px_rgba(15,23,42,0.16)]"
                    : "text-slate-700 hover:bg-accentSoft hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 rounded-[28px] border border-slate-200/80 bg-slate-50/90 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">使用建议</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              先完善科研画像与导师画像，再上传材料，最后生成组会，结果会自动沉淀到历史记录。
            </p>
          </div>
          {sidebarNote ? (
            <div className="mt-4 rounded-[28px] border border-emerald-100 bg-emerald-50/80 p-4 text-sm leading-6 text-emerald-900">
              {sidebarNote}
            </div>
          ) : null}
        </aside>
        <main className="flex-1">
          <div className="mb-4 flex gap-2 overflow-x-auto rounded-[24px] border border-white/80 bg-white/80 p-2 shadow-soft backdrop-blur lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                  pathname === item.href ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <header className="rounded-[32px] border border-white/80 bg-white/84 p-6 shadow-soft backdrop-blur lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="inline-flex rounded-full border border-accent/10 bg-accentSoft/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  {eyebrow}
                </p>
                <h2 className="mt-4 max-w-4xl font-serif text-3xl font-semibold tracking-tight text-slate-950 lg:text-[42px] lg:leading-[1.1]">
                  {title}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 lg:text-[15px]">{description}</p>
              </div>
              {actions ? <div className="flex flex-wrap gap-3 lg:max-w-sm lg:justify-end">{actions}</div> : null}
            </div>
          </header>
          <section className="mt-6">{children}</section>
        </main>
      </div>
    </div>
  );
}
