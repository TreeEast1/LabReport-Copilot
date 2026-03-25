from dataclasses import dataclass, field
from typing import Any


@dataclass
class WorkflowContext:
    payload: dict[str, Any]
    memory: dict[str, Any] = field(default_factory=dict)


class BaseAgent:
    name = "base-agent"

    def run(self, context: WorkflowContext) -> WorkflowContext:
        raise NotImplementedError
