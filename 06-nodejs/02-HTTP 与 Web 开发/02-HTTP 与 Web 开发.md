# HTTP 与 Web 开发

> 掌握 HTTP 协议和 Express 框架，构建 Web 服务和 RESTful API

## 学习目标

- ✅ 掌握原生 HTTP 模块的使用
- ✅ 学会使用 Express 构建 Web 服务
- ✅ 理解路由和中间件的工作原理
- ✅ 能够设计 RESTful API

---

## 2.1 什么是 HTTP？

### 2.1.1 HTTP 简介

```
┌─────────────────────────────────────────────────────────────┐
│  HTTP = 超文本传输协议                                       │
│                                                             │
│  就像：                                                     │
│  - 快递公司：负责运输货物（数据）                            │
│  - 邮政系统：负责寄送信件（请求/响应）                       │
│  - 餐厅服务员：记录点餐和上菜（请求和响应）                  │
│                                                             │
│  工作流程：                                                 │
│  1. 客户端（浏览器）发起请求                                 │
│  2. 服务器处理请求                                          │
│  3. 服务器返回响应                                          │
│  4. 客户端显示结果                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.1.2 HTTP 请求方法

| 方法 | 说明 | 用途 |
|------|------|------|
| GET | 获取数据 | 浏览网页、查询数据 |
| POST | 创建数据 | 注册用户、提交表单 |
| PUT | 完整更新 | 更新整个资源 |
| PATCH | 部分更新 | 更新部分字段 |
| DELETE | 删除数据 | 删除用户、删除文章 |

**生活例子：**

```
GET    → 图书馆借书（只看不拿走）
POST   → 图书馆办新卡（创建新身份）
PUT    → 图书馆换整本书（完整替换）
PATCH  → 图书馆续借（部分更新）
DELETE → 图书馆注销卡（删除身份）
```

### 2.1.3 HTTP 状态码

```
┌─────────────────────────────────────────────────────────────┐
│  状态码 = 服务器的"回复语"                                  │
│                                                             │
│  1xx - 信息响应                                             │
│  - 100: 继续请求                                            │
│                                                             │
│  2xx - 成功响应                                             │
│  - 200: 成功                                                │
│  - 201: 已创建                                              │
│  - 204: 无内容                                              │
│                                                             │
│  3xx - 重定向                                               │
│  - 301: 永久重定向                                          │
│  - 302: 临时重定向                                          │
│                                                             │
│  4xx - 客户端错误                                           │
│  - 400: 请求错误                                            │
│  - 401: 未授权                                              │
│  - 403: 禁止访问                                            │
│  - 404: 未找到                                              │
│                                                             │
│  5xx - 服务器错误                                           │
│  - 500: 服务器内部错误                                       │
│  - 503: 服务不可用                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2.2 原生 HTTP 模块

### 2.2.1 创建服务器

```javascript
const http = require('http');

// 创建服务器
const server = http.createServer((req, res) => {
    // req = 请求对象（客户端发来的）
    // res = 响应对象（我们要返回的）
    
    // 设置响应头
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    // 发送响应
    res.end(JSON.stringify({ message: 'Hello World' }));
});

// 监听端口
server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

### 2.2.2 请求对象详解

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // 请求方法
    console.log(req.method);  // GET, POST, PUT, DELETE
    
    // 请求 URL
    console.log(req.url);  // /api/users
    
    // 请求头
    console.log(req.headers);
    // {
    //   'host': 'localhost:3000',
    //   'content-type': 'application/json',
    //   'authorization': 'Bearer token'
    // }
    
    // 请求体（需要监听 data 事件）
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        console.log(data);
    });
    
    res.end('OK');
});

server.listen(3000);
```

### 2.2.3 处理不同路由

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // 解析 URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const method = req.method;
    
    // 设置通用响应头
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // 路由判断
    if (pathname === '/' && method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: '欢迎来到首页' }));
        
    } else if (pathname === '/api/users' && method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify([
            { id: 1, name: '张三' },
            { id: 2, name: '李四' }
        ]));
        
    } else if (pathname === '/api/users' && method === 'POST') {
        // 处理 POST 请求
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            res.statusCode = 201;
            res.end(JSON.stringify({ 
                id: Date.now(), 
                ...data 
            }));
        });
        
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: '未找到' }));
    }
});

