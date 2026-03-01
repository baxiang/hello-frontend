# 前端框架系统学习教程

> 掌握 React 和 Vue 两大主流前端框架，构建现代化 Web 应用

---

## 教程特色

- **双框架教学** - 同时讲解 React 和 Vue，对比学习
- **实战导向** - 每章都有完整的代码示例和实践项目
- **核心深入** - 深入理解框架原理和最佳实践
- **现代实践** - 涵盖 Hooks、Composition API 等现代用法

---

## 完整学习路线

```
基础篇                    进阶篇                      实战篇
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 1 章       │          │ 第 3 章       │           │ 第 5 章       │
│ React 基础   │ ──────▶  │ React Router │ ──────▶   │ 状态管理     │
│ 组件/Hooks   │          │ 路由系统     │           │ Redux/Pinia  │
└─────────────┘          └─────────────┘           └─────────────┘
       │                        │                         │
       ▼                        ▼                         ▼
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 2 章       │          │ 第 4 章       │           │ 第 6 章       │
│ Vue 基础     │ ──────▶  │ Vue Router   │ ──────▶   │ 综合实践     │
│ 组件/指令    │          │ 路由系统     │           │ 完整项目     │
└─────────────┘          └─────────────┘           └─────────────┘
```

---

## 章节详情

### 基础篇

#### 第 1 章：React 基础
掌握 React 组件开发和 Hooks 使用。

| 小节 | 内容 | 难度 |
|------|------|------|
| 1.1 | React 简介和环境搭建 | ⭐⭐ |
| 1.2 | JSX 语法基础 | ⭐⭐ |
| 1.3 | 函数组件 | ⭐⭐ |
| 1.4 | Props 属性 | ⭐⭐ |
| 1.5 | useState Hook | ⭐⭐⭐ |
| 1.6 | useEffect Hook | ⭐⭐⭐ |
| 1.7 | 事件处理 | ⭐⭐ |
| 1.8 | 条件渲染 | ⭐⭐ |
| 1.9 | 列表渲染 | ⭐⭐ |
| 1.10 | 表单处理 | ⭐⭐⭐ |

**学习目标：**
- 理解 React 组件化思想
- 掌握 JSX 语法和组件编写
- 熟练使用 useState 和 useEffect

---

#### 第 2 章：Vue 基础
掌握 Vue 组件开发和 Composition API。

| 小节 | 内容 | 难度 |
|------|------|------|
| 2.1 | Vue 简介和环境搭建 | ⭐⭐ |
| 2.2 | 模板语法 | ⭐⭐ |
| 2.3 | 选项式 API | ⭐⭐ |
| 2.4 | 组合式 API（script setup） | ⭐⭐⭐ |
| 2.5 | 响应式基础（ref/reactive） | ⭐⭐⭐ |
| 2.6 | 计算属性 | ⭐⭐⭐ |
| 2.7 | 侦听器 | ⭐⭐⭐ |
| 2.8 | 指令系统 | ⭐⭐ |
| 2.9 | 组件事件 | ⭐⭐ |
| 2.10 | 表单输入绑定 | ⭐⭐ |

**学习目标：**
- 理解 Vue 响应式原理
- 掌握 Composition API 的使用
- 能够编写 Vue 组件和指令

---

### 进阶篇

#### 第 3 章：React Router
掌握 React 路由系统的使用。

| 小节 | 内容 | 难度 |
|------|------|------|
| 3.1 | React Router 安装配置 | ⭐⭐ |
| 3.2 | BrowserRouter 配置 | ⭐⭐ |
| 3.3 | Routes 和 Route | ⭐⭐ |
| 3.4 | Link 导航 | ⭐⭐ |
| 3.5 | 动态路由参数 | ⭐⭐⭐ |
| 3.6 | 嵌套路由 | ⭐⭐⭐ |
| 3.7 | 编程式导航 | ⭐⭐⭐ |
| 3.8 | 路由守卫 | ⭐⭐⭐⭐ |
| 3.9 | 懒加载 | ⭐⭐⭐ |

**学习目标：**
- 掌握 React Router 的基本配置
- 理解动态路由和嵌套路由
- 能够实现路由守卫和权限控制

---

#### 第 4 章：Vue Router
掌握 Vue 路由系统的使用。

| 小节 | 内容 | 难度 |
|------|------|------|
| 4.1 | Vue Router 安装配置 | ⭐⭐ |
| 4.2 | 路由模式（History/Hash） | ⭐⭐ |
| 4.3 | 路由配置 | ⭐⭐ |
| 4.4 | router-link 导航 | ⭐⭐ |
| 4.5 | 动态路由匹配 | ⭐⭐⭐ |
| 4.6 | 嵌套路由 | ⭐⭐⭐ |
| 4.7 | 编程式导航 | ⭐⭐⭐ |
| 4.8 | 导航守卫 | ⭐⭐⭐⭐ |
| 4.9 | 路由懒加载 | ⭐⭐⭐ |
| 4.10 | 路由元信息 | ⭐⭐⭐ |

