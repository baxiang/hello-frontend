# React Hooks 详解 ⭐⭐⭐

> useState、useEffect、useRef、自定义 Hook

---

## 学习目标

- 掌握 useState 和 useEffect 的完整用法
- 理解 useRef 和 useContext 的使用场景
- 学会 useCallback、useMemo 性能优化
- 能够编写自定义 Hook 复用逻辑

---

## 生活化比喻

**Hooks 就像"给函数组件装工具箱"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  函数组件的工具箱                     │
├──────────────────────────────────────────────────────┤
│                                                      │
│    useState = 记事本                                 │
│    ─────────────                                     │
│    记下需要记住的数据，改了就会提醒（重新渲染）      │
│                                                      │
│    useEffect = 闹钟 + 打扫阿姨                       │
│    ─────────────                                     │
│    到时间了做某事，离开时清理现场                    │
│    闹钟 = 副作用执行                                  │
│    打扫 = 清理函数（return 的函数）                  │
│                                                      │
│    useRef = 储物柜                                   │
│    ─────────────                                     │
│    存东西不触发重新渲染                              │
│    可以存 DOM 引用、定时器 ID 等                     │
│                                                      │
│    useContext = 公共广播系统                          │
│    ─────────────                                     │
│    一个地方广播，所有组件都能收到                    │
│    不用一层层传递                                    │
│                                                      │
│    useCallback = 函数缓存箱                          │
│    ─────────────                                     │
│    同样的函数不用每次都新建                          │
│    配合 memo 避免子组件不必要渲染                    │
│                                                      │
│    useMemo = 计算结果缓存                            │
│    ─────────────                                     │
│    算过一次的结果存起来，输入不变就不重算            │
│                                                      │
│    自定义 Hook = 工具箱组合包                        │
│    ─────────────                                     │
│    把多个工具打包成一个，其他地方直接用              │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### useState

**最简示例（1-3行）：**

```jsx
const [count, setCount] = useState(0)
<button onClick={() => setCount(c => c + 1)}>+1</button>
```

**详细示例：**

```jsx
// 惰性初始化（只在首次执行）
const [data, setData] = useState(() => computeExpensiveValue())

// 对象状态
const [user, setUser] = useState({ name: '', age: 0 })
const updateName = (e) => setUser(prev => ({ ...prev, name: e.target.value }))

// 数组状态
const [items, setItems] = useState([])
const addItem = (item) => setItems(prev => [...prev, item])
const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))
```

---

### useEffect

**语法结构图：**

```
useEffect 结构：

useEffect(() => {
    // 副作用代码（请求、订阅、DOM操作）
    return () => { /* 清理函数（组件卸载/依赖变化时执行） */ }
}, [依赖数组])

依赖数组:
  []           → 只在首次渲染执行（挂载）
  [a, b]       → a 或 b 变化时执行
  不传         → 每次渲染都执行
```

**最简示例：**

```jsx
useEffect(() => { document.title = `计数: ${count}` }, [count])
useEffect(() => { const t = setInterval(tick, 1000); return () => clearInterval(t) }, [])
```

**详细示例：**

```jsx
// 数据获取
function UserProfile({ userId }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false
        setLoading(true)

        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => { if (!cancelled) setUser(data) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }  // 清理
    }, [userId])

    if (loading) return <div>加载中...</div>
    return <div>{user?.name}</div>
}

// 事件监听
function useWindowSize() {
    const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight })

    useEffect(() => {
        const handleResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return size
}
```

---

### useRef 与 useContext

**最简示例：**

```jsx
// useRef — DOM 引用 / 保存任意值
const inputRef = useRef(null)
useEffect(() => { inputRef.current.focus() }, [])

// useContext — 跨组件共享数据
const theme = useContext(ThemeContext)
```

**详细示例：**

```jsx
// useRef 保存不触发渲染的值
function Timer() {
    const [count, setCount] = useState(0)
    const timerRef = useRef(null)

    const start = () => { timerRef.current = setInterval(() => setCount(c => c + 1), 1000) }
    const stop = () => clearInterval(timerRef.current)

    return <div><p>{count}</p><button onClick={start}>开始</button><button onClick={stop}>停止</button></div>
}

// Context 完整示例
const ThemeContext = createContext('light')

function App() {
    const [theme, setTheme] = useState('light')
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ThemedButton />
        </ThemeContext.Provider>
    )
}

function ThemedButton() {
    const { theme, setTheme } = useContext(ThemeContext)
    return <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>当前: {theme}</button>
}
```

---

## L2 实践层：用好

### 常用 Hook 速查

| Hook | 用途 | 示例 |
|------|------|------|
| `useState` | 组件状态 | `const [x, setX] = useState(0)` |
| `useEffect` | 副作用（请求/订阅） | `useEffect(() => fetch(), [])` |
| `useRef` | DOM 引用 / 不触发渲染的值 | `const ref = useRef(null)` |
| `useContext` | 跨组件共享数据 | `const theme = useContext(Ctx)` |
| `useReducer` | 复杂状态管理 | `const [state, dispatch] = useReducer(r, i)` |
| `useCallback` | 缓存函数引用 | `useCallback(() => {}, [])` |
| `useMemo` | 缓存计算结果 | `useMemo(() => heavy(), [dep])` |

### 反模式：不要这样做

```jsx
// ❌ 错误：useEffect 中直接使用 async
useEffect(async () => { const data = await fetch(url) }, [])

// ✅ 正确：在内部定义 async 函数
useEffect(() => {
    async function fetch() { const data = await fetch(url) }
    fetch()
}, [])
```

