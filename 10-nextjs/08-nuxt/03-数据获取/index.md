# Nuxt.js 数据获取 ⭐⭐

> useFetch、useAsyncData、缓存

---

## L1 理解层

**最简示例（1-3行）：**

```vue
<script setup>
const { data } = await useFetch('/api/posts')
</script>
```

**详细示例：**

```vue
<!-- 基础用法 -->
<script setup>
const { data, pending, error, refresh } = await useFetch('/api/posts')
</script>

<template>
  <div v-if="pending">加载中...</div>
  <div v-else-if="error">出错了：{{ error.message }}</div>
  <ul v-else>
    <li v-for="post in data" :key="post.id">{{ post.title }}</li>
  </ul>
  <button @click="refresh">刷新</button>
</template>

<!-- 带参数 -->
<script setup>
const { data } = await useFetch('/api/posts', {
  query: { page: 1, limit: 10 },
  method: 'POST',
  body: { filter: 'published' }
})
</script>

<!-- useAsyncData（更灵活） -->
<script setup>
const { data } = await useAsyncData('posts', () =>
  $fetch('/api/posts')
)
</script>
```

---

## L2 实践层

### 数据获取策略

| 方法 | 用途 | 示例 |
|------|------|------|
| `useFetch` | 简单 HTTP 请求 | `useFetch('/api/posts')` |
| `useAsyncData` | 任意异步操作 | `useAsyncData('key', fn)` |
| `$fetch` | 客户端/服务端通用 | `await $fetch('/api/data')` |

### 服务端 API

```typescript
// server/api/posts.get.ts
export default defineEventHandler(async (event) => {
  const posts = await db.post.findMany()
  return posts
})

// server/api/posts.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const post = await db.post.create({ data: body })
  return post
})
```

### 缓存与刷新

```vue
<script setup>
// 默认缓存
const { data } = await useFetch('/api/posts')

// 不缓存
const { data } = await useFetch('/api/posts', {
  getCachedData: () => undefined
})

// 定时刷新
const { data } = await useFetch('/api/posts', {
  // 60 秒后重新获取
  onRequest: async ({ options }) => {
    setTimeout(() => refresh(), 60000)
  }
})
</script>
```

---

## 学习资源

- [Nuxt 数据获取](https://nuxt.com/docs/guide/directory-structure/server) ⭐ 官方权威
