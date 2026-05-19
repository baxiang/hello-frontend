# Next.js API 开发 ⭐

> 从"怎么写后端接口"的疑问出发，理解 Route Handlers 和 Server Actions

---

## 学习目标

学完本节，你能：
- 掌握 Route Handlers 的创建和使用
- 理解 RESTful API 的设计原则
- 学会处理请求参数和响应
- 了解 CORS 配置和 API 中间件

---

## 生活化比喻

**API 开发就像"餐厅的外卖窗口"**：

```
route.ts = 外卖窗口：
┌─────────────────────────────┐
│  专门处理外部请求           │
│  app/api/users/route.ts → /api/users │
└─────────────────────────────┘

GET = 查看菜单：
┌─────────────────────────────┐
│  问"有什么菜"，窗口给菜单   │
│  只读操作，不改变任何东西   │
└─────────────────────────────┘

POST = 点新菜：
┌─────────────────────────────┐
│  告诉窗口"我要一份宫保鸡丁" │
│  创建新数据                 │
└─────────────────────────────┘

NextRequest = 订单详情：
┌─────────────────────────────┐
│  包含客人信息、点单内容     │
│  headers, searchParams, body │
└─────────────────────────────┘

Response = 打包好的外卖：
┌─────────────────────────────┐
│  包装好的数据，带状态码     │
│  Response.json({ users: [] }) │
└─────────────────────────────┘
```

---

## 第一步：看看问题

在传统 Express 项目里，你需要单独写 API 路由：

```javascript
// routes/users.js
router.get('/api/users', (req, res) => { ... });
router.post('/api/users', (req, res) => { ... });
```

**发现问题了吗？**

- API 路由和业务逻辑分散
- 需要额外配置服务器
- 在 Next.js 里，你可以直接在 `app` 目录下写 API

---

## 第二步：Route Handlers 怎么解决？

Next.js 的 **Route Handlers** 让你在 `app/api` 目录下直接写 API。

```
app/
└── api/
    └── users/
        └── route.ts  → /api/users
```

### 最简单的 API

```tsx
// app/api/users/route.ts
export async function GET() {
    return Response.json({ users: [] });
}
```

访问 `http://localhost:3000/api/users` 就能看到 JSON 响应。

---

## 第三步：试试基础 API

### GET — 获取数据

```tsx
// app/api/users/route.ts
export async function GET() {
    const users = await db.users.findMany();
    return Response.json(users);
}
```

### POST — 创建数据

```tsx
export async function POST(req: Request) {
    const body = await req.json();
    const user = await db.users.create({ data: body });
    return Response.json(user, { status: 201 });
}
```

### DELETE — 删除数据

```tsx
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await db.users.delete({ where: { id } });
    return new Response(null, { status: 204 });
}
```

---

## 第四步：处理请求参数

### 路径参数（Dynamic Routes）

```
app/
└── api/
    └── users/
        └── [id]/
            └── route.ts  → /api/users/123
```

```tsx
// app/api/users/[id]/route.ts
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await db.users.findUnique({ where: { id } });
    return user ? Response.json(user) : new Response(null, { status: 404 });
}
```

### 查询参数

```tsx
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    return Response.json({ page, limit });
}
```

---

## 第五步：CORS — 跨域配置

如果你的 API 要被其他域名访问，需要配置 CORS：

```tsx
export async function GET() {
    return Response.json({ users: [] }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        }
    });
}

// OPTIONS 预检请求
export async function OPTIONS() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}
```

---

## 第六步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `Cannot access body on GET` | GET 请求没有 body | 用 POST/PUT |
| `Route segment config` | 没指定动态渲染 | 用 `export const dynamic = 'force-dynamic'` |
| `CORS 报错` | 没配置跨域 | 加 `Access-Control-Allow-Origin` 头 |
| `405 Method Not Allowed` | 请求方法没实现 | 实现对应的方法（GET/POST） |

---

## 第七步：最佳实践

### 1. 统一错误处理

```tsx
export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.email) return Response.json({ error: '邮箱必填' }, { status: 400 });
        const user = await createUser(body);
        return Response.json(user, { status: 201 });
    } catch (error) {
        return Response.json({ error: '创建失败' }, { status: 500 });
    }
}
```

### 2. RESTful URL 设计

| 方法 | 路径 | 说明 | 状态码 |
|------|------|------|:---:|
| `GET` | `/api/users` | 获取用户列表 | 200 |
| `GET` | `/api/users/:id` | 获取单个用户 | 200 |
| `POST` | `/api/users` | 创建用户 | 201 |
| `PUT` | `/api/users/:id` | 更新用户 | 200 |
| `DELETE` | `/api/users/:id` | 删除用户 | 204 |

### 3. 用 Server Actions 代替简单 API

表单提交用 Server Actions 更简洁：

```tsx
'use server'
export async function createPost(formData: FormData) {
    const title = formData.get('title') as string;
    await db.posts.create({ data: { title } });
}
```

---

## 总结：速查表

| 概念 | 语法 | 示例 |
|------|------|------|
| Route Handler | `app/api/.../route.ts` | `export async function GET() { }` |
| 返回 JSON | `Response.json(data)` | `Response.json({ users: [] })` |
| 状态码 | `{ status: 201 }` | `Response.json(data, { status: 201 })` |
| 请求体 | `await req.json()` | `const body = await req.json()` |
| 路径参数 | `{ params }` | `const { id } = await params` |
| 查询参数 | `new URL(req.url)` | `searchParams.get('page')` |

**记住：**
- URL 用名词（资源），不用动词
- POST 创建返回 201，DELETE 成功返回 204
- 表单提交优先用 Server Actions

---

## 实践练习

```tsx
// 练习：实现完整的 CRUD API
// app/api/posts/route.ts
import { NextRequest } from 'next/server';

const posts = new Map();

export async function GET() {
    return Response.json({ posts: Array.from(posts.values()) });
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    if (!body.title) return Response.json({ error: '标题必填' }, { status: 400 });
    const post = { id: Date.now(), ...body, createdAt: new Date() };
    posts.set(post.id, post);
    return Response.json(post, { status: 201 });
}

// app/api/posts/[id]/route.ts
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = posts.get(Number(id));
    if (!post) return Response.json({ error: '不存在' }, { status: 404 });
    return Response.json(post);
}
```

---

## 常见问题

### Q：Route Handlers 和 Server Actions 选哪个？

**表单提交用 Server Actions，外部 API 调用用 Route Handlers。**

### Q：如何获取请求体？

```tsx
// JSON 请求体
const body = await req.json();

// FormData
const formData = await req.formData();

// 文本
const text = await req.text();
```

### Q：如何设置响应头？

```tsx
return Response.json({ data }, {
    headers: { 'X-Custom-Header': 'value' },
    status: 201
});
```

---

## 学习资源

- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) ⭐ 官方文档
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
