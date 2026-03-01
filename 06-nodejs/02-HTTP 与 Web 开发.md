# HTTP 与 Web 开发

## 学习目标
- 掌握原生 HTTP 模块的使用
- 学会使用 Express 构建 Web 服务
- 理解路由和中间件的工作原理
- 能够设计 RESTful API

---

## 2.1 原生 HTTP 模块

### 创建服务器

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // 设置响应头
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    // 发送响应
    res.end(JSON.stringify({ message: 'Hello World' }));
});

server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

### 处理不同路由

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    // 路由判断
    if (url === '/' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('首页');
    } else if (url === '/api/users' && method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify([{ id: 1, name: '张三' }]));
    } else if (url === '/api/users' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ id: Date.now(), ...data }));
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 未找到');
    }
});

server.listen(3000);
```

### 处理请求数据

```javascript
// 处理 GET 查询参数
const url = require('url');

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    console.log(query);  // { name: '张三', age: '25' }

    res.end(JSON.stringify(query));
});

// 处理 POST 请求体
http.createServer((req, res) => {
    if (req.method === 'POST') {
        const chunks = [];

        req.on('data', chunk => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            const body = Buffer.concat(chunks).toString();
            const data = JSON.parse(body);
            res.end(JSON.stringify({ received: data }));
        });
    }
});
```

---

## 2.2 Express 框架基础

### 快速开始

```javascript
// 安装：npm install express
const express = require('express');
const app = express();
const PORT = 3000;

// 基础路由
app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
```

### 中间件

```javascript
// 应用级中间件
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// 解析 JSON
app.use(express.json());

// 解析 URL 编码
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static('public'));

// 第三方中间件
const cors = require('cors');
app.use(cors());
```

---

## 2.3 路由详解

### 基础路由

```javascript
// GET 请求
app.get('/users', (req, res) => {
    res.send('获取用户列表');
});

// POST 请求
app.post('/users', (req, res) => {
    res.send('创建用户');
});

// PUT 请求
app.put('/users/:id', (req, res) => {
    res.send(`更新用户 ${req.params.id}`);
});

// DELETE 请求
app.delete('/users/:id', (req, res) => {
    res.send(`删除用户 ${req.params.id}`);
});

// 链式路由
app.route('/books')
    .get((req, res) => {
        res.send('获取图书列表');
    })
    .post((req, res) => {
        res.send('创建图书');
    });
```

### 路由参数

```javascript
// URL 参数
app.get('/users/:id', (req, res) => {
    res.send(`用户 ID: ${req.params.id}`);
});

// 多个参数
app.get('/users/:userId/posts/:postId', (req, res) => {
    const { userId, postId } = req.params;
    res.send(`用户 ${userId} 的文章 ${postId}`);
});

// 可选参数
app.get('/users/:id?', (req, res) => {
    if (req.params.id) {
        res.send(`用户 ${req.params.id}`);
    } else {
        res.send('用户列表');
    }
});

// 查询参数
app.get('/search', (req, res) => {
    const { q, page = 1, limit = 10 } = req.query;
    res.send({ query: q, page, limit });
});
```

### 路由通配符

```javascript
// 星号通配符
app.get('/admin/*', (req, res) => {
    res.send('管理员页面');
});

// 正则表达式
app.get(/^\/api\/v\d+\/users$/, (req, res) => {
    res.send('API 用户端点');
});
```

---

## 2.4 中间件详解

### 自定义中间件

```javascript
// 日志中间件
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
}

app.use(logger);

// 认证中间件
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: '缺少认证令牌' });
    }

    try {
        // const decoded = verifyToken(token);
        req.user = { id: 1, name: '张三' };
        next();
    } catch (error) {
        res.status(401).json({ error: '无效的令牌' });
    }
}

// 权限中间件
function requireRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: '权限不足' });
        }
        next();
    };
}

app.get('/admin', authMiddleware, requireRole('admin'), (req, res) => {
    res.send('管理员面板');
});
```

### 错误处理中间件

```javascript
// 404 处理
app.use((req, res, next) => {
    res.status(404).json({
        error: '未找到',
        message: `无法找到 ${req.originalUrl}`
    });
});

