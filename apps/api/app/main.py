from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.storage.bootstrap import bootstrap_storage


def create_app() -> FastAPI:
    bootstrap_storage()

    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        description="面向中国科研组会场景的 AI Copilot 后端服务",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(api_router, prefix=settings.api_prefix)

    @app.get("/health", tags=["health"])
    def health_check() -> dict[str, str]:
        return {"status": "ok"}

    return app


app = create_app()