```jsx
// ❌ 错误：在条件/循环中调用 Hook
if (condition) { const [x, setX] = useState(0) }

// ✅ 正确：在顶层调用
const [x, setX] = useState(0)
if (condition) { /* 使用 x */ }
```

```jsx
// ❌ 错误：useMemo 缓存原始值（浪费）
const x = useMemo(() => 5, [])

// ✅ 正确：直接声明
const x = 5

// ✅ useMemo 用于昂贵计算
const sorted = useMemo(() => list.sort(complexFn), [list])
```

### 适用场景

| 场景 | 推荐 Hook | 原因 |
|------|---------|------|
| 简单状态 | useState | 轻量易用 |
| 复杂状态（多 action） | useReducer | 逻辑集中 |
| 数据获取 | useEffect | 生命周期管理 |
| 保存定时器/DOM | useRef | 不触发渲染 |
| 全局主题/用户 | useContext | 避免 prop drilling |
| 传递给 memo 子组件的函数 | useCallback | 避免不必要渲染 |
| 昂贵计算 | useMemo | 缓存结果 |

---

## L3 专家层：深入

### useEffect 依赖项陷阱

```
依赖项规则：
1. effect 中用到的所有响应式值都应在依赖数组中
2. 对象/函数每次渲染都是新引用，会导致无限循环
3. 用 useCallback/useMemo 缓存后再放入依赖
```

```jsx
// ❌ 无限循环：options 每次都是新对象
const options = { page: 1 }
useEffect(() => { fetchData(options) }, [options])

// ✅ 正确：缓存对象
const options = useMemo(() => ({ page: 1 }), [])
useEffect(() => { fetchData(options) }, [options])
```

### useCallback vs useMemo

```jsx
// useCallback — 缓存函数本身
const handleClick = useCallback(() => doSomething(a, b), [a, b])

// useMemo — 缓存函数返回值
const result = useMemo(() => doSomething(a, b), [a, b])

// useCallback 等价于：
const handleClick = useMemo(() => () => doSomething(a, b), [a, b])
```

### 知识关联

```
Hooks 关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  useState   │────→│  useEffect  │────→│  useRef     │
│  状态管理   │     │  副作用     │     │  DOM/缓存值 │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │useContext│ │useMemo/  │ │自定义    │
        │全局共享  │ │useCallback│ │Hook     │
        └──────────┘ └──────────┘ └──────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **Hook** | 以 use 开头的函数，为函数组件添加状态等能力 | `useState`, `useEffect` |
| **副作用** | 组件渲染之外的操作（请求、DOM、订阅） | `useEffect` 中执行 |
| **清理函数** | useEffect 返回的函数，组件卸载或依赖变化时执行 | `return () => clearInterval(t)` |
| **依赖数组** | 控制 effect 执行时机的值列表 | `useEffect(() => {}, [dep])` |
| **惰性初始化** | useState 接收函数，只在首次执行 | `useState(() => compute())` |
| **自定义 Hook** | 以 use 开头的函数，组合多个 Hook | `function useFetch(url) {}` |
| **Prop Drilling** | 一层层传递 props 到深层组件 | 可通过 Context 避免 |

---

## 实践练习

### 练习：useFetch 自定义 Hook

```jsx
function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!url) return
        let cancelled = false
        setLoading(true)
        setError(null)

        fetch(url)
            .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() })
            .then(data => { if (!cancelled) setData(data) })
            .catch(err => { if (!cancelled) setError(err) })
            .finally(() => { if (!cancelled) setLoading(false) })

        return () => { cancelled = true }
    }, [url])

    return { data, loading, error }
}

// 使用
function UserProfile({ userId }) {
    const { data, loading, error } = useFetch(userId ? `/api/users/${userId}` : null)
    if (loading) return <div>加载中...</div>
    if (error) return <div>错误: {error.message}</div>
    return <div>{data?.name}</div>
}
```

---

## 常见问题

### Q1：useEffect 中如何处理 async？

**useEffect 的返回值必须是清理函数或 undefined，不能是 Promise：**

```jsx
// ❌ 错误
useEffect(async () => { await fetch(url) }, [])

// ✅ 正确：内部定义 async 函数
useEffect(() => {
    async function fetchData() { await fetch(url) }
    fetchData()
}, [])
```

### Q2：如何避免无限循环？

**确保依赖项不会每次渲染都创建新引用：**

```jsx
// ❌ 每次渲染都是新对象 → 无限循环
useEffect(() => { }, { name: 'test' })

// ✅ 缓存依赖
const options = useMemo(() => ({ name: 'test' }), [])
useEffect(() => { }, [options])
```

### Q3：useCallback 和 useMemo 什么时候用？

**只在传递给 memo 子组件或作为其他 Hook 依赖时才需要：**

```jsx
// 不需要：普通使用场景
const handleClick = () => console.log('click')

// 需要：传递给 memo 子组件
const Child = memo(({ onClick }) => <button onClick={onClick}>Click</button>)
const handleClick = useCallback(() => console.log('click'), [])
```

---

## 学习资源

- [React Hooks 官方文档](https://react.dev/reference/react) ⭐ 官方权威
- [A Complete Guide to useEffect](https://overreacted.io/a-complete-guide-to-useeffect/) ⭐ 深入理解
- [React 官方文档 - 自定义 Hook](https://react.dev/learn/reusing-logic-with-custom-hooks)
