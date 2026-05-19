# React 路由管理 ⭐⭐

> 从"怎么在不刷新页面的情况下切换内容"出发，理解 React Router

---

## 学习目标

学完本节，你能：
- 理解 SPA（单页应用）的路由原理
- 用 React Router v6 配置路由
- 处理动态路由和查询参数
- 实现路由守卫（权限控制）

---

## 生活化比喻

**React Router 就像"大楼的楼层导航系统"**：

```
传统网页 = 去不同的楼：
┌─────────────────────────────┐
│  去 A 楼 → 刷新 → 重新加载  │
│  去 B 楼 → 刷新 → 重新加载  │
│  每次都要从头开始           │
└─────────────────────────────┘

SPA 路由 = 同一栋楼的不同房间：
┌─────────────────────────────┐
│  去 101 室 → 只换房间内容   │
│  去 202 室 → 只换房间内容   │
│  大厅（导航栏）保持不变     │
└─────────────────────────────┘
```

---

## 第一步：看看问题

在传统的 HTML 网站里，点击链接会刷新整个页面：

```html
<!-- 传统方式：点击后会刷新页面，重新加载所有资源 -->
<a href="/about">关于</a>
```

**发现问题了吗？**

- 刷新页面很慢，用户体验差
- 页面状态丢失（比如填了一半的表单）
- 每次都要重新请求 CSS、JS、图片

**我们需要一种方式：只切换内容，不刷新页面。**

---

## 第二步：React Router 怎么解决？

React Router 的核心原理是**拦截点击事件，阻止默认刷新，用 JS 替换页面内容**。

安装：

```bash
npm install react-router-dom
```

### 最简单的路由

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}
```

`BrowserRouter` 是路由器，`Routes` 是路由列表，`Route` 是具体的路由规则。

---

## 第三步：试试基础路由

### 配置路由

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() { return <h1>首页</h1>; }
function About() { return <h1>关于</h1>; }
function NotFound() { return <h1>404 - 页面不存在</h1>; }

function App() {
    return (
        <BrowserRouter>
            <nav>
                {/* Link 组件：点击不刷新页面 */}
                <Link to="/">首页</Link>
                <Link to="/about">关于</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* * 匹配所有未定义的路由 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
```

**注意：** 用 `<Link>` 代替 `<a>`。`<Link>` 不会刷新页面，而是通过 JS 切换内容。

---

### 动手试试

创建一个新项目或组件：

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/about" element={<h1>About</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
```

---

## 第四步：动态路由和查询参数

### 路径参数（`:id`）

URL 里带动态值，比如 `/users/123`。

```jsx
function UserDetail() {
    const { id } = useParams();  // 获取 :id 的值
    return <h1>用户 ID: {id}</h1>;
}

<Route path="/users/:id" element={<UserDetail />} />
```

### 查询参数（`?key=value`）

URL 后面的 `?` 部分，比如 `/search?q=react`。

```jsx
function Search() {
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    return <h1>搜索：{q}</h1>;
}

<Route path="/search" element={<Search />} />
```

---

## 第五步：编程式导航

有时候你需要根据条件跳转，而不是点击链接。比如登录成功后跳转。

用 `useNavigate`：

```jsx
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        // 登录逻辑...
        navigate('/dashboard');  // 跳转到仪表盘
    };

    return <button onClick={handleLogin}>登录</button>;
}
```

**`navigate` vs `<Link>`：**
- `<Link>` 用于点击跳转。
- `navigate` 用于逻辑跳转（如表单提交后）。

---

## 第六步：路由守卫 — 权限控制

有些页面只有登录用户才能访问。

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const isAuthenticated = useAuth();  // 你的认证逻辑

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

// 使用
<Route path="/dashboard" element={
    <ProtectedRoute>
        <Dashboard />
    </ProtectedRoute>
} />
```

如果用户未登录，`<Navigate>` 会自动重定向到 `/login`。

---

## 第七步：嵌套路由 — 布局共享

很多页面有相同的侧边栏或头部。不用每个页面都写一遍，用**嵌套路由**。

```jsx
function DashboardLayout() {
    return (
        <div>
            <nav>
                <Link to="/dashboard/overview">概览</Link>
                <Link to="/dashboard/settings">设置</Link>
            </nav>
            {/* Outlet 是子路由渲染的位置 */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}

<Routes>
    <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="overview" element={<Overview />} />
        <Route path="settings" element={<Settings />} />
    </Route>
</Routes>
```

访问 `/dashboard/overview` 时：
- `DashboardLayout` 渲染
- `Outlet` 的位置渲染 `Overview`

---

## 总结：速查表

| 组件/Hook | 用途 | 示例 |
|-----------|------|------|
| `<BrowserRouter>` | 路由器容器 | `<BrowserRouter>...</BrowserRouter>` |
| `<Routes>` | 路由列表 | `<Routes>...</Routes>` |
| `<Route>` | 路由规则 | `<Route path="/" element={<Home />} />` |
| `<Link>` | 导航链接（不刷新） | `<Link to="/about">` |
| `useParams` | 获取路径参数 | `const { id } = useParams()` |
| `useNavigate` | 编程式导航 | `navigate('/dashboard')` |
| `<Navigate>` | 重定向 | `<Navigate to="/login" />` |
| `<Outlet>` | 嵌套路由渲染位 | 在 Layout 组件中使用 |

**记住：**
- 用 `<Link>` 代替 `<a>`
- 路径参数用 `useParams`，查询参数用 `useSearchParams`
- 权限控制用 `<Navigate>` 重定向

---

## 实践练习

```jsx
// 练习：实现一个简单的博客路由系统
// 1. 首页 (/) 显示文章列表
// 2. 文章详情 (/posts/:id) 显示文章内容
// 3. 404 页面 (*) 显示未找到
// 4. 点击文章标题跳转到详情

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 补全路由 */}
            </Routes>
        </BrowserRouter>
    );
}
```

---

## 常见问题

### Q：`<Link>` 和 `<a>` 有什么区别？

**`<Link>` 不刷新页面，只切换组件；`<a>` 会刷新整个页面。**

### Q：`useNavigate` 和 `navigate` 有什么区别？

**`useNavigate` 是 Hook，返回 `navigate` 函数。**

```jsx
const navigate = useNavigate();
navigate('/about');  // 跳转
navigate(-1);        // 后退
```

### Q：怎么处理 404 页面？

**用 `path="*"` 匹配所有未定义的路由，放在最后：**

```jsx
<Route path="*" element={<NotFound />} />
```

---

## 学习资源

- [React Router 官方文档](https://reactrouter.com/) ⭐ 官方文档
- [React Router 教程](https://reactrouter.com/en/main/start/tutorial)
