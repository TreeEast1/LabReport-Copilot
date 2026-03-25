import json
from typing import Optional

import httpx

from app.core.config import settings
from app.services.llm.base import BaseLLMProvider, LLMMessage


class OpenAICompatibleProvider(BaseLLMProvider):
    name = "openai_compatible"

    def generate(self, messages: list[LLMMessage], temperature: Optional[float] = None) -> str:
        if not settings.openai_compatible_base_url or not settings.openai_compatible_api_key:
            raise ValueError("未配置 OpenAI 兼容接口的 base_url 或 api_key。")

        model = settings.openai_compatible_model or settings.llm_model
        url = f"{settings.openai_compatible_base_url.rstrip('/')}{settings.openai_compatible_path}"
        payload = {
            "model": model,
            "messages": [{"role": message.role, "content": message.content} for message in messages],
            "temperature": settings.llm_temperature if temperature is None else temperature,
        }

        with httpx.Client(timeout=settings.llm_timeout_seconds) as client:
            response = client.post(
                url,
                headers={
                    "Authorization": f"Bearer {settings.openai_compatible_api_key}",
                    "Content-Type": "application/json",
                },
                json=payload,
            )
            response.raise_for_status()
            data = response.json()

        try:
            return data["choices"][0]["message"]["content"].strip()
        except (KeyError, IndexError, AttributeError) as exc:
            raise ValueError(f"OpenAI 兼容接口返回格式异常: {json.dumps(data, ensure_ascii=False)[:400]}") from exc
