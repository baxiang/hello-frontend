# HTTP 与 Web 开发 ⭐⭐

> 从"怎么让 Node.js 响应网页请求"出发，理解 Express 框架

---

## 学习目标

学完本节，你能：
- 理解 HTTP 请求方法和状态码
- 用 Express 创建简单的 Web 服务器
- 掌握路由、中间件、RESTful API 设计
- 能独立编写 CRUD API

---

## 生活化比喻

**Express 中间件就像"餐厅服务流程"**：

```
顾客进门 = HTTP 请求进来
迎宾 → 点餐 → 做菜 → 上菜 → 结账 = 中间件链
每个环节处理完交给下一个环节（next()）

不同窗口 = 不同路由
GET = 看菜单（只读）
POST = 点新菜（创建）
PUT = 换整桌菜（替换）
DELETE = 取消订单（删除）
```

---

## 第一步：看看问题

你已经学会了 Node.js 的基础，现在想做一个能响应网页的服务器。

用原生 `http` 模块怎么做？

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.end('首页');
    } else if (req.url === '/about' && req.method === 'GET') {
        res.end('关于页');
    } else if (req.url === '/api/users' && req.method === 'POST') {
        // 解析请求体...
        res.end('创建用户');
    } else {
        res.statusCode = 404;
        res.end('找不到页面');
    }
});

server.listen(3000);
```

**发现问题了吗？**

- 每个路由都要写 `if/else`
- 解析 JSON 请求体要自己处理
- 路由多了代码会非常混乱

---

## 第二步：Express 怎么解决？

Express 是一个 Web 框架，它让路由和中间件变得非常简单：

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('首页'));
app.get('/about', (req, res) => res.send('关于页'));
app.post('/api/users', (req, res) => res.json({ id: 1, name: '张三' }));

app.listen(3000);
```

同样的功能，代码量减少了一半，而且更易读。

---

## 第三步：试试 Express 基础

### 创建服务器

```javascript
const express = require('express');
const app = express();

// 解析 JSON 请求体（必加！）
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

### 路由

路由就是"什么 URL 对应什么处理函数"：

```javascript
// GET — 获取数据
app.get('/users', (req, res) => {
    res.json([{ id: 1, name: '张三' }]);
});

// POST — 创建数据
app.post('/users', (req, res) => {
    res.status(201).json({ id: Date.now(), ...req.body });
});
```

---

### 动手试试

创建一个文件 `server.js`：

```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello!' }));

app.listen(3000);
```

运行：`node server.js`，然后访问 `http://localhost:3000`。

---

## 第四步：路由参数和查询参数

### 路径参数（`:id`）

URL 里带动态值：

```javascript
app.get('/users/:id', (req, res) => {
    const id = req.params.id;  // 获取 :id 的值
    res.json({ id, name: '张三' });
});

// 访问 /users/123 → { id: '123', name: '张三' }
```

### 查询参数（`?key=value`）

URL 后面的 `?` 部分：

```javascript
app.get('/search', (req, res) => {
    const { q, page = 1, limit = 10 } = req.query;
    res.json({ query: q, page: Number(page), limit: Number(limit) });
});

// 访问 /search?q=node&page=2 → { query: 'node', page: 2, limit: 10 }
```

---

## 第五步：中间件 — Express 的核心

中间件就是**处理请求的函数**。它可以在请求到达路由之前做一些事情（比如记录日志、检查登录）。

### 最简单的中间件

```javascript
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();  // 交给下一个中间件
}

app.use(logger);  // 所有请求都会经过
```

### 认证中间件

```javascript
function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: '未授权' });
    req.user = { id: 1 };  // 把用户信息挂载到 req 上
    next();
}

// 只对特定路由生效
app.get('/profile', auth, (req, res) => {
    res.json(req.user);  // 能到这里说明已通过认证
});
```

### 404 和错误处理

```javascript
// 404 处理（放在所有路由之后）
app.use((req, res) => {
    res.status(404).json({ error: '页面不存在' });
});

// 错误处理（必须有 4 个参数）
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});
```

**重要：中间件的顺序很重要！** 先注册的先执行。

---

## 第六步：RESTful API 设计

RESTful 是一种 API 设计规范，核心思想是**用 URL 表示资源，用 HTTP 方法表示操作**。

### RESTful URL 设计

