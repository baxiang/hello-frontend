# Nuxt.js 部署与优化 ⭐⭐

> 部署、性能优化、SEO

---

## L1 理解层

**最简示例：**

```bash
# 构建
npm run build

# 预览生产构建
npm run preview

# 部署到 Vercel
npx vercel
```

---

## L2 实践层

### 部署选项

| 平台 | 说明 | 适合 |
|------|------|------|
| **Vercel** | Nuxt 官方推荐 | 首选 |
| **Netlify** | 支持 Nuxt | 已有 Netlify 项目 |
| **Node.js** | 自托管 | 完全控制 |
| **Docker** | 容器化部署 | 生产环境 |

### 性能优化

```vue
<!-- 图片优化 -->
<NuxtImg src="/photo.jpg" width="800" height="600" alt="照片" />

<!-- 字体优化 -->
<!-- nuxt.config.ts -->
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
      ]
    }
  }
})

<!-- 组件懒加载 -->
<script setup>
const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))
</script>
```

### SEO 优化

```vue
<script setup>
useSeoMeta({
  title: '我的网站',
  description: '网站描述',
  ogTitle: '我的网站',
  ogDescription: '网站描述',
  twitterCard: 'summary_large_image'
})
</script>
```

---

## 学习资源

- [Nuxt 部署](https://nuxt.com/docs/getting-started/deployment) ⭐ 官方权威
