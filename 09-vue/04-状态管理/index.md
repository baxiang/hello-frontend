# Vue 状态管理 ⭐⭐

> 从"传参传了 5 层"的烦恼出发，理解 Pinia

---

## 学习目标

学完本节，你能：
- 理解为什么需要全局状态管理
- 掌握 Pinia 的核心概念（state、getters、actions）
- 在组件中使用 Store
- 理解 Pinia 与 Vuex 的区别

---

## 生活化比喻

**Pinia 就像"公司的共享信息中心"**：

```
局部状态 (ref) = 个人便签：
┌─────────────────────────────┐
│  自己记自己的               │
│  不跟别人共享               │
│  const count = ref(0)       │
└─────────────────────────────┘

Pinia Store = 公司公告板：
┌─────────────────────────────┐
│  信息贴在公共区域           │
│  所有组件都能看到           │
│  更新公告板，所有人自动看到新信息 │
└─────────────────────────────┘
```

---

## 第一步：看看问题

假设你有这样的组件结构：

```
App (用户信息)
 └─ Header (显示用户名)
     └─ UserProfile (修改用户名)
```

用 `ref` 怎么做？

```vue
<!-- App.vue -->
<script setup>
import { ref } from 'vue';
const user = ref({ name: '张三' });
</script>
<template>
    <Header :user="user" @update="user = $event" />
</template>

<!-- Header.vue -->
<script setup>
defineProps(['user']);
const emit = defineEmits(['update']);
</script>
<template>
    <UserProfile :user="user" @update="emit('update', $event)" />
</template>

<!-- UserProfile.vue -->
<script setup>
const props = defineProps(['user']);
const emit = defineEmits(['update']);
</script>
<template>
    <button @click="emit('update', { name: '李四' })">改名</button>
</template>
```

**发现问题了吗？**

- `Header` 根本不需要 `user`，只是透传
- 如果层级更深，透传代码会非常难看
- 这就是**"Prop Drilling"（属性透传）**问题

**你需要一种方式：让深层组件直接获取状态，不用一层层传。**

---

## 第二步：Pinia 怎么解决？

Pinia 是 Vue 官方推荐的状态管理库。它像一个"全局数据中心"，所有组件都能直接读写。

安装：

```bash
npm install pinia
```

### 定义 Store

```javascript
// stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: { name: '张三' }
    }),
    actions: {
        updateName(newName) {
            this.user.name = newName;
        }
    }
});
```

### 使用 Store

```vue
<!-- UserProfile.vue -->
<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
</script>
<template>
    <p>用户名：{{ userStore.user.name }}</p>
    <button @click="userStore.updateName('李四')">改名</button>
</template>
```

现在 `UserProfile` 直接从 Store 获取数据，跳过了 `Header`。

---

## 第三步：试试 Pinia

### 配置入口

```javascript
// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
app.use(createPinia());
app.mount('#app');
```

### 完整的 Store

Pinia Store 有三个核心部分：

```javascript
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    // state：数据（就像组件的 ref/reactive）
    state: () => ({
        count: 0
    }),

    // getters：计算属性（就像 computed）
    getters: {
        double: (state) => state.count * 2,
        isEven: (state) => state.count % 2 === 0
    },

    // actions：方法（就像 methods，支持 async）
    actions: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
        async fetchCount() {
            const res = await fetch('/api/count');
            this.count = await res.json();
        }
    }
});
```

---

### 动手试试

创建一个 Store 并在组件中使用：

```vue
<!-- Counter.vue -->
<script setup>
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();
</script>
<template>
    <div>
        <p>计数：{{ counter.count }}</p>
        <p>双倍：{{ counter.double }}</p>
        <button @click="counter.increment">+1</button>
        <button @click="counter.decrement">-1</button>
    </div>
</template>
```

---

## 第四步：在组件里修改状态

有两种方式修改状态：

### 方式 1：直接修改

```vue
<script setup>
import { useCounterStore } from '@/stores/counter';
const counter = useCounterStore();
</script>
<template>
    <!-- 直接修改 state -->
    <button @click="counter.count++">+1</button>
</template>
```