server.listen(3000);
```

---

## 2.3 Express 框架

### 2.3.1 什么是 Express？

```
┌─────────────────────────────────────────────────────────────┐
│  Express = Node.js 的 Web 框架                              │
│                                                             │
│  就像：                                                     │
│  - 汽车的框架：提供基础结构，组装零件                        │
│  - 建筑的骨架：提供支撑，填充墙壁                            │
│  - 乐高的底板：提供基础，搭建模型                            │
│                                                             │
│  优点：                                                     │
│  - 简单易学                                                 │
│  - 灵活扩展                                                 │
│  - 中间件丰富                                               │
│  - 社区活跃                                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.3.2 快速开始

```bash
# 安装 Express
npm install express
```

```javascript
const express = require('express');
const app = express();

// 中间件（解析 JSON）
app.use(express.json());

// 路由
app.get('/', (req, res) => {
    res.send('Hello Express!');
});

// 启动服务器
app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

### 2.3.3 路由详解

```javascript
const express = require('express');
const app = express();

// GET 请求
app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: '张三' },
        { id: 2, name: '李四' }
    ]);
});

// POST 请求
app.post('/users', (req, res) => {
    // req.body 包含请求体数据
    const newUser = req.body;
    console.log('创建用户:', newUser);
    
    res.status(201).json({
        id: Date.now(),
        ...newUser
    });
});

// PUT 请求（完整更新）
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    res.json({ id, ...data, updatedAt: new Date() });
});

// PATCH 请求（部分更新）
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    res.json({ id, ...updates });
});

// DELETE 请求
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `用户 ${id} 已删除` });
});
```

### 2.3.4 路由参数

```javascript
// 路径参数
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ userId: id });
});

// 多个参数
app.get('/users/:userId/posts/:postId', (req, res) => {
    const { userId, postId } = req.params;
    res.json({ userId, postId });
});

// 可选参数
app.get('/users/:id?', (req, res) => {
    if (req.params.id) {
        res.json({ userId: req.params.id });
    } else {
        res.json({ users: [] });
    }
});

// 查询参数
app.get('/search', (req, res) => {
    const { q, page = 1, limit = 10 } = req.query;
    res.json({ query: q, page: Number(page), limit: Number(limit) });
});
```

---

## 2.4 中间件详解

### 2.4.1 什么是中间件？

```
┌─────────────────────────────────────────────────────────────┐
│  中间件 = 请求处理的"流水线"                                 │
│                                                             │
│  就像：                                                     │
│  - 安检流程：检查行李 → 检查身份 → 检查体温                  │
│  - 工厂流水线：原料 → 加工 → 质检 → 包装                    │
│  - 餐厅流程：迎宾 → 点餐 → 烹饪 → 上菜                      │
│                                                             │
│  中间件的作用：                                              │
│  - 预处理请求                                               │
│  - 记录日志                                                 │
│  - 验证身份                                                 │
│  - 错误处理                                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.4.2 中间件的执行流程

```
请求 → 中间件1 → 中间件2 → 中间件3 → 路由处理 → 响应
              ↓
         如果调用 next()
         继续下一个中间件
```

### 2.4.3 自定义中间件

```javascript
const express = require('express');
const app = express();

// 日志中间件
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();  // 继续传递给下一个中间件
}

app.use(logger);

// 认证中间件
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: '缺少认证令牌' });
    }
    
    try {
        // 验证 token（实际项目中需要解码）
        req.user = { id: 1, name: '张三', role: 'admin' };
        next();
    } catch (error) {
        res.status(401).json({ error: '无效的令牌' });
    }
}

// 权限中间件（高阶函数）
function requireRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: '权限不足' });
        }
        next();
    };
}

// 使用中间件
app.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
});

app.get('/admin', authMiddleware, requireRole('admin'), (req, res) => {
    res.json({ message: '管理员面板' });
});
```

### 2.4.4 错误处理中间件

```javascript
const express = require('express');
const app = express();

// 404 处理（放在所有路由后面）
app.use((req, res, next) => {
    res.status(404).json({
        error: '未找到',
        message: `无法找到 ${req.originalUrl}`
    });
});

// 全局错误处理（必须 4 个参数）
app.use((err, req, res, next) => {
    console.error('错误:', err.stack);
    
    const status = err.status || 500;
    
    res.status(status).json({
        error: err.name || '服务器错误',
        message: err.message,
        // 生产环境不显示堆栈
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});
```

