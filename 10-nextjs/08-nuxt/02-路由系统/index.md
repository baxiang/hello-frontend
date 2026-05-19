# Nuxt.js 路由系统 ⭐⭐

> 文件路由、动态路由、导航

---

## 学习目标

- 掌握 Nuxt.js 的文件路由规则
- 学会动态路由和嵌套路由
- 理解导航和路由守卫

---

## L1 理解层：会用

### 文件路由

**最简示例（1-3行）：**

```
pages/index.vue         → /
pages/about.vue         → /about
pages/posts/index.vue   → /posts
```

**详细示例：**

```vue
<!-- pages/posts/[id].vue — 动态路由 -->
<script setup>
const route = useRoute()
const id = route.params.id
const { data: post } = await useFetch(`/api/posts/${id}`)
</script>

<template>
  <article>
    <h1>{{ post.title }}</h1>
    <p>{{ post.content }}</p>
  </article>
</template>

<!-- pages/posts/[id]/edit.vue — 嵌套路由 -->
<script setup>
const route = useRoute()
const id = route.params.id
</script>

<template>
  <div>
    <h1>编辑文章 {{ id }}</h1>
    <form>...</form>
  </div>
</template>
```

---

### 特殊路由

| 文件 | 用途 |
|------|------|
| `pages/[...slug].vue` | 捕获所有路由 |
| `pages/[id].vue` | 动态路由 |
| `pages/index.vue` | 首页 |
| `error.vue` | 全局错误页面 |

**详细示例：**

```vue
<!-- pages/[...slug].vue — 捕获所有路由 -->
<script setup>
const route = useRoute()
const slug = route.params.slug  // ['a', 'b', 'c']
</script>

<!-- error.vue — 全局错误页面 -->
<script setup>
const error = useError()
</script>

<template>
  <div>
    <h1>{{ error.statusCode }} 错误</h1>
    <p>{{ error.message }}</p>
    <NuxtLink to="/">返回首页</NuxtLink>
  </div>
</template>
```

---

## L2 实践层：用好

### 导航方法

| 方法 | 用途 | 示例 |
|------|------|------|
| `<NuxtLink>` | 声明式导航 | `<NuxtLink to="/about">` |
| `navigateTo()` | 编程式导航 | `navigateTo('/about')` |
| `useRoute()` | 获取路由信息 | `route.params.id` |

```vue
<script setup>
// 编程式导航
function goToPost(id) {
  navigateTo(`/posts/${id}`)
}

// 获取路由信息
const route = useRoute()
const query = route.query  // 查询参数
const params = route.params  // 路由参数
</script>
```

### 路由守卫

```vue
<!-- middleware/auth.ts -->
export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')
  if (!token.value) {
    return navigateTo('/login')
  }
})

<!-- 使用中间件 -->
<!-- pages/dashboard.vue -->
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```

### 反模式

```vue
<!-- ❌ 错误：用 a 标签导航（会全页刷新） -->
<a href="/about">关于</a>

<!-- ✅ 正确：用 NuxtLink（客户端导航） -->
<NuxtLink to="/about">关于</NuxtLink>
```

---

## 学习资源

- [Nuxt 路由文档](https://nuxt.com/docs/guide/directory-structure/pages) ⭐ 官方权威
