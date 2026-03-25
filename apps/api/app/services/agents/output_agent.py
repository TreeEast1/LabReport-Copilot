from app.services.agents.base import BaseAgent, WorkflowContext
from app.services.exporters.markdown_exporter import MarkdownExporter


class OutputFormattingAgent(BaseAgent):
    name = "output-formatting"

    def __init__(self) -> None:
        self.markdown_exporter = MarkdownExporter()

    def run(self, context: WorkflowContext) -> WorkflowContext:
        markdown = self.markdown_exporter.render(context.memory["report_outline"], context.memory["report_sections"])
        context.memory["markdown"] = markdown
        return context
