# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **frontend learning roadmap documentation project** - a collection of educational Markdown documents covering the full frontend development stack. Not a traditional application codebase.

## Repository Structure

```
hello-frontend/
├── README.md                     # Main learning roadmap overview
├── 01-html5/                     # HTML5 module (content started)
├── 02-css3/                      # CSS3 module (pending)
├── 03-javascript/                # JavaScript module (pending)
├── 04-es6/                       # ES6+ module (pending)
├── 05-typescript/                # TypeScript module (pending)
├── 06-nodejs/                    # Node.js module (pending)
├── 07-engineering/               # Engineering module (pending)
└── 08-frameworks/                # Frameworks module (pending)
```

Modules are numbered for sequential learning order.

## Document Structure Pattern

Each chapter follows this template:
- 学习目标 (Learning objectives)
- 理论讲解 (Theory explanation)
- 代码示例 (Code examples)
- 实践练习 (Practice exercises)
- 常见问题 (FAQ)
- 学习资源 (Resources)

## Existing Content

- **HTML5**: 3 completed chapters (基础语法，表单详解，语义化标签)
- **Other modules**: Directories created, content pending

## Git Configuration

Remote: `git@github.com:baxiang/hello-frontend.git`

Pre-authorized commands in `.claude/settings.local.json`:
- `git init`, `git add`, `git commit`, `git config`
- `git remote add`, `git branch`, `git push`
- `git log`, `git remote`

## Development Notes

- Pure Markdown documentation (no build system, no dependencies)
- Recommended tools: VS Code + Live Server for preview
- Code examples use HTML/CSS/JavaScript with Chinese comments
- Documents link to each other using relative paths
