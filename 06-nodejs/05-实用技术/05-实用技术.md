# 实用技术 ⭐

> 从"怎么上传文件、记日志、处理错误"出发，掌握 Node.js 实用技术

---

## 学习目标

学完本节，你能：
- 用 Multer 处理文件上传
- 用 Winston 记录日志
- 统一处理 API 错误
- 用 dotenv 管理环境变量

---

## 生活化比喻

**实用技术就像"餐厅的后勤保障"**：

```
文件上传 = 收发室：
┌─────────────────────────────┐
│  接收包裹（文件），检查类型  │
│  分类存放到指定仓库         │
└─────────────────────────────┘

日志记录 = 监控摄像头：
┌─────────────────────────────┐
│  记录发生了什么、什么时候    │
│  出问题时回看录像找原因     │
└─────────────────────────────┘

错误处理 = 应急预案：
┌─────────────────────────────┐
│  平时不出现，出事了立即响应  │
│  不让用户看到崩溃画面       │
└─────────────────────────────┘

环境变量 = 保险箱：
┌─────────────────────────────┐
│  密码、密钥不能写在代码里    │
│  放在只有内部人员知道的地方  │
└─────────────────────────────┘
```

---

## 第一步：看看问题

你的 API 已经能工作了，但现在有几个实际需求：

1. 用户想上传头像
2. 出 bug 了不知道哪里错了
3. 数据库密码写在代码里，提交到 Git 会泄露
4. 错误返回格式不统一

**这些都需要专门的技术来解决。**

---

## 第二步：文件上传怎么解决？

Express 不能直接处理文件上传，需要用 **Multer** 中间件：

```bash
npm install multer
```

### 最简单的上传

```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.json({ file: req.file });
});
```

`upload.single('avatar')` 的意思是：接收一个名为 `avatar` 的文件字段。

### 完整配置

```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // 限制 5MB
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|gif|webp/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        cb(null, ext ? null : new Error('只支持图片文件'));
    }
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    res.json({ url: `/uploads/${req.file.filename}` });
});
```

---

## 第三步：日志记录怎么解决？

`console.log` 不够用——没有时间戳、不能分级、不能写文件。

用 **Winston**：

```bash
npm install winston
```

```javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // 错误日志
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // 所有日志
        new winston.transports.File({ filename: 'combined.log' }),
        // 控制台
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

// 使用
logger.info('应用启动');
logger.error('数据库连接失败', { error: err.message });
logger.warn('磁盘空间不足');
```

---

## 第四步：环境变量怎么管理？

**永远不要把密码、密钥写在代码里。** 用环境变量：

```bash
# .env 文件（不要提交到 Git！）
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=my-secret-key
PORT=3000
```

```bash
npm install dotenv
```

```javascript
require('dotenv').config();

const db = await mongoose.connect(process.env.DATABASE_URL);
const token = jwt.sign(payload, process.env.JWT_SECRET);
app.listen(process.env.PORT);
```

**.gitignore 必须加上：**
```
.env
```

---

## 第五步：统一错误处理

之前的错误处理分散在各个路由里。现在用中间件统一处理：

```javascript
// 自定义错误类
class AppError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}

// 路由中使用
app.post('/api/users', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(new AppError(err.message, 400));  // 交给错误处理中间件
    }
});

// 全局错误处理（放在所有路由之后）
app.use((err, req, res, next) => {
    logger.error(err.message);  // 记录日志

    res.status(err.status || 500).json({
        error: err.message,
        // 开发环境才返回堆栈
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 处理
app.use((req, res) => {
    res.status(404).json({ error: '路由不存在' });
});
```

---

## 第六步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `MulterError: Unexpected field` | 前端字段名不对 | 检查 `upload.single('字段名')` |
| `File too large` | 超出 fileSize 限制 | 调整 `limits.fileSize` |
| `.env 不生效` | 没调用 `dotenv.config()` | 在文件最开头加 `require('dotenv').config()` |
| `错误处理中间件不触发` | 路由没用 `next(err)` | 用 `try/catch` 捕获后 `next(err)` |

---

## 第七步：完整示例

```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const winston = require('winston');

const app = express();
app.use(express.json());

// 日志
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console({ format: winston.format.simple() })
    ]
});

// 文件上传
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }
});

// 连接数据库
await mongoose.connect(process.env.DATABASE_URL);
logger.info('数据库连接成功');

// 路由
app.post('/api/users', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(new AppError(err.message, 400));
    }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json({ url: `/uploads/${req.file.filename}` });
});

// 错误处理
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(process.env.PORT || 3000);
```

---

## 总结：速查表

| 技术 | 安装 | 用途 |
|------|------|------|
| `multer` | `npm i multer` | 文件上传 |
| `winston` | `npm i winston` | 日志记录 |
| `dotenv` | `npm i dotenv` | 环境变量 |
| `cors` | `npm i cors` | 跨域处理 |
| `helmet` | `npm i helmet` | 安全头 |

**记住：**
- `.env` 文件不要提交到 Git
- 错误处理中间件必须有 4 个参数 `(err, req, res, next)`
- 文件上传要限制大小和类型

---

## 实践练习

```javascript
// 练习：实现完整的文件上传系统
// 1. 用 Multer 上传图片（限制 5MB，只允许 jpg/png）
// 2. 上传成功后返回文件 URL
// 3. 记录上传日志
// 4. 错误时返回统一格式
```

---

## 常见问题

### Q：Multer 的 `dest` 和 `storage` 有什么区别？

**`dest` 是简单配置，`storage` 可以自定义文件名和路径。**

### Q：Winston 和 console.log 有什么区别？

**Winston 支持分级（info/error/warn）、写文件、格式化，console.log 只有控制台输出。**

### Q：环境变量在生产环境怎么配置？

**在部署平台（Vercel、Docker、服务器）的环境变量配置里设置，不需要 .env 文件。**

---

## 学习资源

- [Multer](https://github.com/expressjs/multer)
- [Winston](https://github.com/winstonjs/winston)
- [dotenv](https://github.com/motdotla/dotenv)
