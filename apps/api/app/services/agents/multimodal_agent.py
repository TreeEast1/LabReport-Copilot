from app.services.agents.base import BaseAgent, WorkflowContext


class MultimodalAnalysisAgent(BaseAgent):
    name = "multimodal-analysis"

    def run(self, context: WorkflowContext) -> WorkflowContext:
        materials = context.payload["materials"]
        image_like_materials = [item for item in materials if item.material_type in {"图片截图", "实验记录"}]
        if not image_like_materials:
            context.memory["multimodal_summary"] = "当前未提供可分析的图片或实验截图。"
            return context
        context.memory["multimodal_summary"] = (
            f"检测到 {len(image_like_materials)} 份可能包含图表或截图的材料，"
            "后续可接入 VLM / OCR 进一步提取图像关键信息并自动写入实验结果分析部分。"
        )
        return context
