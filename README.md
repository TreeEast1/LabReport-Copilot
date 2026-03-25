# LabReport Copilot

面向中国科研组会场景的 AI Copilot 系统，用于自动整理科研进展、文献调研、实验结果与导师反馈诉求，生成贴近中国高校实验室习惯的组会汇报文档。

## 项目定位

LabReport Copilot 不是一个单纯的“报告生成器”，而是一个围绕组会场景设计的多 Agent 工作流平台。用户只需要提供本周进展、历史材料、图片截图、文献主题、导师风格等素材，系统负责完成理解、归纳、检索、整理与结构化输出。

核心目标：

- 帮助硕士、博士、科研助理、本科科研新手更高效地准备组会
- 让输出结果更贴近中国实验室真实汇报风格
- 让组会材料可以持续沉淀为长期科研档案与记忆
- 为后续接入 LLM、RAG、飞书 API、ASR、多模态分析提供清晰扩展点

## 适用场景

- 每周组会汇报整理
- 文献调研汇报准备
- 阶段性研究进展总结
- 导师风格适配后的汇报重写
- 语音口述进展转结构化周报
- 实验图、表格截图、流程图的文字说明生成

## MVP 功能

### P0

- 首页与开源项目展示
- 用户科研画像管理
- 导师风格画像配置
- 材料库上传与分类查看
- 一键生成组会汇报
- Markdown 结果输出
- 历史记录浏览

### P1

- 论文调研工作流
- 多模态图片分析工作流
- 飞书云文档导出接口预留

### P2

- 语音转写工作流
- 向量检索增强
- 多 Agent 编排优化
- 多模板报告生成

## 技术栈

### 前端

- Next.js 14
- TypeScript
- Tailwind CSS
- 面向中文科研用户的自定义组件样式

### 后端

- FastAPI
- Pydantic
- 基于模块化服务的 Agent Workflow 骨架

### 数据层规划

- PostgreSQL：用户、任务、报告元数据
- 本地文件存储 / 对象存储：上传材料
- 向量数据库：Chroma / PGVector / Milvus
- Redis：任务缓存与异步调度

## 系统结构

```text
LabReport Copilot
├── apps
│   ├── api                 # FastAPI 后端
│   └── web                 # Next.js 前端
├── packages
│   └── docs                # 架构设计、路线图等文档
└── README.md
```

更详细的目录结构与架构设计见：

- [系统架构文档](./packages/docs/architecture.md)
- [MVP 开发计划](./packages/docs/mvp-plan.md)

## 快速启动

### 1. 启动前端

```bash
cd apps/web
npm install
npm run dev
```

### 2. 启动后端

```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. 环境变量

前端复制：

```bash
cp apps/web/.env.example apps/web/.env.local
```

后端复制：

```bash
cp apps/api/.env.example apps/api/.env
```

默认前端访问 `http://localhost:3000`，后端访问 `http://localhost:8000`。

## Agent 工作流设计

MVP 中已预留以下 Agent 职责模块：

- 用户画像理解 Agent
- 导师风格建模 Agent
- 历史材料总结 Agent
- 论文调研 Agent
- 多模态分析 Agent
- 组会结构规划 Agent
- 汇报内容写作 Agent
- Markdown / 飞书输出 Agent

当前版本以内置规则引擎和模拟输出为主，方便后续替换为真实 LLM、搜索服务、OCR、图像理解和飞书开放平台集成。

## 后续规划

- 接入真实大模型推理与函数调用
- 引入文档解析与向量检索
- 接入飞书云文档自动创建与同步
- 增加语音转写与多模态图片理解
- 增加模板系统与课题组级别协作能力

## 开源协议建议

建议使用 `MIT` 协议，便于学术社区、个人开发者与高校团队二次开发与集成。

## GitHub 展示建议

适合作为开源首页的定位文案：

> 为中国科研组会场景设计的 AI Agent 平台，自动整理科研进展、文献调研、实验图表与导师关注点，输出可直接用于飞书云文档的结构化组会汇报。
