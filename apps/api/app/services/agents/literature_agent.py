from app.models.domain import LiteraturePaper, LiteratureResearchRequest, LiteratureResearchResult
from app.services.agents.base import BaseAgent, WorkflowContext


class LiteratureResearchAgent(BaseAgent):
    name = "literature-research"

    def run(self, context: WorkflowContext) -> WorkflowContext:
        request: LiteratureResearchRequest = context.payload["literature_request"]
        keywords = [item.strip() for item in request.keywords.split(",") if item.strip()]
        papers = [
            LiteraturePaper(
                title=f"{request.topic} 方向代表工作 {index + 1}",
                contribution=f"围绕关键词 {', '.join(keywords[:2] or ['主题'])} 提出更稳定的建模或检索策略。",
                limitations="实验设置仍偏理想化，对真实科研任务或跨数据集泛化分析不足。",
                inspiration=f"可借鉴其方法设计更清晰的对比实验，并突出与{request.research_direction or '当前课题'}的结合点。",
            )
            for index in range(request.target_count)
        ]
        context.memory["literature_result"] = LiteratureResearchResult(
            topic=request.topic,
            summary=f"围绕“{request.topic}”在{request.time_range}内进行了模拟调研，共整理 {request.target_count} 篇代表性工作，重点关注方法创新、局限性和对当前课题的启发。",
            papers=papers,
            meeting_ready_summary=(
                f"从组会角度看，当前方向的研究重点已从基础性能提升逐步转向更强的泛化能力、可解释性与任务适配。"
                f"若后续继续推进，建议优先明确自身课题与这些工作的差异化贡献。"
            ),
        )
        return context
