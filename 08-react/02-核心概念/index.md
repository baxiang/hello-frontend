# React 核心概念 ⭐⭐

> Props、State 和组件通信

---

## 学习目标

- 深入理解 JSX 语法和组件定义
- 掌握 Props 数据传递和默认值
- 理解 State 状态管理和更新规则
- 学会父子组件通信

---

## 生活化比喻

**Props 和 State 就像"餐厅的点餐系统"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  餐厅点餐                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    Props = 顾客点的菜                                │
│    ─────────────                                     │
│    顾客（父组件）告诉厨房（子组件）要做什么菜        │
│    厨房不能自己改顾客的订单（Props 只读）            │
│                                                      │
│    State = 厨房内部的状态                            │
│    ─────────────                                     │
│    厨房里还有多少食材、灶台的温度                    │
│    厨房自己管理，可以改变                            │
│                                                      │
│    useState = 厨房计数器                             │
│    ─────────────                                     │
│    记着做了几道菜，数字变了就更新菜单显示            │
│    每次更新后重新展示                                │
│                                                      │
│    组件 = 厨房的档口                                 │
│    ─────────────                                     │
│    每个档口负责自己的菜（职责单一）                  │
│    档口之间通过订单（Props）交流                     │
│                                                      │
│    回调函数 = 厨房通知顾客                            │
│    ─────────────                                     │
│    顾客下单时留个电话（回调函数）                    │
│    菜好了打电话通知（子组件调用父组件的函数）        │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### Props 传递

**语法结构图：**

```
Props 使用：

父组件:       <Child name="张三" age={25} />
                          │      │
子组件:       function Child({ name, age }) { }
                         解构接收

默认值:       function Child({ name = '访客' }) { }
Children:     function Layout({ children }) { return <div>{children}</div> }
```

**最简示例（1-3行）：**

```jsx
function Greeting({ name }) { return <h1>Hello, {name}</h1> }
<Greeting name="张三" />
```

**详细示例：**

```jsx
// 定义组件
function UserCard({ name, age, email = '未设置' }) {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>年龄：{age}</p>
            <p>邮箱：{email}</p>
        </div>
    )
}

// 使用组件
function App() {
    return (
        <div>
            <UserCard name="张三" age={25} email="zhang@example.com" />
            <UserCard name="李四" age={30} /> {/* email 使用默认值 */}
        </div>
    )
}
```

---

### State 状态

**语法结构图：**

```
useState 结构：

const [state, setState] = useState(初始值)
       │        │             │
       │        │             └─ 初始值（只首次使用）
       │        └─ 更新函数
       └─ 当前值

更新方式:
  setState(newValue)          ← 直接设置
  setState(prev => newPrev)   ← 函数式更新（推荐依赖前值时）
```

**最简示例（1-3行）：**

```jsx
const [count, setCount] = useState(0)
<button onClick={() => setCount(c => c + 1)}>+1</button>
```

**详细示例：**

```jsx
// 基础状态
function Counter() {
    const [count, setCount] = useState(0)

    return (
        <div>
            <p>计数：{count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(0)}>重置</button>
        </div>
    )
}

// 对象状态
function Form() {
    const [user, setUser] = useState({ name: '', age: 0 })

    const updateName = (e) => {
        setUser(prev => ({ ...prev, name: e.target.value }))
    }

    return (
        <form>
            <input value={user.name} onChange={updateName} />
        </form>
    )
}

// 数组状态
function TodoList() {
    const [todos, setTodos] = useState([])

    const addTodo = (text) => {
        setTodos(prev => [...prev, { id: Date.now(), text }])
    }

    const removeTodo = (id) => {
        setTodos(prev => prev.filter(t => t.id !== id))
    }

    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                    {todo.text}
                    <button onClick={() => removeTodo(todo.id)}>删除</button>
                </li>
            ))}
        </ul>
    )
}
```

---

### 组件通信

**最简示例：**

```jsx
// 父传子：Props
<Child message="Hello" />

// 子传父：回调函数
<Child onSend={(data) => setData(data)} />
```

**详细示例：**

```jsx
// 父组件
function App() {
    const [data, setData] = useState('')

    return (
        <div>
            <p>来自子组件：{data}</p>
            <Child onSendData={setData} />
        </div>
    )
}

// 子组件
function Child({ onSendData }) {
    return (
        <button onClick={() => onSendData('子组件数据')}>
            发送数据
        </button>
    )
}
```

---

## L2 实践层：用好

### Props vs State

| 特性 | Props | State |
|------|------|-------|
| 来源 | 父组件传递 | 组件内部定义 |
| 可变性 | 只读 | 可变（通过 setState） |
| 用途 | 配置组件 | 存储动态数据 |
| 更新触发 | 父组件更新时 | setState 调用时 |

