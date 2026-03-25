from app.services.agents.base import BaseAgent, WorkflowContext


class UserProfileUnderstandingAgent(BaseAgent):
    name = "user-profile-understanding"

    def run(self, context: WorkflowContext) -> WorkflowContext:
        profile = context.payload["user_profile"]
        context.memory["user_profile_summary"] = (
            f"{profile.name or '该用户'}，当前身份为{profile.degree}，研究方向为{profile.research_direction or '待补充'}，"
            f"课题聚焦“{profile.topic or '待补充'}”，当前阶段为{profile.stage or '待补充'}。"
        )
        return context
