# 代码质量 ⭐

> ESLint、Prettier、Git Hooks 的配置

---

## 学习目标

- 掌握 ESLint 配置和常用规则
- 理解 Prettier 和 ESLint 的协作
- 学会使用 Husky + lint-staged 实现提交前检查

---

## 生活化比喻

**代码质量工具就像"质检流水线"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  质检流水线                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│    ESLint = 质检员                                   │
│    ─────────────                                     │
│    检查代码有没有语法错误、不规范的地方              │
│    像老师批改作业                                    │
│                                                      │
│    Prettier = 排版工                                 │
│    ─────────────                                     │
│    不关心代码对不对，只管格式好不好看                │
│    缩进、换行、空格                                  │
│                                                      │
│    Husky = 门卫                                      │
│    ─────────────                                     │
│    在你提交代码前拦下来，先检查再放行                │
│    不合格的代码不让提交                              │
│                                                      │
│    lint-staged = 快速质检                            │
│    ─────────────                                     │
│    只检查你改过的文件，不检查整个项目                │
│    节省时间                                          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

**最简示例：**

```bash
npm install -D eslint prettier
npx eslint src --fix    # 检查并自动修复
npx prettier --write .  # 格式化所有文件
```

**ESLint 基础配置：**

```javascript
// eslint.config.js（Flat Config, ESLint 9+）
import js from '@eslint/js'

export default [
    js.configs.recommended,
    {
        rules: {
            'no-console': 'warn',
            'no-unused-vars': 'error',
            'semi': ['error', 'always'],
            'quotes': ['error', 'single']
        }
    }
]
```

---

## L2 实践层：用好

### ESLint vs Prettier 分工

| 工具 | 职责 | 示例 |
|------|------|------|
| ESLint | 代码质量（找 bug、规范） | 未使用变量、潜在错误 |
| Prettier | 代码格式（好看） | 缩进、换行、引号 |

### 反模式：不要这样做

```javascript
// ❌ 错误：ESLint 和 Prettier 规则冲突
// ESLint 要求单引号，Prettier 要求双引号

// ✅ 正确：用 eslint-config-prettier 禁用冲突规则
// npm install -D eslint-config-prettier
// extends: ['prettier']  // 放在 extends 最后
```

```json
// ❌ 错误：提交前不检查
// 直接把有错误的代码提交到仓库

// ✅ 正确：用 Husky + lint-staged 自动检查
// npx husky add .husky/pre-commit "npx lint-staged"
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 团队协作 | ESLint + Prettier | 统一代码风格 |
| 提交前检查 | Husky + lint-staged | 防止错误代码入库 |
| CI 检查 | ESLint 在 CI 运行 | 确保合并的代码质量 |

---

## L3 专家层：深入

### lint-staged 配置

```json
// package.json
{
  "lint-staged": {
    "*.{js,ts}": ["eslint --fix", "prettier --write"],
    "*.{vue}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### Commit Message 规范

```
格式: type(scope): description

类型:
  feat:     新功能
  fix:      修复 bug
  docs:     文档变更
  style:    代码格式（不影响功能）
  refactor: 重构
  perf:     性能优化
  test:     测试
  chore:    构建/工具变更
```

### 知识关联

```
代码质量关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  ESLint     │────→│  Prettier   │────→│  Git Hooks  │
│  代码检查   │     │  格式化     │     │  提交前拦截 │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ↓
                                       ┌─────────────┐
                                       │  CI/CD      │
                                       │  自动检查   │
                                       └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **ESLint** | JavaScript/TypeScript 代码检查工具 | `eslint src/` |
| **Prettier** | 代码格式化工具 | `prettier --write .` |
| **Husky** | Git Hooks 管理工具 | `husky install` |
| **lint-staged** | 只对暂存文件运行 linter | `lint-staged` |
| **Flat Config** | ESLint 9+ 的新配置格式 | `eslint.config.js` |

---

## 实践练习

```bash
# 练习：搭建完整代码质量检查
npm install -D eslint prettier eslint-config-prettier husky lint-staged

# 初始化 Husky
npx husky init

# 添加 pre-commit hook
echo "npx lint-staged" > .husky/pre-commit

# 配置 lint-staged
# 在 package.json 中添加 lint-staged 字段
```

---

## 常见问题

### Q1：ESLint 和 Prettier 冲突怎么办？

**安装 eslint-config-prettier，在 extends 中放在最后：**

```javascript
// eslint.config.js
import prettier from 'eslint-config-prettier'
export default [js.configs.recommended, prettier]
```

### Q2：如何跳过 Husky 检查？

**临时跳过（不推荐）：**

```bash
git commit --no-verify -m "紧急修复"
```

---

## 学习资源

- [ESLint 官方文档](https://eslint.org/) ⭐ 官方权威
- [Prettier 官方文档](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
