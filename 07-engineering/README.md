# 前端工程化系统学习教程

> 掌握现代前端开发必备的工具链和工程化实践

---

## 教程特色

- **系统化学习** - 从包管理到测试，涵盖完整工程化体系
- **实战导向** - 每节都有完整配置示例和实践项目
- **最佳实践** - 培养良好的工程化思维和编码习惯
- **现代工具** - 涵盖 Webpack、Vite、ESLint、Prettier 等主流工具

---

## 完整学习路线

```
基础篇                    进阶篇                      实战篇
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 1 章       │          │ 第 3 章       │           │ 第 5 章       │
│ 包管理器     │ ──────▶  │ ESLint       │ ──────▶   │ 单元测试     │
│ npm/yarn     │          │ Prettier     │           │ Vitest       │
└─────────────┘          └─────────────┘           └─────────────┘
       │                        │                         │
       ▼                        ▼                         ▼
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 2 章       │          │ 第 4 章       │           │ 第 6 章       │
│ Webpack      │ ──────▶  │ Vite         │           │ Git Hooks    │
│ 构建工具     │          │ 构建工具     │           │ 自动化       │
└─────────────┘          └─────────────┘           └─────────────┘
```

---

## 章节详情

### 基础篇

#### 第 1 章：包管理器
掌握 npm、yarn、pnpm 的使用。

| 小节 | 内容 | 难度 |
|------|------|------|
| 1.1 | npm 基础命令 | ⭐ |
| 1.2 | package.json 配置 | ⭐⭐ |
| 1.3 | 依赖管理（dependencies/devDependencies） | ⭐⭐ |
| 1.4 | 脚本命令（scripts） | ⭐⭐ |
| 1.5 | yarn 使用 | ⭐⭐ |
| 1.6 | pnpm 使用 | ⭐⭐ |
| 1.7 | 包管理器对比 | ⭐⭐ |

**学习目标：**
- 掌握 npm/yarn/pnpm 的基本使用
- 理解 package.json 的配置项
- 能够管理项目依赖和脚本

---

#### 第 2 章：Webpack 构建工具
深入理解 Webpack 的配置和优化。

| 小节 | 内容 | 难度 |
|------|------|------|
| 2.1 | Webpack 基础概念 | ⭐⭐⭐ |
| 2.2 | 入口和出口配置 | ⭐⭐ |
| 2.3 | Loader 配置 | ⭐⭐⭐ |
| 2.4 | Plugin 配置 | ⭐⭐⭐ |
| 2.5 | 开发服务器配置 | ⭐⭐ |
| 2.6 | 生产环境优化 | ⭐⭐⭐⭐ |
| 2.7 | 代码分割 | ⭐⭐⭐⭐ |
| 2.8 | 性能优化技巧 | ⭐⭐⭐⭐⭐ |

**学习目标：**
- 理解 Webpack 的工作原理
- 掌握 Loader 和 Plugin 的配置
- 能够进行生产环境优化和代码分割

---

#### 第 3 章：ESLint 代码检查
学会使用 ESLint 规范代码质量。

| 小节 | 内容 | 难度 |
|------|------|------|
| 3.1 | ESLint 安装配置 | ⭐⭐ |
| 3.2 | 规则配置 | ⭐⭐ |
| 3.3 | 插件扩展 | ⭐⭐⭐ |
| 3.4 | Vue/React 项目配置 | ⭐⭐⭐ |
| 3.5 | TypeScript 支持 | ⭐⭐⭐ |
| 3.6 | 在 CI/CD 中使用 | ⭐⭐⭐ |

**学习目标：**
- 掌握 ESLint 的安装和配置
- 理解常用规则的含义
- 能够配置 Vue/React/TypeScript 项目

---

#### 第 4 章：Prettier 代码格式化
学会使用 Prettier 统一代码风格。

| 小节 | 内容 | 难度 |
|------|------|------|
| 4.1 | Prettier 安装配置 | ⭐ |
| 4.2 | 常用配置项 | ⭐⭐ |
| 4.3 | 与 ESLint 配合使用 | ⭐⭐⭐ |
| 4.4 | 编辑器集成 | ⭐⭐ |
| 4.5 | 忽略文件配置 | ⭐⭐ |

