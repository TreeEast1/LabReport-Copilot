from fastapi import APIRouter

from app.models.domain import AdvisorProfile, ResearchProfile
from app.schemas.dto import AdvisorProfileDTO, ResearchProfileDTO
from app.services.profile_service import ProfileService

router = APIRouter()
service = ProfileService()


@router.get("/user", response_model=ResearchProfileDTO)
def get_user_profile() -> ResearchProfile:
    return service.get_user_profile()


@router.put("/user", response_model=ResearchProfileDTO)
def save_user_profile(payload: ResearchProfileDTO) -> ResearchProfile:
    return service.save_user_profile(ResearchProfile.model_validate(payload.model_dump()))


@router.get("/advisor", response_model=AdvisorProfileDTO)
def get_advisor_profile() -> AdvisorProfile:
    return service.get_advisor_profile()


@router.put("/advisor", response_model=AdvisorProfileDTO)
def save_advisor_profile(payload: AdvisorProfileDTO) -> AdvisorProfile:
    return service.save_advisor_profile(AdvisorProfile.model_validate(payload.model_dump()))
