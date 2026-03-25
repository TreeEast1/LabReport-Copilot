from app.models.domain import MeetingReport, ReportGenerationRequest
from app.services.workflow_service import WorkflowService
from app.storage.repositories import ReportsRepository


class ReportsService:
    def __init__(self) -> None:
        self.workflow = WorkflowService()

    def list_reports(self) -> list[MeetingReport]:
        return ReportsRepository.list_reports()

    def generate_report(self, request: ReportGenerationRequest) -> MeetingReport:
        markdown, summary = self.workflow.run_report_generation(request)
        return ReportsRepository.save_report(
            title=request.meeting_title,
            template=request.template,
            markdown=markdown,
            summary=summary,
        )
