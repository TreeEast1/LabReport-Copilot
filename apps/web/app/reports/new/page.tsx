"use client";

import { useState } from "react";
import { FormField } from "@/components/form-field";
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
  const [isGenerating, setIsGenerating] = useState(false);

  const onGenerate = async () => {
    setIsGenerating(true);
    setStatus("正在生成组会汇报...");
    try {
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
    } catch {
      setStatus("生成失败，请确认后端与模型配置可用");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageShell
      title="生成组会汇报"
      description="把本周关键信息集中填写后，系统会结合科研画像、导师偏好和历史材料，生成一份适合飞书云文档和线下组会直接使用的 Markdown 报告。"
      eyebrow="Report Generator"
      actions={
        <div className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-sm leading-6 text-emerald-900">
          当前模板：<span className="font-semibold">{template}</span>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
        <SectionCard title="输入本次组会素材" description={status} tone="accent">
          <div className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
              <FormField label="组会标题">
                <input value={meetingTitle} onChange={(e) => setMeetingTitle(e.target.value)} placeholder="例如：第 12 次组会汇报" />
              </FormField>
              <FormField label="输出模板">
                <select value={template} onChange={(e) => setTemplate(e.target.value as ReportTemplate)}>
                  <option>简洁版</option>
                  <option>学术详细版</option>
                  <option>工程进展版</option>
                  <option>文献汇报版</option>
                </select>
              </FormField>
            </div>

            <div className="grid gap-4 rounded-[24px] border border-line bg-white/80 p-4">
              <p className="text-sm font-semibold text-slate-900">本周核心输入</p>
              <div className="grid gap-4">
                <FormField label="本周工作概述" hint="1-3 句话即可">
                  <textarea value={weekSummary} onChange={(e) => setWeekSummary(e.target.value)} placeholder="概括本周最重要的工作变化和产出" />
                </FormField>
                <FormField label="具体进展" hint="建议条目式">
                  <textarea value={progressDetails} onChange={(e) => setProgressDetails(e.target.value)} placeholder="按实验、模型、分析、图表整理等维度分点描述" />
                </FormField>
                <FormField label="文献调研 / 相关阅读">
                  <textarea value={literatureNotes} onChange={(e) => setLiteratureNotes(e.target.value)} placeholder="补充本周读过的论文、方法启发或可引用结论" />
                </FormField>
              </div>
            </div>

            <div className="grid gap-4 rounded-[24px] border border-line bg-white/80 p-4">
              <p className="text-sm font-semibold text-slate-900">问题与下一步</p>
              <div className="grid gap-4">
                <FormField label="当前问题与挑战">
                  <textarea value={currentProblems} onChange={(e) => setCurrentProblems(e.target.value)} placeholder="说明卡住的地方、原因猜测和风险点" />
                </FormField>
                <FormField label="下一步计划">
                  <textarea value={nextPlan} onChange={(e) => setNextPlan(e.target.value)} placeholder="写清接下来一周最重要的实验、分析或交付项" />
                </FormField>
                <FormField label="希望导师指导的问题">
                  <textarea value={mentorQuestions} onChange={(e) => setMentorQuestions(e.target.value)} placeholder="把真正需要老板决策或拍板的问题写清楚" />
                </FormField>
              </div>
            </div>

            <FormField label="语音转写文本" hint="可选">
              <textarea value={voiceTranscript} onChange={(e) => setVoiceTranscript(e.target.value)} placeholder="MVP 阶段先手动粘贴转写内容，后续可接 ASR" />
            </FormField>

            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {isGenerating ? "正在生成..." : "一键生成 Markdown 组会"}
            </button>
          </div>
        </SectionCard>

        <div className="grid gap-6">
          <SectionCard title="填写建议" description="这几个点补充完整，生成质量会明显更稳。" tone="muted">
            <div className="space-y-3 text-sm leading-6 text-slate-600">
              <div className="rounded-[22px] border border-line bg-white/80 p-4">
                把“具体进展”写成条目式，模型更容易抽取结论和亮点。
              </div>
              <div className="rounded-[22px] border border-line bg-white/80 p-4">
                “当前问题”尽量写出原因猜测，否则生成内容会偏空泛。
              </div>
              <div className="rounded-[22px] border border-line bg-white/80 p-4">
                如果导师经常问优先级或创新点，建议在“导师指导问题”中提前点明。
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Markdown 输出预览" description="生成结果默认适配飞书云文档结构。">
            {result ? (
              <div className="space-y-4">
                <div className="rounded-[24px] border border-line bg-slate-50/90 p-4">
                  <p className="text-sm text-slate-500">已保存为历史记录：{new Date(result.createdAt).toLocaleString("zh-CN")}</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{result.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{result.summary}</p>
                </div>
                <pre className="overflow-x-auto rounded-[24px] border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-slate-100">
                  <code>{result.markdown}</code>
                </pre>
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-line bg-white/70 p-6 text-sm leading-6 text-slate-500">
                生成后将在这里展示完整 Markdown，同时自动写入历史记录。
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </PageShell>
  );
}
