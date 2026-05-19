# Nuxt.js 快速入门 ⭐

> Nuxt.js 是什么、安装、项目结构

---

## 学习目标

- 理解 Nuxt.js 是什么以及为什么需要它
- 掌握 Nuxt.js 的项目结构
- 学会创建第一个 Nuxt.js 页面

---

## 生活化比喻

**Nuxt.js 就像"Vue 的精装修房子"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  精装修的房子                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│    Vue = 毛坯房                                      │
│    ─────────────                                     │
│    有了基本框架，但需自己配置路由、构建、SEO         │
│    灵活但工作量大                                    │
│                                                      │
│    Nuxt.js = 精装修                                  │
│    ─────────────                                     │
│    路由、构建优化、SSR、SEO 全部配好                 │
│    拎包入住，需要定制也能改                         │
│                                                      │
│    pages/ = 房间布局                                 │
│    ─────────────                                     │
│    文件夹结构就是路由结构                           │
│    pages/index.vue = 首页，pages/about.vue = 关于页 │
│                                                      │
│    auto-imports = 自动工具                           │
│    ─────────────                                     │
│    ref、computed、useFetch 自动导入                 │
│    不用手动 import                                   │
│                                                      │
│    Server Routes = 后端 API                          │
│    ─────────────                                     │
│    server/api/ 目录下直接写 API                      │
│    全栈开发，一个框架搞定                           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 创建项目

**最简示例（1-3行）：**

```bash
npx nuxi@latest init my-app
cd my-app && npm install && npm run dev
```

**详细示例：**

```bash
# 创建项目
npx nuxi@latest init my-app

# 安装依赖
cd my-app
npm install

# 启动开发服务器
npm run dev  # http://localhost:3000
```

**项目结构：**

```
my-app/
├── pages/
│   ├── index.vue       ← 首页（/）
│   └── about.vue       ← 关于页（/about）
├── components/         ← 自动导入的组件
├── composables/        ← 自动导入的组合式函数
├── server/
│   └── api/            ← API 路由
├── public/             ← 静态文件
├── app.vue             ← 根组件
├── nuxt.config.ts      ← Nuxt 配置
└── package.json
```

---

### 创建页面

**最简示例：**

```vue
<!-- pages/index.vue -->
<template>
  <h1>Hello Nuxt.js!</h1>
</template>
```

**详细示例：**

```vue
<!-- app.vue — 根组件 -->
<template>
  <div>
    <NuxtPage />
  </div>
</template>

<!-- pages/index.vue — 首页 -->
<template>
  <main>
    <h1>欢迎来到 Nuxt.js</h1>
    <p>这是使用 Nuxt 3 构建的应用</p>
    <NuxtLink to="/about">关于</NuxtLink>
  </main>
</template>

<!-- pages/about.vue — 关于页 -->
<template>
  <h1>关于我们</h1>
  <NuxtLink to="/">返回首页</NuxtLink>
</template>
```

---

## L2 实践层：用好

### 渲染模式对比

| 模式 | 说明 | 适用场景 |
|------|------|---------|
| **CSR** | 客户端渲染 | 后台管理、内网应用 |
| **SSR** | 服务端渲染 | 电商、新闻、需要 SEO |
| **SSG** | 静态生成 | 博客、文档、营销页面 |
| **混合** | 按页面选择模式 | 不同页面不同需求 |

### 自动导入

```vue
<!-- Nuxt 自动导入，无需手动 import -->
<script setup>
// ref、computed、watch 自动导入
const count = ref(0)
const doubled = computed(() => count.value * 2)

// useFetch、useAsyncData 自动导入
const { data } = await useFetch('/api/posts')

// 组件自动导入（components/ 目录下）
// <MyComponent /> 自动识别
</script>
```

### 反模式

```vue
<!-- ❌ 错误：在 setup 中使用 window/document（SSR 会报错） -->
<script setup>
const width = window.innerWidth  // ❌ SSR 时 window 不存在
</script>

<!-- ✅ 正确：在 onMounted 中使用 -->
<script setup>
const width = ref(0)
onMounted(() => {
  width.value = window.innerWidth
})
</script>
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 博客/文档站 | SSG (`npm run generate`) | 构建一次，CDN 分发 |
| 电商/新闻 | SSR（默认） | 实时数据，SEO 友好 |
| 后台管理 | CSR (`ssr: false`) | 不需要 SEO，交互复杂 |
| 内容经常更新 | ISR | 定时重新生成 |

---

## L3 专家层：深入

### 渲染流程

```
Nuxt.js 请求处理流程：

客户端请求 → Nuxt 服务器
    ↓
检查是否有缓存的静态页面
    ↓
有缓存 → 直接返回（SSG）
    ↓
无缓存 → 服务端渲染（SSR）
    ↓
返回 HTML + 客户端 JS
    ↓
客户端水合（Hydration）→ 变为可交互
```

### 知识关联

```
Nuxt.js 核心概念关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  文件路由   │────→│  自动导入   │────→│  数据获取   │
│  pages/     │     │  组件/      │     │  useFetch/  │
│  嵌套路由   │     │  composables│     │  useAsyncData│
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **文件路由** | 基于文件系统的自动路由 | `pages/about.vue` → `/about` |
| **自动导入** | Nuxt 自动导入常用 API 和组件 | `ref`、`useFetch` 无需 import |
| **SSR** | 服务端渲染，每次请求生成 HTML | 适合动态内容 |
| **SSG** | 静态生成，构建时生成 HTML | 适合静态内容 |
| **Hydration** | 客户端接管服务端 HTML | 自动完成 |
| **NuxtLink** | Nuxt 的路由链接组件 | `<NuxtLink to="/about">` |

---

## 实践练习

```vue
<!-- 练习：创建带导航的多页应用 -->

<!-- app.vue -->
<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">首页</NuxtLink>
        <NuxtLink to="/posts">文章</NuxtLink>
        <NuxtLink to="/about">关于</NuxtLink>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
    <footer>&copy; 2026 My Site</footer>
  </div>
</template>

<!-- pages/posts.vue -->
<template>
  <div>
    <h1>文章列表</h1>
    <ul>
      <li><NuxtLink to="/posts/1">文章一</NuxtLink></li>
      <li><NuxtLink to="/posts/2">文章二</NuxtLink></li>
    </ul>
  </div>
</template>
```

---

## 常见问题

### Q1：Nuxt.js 和纯 Vue 有什么区别？

**Nuxt.js 在 Vue 基础上提供了：文件路由、SSR/SSG、自动导入、API 路由、图片优化等开箱即用的功能。**

### Q2：什么时候用 SSR，什么时候用 SSG？

**需要实时数据用 SSR，内容不经常变用 SSG。Nuxt 支持混合模式，不同页面可选不同渲染方式。**

### Q3：自动导入会影响性能吗？

**不会。Nuxt 在构建时分析导入，只会打包实际使用的代码。**

---

## 学习资源

- [Nuxt.js 官方文档](https://nuxt.com/docs) ⭐ 官方权威
- [Nuxt 学习教程](https://nuxt.com/docs/getting-started/introduction)
