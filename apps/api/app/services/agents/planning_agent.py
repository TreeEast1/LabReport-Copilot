from app.services.agents.base import BaseAgent, WorkflowContext


class MeetingStructurePlanningAgent(BaseAgent):
    name = "meeting-structure-planning"

    def run(self, context: WorkflowContext) -> WorkflowContext:
        request = context.payload["report_request"]
        template = request.template
        context.memory["report_outline"] = {
            "title": request.meeting_title,
            "template": template,
            "sections": [
                "本周工作概述",
                "研究进展",
                "文献调研",
                "当前问题与挑战",
                "下一步计划",
                "需要导师指导的问题",
            ],
        }
        return context
