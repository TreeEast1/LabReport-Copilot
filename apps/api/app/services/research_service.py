import json

from app.models.domain import LiteratureResearchRequest, LiteratureResearchResult
from app.services.agents.base import WorkflowContext
from app.services.agents.literature_agent import LiteratureResearchAgent
from app.services.llm.prompts import build_literature_system_prompt, build_literature_user_prompt
from app.services.llm.service import LLMService


class ResearchService:
    def __init__(self) -> None:
        self.agent = LiteratureResearchAgent()
        self.llm = LLMService()

    def run_literature_research(self, request: LiteratureResearchRequest) -> LiteratureResearchResult:
        try:
            content = self.llm.generate(
                system_prompt=build_literature_system_prompt(),
                user_prompt=build_literature_user_prompt(request),
                temperature=0.2,
            )
            data = json.loads(self._extract_json(content))
            return LiteratureResearchResult.model_validate(data)
        except Exception:
            pass

        context = WorkflowContext(payload={"literature_request": request})
        context = self.agent.run(context)
        return context.memory["literature_result"]

    @staticmethod
    def _extract_json(content: str) -> str:
        cleaned = content.strip()
        if cleaned.startswith("```"):
            lines = cleaned.splitlines()
            cleaned = "\n".join(lines[1:-1]).strip()
        return cleaned
