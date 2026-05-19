# Vue 核心概念 ⭐⭐

> 响应式系统、计算属性、侦听器、生命周期

---

## 学习目标

- 理解 Vue 响应式原理（ref vs reactive）
- 掌握计算属性 computed 的缓存特性
- 掌握侦听器 watch / watchEffect 的使用
- 理解生命周期钩子的执行时机

---

## 生活化比喻

**响应式系统就像"智能家居"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  智能家居                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    ref = 一个智能开关                                 │
│    ─────────────                                     │
│    你改变开关状态（.value），灯自动跟着变             │
│    不需要你手动去开灯                                │
│                                                      │
│    reactive = 智能控制面板                            │
│    ─────────────                                     │
│    一个面板控制多个设备（温度、灯光、窗帘）           │
│    调面板上任意参数，对应设备自动响应                │
│                                                      │
│    computed = 自动计算公式                            │
│    ─────────────                                     │
│    就像电费表：用电量变了，电费自动算出来            │
│    不用你手动算，而且有缓存（同样的用电量算一次）    │
│                                                      │
│    watch = 监控摄像头                                │
│    ─────────────                                     │
│    盯着某个东西，一旦变化就执行动作                  │
│    比如：温度超过 30 度就开空调                       │
│                                                      │
│    生命周期 = 人的一天                                │
│    ─────────────                                     │
│    起床(onMounted) → 工作(onUpdated) → 睡觉          │
│    (onUnmounted)                                      │
│    每个阶段有该做的事                                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### ref 与 reactive

**语法结构图：**

```
响应式声明：

ref(值)           ← 基础类型/对象，访问需 .value
reactive({ 对象 }) ← 仅对象/数组，直接访问属性

修改：
  refVal.value = newVal          ← ref
  reactiveObj.prop = newVal      ← reactive

解构：
  const { name } = reactiveObj   ← ❌ 丢失响应式
  const { name } = toRefs(reactiveObj)  ← ✅ 保持响应式
```

**最简示例（1-3行）：**

```vue
<script setup>
import { ref, reactive } from 'vue'
const count = ref(0)
const user = reactive({ name: '张三' })
</script>
```

**详细示例：**

```vue
<script setup>
import { ref, reactive, toRefs } from 'vue'

// ref — 用于基础类型
const count = ref(0)
const increment = () => count.value++

// reactive — 用于对象
const user = reactive({ name: '张三', age: 25 })
const birthday = () => user.age++

// ref 可以整体替换
const todo = ref({ text: '学习 Vue' })
todo.value = { text: '完成' }  // ✅

// reactive 不能整体替换
// user = { name: '李四' }  // ❌ 丢失响应式

// 解构 reactive 对象 — 用 toRefs 保持响应式
const { name, age } = toRefs(user)
</script>
```

---

### 计算属性 computed

**语法结构图：**

```
computed 结构：

const derived = computed(() => expr)          ← 只读（自动追踪依赖）

const writable = computed({                   ← 可写
    get() { return ... },
    set(val) { ... }
})

特性：有缓存 — 依赖不变时不重新计算
```

**最简示例：**

```vue
<script setup>
const price = ref(100)
const discountPrice = computed(() => price.value * 0.8)
</script>
```

**详细示例：**

```vue
<script setup>
import { ref, computed } from 'vue'

const price = ref(100)
const quantity = ref(5)

// 只读计算属性
const discountPrice = computed(() => price.value * 0.8)
const total = computed(() => discountPrice.value * quantity.value)

// 可写计算属性
const firstName = ref('张')
const lastName = ref('三')
const fullName = computed({
    get() { return firstName.value + lastName.value },
    set(val) {
        firstName.value = val[0]
        lastName.value = val.slice(1)
    }
})
</script>
```

---

### 侦听器 watch / watchEffect

**语法结构图：**

```
watch（惰性，需指定依赖）:
  watch(source, (newVal, oldVal) => { })
  watch([a, b], ([newA, newB], [oldA, oldB]) => { })
  watch(() => obj.prop, (newVal, oldVal) => { })

watchEffect（立即执行，自动追踪）:
  watchEffect(() => { /* 自动追踪内部 ref */ })

选项:
  { immediate: true }  ← 立即执行一次
  { deep: true }       ← 深度监听
```

**最简示例：**

```vue
<script setup>
watch(question, (newVal) => { if (newVal.includes('?')) fetchAnswer() })
watchEffect(() => console.log(`count: ${count.value}`))
</script>
```

**详细示例：**

```vue
<script setup>
import { ref, reactive, watch, watchEffect } from 'vue'

const question = ref('')
const answer = ref('等待提问...')

// watch — 指定依赖，可获取旧值
watch(question, (newVal, oldVal) => {
    if (newVal.includes('?')) {
        answer.value = '思考中...'
    }
})

// 监听多个源
const x = ref(0), y = ref(0)
watch([x, y], ([newX, newY], [oldX, oldY]) => {
    console.log(`x: ${oldX}→${newX}, y: ${oldY}→${newY}`)
})

// watchEffect — 自动追踪，立即执行
watchEffect(() => {
    console.log(`count is ${count.value}`)
    // 自动追踪 count，变化时重新执行
})

// 停止侦听
const stop = watchEffect(() => { /* ... */ })
stop()  // 手动停止
</script>
```

---

## L2 实践层：用好

### watch vs watchEffect 选择

| 特性 | watch | watchEffect |
|------|-------|-------------|
| 执行时机 | 依赖变化才执行 | 立即执行一次 |
| 依赖指定 | 手动指定 | 自动追踪 |
| 获取旧值 | ✅ | ❌ |
| 适用场景 | 需要旧值、异步请求 | 自动追踪、副作用 |

### 反模式：不要这样做

