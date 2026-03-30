"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { api } from "@/lib/api";
import type { MeetingReport } from "@/types";

export default function HistoryPage() {
  const [reports, setReports] = useState<MeetingReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<MeetingReport | null>(null);
  const [status, setStatus] = useState("正在加载历史记录...");

  useEffect(() => {
    api.getReports()
      .then((data) => {
        setReports(data);
        setSelectedReport(data[0] || null);
        setStatus(`已加载 ${data.length} 条历史记录`);
      })
      .catch(() => setStatus("加载失败，请确认后端已启动"));
  }, []);

  return (
    <PageShell
      title="历史记录"
      description="查看过往生成的组会文档，当前版本已支持快速预览与切换，后续可以继续扩展导出、二次编辑和版本对比。"
      eyebrow="History"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <SectionCard title="历史报告列表" description={status}>
          <div className="space-y-3">
            {reports.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`w-full rounded-[24px] border p-4 text-left transition ${
                  selectedReport?.id === report.id
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-line bg-white hover:border-accent"
                }`}
              >
                <p className="font-semibold">{report.title}</p>
                <p className={`mt-2 text-sm ${selectedReport?.id === report.id ? "text-slate-300" : "text-slate-500"}`}>
                  {new Date(report.createdAt).toLocaleString("zh-CN")}
                </p>
                <p className={`mt-2 text-sm leading-6 ${selectedReport?.id === report.id ? "text-slate-200" : "text-slate-600"}`}>
                  {report.summary}
                </p>
              </button>
            ))}
            {!reports.length ? <p className="text-sm text-slate-500">暂无历史报告。</p> : null}
          </div>
        </SectionCard>

        <SectionCard title="报告内容" description="后续可增加再次编辑、重新生成、导出 PDF / 飞书等操作。">
          {selectedReport ? (
            <pre className="overflow-x-auto rounded-[24px] border border-slate-800 bg-slate-950 p-4 text-xs leading-6 text-slate-100">
              <code>{selectedReport.markdown}</code>
            </pre>
          ) : (
            <div className="rounded-[24px] border border-dashed border-line bg-white/70 p-6 text-sm text-slate-500">请选择左侧报告查看内容。</div>
          )}
        </SectionCard>
      </div>
    </PageShell>
  );
}
