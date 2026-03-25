from fastapi import APIRouter

from app.api.routers import materials, profile, reports, research

api_router = APIRouter()
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(materials.router, prefix="/materials", tags=["materials"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(research.router, prefix="/research", tags=["research"])
