# React 状态管理 ⭐⭐

> 从"传参传了 5 层"的烦恼出发，理解 React 的状态管理方案

---

## 学习目标

学完本节，你能：
- 理解为什么需要全局状态管理
- 掌握 Context API 的使用
- 学会用 useReducer 处理复杂状态
- 掌握 Zustand 轻量级状态管理库

---

## 生活化比喻

**状态管理就像"公司的信息传递系统"**：

```
局部状态 (useState) = 个人便签：
┌─────────────────────────────┐
│  自己记自己的               │
│  不跟别人共享               │
│  const [count, setCount] = useState(0) │
└─────────────────────────────┘

Context = 公司公告板：
┌─────────────────────────────┐
│  信息贴在公共区域           │
│  所有员工都能看到           │
│  更新公告板，所有人自动看到新信息 │
└─────────────────────────────┘

Zustand = 智能办公系统：
┌─────────────────────────────┐
│  比公告板更聪明             │
│  只通知关心这个数据的人     │
│  不用 Provider 包裹         │
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

用 `useState` 怎么做？

```jsx
function App() {
    const [user, setUser] = useState({ name: '张三' });
    return <Header user={user} setUser={setUser} />;
}

function Header({ user, setUser }) {
    return <UserProfile user={user} setUser={setUser} />;
}

function UserProfile({ user, setUser }) {
    return <button onClick={() => setUser({ name: '李四' })}>改名</button>;
}
```

**发现问题了吗？**

- `Header` 根本不需要 `user` 和 `setUser`，只是透传
- 如果层级更深，透传代码会非常难看
- 这就是**"Prop Drilling"（属性透传）**问题

**你需要一种方式：让深层组件直接获取状态，不用一层层传。**

---

## 第二步：Context API 怎么解决？

Context 是 React 内置的全局状态方案。它像一个"公告板"，放在顶层，所有子组件都能直接读取。

```jsx
const UserContext = createContext();

function App() {
    const [user, setUser] = useState({ name: '张三' });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Header />
        </UserContext.Provider>
    );
}

function Header() {
    return <UserProfile />;  // 不需要传 props 了！
}

function UserProfile() {
    const { user, setUser } = useContext(UserContext);
    return <button onClick={() => setUser({ name: '李四' })}>改名</button>;
}
```

现在 `UserProfile` 直接从 `UserContext` 获取数据，跳过了 `Header`。

---

## 第三步：试试 Context

### 创建 Context

```jsx
import { createContext, useContext, useState } from 'react';

// 1. 创建 Context
const ThemeContext = createContext('light');

function App() {
    const [theme, setTheme] = useState('light');

    return (
        // 2. 用 Provider 包裹子组件
        <ThemeContext.Provider value={theme}>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

function Toolbar() {
    // 3. 子组件用 useContext 获取
    const theme = useContext(ThemeContext);
    return <div className={theme}>工具栏</div>;
}
```

---

### 动手试试

```jsx
import { createContext, useContext, useState } from 'react';

const CountContext = createContext();

function App() {
    const [count, setCount] = useState(0);
    return (
        <CountContext.Provider value={{ count, setCount }}>
            <Display />
            <Button />
        </CountContext.Provider>
    );
}

function Display() {
    const { count } = useContext(CountContext);
    return <p>计数：{count}</p>;
}

function Button() {
    const { setCount } = useContext(CountContext);
    return <button onClick={() => setCount(c => c + 1)}>+1</button>;
}
```

---

## 第四步：Context + useReducer — 处理复杂状态

当状态逻辑变复杂（比如多个相关状态），`useState` 就不够用了。

用 `useReducer`：

```jsx
import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.item];
        case 'REMOVE':
            return state.filter(i => i.id !== action.id);
        default:
            return state;
    }
}

function App() {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            <ProductList />
            <CartSummary />
        </CartContext.Provider>
    );
}
```

`useReducer` 的好处是**状态变更逻辑集中在 reducer 里**，组件只负责 dispatch action。

---

## 第五步：Zustand — 更简单的方案

Context 有个问题：**Context 值变化时，所有 useContext 的组件都会重新渲染**，即使它只用了值的一小部分。

**Zustand** 是一个轻量级状态库，解决了这个问题：

```bash
npm install zustand
```

### 基本使用

```jsx
import { create } from 'zustand';

