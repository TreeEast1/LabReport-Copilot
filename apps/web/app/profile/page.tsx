"use client";

import { useEffect, useState } from "react";
import { FormField } from "@/components/form-field";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { api } from "@/lib/api";
import type { ResearchProfile } from "@/types";

const defaultProfile: ResearchProfile = {
  name: "",
  degree: "硕士",
  university: "",
  school: "",
  major: "",
  researchDirection: "",
  topic: "",
  stage: "",
  language: "中文",
  terminologyStyle: "",
  reportPreference: "正式"
};

export default function ProfilePage() {
  const [form, setForm] = useState<ResearchProfile>(defaultProfile);
  const [status, setStatus] = useState("正在加载...");

  useEffect(() => {
    api.getUserProfile()
      .then((data) => {
        setForm(data);
        setStatus("已加载科研画像");
      })
      .catch(() => setStatus("未读取到历史画像，当前为默认空白配置"));
  }, []);

  const updateField = (key: keyof ResearchProfile, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSave = async () => {
    try {
      await api.saveUserProfile(form);
      setStatus("科研画像已保存");
    } catch {
      setStatus("保存失败，请确认后端已启动");
    }
  };

  return (
    <PageShell
      title="用户科研画像"
      description="把你的研究背景、课题阶段和表达偏好写清楚，后续所有组会生成都会以它为长期上下文，而不是每次从零开始。"
      eyebrow="Research Profile"
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <SectionCard title="基础信息" description={status} tone="accent">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="姓名">
              <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="你的姓名" />
            </FormField>
            <FormField label="学位阶段">
              <select value={form.degree} onChange={(e) => updateField("degree", e.target.value)}>
                <option>硕士</option>
                <option>博士</option>
                <option>本科科研</option>
                <option>科研助理</option>
              </select>
            </FormField>
            <FormField label="学校">
              <input value={form.university} onChange={(e) => updateField("university", e.target.value)} placeholder="学校名称" />
            </FormField>
            <FormField label="学院">
              <input value={form.school} onChange={(e) => updateField("school", e.target.value)} placeholder="学院名称" />
            </FormField>
            <FormField label="专业">
              <input value={form.major} onChange={(e) => updateField("major", e.target.value)} placeholder="专业方向" />
            </FormField>
            <FormField label="当前研究阶段">
              <input value={form.stage} onChange={(e) => updateField("stage", e.target.value)} placeholder="例如：开题后第 2 个月" />
            </FormField>
          </div>
          <div className="mt-4 grid gap-4">
            <FormField label="研究方向">
              <input value={form.researchDirection} onChange={(e) => updateField("researchDirection", e.target.value)} placeholder="例如：时间序列预测 / 多模态医疗 AI" />
            </FormField>
            <FormField label="课题题目 / 核心问题">
              <textarea value={form.topic} onChange={(e) => updateField("topic", e.target.value)} placeholder="尽量写出课题目标、核心方法和当前阶段重点" />
            </FormField>
            <FormField label="术语风格">
              <input value={form.terminologyStyle} onChange={(e) => updateField("terminologyStyle", e.target.value)} placeholder="例如：偏学术、偏工程实现、习惯中英文混用" />
            </FormField>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <FormField label="输出语言">
              <select value={form.language} onChange={(e) => updateField("language", e.target.value)}>
                <option>中文</option>
                <option>中英混合</option>
                <option>英文</option>
              </select>
            </FormField>
            <FormField label="汇报偏好">
              <select value={form.reportPreference} onChange={(e) => updateField("reportPreference", e.target.value as ResearchProfile["reportPreference"])}>
                <option>正式</option>
                <option>简洁</option>
                <option>学术</option>
                <option>工程导向</option>
              </select>
            </FormField>
          </div>
          <button onClick={onSave} className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800">
            保存科研画像
          </button>
        </SectionCard>

        <SectionCard title="这份画像会影响什么" description="写得越完整，后续生成内容越像为你定制。">
          <div className="space-y-3 text-sm leading-6 text-slate-600">
            <div className="rounded-[24px] border border-line bg-slate-50/80 p-4">
              系统会根据你的研究方向自动偏向更合适的表达和材料组织方式。
            </div>
            <div className="rounded-[24px] border border-line bg-slate-50/80 p-4">
              汇报风格会影响结论先行、术语密度和段落详略比例。
            </div>
            <div className="rounded-[24px] border border-line bg-slate-50/80 p-4">
              课题描述越清楚，文献调研和问题归因越不容易“泛泛而谈”。
            </div>
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