// 全局错误处理
app.use((err, req, res, next) => {
    console.error('错误:', err.stack);

    const status = err.status || 500;

    res.status(status).json({
        error: err.name || '服务器错误',
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 自定义错误类
class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = 'AppError';
    }
}

// 使用示例
app.get('/error', (req, res, next) => {
    next(new AppError(' Something went wrong', 400));
});
```

### 第三方中间件

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const app = express();

// 安全相关
app.use(helmet());  // 安全头
app.use(cors({      // 跨域
    origin: 'https://example.com',
    credentials: true
}));

// 日志
app.use(morgan('combined'));

// 限流
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 分钟
    max: 100  // 最多 100 个请求
});
app.use('/api/', limiter);

// 压缩
app.use(compression());
```

---

## 2.5 Express Router

### 基础用法

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
    res.json([{ id: 1, name: '张三' }]);
});

// POST /api/users
router.post('/', (req, res) => {
    res.status(201).json({ id: Date.now(), ...req.body });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
    res.json({ id: req.params.id, name: '张三' });
});

module.exports = router;

// app.js
const express = require('express');
const userRoutes = require('./routes/users');

const app = express();
app.use('/api/users', userRoutes);
```

### 模块化的路由结构

```javascript
// routes/index.js
const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const postRoutes = require('./posts');
const authRoutes = require('./auth');

// 挂载路由
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/auth', authRoutes);

// 首页
router.get('/', (req, res) => {
    res.json({
        message: 'API 首页',
        endpoints: {
            users: '/api/users',
            posts: '/api/posts',
            auth: '/api/auth'
        }
    });
});

module.exports = router;

// app.js
const express = require('express');
const routes = require('./routes');

const app = express();
app.use('/api', routes);
```

---

## 2.6 RESTful API 设计

### REST 原则

```javascript
// 资源命名规范
GET    /api/users          # 获取用户列表
POST   /api/users          # 创建用户
GET    /api/users/:id      # 获取单个用户
PUT    /api/users/:id      # 更新用户（全量）
PATCH  /api/users/:id      # 更新用户（部分）
DELETE /api/users/:id      # 删除用户

// 嵌套资源
GET    /api/users/:userId/posts     # 获取用户的所有文章
POST   /api/users/:userId/posts     # 为用户创建文章
GET    /api/posts/:id/comments      # 获取文章的评论

// 查询参数
GET /api/users?page=1&limit=10&sort=name&order=asc
GET /api/posts?author=1&status=published&tag=javascript
```

### 完整的 RESTful 实现

```javascript
const express = require('express');
const router = express.Router();

// 模拟数据库
let users = [
    { id: 1, name: '张三', email: 'zhang@example.com' },
    { id: 2, name: '李四', email: 'li@example.com' }
];

// GET /api/users - 获取所有用户
router.get('/users', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);

    const result = {
        users: users.slice(startIndex, endIndex),
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(users.length / limit),
            total: users.length
        }
    };

    res.json(result);
});

// GET /api/users/:id - 获取单个用户
router.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: '用户不存在' });
    }

    res.json(user);
});

// POST /api/users - 创建用户
router.post('/users', (req, res) => {
    const { name, email } = req.body;

    // 验证
    if (!name || !email) {
        return res.status(400).json({ error: 'name 和 email 是必填项' });
    }

    const newUser = {
        id: Date.now(),
        name,
        email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /api/users/:id - 全量更新
router.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: '用户不存在' });
    }

    const { name, email } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;

    res.json(user);
});

// PATCH /api/users/:id - 部分更新
router.patch('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ error: '用户不存在' });
    }

    // 只更新提供的字段
    Object.assign(user, req.body);

    res.json(user);
});

// DELETE /api/users/:id - 删除用户
router.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: '用户不存在' });
    }

    users.splice(index, 1);
    res.status(204).send();
});

module.exports = router;
```

### 状态码规范

```javascript
// 2xx 成功
200 OK          // 请求成功
201 Created     // 资源创建成功
204 No Content  // 删除成功，无返回内容

// 4xx 客户端错误
400 Bad Request       // 请求参数错误
401 Unauthorized      // 未授权
403 Forbidden         // 禁止访问
404 Not Found         // 资源不存在
409 Conflict          // 资源冲突（如重复）
422 Unprocessable     // 参数验证失败

// 5xx 服务器错误
500 Internal Server Error  // 服务器内部错误

