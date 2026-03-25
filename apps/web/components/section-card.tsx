import { ReactNode } from "react";

export function SectionCard({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-soft">
      <div className="mb-5">
        <h3 className="text-xl font-semibold">{title}</h3>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
