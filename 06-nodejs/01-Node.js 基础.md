# Node.js 基础

## 学习目标
- 理解 Node.js 运行时环境
- 掌握核心模块的使用
- 学会使用 Express 构建 Web 服务
- 了解数据库集成和 API 开发

---

## 7.1 Node.js 简介

### 环境配置

```bash
# 安装 Node.js（推荐 LTS 版本）
# 下载地址：https://nodejs.org/

# 查看版本
node -v
npm -v

# 使用 nvm 管理版本
nvm install 18
nvm use 18
nvm alias default 18

# 初始化项目
npm init -y

# 项目结构
my-app/
├── package.json
├── package-lock.json
├── src/
│   └── index.js
└── node_modules/
```

### 全局对象

```javascript
// __dirname - 当前模块的目录路径
console.log(__dirname);  // /Users/name/project

// __filename - 当前模块的文件路径
console.log(__filename);  // /Users/name/project/index.js

// process - 进程对象
process.argv;        // 命令行参数
process.env;         // 环境变量
process.cwd();       // 当前工作目录
process.exit(0);     // 退出进程
process.memoryUsage(); // 内存使用

// global - 全局对象（类似浏览器的 window）
global.myVar = 'value';
```

---

## 7.2 模块系统

### CommonJS 模块

```javascript
// math.js - 导出
const PI = 3.14159;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

// 导出单个
module.exports = add;

// 导出多个
module.exports = {
    PI,
    add,
    subtract
};

// 或者
exports.add = add;
exports.subtract = subtract;

// main.js - 导入
const math = require('./math.js');
console.log(math.add(1, 2));

const { add, PI } = require('./math.js');
```

### ES Module

```javascript
// math.mjs - 导出
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// main.mjs - 导入
import multiply, { PI, add } from './math.mjs';
import * as Math from './math.mjs';

// package.json 中设置
{
    "type": "module"  // 启用 ES Module
}
```

### 内置模块

```javascript
// path - 路径处理
const path = require('path');

path.join('/users', 'name', 'file.txt');  // /users/name/file.txt
path.resolve('file.txt');  // 绝对路径
path.parse('/users/name/file.txt');
// { dir: '/users/name', base: 'file.txt', ext: '.txt' }
path.basename('/users/name/file.txt');  // file.txt
path.extname('/users/name/file.txt');   // .txt

// fs - 文件系统
const fs = require('fs').promises;

// 异步读取
const content = await fs.readFile('file.txt', 'utf-8');

// 异步写入
await fs.writeFile('output.txt', 'Hello World');

// 追加内容
await fs.appendFile('log.txt', 'new line\n');

// 读取目录
const files = await fs.readdir('./src');

// 文件信息
const stat = await fs.stat('file.txt');
stat.isFile();
stat.isDirectory();

// fs 同步 API
const fsSync = require('fs');
const content = fsSync.readFileSync('file.txt', 'utf-8');

// events - 事件发射器
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

emitter.on('event', (arg) => {
    console.log('事件触发:', arg);
});

emitter.emit('event', 'Hello');

// 一次性事件
emitter.once('once', () => {});

// util - 工具函数
const util = require('util');

// 格式化字符串
util.format('Hello %s, you are %d years old', '张三', 25);

// 继承
util.inherits(MyClass, ParentClass);

// .promisify
const readFile = util.promisify(fs.readFile);
```

---

## 7.3 HTTP 服务器

### 原生 HTTP 模块

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // 请求信息
    console.log(req.method);    // GET, POST, etc.
    console.log(req.url);       // /api/users
    console.log(req.headers);   // 请求头

    // 设置响应
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // 发送响应
    res.end(JSON.stringify({ message: 'Hello' }));
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});

// 处理 POST 数据
http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = JSON.parse(body);
            res.end(JSON.stringify({ received: data }));
        });
    }
});
```

### Express 框架

```javascript
// 安装：npm install express

const express = require('express');
const app = express();

// 中间件
app.use(express.json());  // 解析 JSON
app.use(express.urlencoded({ extended: true }));  // 解析表单

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 路由
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/users', (req, res) => {
    res.json([{ id: 1, name: '张三' }]);
});

app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id, name: `用户${id}` });
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({ id: Date.now(), name, email });
});

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const data = req.body;
    res.json({ id, ...data });
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `删除用户 ${id}` });
});

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器错误' });
});

// 404 处理
app.use((req, res) => {
    res.status(404).json({ error: '未找到' });
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
```

### Express 中间件

```javascript
// 日志中间件
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
}

app.use(logger);

// 认证中间件
function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: '未授权' });
    }

    // 验证 token
    try {
        // const user = verifyToken(token);
        // req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token 无效' });
    }
}

// 路由中间件
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'API 首页' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // 验证逻辑
    res.json({ token: 'xxx' });
});

app.use('/api', router);
```

---

## 7.4 数据库集成

### MongoDB + Mongoose

```javascript
// 安装：npm install mongoose

const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost:27017/myapp');

// 定义 Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    age: {
        type: Number,
        min: 0,
        max: 150
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 实例方法
userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.__v;
    return obj;
};

// 静态方法
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

// 创建模型
const User = mongoose.model('User', userSchema);

// CRUD 操作
async function demo() {
    // 创建
    const user = await User.create({
        name: '张三',
        email: 'zhang@example.com',
        age: 25
    });

    // 查询
    const users = await User.find({ age: { $gte: 18 } });
    const one = await User.findById(user._id);
    const byEmail = await User.findOne({ email: 'zhang@example.com' });

    // 更新
    await User.findByIdAndUpdate(user._id, { age: 26 });
    await User.updateOne({ email: 'zhang@example.com' }, { age: 27 });

    // 删除
    await User.findByIdAndDelete(user._id);
    await User.deleteOne({ email: 'zhang@example.com' });
}

