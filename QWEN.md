# QWEN.md - 项目上下文文档

## 项目概述

这是一个**前端技术学习路线文档项目**，包含完整的前端工程师学习路径，从入门到精通。项目采用纯 Markdown 文档形式，无构建系统或依赖。

### 技术栈覆盖
- **基础三件套**: HTML5、CSS3、JavaScript
- **现代语法**: ES6+、TypeScript
- **后端拓展**: Node.js
- **工程化**: Webpack、Vite、ESLint、测试工具
- **框架**: React、Vue 及其生态

### 目录结构
```
hello-frontend/
├── README.md                     # 主学习路线图
├── CLAUDE.md                     # Claude Code 上下文
├── QWEN.md                       # 本文件
├── .claude/settings.local.json   # Claude 本地配置
├── 01-html5/                     # HTML5 模块 (3 章)
├── 02-css3/                      # CSS3 模块 (4 章)
├── 03-javascript/                # JavaScript 模块 (4 章)
├── 04-es6+/                      # ES6+ 模块 (9 章)
├── 05-typescript/                # TypeScript 模块 (6 章)
├── 06-nodejs/                    # Node.js 模块 (6 章)
├── 07-engineering/               # 工程化模块 (1 章)
└── 08-frameworks/                # 框架模块 (1 章)
```

### 模块详情

| 模块 | 章节数 | 内容 |
|------|--------|------|
| 01-html5 | 3 | 基础语法、表单详解、语义化标签 |
| 02-css3 | 4 | 基础语法、布局相关、动画与过渡、响应式设计 |
| 03-javascript | 4 | 核心语法、DOM 操作、异步编程、高级特性 |
| 04-es6+ | 9 | let/const、箭头函数、解构、Class、模块化、Promise 等 |
| 05-typescript | 6 | 基础类型、接口、类型别名、泛型、类型守卫、装饰器 |
| 06-nodejs | 6 | Node.js 基础、HTTP 与 Web、数据库、认证安全、实用技术、项目实战 |
| 07-engineering | 1 | npm/yarn/pnpm、Webpack、Vite、ESLint、Prettier、Vitest |
| 08-frameworks | 1 | React 基础、Vue 基础、Router、状态管理 |

## 文档结构模式

每个章节遵循统一的模板结构：
1. **学习目标** - 本章要掌握的知识点
2. **理论讲解** - 概念说明 + 代码示例
3. **实践练习** - 动手练习（含完整代码）
4. **常见问题** - FAQ 解答
5. **学习资源** - 参考文档和延伸阅读

### 代码示例风格
- 使用 HTML/CSS/JavaScript 标准语法
- 注释使用中文
- 遵循现代 ES6+ 语法规范
- 包含最佳实践和反模式对比

## 学习路径建议

### 四阶段学习法
```
第一阶段：基础入门 (2-4 周)
01-html5/ → 02-css3/ → 03-javascript/

第二阶段：进阶提升 (2-3 周)
04-es6+/ → 05-typescript/

第三阶段：后端拓展 (2-3 周)
06-nodejs/

第四阶段：工程化与框架 (3-4 周)
07-engineering/ → 08-frameworks/
```

## 开发环境

### 必备工具
- **编辑器**: VS Code
- **浏览器**: Chrome (DevTools)
- **Node.js**: LTS 版本
- **Git**: 版本控制

### 推荐 VS Code 插件
- Live Server - 本地开发服务器
- Prettier - 代码格式化
- ESLint - 代码检查
- Auto Rename Tag - 自动重命名标签
- CSS Peek - CSS 快速查看

## Git 配置

- **远程仓库**: `git@github.com:baxiang/hello-frontend.git`
- **预授权命令**: git init/add/commit/config/remote/branch/push/log

## 协作指南

### 文件命名规范
- 目录使用小写 + 连字符：`01-html5/`
- 文件使用中文 + 连字符：`01-基础语法.md`
- 序号保持两位数：`01`, `02`, `03`...

### 链接规范
- 模块间引用使用相对路径：`../02-css3/`
- 文件引用包含扩展名：`./01-基础语法.md`

### 内容更新
- 新增章节需更新 README.md 的目录表格
- 章节完成后标记 ✅ 状态
- 保持文档间的交叉引用正确

## 常用资源

### 官方文档
- [MDN Web Docs](https://developer.mozilla.org/zh-CN/)
- [TypeScript](https://www.typescriptlang.org/zh/)
- [Node.js](https://nodejs.org/zh-cn/docs/)
- [React](https://react.dev/)
- [Vue](https://cn.vuejs.org/)

### 学习平台
- [freeCodeCamp](https://www.freecodecamp.org/)
- [CodePen](https://codepen.io/)
- [StackBlitz](https://stackblitz.com/)

## 项目状态

- **总章节数**: 25+ 章
- **完成状态**: 全部完成 ✅
- **最后更新**: 2026-03-01
