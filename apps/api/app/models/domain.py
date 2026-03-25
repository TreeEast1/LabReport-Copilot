from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class ResearchProfile(BaseModel):
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
    report_preference: Literal["正式", "简洁", "学术", "工程导向"] = "正式"


class AdvisorProfile(BaseModel):
    advisor_name: str = ""
    tone: str = "严格"
    focus: list[str] = Field(default_factory=lambda: ["逻辑清晰", "实验结果"])
    expression_preference: str = "喜欢先讲结论再展开过程"
    prefers_charts: bool = True
    conclusion_first: bool = True
    prefers_three_stage: bool = True
    likes_critical_review: bool = False
    notes: str = ""


class MaterialAsset(BaseModel):
    id: str
    filename: str
    material_type: str
    description: str = ""
    file_path: str
    created_at: datetime


class ReportGenerationRequest(BaseModel):
    meeting_title: str
    week_summary: str
    progress_details: str
    literature_notes: str
    current_problems: str
    next_plan: str
    mentor_questions: str
    template: str
    voice_transcript: str = ""


class MeetingReport(BaseModel):
    id: str
    title: str
    created_at: datetime
    template: str
    markdown: str
    summary: str


class LiteratureResearchRequest(BaseModel):
    topic: str
    keywords: str
    time_range: str
    target_count: int = 5
    research_direction: str = ""


class LiteraturePaper(BaseModel):
    title: str
    contribution: str
    limitations: str
    inspiration: str


class LiteratureResearchResult(BaseModel):
    topic: str
    summary: str
    papers: list[LiteraturePaper]
    meeting_ready_summary: str
