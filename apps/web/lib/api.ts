import type {
  AdvisorProfile,
  LiteratureResearchRequest,
  LiteratureResearchResult,
  MaterialAsset,
  MeetingReport,
  ReportGenerationRequest,
  ResearchProfile
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`请求失败: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getUserProfile: () => request<ResearchProfile>("/profile/user"),
  saveUserProfile: (payload: ResearchProfile) =>
    request<ResearchProfile>("/profile/user", {
      method: "PUT",
      body: JSON.stringify(payload)
    }),

  getAdvisorProfile: () => request<AdvisorProfile>("/profile/advisor"),
  saveAdvisorProfile: (payload: AdvisorProfile) =>
    request<AdvisorProfile>("/profile/advisor", {
      method: "PUT",
      body: JSON.stringify(payload)
    }),

  getMaterials: () => request<MaterialAsset[]>("/materials"),

  uploadMaterial: async (payload: { file: File; materialType: string; description: string }) => {
    const form = new FormData();
    form.append("file", payload.file);
    form.append("material_type", payload.materialType);
    form.append("description", payload.description);

    const response = await fetch(`${API_BASE_URL}/materials/upload`, {
      method: "POST",
      body: form
    });

    if (!response.ok) {
      throw new Error(`上传失败: ${response.status}`);
    }

    return response.json() as Promise<MaterialAsset>;
  },

  generateReport: (payload: ReportGenerationRequest) =>
    request<MeetingReport>("/reports/generate", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  getReports: () => request<MeetingReport[]>("/reports"),

  runLiteratureResearch: (payload: LiteratureResearchRequest) =>
    request<LiteratureResearchResult>("/research/literature", {
      method: "POST",
      body: JSON.stringify(payload)
    })
};