**学习目标：**
- 掌握 Prettier 的配置方法
- 理解与 ESLint 的区别和配合
- 能够在团队中统一代码风格

---

### 进阶篇

#### 第 5 章：单元测试
掌握 Vitest 测试框架的使用。

| 小节 | 内容 | 难度 |
|------|------|------|
| 5.1 | 测试基础概念 | ⭐⭐ |
| 5.2 | Vitest 安装配置 | ⭐⭐ |
| 5.3 | 编写测试用例 | ⭐⭐⭐ |
| 5.4 | 异步测试 | ⭐⭐⭐ |
| 5.5 | Mock 和 Spy | ⭐⭐⭐⭐ |
| 5.6 | 组件测试 | ⭐⭐⭐⭐ |
| 5.7 | 覆盖率报告 | ⭐⭐⭐ |
| 5.8 | 测试最佳实践 | ⭐⭐⭐ |

**学习目标：**
- 理解单元测试的概念和重要性
- 掌握 Vitest 测试框架的使用
- 能够编写组件测试和 Mock 测试

---

#### 第 6 章：Git Hooks 自动化
学会使用 Husky 实现自动化流程。

| 小节 | 内容 | 难度 |
|------|------|------|
| 6.1 | Git Hooks 基础 | ⭐⭐ |
| 6.2 | Husky 安装配置 | ⭐⭐ |
| 6.3 | pre-commit Hook | ⭐⭐⭐ |
| 6.4 | commit-msg Hook | ⭐⭐⭐ |
| 6.5 | lint-staged 配置 | ⭐⭐⭐ |
| 6.6 | Commitlint 配置 | ⭐⭐⭐ |
| 6.7 | CI/CD 集成 | ⭐⭐⭐⭐ |

**学习目标：**
- 理解 Git Hooks 的工作原理
- 掌握 Husky 和 lint-staged 的配置
- 能够实现提交前的自动化检查

---

### 实战篇

#### 第 7 章：项目实践
综合运用所学知识完成工程化配置。

| 小节 | 内容 | 难度 |
|------|------|------|
| 7.1 | 项目结构设计 | ⭐⭐ |
| 7.2 | 完整配置文件 | ⭐⭐⭐ |
| 7.3 | 开发流程规范 | ⭐⭐⭐ |
| 7.4 | 团队协作规范 | ⭐⭐⭐ |
| 7.5 | 部署配置 | ⭐⭐⭐⭐ |

**学习目标：**
- 能够设计合理的工程化方案
- 掌握完整的配置文件编写
- 理解团队协作的最佳实践

---

## 学习路径建议

### 入门阶段（1 周）
```
第 1 章 → 第 3 章 → 第 4 章
```
**目标：** 掌握包管理和代码规范工具

**建议：**
- 理解 npm/yarn 的基本使用
- 配置 ESLint 和 Prettier
- 在项目中实践代码规范

---

### 进阶阶段（2 周）
```
第 2 章 → 第 5 章
```
**目标：** 掌握构建工具和测试

**建议：**
- 理解 Webpack 的配置
- 学习编写单元测试
- 尝试优化构建性能

---

### 实战阶段（1 周）
```
第 6 章 → 第 7 章
```
**目标：** 实现自动化流程和完整项目配置

**建议：**
- 配置 Git Hooks 自动化
- 完成完整的项目工程化
- 理解团队协作规范

---

## 开发环境准备

### Node.js 安装

```bash
# 下载安装包：https://nodejs.org/
# 推荐使用 LTS 版本（18.x 或更高）

# 查看版本
node -v
npm -v

# 使用 nvm 管理版本
nvm install --lts
nvm use --lts
```

### 全局工具安装

```bash
# 包管理器
npm install -g yarn pnpm

# 构建工具
npm install -g webpack webpack-cli
npm install -g vite

# 代码检查
npm install -g eslint

# 代码格式化
npm install -g prettier
```

