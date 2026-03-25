import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { StatCard } from "@/components/stat-card";

const capabilities = [
  "自动生成本周组会提纲与正文",
  "适配导师风格组织语言与结构",
  "沉淀历史材料形成长期科研记忆",
  "支持文献调研与组会综述生成",
  "面向飞书云文档的 Markdown 输出"
];

export default function HomePage() {
  return (
    <PageShell
      title="为中国科研组会场景设计的 AI Agent 平台"
      description="LabReport Copilot 聚焦组会、周报、月报和文献汇报，围绕科研用户真实工作流设计，不只是生成文字，而是帮助整理素材、提炼进展、识别问题并输出结构化组会文档。"
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr,0.9fr]">
        <SectionCard
          title="产品概览"
          description="系统默认以“本周进展—问题—原因—计划—希望导师指导的问题”为核心结构输出，风格贴近中国高校实验室常见汇报习惯。"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item} className="rounded-2xl border border-line bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/reports/new"
              className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              开始生成组会
            </Link>
            <Link
              href="https://github.com/TreeEast1/LabReport-Copilot"
              className="rounded-2xl border border-line bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-accent hover:text-accent"
            >
              GitHub 仓库
            </Link>
          </div>
        </SectionCard>
        <div className="grid gap-6">
          <StatCard title="定位" value="科研组会 Copilot" hint="不是单纯生成器，而是围绕组会的多阶段 Agent 工作流。" />
          <StatCard title="当前阶段" value="MVP P0 + P1 骨架" hint="已包含用户画像、导师画像、材料库、文献调研与组会生成。" />
          <StatCard title="输出重点" value="Markdown / 飞书友好" hint="内容结构规范，适合直接复制到飞书云文档。" />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <SectionCard title="工作流 A" description="普通周组会生成">
          <p className="text-sm leading-7 text-slate-600">
            结合本周进展、历史材料、导师风格和当前问题，输出一份可直接用于组会的完整 Markdown 文档。
          </p>
        </SectionCard>
        <SectionCard title="工作流 C" description="文献调研组会">
          <p className="text-sm leading-7 text-slate-600">
            输入调研主题、时间范围与关键词，快速形成代表论文总结、局限性分析与课题启发。
          </p>
        </SectionCard>
        <SectionCard title="工作流 E" description="长期科研记忆沉淀">
          <p className="text-sm leading-7 text-slate-600">
            所有历史组会、调研结果和上传材料都会形成科研档案，为下一次生成提供上下文支撑。
          </p>
        </SectionCard>
      </div>
    </PageShell>
  );
}
