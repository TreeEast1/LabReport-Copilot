# LLM Provider 配置说明

## 目标

LabReport Copilot 的后端已经抽象出统一的 LLM Gateway，开源后不同用户可以根据自己的资源和预算，替换为不同模型厂商。

## 当前支持

### 1. Azure OpenAI

适合已经在 Azure 上部署模型的用户。

环境变量示例：

```bash
LLM_PROVIDER=azure_openai
LLM_MODEL=gpt-5.2
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_API_KEY=your_key
AZURE_OPENAI_DEPLOYMENT=gpt-5.2
AZURE_OPENAI_API_VERSION=2024-10-21
```

### 2. OpenAI Compatible

适合各种兼容 OpenAI Chat Completions 的第三方平台或代理网关。

```bash
LLM_PROVIDER=openai_compatible
LLM_MODEL=gpt-5.2
OPENAI_COMPATIBLE_BASE_URL=https://your-provider.example.com
OPENAI_COMPATIBLE_API_KEY=your_key
OPENAI_COMPATIBLE_MODEL=gpt-5.2
OPENAI_COMPATIBLE_PATH=/v1/chat/completions
```

### 3. Mock

用于本地开发和离线演示，不发起真实 API 调用。

```bash
LLM_PROVIDER=mock
LLM_MODEL=gpt-5.2
```

## 代码位置

- `apps/api/app/services/llm/`
- `apps/api/app/services/llm/service.py`
- `apps/api/app/services/llm/azure_openai_provider.py`
- `apps/api/app/services/llm/openai_compatible_provider.py`

## 当前接入策略

1. 组会报告生成优先调用真实 LLM
2. 文献调研优先调用真实 LLM
3. 如果调用失败，则自动退回规则模板与模拟 Agent 输出

这样既保留开箱即用能力，也方便后续继续增强。