### VS Code 配置

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "vue",
    "react"
  ]
}
```

---

## 常用代码片段

### package.json 配置

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.vue --fix",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "prepare": "husky install"
  }
}
```

### Vite 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
});
```

### ESLint 配置

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always']
  }
};
```

### Vitest 测试

```javascript
// math.test.js
import { describe, it, expect } from 'vitest';
import { add, subtract } from './math';

describe('数学函数', () => {
  it('应该返回两个数的和', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('应该返回两个数的差', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
```

---

## 最佳实践

### ✅ 推荐做法

```bash
# 1. 使用锁文件
npm install      # 生成 package-lock.json
yarn install     # 生成 yarn.lock
pnpm install     # 生成 pnpm-lock.yaml

# 2. 区分生产依赖和开发依赖
npm install vue              # 生产依赖
npm install -D vite eslint   # 开发依赖

# 3. 使用脚本命令
npm run dev      # 开发
npm run build    # 构建
npm run test     # 测试

# 4. 配置 Git Hooks
npx husky install
npx husky add .husky/pre-commit "npm run lint"
```

### ❌ 避免做法

```bash
# 1. 避免删除锁文件
rm -rf package-lock.json   # ❌

# 2. 避免全局安装项目依赖
npm install -g vue         # ❌

# 3. 避免忽略代码检查
# 提交前务必运行 lint
npm run lint               # ✅

# 4. 避免不写测试
# 重要功能务必编写测试用例
```

---

## 工具对比

### 包管理器对比

| 特性 | npm | yarn | pnpm |
|------|-----|------|------|
| 安装速度 | 中 | 快 | 最快 |
| 磁盘空间 | 多 | 中 | 最少 |
| 兼容性 | 最好 | 好 | 好 |
| 安全性 | 高 | 高 | 最高 |

### 构建工具对比

| 特性 | Webpack | Vite |
|------|---------|------|
| 启动速度 | 慢 | 极快 |
| HMR | 中 | 极快 |
| 构建速度 | 慢 | 快 |
| 配置复杂度 | 高 | 低 |
| 生态 | 成熟 | 发展中 |

---

## 常见问题

### Q1: 为什么选择 Vite 而不是 Webpack？

**答：**
- **Vite 优势**：启动极快、HMR 迅速、配置简单
- **Webpack 优势**：生态成熟、插件丰富、按需加载
- **建议**：新项目优先 Vite，老项目继续使用 Webpack

### Q2: ESLint 和 Prettier 有什么区别？

**答：**
- **ESLint**：代码质量检查（语法错误、潜在问题）
- **Prettier**：代码格式化（缩进、引号、分号）
- **配合使用**：Prettier 负责格式，ESLint 负责质量

### Q3: 如何选择测试框架？

**答：**
- **Vitest**：Vite 项目首选，配置简单
- **Jest**：功能强大，生态成熟
- **Vitest + Testing Library**：推荐组合

---

## 学习资源

### 官方文档
- [npm 官方文档](https://docs.npmjs.com/)
- [Webpack 官方文档](https://webpack.js.org/)
- [Vite 官方文档](https://cn.vitejs.dev/)
- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)
- [Vitest 官方文档](https://vitest.dev/)
- [Husky 官方文档](https://typicode.github.io/husky/)

### 学习资源
- [前端工程化入门教程](https://github.com/frontend-engineering)
- [Webpack 实战手册](https://webpack-handbook.com/)
- [测试最佳实践](https://testing-best-practices.com/)

---

## 版本兼容性

| 工具 | 最低 Node.js 版本 | 推荐版本 |
|------|------------------|----------|
| npm 8.x | 14.x | 18.x |
| yarn 1.x | 10.x | 18.x |
| pnpm 7.x | 14.x | 18.x |
| Webpack 5.x | 10.x | 18.x |
| Vite 4.x | 14.x | 18.x |
| Vitest 0.x | 14.x | 18.x |

---

**上一篇：** [← 06-nodejs/](../06-nodejs/)
**下一篇：** [→ 08-frameworks/](../08-frameworks/)
**开始学习：** [→ 01-前端工程化](./01-前端工程化.md)
