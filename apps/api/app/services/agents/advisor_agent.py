from app.services.agents.base import BaseAgent, WorkflowContext


class AdvisorStyleModelingAgent(BaseAgent):
    name = "advisor-style-modeling"

    def run(self, context: WorkflowContext) -> WorkflowContext:
        advisor = context.payload["advisor_profile"]
        focus = "、".join(advisor.focus) if advisor.focus else "逻辑清晰"
        context.memory["advisor_style_summary"] = (
            f"导师风格偏向{advisor.tone}，重点关注{focus}。"
            f"{'汇报建议先讲结论。' if advisor.conclusion_first else '汇报可按过程展开。'}"
            f"{'推荐使用进展-问题-计划三段式。' if advisor.prefers_three_stage else ''}"
        )
        return context
