# Next.js API 开发 ⭐

> Route Handlers、Server Actions

---

## L1 理解层

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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const page = searchParams.get('page') || '1'
  return Response.json({ users: [], page })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  return Response.json({ id: Date.now(), ...body }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  return Response.json({ deleted: id })
}
```

---

## 学习资源

- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) ⭐ 官方权威
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
