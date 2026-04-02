# Vue 学习模块

> 从入门到精通的 Vue 学习路径

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
| [10-实战项目](./10-实战项目/) | 实战项目 | 完整项目开发流程 |

## 学习目标

- 掌握 Vue 核心概念和组件开发
- 熟练使用 Composition API
- 理解 Vue 路由和状态管理方案
- 学会性能优化和测试技巧
- 能够独立开发 Vue 应用

## 学习路径

```
第一阶段：基础入门（1-2 周）
01-快速入门/ → 02-核心概念/ → 03-组件基础/

第二阶段：Composition API（1-2 周）
04-Composition API/

第三阶段：工程化（1-2 周）
05-路由管理/ → 06-状态管理/ → 07-样式方案/

第四阶段：进阶实战（1-2 周）
08-性能优化/ → 09-测试/ → 10-实战项目/
```

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

## 开发环境

### 推荐工具

- **编辑器**：VS Code + Volar 插件
- **调试工具**：Vue DevTools
- **脚手架**：Vite
- **测试工具**：Vitest

### 快速开始

```bash
# 使用 Vite 创建项目
npm create vite@latest my-vue-app -- --template vue

# 进入项目
cd my-vue-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 学习资源

- [Vue 官方文档](https://cn.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vite](https://cn.vitejs.dev/)

---

**上一模块：** [← 09-react](../09-react/)
**返回首页：** [→ README](../README.md)