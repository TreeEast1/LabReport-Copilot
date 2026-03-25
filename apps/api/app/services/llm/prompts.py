from app.models.domain import AdvisorProfile, LiteratureResearchRequest, ReportGenerationRequest, ResearchProfile


def build_report_system_prompt() -> str:
    return (
        "你是 LabReport Copilot 的科研组会写作 Agent。"
        "请面向中国高校实验室的真实组会场景，用自然、克制、学术化但不空泛的中文输出 Markdown。"
        "重点围绕本周进展、问题、原因、下周计划和希望导师指导的问题组织内容。"
    )


def build_report_user_prompt(
    request: ReportGenerationRequest,
    user_profile: ResearchProfile,
    advisor_profile: AdvisorProfile,
    materials_summary: str,
    multimodal_summary: str,
) -> str:
    return f"""
请根据以下信息生成一份完整组会 Markdown，不要输出解释，只输出最终 Markdown。

组会标题：{request.meeting_title}
报告模板：{request.template}

用户科研画像：
- 姓名：{user_profile.name or "未填写"}
- 学历：{user_profile.degree}
- 学校：{user_profile.university or "未填写"}
- 学院：{user_profile.school or "未填写"}
- 专业：{user_profile.major or "未填写"}
- 研究方向：{user_profile.research_direction or "未填写"}
- 课题：{user_profile.topic or "未填写"}
- 当前阶段：{user_profile.stage or "未填写"}
- 汇报偏好：{user_profile.report_preference}
- 术语风格：{user_profile.terminology_style or "未填写"}

导师画像：
- 导师名称：{advisor_profile.advisor_name or "未填写"}
- 风格：{advisor_profile.tone}
- 关注重点：{", ".join(advisor_profile.focus) if advisor_profile.focus else "逻辑清晰"}
- 表达偏好：{advisor_profile.expression_preference}
- 喜欢先讲结论：{"是" if advisor_profile.conclusion_first else "否"}
- 偏好三段式：{"是" if advisor_profile.prefers_three_stage else "否"}
- 喜欢批判性文献总结：{"是" if advisor_profile.likes_critical_review else "否"}
- 备注：{advisor_profile.notes or "无"}

本周输入：
- 本周工作概述：{request.week_summary}
- 具体进展：{request.progress_details}
- 文献调研情况：{request.literature_notes or "暂无"}
- 当前问题：{request.current_problems}
- 下一步计划：{request.next_plan}
- 希望导师指导的问题：{request.mentor_questions}
- 语音整理补充：{request.voice_transcript or "暂无"}

补充上下文：
- 历史材料摘要：{materials_summary}
- 多模态材料摘要：{multimodal_summary}

请使用以下结构：
# 第X次组会汇报
## 一、本周工作概述
## 二、研究进展
### 2.1 已完成内容
### 2.2 当前实验/模型结果
## 三、文献调研
### 3.1 调研主题
### 3.2 代表论文总结
### 3.3 对本课题的启发
## 四、当前问题与挑战
## 五、下一步计划
## 六、需要导师指导的问题
""".strip()


def build_literature_system_prompt() -> str:
    return (
        "你是科研文献调研 Agent。请输出适合中国实验室组会汇报的结构化中文结果。"
        "不要写空话，要强调代表论文、方法亮点、局限性和对课题的启发。"
        "如果用户没有提供外部检索结果，也不要先说自己不能联网。"
        "你应当基于已有知识先给出尽可能有用的调研综述；当具体论文标题不完全确定时，可以使用方向性表述，但整体输出仍需完整可用。"
    )


def build_literature_user_prompt(request: LiteratureResearchRequest) -> str:
    return f"""
请围绕以下主题生成组会场景下的文献调研结果，使用 JSON 输出，字段必须为：
topic, summary, papers, meeting_ready_summary
其中 papers 是数组，每项包含 title, contribution, limitations, inspiration。

调研主题：{request.topic}
关键词：{request.keywords}
时间范围：{request.time_range}
目标数量：{request.target_count}
研究方向：{request.research_direction or "未填写"}

要求：
1. 输出内容贴近组会文献调研汇报
2. 每篇论文结论简洁、真实
3. meeting_ready_summary 要能直接放进组会发言稿
4. 不要输出“我无法联网”“需要用户提供链接”之类的前置说明
5. 如果具体论文标题把握不足，可以使用“代表工作 A/B/C”风格，但内容仍需有洞察
""".strip()
