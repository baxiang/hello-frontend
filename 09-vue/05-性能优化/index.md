# Vue 性能优化 ⭐⭐⭐

> 从"列表渲染卡顿"的烦恼出发，理解 Vue 的性能优化技巧

---

## 学习目标

学完本节，你能：
- 理解 Vue 响应式系统的性能开销
- 掌握 shallowRef 和 markRaw 的使用场景
- 学会 v-if 和 v-show 的选择
- 能够识别和优化不必要的渲染

---

## 生活化比喻

**Vue 性能优化就像"智能家居的效率管理"**：

```
深度响应式 = 每个家具都装传感器：
┌─────────────────────────────┐
│  家里所有东西都联网         │
│  改一个，全家都更新         │
│  开销很大                   │
└─────────────────────────────┘

shallowRef = 只监控大门：
┌─────────────────────────────┐
│  只监控整体变化             │
│  内部怎么改不监控           │
│  开销小                     │
└─────────────────────────────┘

v-if vs v-show = 拆墙 vs 拉窗帘：
┌─────────────────────────────┐
│  v-if：拆墙重建（销毁/创建）│
│  v-show：拉上/拉开窗帘      │
└─────────────────────────────┘

虚拟列表 = 只看眼前能看到的：
┌─────────────────────────────┐
│  书架有 1000 本书           │
│  但只显示眼睛看得到的几本   │
│  滚到哪显示哪               │
└─────────────────────────────┘
```

---

## 第一步：看看问题

Vue 的响应式系统很强大，但也是有代价的。

```vue
<script setup>
import { ref } from 'vue';

// 问题 1：大型对象创建响应式很慢
const largeData = ref(fetchLargeDataset());

// 问题 2：频繁切换显示/隐藏
const showDetail = ref(false);

// 问题 3：长列表渲染卡顿
const items = ref(Array.from({ length: 10000 }, (_, i) => ({ id: i, text: `Item ${i}` })));
</script>
```

**发现问题了吗？**

- 大型对象（如第三方库实例）不需要响应式，但 Vue 默认会深度代理
- `v-if` 频繁切换会不断创建/销毁 DOM
- 渲染 10000 个列表项会导致界面卡顿

---

## 第二步：shallowRef — 浅层响应式

如果你有一个大对象，只需要在它整体替换时触发更新，不需要监控内部属性变化。

用 `shallowRef`：

```vue
<script setup>
import { ref, shallowRef } from 'vue';

// ref：深度响应式，内部属性变化也会触发更新
const config = ref({ settings: { theme: 'dark' } });
config.value.settings.theme = 'light';  // ✅ 触发更新

// shallowRef：只追踪 .value 变化
const config = shallowRef({ settings: { theme: 'dark' } });
config.value.settings.theme = 'light';  // ❌ 不触发更新
config.value = { settings: { theme: 'light' } };  // ✅ 触发更新
</script>
```

**适用场景：** 大型配置对象、图表实例等不需要深度响应的数据。

---

## 第三步：markRaw — 标记为非响应式

有时候你完全不需要某个对象是响应式的。比如第三方库的实例。

用 `markRaw`：

```vue
<script setup>
import { markRaw } from 'vue';
import { Chart } from 'chart.js';

const canvas = ref(null);
let chart = null;

onMounted(() => {
    // Chart 实例不需要响应式，用 markRaw 标记
    chart = markRaw(new Chart(canvas.value, { ... }));
});
</script>
```

**不标记的后果：** Vue 会尝试代理 Chart 实例的所有属性，可能导致报错或性能问题。

---

## 第四步：v-if vs v-show

### v-if：销毁/创建

```vue
<div v-if="show">内容</div>
```

- `show` 为 false 时，DOM 被销毁
- `show` 为 true 时，DOM 重新创建

**适用：** 不频繁切换的场景。

### v-show：CSS 切换

```vue
<div v-show="show">内容</div>
```

- `show` 为 false 时，只是 `display: none`
- DOM 始终存在

**适用：** 频繁切换的场景。

### 对比

| 场景 | 推荐 | 原因 |
|------|------|------|
| 弹窗/下拉菜单 | `v-show` | 频繁开关，DOM 复用 |
| 权限控制 | `v-if` | 不常变化，销毁节省内存 |
| 首屏不需要的内容 | `v-if` | 初始不渲染，加快首屏 |