// Express 集成
app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});
```

### MySQL + mysql2

```javascript
// 安装：npm install mysql2

const mysql = require('mysql2/promise');

// 创建连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'myapp',
    waitForConnections: true,
    connectionLimit: 10
});

// 查询
async function getUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

// 带参数的查询
async function getUserById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE id = ?',
        [id]
    );
    return rows[0];
}

// 插入
async function createUser(name, email) {
    const [result] = await pool.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email]
    );
    return result.insertId;
}

// 更新
async function updateUser(id, name, email) {
    await pool.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [name, email, id]
    );
}

// 删除
async function deleteUser(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
}

// Express 集成
app.get('/api/users', async (req, res) => {
    const users = await getUsers();
    res.json(users);
});

app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    const id = await createUser(name, email);
    res.status(201).json({ id, name, email });
});
```

---

## 7.5 用户认证

### JWT 认证

```javascript
// 安装：npm install jsonwebtoken bcryptjs

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'your-secret-key';

// 密码加密
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

// 密码验证
async function verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
}

// 生成 token
function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// 验证 token
function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

// 认证中间件
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: '未授权' });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);

    if (!payload) {
        return res.status(401).json({ error: 'Token 无效' });
    }

    req.user = payload;
    next();
}

// 注册路由
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 检查用户是否存在
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: '邮箱已被使用' });
        }

        // 创建用户
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // 生成 token
        const token = generateToken({ id: user._id, email: user.email });

        res.status(201).json({ token, user: { id: user._id, name, email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 登录路由
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 查找用户
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: '邮箱或密码错误' });
        }

        // 验证密码
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: '邮箱或密码错误' });
        }

        // 生成 token
        const token = generateToken({ id: user._id, email: user.email });

        res.json({ token, user: { id: user._id, name, email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 受保护的路由
app.get('/api/profile', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
});
```

---

## 7.6 实践练习

### 练习 1：RESTful API

```javascript
// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 连接数据库
mongoose.connect('mongodb://localhost:27017/blog');

// 文章 Schema
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [String],
    published: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// 获取所有文章
app.get('/api/posts', async (req, res) => {
    const { page = 1, limit = 10, tag } = req.query;
    const query = tag ? { tags: tag } : { published: true };

    const posts = await Post.find(query)
        .populate('author', 'name email')
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });

    const count = await Post.countDocuments(query);

    res.json({
        posts,
        totalPages: Math.ceil(count / limit),
        currentPage: page
    });
});

// 获取单篇文章
app.get('/api/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
        .populate('author', 'name email');

    if (!post) {
        return res.status(404).json({ error: '文章不存在' });
    }

    res.json(post);
});

// 创建文章
app.post('/api/posts', authMiddleware, async (req, res) => {
    try {
        const post = await Post.create({
            ...req.body,
            author: req.user.id
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 更新文章
app.put('/api/posts/:id', authMiddleware, async (req, res) => {
    const post = await Post.findOneAndUpdate(
        { _id: req.params.id, author: req.user.id },
        req.body,
        { new: true }
    );

    if (!post) {
        return res.status(404).json({ error: '文章不存在' });
    }

    res.json(post);
});

// 删除文章
app.delete('/api/posts/:id', authMiddleware, async (req, res) => {
    const post = await Post.findOneAndDelete({
        _id: req.params.id,
        author: req.user.id
    });

    if (!post) {
        return res.status(404).json({ error: '文章不存在' });
    }

    res.json({ message: '删除成功' });
});

app.listen(3000, () => {
    console.log('Server running');
});
```

### 练习 2：文件上传

```javascript
// 安装：npm install multer
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

// 确保上传目录存在
await fs.mkdir('uploads', { recursive: true });

// 存储配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}${ext}`;
        cb(null, name);
    }
});

// 文件过滤
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname));
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('不支持的文件类型'));
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // 5MB
    fileFilter
});

// 单文件上传
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: '未选择文件' });
    }

    res.json({
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
    });
});

// 多文件上传
app.post('/api/uploads', upload.array('files', 10), (req, res) => {
    const files = req.files.map(file => ({
        filename: file.filename,
        path: file.path,
        size: file.size
    }));

    res.json({ files });
});

// 字段上传
app.post('/api/profile', upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
]), (req, res) => {
    res.json({
        avatar: req.files.avatar?.[0],
        cover: req.files.cover?.[0]
    });
});
```

---

## 7.7 常见问题

### Q1: 如何处理异步错误？

```javascript
// 使用 try-catch
app.get('/api/data', async (req, res) => {
    try {
        const data = await fetchData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 或使用 async 中间件包装
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

app.get('/api/data', asyncHandler(async (req, res) => {
    const data = await fetchData();
    res.json(data);
}));
```

### Q2: 如何管理环境变量？

```bash
# .env 文件
NODE_ENV=development
PORT=3000
DB_URL=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
```

```javascript
// 安装：npm install dotenv
require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET
};
```

---

## 7.8 学习资源

- [Node.js 官方文档](https://nodejs.org/zh-cn/docs/)
- [Express 官方文档](https://expressjs.com/)
- [Mongoose 文档](https://mongoosejs.com/)
- [Node.js 最佳实践](https://github.com/goldbergyoni/nodebestpractices)

---

**上一步：** [← 05-typescript/](../05-typescript/)
**下一步：** [→ 08-工程化模块](../07-engineering/)
