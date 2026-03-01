# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **frontend learning roadmap documentation project** - a comprehensive collection of educational Markdown documents covering the complete frontend development stack. Pure documentation, no build system or dependencies.

## Module Structure

```
hello-frontend/
├── README.md                     # Main learning roadmap (all modules ✅ complete)
├── 01-html5/                     # HTML5: 3 chapters
├── 02-css3/                      # CSS3: 4 chapters
├── 03-javascript/                # JavaScript: 4 chapters
├── 04-es6+/                      # ES6+: 1 chapter
├── 05-typescript/                # TypeScript: 1 chapter
├── 06-nodejs/                    # Node.js: 1 chapter
├── 07-engineering/               # Engineering: 1 chapter
└── 08-frameworks/                # Frameworks: 1 chapter
```

## Content Status (17 chapters total)

| Module | Chapters | Status |
|--------|----------|--------|
| HTML5 | 基础语法，表单详解，语义化标签 | ✅ |
| CSS3 | 基础语法，布局相关，动画与过渡，响应式设计 | ✅ |
| JavaScript | 核心语法，DOM 操作，异步编程，高级特性 | ✅ |
| ES6+ | ES6+ 新特性 | ✅ |
| TypeScript | TypeScript 基础 | ✅ |
| Node.js | Node.js 基础 | ✅ |
| Engineering | 前端工程化 | ✅ |
| Frameworks | 前端框架 | ✅ |

## Document Structure Pattern

Each chapter follows this template:
- 学习目标 (Learning objectives)
- 理论讲解 + 代码示例 (Theory + Code examples)
- 实践练习 (Practice exercises with full code)
- 常见问题 (FAQ)
- 学习资源 (Resources)

## Git Configuration

Remote: `git@github.com:baxiang/hello-frontend.git`

Pre-authorized commands in `.claude/settings.local.json`:
- `git init`, `git add`, `git commit`, `git config`
- `git remote add`, `git branch`, `git push`
- `git log`, `git remote`

## Development Notes

- Pure Markdown documentation (no package.json, no build)
- Code examples use HTML/CSS/JavaScript with Chinese comments
- Documents link to each other using relative paths
- Recommended: VS Code + Live Server for preview
