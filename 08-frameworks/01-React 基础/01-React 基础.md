# React 基础

> 掌握 React 组件和 Hooks

## 学习目标

- ✅ 掌握 React 组件基础
- ✅ 熟练使用常用 Hooks
- ✅ 理解组件生命周期

---

## 1.1 组件基础

### 函数组件

```jsx
import React from 'react';

// 函数组件
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

// 箭头函数组件
const Welcome = ({ name }) => {
    return <h1>Hello, {name}</h1>;
};

// 使用组件
function App() {
    return (
        <div>
            <Welcome name="张三" />
            <Welcome name="李四" />
        </div>
    );
}
```

### Props 和 Children

```jsx
// Props 传递
function Card({ title, content }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{content}</p>
        </div>
    );
}

// Children
function Container({ children }) {
    return <div className="container">{children}</div>;
}

// 使用
function App() {
    return (
        <Container>
            <Card title="标题" content="内容" />
        </Container>
    );
}
```

---

## 1.2 useState - 状态管理

```jsx
import React, { useState } from 'react';

// 基础用法
function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setCount(0)}>重置</button>
        </div>
    );
}

// 对象状态
function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
        </form>
    );
}

// 函数式更新
function Counter() {
    const [count, setCount] = useState(0);

    // 使用函数式更新确保基于最新状态
    const increment = () => {
        setCount(prev => prev + 1);
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+1</button>
        </div>
    );
}
```

---

## 1.3 useEffect - 副作用处理

```jsx
import React, { useState, useEffect } from 'react';

// 基础用法
function Example() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // 组件挂载后执行
        fetchData().then(setData);

        // 清理函数（组件卸载时执行）
        return () => {
            console.log('cleanup');
        };
    }, []); // 空数组表示只执行一次

    return <div>{data}</div>;
}

// 依赖项
function UserProfile({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // userId 变化时重新获取
        fetchUser(userId).then(setUser);
    }, [userId]); // 依赖 userId

    return <div>{user?.name}</div>;
}

// 清理订阅
function ChatRoom({ roomId }) {
    useEffect(() => {
        const connection = createConnection(roomId);
        connection.connect();

        return () => {
            connection.disconnect(); // 清理
        };
    }, [roomId]);

    return <div>Chat Room: {roomId}</div>;
}
```

---

## 1.4 其他常用 Hooks

### useReducer - 复杂状态

```jsx
import { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            return state;
    }
};

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <div>
            <p>{state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
        </div>
    );
}
```

### useCallback - 缓存函数

```jsx
import { useCallback } from 'react';

function Parent() {
    const [count, setCount] = useState(0);

    // 缓存函数，避免子组件不必要的重渲染
    const handleClick = useCallback(() => {
        console.log('clicked');
    }, []);

    return (
        <div>
            <p>{count}</p>
            <Child onClick={handleClick} />
        </div>
    );
}
```

### useMemo - 缓存计算结果

```jsx
import { useMemo } from 'react';

function ExpensiveComponent({ list }) {
    // 只在 list 变化时重新计算
    const filtered = useMemo(() => {
        console.log('filtering...');
        return list.filter(item => item.active);
    }, [list]);

    return <ul>{filtered.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
}
```

### useRef - 引用

```jsx
import { useRef, useEffect } from 'react';

function FocusInput() {
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return <input ref={inputRef} />;
}

// 保存任意值
function Timer() {
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            console.log('tick');
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    return <div>Timer</div>;
}
```

### useContext - 上下文

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <ThemedComponent />
        </ThemeContext.Provider>
    );
}

function ThemedComponent() {
    const theme = useContext(ThemeContext);
    return <div className={theme}>Themed</div>;
}
```

---

## 1.5 自定义 Hook

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

---

## 1.6 常见问题

### Q1: 为什么不能在循环中调用 Hooks？

Hooks 必须在组件顶层调用，React 依赖调用顺序来正确关联状态。

```jsx
// ❌ 错误
function Bad() {
    if (condition) {
        const [value, setValue] = useState(0); // 错误！
    }
}

// ✅ 正确
function Good() {
    const [value, setValue] = useState(0);
    if (condition) {
        // 使用 value
    }
}
```

### Q2: 如何优化组件性能？

```jsx
import { memo } from 'react';

// 使用 memo 避免不必要的重渲染
const Child = memo(function Child({ name }) {
    return <div>{name}</div>;
});
```

---

## 1.7 学习资源

- [React 官方文档](https://react.dev/)
- [React Hooks 文档](https://react.dev/reference/react)

---

**上一章：** [← README](../README.md)
**下一章：** [→ 02-Vue 基础](../02-Vue 基础/02-Vue 基础.md)