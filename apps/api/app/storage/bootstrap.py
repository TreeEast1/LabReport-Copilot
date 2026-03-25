from app.core.config import DATA_DIR, UPLOAD_DIR


def bootstrap_storage() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
