from typing import Optional

from dataclasses import dataclass


@dataclass
class LLMMessage:
    role: str
    content: str


class BaseLLMProvider:
    name = "base"

    def generate(self, messages: list[LLMMessage], temperature: Optional[float] = None) -> str:
        raise NotImplementedError
