# Vue 路由管理 ⭐⭐

> 从"怎么在不刷新页面的情况下切换内容"出发，理解 Vue Router

---

## 学习目标

学完本节，你能：
- 理解 SPA（单页应用）的路由原理
- 用 Vue Router 配置路由
- 处理动态路由和查询参数
- 实现路由守卫（权限控制）

---

## 生活化比喻

**Vue Router 就像"大楼的楼层导航系统"**：

```
传统网页 = 去不同的楼：
┌─────────────────────────────┐
│  去 A 楼 → 刷新 → 重新加载  │
│  去 B 楼 → 刷新 → 重新加载  │
│  每次都要从头开始           │
└─────────────────────────────┘

SPA 路由 = 同一栋楼的不同房间：
┌─────────────────────────────┐
│  去 101 室 → 只换房间内容   │
│  去 202 室 → 只换房间内容   │
│  大厅（导航栏）保持不变     │
└─────────────────────────────┘
```

---

## 第一步：看看问题

在传统的 HTML 网站里，点击链接会刷新整个页面：

```html
<!-- 传统方式：点击后会刷新页面，重新加载所有资源 -->
<a href="/about">关于</a>
```

**发现问题了吗？**

- 刷新页面很慢，用户体验差
- 页面状态丢失（比如填了一半的表单）
- 每次都要重新请求 CSS、JS、图片

**我们需要一种方式：只切换内容，不刷新页面。**

---

## 第二步：Vue Router 怎么解决？

Vue Router 的核心原理是**拦截点击事件，阻止默认刷新，用 Vue 组件替换页面内容**。

安装：

```bash
npm install vue-router
```

### 最简单的路由

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
```

---

## 第三步：试试基础路由

### 配置入口

在 `main.js` 中使用 router：

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
```

### 使用路由

```vue
<!-- App.vue -->
<template>
    <nav>
        <!-- router-link 不会刷新页面 -->
        <router-link to="/">首页</router-link>
        <router-link to="/about">关于</router-link>
    </nav>

    <!-- router-view 是组件渲染的位置 -->
    <router-view />
</template>
```

**注意：** 用 `<router-link>` 代替 `<a>`。`<router-link>` 不会刷新页面，而是通过 JS 切换组件。

---

### 动手试试

创建一个新项目：

```vue
<!-- views/Home.vue -->
<template>
    <h1>Home Page</h1>
</template>

<!-- views/About.vue -->
<template>
    <h1>About Page</h1>
</template>
```

配置路由后访问 `/` 和 `/about`，观察页面内容切换且不刷新。

---

## 第四步：动态路由和查询参数

### 路径参数（`:id`）

URL 里带动态值，比如 `/users/123`。

```javascript
// router/index.js
const routes = [
    { path: '/users/:id', component: UserDetail }
];
```

在组件里获取：

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;  // '123'
</script>
```

### 查询参数（`?key=value`）

URL 后面的 `?` 部分，比如 `/search?q=vue`。

```vue
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const q = route.query.q;  // 'vue'
</script>
```

---

## 第五步：编程式导航

有时候你需要根据条件跳转，而不是点击链接。比如登录成功后跳转。

用 `useRouter`：

```vue
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogin = () => {
    // 登录逻辑...
    router.push('/dashboard');  // 跳转到仪表盘
};
</script>
```

**`router.push` vs `<router-link>`：**
- `<router-link>` 用于点击跳转。
- `router.push` 用于逻辑跳转（如表单提交后）。

---

## 第六步：路由守卫 — 权限控制

有些页面只有登录用户才能访问。

```javascript
// router/index.js
router.beforeEach((to, from) => {
    const token = localStorage.getItem('token');

    // 需要登录的页面
    if (to.meta.requiresAuth && !token) {
        return { name: 'Login' };  // 重定向到登录页
    }
});
```

在路由配置里加 `meta`：

```javascript
{
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
}
```

---

## 第七步：嵌套路由 — 布局共享

很多页面有相同的侧边栏或头部。不用每个页面都写一遍，用**嵌套路由**。

```javascript
const routes = [
    {
        path: '/dashboard',
        component: DashboardLayout,
        children: [
            { path: 'overview', component: Overview },
            { path: 'settings', component: Settings }
        ]
    }
];
```

`DashboardLayout.vue`：

```vue
<template>
    <div>
        <nav>
            <router-link to="/dashboard/overview">概览</router-link>
            <router-link to="/dashboard/settings">设置</router-link>
        </nav>
        <!-- 子路由渲染的位置 -->
        <router-view />
    </div>
</template>
```

访问 `/dashboard/overview` 时：
- `DashboardLayout` 渲染
- `router-view` 的位置渲染 `Overview`

---

## 总结：速查表

| 组件/API | 用途 | 示例 |
|-----------|------|------|
| `createRouter` | 创建路由器 | `createRouter({ history, routes })` |
| `<router-link>` | 导航链接（不刷新） | `<router-link to="/about">` |
| `<router-view>` | 路由渲染位 | `<router-view />` |
| `useRoute` | 获取路由信息 | `route.params.id` |
| `useRouter` | 编程式导航 | `router.push('/dashboard')` |
| `beforeEach` | 全局守卫 | `router.beforeEach(...)` |

**记住：**
- 用 `<router-link>` 代替 `<a>`
- 路径参数用 `route.params`，查询参数用 `route.query`
- 权限控制用 `beforeEach` 守卫

---

## 实践练习

```javascript
// 练习：实现一个简单的博客路由系统
// 1. 首页 (/) 显示文章列表
// 2. 文章详情 (/posts/:id) 显示文章内容
// 3. 404 页面 (*) 显示未找到
// 4. 点击文章标题跳转到详情

const routes = [
    { path: '/', component: Home },
    { path: '/posts/:id', component: PostDetail },
    { path: '/:pathMatch(.*)*', component: NotFound }
];
```

---

## 常见问题

### Q：`<router-link>` 和 `<a>` 有什么区别？

**`<router-link>` 不刷新页面，只切换组件；`<a>` 会刷新整个页面。**

### Q：`router.push` 和 `router.replace` 有什么区别？

**`push` 会保留历史记录（可后退），`replace` 替换当前页（不留历史）。**

### Q：怎么处理 404 页面？

**用通配符路由匹配所有未定义的路径：**

```javascript
{ path: '/:pathMatch(.*)*', component: NotFound }
```

---

## 学习资源

- [Vue Router 官方文档](https://router.vuejs.org/zh/) ⭐ 官方文档
- [Vue Router 教程](https://router.vuejs.org/zh/guide/)
