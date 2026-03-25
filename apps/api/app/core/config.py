from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[2]
DATA_DIR = BASE_DIR / "data"
UPLOAD_DIR = BASE_DIR / "uploads"


class Settings(BaseSettings):
    app_name: str = "LabReport Copilot API"
    app_env: str = "development"
    api_prefix: str = "/api/v1"
    cors_origins: list[str] = ["http://localhost:3000"]
    llm_provider: str = "mock"
    llm_model: str = "gpt-5.2"
    llm_temperature: float = 0.3
    llm_timeout_seconds: int = 90

    openai_compatible_base_url: str = ""
    openai_compatible_api_key: str = ""
    openai_compatible_model: str = ""
    openai_compatible_path: str = "/v1/chat/completions"

    azure_openai_endpoint: str = ""
    azure_openai_api_key: str = ""
    azure_openai_deployment: str = "gpt-5.2"
    azure_openai_api_version: str = "2024-10-21"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


settings = Settings()
