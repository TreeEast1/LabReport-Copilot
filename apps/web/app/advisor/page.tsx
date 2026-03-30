"use client";

import { useEffect, useState } from "react";
import { FormField } from "@/components/form-field";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { TagList } from "@/components/tag-list";
import { api } from "@/lib/api";
import type { AdvisorProfile } from "@/types";

const focusOptions = ["实验结果", "理论推导", "论文调研", "逻辑清晰", "创新点", "工作量", "实际落地", "汇报规范"];

const defaultAdvisor: AdvisorProfile = {
  advisorName: "",
  tone: "严格",
  focus: ["逻辑清晰", "实验结果"],
  expressionPreference: "喜欢先讲结论再展开过程",
  prefersCharts: true,
  conclusionFirst: true,
  prefersThreeStage: true,
  likesCriticalReview: false,
  notes: ""
};

export default function AdvisorPage() {
  const [form, setForm] = useState<AdvisorProfile>(defaultAdvisor);
  const [status, setStatus] = useState("正在加载...");

  useEffect(() => {
    api.getAdvisorProfile()
      .then((data) => {
        setForm(data);
        setStatus("已加载导师画像");
      })
      .catch(() => setStatus("当前使用默认导师画像模板"));
  }, []);

  const toggleFocus = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      focus: prev.focus.includes(tag) ? prev.focus.filter((item) => item !== tag) : [...prev.focus, tag]
    }));
  };

  const onSave = async () => {
    try {
      await api.saveAdvisorProfile(form);
      setStatus("导师画像已保存");
    } catch {
      setStatus("保存失败，请确认后端已启动");
    }
  };

  return (
    <PageShell
      title="导师风格画像"
      description="把导师真正关心的点和表达偏好提前沉淀下来，生成的组会内容会更接近真实沟通语境，而不是通用模板。"
      eyebrow="Advisor Profile"
    >
      <SectionCard title="导师偏好配置" description={status} tone="accent">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="导师 / 老板称呼">
            <input
              value={form.advisorName}
              onChange={(e) => setForm((prev) => ({ ...prev, advisorName: e.target.value }))}
              placeholder="例如：王老师 / 老板"
            />
          </FormField>
          <FormField label="整体风格">
            <select value={form.tone} onChange={(e) => setForm((prev) => ({ ...prev, tone: e.target.value }))}>
              <option>严格</option>
              <option>温和</option>
              <option>务实</option>
              <option>学术导向</option>
            </select>
          </FormField>
        </div>

        <div className="mt-4 rounded-[24px] border border-line bg-white/80 p-4">
          <p className="text-sm font-medium text-slate-700">重点关注标签</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {focusOptions.map((tag) => {
              const active = form.focus.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleFocus(tag)}
                  className={`rounded-full px-3 py-2 text-sm ${
                    active ? "bg-slate-900 text-white" : "border border-line bg-white text-slate-700"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <div className="mt-4">
            <TagList tags={form.focus} />
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <FormField label="表达偏好">
            <input
              value={form.expressionPreference}
              onChange={(e) => setForm((prev) => ({ ...prev, expressionPreference: e.target.value }))}
              placeholder="例如：先结论后过程 / 背景铺垫充分"
            />
          </FormField>
          <FormField label="补充备注">
            <textarea
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="例如：老师很关注基线是否充分、图表是否有可解释性"
            />
          </FormField>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-sm">
            <input type="checkbox" checked={form.prefersCharts} onChange={(e) => setForm((prev) => ({ ...prev, prefersCharts: e.target.checked }))} />
            是否偏好图表支撑
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-sm">
            <input type="checkbox" checked={form.conclusionFirst} onChange={(e) => setForm((prev) => ({ ...prev, conclusionFirst: e.target.checked }))} />
            是否喜欢先讲结论
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-sm">
            <input type="checkbox" checked={form.prefersThreeStage} onChange={(e) => setForm((prev) => ({ ...prev, prefersThreeStage: e.target.checked }))} />
            是否喜欢进展-问题-计划三段式
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3 text-sm">
            <input type="checkbox" checked={form.likesCriticalReview} onChange={(e) => setForm((prev) => ({ ...prev, likesCriticalReview: e.target.checked }))} />
            是否偏好批判性文献总结
          </label>
        </div>

        <button onClick={onSave} className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
          保存导师画像
        </button>
      </SectionCard>
    </PageShell>
  );
}
