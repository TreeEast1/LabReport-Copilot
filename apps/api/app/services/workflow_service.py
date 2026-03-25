from app.models.domain import ReportGenerationRequest
from app.services.agents.advisor_agent import AdvisorStyleModelingAgent
from app.services.agents.base import WorkflowContext
from app.services.agents.materials_agent import HistoricalMaterialsSummaryAgent
from app.services.agents.multimodal_agent import MultimodalAnalysisAgent
from app.services.agents.output_agent import OutputFormattingAgent
from app.services.agents.planning_agent import MeetingStructurePlanningAgent
from app.services.agents.profile_agent import UserProfileUnderstandingAgent
from app.services.agents.writing_agent import MeetingWritingAgent
from app.services.llm.prompts import build_report_system_prompt, build_report_user_prompt
from app.services.llm.service import LLMService
from app.storage.repositories import MaterialsRepository, ProfileRepository


class WorkflowService:
    def __init__(self) -> None:
        self.llm = LLMService()
        self.agents = [
            UserProfileUnderstandingAgent(),
            AdvisorStyleModelingAgent(),
            HistoricalMaterialsSummaryAgent(),
            MultimodalAnalysisAgent(),
            MeetingStructurePlanningAgent(),
            MeetingWritingAgent(),
            OutputFormattingAgent(),
        ]

    def run_report_generation(self, request: ReportGenerationRequest) -> tuple[str, str]:
        user_profile = ProfileRepository.get_user_profile()
        advisor_profile = ProfileRepository.get_advisor_profile()
        materials = MaterialsRepository.list_materials()
        context = WorkflowContext(
            payload={
                "report_request": request,
                "user_profile": user_profile,
                "advisor_profile": advisor_profile,
                "materials": materials,
            }
        )

        for agent in self.agents:
            context = agent.run(context)

        markdown = context.memory["markdown"]
        try:
            markdown = self.llm.generate(
                system_prompt=build_report_system_prompt(),
                user_prompt=build_report_user_prompt(
                    request=request,
                    user_profile=user_profile,
                    advisor_profile=advisor_profile,
                    materials_summary=context.memory.get("materials_summary", ""),
                    multimodal_summary=context.memory.get("multimodal_summary", ""),
                ),
                temperature=0.3,
            )
        except Exception:
            pass

        summary = (
            f"已基于本周进展、导师风格与历史材料生成“{request.meeting_title}”，"
            f"当前模板为{request.template}，适合直接复制至飞书云文档。"
        )
        return markdown, summary
