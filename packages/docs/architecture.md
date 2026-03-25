# LabReport Copilot 系统架构设计

## 一、总体架构

项目采用前后端分离的可扩展架构：

1. `apps/web`：面向科研用户的中文 Web 前端
2. `apps/api`：负责资料管理、工作流编排、报告生成的后端服务
3. `packages/docs`：项目架构、路线图、工作流与开源说明

## 二、核心模块分层

### 1. 表现层

前端页面覆盖：

- 首页
- 用户科研画像
- 导师画像
- 材料库
- 论文调研
- 组会生成
- 历史记录

### 2. 应用层

由 API 路由与工作流服务组成：

- Profile API
- Advisor API
- Materials API
- Reports API
- Research API
- Workflow API

### 3. 领域层

定义科研场景核心对象：

- 用户科研画像 `ResearchProfile`
- 导师画像 `AdvisorProfile`
- 上传材料 `MaterialAsset`
- 组会生成请求 `ReportGenerationRequest`
- 历史报告 `MeetingReport`
- 论文调研请求与结果 `LiteratureResearchRequest`

### 4. Agent Workflow 层

通过可替换的 Agent 节点编排组会生成过程：

1. 用户画像理解 Agent
2. 导师风格建模 Agent
3. 历史材料总结 Agent
4. 论文调研 Agent
5. 多模态分析 Agent
6. 组会结构规划 Agent
7. 汇报内容写作 Agent
8. Markdown / 飞书输出 Agent

当前 MVP 使用规则化实现模拟 Agent 协同；后续可直接替换为：

- OpenAI / 阿里云 / 智谱 / DeepSeek 等模型服务
- RAG 检索
- OCR / 图像理解
- ASR 语音转写
- 飞书 API 文档生成

## 三、数据流

### 工作流 A：普通周组会生成

1. 用户填写本周进展与问题
2. 系统加载用户画像、导师画像、历史材料
3. 工作流规划组会结构
4. 内容写作模块输出结构化草稿
5. Markdown 导出模块生成最终文档
6. 报告进入历史记录

### 工作流 B：语音整理成组会报告

1. 上传录音或转写文本
2. 语音接口进行转写或读取文本
3. 口语清洗模块整理为研究进展摘要
4. 汇报生成模块合并为组会文档

### 工作流 C：文献调研组会

1. 输入调研主题、关键词、时间范围
2. 论文调研 Agent 拉取或模拟整理近期论文
3. 输出结构化文献综述
4. 结果可纳入组会报告正文

### 工作流 D：多模态材料分析

1. 用户上传实验图、结果图、表格截图等
2. 多模态分析模块生成图像摘要与问题提示
3. 输出适合写入汇报的说明文字

### 工作流 E：长期科研记忆积累

1. 历史组会、调研结果、上传材料持续沉淀
2. 后续生成时作为上下文记忆输入
3. 为个性化写作提供长期支撑

## 四、目录结构

```text
apps/
  web/
    app/
    components/
    lib/
    types/
  api/
    app/
      api/
      core/
      models/
      schemas/
      services/
      storage/
packages/
  docs/
```

## 五、可扩展设计原则

- Agent 职责单一，便于替换模型和扩展节点
- 输出层抽象 exporter，便于增加 Feishu / HTML / PDF
- 存储层抽象 repository，便于从本地 JSON 切换到 PostgreSQL
- 材料处理与多模态分析接口解耦，便于引入 OCR / VLM
- 论文调研服务与搜索源解耦，便于引入 arXiv、Semantic Scholar、Crossref
