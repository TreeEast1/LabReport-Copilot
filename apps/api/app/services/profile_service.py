from app.models.domain import AdvisorProfile, ResearchProfile
from app.storage.repositories import ProfileRepository


class ProfileService:
    def get_user_profile(self) -> ResearchProfile:
        return ProfileRepository.get_user_profile()

    def save_user_profile(self, profile: ResearchProfile) -> ResearchProfile:
        return ProfileRepository.save_user_profile(profile)

    def get_advisor_profile(self) -> AdvisorProfile:
        return ProfileRepository.get_advisor_profile()

    def save_advisor_profile(self, profile: AdvisorProfile) -> AdvisorProfile:
        return ProfileRepository.save_advisor_profile(profile)
