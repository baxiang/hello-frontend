# Next.js 数据获取 ⭐⭐

> 从"怎么在服务端获取数据"的疑问出发，理解 Next.js 的数据获取机制

---

## 学习目标

学完本节，你能：
- 掌握 Next.js 中 fetch 的缓存机制
- 学会使用 revalidate 实现增量静态再生
- 理解 Server Actions 的使用场景
- 能够选择合适的渲染策略

---

## 生活化比喻

**数据获取就像"餐厅的备菜系统"**：

```
客户端获取 = 客人自己点菜：
┌─────────────────────────────┐
│  客人来了才去厨房点菜       │
│  等菜时间长，体验差         │
│  fetch('/api/data')         │
└─────────────────────────────┘

服务端获取 = 提前备菜：
┌─────────────────────────────┐
│  菜提前做好了               │
│  客人来了直接上菜           │
│  快，SEO 好                 │
└─────────────────────────────┘

缓存 = 预制菜：
┌─────────────────────────────┐
│  提前做好的菜放冰箱         │
│  客人点了直接端             │
│  fetch(url) → 第一次做，之后直接拿 │
└─────────────────────────────┘

revalidate = 定时换菜：
┌─────────────────────────────┐
│  预制菜放 60 秒，到期重新做 │
│  revalidate: 60             │
└─────────────────────────────┘
```

---

## 第一步：看看问题

在传统的 React 项目里，你在 `useEffect` 里获取数据：

```jsx
function Page() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/data').then(r => r.json()).then(setData);
    }, []);

    if (!data) return <div>加载中...</div>;
    return <pre>{JSON.stringify(data)}</pre>;
}
```

**发现问题了吗？**

- 页面先加载 HTML（空的），再发请求获取数据
- 用户看到加载动画，体验差
- 搜索引擎看不到数据，SEO 差
- 每次访问都要请求，慢

---

## 第二步：Next.js 怎么解决？

Next.js 允许你在**服务端组件**里直接 `await fetch`。

数据在服务器获取，HTML 直接包含数据返回给浏览器。

```tsx
// app/page.tsx
export default async function Page() {
    // 直接 await fetch，不需要 useEffect
    const data = await fetch('https://api.example.com/data');
    const json = await data.json();

    return <pre>{JSON.stringify(json)}</pre>;
}
```

**好处：**
- 用户直接看到数据，没有加载动画
- 搜索引擎能抓取数据，SEO 好
- 快，因为数据在服务端获取

---

## 第三步：试试基础数据获取

### 基本用法

```tsx
// app/posts/page.tsx
export default async function PostsPage() {
    const res = await fetch('https://api.example.com/posts');
    const posts = await res.json();

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    );
}
```

### 处理错误

```tsx
export default async function PostsPage() {
    try {
        const res = await fetch('https://api.example.com/posts');
        if (!res.ok) throw new Error('获取失败');
        const posts = await res.json();
        return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
    } catch (error) {
        return <div>出错了：{error.message}</div>;
    }
}
```

---

## 第四步：缓存机制 — Next.js 默认缓存数据

Next.js 的 `fetch` **默认是缓存的**。第一次请求后，结果会被缓存，后续请求直接使用缓存。

```tsx
// 默认：缓存（类似 SSG）
export default async function Page() {
    const data = await fetch('https://api.example.com/data');
    // 数据会被缓存，下次请求直接使用
    const json = await data.json();
    return <pre>{JSON.stringify(json)}</pre>;
}
```

### 不缓存（类似 SSR）

如果你需要每次都是最新数据：

```tsx
export default async function Page() {
    const data = await fetch('https://api.example.com/data', {
        cache: 'no-store'  // 每次都重新请求
    });
    return <pre>{JSON.stringify(await data.json())}</pre>;
}
```

---

## 第五步：revalidate — 定时更新缓存

如果你希望数据缓存一段时间，然后自动更新：

```tsx
export default async function Page() {
    const data = await fetch('https://api.example.com/data', {
        next: { revalidate: 60 }  // 60 秒后重新验证
    });
    return <pre>{JSON.stringify(await data.json())}</pre>;
}
```

**工作流程：**
1. 第一次请求 → 获取数据并缓存
2. 60 秒内 → 使用缓存
3. 60 秒后 → 后台重新请求，更新缓存
4. 下一个请求 → 使用新缓存

这叫做 **ISR（增量静态再生）**。

---

## 第六步：Server Actions — 表单提交不用 API 路由

传统方式：表单提交 → 发 POST 请求 → API 路由处理。

Next.js 的 **Server Actions** 让你直接在组件里调用服务端函数：

```tsx
// app/actions.ts
'use server'
export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    // 数据库操作...
    return { success: true };
}

// app/page.tsx
'use client'
import { createPost } from './actions';

export default function Page() {
    return (
        <form action={createPost}>
            <input name="title" />
            <button type="submit">提交</button>
        </form>
    );
}
```

表单提交时，`createPost` 在服务端执行，不需要写 API 路由。

---

## 第七步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `fetch is not a function` | 在 Client Component 用了 await fetch | 改用 useEffect 或移到 Server Component |
| `Data is stale` | 缓存数据不是最新的 | 用 `revalidate` 或 `no-store` |
| `Server Actions 不生效` | 没加 `'use server'` | 在函数顶部加 `'use server'` |
| `API 响应慢` | 每次都请求 | 用缓存或 revalidate |

---

## 总结：速查表

| 策略 | 配置 | 适用场景 |
|------|------|---------|
| 缓存（默认） | `fetch(url)` | 不经常变化的数据 |
| 不缓存 | `{ cache: 'no-store' }` | 实时数据（股票、天气） |
| 定时更新 | `{ next: { revalidate: 60 } }` | 定期更新的内容 |
| Server Actions | `'use server'` | 表单提交 |

**记住：**
- 优先在服务端获取数据
- 默认缓存，需要实时用 `no-store`
- 表单提交用 Server Actions

---

## 实践练习

```tsx
// 练习：实现带加载状态的 Server Action
'use server'
export async function submitForm(formData: FormData) {
    const title = formData.get('title') as string;
    if (!title) return { error: '标题不能为空' };

    // 模拟数据库操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, id: Date.now() };
}
```

---

## 常见问题

### Q：缓存和 no-store 怎么选？

**内容不经常变用缓存，需要实时数据用 no-store。**

```tsx
// 博客文章 — 缓存
const posts = await fetch('/api/posts');

// 用户信息 — 不缓存
const user = await fetch('/api/user', { cache: 'no-store' });
```

### Q：revalidate 和 no-store 有什么区别？

**revalidate 是定时更新缓存，no-store 是每次都不缓存。**

```tsx
fetch('/api/posts', { next: { revalidate: 60 } });  // 60 秒后更新
fetch('/api/user', { cache: 'no-store' });           // 每次都重新请求
```

### Q：Server Actions 和 API Routes 选哪个？

**表单提交用 Server Actions（更简洁），外部 API 调用用 Route Handlers。**

```tsx
// Server Actions — 表单提交
'use server'
export async function createPost(formData: FormData) { }

// Route Handlers — 外部 API
export async function POST(req: NextRequest) { }
```

---

## 学习资源

- [Next.js 数据获取](https://nextjs.org/docs/app/building-your-application/data-fetching) ⭐ 官方文档
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
