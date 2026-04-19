# 服务端组件与客户端组件 ⭐⭐

> 从"怎么减少客户端 JS 体积"的疑问出发，理解 RSC

---

## 学习目标

学完本节，你能：
- 理解 Server Component 和 Client Component 的区别
- 掌握 'use client' 的使用场景
- 学会在 Server 和 Client 组件间传递数据
- 能够最大化利用 Server Component 的性能优势

---

## 生活化比喻

**Server/Client 组件就像"前厅和后厨"**：

```
Server Component = 后厨：
┌─────────────────────────────┐
│  在后厨做好菜直接端出来     │
│  客人看不到后厨的操作       │
│  可以直接用冰箱里的食材     │
│  （直接查数据库）           │
└─────────────────────────────┘

Client Component = 前厅：
┌─────────────────────────────┐
│  前厅可以和客人互动         │
│  （useState、onClick）      │
│  但不能直接去冰箱拿食材     │
│  （不能直接查数据库）       │
└─────────────────────────────┘

'use client' = "这是前厅区域"的牌子：
┌─────────────────────────────┐
│  挂上这个牌子，这个组件变成前厅 │
│  可以用所有 React Hooks     │
│  但会增加客户端 JS 体积     │
└─────────────────────────────┘
```

---

## 第一步：看看问题

在传统的 React 项目里，所有组件都在客户端渲染：

```jsx
function Page() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('/api/data').then(r => r.json()).then(setData);
    }, []);

    if (!data) return <div>加载中...</div>;
    return <div>{data.content}</div>;
}
```

**发现问题了吗？**

- 浏览器要下载 React、组件代码、数据获取逻辑
- JS 体积大，首屏慢
- 用户先看到加载动画，体验差

---

## 第二步：Server Components 怎么解决？

Next.js App Router 默认所有组件都是 **Server Components**。

Server Components 在服务端渲染，**不发送任何 JS 到客户端**。

```tsx
// app/page.tsx
// 这是 Server Component，默认就是
export default async function Page() {
    // 直接查数据库
    const data = await db.posts.findMany();

    return (
        <ul>
            {data.map(post => <li key={post.id}>{post.title}</li>)}
        </ul>
    );
}
```

**好处：**
- 零客户端 JS 体积
- 直接访问数据库
- 首屏快

---

## 第三步：试试 Client Components

有时候你需要交互（useState, onClick）。这时需要标记为 **Client Component**。

用 `'use client'` 指令：

```tsx
'use client';  // 标记为客户端组件

import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**规则：**
- 默认是 Server Component
- 需要 Hook 或事件处理时，加 `'use client'`
- `'use client'` 必须放在文件最顶部

---

## 第四步：Server 和 Client 怎么配合？

### 模式 1：Server 包裹 Client

```tsx
// app/page.tsx (Server)
import ClientCounter from './ClientCounter';

export default async function Page() {
    const data = await fetchData();
    // Server 获取数据，传给 Client
    return <ClientCounter initialData={data} />;
}

// app/ClientCounter.tsx (Client)
'use client';
import { useState } from 'react';

export default function ClientCounter({ initialData }) {
    const [count, setCount] = useState(initialData.count);
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 模式 2：通过 children 传递

Client 组件包裹 Server 组件，只有交互部分需要客户端 JS：

```tsx
// app/layout.tsx (Client)
'use client';
import { useState } from 'react';

export default function Layout({ children }) {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setOpen(!open)}>菜单</button>
            {/* children 是 Server 组件，不增加客户端 JS */}
            <main>{children}</main>
        </div>
    );
}
```

---

## 第五步：对比总结

| 特性 | Server Component | Client Component |
|------|:---:|:---:|
| 服务端渲染 | ✅ | ✅ |
| 直接访问后端 | ✅ | ❌ |
| useState/useEffect | ❌ | ✅ |
| 事件处理（onClick） | ❌ | ✅ |
| 减少客户端 JS | ✅ | ❌ |
| 访问环境变量 | ✅（所有） | ❌（仅 NEXT_PUBLIC_） |

---

## 第六步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `Hook 只能在 Client Component 使用` | 在 Server 用了 useState | 加 `'use client'` |
| `Cannot access db on the client` | Client 里查数据库 | 移到 Server Component |
| `Function as prop not serializable` | Server 传函数给 Client | 用 Server Actions |

---

## 第七步：最佳实践

### 1. 默认用 Server

尽量保持组件为 Server，只在需要交互时切 Client。

### 2. 把 Client 组件推到底层

```tsx
// ❌ 不好的做法：整个页面都是 Client
'use client';
export default function Page() {
    const [state, setState] = useState(0);
    return <div>...大量静态内容...</div>;
}

// ✅ 好的做法：只有交互部分是 Client
export default function Page() {
    return (
        <div>
            ...大量静态内容...
            <InteractivePart />
        </div>
    );
}

// InteractivePart.tsx
'use client';
export default function InteractivePart() {
    const [state, setState] = useState(0);
    return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}
```

### 3. 用 Server Actions 代替 API Routes

表单提交用 Server Actions，减少客户端 JS。

---

## 总结：速查表

| 概念 | 语法 | 示例 |
|------|------|------|
| Server Component | 默认 | `async function Page() { }` |
| Client Component | `'use client'` | `'use client'; function Counter() { }` |
| Server → Client | Props | `<Client data={serverData} />` |
| Client → Server | Server Actions | `<form action={action}>` |

**记住：**
- 默认 Server，需要交互才用 Client
- Server 不能传函数给 Client
- Client 组件推到底层

---

## 实践练习

```tsx
// 练习：实现 Server → Client 数据传递
// app/page.tsx (Server)
import db from '@/lib/db';
import ClientChart from './client-chart';

export default async function Page() {
    const sales = await db.sales.findMany();
    return (
        <div>
            <h1>销售数据</h1>
            <ClientChart data={sales} />
        </div>
    );
}

// app/client-chart.tsx (Client)
'use client';
import { useState } from 'react';

export default function ClientChart({ data }) {
    const [filter, setFilter] = useState('all');
    // 补全：根据 filter 过滤数据并显示
}
```

---

## 常见问题

### Q：什么时候用 Server，什么时候用 Client？

**默认用 Server，需要交互时才用 Client。**

```tsx
// Server — 数据获取、SEO、减少客户端 JS
export default async function Page() {
    const data = await fetchData();
    return <ClientPart data={data} />;
}

// Client — 交互、动画、Hooks
'use client';
export default function ClientPart({ data }) {
    const [state, setState] = useState(data);
    return <button onClick={() => setState({ ...state })}>更新</button>;
}
```

### Q：Server Component 能用 useState 吗？

**不能。Server Component 在服务端渲染，不能使用 React Hooks。需要交互时用 Client Component。**

### Q：Server Component 怎么传函数给 Client？

**不能直接传函数。用事件处理或 Server Actions 替代。**

```tsx
// ❌ 错误：Server 传函数给 Client
<Child onUpdate={() => { }} />  // 不能传函数

// ✅ 正确：用 Server Actions
'use server'
export async function updateData() { }

<Child action={updateData} />
```

---

## 学习资源

- [Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) ⭐ 官方文档
- [Next.js 渲染文档](https://nextjs.org/docs/app/building-your-application/rendering)
