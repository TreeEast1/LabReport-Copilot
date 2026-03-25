import json
from pathlib import Path
from typing import Any


class JsonStore:
    def __init__(self, path: Path, default_data: Any):
        self.path = path
        self.default_data = default_data

    def load(self) -> Any:
        if not self.path.exists():
            self.save(self.default_data)
            return self.default_data
        return json.loads(self.path.read_text(encoding="utf-8"))

    def save(self, data: Any) -> None:
        self.path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
