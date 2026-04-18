# Vue 学习模块

> 从入门到精通的 Vue 学习路径，包含 Nuxt.js 元框架

## 模块概览

| 章节 | 主题 | 内容 |
|------|------|------|
| [01-快速入门](./01-快速入门/) | 快速入门 | Vue 简介、环境搭建、第一个组件 |
| [02-核心概念](./02-核心概念/) | 核心概念 | 模板语法、响应式、计算属性 |
| [03-组件基础](./03-组件基础/) | 组件基础 | 组件定义、Props、Events、Slots |
| [04-Composition API](./04-Composition API/) | Composition API | ref、reactive、computed、watch |
| [05-路由管理](./05-路由管理/) | 路由管理 | Vue Router 配置与使用 |
| [06-状态管理](./06-状态管理/) | 状态管理 | Pinia 状态管理 |
| [07-样式方案](./07-样式方案/) | 样式方案 | Scoped CSS、CSS Modules、Tailwind |
| [08-性能优化](./08-性能优化/) | 性能优化 | 懒加载、虚拟滚动、响应式优化 |
| [09-测试](./09-测试/) | 测试 | Vitest、Vue Test Utils |
| [10-Nuxt.js 元框架](./10-Nuxt.js 元框架/) | ⭐ 元框架 | SSR、SSG、Auto-imports、Nitro、部署 |
| [11-实战项目](./11-实战项目/) | 实战项目 | Nuxt.js 全栈项目开发流程 |

## 学习目标

- 掌握 Vue 核心概念和组件开发
- 熟练使用 Composition API
- 理解 Vue 路由和状态管理方案
- 学会性能优化和测试技巧
- **掌握 Nuxt.js 元框架（2026 必备技能）**
- 能够独立开发 Vue/Nuxt.js 应用

## 学习路径

```
第一阶段：基础入门（1-2 周）
01-快速入门/ → 02-核心概念/ → 03-组件基础/

第二阶段：Composition API（1-2 周）
04-Composition API/

第三阶段：工程化（1-2 周）
05-路由管理/ → 06-状态管理/ → 07-样式方案/

第四阶段：进阶实战（1-2 周）
08-性能优化/ → 09-测试/

第五阶段：元框架学习（2-3 周）⭐ 重点
10-Nuxt.js 元框架/ → 11-实战项目/
```

## Nuxt.js 重点说明

> **2026 年前端必备技能** — Nuxt.js 是 Vue 的官方推荐元框架

### 为什么学习 Nuxt.js

| 优势 | 说明 |
|------|------|
| **服务端渲染（SSR）** | 首屏加载快，SEO 友好 |
| **静态生成（SSG）** | 构建时生成，性能最优 |
| **Auto-imports** | 自动导入组件、API，无需手动 import |
| **Nitro 服务器** | 全栈开发，前后端一体 |
| **文件路由** | 基于文件结构自动生成路由 |
| **一键部署** | 支持 Vercel、Netlify 等 |

### Nuxt.js vs 纯 Vue

| 场景 | 纯 Vue (SPA) | Nuxt.js |
|------|-------------|---------|
| 企业官网、博客 | ❌ SEO 差 | ✅ SSG 完美 |
| 电商平台 | ❌ 首屏慢 | ✅ SSR 快 |
| 后台管理系统 | ✅ 够用 | ⚠️ 可能过度 |
| 需要全栈能力 | ❌ 需单独后端 | ✅ Nitro API |

## Vue 特点

### 优势

- **渐进式框架**：可逐步采用，从简单到复杂
- **模板语法**：直观的 HTML 模板，易于上手
- **响应式系统**：自动追踪依赖，高效更新
- **单文件组件**：HTML、CSS、JS 组织在一个文件
- **完善的生态**：Vue Router、Pinia、Vite

### 适用场景

- 中小型应用
- 快速开发迭代
- 团队初学者较多
- 需要模板语法的项目
- **需要 SEO 和首屏性能 → 使用 Nuxt.js**

## 开发环境

### 推荐工具

- **编辑器**：VS Code + Volar 插件
- **调试工具**：Vue DevTools
- **脚手架**：Vite（学习）、Nuxt.js（生产）
- **测试工具**：Vitest

### 快速开始

```bash
# 学习阶段：使用 Vite 创建纯 Vue 项目
npm create vite@latest my-vue-app -- --template vue-ts

# 生产阶段：使用 Nuxt.js 创建全栈项目
npx nuxi@latest init my-nuxt-app
```

## 学习资源

- [Vue 官方文档](https://cn.vuejs.org/) ⭐ 必读
- [Nuxt.js 官方文档](https://nuxt.com/) ⭐ 2026 必读
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://cn.vitejs.dev/)

---

**上一模块：** [← 08-react](../08-react/)
**返回首页：** [→ README](../README.md)