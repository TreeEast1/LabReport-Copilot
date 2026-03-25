"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { SectionCard } from "@/components/section-card";
import { api } from "@/lib/api";
import type { MaterialAsset } from "@/types";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<MaterialAsset[]>([]);
  const [materialType, setMaterialType] = useState("历史组会");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("正在加载材料...");

  const loadMaterials = async () => {
    const data = await api.getMaterials();
    setMaterials(data);
    setStatus(`已加载 ${data.length} 份材料`);
  };

  useEffect(() => {
    loadMaterials().catch(() => setStatus("加载失败，请确认后端已启动"));
  }, []);

  const onUpload = async () => {
    if (!file) {
      setStatus("请先选择文件");
      return;
    }
    await api.uploadMaterial({ file, materialType, description });
    setDescription("");
    setFile(null);
    setStatus("材料上传成功");
    await loadMaterials();
  };

  return (
    <PageShell title="历史材料库" description="上传往期组会、论文摘要、实验记录、截图、会议纪要等材料，系统会把它们作为后续汇报生成的长期记忆。">
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <SectionCard title="上传材料" description={status}>
          <div className="grid gap-4">
            <select value={materialType} onChange={(e) => setMaterialType(e.target.value)}>
              <option>历史组会</option>
              <option>论文摘要</option>
              <option>实验记录</option>
              <option>会议纪要</option>
              <option>聊天摘要</option>
              <option>图片截图</option>
            </select>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="补充说明，例如：2026-03-20 组会 PPT 截图、导师反馈摘要" />
            <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <button onClick={onUpload} className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
              上传并入库
            </button>
          </div>
        </SectionCard>

        <SectionCard title="历史材料列表" description="支持按类型继续扩展筛选、检索和向量召回。">
          <div className="space-y-3">
            {materials.map((item) => (
              <div key={item.id} className="rounded-2xl border border-line bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{item.filename}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.materialType}</p>
                  </div>
                  <span className="text-xs text-slate-500">{new Date(item.createdAt).toLocaleString("zh-CN")}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description || "暂无补充说明"}</p>
              </div>
            ))}
            {!materials.length ? <p className="text-sm text-slate-500">暂无材料，上传后会在这里展示。</p> : null}
          </div>
        </SectionCard>
      </div>
    </PageShell>
  );
}
