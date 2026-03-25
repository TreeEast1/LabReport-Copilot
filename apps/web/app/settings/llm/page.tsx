import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";

const providers = [
  {
    name: "Azure OpenAI",
    description: "适合直接接入 Azure 上已部署的模型，例如 gpt-5.2。",
    vars: ["LLM_PROVIDER=azure_openai", "AZURE_OPENAI_ENDPOINT", "AZURE_OPENAI_API_KEY", "AZURE_OPENAI_DEPLOYMENT"]
  },
  {
    name: "OpenAI 兼容接口",
    description: "适合各类兼容 OpenAI Chat Completions 的代理服务或模型网关。",
    vars: ["LLM_PROVIDER=openai_compatible", "OPENAI_COMPATIBLE_BASE_URL", "OPENAI_COMPATIBLE_API_KEY", "OPENAI_COMPATIBLE_MODEL"]
  },
  {
    name: "Mock",
    description: "本地演示模式，不调用真实模型，方便离线开发和页面联调。",
    vars: ["LLM_PROVIDER=mock", "LLM_MODEL=gpt-5.2"]
  }
];

export default function LLMSettingsPage() {
  return (
    <PageShell
      title="LLM 配置说明"
      description="项目后端已经抽象出可替换的 LLM Provider。开源后，使用者只需要在 `apps/api/.env` 中填入自己的接口配置即可。"
    >
      <div className="grid gap-6">
        <SectionCard title="配置位置" description="当前版本采用后端环境变量配置，不在前端页面保存密钥，避免把 key 暴露到浏览器侧。">
          <pre className="rounded-2xl border border-line bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            <code>{`cp apps/api/.env.example apps/api/.env`}</code>
          </pre>
        </SectionCard>

        {providers.map((provider) => (
          <SectionCard key={provider.name} title={provider.name} description={provider.description}>
            <div className="space-y-2">
              {provider.vars.map((item) => (
                <div key={item} className="rounded-2xl border border-line bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
    </PageShell>
  );
}
