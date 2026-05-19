# Nuxt.js 服务端渲染 ⭐⭐

> SSR、SSG、混合渲染

---

## L1 理解层

**最简示例（1-3行）：**

```vue
<!-- 默认 SSR -->
<script setup>
const { data } = await useFetch('/api/posts')
</script>

<!-- 客户端渲染 -->
<script setup>
definePageMeta({ ssr: false })
</script>
```

**详细示例：**

```vue
<!-- pages/index.vue — SSR（默认） -->
<script setup>
const { data } = await useFetch('/api/posts')
</script>
<template>
  <ul>
    <li v-for="post in data" :key="post.id">{{ post.title }}</li>
  </ul>
</template>

<!-- pages/dashboard.vue — CSR -->
<script setup>
definePageMeta({ ssr: false })
const { data } = await useFetch('/api/dashboard')
</script>

<!-- nuxt.config.ts — 全局配置 -->
export default defineNuxtConfig({
  ssr: true,  // 默认 SSR
  routeRules: {
    '/blog/**': { prerender: true },  // SSG
    '/admin/**': { ssr: false },      // CSR
    '/api/**': { cors: true }         // CORS
  }
})
```

---

## L2 实践层

### 渲染模式对比

| 模式 | 配置 | 适用场景 |
|------|------|---------|
| SSR | 默认 | 动态内容，需要 SEO |
| SSG | `prerender: true` | 静态内容，博客/文档 |
| CSR | `ssr: false` | 后台管理，内网应用 |
| 混合 | `routeRules` | 不同页面不同模式 |

### SEO 优化

```vue
<script setup>
useSeoMeta({
  title: '我的网站',
  description: '网站描述',
  ogTitle: '我的网站',
  ogDescription: '网站描述',
  ogImage: '/og-image.jpg'
})
</script>
```

---

## 学习资源

- [Nuxt 渲染模式](https://nuxt.com/docs/guide/concepts/rendering) ⭐ 官方权威
