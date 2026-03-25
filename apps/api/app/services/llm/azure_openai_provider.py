import json
from typing import Optional

import httpx

from app.core.config import settings
from app.services.llm.base import BaseLLMProvider, LLMMessage


class AzureOpenAIProvider(BaseLLMProvider):
    name = "azure_openai"

    def generate(self, messages: list[LLMMessage], temperature: Optional[float] = None) -> str:
        if not settings.azure_openai_endpoint or not settings.azure_openai_api_key:
            raise ValueError("未配置 Azure OpenAI endpoint 或 api_key。")

        deployment = settings.azure_openai_deployment or settings.llm_model
        base_url = settings.azure_openai_endpoint.rstrip("/")
        url = (
            f"{base_url}/openai/deployments/{deployment}/chat/completions"
            f"?api-version={settings.azure_openai_api_version}"
        )
        payload = {
            "messages": [{"role": message.role, "content": message.content} for message in messages],
            "temperature": settings.llm_temperature if temperature is None else temperature,
        }

        with httpx.Client(timeout=settings.llm_timeout_seconds) as client:
            response = client.post(
                url,
                headers={
                    "api-key": settings.azure_openai_api_key,
                    "Content-Type": "application/json",
                },
                json=payload,
            )
            response.raise_for_status()
            data = response.json()

        try:
            return data["choices"][0]["message"]["content"].strip()
        except (KeyError, IndexError, AttributeError) as exc:
            raise ValueError(f"Azure OpenAI 返回格式异常: {json.dumps(data, ensure_ascii=False)[:400]}") from exc
