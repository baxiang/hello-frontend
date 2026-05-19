# Next.js 中间件与国际化 ⭐⭐

> Middleware、i18n、图片优化

---

## L1 理解层：会用

### 中间件

**最简示例（1-3行）：**

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  return NextResponse.next()
}
export const config = { matcher: ['/api/:path*', '/dashboard/:path*'] }
```

**详细示例：**

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')

  // 重定向未登录用户
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 添加自定义头
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'value')
  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}
```

---

### 国际化（i18n）

```typescript
// next.config.ts
export default defineConfig({
  i18n: {
    locales: ['en', 'zh', 'ja'],
    defaultLocale: 'zh',
    localeDetection: true
  }
})

// 使用
import { useLocale } from 'next-intl'
const locale = useLocale()  // 'zh', 'en', 'ja'

// 翻译
// messages/zh.json: { "welcome": "欢迎" }
// messages/en.json: { "welcome": "Welcome" }
<t key="welcome" />  // 根据 locale 自动翻译
```

---

## L2 实践层：用好

### 中间件用途

| 用途 | 实现方式 |
|------|---------|
| 认证检查 | 检查 Cookie/Token |
| A/B 测试 | 设置 Cookie 分流 |
| 地域重定向 | 根据 `x-vercel-ip-country` |
| 速率限制 | Redis 计数 |
| 日志记录 | 记录请求信息 |

### 图片优化

```tsx
import Image from 'next/image'

// 基础用法
<Image
  src="/photo.jpg"
  width={800}
  height={600}
  alt="照片"
  priority  // 首屏图片优先加载
/>

// 响应式
<Image
  src="/photo.jpg"
  fill
  sizes="(max-width: 768px) 100vw, 800px"
  alt="响应式图片"
/>

// 远程图片
// next.config.ts
export default defineConfig({
  images: {
    remotePatterns: [{ hostname: 'cdn.example.com' }]
  }
})
```

---

## 学习资源

- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) ⭐ 官方权威
- [next-intl](https://next-intl-docs.vercel.app/)
