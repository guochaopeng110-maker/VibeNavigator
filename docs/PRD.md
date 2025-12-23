# Vibe Navigator需求文档V2.0

## 1. 产品定义 (Product Definition)

### 1.1 核心价值主张

Vibe Navigator 是为 AI 时代开发者（Vibe Coders）打造的 **全方位资源与战术情报中枢**。
我们不只是聚合链接，而是提供构建 AI 应用所需的**四大核心要素（4 Pillars）**。我们的目标是消除“发现”到“使用”的摩擦，提供**开箱即用**的配置、标准化的工作流（OpenSpec）及最佳实践蓝图。

### 1.2 用户画像

- **Vibe Coders**: 追求 "Flow State" (心流) 的开发者，深度依赖 Cursor/Trae/Windsurf 等 AI IDE。
- **AI Engineers**: 需要集成 MCP、Tool Use (Skills) 和低成本算力到产品中的工程师。

---

## 2. 核心功能板块 (The 4 Pillars)

### 2.1 板块 A: Vibe Compute (算力·燃料)

*定义：驱动 AI 运转的基础能源。*

- **收录范围**：聚合器 (SiliconFlow, OpenRouter)、免费层 (Gemini Flash)、本地 (Ollama)。
- **核心交互 (Action)**：**"Connect Dashboard"**
    - 点击卡片弹出模态框，分别展示 `Base URL`, `Model Name`, `API Key` (占位符)。
    - 提供适配 Cursor ("Override OpenAI URL") 和 VSCode 的一键复制按钮。

### 2.2 板块 B: Vibe Tools (工具·装备)

*定义：承载 AI 编程的 IDE 与 插件。*

- **收录范围**：IDE (Cursor, Trae), 插件 (Roo Code), CLI (Aider, Goose)。
- **核心交互 (Action)**：**"Quick Setup"**
    - 提供官方下载/安装链接。
    - 提供工具专属的配置文件下载（例如 Roo Code 的 `config.json` 推荐设置）。

### 2.3 板块 C: Vibe Skills (技巧·大脑)

*定义：提升 AI 表现的上下文、规范与扩展能力。*

- **收录范围**：
    - **Capabilities**: MCP Servers 配置, Claude/Open Skills (Tool Use 定义 JSON)。
    - **Context**: `.cursorrules` 黄金模板, System Prompts。
    - **Workflow**: OpenSpec (SDD 开发规范文档)。
- **核心交互 (Action)**：**"View & Copy"**
    - 对于 `JSON` (Skills/MCP)：提供带高亮的代码块复制。
    - 对于 `Markdown` (Rules/Specs)：提供预览抽屉 (Drawer) 和一键复制全文。

### 2.4 板块 D: Vibe Blueprints (蓝图·阵地)

*定义：AI-First 的项目脚手架。*

- **收录范围**：预置了 AI 配置的 Starter Kits (Next.js AI Starter), 适合 AI 阅读文档的框架。
- **核心交互 (Action)**：**"Initialize"**
    - 提供一键复制终端命令 (如 `git clone ...` 或 `npx create ...`)。

---

## 3. 技术架构 (Technical Architecture)

### 3.1 核心技术栈

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + Shadcn/UI (Zinc Theme)
- **Icons**: Lucide React
- **Data Source**: Local JSON Files (Git-as-Database)
- **Type Safety**: TypeScript (Strict Mode)

### 3.2 关键组件逻辑

- **Tabs Navigation**: 首页需包含 `Compute | Tools | Skills | Blueprints` 顶部切换栏。
- **Smart Resource Card**: 一个通用的 Card 组件，但根据 Resource Type 动态渲染 `CardFooter` 的操作按钮。

---

## 4. 数据结构 (Data Schema)

使用 Discriminated Union 严格定义四大板块。

```tsx
// types/resource.ts

export type Category = 'compute' | 'tool' | 'skill' | 'blueprint';

// 通用元数据
interface BaseResource {
  id: string;
  name: string;
  description: string;
  url: string; // 官网或文档链接
  tags: string[];
  added_at: string;
}

// 1. Compute (算力)
export interface ComputeResource extends BaseResource {
  category: 'compute';
  pricing: {
    model: 'Free' | 'Freemium' | 'Paid';
    detail: string; // e.g. "Daily 1500 RPM"
  };
  config: {
    endpoint: string;
    model_name_demo: string; // e.g. "deepseek-ai/DeepSeek-V3"
    auth_doc_url?: string;
  };
}

// 2. Tool (工具)
export interface ToolResource extends BaseResource {
  category: 'tool';
  price_model: 'Open Source' | 'Commercial' | 'Free';
}

// 3. Skill (技巧 - 结构最复杂)
export interface SkillResource extends BaseResource {
  category: 'skill';
  sub_category: 'cursor-rule' | 'mcp-server' | 'open-spec' | 'claude-skill';
  content: {
    type: 'json' | 'markdown' | 'text'; // 用于前端决定如何渲染预览
    body: string; // 实际内容。如果是长文本，建议存储在 public/skills/ 下并通过 fetch 获取，MVP 阶段可直接存 JSON string。
  };
}

// 4. Blueprint (蓝图)
export interface BlueprintResource extends BaseResource {
  category: 'blueprint';
  repo_url: string;
  install_cmd: string; // e.g. "git clone [<https://github.com/>](<https://github.com/>)..."
  stack: string[];     // ['Next.js', 'Supabase']
}

export type VibeResource = ComputeResource | ToolResource | SkillResource | BlueprintResource;
```

## 5. 开发路线图 (Roadmap)

### Phase 1: 架构重构 (The Refactor)

- **Goal**: 从单一列表升级为四大板块视图。
- **Tasks**:
    1. 更新 `types/resource.ts` 定义。
    2. 重命名并重构 `data/resources.json`，录入 4 条不同类型的种子数据。
    3. 重写 `app/page.tsx`，增加 Tabs 分类切换。
    4. 升级 `ResourceCard` 组件，实现动态 Footer。

### Phase 2: 内容填充 (The Content)

- **Goal**: 录入高价值数据。
- **Tasks**:
    1. 录入 OpenSpec 标准模板。
    2. 录入真实好用的 .cursorrules。
    3. 录入 SiliconFlow 和 Gemini 配置。

### Phase 3: 自动化 (The Radar)

- **Goal**: 自动发现新资源。
- **Tasks**: 集成 LLM 爬虫脚本。

---

## 6. UI 设计细节 (Visual Specs)

- **主题**: Zinc Dark (`#09090b` 背景)。
- **布局**: 响应式 Grid (移动端 1 列，桌面端 3 列)。
- **交互**:
    - **Compute**: 点击 -> Dialog (模态框)。
    - **Skill**: 点击 -> Sheet/Drawer (侧边抽屉预览代码)。
    - **Tool/Blueprint**: 点击 -> Toast 提示复制成功或跳转。