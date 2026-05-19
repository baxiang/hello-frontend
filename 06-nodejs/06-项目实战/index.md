# 项目实战 ⭐⭐

> 综合运用 Node.js、Express、MongoDB 构建博客 API

---

## 学习目标

学完本节，你能：
- 综合运用前面所学知识
- 设计 RESTful API
- 实现完整的 CRUD 操作
- 理解项目结构和代码组织

---

## 生活化比喻

**项目实战就像"开一家餐厅"**：

```
项目结构 = 餐厅布局：
厨房（models）→ 准备食材（数据）
厨师（controllers）→ 做菜（业务逻辑）
服务员（routes）→ 接单（路由）
前台（middleware）→ 迎宾、安检（中间件）

用户模块 = 会员系统：
注册办卡、登录验证、会员等级

文章模块 = 菜单管理：
上新菜（创建）、看菜单（读取）
改菜名（更新）、下架（删除）
```

---

## 第一步：项目结构

一个好的项目结构让代码更易维护：

```
blog-api/
├── src/
│   ├── models/          # 数据模型
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/          # 路由
│   │   ├── auth.js
│   │   └── posts.js
│   ├── middleware/      # 中间件
│   │   └── auth.js
│   └── index.js         # 入口
├── .env                 # 环境变量
├── package.json
└── README.md
```

---

## 第二步：初始化项目

```bash
mkdir blog-api && cd blog-api
npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv
npm install -D nodemon
```

`package.json` 添加启动脚本：
```json
{
    "scripts": {
        "dev": "nodemon src/index.js",
        "start": "node src/index.js"
    }
}
```

---

## 第三步：连接数据库

```javascript
// src/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 连接数据库
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('数据库连接成功'))
    .catch(err => console.error('数据库连接失败:', err));

app.listen(process.env.PORT || 3000, () => {
    console.log('服务器运行中...');
});
```

---

## 第四步：定义模型

### 用户模型

```javascript
// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

// 注册前加密密码
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 验证密码
userSchema.methods.comparePassword = function(plain) {
    return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### 文章模型

```javascript
// src/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
```

---

## 第五步：实现路由

### 认证路由

```javascript
// src/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// 注册
router.post('/register', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: '注册成功' });
    } catch (err) {
        next(err);
    }
});

// 登录
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: '用户不存在' });

        const isValid = await user.comparePassword(password);
        if (!isValid) return res.status(401).json({ error: '密码错误' });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
```

### 文章路由

```javascript
// src/routes/posts.js
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// 列表
router.get('/', async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author', 'username');
        res.json(posts);
    } catch (err) { next(err); }
});

// 创建
router.post('/', async (req, res, next) => {
    try {
        const post = await Post.create({
            ...req.body,
            author: req.user.id
        });
        res.status(201).json(post);
    } catch (err) { next(err); }
});

// 删除
router.delete('/:id', async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) { next(err); }
});

module.exports = router;
```

---

## 第六步：认证中间件

```javascript
// src/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: '未授权' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: '令牌无效' });
    }
};
```

---

## 第七步：组装应用

```javascript
// src/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./middleware/auth'), require('./routes/posts'));

// 错误处理
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message });
});

mongoose.connect(process.env.DATABASE_URL)
    .then(() => app.listen(process.env.PORT || 3000))
    .catch(console.error);
```

---

## 测试 API

```bash
# 注册
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"张三","password":"123456"}'

# 登录
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"张三","password":"123456"}'

# 创建文章（带 token）
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"我的文章","content":"内容"}'
```

---

## 总结：项目结构速查

| 目录 | 职责 | 示例 |
|------|------|------|
| `models/` | 数据模型 | User, Post |
| `routes/` | 路由处理 | auth.js, posts.js |
| `middleware/` | 中间件 | auth.js |
| `.env` | 环境变量 | DATABASE_URL, JWT_SECRET |

**记住：**
- 每个模块职责单一
- 错误统一用 `next(err)` 处理
- 路由按资源分组

---

## 学习资源

- [Express 最佳实践](https://expressjs.com/en/advanced/best-practice-performance.html)
- [RESTful API 设计](https://restfulapi.net/)