### 反模式：不要这样做

```jsx
// ❌ 错误：直接修改 state
state.count = state.count + 1

// ✅ 正确：使用 setState
setCount(count + 1)
```

```jsx
// ❌ 错误：setState 后立即读取
setCount(count + 1)
console.log(count)  // 还是旧值！

// ✅ 正确：用 useEffect 监听变化
useEffect(() => { console.log(count) }, [count])
```

```jsx
// ❌ 错误：v-if 和 v-for 类似用法（JSX 中）
{items.map((item, i) => item.active && <li key={i}>{item.name}</li>)}

// ✅ 正确：先过滤再 map
{items.filter(item => item.active).map(item => <li key={item.id}>{item.name}</li>)}
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 父传子数据 | Props | 单向数据流 |
| 子通知父 | 回调函数 | 子组件调用父组件传入的函数 |
| 组件内部数据 | useState | 触发重新渲染 |
| 复杂状态 | useReducer | 多操作集中管理 |
| 静态配置 | Props 默认值 | 减少父组件传参 |

---

## L3 专家层：深入

### State 更新机制

```
State 更新流程：

setCount(newVal)
    ↓
标记组件为"脏"
    ↓
React 批量收集更新
    ↓
重新渲染组件（调用函数）
    ↓
比较新旧虚拟 DOM（Diff）
    ↓
最小化更新真实 DOM

关键：
1. setState 是异步的（批量更新）
2. 同一事件中的多次 setState 会合并
3. 函数式更新保证获取最新值
```

### 知识关联

```
核心概念关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  JSX 语法   │────→│  组件定义   │────→│  Props 传递 │
│  表达式/    │     │  函数组件/  │     │  父→子/     │
│  属性/      │     │  Fragment   │     │  默认值     │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                              ↓
                                       ┌─────────────┐
                                       │  State 状态 │
                                       │  useState/  │
                                       │  更新规则   │
                                       └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **Props** | 父组件传递给子组件的只读数据 | `<Child name="张三" />` |
| **State** | 组件内部的可变数据 | `const [count, setCount] = useState(0)` |
| **函数式更新** | setState 接收函数，参数为前一个状态 | `setCount(prev => prev + 1)` |
| **Children** | 组件标签内的内容 | `<Card><p>内容</p></Card>` |
| **组件通信** | 父子组件之间传递数据和事件的方式 | Props + 回调函数 |
| **单向数据流** | 数据只能从父组件流向子组件 | React 核心设计原则 |

---

## 实践练习

### 练习：计数器 + 用户表单

```jsx
import { useState } from 'react'

// 子组件：可复用按钮
function Button({ text, onClick, type = 'primary' }) {
    return (
        <button className={`btn btn-${type}`} onClick={onClick}>
            {text}
        </button>
    )
}

// 主组件
function App() {
    const [users, setUsers] = useState([])
    const [form, setForm] = useState({ name: '', email: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name.trim()) return
        setUsers([...users, { id: Date.now(), ...form }])
        setForm({ name: '', email: '' })
    }

    return (
        <div>
            <h1>用户管理</h1>
            <form onSubmit={handleSubmit}>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="姓名" />
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="邮箱" />
                <Button text="添加" type="primary" onClick={() => {}} />
            </form>
            <ul>
                {users.map(u => <li key={u.id}>{u.name} - {u.email}</li>)}
            </ul>
        </div>
    )
}

export default App
```

---

## 常见问题

### Q1：为什么不能直接修改 State？

**直接修改不会触发重新渲染，React 检测不到变化：**

```jsx
// ❌ 错误
state.count = 5  // 不会重新渲染

// ✅ 正确
setCount(5)  // 触发重新渲染
```

### Q2：State 更新后为什么读不到新值？

**setState 是异步的，新值在下一次渲染时才生效：**

```jsx
const handleClick = () => {
    setCount(count + 1)
    console.log(count)  // 旧值！
}

// 解决 1：用 useEffect
useEffect(() => { console.log(count) }, [count])

// 解决 2：用函数式更新
setCount(prev => { console.log(prev + 1); return prev + 1 })
```

### Q3：useState 和 useReducer 选哪个？

```jsx
// 简单状态 → useState
const [count, setCount] = useState(0)

// 复杂状态（多个子值、下一个状态依赖前一个、逻辑复杂）→ useReducer
const [state, dispatch] = useReducer(reducer, initialState)
```

---

## 学习资源

- [React 官方文档 - 组件](https://react.dev/learn/your-first-component) ⭐ 官方权威
- [React 官方文档 - State](https://react.dev/learn/state-a-components-memory)
- [React 官方文档 - Props](https://react.dev/learn/passing-props-to-a-component)