**学习目标：**
- 掌握 Vue Router 的配置方法
- 理解路由模式和导航守卫
- 能够实现完整的单页应用路由

---

#### 第 5 章：状态管理
掌握 Redux 和 Pinia 状态管理方案。

| 小节 | 内容 | 难度 |
|------|------|------|
| 5.1 | 状态管理概念 | ⭐⭐ |
| 5.2 | Redux Toolkit 基础 | ⭐⭐⭐ |
| 5.3 | createSlice | ⭐⭐⭐ |
| 5.4 | useSelector 和 useDispatch | ⭐⭐⭐ |
| 5.5 | Redux 异步操作 | ⭐⭐⭐⭐ |
| 5.6 | Pinia 基础 | ⭐⭐⭐ |
| 5.7 | State、Getters、Actions | ⭐⭐⭐ |
| 5.8 | Pinia 持久化 | ⭐⭐⭐ |
| 5.9 | React vs Vue 状态管理对比 | ⭐⭐ |

**学习目标：**
- 理解状态管理的必要性
- 掌握 Redux Toolkit 的使用
- 掌握 Pinia 状态管理
- 能够根据项目选择合适的方案

---

### 实战篇

#### 第 6 章：综合实践
综合运用所学知识完成完整项目。

| 小节 | 内容 | 难度 |
|------|------|------|
| 6.1 | React 完整项目结构 | ⭐⭐⭐ |
| 6.2 | Vue 完整项目结构 | ⭐⭐⭐ |
| 6.3 | API 请求封装 | ⭐⭐⭐ |
| 6.4 | 组件封装技巧 | ⭐⭐⭐⭐ |
| 6.5 | 性能优化 | ⭐⭐⭐⭐ |
| 6.6 | 部署配置 | ⭐⭐⭐ |

**学习目标：**
- 能够设计合理的项目结构
- 掌握 API 请求封装方法
- 理解组件封装和性能优化
- 具备独立开发完整项目的能力

---

## 学习路径建议

### 入门阶段（2-3 周）
```
第 1 章 → 第 2 章
```
**目标：** 掌握 React 和 Vue 的基础用法

**建议：**
- 先学一个框架，再对比学习另一个
- 理解组件化思想
- 多动手编写组件

---

### 进阶阶段（2-3 周）
```
第 3 章 → 第 4 章 → 第 5 章
```
**目标：** 掌握路由和状态管理

**建议：**
- 理解路由的工作原理
- 掌握状态管理的使用场景
- 尝试编写小型单页应用

---

### 实战阶段（2-3 周）
```
第 6 章
```
**目标：** 完成完整的实战项目

**建议：**
- 选择 React 或 Vue 其中一个深入
- 完成 Todo List、博客系统等练习项目
- 学习性能优化技巧

---

## 开发环境准备

### Node.js 安装

```bash
# 下载安装包：https://nodejs.org/
# 推荐使用 LTS 版本（18.x 或更高）

node -v
npm -v
```

### React 项目创建

```bash
# 使用 Vite 创建 React 项目
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev

# 或使用 Create React App（官方）
npx create-react-app my-react-app
```

### Vue 项目创建

```bash
# 使用 Vite 创建 Vue 项目
npm create vite@latest my-vue-app -- --template vue
cd my-vue-app
npm install
npm run dev
```

### VS Code 插件推荐

- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Volar** - Vue 3 支持
- **ESLint React Snippets** - React 代码片段

---

## 常用代码片段

### React Hooks

```jsx
// useState - 状态
const [count, setCount] = useState(0);

// useEffect - 副作用
useEffect(() => {
  fetchData().then(setData);
}, [dependency]);

// useCallback - 缓存函数
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

// useMemo - 缓存计算结果
const filtered = useMemo(() => {
  return list.filter(item => item.active);
}, [list]);

// useRef - 引用
const inputRef = useRef(null);
inputRef.current.focus();

// useContext - 上下文
const theme = useContext(ThemeContext);
```

### Vue Composition API

```vue
<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

// ref - 响应式引用
const count = ref(0)

// reactive - 响应式对象
const state = reactive({ name: '张三' })

// computed - 计算属性
const doubleCount = computed(() => count.value * 2)

// watch - 侦听
watch(count, (newVal) => {
  console.log(newVal)
})

// onMounted - 生命周期
onMounted(() => {
  console.log('组件已挂载')
})
</script>
```

