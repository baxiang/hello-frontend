# Vue + TypeScript

> 本章时长：1.5小时 | 难度：⭐⭐⭐⭐

---

## 本章目标

- 掌握 Vue 组件类型定义
- 学会使用组合式 API 类型
- 理解 Props 和 emits 类型

---

## 20.1 组件类型定义

### defineComponent

```typescript
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
    name: 'UserCard',
    props: {
        name: { 
            type: String, 
            required: true 
        },
        age: { 
            type: Number, 
            default: 0 
        }
    },
    setup(props) {
        const greeting = computed(() => `Hello, ${props.name}!`);
        
        return { greeting };
    }
});
```

### 使用泛型

```typescript
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'List',
    props: {
        items: {
            type: Array as () => string[],
            default: () => []
        }
    },
    setup(props) {
        const reversedItems = ref([...props.items].reverse());
        
        return { reversedItems };
    }
});
```

---

## 20.2 组合式 API

### ref 和 reactive

```typescript
import { ref, reactive, computed } from 'vue';

interface User {
    name: string;
    age: number;
}

// ref
const count = ref<number>(0);
const user = ref<User>({ name: 'Tom', age: 25 });

// reactive
const state = reactive({
    count: 0,
    user: { name: 'Tom', age: 25 }
});

// computed
const doubleCount = computed(() => count.value * 2);
```

### 类型推断

```typescript
import { ref } from 'vue';

// 自动推断类型
const name = ref('Tom');  // Ref<string>
const count = ref(0);     // Ref<number>

// 显式指定类型
const items = ref<string[]>([]);
```

---

## 20.3 Props 类型

### 使用 PropType

```typescript
import { defineComponent, PropType } from 'vue';

interface User {
    id: number;
    name: string;
}

export default defineComponent({
    props: {
        user: {
            type: Object as PropType<User>,
            required: true
        },
        onUpdate: {
            type: Function as PropType<(user: User) => void>,
            required: true
        }
    },
    setup(props) {
        return () => (
            <div>
                <p>{props.user.name}</p>
                <button onClick={() => props.onUpdate(props.user)}>
                    Update
                </button>
            </div>
        );
    }
});
```

---

## 20.4 路由类型

### RouteRecordRaw

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/user/:id',
        name: 'User',
        component: () => import('./views/User.vue'),
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
```

---

## 20.5 实践练习

### 练习：用户卡片组件

```typescript
import { defineComponent, ref, computed } from 'vue';

interface User {
    id: number;
    name: string;
    email: string;
}

export default defineComponent({
    name: 'UserCard',
    props: {
        user: {
            type: Object as PropType<User>,
            required: true
        }
    },
    emits: ['delete', 'update'],
    setup(props, { emit }) {
        const isEditing = ref(false);
        
        const editUser = () => {
            isEditing.value = true;
        };
        
        const saveUser = () => {
            isEditing.value = false;
            emit('update', props.user);
        };
        
        const deleteUser = () => {
            emit('delete', props.user.id);
        };
        
        return {
            isEditing,
            editUser,
            saveUser,
            deleteUser
        };
    },
    template: `
        <div class="user-card">
            <h3>{{ user.name }}</h3>
            <p>{{ user.email }}</p>
            <button @click="editUser">Edit</button>
            <button @click="deleteUser">Delete</button>
        </div>
    `
});
```

---

## 本章小结

| 概念 | 说明 |
|------|------|
| defineComponent | 定义组件 |
| PropType | Props 类型 |
| ref<T> | 响应式引用 |
| reactive | 响应式对象 |
| computed | 计算属性 |

---

## 下一章

[→ 54-Nodejs与TypeScript.md](./54-Nodejs与TypeScript.md)

---

## 练习答案

```typescript
export default defineComponent({
    name: 'UserCard',
    props: { ... },
    emits: ['delete', 'update'],
    setup(props, { emit }) { ... }
});
```