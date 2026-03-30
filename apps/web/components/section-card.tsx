import { ReactNode } from "react";

export function SectionCard({
  title,
  description,
  action,
  tone = "default",
  children
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "default" | "muted" | "accent";
  children: ReactNode;
}) {
  const toneClass =
    tone === "accent"
      ? "border-accent/10 bg-[linear-gradient(180deg,_rgba(219,234,254,0.68),_rgba(255,255,255,0.96))]"
      : tone === "muted"
        ? "border-slate-200/90 bg-slate-50/90"
        : "border-white/70 bg-white/90";

  return (
    <div className={`rounded-[30px] border p-6 shadow-soft ${toneClass}`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
          {description ? <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </div>
  );
}
