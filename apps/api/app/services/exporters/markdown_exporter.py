from app.services.exporters.base import BaseExporter


class MarkdownExporter(BaseExporter):
    name = "markdown-exporter"

    def render(self, outline: dict, sections: dict) -> str:
        context_notes = "\n".join(f"- {item}" for item in sections["context_notes"] if item)
        return f"""# {outline["title"]}

## 一、本周工作概述
- {sections["overview"]}

## 二、研究进展
### 2.1 已完成内容
{self._as_bullets(sections["progress"])}

### 2.2 当前实验/模型结果
- 结合本周输入与已有材料，当前阶段的实验结果已完成初步整理，建议在正式汇报时补充关键图表与基线对比结论。

## 三、文献调研
### 3.1 调研主题
- {sections["literature"]}

### 3.2 代表论文总结
- 当前 MVP 默认保留文献总结位，后续可由论文调研 Agent 自动填充具体论文条目、方法亮点与局限性。

### 3.3 对本课题的启发
- 建议将文献阅读重点进一步映射到自身课题的实验设计、创新点凝练和问题归因上。

## 四、当前问题与挑战
- {sections["problems"]}

## 五、下一步计划
- {sections["next_plan"]}

## 六、需要导师指导的问题
- {sections["mentor_questions"]}

## 七、补充上下文说明
{context_notes or "- 暂无补充上下文。"}

## 八、语音整理摘要
- {sections["voice_summary"]}
"""

    @staticmethod
    def _as_bullets(text: str) -> str:
        lines = [line.strip("- ").strip() for line in text.splitlines() if line.strip()]
        if not lines:
            return "- 暂无补充"
        return "\n".join(f"- {line}" for line in lines)
