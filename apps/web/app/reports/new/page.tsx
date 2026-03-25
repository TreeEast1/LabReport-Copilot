"use client";

import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { api } from "@/lib/api";
import type { MeetingReport, ReportTemplate } from "@/types";

export default function NewReportPage() {
  const [meetingTitle, setMeetingTitle] = useState("第 12 次组会汇报");
  const [weekSummary, setWeekSummary] = useState("本周主要完成了模型复现、实验结果整理以及相关文献补充阅读。");
  const [progressDetails, setProgressDetails] = useState("1. 完成基线模型训练与超参数对齐。\n2. 初步复现实验图表，并整理了不同窗口长度下的结果。\n3. 对误差较大的样本进行了案例分析。");
  const [literatureNotes, setLiteratureNotes] = useState("阅读了近期关于 GraphRAG 与时间序列增强建模的几篇工作，重点关注图结构先验如何提升推理稳定性。");
  const [currentProblems, setCurrentProblems] = useState("当前模型在长预测窗口下波动较大；实验图表中部分结果解释还不够充分。");
  const [nextPlan, setNextPlan] = useState("下周准备补充更强基线、增加消融实验，并进一步明确创新点与问题归因。");
  const [mentorQuestions, setMentorQuestions] = useState("希望老师帮忙判断当前创新点是否足够支撑后续论文撰写，以及实验优先级是否需要调整。");
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const [template, setTemplate] = useState<ReportTemplate>("学术详细版");
  const [result, setResult] = useState<MeetingReport | null>(null);
  const [status, setStatus] = useState("填写后即可一键生成组会汇报");

  const onGenerate = async () => {
    setStatus("正在生成组会汇报...");
    const report = await api.generateReport({
      meetingTitle,
      weekSummary,
      progressDetails,
      literatureNotes,
      currentProblems,
      nextPlan,
      mentorQuestions,
      template,
      voiceTranscript
    });
    setResult(report);
    setStatus("组会汇报已生成并写入历史记录");
  };

  return (
    <PageShell title="生成组会汇报" description="系统会综合用户画像、导师风格、历史材料和当前输入内容，输出适合飞书云文档粘贴的 Markdown 报告。">
      <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
        <SectionCard title="输入本次组会素材" description={status}>
          <div className="grid gap-4">
            <input value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} placeholder="组会标题" />
            <select value={template} onChange={(e) => setTemplate(e.target.value as ReportTemplate)}>
              <option>简洁版</option>
              <option>学术详细版</option>
              <option>工程进展版</option>
              <option>文献汇报版</option>
            </select>
            <textarea value={weekSummary} onChange={(e) => setWeekSummary(e.target.value)} placeholder="本周工作概述" />
            <textarea value={progressDetails} onChange={(e) => setProgressDetails(e.target.value)} placeholder="具体进展" />
            <textarea value={literatureNotes} onChange={(e) => setLiteratureNotes(e.target.value)} placeholder="文献调研情况 / 相关阅读笔记" />
            <textarea value={currentProblems} onChange={(e) => setCurrentProblems(e.target.value)} placeholder="当前问题与挑战" />
            <textarea value={nextPlan} onChange={(e) => setNextPlan(e.target.value)} placeholder="下一步计划" />
            <textarea value={mentorQuestions} onChange={(e) => setMentorQuestions(e.target.value)} placeholder="希望导师指导的问题" />
            <textarea value={voiceTranscript} onChange={(e) => setVoiceTranscript(e.target.value)} placeholder="语音转写文本（MVP 先手动粘贴，后续接入 ASR）" />
            <button onClick={onGenerate} className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              一键生成 Markdown 组会
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Markdown 输出预览" description="生成结果默认适配飞书云文档结构。">
          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-line bg-slate-50 p-4">
                <p className="text-sm text-slate-500">已保存为历史记录：{new Date(result.createdAt).toLocaleString("zh-CN")}</p>
                <p className="mt-2 text-base font-semibold">{result.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{result.summary}</p>
              </div>
              <pre className="overflow-x-auto rounded-2xl border border-line bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                <code>{result.markdown}</code>
              </pre>
            </div>
          ) : (
            <p className="text-sm text-slate-500">生成后将在这里展示完整 Markdown。</p>
          )}
        </SectionCard>
      </div>
    </PageShell>
  );
}
