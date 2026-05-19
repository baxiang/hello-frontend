# React 组件模式 ⭐⭐⭐

> 从"怎么复用这段逻辑"的疑问出发，理解 React 的高级组件模式

---

## 学习目标

学完本节，你能：
- 理解高阶组件（HOC）的原理和用法
- 掌握 Render Props 模式
- 学会编写自定义 Hook
- 理解 Compound Components（复合组件）模式

---

## 生活化比喻

**组件模式就像"厨房的模块化烹饪"**：

```
自定义 Hook = 预制调料包：
┌─────────────────────────────┐
│  把常用的逻辑打包           │
│  useLocalStorage = 万能酱料 │
│  哪里需要放哪里             │
└─────────────────────────────┘

HOC = 万能模具：
┌─────────────────────────────┐
│  把组件放进模具，出来就是特定形状 │
│  withAuth(Component) → 带认证的组件 │
└─────────────────────────────┘

Compound = 套餐组合：
┌─────────────────────────────┐
│  Select + Option 像套餐搭配 │
│  父组件和子组件有默契       │
└─────────────────────────────┘
```

---

## 第一步：看看问题

你有两个组件，都需要从 API 获取数据：

```jsx
function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/users')
            .then(r => r.json())
            .then(data => { setUsers(data); setLoading(false); });
    }, []);

    if (loading) return <div>加载中...</div>;
    return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/posts')
            .then(r => r.json())
            .then(data => { setPosts(data); setLoading(false); });
    }, []);

    if (loading) return <div>加载中...</div>;
    return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

**发现问题了吗？**

- 获取数据的逻辑几乎一模一样
- 如果以后要加错误处理、重试，两个组件都要改

**你需要一种方式：复用这段逻辑。**

---

## 第二步：自定义 Hook — 现代标准方案

自定义 Hook 是 React 推荐的逻辑复用方式。核心思想是**把逻辑抽到一个以 `use` 开头的函数里**。

```jsx
// useFetch.js
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(r => r.json())
            .then(data => { setData(data); setLoading(false); });
    }, [url]);

    return { data, loading };
}
```

现在组件变得非常简洁：

```jsx
function UserList() {
    const { data: users, loading } = useFetch('/api/users');

    if (loading) return <div>加载中...</div>;
    return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

function PostList() {
    const { data: posts, loading } = useFetch('/api/posts');

    if (loading) return <div>加载中...</div>;
    return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

**这就是自定义 Hook 的威力：一行代码复用逻辑。**

---

## 第三步：试试常用自定义 Hook

### useLocalStorage

```jsx
function useLocalStorage(key, initial) {
    const [value, setValue] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initial;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

// 使用
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

### useDebounce

```jsx
function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}

// 使用
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);
```

---

## 第四步：高阶组件（HOC）— 遗留方案

在自定义 Hook 出现之前，HOC 是主要的复用方式。

HOC 是一个函数，**接收一个组件，返回一个新组件**：

```jsx
function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const isAuthenticated = useAuth();
        if (!isAuthenticated) return <Login />;
        return <Component {...props} />;
    };
}

// 使用
const ProtectedDashboard = withAuth(Dashboard);
```

**为什么现在不推荐了？**
- 嵌套深时难调试（Wrapper hell）
- 静态类型推断困难
- 自定义 Hook 更简洁

---

## 第五步：Render Props — 灵活但啰嗦

Render Props 是通过 `render` 函数传递数据的模式：

```jsx
function Mouse({ render }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return render(pos);
}

// 使用
<Mouse render={pos => <div>位置：{pos.x}, {pos.y}</div>} />
```

**缺点：** 嵌套多了变成"回调地狱"。自定义 Hook 也能解决这个问题，且代码更清晰。

---

## 第六步：Compound Components — 组件组合模式

有些组件是"父子搭配"使用的，比如 `<Select>` 和 `<Option>`。

```jsx
function Select({ children, value, onChange }) {
    return (
        <div className="select">
            {React.Children.map(children, child =>
                React.cloneElement(child, { value, onChange })
            )}
        </div>
    );
}

function Option({ value, onChange, children }) {
    return <div onClick={() => onChange(value)}>{children}</div>;
}

// 组合
Select.Option = Option;

// 使用
<Select value={selected} onChange={setSelected}>
    <Select.Option value="react">React</Select.Option>
    <Select.Option value="vue">Vue</Select.Option>
</Select>
```

这种模式让 API 更语义化，用户自由组合子组件。

---

## 第七步：Provider 模式 — 全局状态

Provider 模式是 Context + useReducer 的组合，适合中等复杂度的全局状态。

```jsx
const CounterContext = createContext(null);

function CounterProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            {children}
        </CounterContext.Provider>
    );
}

function useCounter() {
    const ctx = useContext(CounterContext);
    if (!ctx) throw new Error('useCounter must be used within CounterProvider');
    return ctx;
}
```

---

## 总结：模式速查表

| 模式 | 适用场景 | 示例 |
|------|----------|------|
| **自定义 Hook** | 逻辑复用 | `useFetch`, `useLocalStorage` |
| **HOC** | 组件包装（遗留） | `withAuth`, `withTheme` |
| **Render Props** | 灵活渲染（遗留） | `<Mouse render={...}>` |
| **Compound** | 父子组件组合 | `<Select><Option>...</Option></Select>` |
| **Provider** | 全局状态 | `CounterProvider` |

**记住：**
- 逻辑复用优先用自定义 Hook
- 组件组合用 Compound Components
- HOC 和 Render Props 了解即可

---

## 实践练习

```jsx
// 练习：实现 Tabs 复合组件
// <Tabs value={active} onChange={setActive}>
//   <Tabs.Tab label="Home"><HomeContent /></Tabs.Tab>
//   <Tabs.Tab label="About"><AboutContent /></Tabs.Tab>
// </Tabs>
```

---

## 常见问题

### Q：自定义 Hook 和 HOC 选哪个？

**优先用自定义 Hook。代码更简洁，没有嵌套问题。**

### Q：什么时候用 Compound Components？

**当多个组件有紧密的父子关系，且需要共享状态时。比如 Select/Option、Tabs/Tab、Form/Input。**

### Q：Render Props 过时了吗？

**不是。但在自定义 Hook 普及后，使用场景变少了。适合需要灵活控制渲染的场景。**

---

## 学习资源

- [React 组件模式](https://reactpatterns.com/)
- [React Hooks 官方文档](https://react.dev/reference/react) ⭐ 官方文档
- [Compound Components 详解](https://kentcdodds.com/blog/compound-components-with-react-hooks)
