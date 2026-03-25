from app.services.agents.base import BaseAgent, WorkflowContext


class HistoricalMaterialsSummaryAgent(BaseAgent):
    name = "historical-materials-summary"

    def run(self, context: WorkflowContext) -> WorkflowContext:
        materials = context.payload["materials"]
        if not materials:
            context.memory["materials_summary"] = "当前暂无历史材料，报告将主要依据本次输入生成。"
            return context

        recent_materials = materials[:3]
        titles = "；".join(f"{item.material_type}-{item.filename}" for item in recent_materials)
        context.memory["materials_summary"] = f"已参考最近上传的历史材料：{titles}。"
        return context
