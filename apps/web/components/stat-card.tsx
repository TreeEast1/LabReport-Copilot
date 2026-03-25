export function StatCard({
  title,
  value,
  hint
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/85 p-5 shadow-soft">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{hint}</p>
    </div>
  );
}