### 方式 2：通过 Actions 修改

```vue
<template>
    <!-- 调用 action -->
    <button @click="counter.increment">+1</button>
</template>
```

**推荐：** 简单的状态变更可以直接修改，复杂的逻辑用 Actions。

---

## 第五步：Pinia vs Vuex — 为什么选 Pinia？

| 特性 | Pinia | Vuex |
|------|-------|------|
| Vue 官方推荐 | ✅ | ❌ 已不再维护 |
| TypeScript | ✅ 原生支持 | ⚠️ 需要额外配置 |
| 模块化 | 每个 Store 独立 | 单一 Store + modules |
| 体积 | 更小（1KB） | 较大 |
| DevTools | ✅ | ✅ |

**新项目一律用 Pinia。**

---

## 第六步：Store 之间的通信

有时候一个 Store 需要用到另一个 Store 的数据。

```javascript
import { defineStore } from 'pinia';
import { useUserStore } from './user';

export const useOrderStore = defineStore('order', {
    state: () => ({
        items: []
    }),
    actions: {
        checkout() {
            const userStore = useUserStore();
            console.log(`用户 ${userStore.user.name} 下单`);
            // 处理订单...
            this.items = [];
        }
    }
});
```

在 Action 里直接调用其他 Store 的函数即可。

---

## 第七步：最佳实践

### 1. 按功能拆分 Store

不要把所有状态放在一个 Store 里。

```
stores/
├── user.js      # 用户状态
├── cart.js      # 购物车状态
└── settings.js  # 设置状态
```

### 2. 持久化状态

默认情况下，刷新页面 Store 会重置。如果需要持久化，用插件：

```bash
npm install pinia-plugin-persistedstate
```

```javascript
// main.js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

在 Store 里开启：

```javascript
export const useUserStore = defineStore('user', {
    state: () => ({ user: null }),
    persist: true  // 开启持久化
});
```

### 3. 避免在 Store 里放 UI 状态

UI 状态（如弹窗是否打开、表单输入值）应该放在组件里，只有**跨组件共享的数据**才放 Store。

---

## 总结：速查表

| 概念 | 含义 | 示例 |
|------|------|------|
| `defineStore` | 定义 Store | `defineStore('name', options)` |
| `state` | 响应式数据 | `state: () => ({ count: 0 })` |
| `getters` | 计算属性 | `getters: { double: s => s.count * 2 }` |
| `actions` | 状态变更方法 | `actions: { increment() { this.count++ } }` |
| `useStore` | 在组件中使用 | `const store = useStore()` |

**记住：**
- 优先用 Pinia，不要用 Vuex
- 按功能拆分 Store
- 需要持久化用 `pinia-plugin-persistedstate`

---

## 实践练习

```javascript
// 练习：实现购物车 Store
// 1. 定义 useCartStore
// 2. state: items 数组
// 3. getters: totalItems, totalPrice
// 4. actions: addItem, removeItem

import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({ items: [] }),
    getters: {
        totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
    actions: {
        addItem(item) {
            const existing = this.items.find(i => i.id === item.id);
            if (existing) existing.quantity++;
            else this.items.push({ ...item, quantity: 1 });
        },
        removeItem(id) {
            this.items = this.items.filter(i => i.id !== id);
        }
    }
});
```

---

## 常见问题

### Q：Pinia 的状态刷新后会丢失吗？

**默认会。可以用 `pinia-plugin-persistedstate` 插件自动持久化到 localStorage。**

### Q：Pinia 和 provide/inject 选哪个？

**跨组件共享状态用 Pinia。父子组件通信用 props/emit，跨级通信用 provide/inject。**

### Q：怎么在 Store 里访问 Router？

**在 Action 里导入并使用：**

```javascript
import { useRouter } from 'vue-router';

actions: {
    login() {
        const router = useRouter();
        router.push('/dashboard');
    }
}
```

---

## 学习资源

- [Pinia 官方文档](https://pinia.vuejs.org/zh/) ⭐ 官方文档
- [Pinia 插件](https://pinia.vuejs.org/zh/core-concepts/plugins.html)
