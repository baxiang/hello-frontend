# tsconfig.json 配置 ⭐

> TypeScript 编译器配置详解

---

## L1 理解层

**最简示例（1-3行）：**

```bash
npx tsc --init    # 生成配置文件
npx tsc           # 编译项目
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

## L2 实践层

### 核心配置速查

| 选项 | 用途 | 推荐值 |
|------|------|--------|
| `target` | 编译目标版本 | `ES2020` |
| `module` | 模块系统 | `commonjs`(Node) / `ESNext`(前端) |
| `strict` | 严格模式 | `true` |
| `outDir` | 输出目录 | `./dist` |
| `rootDir` | 源码目录 | `./src` |
| `esModuleInterop` | ES 模块兼容 | `true` |
| `skipLibCheck` | 跳过声明文件检查 | `true` |

### 反模式

```json
// ❌ 错误：关闭严格模式
{ "strict": false }

// ✅ 正确：始终开启严格模式
{ "strict": true }
```

---

## 学习资源

- [tsconfig.json 参考](https://www.typescriptlang.org/tsconfig/) ⭐ 官方权威
