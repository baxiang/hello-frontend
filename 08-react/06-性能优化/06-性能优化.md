# React 性能优化 ⭐⭐⭐

> 从"为什么改一个状态，整个页面都卡"的疑问出发，理解 React 渲染机制

---

## 学习目标

学完本节，你能：
- 理解 React 的渲染机制和性能瓶颈
- 掌握 React.memo、useMemo、useCallback 的使用场景
- 学会组件懒加载和代码分割
- 能够识别和优化不必要的渲染

---

## 生活化比喻

**性能优化就像"餐厅的效率管理"**：

```
默认渲染 = 每次来客人都重新做所有菜：
┌─────────────────────────────┐
│  客人 A 点了新菜            │
│  厨师把桌上所有菜都重做一遍  │
│  浪费时间和资源             │
└─────────────────────────────┘

React.memo = 熟客识别：
┌─────────────────────────────┐
│  熟客点的菜没变             │
│  直接上次的菜，不用重做     │
│  props 没变 → 跳过渲染      │
└─────────────────────────────┘

useMemo = 预加工食材：
┌─────────────────────────────┐
│  切好的菜放冰箱             │
│  下次直接用，不用重新切     │
│  计算结果缓存               │
└─────────────────────────────┘

useCallback = 固定菜单卡：
┌─────────────────────────────┐
│  菜单卡内容不变             │
│  厨房不用每次重做菜单       │
│  函数引用缓存               │
└─────────────────────────────┘
```

---

## 第一步：看看问题

React 默认的行为是：**只要父组件状态变了，它和所有子组件都会重新渲染**。

```jsx
function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>计数：{count}</button>
            <input value={text} onChange={e => setText(e.target.value)} />
            {/* 问题：输入文字时，ExpensiveList 也会重新渲染！ */}
            <ExpensiveList items={largeData} />
        </div>
    );
}
```

**发现问题了吗？**

- 输入框改变 `text`，触发了 `App` 重渲染
- `App` 重渲染导致 `ExpensiveList` 也重渲染
- 但 `ExpensiveList` 的 `items` 根本没变

**这浪费了性能，尤其当列表很大时，界面会卡顿。**

---

## 第二步：React.memo — 跳过不必要的渲染

`React.memo` 告诉 React："如果 props 没变，就不要重新渲染这个组件。"

```jsx
// 用 React.memo 包裹组件
const ExpensiveList = React.memo(({ items }) => {
    console.log('列表渲染');
    return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
});

function App() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>计数：{count}</button>
            <input value={text} onChange={e => setText(e.target.value)} />
            {/* 现在输入文字时，ExpensiveList 不会重渲染了！ */}
            <ExpensiveList items={largeData} />
        </div>
    );
}
```

---

### 动手试试

```jsx
import { useState, memo } from 'react';

const Child = memo(({ name }) => {
    console.log(`${name} 渲染`);
    return <div>{name}</div>;
});

function App() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>{count}</button>
            <Child name="Static Child" />
        </div>
    );
}
```

点击按钮时，观察控制台。`Child` 只渲染了一次，因为它没有接收变化的 props。

---

## 第三步：为什么 memo 有时候不起作用？

有时候你加了 `React.memo`，但组件还是重渲染了。

### 问题 1：Inline Functions（内联函数）

```jsx
// ❌ 每次渲染都创建新函数，props 变了，memo 失效
<Child onClick={() => doSomething()} />
```

**解决：用 `useCallback` 缓存函数引用。**

```jsx
// ✅ 函数引用不变，props 没变，memo 生效
const handleClick = useCallback(() => doSomething(), []);
<Child onClick={handleClick} />
```

### 问题 2：Inline Objects（内联对象）

```jsx
// ❌ 每次渲染都创建新对象
<Child config={{ theme: 'dark' }} />
```

**解决：用 `useMemo` 缓存对象。**

```jsx
// ✅ 对象引用不变
const config = useMemo(() => ({ theme: 'dark' }), []);
<Child config={config} />
```

---

## 第四步：useMemo — 缓存昂贵的计算

有时候组件渲染不快，但**渲染时的计算很慢**。

