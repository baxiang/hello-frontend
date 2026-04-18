# HTTP 与 Web 开发 ⭐⭐

> HTTP 协议、Express 框架、路由、中间件、RESTful API

---

## 学习目标

- 理解 HTTP 请求方法和状态码
- 掌握 Express 框架的路由和中间件机制
- 能够设计 RESTful API

---

## 生活化比喻

**Express 中间件就像"餐厅服务流程"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  餐厅服务流程                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│    HTTP 请求 = 顾客进门                               │
│    ─────────────                                     │
│    GET = 看菜单（只看不拿）                          │
│    POST = 点新菜（创建订单）                         │
│    PUT = 换整桌菜（全部替换）                        │
│    DELETE = 取消订单（删除）                         │
│                                                      │
│    中间件 = 服务环节                                  │
│    ─────────────                                     │
│    迎宾 → 点餐 → 做菜 → 上菜 → 结账                 │
│    每个环节处理完交给下一个环节                      │
│    中间环节发现问题可以打断流程                      │
│                                                      │
│    路由 = 不同的窗口                                  │
│    ─────────────                                     │
│    中餐窗口、西餐窗口、甜品窗口                      │
│    根据顾客去哪个窗口分配到对应处理                  │
│                                                      │
│    状态码 = 服务结果                                  │
│    ─────────────                                     │
│    200 = 服务完成                                    │
│    201 = 新菜已创建                                   │
│    404 = 菜单上没有这道菜                            │
│    500 = 厨房出事了                                  │
│                                                      │
│    RESTful API = 标准化点餐流程                      │
│    ─────────────                                     │
│    用统一的方式点菜、查菜、改菜、退菜                │
│    /菜单 → 看所有菜，/菜单/1 → 看第1道菜            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### Express 基础

**最简示例（1-3行）：**

```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello'));
app.listen(3000);
```

**详细示例：**

```javascript
const express = require('express');
const app = express();

// 解析 JSON 请求体
app.use(express.json());

// GET — 获取数据
app.get('/users', (req, res) => {
    res.json([{ id: 1, name: '张三' }]);
});

// POST — 创建数据
app.post('/users', (req, res) => {
    res.status(201).json({ id: Date.now(), ...req.body });
});

// PUT — 完整更新
app.put('/users/:id', (req, res) => {
    res.json({ id: req.params.id, ...req.body });
});

// DELETE — 删除
app.delete('/users/:id', (req, res) => {
    res.status(204).send();
});

app.listen(3000, () => console.log('http://localhost:3000'));
```

---

### 路由参数与查询参数

**最简示例（1-3行）：**

```javascript
app.get('/users/:id', (req, res) => res.json({ id: req.params.id }));
app.get('/search?q=node', (req, res) => res.json({ q: req.query.q }));
```

**详细示例：**

```javascript
// 路径参数
app.get('/users/:userId/posts/:postId', (req, res) => {
    const { userId, postId } = req.params;
    res.json({ userId, postId });
});

// 查询参数
app.get('/search', (req, res) => {
    const { q, page = 1, limit = 10 } = req.query;
    res.json({ query: q, page: Number(page), limit: Number(limit) });
});
```

---

### 中间件

**语法结构图：**

```
中间件执行流程：

请求 → 中间件1 → 中间件2 → 路由处理 → 响应
        next()    next()    res.send()

全局中间件:
  app.use(logger)     → 所有请求都经过

路由级中间件:
  app.get('/path', auth, handler)  → 只对该路由生效
```

**最简示例：**

```javascript
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}
app.use(logger);
```

**详细示例：**

```javascript
// 认证中间件
function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: '未授权' });
    req.user = { id: 1 };  // 挂载到 req
    next();
}

// 权限中间件（工厂函数）
function requireRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({ error: '权限不足' });
        next();
    };
}

// 使用
app.get('/profile', auth, (req, res) => res.json(req.user));
app.get('/admin', auth, requireRole('admin'), (req, res) => res.json({ ok: true }));

// 404 处理（放在所有路由后）
app.use((req, res) => res.status(404).json({ error: '未找到' }));

// 全局错误处理（4 个参数）
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});
```

---

## L2 实践层：用好

### RESTful URL 设计

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/users` | 获取用户列表 |
| GET | `/api/users/:id` | 获取单个用户 |
| POST | `/api/users` | 创建用户 |
| PUT | `/api/users/:id` | 完整更新用户 |
| PATCH | `/api/users/:id` | 部分更新 |
| DELETE | `/api/users/:id` | 删除用户 |

### 反模式：不要这样做

```javascript
// ❌ 错误：URL 用动词（不是资源导向）
app.get('/getUsers', handler);
app.post('/createUser', handler);

// ✅ 正确：URL 用名词（资源）
app.get('/api/users', handler);
app.post('/api/users', handler);
```

```javascript
// ❌ 错误：中间件顺序错误
app.get('/admin', handler);
app.use(auth);  // auth 在路由后面，不会执行

// ✅ 正确：中间件在路由之前
app.use(auth);
app.get('/admin', handler);
```

### HTTP 状态码速查

| 状态码 | 含义 | 适用场景 |
|--------|------|---------|
| 200 | 成功 | GET/PUT/PATCH 成功 |
| 201 | 已创建 | POST 创建资源 |
| 204 | 无内容 | DELETE 成功 |
| 400 | 请求错误 | 参数校验失败 |
| 401 | 未授权 | 缺少或无效 token |
| 403 | 禁止访问 | 权限不足 |
| 404 | 未找到 | 资源不存在 |
| 500 | 服务器错误 | 未预期的异常 |

---

## L3 专家层：深入

### 中间件原理

```
Express 中间件本质是一个链表：

app.use(mw1) → app.use(mw2) → app.get(path, handler)

每个中间件:
  function(req, res, next) {
    // 处理...
    next();  // 调用链表中的下一个
  }

错误处理中间件必须 4 个参数:
  function(err, req, res, next) { }
```

### 知识关联

```
HTTP 与 Web 关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  HTTP 协议  │────→│  Express    │────→│  RESTful    │
│  方法/      │     │  路由/      │     │  URL 设计/  │
│  状态码     │     │  中间件     │     │  状态码     │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **HTTP** | 超文本传输协议，客户端与服务器通信的规则 | GET、POST 等 |
| **中间件** | 处理请求的函数，可以访问 req/res 或终止请求 | `app.use(logger)` |
| **路由** | 根据 URL 和方法分发请求到对应处理函数 | `app.get('/users', fn)` |
| **RESTful** | 遵循 REST 规范的 API 设计风格 | 资源导向的 URL |
| **路径参数** | URL 中的动态部分 | `/users/:id` |
| **查询参数** | URL `?` 后的键值对 | `?page=1&limit=10` |

---

## 实践练习

### 练习：图书 RESTful API

```javascript
const express = require('express');
const app = express();
app.use(express.json());

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

---

## 常见问题

### Q1：Express 和原生 HTTP 模块怎么选择？

**学习原理用原生 HTTP，生产项目用 Express。**

### Q2：如何处理跨域？

```javascript
// 推荐：用 cors 中间件
const cors = require('cors');
app.use(cors());
```

### Q3：中间件执行顺序重要吗？

**非常重要。中间件按注册顺序依次执行，错误处理中间件（4 个参数）必须放在最后。**

---

## 学习资源

- [Express 官方文档](https://expressjs.com/) ⭐ 官方权威
- [RESTful API 设计指南](https://restfulapi.net/)
