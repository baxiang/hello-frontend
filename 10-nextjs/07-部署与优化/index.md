# Next.js 部署与优化 ⭐⭐

> 从"怎么让别人访问我的应用"的疑问出发，理解部署和性能优化

---

## 学习目标

学完本节，你能：
- 掌握 Next.js 项目的部署流程
- 学会使用 Vercel 一键部署
- 了解图片、字体、SEO 优化方法
- 能够分析并优化应用性能

---

## 生活化比喻

**部署和优化就像"开店营业"**：

```
npm run build = 装修准备：
┌─────────────────────────────┐
│  把开发中的店铺装修成正式营业状态 │
│  压缩文件、优化代码         │
└─────────────────────────────┘

Vercel = 旺铺租赁：
┌─────────────────────────────┐
│  拎包入住，什么都不用管     │
│  自动 HTTPS、CDN、自动部署  │
│  和 Next.js 最配            │
└─────────────────────────────┘

Image 优化 = 图片压缩：
┌─────────────────────────────┐
│  大图片自动压缩，按需加载   │
│  WebP 格式、懒加载、占位图  │
└─────────────────────────────┘

字体优化 = 招牌字体：
┌─────────────────────────────┐
│  字体文件提前加载，不闪烁   │
│  next/font → 构建时嵌入，零运行时开销 │
└─────────────────────────────┘

SEO = 店铺招牌和宣传：
┌─────────────────────────────┐
│  title、description、Open Graph │
│  让搜索引擎正确展示你的网站 │
└─────────────────────────────┘
```

---

## 第一步：看看问题

你的 Next.js 应用在本地开发好了，现在想让其他人也能访问。

**发现问题了吗？**

- 本地 `npm run dev` 只能自己访问
- 需要构建生产版本
- 图片太大，加载慢
- 字体加载闪烁，体验差
- 搜索引擎抓取不到内容

---

## 第二步：Vercel 怎么解决？

Vercel 是 Next.js 官方部署平台，**零配置部署**。

### 部署流程

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel          # 预览部署
vercel --prod   # 生产部署
```

部署后，Vercel 会自动：
- 分配 HTTPS 域名
- 配置 CDN
- 每次 git push 自动部署

---

## 第三步：构建与运行

### 本地构建测试

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

构建输出会显示每个路由的渲染模式：
- `○` (Static) — 静态生成
- `λ` (Server) — 服务端渲染
- `●` (SSG) — 静态生成（带路径）

---

## 第四步：图片优化

传统 `<img>` 标签的问题：
- 大图片加载慢
- 不支持 WebP/AVIF 格式
- 没有懒加载

Next.js 的 `<Image>` 组件自动解决这些问题：

```tsx
import Image from 'next/image';

export default function Page() {
    return (
        <Image
            src="/photo.jpg"
            width={800}
            height={600}
            alt="照片"
            priority  // 首屏图片优先加载
        />
    );
}
```

**自动优化：**
- 压缩图片
- 转换为 WebP/AVIF 格式
- 懒加载（非首屏）
- 防止布局偏移

---

## 第五步：字体优化

传统方式加载字体会导致**闪烁**（FOIT/FOUT）：

```html
<!-- ❌ 不好：运行时加载，会闪烁 -->
<link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
```

用 `next/font`，字体在**构建时下载**，零闪烁：

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }) {
    return <html lang="zh" className={inter.className}><body>{children}</body></html>;
}
```

---

## 第六步：SEO — 元数据

Next.js 提供了强大的元数据 API。

### 静态元数据

```tsx
// app/layout.tsx
export const metadata = {
    title: '我的网站',
    description: '网站描述',
    openGraph: {
        title: '我的网站',
        description: '网站描述',
        images: ['/og-image.jpg']
    }
};
```

### 动态元数据

```tsx
// app/posts/[id]/page.tsx
export async function generateMetadata({ params }) {
    const post = await fetchPost(params.id);
    return {
        title: post.title,
        description: post.excerpt
    };
}
```

---

## 第七步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `Image 不显示` | 没配置 remotePatterns | 在 `next.config.js` 配置域名 |
| `字体不生效` | 没应用到 html/body | `className={font.className}` |
| `SEO 不生效` | 没导出 metadata | `export const metadata = { ... }` |
| `Vercel 部署失败` | 构建错误 | 本地运行 `npm run build` 检查 |

---

## 总结：速查表

| 概念 | 语法 | 示例 |
|------|------|------|
| Vercel 部署 | `vercel --prod` | 自动 HTTPS、CDN |
| 图片优化 | `<Image />` | `width={800} height={600}` |
| 字体优化 | `next/font/google` | `const inter = Inter({ subsets: ['latin'] })` |
| 静态元数据 | `export const metadata` | `{ title: 'My Site' }` |
| 动态元数据 | `generateMetadata` | 根据数据生成 title |

**记住：**
- 用 `<Image>` 代替 `<img>`
- 用 `next/font` 代替外部字体链接
- 每个页面都配置 metadata

---

## 实践练习

```tsx
// 练习：实现完整的 SEO 优化
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: {
        default: '我的博客',
        template: '%s | 我的博客'
    },
    description: '前端开发技术博客',
    openGraph: {
        title: '我的博客',
        description: '前端开发技术博客',
        type: 'website',
        locale: 'zh_CN'
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="zh">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
```

---

## 常见问题

### Q：Vercel 和 Netlify 选哪个？

**Next.js 项目首选 Vercel（官方支持、功能最全），已有 Netlify 项目可继续用。**

### Q：如何部署到 Docker？

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Q：如何优化首屏加载速度？

**三个关键：图片优化、字体优化、代码分割。**

```tsx
// 首屏图片优先加载
<Image src="/hero.jpg" width={1200} height={600} alt="Hero" priority />

// 字体优化
const inter = Inter({ subsets: ['latin'], display: 'swap' });

// 路由自动代码分割（Next.js 默认）
// 每个 page.tsx 自动分割为独立的 chunk
```

---

## 学习资源

- [Next.js 部署](https://nextjs.org/docs/app/building-your-application/deploying) ⭐ 官方文档
- [Vercel](https://vercel.com/)
- [Next.js 图片优化](https://nextjs.org/docs/app/building-your-application/optimizing/images)
