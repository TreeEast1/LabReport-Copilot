class BaseExporter:
    name = "base-exporter"

    def render(self, *args, **kwargs) -> str:
        raise NotImplementedError
