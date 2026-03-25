import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/profile", label: "科研画像" },
  { href: "/advisor", label: "导师画像" },
  { href: "/materials", label: "材料库" },
  { href: "/literature", label: "论文调研" },
  { href: "/reports/new", label: "生成组会" },
  { href: "/history", label: "历史记录" }
];

export function PageShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(21,94,239,0.12),_transparent_35%),linear-gradient(180deg,_#f8fbff_0%,_#f3f6fb_45%,_#edf2f7_100%)]">
      <div className="mx-auto flex min-h-screen max-w-7xl gap-6 px-4 py-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-soft backdrop-blur lg:block">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">LabReport Copilot</p>
            <h1 className="mt-3 text-2xl font-semibold">科研组会 Copilot</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              围绕组会场景构建的科研工作流平台，优先服务中国实验室汇报习惯。
            </p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-accentSoft hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          <header className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur">
            <p className="text-sm font-medium text-accent">MVP 工作台</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
          </header>
          <section className="mt-6">{children}</section>
        </main>
      </div>
    </div>
  );
}