| 方法 | 路径 | 说明 | 状态码 |
|------|------|------|:---:|
| GET | `/api/users` | 获取用户列表 | 200 |
| GET | `/api/users/:id` | 获取单个用户 | 200 |
| POST | `/api/users` | 创建用户 | 201 |
| PUT | `/api/users/:id` | 完整更新 | 200 |
| DELETE | `/api/users/:id` | 删除用户 | 204 |

### 常见错误

```javascript
// ❌ 错误：URL 用动词
app.get('/getUsers', handler);
app.post('/createUser', handler);

// ✅ 正确：URL 用名词（资源）
app.get('/api/users', handler);
app.post('/api/users', handler);
```

### HTTP 状态码速查

| 状态码 | 含义 | 什么时候用 |
|--------|------|-----------|
| 200 | 成功 | GET/PUT 成功 |
| 201 | 已创建 | POST 创建成功 |
| 204 | 无内容 | DELETE 成功 |
| 400 | 请求错误 | 参数校验失败 |
| 401 | 未授权 | 没登录 |
| 403 | 禁止访问 | 权限不足 |
| 404 | 未找到 | 资源不存在 |
| 500 | 服务器错误 | 代码出 bug 了 |

---

## 第七步：完整 CRUD API

让我们把所有知识组合起来，写一个完整的图书管理 API：

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// 模拟数据库
let books = [
    { id: 1, title: 'JavaScript 高级程序设计', author: '张三' },
    { id: 2, title: 'Node.js 权威指南', author: '李四' }
];

// 列表
app.get('/api/books', (req, res) => res.json(books));

// 详情
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));
    book ? res.json(book) : res.status(404).json({ error: '书籍不存在' });
});

// 创建
app.post('/api/books', (req, res) => {
    const book = { id: Date.now(), ...req.body };
    books.push(book);
    res.status(201).json(book);
});

// 更新
app.put('/api/books/:id', (req, res) => {
    const idx = books.findIndex(b => b.id === Number(req.params.id));
    if (idx === -1) return res.status(404).json({ error: '不存在' });
    books[idx] = { ...books[idx], ...req.body };
    res.json(books[idx]);
});

// 删除
app.delete('/api/books/:id', (req, res) => {
    books = books.filter(b => b.id !== Number(req.params.id));
    res.status(204).send();
});

app.listen(3000);
```

测试：
```bash
# 获取列表
curl http://localhost:3000/api/books

# 创建
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title":"新书","author":"王五"}'
```

---

## 总结：速查表

| 概念 | 语法 | 示例 |
|------|------|------|
| GET 路由 | `app.get(path, handler)` | `app.get('/users', fn)` |
| POST 路由 | `app.post(path, handler)` | `app.post('/users', fn)` |
| 路径参数 | `req.params.id` | `/users/:id` |
| 查询参数 | `req.query.page` | `/users?page=1` |
| 中间件 | `app.use(fn)` | `app.use(express.json())` |
| 返回 JSON | `res.json(data)` | `res.json({ ok: true })` |
| 状态码 | `res.status(code)` | `res.status(201).json(data)` |

**记住：**
- URL 用名词（资源），不用动词
- 中间件顺序很重要，错误处理放最后
- POST 创建返回 201，DELETE 成功返回 204

---

## 实践练习

打开终端，试试完成以下练习：

### 练习：待办事项 API

```javascript
// 实现一个 Todo API，包含以下路由：
// GET /api/todos - 获取所有待办
// POST /api/todos - 创建待办（接收 { text: string }）
// PUT /api/todos/:id - 更新待办（切换 completed 状态）
// DELETE /api/todos/:id - 删除待办

const express = require('express');
const app = express();
app.use(express.json());

let todos = [];

// 补全路由...

app.listen(3000);
```

---

## 常见问题

### Q：Express 和原生 HTTP 模块选哪个？

**学习原理用原生 HTTP，生产项目用 Express（代码简洁、生态丰富）。**

### Q：如何处理跨域（CORS）？

```javascript
const cors = require('cors');
app.use(cors());  // 允许所有域名访问
```

### Q：中间件执行顺序重要吗？

**非常重要。中间件按注册顺序依次执行。错误处理中间件（4 个参数）必须放在最后。**

---

## 学习资源

- [Express 官方文档](https://expressjs.com/) ⭐ 官方文档
- [RESTful API 设计指南](https://restfulapi.net/)
