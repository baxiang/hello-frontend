# React 学习模块

> 从入门到精通的 React 学习路径

## 模块概览

| 章节 | 主题 | 内容 |
|------|------|------|
| [01-快速入门](./01-快速入门/) | 快速入门 | React 简介、环境搭建、第一个组件 |
| [02-核心概念](./02-核心概念/) | 核心概念 | JSX、组件、Props、State |
| [03-Hooks 详解](./03-Hooks 详解/) | Hooks 详解 | useState、useEffect、useRef、自定义 Hook |
| [04-组件模式](./04-组件模式/) | 组件模式 | 组合、复用、高阶组件、Render Props |
| [05-路由管理](./05-路由管理/) | 路由管理 | React Router 配置与使用 |
| [06-状态管理](./06-状态管理/) | 状态管理 | Context、Redux Toolkit、Zustand |
| [07-样式方案](./07-样式方案/) | 样式方案 | CSS Modules、Styled Components、Tailwind |
| [08-性能优化](./08-性能优化/) | 性能优化 | memo、useMemo、useCallback、虚拟列表 |
| [09-测试](./09-测试/) | 测试 | Jest、React Testing Library、E2E 测试 |
| [10-实战项目](./10-实战项目/) | 实战项目 | 完整项目开发流程 |

## 学习目标

- 掌握 React 核心概念和组件开发
- 熟练使用 Hooks 进行状态管理
- 理解 React 路由和状态管理方案
- 学会性能优化和测试技巧
- 能够独立开发 React 应用

## 学习路径

```
第一阶段：基础入门（1-2 周）
01-快速入门/ → 02-核心概念/

第二阶段：Hooks 深入（1-2 周）
03-Hooks 详解/ → 04-组件模式/

第三阶段：工程化（1-2 周）
05-路由管理/ → 06-状态管理/ → 07-样式方案/

第四阶段：进阶实战（1-2 周）
08-性能优化/ → 09-测试/ → 10-实战项目/
```

## React 特点

### 优势

- **声明式编程**：描述 UI 应该是什么样子，而不是如何实现
- **组件化**：可复用的独立组件，便于维护和测试
- **虚拟 DOM**：高效的 DOM 更新机制
- **单向数据流**：清晰的数据流向，便于调试
- **强大的生态**：丰富的第三方库和工具

### 适用场景

- 大型复杂应用
- 需要高度定制化的项目
- 团队有 React 经验
- 需要跨平台开发（React Native）

## 开发环境

### 推荐工具

- **编辑器**：VS Code + React 插件
- **调试工具**：React Developer Tools
- **脚手架**：Vite、Create React App
- **测试工具**：Jest、React Testing Library

### 快速开始

```bash
# 使用 Vite 创建项目
npm create vite@latest my-react-app -- --template react

# 进入项目
cd my-react-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 学习资源

- [React 官方文档](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

**上一模块：** [← 07-engineering](../07-engineering/)
**下一模块：** [→ 10-vue](../10-vue/)