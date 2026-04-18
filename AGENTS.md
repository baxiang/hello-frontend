# AGENTS.md

Pure Markdown documentation project. No build system, no dependencies, no executable code.

## What This Is

Frontend learning roadmap in Chinese. 9 modules (`01-html5/` through `09-vue/`) covering HTML/CSS/JS through React/Vue.

## Key Facts

- **Nothing to run**: No package.json, no tests, no lint. Markdown only.
- **Language**: Chinese documentation with Chinese comments in code examples.
- **VS Code + Live Server**: Recommended preview method.

## Document Structure

Each chapter MUST follow this order (see `docs/技术内容编写规范.md` for full spec):
1. 学习目标 (Objectives)
2. 正文内容 — L1 理解层 → L2 实践层 → L3 专家层
3. 常见问题 (FAQ, 3-5 per chapter)
4. 学习资源 (Resources)

## Writing Rules

- **L1 every chapter**: 语法结构图 + 最简示例(1-3行) + 详细示例
- **L2 for core concepts**: 最佳实践表格 + 反模式对比(❌/✅) + 适用场景
- **L3 for key concepts**: 底层原理 + 性能考量 + 知识关联图
- **Code style**: Chinese comments, modern ES6+, all TypeScript functions typed
- **Terminology**: Define on first use (格式: `**术语**：一句话定义。`)
- **Metaphors**: Use 生活化比喻 for complex concepts

## Naming Conventions

- Directories: lowercase + hyphen (e.g., `01-html5/`)
- Files: Chinese + hyphen (e.g., `01-基础语法.md`)
- Sequence: 2-digit numbers (`01`, `02`, ...)

## Code Conventions

- HTML: 语义化标签优先，属性顺序 id → class → data → 其他，双引号
- CSS: BEM/语义化命名，属性顺序 布局→盒模型→视觉，避免 ID 选择器和深层嵌套
- JS: camelCase 变量/函数，PascalCase 类/组件，UPPER_SNAKE_CASE 常量，禁用 `var`
- TypeScript: 所有函数签名必须有类型标注
- React: 函数组件 + PascalCase，Props 必须定义 interface
- Vue: `<script setup lang="ts">` + `defineProps`/`defineEmits`

## TypeScript Module Numbering

Special ranges in `05-typescript/`:
- `00-` series: Zero-to-hero quick start
- `01-10`: Main tutorial
- `11-14`, `21-25`, `31-34`, `41-44`, `51-54`: Progressive supplements

## Node.js Internal Modules

Located at `06-nodejs/99-内置模块详解/` (not numbered sequentially).

## Git

Remote: `git@github.com:baxiang/hello-frontend.git`

## TypeScript Chapter Extras

Must include:
- **类型思维对比**: JavaScript vs TypeScript 思维差异
- **类型推断说明**: 何时需要手动标注
- **常见类型错误**: 编译错误及修复方法

## Framework Chapter Extras (React/Vue)

Must include:
- **组件设计原则**: 何时拆分组件、职责划分
- **状态管理选择**: 不同场景的方案对比
- **性能陷阱**: 框架特有的性能问题