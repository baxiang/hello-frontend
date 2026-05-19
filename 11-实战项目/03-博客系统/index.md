# 博客系统项目 ⭐⭐⭐

> Next.js + MDX + 数据库

---

## 项目目标

- 验证 Next.js App Router 掌握
- 验证全栈开发能力
- 验证性能优化和 SEO 实践

---

## 项目结构

```
blog/
├── app/
│   ├── layout.tsx           ← 根布局
│   ├── page.tsx             ← 首页
│   ├── posts/
│   │   ├── page.tsx         ← 文章列表
│   │   └── [slug]/
│   │       └── page.tsx     ← 文章详情
│   ├── admin/
│   │   └── page.tsx         ← 管理后台
│   └── api/
│       └── posts/
│           ├── route.ts     ← 文章 API
│           └── [id]/
│               └── route.ts
├── components/
│   ├── PostCard.tsx
│   ├── Header.tsx
│   └── MDXComponents.tsx
├── lib/
│   ├── db.ts                ← 数据库连接
│   └── mdx.ts               ← MDX 解析
├── content/                 ← MDX 文章
│   └── posts/
│       ├── hello-world.mdx
│       └── nextjs-guide.mdx
├── prisma/
│   └── schema.prisma        ← 数据库模型
└── next.config.ts
```

---

## L3 实现：全栈博客

### 数据库模型

```prisma
// prisma/schema.prisma
model Post {
    id          String   @id @default(cuid())
    title       String
    slug        String   @unique
    content     String
    excerpt     String
    published   Boolean  @default(false)
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
}
```

---

### 数据库连接

```typescript
// lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

---

### API 路由

```typescript
// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
    const posts = await db.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        select: { id: true, title: true, slug: true, excerpt: true, createdAt: true }
    })
    return NextResponse.json(posts)
}

export async function POST(request: Request) {
    const body = await request.json()
    const post = await db.post.create({
        data: {
            title: body.title,
            slug: body.slug,
            content: body.content,
            excerpt: body.excerpt,
            published: body.published ?? false
        }
    })
    return NextResponse.json(post, { status: 201 })
}
```

---

### 首页（SSG）

```typescript
// app/page.tsx
import { db } from '@/lib/db'
import PostCard from '@/components/PostCard'

export const revalidate = 3600  // ISR：每小时重新验证

export default async function Home() {
    const posts = await db.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        take: 6
    })

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">最新文章</h1>
            <div className="grid gap-6 md:grid-cols-2">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </main>
    )
}

export const metadata = {
    title: '我的技术博客',
    description: '分享前端开发、React、Vue、Node.js 等技术文章'
}
```

---

### 文章列表

```typescript
// app/posts/page.tsx
import { db } from '@/lib/db'
import PostCard from '@/components/PostCard'

export default async function PostsPage() {
    const posts = await db.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">所有文章</h1>
            <div className="space-y-6">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </main>
    )
}
```

---

### 文章详情（SSR）

```typescript
// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'
import MDXContent from '@/components/MDXContent'

// 生成静态参数
export async function generateStaticParams() {
    const posts = await db.post.findMany({ select: { slug: true } })
    return posts.map(post => ({ slug: post.slug }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await db.post.findUnique({ where: { slug } })

    if (!post) notFound()

    return (
        <article className="max-w-4xl mx-auto px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <time className="text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                </time>
            </header>
            <MDXContent content={post.content} />
        </article>
    )
}

// 生成元数据
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await db.post.findUnique({ where: { slug } })
    return {
        title: post?.title,
        description: post?.excerpt
    }
}
```

---

### MDX 组件

```typescript
// components/MDXContent.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'

const components = {
    h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
    h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
    p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
    code: (props: any) => <code className="bg-gray-100 px-1 py-0.5 rounded" {...props} />,
    pre: (props: any) => <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4" {...props} />,
    img: (props: any) => <img className="rounded-lg my-4" {...props} />
}

export default function MDXContent({ content }: { content: string }) {
    return <MDXRemote source={content} components={components} />
}
```

---

### PostCard 组件

```typescript
// components/PostCard.tsx
import Link from 'next/link'

interface PostCardProps {
    post: {
        id: string
        title: string
        slug: string
        excerpt: string
        createdAt: Date
    }
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <Link href={`/posts/${post.slug}`} className="block">
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600">
                    {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                <time className="text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString('zh-CN')}
                </time>
            </Link>
        </article>
    )
}
```

---

## 性能优化

### 图片优化

```typescript
import Image from 'next/image'

// 自动优化、懒加载、WebP 转换
<Image
    src="/cover.jpg"
    width={1200}
    height={630}
    alt="文章封面"
    priority  // 首屏图片
/>
```

### 字体优化

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="zh">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
```

### 缓存策略

```typescript
// ISR - 增量静态再生
export const revalidate = 3600  // 1 小时后重新生成

// 或完全静态
export const dynamic = 'force-static'
```

---

## 部署

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产部署
vercel --prod
```

### 环境变量

```env
# .env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_URL="https://myblog.vercel.app"
```

---

## 能力检验清单

- [ ] 能使用 App Router 构建完整应用
- [ ] 能实现 API 路由和数据库操作
- [ ] 能实现 SSR/SSG/ISR 混合渲染
- [ ] 能实现 SEO 优化（元数据、结构化数据）
- [ ] 能使用 MDX 编写文章内容
- [ ] 能通过 Lighthouse 90+ 分

---

## 扩展挑战

1. **添加评论系统（Giscus/Disqus）**
2. **添加搜索功能（Algolia）**
3. **添加 RSS 订阅**
4. **添加暗色模式切换**
