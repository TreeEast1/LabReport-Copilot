from typing import Optional

from app.core.config import settings
from app.services.llm.azure_openai_provider import AzureOpenAIProvider
from app.services.llm.base import LLMMessage
from app.services.llm.mock_provider import MockLLMProvider
from app.services.llm.openai_compatible_provider import OpenAICompatibleProvider


class LLMService:
    def __init__(self) -> None:
        provider_name = settings.llm_provider.lower()
        if provider_name == "azure_openai":
            self.provider = AzureOpenAIProvider()
        elif provider_name == "openai_compatible":
            self.provider = OpenAICompatibleProvider()
        else:
            self.provider = MockLLMProvider()

    def generate(self, system_prompt: str, user_prompt: str, temperature: Optional[float] = None) -> str:
        messages = [
            LLMMessage(role="system", content=system_prompt),
            LLMMessage(role="user", content=user_prompt),
        ]
        return self.provider.generate(messages, temperature=temperature)
