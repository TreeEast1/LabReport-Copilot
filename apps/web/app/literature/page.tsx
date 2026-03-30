"use client";

import { useState } from "react";
import { FormField } from "@/components/form-field";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { api } from "@/lib/api";
import type { LiteratureResearchResult } from "@/types";

export default function LiteraturePage() {
  const [topic, setTopic] = useState("Transformer 在时间序列预测中的近期研究");
  const [keywords, setKeywords] = useState("Transformer, time series forecasting, long-term forecasting");
  const [timeRange, setTimeRange] = useState("近三个月");
  const [targetCount, setTargetCount] = useState(5);
  const [researchDirection, setResearchDirection] = useState("时间序列预测");
  const [result, setResult] = useState<LiteratureResearchResult | null>(null);
  const [status, setStatus] = useState("填写主题后即可开始生成调研综述");
  const [isRunning, setIsRunning] = useState(false);

  const onSubmit = async () => {
    setIsRunning(true);
    setStatus("正在生成调研结果...");
    try {
      const data = await api.runLiteratureResearch({
        topic,
        keywords,
        timeRange,
        targetCount,
        researchDirection
      });
      setResult(data);
      setStatus("调研结果已生成");
    } catch {
      setStatus("生成失败，请确认后端与模型配置可用");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <PageShell
      title="论文调研 Agent"
      description="围绕组会常见文献汇报需求，把调研主题、关键词和时间范围结构化输入后，自动整理代表论文、局限性和对课题的启发。"
      eyebrow="Literature Research"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr,1.05fr]">
        <SectionCard title="调研请求" description={status} tone="accent">
          <div className="grid gap-4">
            <FormField label="调研主题">
              <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="例如：Transformer 在时间序列预测中的近期研究" />
            </FormField>
            <FormField label="关键词">
              <input value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="关键词，逗号分隔" />
            </FormField>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="时间范围">
                <input value={timeRange} onChange={(e) => setTimeRange(e.target.value)} placeholder="例如：近三个月" />
              </FormField>
              <FormField label="目标论文数量">
                <input
                  type="number"
                  value={targetCount}
                  onChange={(e) => setTargetCount(Number(e.target.value))}
                  placeholder="目标论文数量"
                />
              </FormField>
            </div>
            <FormField label="所属研究方向">
              <input value={researchDirection} onChange={(e) => setResearchDirection(e.target.value)} placeholder="例如：时间序列预测" />
            </FormField>
            <button
              onClick={onSubmit}
              disabled={isRunning}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              {isRunning ? "正在生成..." : "生成调研摘要"}
            </button>
          </div>
        </SectionCard>

        <SectionCard title="调研输出" description="该区域内容适合直接纳入组会文献调研部分。">
          {result ? (
            <div className="space-y-4">
              <div className="rounded-[24px] border border-line bg-slate-50/80 p-4">
                <p className="text-sm leading-7 text-slate-700">{result.summary}</p>
              </div>
              {result.papers.map((paper) => (
                <div key={paper.title} className="rounded-[24px] border border-line bg-white p-4">
                  <p className="font-semibold">{paper.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">核心亮点：{paper.contribution}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">局限性：{paper.limitations}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">对课题启发：{paper.inspiration}</p>
                </div>
              ))}
              <div className="rounded-[24px] border border-accentSoft bg-accentSoft/40 p-4 text-sm leading-7 text-slate-700">
                {result.meetingReadySummary}
              </div>
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-line bg-white/70 p-6 text-sm text-slate-500">暂无调研结果。</div>
          )}
        </SectionCard>
      </div>
    </PageShell>
  );
}
