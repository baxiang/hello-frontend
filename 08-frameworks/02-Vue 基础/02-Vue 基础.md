# Vue 基础

> 掌握 Vue 组件和 Composition API

## 学习目标

- ✅ 掌握 Vue 组件基础
- ✅ 熟练使用 Composition API
- ✅ 理解 Vue 指令

---

## 2.1 组件基础

### Options API

```vue
<template>
    <div class="welcome">
        <h1>Hello, {{ name }}</h1>
        <p>计数：{{ count }}</p>
        <button @click="increment">+1</button>
    </div>
</template>

<script>
export default {
    name: 'Welcome',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            count: 0
        }
    },
    methods: {
        increment() {
            this.count++
        }
    },
    computed: {
        doubleCount() {
            return this.count * 2
        }
    },
    mounted() {
        console.log('组件已挂载')
    }
}
</script>

<style scoped>
.welcome {
    padding: 20px;
}
</style>
```

---

## 2.2 Composition API

### setup 语法糖

```vue
<template>
    <div>
        <p>Count: {{ count }}</p>
        <button @click="increment">+1</button>
        <input v-model="text" />
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

// ref - 响应式引用
const count = ref(0)
const text = ref('')

const increment = () => {
    count.value++
}

// reactive - 响应式对象
const state = reactive({
    name: '张三',
    age: 25
})

// computed - 计算属性
const doubleCount = computed(() => count.value * 2)

// watch - 监听
watch(count, (newVal, oldVal) => {
    console.log(`count: ${oldVal} -> ${newVal}`)
})

watch(
    () => state.age,
    (newAge) => {
        console.log(`Age changed: ${newAge}`)
    }
)

// onMounted - 生命周期
onMounted(() => {
    console.log('组件已挂载')
})
</script>
```

### ref vs reactive

```vue
<script setup>
import { ref, reactive } from 'vue'

// ref - 用于基础类型
const count = ref(0)
const name = ref('张三')

// 访问时需要 .value
console.log(count.value)

// reactive - 用于对象
const user = reactive({
    name: '张三',
    age: 25
})

// 直接访问属性
console.log(user.name)
</script>
```

---

## 2.3 常用指令

```vue
<template>
    <div>
        <!-- 文本插值 -->
        <p>{{ message }}</p>

        <!-- v-bind - 绑定属性 -->
        <img :src="imageUrl" :alt="title" />
        <div :class="{ active: isActive }"></div>
        <div :style="{ color: textColor }"></div>

        <!-- v-on - 事件绑定 -->
        <button @click="handleClick">点击</button>
        <button @submit.prevent="handleSubmit">提交</button>

        <!-- v-model - 双向绑定 -->
        <input v-model="form.name" />
        <input type="checkbox" v-model="checked" />
        <select v-model="selected">
            <option value="a">A</option>
            <option value="b">B</option>
        </select>

        <!-- v-if / v-else -->
        <div v-if="type === 'A'">A</div>
        <div v-else-if="type === 'B'">B</div>
        <div v-else>Other</div>

        <!-- v-for - 列表 -->
        <ul>
            <li v-for="item in items" :key="item.id">
                {{ item.name }}
            </li>
        </ul>

        <!-- v-show - 显示隐藏 -->
        <div v-show="isVisible">内容</div>

        <!-- v-html - 渲染 HTML -->
        <div v-html="htmlContent"></div>

        <!-- v-slot - 插槽 -->
        <template v-slot:default="slotProps">
            {{ slotProps.item }}
        </template>
    </div>
</template>
```

---

## 2.4 生命周期

```vue
<script setup>
import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted
} from 'vue'

onBeforeMount(() => {
    console.log('挂载前')
})

onMounted(() => {
    console.log('挂载后')
})

onBeforeUpdate(() => {
    console.log('更新前')
})

onUpdated(() => {
    console.log('更新后')
})

onBeforeUnmount(() => {
    console.log('卸载前')
})

onUnmounted(() => {
    console.log('卸载后')
})
</script>
```

---

## 2.5 组件通信

### Props 和 Emits

```vue
<!-- Parent.vue -->
<template>
    <Child :message="msg" @update="handleUpdate" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const msg = ref('Hello')
const handleUpdate = (newValue) => {
    msg.value = newValue
}
</script>

<!-- Child.vue -->
<template>
    <div>
        <p>{{ message }}</p>
        <button @click="$emit('update', 'New Value')">更新</button>
    </div>
</template>

<script setup>
defineProps({
    message: String
})

defineEmits(['update'])
</script>
```

### provide/inject

```vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)
</script>

<!-- 后代组件 -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme')
</script>
```

---

## 2.6 常见问题

### Q1: ref 和 reactive 怎么选择？

- **ref**: 基础类型（string、number、boolean）
- **reactive**: 对象和数组

### Q2: 如何解构 props？

```vue
<script setup>
import { toRefs } from 'vue'

const props = defineProps({
    name: String,
    age: Number
})

// 使用 toRefs 保持响应式
const { name, age } = toRefs(props)
</script>
```

---

## 2.7 学习资源

- [Vue 官方文档](https://cn.vuejs.org/)
- [Vue Composition API](https://cn.vuejs.org/api/composition-api-setup.html)

---

**上一章：** [← 01-React 基础](../01-React 基础/01-React 基础.md)
**下一章：** [→ 03-路由管理](../03-路由管理/03-路由管理.md)