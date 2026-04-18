# 包管理器 ⭐

> npm、yarn、pnpm 的使用

---

## 学习目标

- 掌握 npm 基础命令和 package.json 配置
- 理解依赖版本语义（^、~）
- 了解 yarn 和 pnpm 的差异

---

## 生活化比喻

**包管理器就像"超市采购系统"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  超市采购                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    npm = 传统超市                                     │
│    ─────────────                                     │
│    每个家庭买同样的东西，各放各的仓库                │
│    浪费空间，但每家独立                              │
│                                                      │
│    pnpm = 共享仓库                                  │
│    ─────────────                                     │
│    同样的东西只存一份，所有家庭共享                  │
│    节省空间，通过"链接"引用                         │
│                                                      │
│    package.json = 购物清单                            │
│    ─────────────                                     │
│    记下要买什么、哪个品牌（版本）                    │
│    别人照着清单也能买到同样的东西                    │
│                                                      │
│    node_modules = 仓库                               │
│    ─────────────                                     │
│    买来的东西都存在这里                              │
│    这个目录很大，不要提交到 git                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

**最简示例（1-3行）：**

```bash
npm install lodash          # 安装生产依赖
npm install -D eslint       # 安装开发依赖
npm run dev                 # 运行脚本
```

**详细示例：**

```bash
# 初始化项目
npm init -y

# 安装
npm install vue vue-router          # 生产依赖
npm install -D vite eslint vitest   # 开发依赖（-D = --save-dev）

# 管理
npm outdated            # 查看过期包
npm update              # 更新包
npm audit               # 安全审计
npm audit fix           # 自动修复安全问题

# 脚本
npm run dev             # npm run <script-name>
npm run build
npm test
```

---

## L2 实践层：用好

### npm vs yarn vs pnpm

| 特性 | npm | yarn | pnpm |
|------|-----|------|------|
| 速度 | 中等 | 快 | 最快 |
| 磁盘占用 | 大 | 大 | 小（共享） |
| 安全性 | 高 | 高 | 最高（严格依赖） |
| 兼容性 | 最好 | 好 | 好 |

### 反模式：不要这样做

```bash
# ❌ 错误：全局安装项目依赖
npm install lodash -g  # 只安装到全局，项目无法运行

# ✅ 正确：安装到项目
npm install lodash
```

### 版本语义

| 符号 | 含义 | 示例 |
|------|------|------|
| `^3.1.0` | 允许更新次版本和补丁 | `>=3.1.0 <4.0.0` |
| `~3.1.0` | 只允许补丁更新 | `>=3.1.0 <3.2.0` |
| `3.1.0` | 精确版本 | `3.1.0` |

---

## L3 专家层：深入

### pnpm 的硬链接机制

```
pnpm 如何节省空间：

全局存储：~/.pnpm-store/
  vue@3.3.0/ ← 只存一份

项目 A/node_modules/ → 硬链接到全局
项目 B/node_modules/ → 硬链接到同一份
项目 C/node_modules/ → 硬链接到同一份

好处：多个项目用同一个包，磁盘只存一份
```

### 知识关联

```
包管理关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  包管理器   │────→│  package.json│────→│  脚本命令   │
│  npm/yarn/  │     │  依赖/       │     │  dev/       │
│  pnpm       │     │  devDeps    │     │  build/     │
└─────────────┘     └─────────────┘     │  test/      │
                                        └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **生产依赖** | 运行时需要的包 | `dependencies` |
| **开发依赖** | 只在开发时需要的包 | `devDependencies` |
| **语义化版本** | 主版本.次版本.补丁 | `3.1.0` |
| **lock 文件** | 锁定精确版本，保证团队一致 | `package-lock.json` |

---

## 实践练习

```bash
# 练习：从零搭建项目
npm init -y
npm install vue
npm install -D vite @vitejs/plugin-vue eslint

# 添加脚本到 package.json
# "scripts": {
#   "dev": "vite",
#   "build": "vite build",
#   "lint": "eslint src --fix"
# }
```

---

## 常见问题

### Q1：npm、yarn、pnpm 用哪个好？

**新项目推荐 pnpm（快 + 省空间），老项目用 npm（兼容性最好）。**

### Q2：什么时候需要提交 lock 文件？

**永远提交 lock 文件，保证团队安装相同版本。**

---

## 学习资源

- [npm 官方文档](https://docs.npmjs.com/) ⭐ 官方权威
- [pnpm 官方文档](https://pnpm.io/zh/)
- [语义化版本](https://semver.org/)