### React Router

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### Vue Router

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  { path: '/users/:id', name: 'User', component: () => import('@/views/User.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

### Redux Toolkit

```javascript
// store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state) { state.value++ },
    decrement(state) { state.value-- }
  }
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

### Pinia

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
```

---

## 最佳实践

### ✅ 推荐做法

```jsx
// React
// 1. 使用函数组件和 Hooks
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// 2. 使用片段
function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

// 3. 使用解构 props
function Welcome({ name, age }) {
  return <div>{name} - {age}</div>;
}

// 4. 使用 key
items.map(item => <li key={item.id}>{item.name}</li>);
```

```vue
<!-- Vue -->
<!-- 1. 使用 script setup -->
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<!-- 2. 使用 v-bind 简写 -->
<button :disabled="isDisabled">提交</button>

<!-- 3. 使用事件修饰符 -->
<form @submit.prevent="handleSubmit">

<!-- 4. 使用 v-for key -->
<li v-for="item in items" :key="item.id">{{ item.name }}</li>
```

### ❌ 避免做法

```jsx
// React
// 1. 避免在 JSX 中使用 index 作为 key
items.map((item, index) => <li key={index}>{item.name}</li>); // ❌

// 2. 避免直接修改 state
state.items.push(newItem); // ❌
setItems([...items, newItem]); // ✅

// 3. 避免在 useEffect 中忘记添加依赖
useEffect(() => {
  fetchData();
}, []); // 如果依赖其他变量，需要添加 // ❌
```

```vue
<!-- Vue -->
<!-- 1. 避免 v-for 和 v-if 一起使用 -->
<div v-for="item in items" v-if="item.active">  <!-- ❌ -->

<!-- 2. 避免直接修改 props -->
props.count++  <!-- ❌ -->

<!-- 3. 避免缺少 key -->
<li v-for="item in items">{{ item.name }}</li>  <!-- ❌ -->
```

---

## React vs Vue 对比

### 语法对比

| 特性 | React | Vue |
|------|-------|-----|
| 模板 | JSX | 模板语法 |
| 状态 | useState | ref/reactive |
| 副作用 | useEffect | onMounted/watch |
| 事件 | onClick | @click |
| 绑定 | value={name} | v-model="name" |
| 循环 | map | v-for |
| 条件 | && / ternary | v-if / v-show |

### 选择建议

| 场景 | 推荐框架 | 理由 |
|------|----------|------|
| 大型应用 | React | 生态成熟、灵活度高 |
| 中小型应用 | Vue | 开发效率高、易上手 |
| 跨平台 | React | React Native 支持 |
| 快速原型 | Vue | 配置简单、上手快 |
| 团队有 React 经验 | React | 降低学习成本 |
| 团队初学者多 | Vue | 学习曲线平缓 |

---

## 常见问题

### Q1: 应该先学 React 还是 Vue？

**答：**
- **Vue**：语法简单、文档友好、适合初学者
- **React**：生态成熟、就业需求大、适合进阶
- **建议**：根据目标选择，两者都有良好前景

### Q2: Hooks 和 Composition API 有什么区别？

**答：**
- **相似点**：都是为了解决逻辑复用问题
- **不同点**：
  - Hooks 基于函数组件
  - Composition API 基于 setup 函数
- **本质**：都是组合式 API 思想

### Q3: 何时使用状态管理？

**答：**
- 组件间需要共享状态
- 深层嵌套组件通信困难
- 需要全局状态（用户信息、主题等）
- 简单应用不需要，避免过度设计

---

## 学习资源

### 官方文档
- [React 官方文档](https://react.dev/)
- [Vue 官方文档](https://cn.vuejs.org/)
- [React Router](https://reactrouter.com/)
- [Vue Router](https://router.vuejs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Pinia](https://pinia.vuejs.org/)

### 学习教程
- [React 入门教程](https://react.dev/learn)
- [Vue.js 从入门到精通](https://cn.vuejs.org/guide/introduction.html)
- [React 实战教程](https://www.react tutorial.org/)

### 工具推荐
- [CodeSandbox](https://codesandbox.io/) - 在线 React 开发环境
- [StackBlitz](https://stackblitz.com/) - 在线 Vue 开发环境
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools) - React 调试工具
- [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools) - Vue 调试工具

---

## 浏览器兼容性

| 框架 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| React 18 | 61+ | 60+ | 12+ | 79+ |
| Vue 3 | 80+ | 75+ | 13+ | 80+ |
| React Router 6 | 61+ | 60+ | 12+ | 79+ |
| Vue Router 4 | 80+ | 75+ | 13+ | 80+ |

> 注：旧浏览器可通过 Babel 转译使用

---

**上一篇：** [← 07-engineering/](../07-engineering/)
**下一章：** [返回主 README](../README.md)
**开始学习：** [→ 01-前端框架](./01-前端框架.md)
