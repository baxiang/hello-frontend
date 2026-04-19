# tsconfig.json 配置 ⭐

> TypeScript 编译器配置详解

---

## 学习目标

- 理解 tsconfig.json 的作用
- 掌握常用编译选项
- 能配置一个完整的 TypeScript 项目

---

## 生活化比喻

**tsconfig.json 就像"工厂的生产手册"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  工厂生产手册                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│    target = 产品要适配什么设备                        │
│    ─────────────                                     │
│    ES2020 → 现代设备（功能全）                       │
│    ES5 → 老设备（兼容性好）                          │
│                                                      │
│    strict = 质检标准                                 │
│    ─────────────                                     │
│    true → 严格质检，任何问题都不放过                 │
│    false → 宽松质检，能过就行                        │
│                                                      │
│    outDir = 成品仓库                                 │
│    ─────────────                                     │
│    生产好的产品放在哪里                              │
│    ./dist → 放在 dist 目录                          │
│                                                      │
│    include/exclude = 生产范围                         │
│    ─────────────                                     │
│    include: ['src/**/*'] → 只生产 src 下的产品       │
│    exclude: ['node_modules'] → 不处理第三方零件      │
│                                                      │
│    module = 包装方式                                 │
│    ─────────────                                     │
│    CommonJS → Node.js 包装                          │
│    ESNext → 现代浏览器包装                           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 生成配置

**最简示例（1-3行）：**

```bash
npx tsc --init    # 生成 tsconfig.json
```

**详细示例：**

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

---

## L2 实践层：用好

### 核心选项速查

| 选项 | 用途 | 推荐值 |
|------|------|--------|
| `target` | 编译目标版本 | `ES2020` |
| `module` | 模块系统 | `commonjs`(Node) / `ESNext`(前端) |
| `strict` | 严格模式 | `true` |
| `outDir` | 输出目录 | `./dist` |
| `rootDir` | 源码目录 | `./src` |
| `esModuleInterop` | ES 模块兼容 | `true` |
| `skipLibCheck` | 跳过声明文件检查 | `true` |
| `resolveJsonModule` | 导入 JSON | `true` |
| `declaration` | 生成 .d.ts | `true`(库项目) |
| `sourceMap` | 生成 source map | `true` |

### 项目配置示例

**Node.js 项目：**

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "esModuleInterop": true,
        "skipLibCheck": true,
        "resolveJsonModule": true,
        "declaration": true,
        "sourceMap": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

**前端项目（Vite）：**

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ESNext",
        "moduleResolution": "bundler",
        "strict": true,
        "jsx": "preserve",
        "esModuleInterop": true,
        "skipLibCheck": true,
        "baseUrl": ".",
        "paths": { "@/*": ["src/*"] }
    },
    "include": ["src/**/*"],
    "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 反模式

```json
// ❌ 错误：关闭严格模式
{ "strict": false }

// ✅ 正确：始终开启严格模式
{ "strict": true }
```

```json
// ❌ 错误：target 设置过低（不必要的兼容代码）
{ "target": "ES5" }

// ✅ 正确：根据运行环境设置
{ "target": "ES2020" }
```

---

## L3 专家层：深入

### 项目引用（Project References）

```json
// tsconfig.json（根）
{
    "files": [],
    "references": [
        { "path": "./tsconfig.app.json" },
        { "path": "./tsconfig.test.json" }
    ]
}

// tsconfig.app.json
{
    "compilerOptions": { "composite": true },
    "include": ["src/**/*"]
}

// tsconfig.test.json
{
    "compilerOptions": { "composite": true },
    "include": ["tests/**/*"],
    "references": [{ "path": "./tsconfig.app.json" }]
}
```

### 知识关联

```
配置关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  编译目标   │────→│  严格模式   │────→│  模块解析   │
│  target/    │     │  strict/    │     │  module/    │
│  lib        │     │  noImplicit │     │  resolution │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **tsconfig.json** | TypeScript 编译器配置文件 | 项目根目录 |
| **strict 模式** | 开启所有严格检查 | `strict: true` |
| **composite** | 项目引用模式 | `composite: true` |
| **路径别名** | 简化导入路径 | `"@/*": ["src/*"]` |

---

## 学习资源

- [tsconfig.json 参考](https://www.typescriptlang.org/tsconfig/) ⭐ 官方权威
