# Next.js 快速入门 ⭐

> Next.js 是什么、安装、App Router 基础

---

## 学习目标

- 理解 Next.js 是什么以及为什么需要它
- 掌握 App Router 的项目结构
- 学会创建第一个 Next.js 页面

---

## 生活化比喻

**Next.js 就像"精装修的房子"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  精装修的房子                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│    React = 毛坯房                                     │
│    ─────────────                                     │
│    有了基本的框架，但需要自己配置路由、构建、SEO等    │
│    灵活但工作量大                                     │
│                                                      │
│    Next.js = 精装修                                   │
│    ─────────────                                     │
│    路由、构建优化、SSR、SEO 全部配好                  │
│    拎包入住，需要定制也能改                          │
│                                                      │
│    App Router = 房间布局                              │
│    ─────────────                                     │
│    文件夹结构就是路由结构                            │
│    app/page.tsx = 首页，app/about/page.tsx = 关于页  │
│                                                      │
│    Server Components = 预渲染的房间                   │
│    ─────────────                                     │
│    服务器先渲染好，直接给客户端                       │
│    首屏快，SEO 好                                    │
│                                                      │
│    Client Components = 可交互的房间                   │
│    ─────────────                                     │
│    客户端渲染，支持 useState、useEffect              │
│    有交互功能                                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 创建项目

**最简示例（1-3行）：**

```bash
npx create-next-app@latest my-app --typescript
cd my-app && npm run dev
```

**详细示例：**

```bash
# 创建项目
npx create-next-app@latest my-app
# 选择：TypeScript Yes, ESLint Yes, Tailwind Yes, App Router Yes

# 启动开发服务器
cd my-app
npm run dev  # http://localhost:3000
```

**项目结构：**

```
my-app/
├── app/
│   ├── layout.tsx     ← 根布局（所有页面共享）
│   ├── page.tsx       ← 首页（/）
│   └── about/
│       └── page.tsx   ← 关于页（/about）
├── public/            ← 静态文件
├── next.config.ts     ← Next.js 配置
└── package.json
```

---

### 创建页面

**最简示例：**

```tsx
// app/page.tsx
export default function Home() {
  return <h1>Hello Next.js!</h1>
}
```

**详细示例：**

```tsx
// app/layout.tsx — 根布局
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>
        <nav>
          <a href="/">首页</a>
          <a href="/about">关于</a>
        </nav>
        {children}
      </body>
    </html>
  )
}

// app/page.tsx — 首页
export default function Home() {
  return (
    <main>
      <h1>欢迎来到 Next.js</h1>
      <p>这是使用 App Router 构建的应用</p>
    </main>
  )
}

// app/about/page.tsx — 关于页
export default function About() {
  return <h1>关于我们</h1>
}
```

---

## L2 实践层：用好

### 渲染模式对比

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| **CSR** | 客户端渲染（传统 React） | 后台管理、内网应用 |
| **SSR** | 服务端渲染（每次请求渲染） | 电商、新闻、需要实时数据 |
| **SSG** | 静态生成（构建时渲染） | 博客、文档、营销页面 |
| **ISR** | 增量静态再生（定时更新） | 内容经常更新但不需要实时 |

### 反模式：不要这样做

```tsx
// ❌ 错误：在 Server Component 中使用 useState
export default function Page() {
  const [count, setCount] = useState(0)  // ❌ Server Component 不支持 Hooks
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}

// ✅ 正确：标记为 Client Component
'use client'
export default function Page() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 博客/文档站 | SSG | 构建一次，CDN 分发，最快 |
| 电商/新闻 | SSR | 实时数据，SEO 友好 |
| 后台管理 | CSR（纯 React） | 不需要 SEO，交互复杂 |
| 内容经常更新 | ISR | 定时重新生成，兼顾速度和实时性 |

---

## L3 专家层：深入

### 渲染流程

```
Next.js 请求处理流程：

客户端请求 → Next.js 服务器
    ↓
检查是否有缓存的静态页面
    ↓
有缓存 → 直接返回（SSG/ISR）
    ↓
无缓存 → 服务端渲染（SSR）
    ↓
返回 HTML + 客户端 JS
    ↓
客户端水合（Hydration）→ 变为可交互
```

### 知识关联

```
Next.js 核心概念关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  App Router │────→│  Server     │────→│  数据获取   │
│  文件路由   │     │  Components │     │  fetch/     │
│  嵌套布局   │     │  RSC        │     │  cache/     │
└─────────────┘     └─────────────┘     │  revalidate │
                                        └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **App Router** | Next.js 13+ 的路由系统，基于文件系统 | `app/about/page.tsx` |
| **Server Component** | 在服务端渲染的组件，默认类型 | `export default function Page()` |
| **Client Component** | 在客户端渲染的组件，需要 `'use client'` | `'use client'` 标记 |
| **SSR** | 服务端渲染，每次请求生成 HTML | 适合动态内容 |
| **SSG** | 静态生成，构建时生成 HTML | 适合静态内容 |
| **Hydration** | 客户端接管服务端 HTML，使其可交互 | 自动完成 |

---

## 实践练习

```tsx
// 练习：创建带导航的多页应用
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <header>
          <nav>
            <a href="/">首页</a>
            <a href="/posts">文章</a>
            <a href="/about">关于</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>&copy; 2026 My Site</footer>
      </body>
    </html>
  )
}

// app/posts/page.tsx
export default function Posts() {
  return (
    <div>
      <h1>文章列表</h1>
      <ul>
        <li><a href="/posts/1">文章一</a></li>
        <li><a href="/posts/2">文章二</a></li>
      </ul>
    </div>
  )
}
```

---

## 常见问题

### Q1：Next.js 和纯 React 有什么区别？

**Next.js 在 React 基础上提供了：文件路由、SSR/SSG、API 路由、图片优化、字体优化等开箱即用的功能。**

### Q2：Server Component 和 Client Component 怎么选？

**默认用 Server Component（性能好、SEO 好）。需要交互（useState、useEffect、事件处理）时用 Client Component。**

### Q3：什么时候用 SSR，什么时候用 SSG？

**需要实时数据用 SSR，内容不经常变用 SSG。**

---

## 学习资源

- [Next.js 官方文档](https://nextjs.org/docs) ⭐ 官方权威
- [Next.js Learn](https://nextjs.org/learn) - 官方教程