// 1. 创建 Store
const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 }))
}));

// 2. 组件直接使用，不需要 Provider
function Counter() {
    const count = useStore(state => state.count);
    const increment = useStore(state => state.increment);

    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+1</button>
        </div>
    );
}
```

**关键优势：**
- 不需要 `Provider` 包裹
- 只订阅需要的状态，避免不必要的渲染
- 代码更简洁

---

## 第六步：Context vs Zustand 选哪个？

| 特性 | Context | Zustand |
|------|---------|---------|
| 依赖 | 内置 | 第三方库 |
| Provider | 需要 | 不需要 |
| 性能 | 值变化所有消费者重渲染 | 精确订阅，只渲染用到的组件 |
| 复杂度 | 简单状态够用，复杂需 useReducer | 简单复杂都好用 |

### 选择建议

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 主题、语言 | Context | 变化不频繁，内置够用 |
| 用户信息 | Context | 全局共享，变化少 |
| 购物车、表单 | Zustand | 频繁更新，需要精确渲染 |
| 大型应用 | Zustand | 模块化，DevTools 支持 |

---

## 第七步：最佳实践

### 1. 拆分 Store

不要把所有状态放在一个 Store 里。

```jsx
// ✅ 好的做法
const useUserStore = create(() => ({ ... }));
const useCartStore = create(() => ({ ... }));
const useThemeStore = create(() => ({ ... }));
```

### 2. 选择器订阅

只订阅需要的状态，避免全量更新。

```jsx
// ❌ 不好的做法：订阅整个 store
const count = useStore();

// ✅ 好的做法：只订阅 count
const count = useStore(state => state.count);
```

### 3. 异步 Action

Zustand 支持异步 action：

```jsx
const useUserStore = create((set) => ({
    user: null,
    login: async (username, password) => {
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        const user = await res.json();
        set({ user });
    }
}));
```

---

## 总结：速查表

| 方案 | 适用场景 | 示例 |
|------|----------|------|
| `useState` | 组件内部状态 | `const [x, setX] = useState(0)` |
| `Context` | 全局低频状态 | `<ThemeContext.Provider>` |
| `useReducer` | 复杂状态逻辑 | `const [state, dispatch] = useReducer(...)` |
| `Zustand` | 全局高频状态 | `const useStore = create(...)` |

**记住：**
- 简单状态用 `useState`
- 全局共享用 `Context` 或 `Zustand`
- 频繁更新用 `Zustand`
- 避免 Prop Drilling

---

## 实践练习

```jsx
// 练习：用 Zustand 实现 Todo 列表
// 1. 创建 useTodoStore
// 2. 包含 todos 数组，addTodo, toggleTodo, deleteTodo 方法
// 3. 在组件中使用

import { create } from 'zustand';

const useTodoStore = create((set) => ({
    todos: [],
    addTodo: (text) => set(state => ({
        todos: [...state.todos, { id: Date.now(), text, done: false }]
    })),
    toggleTodo: (id) => set(state => ({
        todos: state.todos.map(t => t.id === id ? { ...t, done: !t.done } : t)
    })),
    deleteTodo: (id) => set(state => ({
        todos: state.todos.filter(t => t.id !== id)
    }))
}));
```

---

## 常见问题

### Q：Context 和 Redux 选哪个？

**现代 React 项目推荐 Zustand 或 Redux Toolkit，Context 仅适合低频全局状态。**

### Q：Zustand 的 `set` 函数怎么更新深层对象？

**Zustand 默认浅合并。如果要更新深层对象，需手动合并：**

```jsx
set(state => ({
    user: { ...state.user, profile: { ...state.user.profile, name: 'New Name' } }
}));
```

### Q：Context 会导致性能问题吗？

**会。Context 值变化时，所有 useContext 的组件都会重渲染。可以用 `useMemo` 稳定引用，或拆分为多个 Context。**

---

## 学习资源

- [React Context 官方文档](https://react.dev/learn/passing-data-deeply-with-context) ⭐ 官方文档
- [Zustand 官方文档](https://zustand-demo.pmnd.rs/)
- [useReducer 文档](https://react.dev/reference/react/useReducer)
