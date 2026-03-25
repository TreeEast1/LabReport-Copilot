from datetime import datetime

from pydantic import BaseModel, ConfigDict


def to_camel(string: str) -> str:
    parts = string.split("_")
    return parts[0] + "".join(word.capitalize() for word in parts[1:])


class CamelModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)


class ResearchProfileDTO(CamelModel):
    name: str = ""
    degree: str = "硕士"
    university: str = ""
    school: str = ""
    major: str = ""
    research_direction: str = ""
    topic: str = ""
    stage: str = ""
    language: str = "中文"
    terminology_style: str = ""
    report_preference: str = "正式"


class AdvisorProfileDTO(CamelModel):
    advisor_name: str = ""
    tone: str = "严格"
    focus: list[str] = []
    expression_preference: str = ""
    prefers_charts: bool = True
    conclusion_first: bool = True
    prefers_three_stage: bool = True
    likes_critical_review: bool = False
    notes: str = ""


class MaterialAssetDTO(CamelModel):
    id: str
    filename: str
    material_type: str
    description: str = ""
    created_at: datetime


class ReportGenerationRequestDTO(CamelModel):
    meeting_title: str
    week_summary: str
    progress_details: str
    literature_notes: str
    current_problems: str
    next_plan: str
    mentor_questions: str
    template: str
    voice_transcript: str = ""


class MeetingReportDTO(CamelModel):
    id: str
    title: str
    created_at: datetime
    template: str
    markdown: str
    summary: str


class LiteratureResearchRequestDTO(CamelModel):
    topic: str
    keywords: str
    time_range: str
    target_count: int = 5
    research_direction: str = ""


class LiteraturePaperDTO(CamelModel):
    title: str
    contribution: str
    limitations: str
    inspiration: str


class LiteratureResearchResultDTO(CamelModel):
    topic: str
    summary: str
    papers: list[LiteraturePaperDTO]
    meeting_ready_summary: str