---

## 2.5 RESTful API 设计

### 2.5.1 什么是 RESTful？

```
┌─────────────────────────────────────────────────────────────┐
│  REST = 表现层状态转换                                       │
│                                                             │
│  RESTful = 遵循 REST 规范的 API 设计风格                     │
│                                                             │
│  核心原则：                                                  │
│  1. 资源导向：URL 代表资源，不是动作                         │
│  2. 统一接口：使用标准的 HTTP 方法                           │
│  3. 无状态：每个请求都是独立的                                │
│  4. 分层系统：客户端不需要知道服务器细节                     │
│                                                             │
│  就像：                                                     │
│  - 图书馆：图书是资源，借书是操作                            │
│  - 字典：单词是资源，查询是操作                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.5.2 RESTful URL 设计

```
┌─────────────────────────────────────────────────────────────┐
│                    RESTful URL 规范                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  资源       │  GET(查)  │ POST(创) │ PUT(改) │ DELETE(删)  │
│  ──────────┼───────────┼──────────┼─────────┼────────────  │
│  /users    │ 获取用户列表│ 创建用户 │ 批量更新 │ 删除所有用户│
│  /users/1  │ 获取用户1   │    -     │ 更新用户1│ 删除用户1  │
│  /users/1/posts │ 获取用户的帖子 │ 为用户创建帖子 │ - │ -    │
│                                                             │
│  注意事项：                                                 │
│  - 资源名用复数                                             │
│  - 用 / 表示层级关系                                        │
│  - 避免使用动词                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.5.3 RESTful API 示例

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// 模拟数据
let users = [
    { id: 1, name: '张三', email: 'zhang@example.com' },
    { id: 2, name: '李四', email: 'li@example.com' }
];

// 获取所有用户
app.get('/api/users', (req, res) => {
    res.json(users);
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id));
    if (!user) {
        return res.status(404).json({ error: '用户不存在' });
    }
    res.json(user);
});

// 创建用户
app.post('/api/users', (req, res) => {
    const newUser = {
        id: Date.now(),
        ...req.body
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 更新用户
app.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: '用户不存在' });
    }
    
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    users = users.filter(u => u.id !== id);
    res.status(204).send();
});

app.listen(3000);
```

---

## 2.6 实践练习

### 练习 1：创建简单的 API

```javascript
const express = require('express');
const app = express();
app.use(express.json());

// 书籍数据
let books = [
    { id: 1, title: 'JavaScript 高级程序设计', author: '张三' },
    { id: 2, title: 'Node.js 权威指南', author: '李四' }
];

// GET /books - 获取所有书籍
app.get('/books', (req, res) => {
    res.json(books);
});

// GET /books/:id - 获取单本书
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));
    if (!book) {
        return res.status(404).json({ error: '书籍不存在' });
    }
    res.json(book);
});

// POST /books - 添加书籍
app.post('/books', (req, res) => {
    const newBook = {
        id: Date.now(),
        ...req.body
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// DELETE /books/:id - 删除书籍
app.delete('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    books = books.filter(b => b.id !== id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('图书 API 运行在 http://localhost:3000');
});
```

---

## 2.7 常见问答

### Q1: Express 和原生 HTTP 模块怎么选择？

```javascript
// 原生 HTTP：简单、灵活
// 适合：学习原理、微型项目

const http = require('http');
http.createServer((req, res) => {
    res.end('Hello');
});

// Express：功能强大、生态丰富
// 适合：生产项目、需要路由和中间件

const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello'));
```

### Q2: 中间件的执行顺序？

```javascript
// 顺序很重要！
app.use(middleware1);  // 先执行
app.use(middleware2);  // 后执行
app.get('/path', handler);  // 最后执行

// 场景：先验证身份，再记录日志
app.use(authMiddleware);  // 先验证
app.use(loggerMiddleware); // 后记录
```

### Q3: 如何处理跨域请求？

```javascript
// 安装 cors 中间件
// npm install cors

const cors = require('cors');
app.use(cors());

// 或者手动设置
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
```

---

## 2.8 学习资源

### 官方文档

- [Express 官网](https://expressjs.com/)
- [Express 中文文档](https://expressjs.com/zh-cn/)

---

**上一章：** [← 01-Node.js 基础](./01-Node.js%20基础.md)  
**下一章：** [→ 03-数据库集成](./03-数据库集成.md)