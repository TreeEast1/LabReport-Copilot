from fastapi import APIRouter

from app.models.domain import LiteratureResearchRequest, LiteratureResearchResult
from app.schemas.dto import LiteratureResearchRequestDTO, LiteratureResearchResultDTO
from app.services.research_service import ResearchService

router = APIRouter()
service = ResearchService()


@router.post("/literature", response_model=LiteratureResearchResultDTO)
def literature_research(payload: LiteratureResearchRequestDTO) -> LiteratureResearchResult:
    request = LiteratureResearchRequest.model_validate(payload.model_dump())
    return service.run_literature_research(request)
