export type ReportStyle = "正式" | "简洁" | "学术" | "工程导向";
export type ReportTemplate = "简洁版" | "学术详细版" | "工程进展版" | "文献汇报版";

export interface ResearchProfile {
  name: string;
  degree: string;
  university: string;
  school: string;
  major: string;
  researchDirection: string;
  topic: string;
  stage: string;
  language: string;
  terminologyStyle: string;
  reportPreference: ReportStyle;
}

export interface AdvisorProfile {
  advisorName: string;
  tone: string;
  focus: string[];
  expressionPreference: string;
  prefersCharts: boolean;
  conclusionFirst: boolean;
  prefersThreeStage: boolean;
  likesCriticalReview: boolean;
  notes: string;
}

export interface MaterialAsset {
  id: string;
  filename: string;
  materialType: string;
  description: string;
  createdAt: string;
}

export interface LiteratureResearchRequest {
  topic: string;
  keywords: string;
  timeRange: string;
  targetCount: number;
  researchDirection: string;
}

export interface LiteratureResearchResult {
  topic: string;
  summary: string;
  papers: Array<{
    title: string;
    contribution: string;
    limitations: string;
    inspiration: string;
  }>;
  meetingReadySummary: string;
}

export interface ReportGenerationRequest {
  meetingTitle: string;
  weekSummary: string;
  progressDetails: string;
  literatureNotes: string;
  currentProblems: string;
  nextPlan: string;
  mentorQuestions: string;
  template: ReportTemplate;
  voiceTranscript: string;
}

export interface MeetingReport {
  id: string;
  title: string;
  createdAt: string;
  template: string;
  markdown: string;
  summary: string;
}
