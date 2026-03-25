from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile

from app.core.config import UPLOAD_DIR
from app.models.domain import MaterialAsset
from app.storage.repositories import MaterialsRepository


class MaterialsService:
    def list_materials(self) -> list[MaterialAsset]:
        return MaterialsRepository.list_materials()

    async def save_upload(self, file: UploadFile, material_type: str, description: str) -> MaterialAsset:
        suffix = Path(file.filename or "").suffix
        stored_name = f"{uuid4()}{suffix}"
        target_path = UPLOAD_DIR / stored_name
        content = await file.read()
        target_path.write_bytes(content)
        return MaterialsRepository.add_material(
            filename=file.filename or stored_name,
            material_type=material_type,
            description=description,
            file_path=str(target_path),
        )
