# VibeNavigator Phase 1 执行计划

## 技术栈
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4
- Components: Shadcn/UI
- Data Source: 本地 JSON 文件
- Font: Geist Sans & Geist Mono

## 执行步骤

### 1. 初始化项目
- 使用 `create-next-app` 初始化 Next.js 15 项目
- 配置 TypeScript
- 配置 Tailwind CSS v4

### 2. 配置 UI 基础
- 安装 Shadcn/UI
- 初始化 Shadcn/UI 配置
- 设置深色主题 (Zinc 950 背景)
- 配置 Geist Sans 和 Geist Mono 字体

### 3. 数据层实现
- 创建 `types/resource.ts` 定义数据接口
- 创建 `data/apis.json` 并填入示例数据

### 4. 核心组件开发
- 开发 `components/resource-card.tsx` 组件
- 开发 `components/resource-grid.tsx` 组件

### 5. 首页开发
- 在 `app/page.tsx` 中读取 JSON 数据
- 渲染资源网格

## 详细步骤

### 步骤 1: 初始化项目
1. 运行 `npx create-next-app@latest . --typescript --tailwind --app`
2. 安装依赖
3. 配置 Tailwind CSS v4
4. 验证项目可以正常构建

### 步骤 2: 配置 UI 基础
1. 安装 Shadcn/UI: `npx shadcn-ui@latest init`
2. 配置 Shadcn/UI 主题为深色
3. 安装 Geist 字体
4. 配置全局样式

### 步骤 3: 数据层实现
1. 创建 `types` 目录
2. 创建 `types/resource.ts` 文件，定义 Resource 接口
3. 创建 `data` 目录
4. 创建 `data/apis.json` 文件，填入示例数据

### 步骤 4: 核心组件开发
1. 创建 `components` 目录
2. 开发 `resource-card.tsx` 组件，包含：
   - 资源信息展示
   - "Copy Config" 按钮
3. 开发 `resource-grid.tsx` 组件，实现响应式网格布局

### 步骤 5: 首页开发
1. 在 `app/page.tsx` 中：
   - 导入数据和组件
   - 读取 JSON 数据
   - 渲染资源网格
2. 验证首页可以正常显示

## 预期结果
- 项目可以正常构建和运行
- 首页展示资源卡片网格
- 每个资源卡片显示资源信息和 Copy Config 按钮
- 响应式设计适配不同屏幕尺寸