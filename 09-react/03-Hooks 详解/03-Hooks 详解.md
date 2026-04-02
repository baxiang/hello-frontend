# React Hooks 详解

> 掌握 React Hooks 的使用

## 学习目标

- ✅ 掌握 useState 和 useEffect
- ✅ 理解 useRef 和 useContext
- ✅ 学会 useCallback 和 useMemo
- ✅ 能够编写自定义 Hook

---

## 3.1 useState

### 基础用法

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

### 惰性初始化

```jsx
// 每次渲染都会执行
const [state, setState] = useState(computeInitialState());

// 只在首次渲染执行
const [state, setState] = useState(() => computeInitialState());
```

---

## 3.2 useEffect

### 基础用法

```jsx
import { useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 每次渲染后执行
  useEffect(() => {
    console.log('渲染完成');
  });

  // 只在首次渲染执行
  useEffect(() => {
    console.log('组件挂载');
  }, []);

  // count 变化时执行
  useEffect(() => {
    console.log('count 变化:', count);
  }, [count]);

  return <div>{count}</div>;
}
```

### 清理副作用

```jsx
function Timer() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('tick');
    }, 1000);

    // 清理函数
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>Timer</div>;
}
```

### 数据获取

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });

    // 取消请求的清理
    return () => {
      // abort request if needed
    };
  }, [userId]);

  if (loading) return <div>加载中...</div>;
  return <div>{user.name}</div>;
}
```

---

## 3.3 useRef

### 访问 DOM 元素

```jsx
import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} />;
}
```

### 保存任意值

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  const timerRef = useRef(null);

  const start = () => {
    timerRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerRef.current);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>开始</button>
      <button onClick={stop}>停止</button>
    </div>
  );
}
```

### ref vs state

| 特性 | ref | state |
|------|-----|-------|
| 更新触发渲染 | ❌ 不触发 | ✅ 触发 |
| 可变性 | ✅ 可直接修改 | ❌ 需要 setState |
| 用途 | DOM 引用、存储非渲染数据 | 存储渲染数据 |

---

## 3.4 useContext

### 创建和使用 Context

```jsx
import { createContext, useContext } from 'react';

// 创建 Context
const ThemeContext = createContext('light');

// Provider 组件
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

// Consumer 组件
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>按钮</button>;
}
```

### 自定义 Context Hook

```jsx
// contexts/ThemeContext.js
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 使用
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      当前主题: {theme}
    </button>
  );
}
```

---

## 3.5 useCallback

### 缓存函数

```jsx
import { useCallback } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // 每次渲染都创建新函数
  const handleClick1 = () => console.log('clicked');

  // 缓存函数，依赖不变时返回相同引用
  const handleClick2 = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <p>{count}</p>
      <Child onClick={handleClick2} />
    </div>
  );
}

// 配合 memo 使用
const Child = memo(function Child({ onClick }) {
  console.log('Child render');
  return <button onClick={onClick}>点击</button>;
});
```

---

## 3.6 useMemo

### 缓存计算结果

```jsx
import { useMemo } from 'react';

function ExpensiveComponent({ list, filter }) {
  // 每次渲染都重新计算
  const filtered1 = list.filter(item => item.type === filter);

  // 缓存计算结果
  const filtered2 = useMemo(() => {
    console.log('重新计算');
    return list.filter(item => item.type === filter);
  }, [list, filter]);

  return (
    <ul>
      {filtered2.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

### useCallback vs useMemo

```jsx
// useCallback: 缓存函数
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);

// useMemo: 缓存函数结果
const memoizedResult = useMemo(() => doSomething(a, b), [a, b]);

// useCallback 等价于
const memoizedCallback = useMemo(() => () => doSomething(a, b), [a, b]);
```

---

## 3.7 useReducer

### 复杂状态管理

```jsx
import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: action.payload };
    default:
      throw new Error();
  }
};

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset', payload: 0 })}>重置</button>
    </div>
  );
}
```

---

## 3.8 自定义 Hook

### 提取复用逻辑

```jsx
// 自定义 Hook：获取窗口大小
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// 使用
function App() {
  const { width, height } = useWindowSize();
  return <div>{width} x {height}</div>;
}
```

### 数据获取 Hook

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// 使用
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error.message}</div>;
  return <div>{data.name}</div>;
}
```

---

## 3.9 Hooks 规则

### 只在顶层调用

```jsx
// ❌ 错误：在循环中调用
for (let i = 0; i < 10; i++) {
  const [state, setState] = useState(i);
}

// ❌ 错误：在条件中调用
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ 正确：在顶层调用
const [state1, setState1] = useState(0);
const [state2, setState2] = useState(1);
if (condition) {
  // 使用 state
}
```

### 只在 React 函数中调用

```jsx
// ❌ 错误：在普通函数中调用
function handleClick() {
  useState(0); // 错误！
}

// ✅ 正确：在组件或自定义 Hook 中调用
function Component() {
  const [state, setState] = useState(0);
}

function useCustomHook() {
  const [state, setState] = useState(0);
}
```

---

## 3.10 常见问题

### Q1: useEffect 中如何正确使用 async？

```jsx
// ❌ 错误：直接使用 async
useEffect(async () => {
  const data = await fetch(url);
}, []);

// ✅ 正确：在内部定义 async 函数
useEffect(() => {
  async function fetchData() {
    const data = await fetch(url);
  }
  fetchData();
}, []);

// ✅ 正确：使用 IIFE
useEffect(() => {
  (async () => {
    const data = await fetch(url);
  })();
}, []);
```

### Q2: 如何避免无限循环？

```jsx
// ❌ 错误：依赖对象每次都是新引用
useEffect(() => {
  // ...
}, { name: 'test' }); // 每次渲染都是新对象

// ✅ 正确：使用 useMemo 缓存对象
const options = useMemo(() => ({ name: 'test' }), []);
useEffect(() => {
  // ...
}, options);
```

---

## 3.11 学习资源

- [React Hooks 官方文档](https://react.dev/reference/react)
- [useEffect 完整指南](https://overreacted.io/a-complete-guide-to-useeffect/)

---

**上一章：** [← 02-核心概念](../02-核心概念/02-核心概念.md)
**下一章：** [→ 04-组件模式](../04-组件模式/04-组件模式.md)