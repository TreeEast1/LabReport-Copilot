from fastapi import APIRouter, File, Form, UploadFile

from app.models.domain import MaterialAsset
from app.schemas.dto import MaterialAssetDTO
from app.services.materials_service import MaterialsService

router = APIRouter()
service = MaterialsService()


@router.get("", response_model=list[MaterialAssetDTO])
def list_materials() -> list[MaterialAsset]:
    return service.list_materials()


@router.post("/upload", response_model=MaterialAssetDTO)
async def upload_material(
    file: UploadFile = File(...),
    material_type: str = Form(...),
    description: str = Form(""),
) -> MaterialAsset:
    return await service.save_upload(file, material_type, description)
