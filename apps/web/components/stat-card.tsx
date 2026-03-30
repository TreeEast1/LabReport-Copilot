export function StatCard({
  title,
  value,
  hint,
  accent = "blue"
}: {
  title: string;
  value: string;
  hint: string;
  accent?: "blue" | "teal" | "amber";
}) {
  const accentClass =
    accent === "teal"
      ? "from-emerald-50 to-white text-emerald-900"
      : accent === "amber"
        ? "from-amber-50 to-white text-amber-950"
        : "from-blue-50 to-white text-slate-950";

  return (
    <div className={`rounded-[26px] border border-white/80 bg-gradient-to-br p-5 shadow-soft ${accentClass}`}>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{hint}</p>
    </div>
  );
}
