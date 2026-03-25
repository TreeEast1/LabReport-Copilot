from typing import Optional

from app.services.llm.base import BaseLLMProvider, LLMMessage


class MockLLMProvider(BaseLLMProvider):
    name = "mock"

    def generate(self, messages: list[LLMMessage], temperature: Optional[float] = None) -> str:
        _ = temperature
        return messages[-1].content if messages else ""
