class FeishuExporter:
    name = "feishu-exporter"

    def render(self, markdown: str) -> dict:
        return {
            "format": "feishu_docx",
            "status": "reserved",
            "message": "MVP 阶段先预留飞书导出接口，后续可接入飞书开放平台创建云文档。",
            "content": markdown,
        }
