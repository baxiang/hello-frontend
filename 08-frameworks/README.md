# 前端框架

> 掌握 React 和 Vue 框架开发

## 模块概览

| 章节 | 主题 | 内容 |
|------|------|------|
| [01-React 基础](./01-React 基础/) | React 基础 | React 组件、Hooks 详解 |
| [02-Vue 基础](./02-Vue 基础/) | Vue 基础 | Vue 组件、Composition API |
| [03-路由管理](./03-路由管理/) | 路由管理 | React Router、Vue Router |
| [04-状态管理](./04-状态管理/) | 状态管理 | Redux Toolkit、Pinia |

## 学习目标

- 理解现代前端框架的核心概念
- 掌握 React 基础用法
- 掌握 Vue 基础用法
- 了解状态管理和路由

## 学习路径

```
第一阶段：React 基础（3-5 天）
01-React 基础/ → 掌握组件和 Hooks

第二阶段：Vue 基础（3-5 天）
02-Vue 基础/ → 掌握 Composition API

第三阶段：路由管理（2-3 天）
03-路由管理/ → React Router 和 Vue Router

第四阶段：状态管理（2-3 天）
04-状态管理/ → Redux 和 Pinia
```

## React vs Vue 对比

| 特性 | React | Vue |
|------|-------|-----|
| 语法 | JSX | 模板语法 |
| 状态管理 | Redux/Zustand | Pinia/Vuex |
| 路由 | React Router | Vue Router |
| 学习曲线 | 较陡 | 平缓 |
| 灵活性 | 高 | 中等 |

## 如何选择框架

- **React**: 大型应用、需要高度定制、团队有 React 经验
- **Vue**: 中小型应用、快速开发、团队初学者较多

## 实践示例

### React 完整示例

```jsx
// App.js
import React, { useState, useEffect } from 'react';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>加载中...</div>;

    return (
        <div>
            <h1>用户列表</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
```

### Vue 完整示例

```vue
<template>
    <div>
        <h1>用户列表</h1>

        <div v-if="loading">加载中...</div>
        <ul v-else>
            <li v-for="user in users" :key="user.id">
                {{ user.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(true)

const fetchUsers = async () => {
    try {
        const res = await fetch('/api/users')
        const data = await res.json()
        users.value = data
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
}

onMounted(fetchUsers)
</script>
```

## 学习资源

- [React 官方文档](https://react.dev/)
- [Vue 官方文档](https://cn.vuejs.org/)
- [React Router](https://reactrouter.com/)
- [Vue Router](https://router.vuejs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Pinia](https://pinia.vuejs.org/)

---

**上一模块：** [← 07-engineering](../07-engineering/)
**返回首页：** [→ README](../README.md)