# Next.js API 开发 ⭐

> Route Handlers、Server Actions、CORS、中间件

---

## 学习目标

- 掌握 Route Handlers 的创建和使用
- 理解 RESTful API 的设计原则
- 学会处理请求参数和响应
- 了解 CORS 配置和 API 中间件

---

## 生活化比喻

**API 开发就像"餐厅的外卖窗口"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  外卖窗口                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    route.ts = 外卖窗口                               │
│    ─────────────                                     │
│    专门处理外部请求，不接待堂食（页面渲染）          │
│    app/api/users/route.ts → /api/users              │
│                                                      │
│    GET = 查看菜单                                    │
│    ─────────────                                     │
│    问"有什么菜"，窗口给菜单                          │
│    只读操作，不改变任何东西                          │
│                                                      │
│    POST = 点新菜                                     │
│    ─────────────                                     │
│    告诉窗口"我要一份宫保鸡丁"                        │
│    创建新数据                                        │
│                                                      │
│    PUT = 改订单                                      │
│    ─────────────                                     │
│    "把我的宫保鸡丁换成鱼香肉丝"                      │
│    完整替换数据                                      │
│                                                      │
│    DELETE = 取消订单                                 │
│    ─────────────                                     │
│    "取消我的订单"                                    │
│    删除数据                                          │
│                                                      │
│    NextRequest = 订单详情                             │
│    ─────────────                                     │
│    包含客人信息、点单内容、特殊要求                  │
│    headers, searchParams, body                      │
│                                                      │
│    Response = 打包好的外卖                            │
│    ─────────────                                     │
│    包装好的数据，带状态码                            │
│    Response.json({ users: [] })                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### Route Handlers 基础

**最简示例（1-3行）：**

```tsx
// app/api/users/route.ts
export async function GET() {
  return Response.json({ users: [] })
}
```

**详细示例：**

```tsx
// app/api/users/route.ts
import { NextRequest } from 'next/server'

// GET — 获取用户列表
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  return Response.json({ users: [], page, limit })
}

// POST — 创建用户
export async function POST(req: NextRequest) {
  const body = await req.json()
  // 验证输入
  if (!body.name) return Response.json({ error: '姓名不能为空' }, { status: 400 })
  return Response.json({ id: Date.now(), ...body }, { status: 201 })
}

// DELETE — 删除用户
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return Response.json({ error: '缺少 id' }, { status: 400 })
  return Response.json({ deleted: id })
}
```

---

## L2 实践层：用好

### RESTful API 设计

| 方法 | 路径 | 说明 | 状态码 |
|------|------|------|:---:|
| `GET` | `/api/users` | 获取用户列表 | 200 |
| `GET` | `/api/users/:id` | 获取单个用户 | 200 |
| `POST` | `/api/users` | 创建用户 | 201 |
| `PUT` | `/api/users/:id` | 更新用户 | 200 |
| `DELETE` | `/api/users/:id` | 删除用户 | 204 |

### CORS 配置

```tsx
// app/api/users/route.ts
export async function GET(req: NextRequest) {
  return Response.json({ users: [] }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    }
  })
}

// OPTIONS 预检请求
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}
```

### 反模式：不要这样做

```tsx
// ❌ 错误：不处理错误
export async function POST(req: NextRequest) {
  const body = await req.json()
  const user = await createUser(body)
  return Response.json(user)
}

// ✅ 正确：处理错误
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.email) return Response.json({ error: '邮箱必填' }, { status: 400 })
    const user = await createUser(body)
    return Response.json(user, { status: 201 })
  } catch (error) {
    return Response.json({ error: '创建失败' }, { status: 500 })
  }
}
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 第三方 API | Route Handlers | 独立接口 |
| 表单提交 | Server Actions | 更简洁 |
| 文件上传 | Route Handlers | 处理 FormData |
| Webhook | Route Handlers | 接收外部回调 |
| 代理请求 | Route Handlers | 隐藏 API 密钥 |

---

## L3 专家层：深入

### 中间件

```tsx
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // API 速率限制
  const ip = request.ip
  // 检查请求频率...

  // 认证检查
  const token = request.headers.get('authorization')
  if (!token && request.nextUrl.pathname.startsWith('/api/protected')) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*']
}
```

### 知识关联

```
API 开发关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Route      │────→│  请求处理   │────→│  中间件     │
│  Handlers   │     │  GET/POST/  │     │  认证/      │
│  RESTful    │     │  参数/      │     │  限流/      │
└─────────────┘     │  错误处理   │     │  CORS       │
                    └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **Route Handler** | Next.js 的 API 路由 | `app/api/users/route.ts` |
| **NextRequest** | 增强的请求对象 | `req.nextUrl.searchParams` |
| **Response.json** | JSON 响应 | `Response.json({ data })` |
| **CORS** | 跨域资源共享 | `Access-Control-Allow-Origin` |
| **Middleware** | 请求拦截器 | `middleware.ts` |

---

## 实践练习

```tsx
// 练习：实现完整的 CRUD API
// app/api/posts/route.ts
import { NextRequest } from 'next/server'

const posts = new Map()

export async function GET() {
  return Response.json({ posts: Array.from(posts.values()) })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body.title) return Response.json({ error: '标题必填' }, { status: 400 })
  const post = { id: Date.now(), ...body, createdAt: new Date() }
  posts.set(post.id, post)
  return Response.json(post, { status: 201 })
}

// app/api/posts/[id]/route.ts
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = posts.get(Number(id))
  if (!post) return Response.json({ error: '不存在' }, { status: 404 })
  return Response.json(post)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  posts.delete(Number(id))
  return new Response(null, { status: 204 })
}
```

---

## 常见问题

### Q1：Route Handlers 和 Server Actions 选哪个？

**表单提交用 Server Actions，外部 API 调用用 Route Handlers：**

```tsx
// Server Actions — 前端表单
'use server'
export async function createPost(formData: FormData) { }

// Route Handlers — 外部 API
export async function POST(req: NextRequest) { }
```

### Q2：如何获取请求体？

```tsx
// JSON 请求体
const body = await req.json()

// FormData
const formData = await req.formData()

// 文本
const text = await req.text()
```

### Q3：如何设置响应头？

```tsx
return Response.json({ data }, {
  headers: { 'X-Custom-Header': 'value' },
  status: 201
})
```

---

## 学习资源

- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) ⭐ 官方权威
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
