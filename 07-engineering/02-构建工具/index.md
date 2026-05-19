# 构建工具 ⭐⭐

> Webpack 核心概念、Vite 配置、构建优化

---

## 学习目标

- 理解 Webpack 的核心概念（Entry、Loader、Plugin）
- 掌握 Vite 配置和开发服务器
- 了解构建优化策略（代码分割、压缩）

---

## 生活化比喻

**构建工具就像"工厂生产线"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  工厂生产线                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│    Entry = 原材料入口                                │
│    ─────────────                                     │
│    所有原材料从这里进入生产线                        │
│    通常是 src/index.js                              │
│                                                      │
│    Loader = 加工设备                                 │
│    ─────────────                                     │
│    把不同材料加工成可用零件                          │
│    CSS → 打包进 JS                                   │
│    TypeScript → 编译成 JS                           │
│    图片 → 压缩 + base64                             │
│                                                      │
│    Plugin = 质检员 + 包装工                          │
│    ─────────────                                     │
│    检查产品质量、压缩、生成 HTML 文件                │
│    在生产线的不同阶段工作                            │
│                                                      │
│    Output = 成品仓库                                 │
│    ─────────────                                     │
│    最终产出放在 dist/ 目录                          │
│    文件名带哈希值，便于缓存                         │
│                                                      │
│    Vite = 智能工厂（按需生产）                       │
│    ─────────────                                     │
│    不需要预先编译所有东西                            │
│    需要什么就生产什么（开发快）                      │
│                                                      │
│    Webpack = 传统工厂（全量生产）                    │
│    ─────────────                                     │
│    启动慢，但功能全面                               │
│    适合复杂项目                                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### Vite 基础配置

**最简示例：**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: { alias: { '@': '/src' } },
    server: { port: 3000 }
})
```

**详细示例：**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components')
        }
    },
    server: {
        port: 3000,
        proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } }
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                manualChunks: { 'vendor-vue': ['vue', 'vue-router'] }
            }
        }
    }
})
```

---

## L2 实践层：用好

### Webpack vs Vite 选择

| 特性 | Vite | Webpack |
|------|------|---------|
| 开发启动 | 极快（按需编译） | 慢（全量构建） |
| HMR | 极快 | 较快 |
| 生产构建 | 快（Rollup） | 快（优化后） |
| 生态 | 较新 | 成熟 |
| 推荐场景 | 新项目、Vue/React | 老项目、复杂配置 |

### 反模式：不要这样做

```javascript
// ❌ 错误：生产环境不压缩
build: { minify: false }

// ✅ 正确：生产环境压缩（Vite 默认开启）
build: { minify: 'terser' }
```

### 适用场景

| 场景 | 方案 | 原因 |
|------|------|------|
| 新项目 | Vite | 启动快，配置简单 |
| 老项目迁移 | 保留 Webpack | 迁移成本高 |
| 代码分割 | manualChunks | 减少首屏加载 |
| 代理 API | server.proxy | 解决跨域 |

---

## L3 专家层：深入

### 构建优化策略

```
优化流程：

1. 代码分割 → 按需加载
   manualChunks: { 'vendor': ['vue'] }

2. Tree Shaking → 移除未使用代码
   使用 ES Modules（import/export）

3. 压缩 → 减少体积
   Terser (JS) + CSSNano (CSS)

4. 缓存 → 利用浏览器缓存
   文件名带 contenthash

结果：首屏加载减少 50%+
```

### 知识关联

```
构建工具关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  开发服务器 │────→│  代码编译   │────→│  构建优化   │
│  Vite/      │     │  Babel/     │     │  分割/      │
│  Webpack    │     │  TypeScript │     │  压缩/      │
└─────────────┘     └─────────────┘     │  缓存       │
                                        └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **Entry** | 构建的入口文件 | `entry: './src/main.js'` |
| **Loader** | 处理非 JS 文件的转换器 | babel-loader、css-loader |
| **Plugin** | 扩展构建功能的插件 | HtmlWebpackPlugin |
| **HMR** | 热模块替换，不刷新页面更新代码 | 开发时自动更新 |
| **Tree Shaking** | 移除未使用的代码 | 依赖 ES Modules |
| **Code Splitting** | 将代码分割成多个 chunk | 按需加载 |

---

## 实践练习

```javascript
// 练习：配置 Vite 路径别名 + 代理
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: { alias: { '@': '/src' } },
    server: {
        proxy: {
            '/api': { target: 'http://localhost:3000', changeOrigin: true }
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-vue': ['vue', 'vue-router'],
                    'vendor-ui': ['element-plus']
                }
            }
        }
    }
})
```

---

## 常见问题

### Q1：Vite 和 Webpack 哪个更好？

**新项目用 Vite（开发体验好），老项目保留 Webpack（生态成熟）。**

### Q2：如何解决开发时的跨域问题？

**用 Vite 的 proxy 配置：**

```javascript
server: {
    proxy: { '/api': { target: 'http://localhost:8080', changeOrigin: true } }
}
```

---

## 学习资源

- [Vite 官方文档](https://cn.vitejs.dev/) ⭐ 官方权威
- [Webpack 官方文档](https://webpack.js.org/)