```jsx
function TodoList({ todos, filter }) {
    // ❌ 每次渲染都过滤，即使 todos 和 filter 没变
    const filtered = todos.filter(t => t.text.includes(filter));

    return <ul>{filtered.map(t => <li key={t.id}>{t.text}</li>)}</ul>;
}
```

用 `useMemo` 缓存计算结果：

```jsx
function TodoList({ todos, filter }) {
    // ✅ 只有 todos 或 filter 变化时才重新计算
    const filtered = useMemo(
        () => todos.filter(t => t.text.includes(filter)),
        [todos, filter]
    );

    return <ul>{filtered.map(t => <li key={t.id}>{t.text}</li>)}</ul>;
}
```

---

## 第五步：组件懒加载 — 按需加载代码

如果你的应用有很多页面，用户第一次打开时加载所有代码会很慢。

用 `lazy` 和 `Suspense` 实现**代码分割**：

```jsx
import { lazy, Suspense } from 'react';

// 只有访问这个路由时，才加载 About 组件的代码
const About = lazy(() => import('./About'));

function App() {
    return (
        <Suspense fallback={<div>加载中...</div>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Suspense>
    );
}
```

---

## 第六步：什么时候**不要**优化？

**过度优化比不优化更糟。**

### 不要优化简单组件

```jsx
// ❌ 没必要：简单组件渲染很快
const SimpleText = memo(({ text }) => <span>{text}</span>);

// ✅ 简单组件直接写
const SimpleText = ({ text }) => <span>{text}</span>;
```

### 不要缓存简单计算

```jsx
// ❌ 没必要：加法很快
const sum = useMemo(() => a + b, [a, b]);

// ✅ 直接计算
const sum = a + b;
```

### 优化建议

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 大型列表 | `React.memo` | 避免列表项重渲染 |
| 昂贵计算 | `useMemo` | 缓存计算结果 |
| 传递给 memo 子组件的函数 | `useCallback` | 保持引用稳定 |
| 非首屏组件 | `lazy` + `Suspense` | 减少首屏体积 |
| 简单组件/计算 | **不优化** | React 渲染本身很快 |

---

## 第七步：性能调试工具

怎么知道哪里慢了？用 **React DevTools Profiler**。

1. 安装 React DevTools 浏览器插件
2. 打开"Profiler"面板
3. 点击"记录"按钮，操作应用
4. 查看哪些组件渲染了，为什么渲染

---

## 总结：速查表

| 工具 | 用途 | 何时用 |
|------|------|--------|
| `React.memo` | 跳过子组件渲染 | Props 没变，但父组件重渲染时 |
| `useMemo` | 缓存计算结果 | 计算开销大 |
| `useCallback` | 缓存函数引用 | 传递给 memo 子组件 |
| `lazy` | 组件懒加载 | 减少首屏体积 |

**记住：**
- 先测量，再优化（不要盲目优化）
- `React.memo` 解决不必要的渲染
- `useMemo` / `useCallback` 解决引用变化导致 memo 失效
- 简单组件和计算不要优化

---

## 实践练习

```jsx
// 练习：优化一个慢列表
// 1. 用 React.memo 包裹列表项
// 2. 用 useMemo 过滤列表
// 3. 用 useCallback 缓存点击处理函数

function TodoList({ todos, filter, onToggle }) {
    const filtered = useMemo(
        () => todos.filter(t => t.text.includes(filter)),
        [todos, filter]
    );

    return (
        <ul>
            {filtered.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={useCallback(() => onToggle(todo.id), [onToggle, todo.id])}
                />
            ))}
        </ul>
    );
}
```

---

## 常见问题

### Q：`useMemo` 和 `useCallback` 有什么区别？

**`useMemo` 缓存值，`useCallback` 缓存函数。**

```jsx
const value = useMemo(() => computeExpensive(a, b), [a, b]);
const fn = useCallback(() => doSomething(a, b), [a, b]);
```

### Q：React.memo 一定会提升性能吗？

**不一定。`React.memo` 本身有比较 props 的开销。如果组件渲染很快，开销可能比优化收益还大。**

### Q：怎么判断哪里需要优化？

**用 React DevTools Profiler。不要凭感觉优化。**

---

## 学习资源

- [React 性能优化指南](https://react.dev/learn/render-and-commit) ⭐ 官方文档
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [React Profiler](https://react.dev/reference/react-devtools/profiler)
