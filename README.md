# 大前端技术学习路线

> 完整的前端工程师成长路径：从入门到精通（2026版）

---

## ⭐ 2026年必备三大技术

| 技术 | 重要性 | 说明 |
|------|--------|------|
| **TypeScript** | ⭐⭐⭐ 必须 | 2026年项目标配，类型安全 |
| **React/Vue** | ⭐⭐⭐ 必须 | 主流框架，组件开发核心 |
| **Next.js/Nuxt.js** | ⭐⭐⭐ 推荐 | 元框架，SSR/SSG、全栈开发 |

---

## 📚 课程目录

| 序号 | 模块 | 内容 | 进度 |
|------|------|------|------|
| 01 | [HTML5](./01-html5/) | 基础语法、表单、语义化标签 | ✅ |
| 02 | [CSS3](./02-css3/) | 选择器、布局、动画、响应式 | ✅ |
| 03 | [JavaScript](./03-javascript/) | 核心语法、DOM、异步、高级特性 | ✅ |
| 04 | [ES6+](./04-es6+/) | 现代 JavaScript 特性 | ✅ |
| 05 | [TypeScript](./05-typescript/) | 类型系统、接口、泛型 | ✅ |
| 06 | [Node.js](./06-nodejs/) | 服务端开发、Express、数据库 | ✅ |
| 07 | [工程化](./07-engineering/) | Webpack、Vite、ESLint、测试 | ✅ |
| 08 | [React](./08-react/) | React 组件、Hooks、路由、状态管理、Next.js | ✅ |
| 09 | [Vue](./09-vue/) | Vue 组件、Composition API、路由、状态管理、Nuxt.js | ✅ |

---

## 🎯 学习路径建议

### 第一阶段：基础入门（2-4 周）
```
01-html5/ → 02-css3/ → 03-javascript/
```
**目标：** 掌握网页制作基础，能够制作静态页面

### 第二阶段：进阶提升（2-3 周）
```
04-es6+/ → 05-typescript/
```
**目标：** 学习现代 JavaScript，理解类型系统

### 第三阶段：后端拓展（2-3 周）
```
06-nodejs/
```
**目标：** 掌握服务端开发，理解全栈开发流程

### 第四阶段：工程化（2-3 周）
```
07-engineering/
```
**目标：** 学习工程化实践，掌握构建工具

### 第五阶段：框架学习（4-6 周）
```
08-react/ 或 09-vue/
```
**目标：** 掌握主流前端框架，能够独立开发应用

### 第六阶段：元框架学习（2-3 周）⭐ 新增
```
08-react/10-Next.js 元框架/ 或 09-vue/10-Nuxt.js 元框架/
```
**目标：** 掌握 SSR/SSG、全栈开发，达到生产项目能力

---

## 📖 目录结构

