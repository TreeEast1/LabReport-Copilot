from datetime import datetime
from uuid import uuid4

from app.core.config import DATA_DIR
from app.models.domain import (
    AdvisorProfile,
    MaterialAsset,
    MeetingReport,
    ResearchProfile,
)
from app.storage.json_store import JsonStore


profile_store = JsonStore(DATA_DIR / "user_profile.json", ResearchProfile().model_dump(mode="json"))
advisor_store = JsonStore(DATA_DIR / "advisor_profile.json", AdvisorProfile().model_dump(mode="json"))
materials_store = JsonStore(DATA_DIR / "materials.json", [])
reports_store = JsonStore(DATA_DIR / "reports.json", [])


class ProfileRepository:
    @staticmethod
    def get_user_profile() -> ResearchProfile:
        return ResearchProfile.model_validate(profile_store.load())

    @staticmethod
    def save_user_profile(profile: ResearchProfile) -> ResearchProfile:
        profile_store.save(profile.model_dump(mode="json"))
        return profile

    @staticmethod
    def get_advisor_profile() -> AdvisorProfile:
        return AdvisorProfile.model_validate(advisor_store.load())

    @staticmethod
    def save_advisor_profile(profile: AdvisorProfile) -> AdvisorProfile:
        advisor_store.save(profile.model_dump(mode="json"))
        return profile


class MaterialsRepository:
    @staticmethod
    def list_materials() -> list[MaterialAsset]:
        return [MaterialAsset.model_validate(item) for item in materials_store.load()]

    @staticmethod
    def add_material(filename: str, material_type: str, description: str, file_path: str) -> MaterialAsset:
        materials = materials_store.load()
        material = MaterialAsset(
            id=str(uuid4()),
            filename=filename,
            material_type=material_type,
            description=description,
            file_path=file_path,
            created_at=datetime.utcnow(),
        )
        materials.insert(0, material.model_dump(mode="json"))
        materials_store.save(materials)
        return material


class ReportsRepository:
    @staticmethod
    def list_reports() -> list[MeetingReport]:
        return [MeetingReport.model_validate(item) for item in reports_store.load()]

    @staticmethod
    def save_report(title: str, template: str, markdown: str, summary: str) -> MeetingReport:
        reports = reports_store.load()
        report = MeetingReport(
            id=str(uuid4()),
            title=title,
            created_at=datetime.utcnow(),
            template=template,
            markdown=markdown,
            summary=summary,
        )
        reports.insert(0, report.model_dump(mode="json"))
        reports_store.save(reports)
        return report
