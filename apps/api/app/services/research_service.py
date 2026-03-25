from app.models.domain import LiteratureResearchRequest, LiteratureResearchResult
from app.services.agents.base import WorkflowContext
from app.services.agents.literature_agent import LiteratureResearchAgent


class ResearchService:
    def __init__(self) -> None:
        self.agent = LiteratureResearchAgent()

    def run_literature_research(self, request: LiteratureResearchRequest) -> LiteratureResearchResult:
        context = WorkflowContext(payload={"literature_request": request})
        context = self.agent.run(context)
        return context.memory["literature_result"]