```vue
<!-- ❌ 错误：在 computed 中执行副作用 -->
<script setup>
const doubled = computed(() => {
    fetch('/api/log')  // ❌ 不应有副作用
    return count.value * 2
})
</script>

<!-- ✅ 正确：computed 只用于计算，副作用用 watch -->
<script setup>
const doubled = computed(() => count.value * 2)
watch(count, (val) => { fetch('/api/log', { data: val }) })
</script>
```

```vue
<!-- ❌ 错误：直接解构 reactive 对象 -->
<script setup>
const { name, age } = user  // ❌ 丢失响应式
</script>

<!-- ✅ 正确：用 toRefs -->
<script setup>
const { name, age } = toRefs(user)  // ✅ 保持响应式
</script>
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 派生数据 | computed | 有缓存，自动更新 |
| 异步请求 | watch | 指定依赖，获取旧值 |
| 自动同步 | watchEffect | 自动追踪，代码简洁 |
| 基础类型 | ref | 统一用 .value |
| 对象/数组 | reactive | 直接访问属性 |

---

## L3 专家层：深入

### 响应式原理

```
Vue 3 响应式实现（Proxy）：

ref(0):
  ┌──────────────────────────────┐
  │  { value: 0 }  ← Proxy 代理  │
  │  get()  → 收集依赖（谁用了） │
  │  set()  → 触发更新（通知谁） │
  └──────────────────────────────┘

reactive({}):
  ┌──────────────────────────────┐
  │  Proxy 代理整个对象          │
  │  深层递归代理嵌套对象        │
  │  get() → 收集依赖            │
  │  set() → 触发更新            │
  └──────────────────────────────┘

computed 缓存机制:
  首次计算 → 缓存结果 + 记录依赖
  依赖不变 → 直接返回缓存
  依赖变化 → 标记脏值 → 下次访问时重新计算
```

### 性能考量

| 操作 | 性能影响 | 说明 |
|------|---------|------|
| computed | 极低 | 有缓存，依赖不变不计算 |
| watch | 低 | 只在依赖变化时执行 |
| watchEffect | 低 | 自动追踪，首次执行一次 |
| reactive 深层代理 | 中等 | 嵌套越深代理越多 |

### 知识关联

```
核心概念关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  响应式     │────→│  计算属性   │────→│  侦听器     │
│  ref/       │     │  computed   │     │  watch/     │
│  reactive   │     │  派生数据   │     │  watchEffect│
└─────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           ↓                    ↓
                    ┌─────────────┐     ┌─────────────┐
                    │  生命周期   │     │  模板引用   │
                    │  mounted/   │     │  ref(DOM)   │
                    │  unmounted  │     │  直接操作   │
                    └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **ref** | 创建响应式引用的函数，访问需 `.value` | `const count = ref(0)` |
| **reactive** | 创建响应式对象的函数，直接访问属性 | `const user = reactive({ name: '张三' })` |
| **computed** | 计算属性，自动追踪依赖且有缓存 | `computed(() => a.value + b.value)` |
| **watch** | 侦听器，监听指定数据变化并执行回调 | `watch(source, callback)` |
| **watchEffect** | 自动追踪依赖的侦听器，立即执行 | `watchEffect(() => fn())` |
| **toRefs** | 将 reactive 对象的属性转为 ref | `toRefs(user)` |
| **生命周期** | 组件从创建到销毁各阶段可执行的钩子 | `onMounted`, `onUnmounted` |
| **模板引用** | 通过 ref 获取 DOM 或子组件实例 | `const inputRef = ref(null)` |

---

## 实践练习

### 练习：搜索防抖 + 计算属性

```vue
<script setup>
import { ref, computed, watch } from 'vue'

// 搜索
const query = ref('')
const results = ref([])
const loading = ref(false)

// 计算属性：过滤结果
const filteredResults = computed(() =>
    results.value.filter(r => r.name.includes(query.value))
)

// watch + 防抖：输入停止 300ms 后才请求
let timer = null
watch(query, async (newVal) => {
    if (!newVal) { results.value = []; return }
    loading.value = true
    clearTimeout(timer)
    timer = setTimeout(async () => {
        const res = await fetch(`/api/search?q=${newVal}`)
        results.value = await res.json()
        loading.value = false
    }, 300)
})
</script>

<template>
  <div>
    <input v-model.trim="query" placeholder="搜索..." />
    <p v-if="loading">加载中...</p>
    <ul v-else>
      <li v-for="item in filteredResults" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
```

---

## 常见问题

### Q1：computed 和 watch 有什么区别？

**computed 用于派生数据（有返回值），watch 用于副作用（无返回值）：**

```vue
<!-- computed：计算新值 -->
const total = computed(() => price.value * quantity.value)

<!-- watch：执行副作用 -->
watch(query, (val) => { fetch(`/api?q=${val}`) })
```

### Q2：为什么 reactive 解构后失去响应式？

**解构是赋值操作，破坏了 Proxy 代理：**

```vue
const user = reactive({ name: '张三' })
const { name } = user  // name 只是普通字符串，不是 ref

// 正确做法
const { name } = toRefs(user)  // name 是 ref，保持响应式
```

### Q3：如何在 watch 中深度监听？

```vue
const obj = reactive({ a: { b: 1 } })

// 浅层：只监听 obj.a 的引用变化
watch(() => obj.a, () => { })

// 深层：监听 obj.a.b 的变化
watch(() => obj.a, () => { }, { deep: true })
```

---

## 学习资源

- [Vue 响应式原理](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html) ⭐ 官方权威
- [Vue 计算属性](https://cn.vuejs.org/guide/essentials/computed.html)
- [Vue 侦听器](https://cn.vuejs.org/guide/essentials/watchers.html)