// 使用示例
app.post('/api/users', async (req, res) => {
    // 验证失败
    if (!isValid) {
        return res.status(400).json({ error: '参数错误' });
    }

    // 资源已存在
    if (existing) {
        return res.status(409).json({ error: '用户已存在' });
    }

    // 创建成功
    res.status(201).json(user);
});
```

---

## 2.7 实践练习

### 练习 1：博客 API

```javascript
// app.js
const express = require('express');
const app = express();

app.use(express.json());

// 数据存储
const posts = [
    { id: 1, title: 'Hello World', content: '第一篇文章', author: '张三' }
];

// 获取所有文章
app.get('/api/posts', (req, res) => {
    const { author, limit = 10 } = req.query;
    let result = posts;

    if (author) {
        result = result.filter(p => p.author === author);
    }

    res.json(result.slice(0, limit));
});

// 获取单篇文章
app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));

    if (!post) {
        return res.status(404).json({ error: '文章不存在' });
    }

    res.json(post);
});

// 创建文章
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ error: '缺少必填字段' });
    }

    const newPost = {
        id: Date.now(),
        title,
        content,
        author,
        createdAt: new Date().toISOString()
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

// 更新文章
app.put('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));

    if (!post) {
        return res.status(404).json({ error: '文章不存在' });
    }

    Object.assign(post, req.body);
    res.json(post);
});

// 删除文章
app.delete('/api/posts/:id', (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ error: '文章不存在' });
    }

    posts.splice(index, 1);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('博客 API 运行在 http://localhost:3000');
});
```

### 练习 2：中间件系统

```javascript
// middleware/logger.js
function logger(req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });

    next();
}

module.exports = logger;

// middleware/validate.js
function validate(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                error: '验证失败',
                details: error.details.map(d => d.message)
            });
        }

        next();
    };
}

module.exports = validate;

// middleware/cache.js
const cache = new Map();

function cacheMiddleware(duration) {
    return (req, res, next) => {
        const key = req.originalUrl;
        const cached = cache.get(key);

        if (cached && Date.now() - cached.timestamp < duration) {
            return res.json(cached.data);
        }

        // 拦截响应
        const json = res.json.bind(res);
        res.json = (data) => {
            cache.set(key, { data, timestamp: Date.now() });
            return json(data);
        };

        next();
    };
}

module.exports = cacheMiddleware;

// 使用
const express = require('express');
const logger = require('./middleware/logger');
const validate = require('./middleware/validate');
const cache = require('./middleware/cache');

const app = express();
app.use(logger);

app.get('/api/data', cache(60000), (req, res) => {
    res.json({ data: 'cached for 1 minute' });
});
```

---

## 2.8 常见问答

### Q1: Express 和 Koa 如何选择？

**答：**
- **Express**: 成熟稳定，生态丰富，适合大多数项目
- **Koa**: 更现代化，基于 async/await，更轻量

```javascript
// Express
app.get('/', (req, res) => {
    res.send('Hello');
});

// Koa
app.use(async (ctx, next) => {
    ctx.body = 'Hello';
});
```

### Q2: 如何处理大文件上传？

```javascript
const multer = require('multer');

// 流式处理大文件
const upload = multer({
    storage: multer.createWriteStream({
        bucket: 'uploads',
        key: (file) => `${Date.now()}-${file.originalname}`
    }),
    limits: {
        fileSize: 100 * 1024 * 1024  // 100MB
    }
});

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filename: req.file.filename });
});
```

### Q3: 如何实现 API 版本控制？

```javascript
// URL 路径版本
app.use('/api/v1/users', userRoutesV1);
app.use('/api/v2/users', userRoutesV2);

// 请求头版本
app.use('/api/users', (req, res, next) => {
    const version = req.headers['api-version'] || 'v1';

    if (version === 'v2') {
        return userRoutesV2(req, res, next);
    }

    userRoutesV1(req, res, next);
});
```

---

## 2.9 学习资源

- [Express 官方文档](https://expressjs.com/)
- [RESTful API 设计最佳实践](https://github.com/vasanthk/restful-api-best-practices)
- [Node.js API 设计指南](https://github.com/elsewhencode/ultimate-backend)

---

**上一章：** [← 01-Node.js 基础](./01-Node.js 基础.md)
**下一章：** [→ 03-数据库集成](./03-数据库集成.md)
