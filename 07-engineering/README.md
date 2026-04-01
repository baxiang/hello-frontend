# 前端工程化

> 掌握现代前端开发工具链

## 模块概览

| 章节 | 主题 | 内容 |
|------|------|------|
| [01-包管理器](./01-包管理器/) | 包管理器 | npm、yarn、pnpm 使用指南 |
| [02-构建工具](./02-构建工具/) | 构建工具 | Webpack、Vite 配置详解 |
| [03-代码质量](./03-代码质量/) | 代码质量 | ESLint、Prettier、Git Hooks |
| [04-测试工具](./04-测试工具/) | 测试工具 | Vitest 单元测试、组件测试 |

## 学习目标

- 掌握 npm/yarn 包管理
- 理解 Webpack/Vite 构建工具
- 学会使用 ESLint/Prettier 规范代码
- 了解单元测试和 E2E 测试

## 学习路径

```
第一阶段：包管理（1-2 天）
01-包管理器/ → 掌握依赖管理

第二阶段：构建工具（2-3 天）
02-构建工具/ → Webpack 和 Vite 配置

第三阶段：代码质量（1-2 天）
03-代码质量/ → 代码规范和 Git Hooks

第四阶段：测试（2-3 天）
04-测试工具/ → 单元测试和组件测试
```

## 项目结构示例

```
my-project/
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── .vscode/
│   └── settings.json
├── public/
│   └── index.html
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── composables/
│   ├── router/
│   ├── stores/
│   ├── styles/
│   ├── utils/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── tests/
│   └── unit/
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── vite.config.js
└── vitest.config.js
```

## 开发流程

```bash
# 1. 克隆项目
git clone <repo>
cd my-project

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 编写代码（自动 lint 和格式化）

# 5. 提交代码
git add .
git commit -m "feat: 添加新功能"

# 6. 运行测试
npm run test

# 7. 构建
npm run build

# 8. 预览生产构建
npm run preview
```

## 学习资源

- [Webpack 官方文档](https://webpack.js.org/)
- [Vite 官方文档](https://cn.vitejs.dev/)
- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)
- [Vitest 官方文档](https://vitest.dev/)

---

**上一模块：** [← 06-nodejs](../06-nodejs/)
**下一模块：** [→ 08-frameworks](../08-frameworks/)