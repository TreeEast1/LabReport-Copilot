"use client";

import { useEffect, useState } from "react";
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
    await api.saveUserProfile(form);
    setStatus("科研画像已保存");
  };

  return (
    <PageShell title="用户科研画像" description="填写个人背景、研究方向与汇报偏好，系统会把它作为后续组会生成和风格适配的长期上下文。">
      <SectionCard title="基础信息" description={status}>
        <div className="grid gap-4 md:grid-cols-2">
          <input value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="姓名" />
          <select value={form.degree} onChange={(e) => updateField("degree", e.target.value)}>
            <option>硕士</option>
            <option>博士</option>
            <option>本科科研</option>
            <option>科研助理</option>
          </select>
          <input value={form.university} onChange={(e) => updateField("university", e.target.value)} placeholder="学校" />
          <input value={form.school} onChange={(e) => updateField("school", e.target.value)} placeholder="学院" />
          <input value={form.major} onChange={(e) => updateField("major", e.target.value)} placeholder="专业" />
          <input value={form.stage} onChange={(e) => updateField("stage", e.target.value)} placeholder="当前研究阶段，例如：开题后第 2 个月" />
        </div>
        <div className="mt-4 grid gap-4">
          <input value={form.researchDirection} onChange={(e) => updateField("researchDirection", e.target.value)} placeholder="研究方向" />
          <textarea value={form.topic} onChange={(e) => updateField("topic", e.target.value)} placeholder="课题题目 / 研究问题描述" />
          <input value={form.terminologyStyle} onChange={(e) => updateField("terminologyStyle", e.target.value)} placeholder="常用术语风格，例如：偏学术、偏工程实现、习惯中英文混用" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <select value={form.language} onChange={(e) => updateField("language", e.target.value)}>
            <option>中文</option>
            <option>中英混合</option>
            <option>英文</option>
          </select>
          <select value={form.reportPreference} onChange={(e) => updateField("reportPreference", e.target.value as ResearchProfile["reportPreference"])}>
            <option>正式</option>
            <option>简洁</option>
            <option>学术</option>
            <option>工程导向</option>
          </select>
        </div>
        <button onClick={onSave} className="mt-6 rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
          保存科研画像
        </button>
      </SectionCard>
    </PageShell>
  );
}