---

## 第五步：组件懒加载

如果你的应用有很多组件，第一次加载所有代码会很慢。

用 `defineAsyncComponent` 按需加载：

```vue
<script setup>
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent({
    loader: () => import('./HeavyComponent.vue'),
    loadingComponent: LoadingSpinner,
    delay: 200,
    timeout: 3000
});
</script>

<template>
    <HeavyComponent />
</template>
```

组件只有在渲染时才会加载代码。

---

## 第六步：虚拟列表 — 长列表优化

渲染 10000 条数据会卡顿，因为 DOM 节点太多。

**虚拟列表**只渲染可见区域的节点，滚动时动态替换内容。

用 `vue-virtual-scroller`：

```bash
npm install vue-virtual-scroller
```

```vue
<script setup>
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

const items = ref(Array.from({ length: 10000 }, (_, i) => ({ id: i, text: `Item ${i}` })));
</script>

<template>
    <RecycleScroller
        class="scroller"
        :items="items"
        :item-size="50"
        key-field="id"
        v-slot="{ item }"
    >
        <div class="item">{{ item.text }}</div>
    </RecycleScroller>
</template>
```

即使有 10000 条数据，DOM 里也只有几十个节点，非常流畅。

---

## 第七步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `Maximum call stack size exceeded` | 响应式循环引用 | 用 `markRaw` 标记 |
| `v-for 和 v-if 在同一元素上` | 优先级冲突 | 用 computed 过滤或 `<template>` 包裹 |
| 列表更新错乱 | key 用了 index | 用唯一 ID 作为 key |
| 首屏加载慢 | 一次性加载所有组件 | 用 `defineAsyncComponent` |

---

## 总结：速查表

| 工具 | 用途 | 何时用 |
|------|------|--------|
| `shallowRef` | 浅层响应式 | 大型对象，只需整体替换 |
| `markRaw` | 标记非响应式 | 第三方实例、大型只读数据 |
| `v-if` | 条件渲染（销毁/创建） | 不频繁切换 |
| `v-show` | 条件渲染（CSS 切换） | 频繁切换 |
| `defineAsyncComponent` | 组件懒加载 | 非首屏组件 |
| 虚拟列表 | 长列表渲染 | 1000+ 项数据 |

**记住：**
- 大型对象用 `shallowRef` 或 `markRaw`
- 频繁切换用 `v-show`
- 列表 key 用唯一 ID，不要用 index
- 长列表用虚拟列表

---

## 实践练习

```vue
<!-- 练习：优化一个慢列表 -->
<!-- 1. 用 shallowRef 包裹大型配置对象 -->
<!-- 2. 用 v-show 切换频繁显示的详情 -->
<!-- 3. 用 defineAsyncComponent 懒加载图表组件 -->
```

---

## 常见问题

### Q：shallowRef 和 ref 有什么区别？

**ref 递归响应式（深），shallowRef 只响应 .value 变化（浅）。**

```vue
const obj = ref({ nested: { value: 1 } });
obj.value.nested.value = 2;  // ✅ 触发更新

const obj = shallowRef({ nested: { value: 1 } });
obj.value.nested.value = 2;  // ❌ 不触发更新
obj.value = { nested: { value: 2 } };  // ✅ 触发更新
```

### Q：什么时候用 markRaw？

**第三方库实例、大型只读数据、不需要响应式的对象。**

```vue
// ✅ 图表实例
import { Chart } from 'chart.js';
const chart = markRaw(new Chart(ctx, { ... }));

// ✅ 大型只读数据
const largeData = markRaw(fetchLargeDataset());
```

### Q：v-for 的 key 为什么不能用 index？

**用 index 作为 key，在列表增删时会导致渲染错误。**

```vue
<!-- ❌ 错误 -->
<li v-for="(item, index) in items" :key="index">{{ item.name }}</li>

<!-- ✅ 正确 -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
```

---

## 学习资源

- [Vue 性能优化指南](https://cn.vuejs.org/guide/best-practices/performance.html) ⭐ 官方文档
- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
