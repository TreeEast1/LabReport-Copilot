import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";

const capabilities = [
  { title: "组会生成", detail: "把本周进展、问题、计划和导师提问压缩成可直接汇报的 Markdown。" },
  { title: "导师适配", detail: "根据导师偏好自动调整语气、详略比例和结论顺序。" },
  { title: "材料记忆", detail: "把历史组会、论文摘要和会议纪要整合成长期上下文。" },
  { title: "文献调研", detail: "围绕主题生成代表论文、局限性和课题启发。" }
];

const workflowSteps = [
  { step: "01", title: "完善画像", detail: "先写清你的研究方向、阶段和汇报风格。" },
  { step: "02", title: "沉淀导师偏好", detail: "把老板真正关心的点固化下来，减少每次重讲背景。" },
  { step: "03", title: "上传材料", detail: "把截图、记录、旧组会与论文摘要放进长期记忆库。" },
  { step: "04", title: "生成并复盘", detail: "一键生成组会，满意的版本沉淀到历史记录中。" }
];

export default function HomePage() {
  return (
    <PageShell
      title="为中国实验室场景设计的科研汇报 Copilot"
      description="LabReport Copilot 不只负责“写一篇汇报”，而是把科研画像、导师偏好、文献调研、历史材料和本周进展连成一条可复用工作流，让组会准备更稳、更快，也更像你自己写的。"
      eyebrow="Overview"
      actions={
        <>
          <Link
            href="/reports/new"
            className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            立即生成组会
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center rounded-2xl border border-line bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-accent hover:text-accent"
          >
            先完善画像
          </Link>
        </>
      }
      sidebarNote="建议首次使用按“科研画像 → 导师画像 → 材料库 → 生成组会”的顺序完成初始化。"
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <SectionCard
          title="现在这个系统能直接帮你做什么"
          description="产品核心不再是单点页面，而是围绕真实组会准备路径组织能力。"
          tone="accent"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/80 bg-white/85 p-4">
                <p className="text-base font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 rounded-[24px] border border-dashed border-accent/20 bg-white/65 p-4 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">适合场景</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">周报、月报、文献汇报、阶段性复盘</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">默认产物</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">飞书友好的结构化 Markdown 文档</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">当前优势</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">更贴近国内实验室真实表达和导师沟通习惯</p>
            </div>
          </div>
        </SectionCard>
        <div className="grid gap-6">
          <StatCard title="定位" value="科研汇报工作台" hint="不是单纯生成器，而是能记住上下文的多阶段 Agent 工作流。" />
          <StatCard title="当前阶段" value="MVP 可演示版" hint="画像、材料库、调研和生成已打通。" accent="teal" />
          <StatCard title="输出风格" value="清晰、正式、可复盘" hint="强调结论、问题归因与下一步计划。" accent="amber" />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
        <SectionCard title="推荐使用路径" description="第一次上手建议按这个顺序走，体验会顺很多。">
          <div className="space-y-3">
            {workflowSteps.map((item) => (
              <div key={item.step} className="flex gap-4 rounded-[24px] border border-line bg-white/80 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard
          title="核心工作流视图"
          description="几个页面之间的关系比以前更明确了，首页也能直接看清主线。"
          action={
            <Link href="https://github.com/TreeEast1/LabReport-Copilot" className="text-sm font-medium text-accent">
              查看 GitHub
            </Link>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-line bg-slate-50/80 p-5">
              <p className="text-sm font-semibold text-slate-900">输入层</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">科研画像、导师画像、材料库和文献主题统一作为上游上下文。</p>
            </div>
            <div className="rounded-[24px] border border-line bg-slate-50/80 p-5">
              <p className="text-sm font-semibold text-slate-900">Agent 层</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">按组会生成、调研归纳、风格适配等任务拆分能力。</p>
            </div>
            <div className="rounded-[24px] border border-line bg-slate-50/80 p-5">
              <p className="text-sm font-semibold text-slate-900">输出层</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">结果默认对齐飞书和组会常见结构，复制即可用。</p>
            </div>
            <div className="rounded-[24px] border border-line bg-slate-50/80 p-5">
              <p className="text-sm font-semibold text-slate-900">沉淀层</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">历史记录和材料库构成长期科研记忆，越用越贴近你自己的风格。</p>
            </div>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
