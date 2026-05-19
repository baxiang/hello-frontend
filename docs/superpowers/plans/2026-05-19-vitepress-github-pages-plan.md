# VitePress + GitHub Pages 改造实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 hello-frontend 纯 Markdown 项目改造为 VitePress 文档站点，并配置 GitHub Pages 自动部署。

**Architecture:** 在根目录添加 VitePress 配置，扫描现有 11 个模块目录生成站点，base 路径设为 `/hello-frontend/`，通过 GitHub Actions 自动构建部署到 GitHub Pages。

**Tech Stack:** VitePress 1.6+、vitepress-sidebar、vitepress-plugin-group-icons、GitHub Actions

---

### Task 1: 初始化 package.json

**Files:**
- Create: `package.json`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "hello-frontend-site",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev .",
    "docs:build": "vitepress build .",
    "docs:preview": "vitepress preview ."
  },
  "devDependencies": {
    "vitepress": "^1.6.0",
    "vitepress-sidebar": "^1.31.0",
    "vitepress-plugin-group-icons": "^1.5.0"
  }
}
```

- [ ] **Step 2: 安装依赖**

```bash
npm install
```

Expected: `node_modules/` 和 `package-lock.json` 生成，无报错。

- [ ] **Step 3: 提交**

```bash
git add package.json package-lock.json
git commit -m "feat: 添加 VitePress 依赖"
```

---

### Task 2: 配置 VitePress 主配置

**Files:**
- Create: `.vitepress/config.ts`

- [ ] **Step 1: 创建 .vitepress/config.ts**

```typescript
import { defineConfig } from 'vitepress'
import sidebar from './sidebar'

const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('build')

export default defineConfig({
  title: '大前端技术学习路线',
  description: '完整的前端工程师成长路径：从入门到精通（2026版）',
  lang: 'zh-CN',
  base: isProduction ? '/hello-frontend/' : '/',
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'HTML5', link: '/01-html5/01-基础语法/' },
      { text: 'CSS3', link: '/02-css3/01-基础语法/' },
      { text: 'JavaScript', link: '/03-javascript/01-基础语法/' },
      { text: 'TypeScript', link: '/05-typescript/00-快速入门/' },
      { text: 'React', link: '/08-react/01-快速入门/' },
      { text: 'Vue', link: '/09-vue/01-快速入门/' },
    ],

    sidebar,

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/baxiang/hello-frontend' },
    ],
  },

  markdown: {
    lineNumbers: true,
  },

  ignoreDeadLinks: true,

  srcExclude: [
    '**/node_modules/**',
    '**/.vitepress/**',
    'docs/**',
    'AGENTS.md',
    'CLAUDE.md',
    'QWEN.md',
    'README.md',
    '.github/**',
  ],
})
```

**设计说明：**
- `base` 生产环境为 `/hello-frontend/`，开发环境为 `/`
- `nav` 导航栏选取核心模块入口
- `srcExclude` 排除非文档文件，防止 VitePress 尝试解析
- `ignoreDeadLinks` 忽略死链检查（中文目录名可能导致解析问题）

- [ ] **Step 2: 提交**

```bash
git add .vitepress/config.ts
git commit -m "feat: 添加 VitePress 主配置"
```

---

### Task 3: 配置自动生成侧边栏

**Files:**
- Create: `.vitepress/sidebar.ts`

- [ ] **Step 1: 创建 .vitepress/sidebar.ts**

```typescript
import { generateSidebar } from 'vitepress-sidebar'

