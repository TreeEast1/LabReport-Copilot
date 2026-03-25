from app.services.agents.base import BaseAgent, WorkflowContext


class MeetingWritingAgent(BaseAgent):
    name = "meeting-writing"

    def run(self, context: WorkflowContext) -> WorkflowContext:
        request = context.payload["report_request"]
        user_summary = context.memory.get("user_profile_summary", "")
        advisor_summary = context.memory.get("advisor_style_summary", "")
        materials_summary = context.memory.get("materials_summary", "")
        multimodal_summary = context.memory.get("multimodal_summary", "")

        context.memory["report_sections"] = {
            "overview": request.week_summary,
            "progress": request.progress_details,
            "literature": request.literature_notes or "本周暂无单独补充的文献调研内容。",
            "problems": request.current_problems,
            "next_plan": request.next_plan,
            "mentor_questions": request.mentor_questions,
            "context_notes": [user_summary, advisor_summary, materials_summary, multimodal_summary],
            "voice_summary": request.voice_transcript or "暂无额外语音转写输入。",
        }
        return context
