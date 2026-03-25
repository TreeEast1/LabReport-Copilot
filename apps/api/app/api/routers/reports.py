from fastapi import APIRouter

from app.models.domain import MeetingReport, ReportGenerationRequest
from app.schemas.dto import MeetingReportDTO, ReportGenerationRequestDTO
from app.services.reports_service import ReportsService

router = APIRouter()
service = ReportsService()


@router.get("", response_model=list[MeetingReportDTO])
def list_reports() -> list[MeetingReport]:
    return service.list_reports()


@router.post("/generate", response_model=MeetingReportDTO)
def generate_report(payload: ReportGenerationRequestDTO) -> MeetingReport:
    request = ReportGenerationRequest.model_validate(payload.model_dump())
    return service.generate_report(request)