export default generateSidebar([
  {
    documentRootPath: '/01-html5',
    scanStartPath: '',
    resolvePath: '/01-html5/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/02-css3',
    scanStartPath: '',
    resolvePath: '/02-css3/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/03-javascript',
    scanStartPath: '',
    resolvePath: '/03-javascript/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/04-es6+',
    scanStartPath: '',
    resolvePath: '/04-es6+/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/05-typescript',
    scanStartPath: '',
    resolvePath: '/05-typescript/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/06-nodejs',
    scanStartPath: '',
    resolvePath: '/06-nodejs/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/07-engineering',
    scanStartPath: '',
    resolvePath: '/07-engineering/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/08-react',
    scanStartPath: '',
    resolvePath: '/08-react/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/09-vue',
    scanStartPath: '',
    resolvePath: '/09-vue/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/10-nextjs',
    scanStartPath: '',
    resolvePath: '/10-nextjs/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
  {
    documentRootPath: '/11-实战项目',
    scanStartPath: '',
    resolvePath: '/11-实战项目/',
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  },
])
```

**设计说明：**
- 11 个模块各一个配置项，`vitepress-sidebar` 会扫描每个模块下的子目录
- `useTitleFromFileHeading: true` 从 Markdown 的 `#` 标题读取菜单文本
- `collapsed: true` 侧边栏默认折叠

- [ ] **Step 2: 提交**

```bash
git add .vitepress/sidebar.ts
git commit -m "feat: 添加自动生成侧边栏配置"
```

---

### Task 4: 添加主题配置

**Files:**
- Create: `.vitepress/theme/index.ts`
- Create: `.vitepress/theme/custom.css`

- [ ] **Step 1: 创建 .vitepress/theme/index.ts**

```typescript
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

- [ ] **Step 2: 创建 .vitepress/theme/custom.css**

```css
:root {
  --vp-c-brand: #2563eb;
  --vp-c-brand-light: #3b82f6;
  --vp-c-brand-dark: #1d4ed8;
}
```

**设计说明：**
- 使用蓝色作为品牌色，契合前端技术主题
- 后续可按需扩展自定义样式

- [ ] **Step 3: 提交**

```bash
git add .vitepress/theme/index.ts .vitepress/theme/custom.css
git commit -m "feat: 添加自定义主题"
```

---

### Task 5: 创建首页

**Files:**
- Create: `index.md`

- [ ] **Step 1: 创建 index.md**

```markdown
---
layout: home

hero:
  name: "大前端技术学习路线"
  text: "从零开始系统学习前端开发"
  tagline: 完整的前端工程师成长路径：从入门到精通（2026版）
  actions:
    - theme: brand
      text: 开始学习
      link: /01-html5/01-基础语法/
    - theme: alt
      text: 项目实战
      link: /11-实战项目/

features:
  - title: 分层递进
    details: 从 HTML/CSS/JS 基础到 TypeScript，再到 React/Vue 框架，循序渐进
  - title: 场景驱动
    details: 每个概念从"为什么需要"开始，用实际问题引入新知识
  - title: 全栈覆盖
    details: 前端 + Node.js 后端 + 工程化实践，培养全栈开发能力
  - title: 实战导向
    details: 个人主页、Todo 应用、博客系统、电商平台等完整项目
---
```

**设计说明：**
- 与 hello-rust 首页风格一致：Hero 区 + 4 个 Feature 卡片
- "开始学习" 指向 HTML5 模块第一章，"项目实战" 指向实战模块

- [ ] **Step 2: 提交**

```bash
git add index.md
git commit -m "feat: 添加 VitePress 首页"
```

---

### Task 6: 更新 .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: 在 .gitignore 末尾添加 VitePress 相关忽略规则**

在文件末尾追加：

```
# VitePress
.vitepress/dist/
.vitepress/cache/
```

- [ ] **Step 2: 提交**

```bash
git add .gitignore
git commit -m "chore: 添加 VitePress 构建产物到 .gitignore"
```

---

### Task 7: 配置 GitHub Actions 部署

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `.github/workflows/ci.yml`

- [ ] **Step 1: 创建 .github/workflows/deploy.yml**

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 创建 .github/workflows/ci.yml**

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    name: 构建检查

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: 安装依赖
        run: npm ci

      - name: 构建站点
        run: npm run docs:build

      - name: 统计文档数量
        run: |
          echo "=== 文档统计 ==="
          echo "Markdown 文件数：$(find . -name "*.md" -not -path "./node_modules/*" -not -path "./.vitepress/*" | wc -l)"
```

**设计说明：**
- `deploy.yml` 仅 main 分支推送时触发，构建并部署到 GitHub Pages
- `ci.yml` 在推送和 PR 时触发，验证构建是否成功
- CI 中增加文档统计输出，方便监控文档数量变化

- [ ] **Step 3: 提交**

```bash
git add .github/workflows/deploy.yml .github/workflows/ci.yml
git commit -m "ci: 添加 GitHub Actions 构建和部署流程"
```

---

### Task 8: 验证构建

- [ ] **Step 1: 本地构建验证**

```bash
npm run docs:build
```

Expected: 构建成功，输出 `.vitepress/dist/` 目录，无报错。

- [ ] **Step 2: 验证产物**

```bash
ls -la .vitepress/dist/
```

Expected: 包含 `index.html` 和各模块对应的 HTML 文件。

- [ ] **Step 3: 本地预览（可选）**

```bash
npm run docs:preview
```

Expected: 本地服务器启动，访问 `http://localhost:4173/hello-frontend/` 可以看到首页。

- [ ] **Step 4: 提交构建产物到 .gitignore 确认**

```bash
git status
```

Expected: `.vitepress/dist/` 和 `.vitepress/cache/` 不在 untracked 列表中。

- [ ] **Step 5: 最终提交**

```bash
git add -A
git commit -m "chore: 验证 VitePress 构建成功"
```

---

### Task 9: GitHub Pages 设置指南

**这不是代码任务，而是部署后需要的操作步骤：**

1. 推送所有提交到 GitHub: `git push origin main`
2. 在 GitHub 仓库 Settings → Pages → Source 选择 "GitHub Actions"
3. 首次 deploy workflow 运行成功后，访问 `https://baxiang.github.io/hello-frontend/`
