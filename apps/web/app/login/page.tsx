import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";

export default function LoginPage() {
  return (
    <PageShell
      title="简单用户入口"
      description="MVP 阶段先采用本地会话模式，不强制接入真实登录系统。后续可扩展邮箱登录、飞书登录或校园统一身份认证。"
    >
      <SectionCard title="本地会话模式" description="当前版本默认单用户本地体验，点击下方入口即可开始配置科研画像。">
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            适合开源演示、快速体验和本地部署。后续可无缝切换为真实认证体系。
          </div>
          <Link href="/profile" className="inline-flex rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            进入工作台
          </Link>
        </div>
      </SectionCard>
    </PageShell>
  );
}
