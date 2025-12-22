1. **初始化 Next.js 项目**
   - 执行 `npx create-next-app@latest . --typescript --eslint --tailwind --app --no-src-dir --turbo --import-alias "@/*"`。
2. **创建文件夹结构**
   - 创建 `data`, `types`, `lib`, `components/ui` 目录。
3. **编写数据类型定义**
   - 在 `types/resource.ts` 中实现 PRD 第 4 节定义的 `APIResource` 接口。
4. **初始化示例数据**
   - 在 `data/apis.json` 中写入 SiliconFlow 的示例 JSON。
5. **安装依赖与初始化 UI**
   - 安装 `lucide-react`。
   - 初始化 Shadcn/UI 环境。