```
hello-frontend/
├── 01-html5/                    # HTML5 模块
│   ├── 01-基础语法/             # 文档结构、常用标签
│   ├── 02-表单详解/             # 表单元素、验证
│   └── 03-语义化标签/           # 语义化、SEO
├── 02-css3/                     # CSS3 模块
│   ├── 01-基础语法/             # 选择器、盒模型
│   ├── 02-布局相关/             # Flexbox、Grid
│   ├── 03-动画与过渡/           # transition、animation
│   └── 04-响应式设计/           # 媒体查询
├── 03-javascript/               # JavaScript 模块
│   ├── 01-基础语法/             # 变量、类型、函数
│   ├── 02-DOM与BOM/             # DOM 操作、事件
│   ├── 03-异步编程/             # Promise、async/await
│   └── 04-高级特性/             # 闭包、原型链
├── 04-es6+/                     # ES6+ 模块
│   ├── 01-变量与作用域/         # let、const
│   ├── 02-函数进阶/             # 箭头函数
│   ├── 03-对象与数组/           # 解构、Class
│   ├── 04-异步编程/             # Promise、生成器
│   └── 05-模块与元编程/         # 模块化、Proxy
├── 05-typescript/               # TypeScript 模块
│   ├── 00-快速入门/             # 零基础入门
│   ├── 01-类型基础/             # 基础类型、TS 5.x 新特性
│   ├── 02-接口与对象/           # 接口、类
│   ├── 03-函数类型/             # 函数类型
│   ├── 04-泛型编程/             # 泛型
│   ├── 05-联合与交叉类型/       # 联合、交叉
│   ├── 06-类型守卫/             # 类型收窄
│   ├── 07-高级类型/             # 条件、映射类型
│   ├── 08-工具类型/             # 工具类型
│   ├── 09-装饰器/               # 装饰器
│   ├── 10-模块与声明文件/       # 模块、.d.ts
│   └── 附录/                    # 速查、实战
├── 06-nodejs/                   # Node.js 模块
│   ├── 01-Node.js 基础/         # 安装、模块
│   ├── 02-HTTP 与 Web 开发/     # Express
│   ├── 03-数据库集成/           # MongoDB、MySQL
│   ├── 04-用户认证与安全/       # JWT
│   ├── 05-实用技术/             # 文件上传、日志
│   ├── 06-项目实战/             # 完整项目
│   └── 99-内置模块详解/         # 核心模块
├── 07-engineering/              # 工程化模块
│   ├── 01-包管理器/             # npm、pnpm
│   ├── 02-构建工具/             # Webpack、Vite
│   ├── 03-代码质量/             # ESLint、Prettier
│   └── 04-测试工具/             # Jest、Vitest
├── 08-react/                    # React 模块
│   ├── 01-快速入门/             # React 简介、环境搭建
│   ├── 02-核心概念/             # JSX、组件、Props、State
│   ├── 03-Hooks 详解/           # useState、useEffect
│   ├── 04-组件模式/             # 组合、复用
│   ├── 05-路由管理/             # React Router
│   ├── 06-状态管理/             # Redux Toolkit、Zustand
│   ├── 07-样式方案/             # CSS Modules、Styled Components
│   ├── 08-性能优化/             # memo、useMemo
│   ├── 09-测试/                 # Jest、Testing Library
│   ├── 10-Next.js 元框架/       # ⭐ SSR、SSG、App Router
│   └── 11-实战项目/             # Next.js 全栈项目
└── 09-vue/                      # Vue 模块
    ├── 01-快速入门/             # Vue 简介、环境搭建
    ├── 02-核心概念/             # 响应式、computed、watch
    ├── 03-组件基础/             # Props、Events、Slots
    ├── 04-Composition API/      # ref、reactive
    ├── 05-路由管理/             # Vue Router
    ├── 06-状态管理/             # Pinia
    ├── 07-样式方案/             # Scoped CSS
    ├── 08-性能优化/             # 懒加载、虚拟滚动
    ├── 09-测试/                 # Vitest
    ├── 10-Nuxt.js 元框架/       # ⭐ SSR、SSG、Auto-imports
    └── 11-实战项目/             # Nuxt.js 全栈项目
```

---

## 🛠️ 开发环境准备

### 必备工具
- **编辑器**: [VS Code](https://code.visualstudio.com/)
- **浏览器**: [Chrome](https://www.google.com/chrome/) (安装 DevTools)
- **Node.js**: [下载地址](https://nodejs.org/) (建议 LTS 版本)
- **Git**: [下载地址](https://git-scm.com/)

### VS Code 推荐插件
- Live Server - 本地开发服务器
- Prettier - 代码格式化
- ESLint - 代码检查
- Auto Rename Tag - 自动重命名标签
- CSS Peek - CSS 快速查看

---

## 📝 学习建议

### ✅ 应该做的
- 多动手写代码，不要只看不练
- 善用浏览器开发者工具调试
- 阅读官方文档获取第一手资料
- 参与开源项目，积累实战经验

### ❌ 应该避免的
- 不要只收藏不学习
- 不要盲目追求新框架，基础最重要
- 不要 copy 代码，要理解原理

---

## 🔗 常用资源

### 官方文档
- [MDN Web Docs](https://developer.mozilla.org/zh-CN/)
- [TypeScript 官方文档](https://www.typescriptlang.org/zh/) ⭐ 必读
- [Node.js 官方文档](https://nodejs.org/zh-cn/docs/)
- [React 官方文档](https://react.dev/) ⭐ 必读
- [Vue 官方文档](https://cn.vuejs.org/) ⭐ 必读
- [Next.js 官方文档](https://nextjs.org/docs) ⭐ 2026 必读
- [Nuxt.js 官方文档](https://nuxt.com/) ⭐ 2026 必读

### 学习平台
- [freeCodeCamp](https://www.freecodecamp.org/)
- [CodePen](https://codepen.io/) - 在线代码演示
- [StackBlitz](https://stackblitz.com/) - 在线开发环境

---

**开始学习 →** [01-html5/](./01-html5/)