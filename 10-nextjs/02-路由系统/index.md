# Next.js 路由系统 ⭐⭐

> 从"怎么让文件夹变成 URL"的疑问出发，理解 App Router

---

## 学习目标

学完本节，你能：
- 理解 App Router 的文件路由规则
- 学会动态路由和捕获所有路由
- 掌握加载状态和错误边界的处理
- 能够使用 Link 和 useRouter 导航

---

## 生活化比喻

**Next.js 路由就像"文件夹就是地图"**：

```
app/page.tsx = 大楼入口：
┌─────────────────────────────┐
│  进大门就看到的首页         │
│  URL: /                     │
└─────────────────────────────┘

app/about/page.tsx = 2 楼办公室：
┌─────────────────────────────┐
│  文件夹结构就是楼层地图     │
│  about 文件夹 → /about 路径 │
└─────────────────────────────┘

app/posts/[id]/page.tsx = 房间号：
┌─────────────────────────────┐
│  [id] 是占位符              │
│  访问 /posts/123 → id=123   │
└─────────────────────────────┘

layout.tsx = 楼层公共区域：
┌─────────────────────────────┐
│  这一层所有房间共享的走廊    │
│  切换房间时不重新渲染公共区域 │
└─────────────────────────────┘
```

---

## 第一步：看看问题

在传统的 React 项目里，你需要手动配置路由：

```jsx
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/posts/:id', component: PostDetail }
];
```

**发现问题了吗？**

- 路由配置和文件结构分离，容易不同步
- 嵌套路由配置复杂
- 加载状态、错误处理需要手动实现

**Next.js 的 App Router 让"文件夹结构就是路由"。**

---

## 第二步：文件路由怎么工作？

在 `app` 目录下，**文件夹名就是 URL 路径，`page.tsx` 就是页面内容**。

```
app/
├── page.tsx           → /
├── about/
│   └── page.tsx       → /about
├── posts/
│   ├── page.tsx       → /posts
│   └── [id]/
│       └── page.tsx   → /posts/123
└── dashboard/
    └── settings/
        └── page.tsx   → /dashboard/settings
```

不需要任何路由配置文件，Next.js 自动生成。

---

## 第三步：试试基础路由

### 创建页面

```tsx
// app/page.tsx
export default function Home() {
    return <h1>首页</h1>;
}
```

```tsx
// app/about/page.tsx
export default function About() {
    return <h1>关于页</h1>;
}
```

访问 `http://localhost:3000/` 看到首页，访问 `/about` 看到关于页。

### 布局共享

很多页面有相同的导航栏。用 `layout.tsx` 共享：

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
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
    );
}
```

`{children}` 就是当前页面的内容。切换页面时，导航栏不重新渲染。

---

## 第四步：动态路由 — 处理动态 URL

有时候 URL 里带参数，比如 `/posts/123`。

用 `[id]` 文件夹表示动态参数：

```
app/
└── posts/
    └── [id]/
        └── page.tsx
```

在组件里获取参数：

```tsx
// app/posts/[id]/page.tsx
export default async function PostPage({ params }) {
    const { id } = await params;
    const post = await fetch(`https://api.example.com/posts/${id}`).then(r => r.json());

    return <article><h1>{post.title}</h1><p>{post.content}</p></article>;
}
```

`[id]` 可以匹配任何值：
- `/posts/1` → `id = '1'`
- `/posts/abc` → `id = 'abc'`

---

## 第五步：特殊文件 — 加载、错误、404

App Router 有几个约定文件，自动处理常见场景。

### loading.tsx — 加载状态

```tsx
// app/posts/loading.tsx
export default function Loading() {
    return <div className="animate-pulse">加载中...</div>;
}
```

访问 `/posts` 时，如果页面是异步的，会先显示这个加载状态。

### error.tsx — 错误边界

```tsx
// app/posts/error.tsx
'use client';
export default function Error({ error, reset }) {
    return (
        <div>
            <h2>出错了：{error.message}</h2>
            <button onClick={reset}>重试</button>
        </div>
    );
}
```

页面渲染出错时，自动显示这个组件。

### not-found.tsx — 404 页面

```tsx
// app/not-found.tsx
export default function NotFound() {
    return <h1>页面不存在</h1>;
}
```

在页面里调用 `notFound()` 函数触发：

```tsx
import { notFound } from 'next/navigation';

