from app.models.domain import ReportGenerationRequest
from app.services.agents.advisor_agent import AdvisorStyleModelingAgent
from app.services.agents.base import WorkflowContext
from app.services.agents.materials_agent import HistoricalMaterialsSummaryAgent
from app.services.agents.multimodal_agent import MultimodalAnalysisAgent
from app.services.agents.output_agent import OutputFormattingAgent
from app.services.agents.planning_agent import MeetingStructurePlanningAgent
from app.services.agents.profile_agent import UserProfileUnderstandingAgent
from app.services.agents.writing_agent import MeetingWritingAgent
from app.storage.repositories import MaterialsRepository, ProfileRepository


class WorkflowService:
    def __init__(self) -> None:
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
        context = WorkflowContext(
            payload={
                "report_request": request,
                "user_profile": ProfileRepository.get_user_profile(),
                "advisor_profile": ProfileRepository.get_advisor_profile(),
                "materials": MaterialsRepository.list_materials(),
            }
        )

        for agent in self.agents:
            context = agent.run(context)

        summary = (
            f"已基于本周进展、导师风格与历史材料生成“{request.meeting_title}”，"
            f"当前模板为{request.template}，适合直接复制至飞书云文档。"
        )
        return context.memory["markdown"], summary