export default async function PostPage({ params }) {
    const { id } = await params;
    const post = await fetchPost(id);
    if (!post) notFound();  // 触发 404
    return <article>{post.title}</article>;
}
```

---

## 第六步：导航 — Link 和 useRouter

### Link 组件

用 `<Link>` 代替 `<a>`，客户端导航不刷新页面：

```tsx
import Link from 'next/link';

export default function PostList({ posts }) {
    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </li>
            ))}
        </ul>
    );
}
```

### useRouter

编程式导航，比如表单提交后跳转：

```tsx
'use client';
import { useRouter } from 'next/navigation';

export default function Form() {
    const router = useRouter();

    const handleSubmit = () => {
        // 提交逻辑...
        router.push('/success');
    };

    return <button onClick={handleSubmit}>提交</button>;
}
```

---

## 第七步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `Link 刷新页面` | 用了 `<a>` 标签 | 改用 `<Link>` |
| `params 是 Promise` | Next.js 15 变更 | 用 `await params` |
| `error.tsx 不显示` | 不是 Client Component | 加 `'use client'` |
| `notFound 不生效` | 没导入 `notFound` 函数 | `import { notFound } from 'next/navigation'` |

---

## 总结：速查表

| 文件 | 用途 | 示例 |
|------|------|------|
| `page.tsx` | 页面内容 | `app/about/page.tsx` → `/about` |
| `layout.tsx` | 共享布局 | `app/dashboard/layout.tsx` |
| `loading.tsx` | 加载状态 | `app/posts/loading.tsx` |
| `error.tsx` | 错误边界 | `app/posts/error.tsx` |
| `not-found.tsx` | 404 页面 | `app/not-found.tsx` |
| `[id]` | 动态路由 | `app/posts/[id]/page.tsx` |
| `[...slug]` | 捕获所有 | `app/docs/[...slug]/page.tsx` |

**记住：**
- 文件夹结构就是路由
- 用 `<Link>` 导航
- 特殊文件自动处理加载/错误/404

---

## 实践练习

```tsx
// 练习：实现带面包屑的博客路由
// app/blog/[category]/[slug]/page.tsx
import Link from 'next/link';

export default async function BlogPost({ params }) {
    const { category, slug } = await params;
    const post = await fetchPost(category, slug);

    return (
        <article>
            <nav>
                <Link href="/">首页</Link> →
                <Link href={`/blog/${category}`}>{category}</Link> →
                <span>{post.title}</span>
            </nav>
            <h1>{post.title}</h1>
            <div>{post.content}</div>
        </article>
    );
}
```

---

## 常见问题

### Q：`[id]` 和 `[...slug]` 有什么区别？

**`[id]` 捕获一段路径，`[...slug]` 捕获多段：**

```
app/posts/[id]/page.tsx   → /posts/123（id = "123"）
app/docs/[...slug]/page.tsx → /docs/a/b/c（slug = ["a", "b", "c"]）
```

### Q：Link 和 a 标签有什么区别？

**Link 是客户端导航，预加载目标页面；a 标签会全页刷新。**

```tsx
<Link href="/about">关于</Link>  // ✅ 客户端导航，预加载
<a href="/about">关于</a>        // ❌ 全页刷新
```

### Q：params 为什么是 Promise？

**Next.js 15 为了支持 Partial Prerendering，params 变成异步的。用 `await params` 获取。**

---

## 学习资源

- [Next.js 路由文档](https://nextjs.org/docs/app/building-your-application/routing) ⭐ 官方文档
- [Next.js 路由教程](https://nextjs.org/learn/dashboard-app/defining-routes)
