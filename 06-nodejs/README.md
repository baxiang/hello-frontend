# Node.js 系统学习教程

> 从入门到精通的完整 Node.js 后端开发学习路线

---

## 教程特色

- **系统化学习** - 从基础模块到项目实战，循序渐进
- **实战导向** - 每章都有实际应用场景和练习
- **最佳实践** - 培养良好的编码习惯和安全意识
- **完整项目** - 学完可独立完成后端 API 开发

---

## 完整学习路线

```
基础篇                    进阶篇                      实战篇
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 1 章       │          │ 第 3 章       │           │ 第 5 章       │
│ Node.js 基础 │ ──────▶  │ 数据库集成   │ ──────▶   │ 实用技术     │
│ 模块系统     │          │ MongoDB      │           │ 文件上传     │
└─────────────┘          └─────────────┘           │ 日志错误     │
       │                        │                   └─────────────┘
       ▼                        ▼                         │
┌─────────────┐          ┌─────────────┐                 │
│ 第 2 章       │          │ 第 4 章       │                 │
│ HTTP 与      │ ──────▶  │ 用户认证     │ ────────────────┘
│ Web 开发     │          │ 与安全       │
└─────────────┘          └─────────────┘
                                 │
                                 ▼
                         ┌─────────────┐
                         │ 第 6 章       │
                         │ 项目实战     │
                         └─────────────┘
```

---

## 章节详情

### 基础篇

#### 第 1 章：Node.js 基础
掌握 Node.js 运行时环境和模块系统。

| 小节 | 内容 | 难度 |
|------|------|------|
| 1.1 | Node.js 简介和环境配置 | ⭐ |
| 1.2 | 全局对象（global、process） | ⭐⭐ |
| 1.3 | 模块系统（CommonJS） | ⭐⭐ |
| 1.4 | ES Module 支持 | ⭐⭐ |
| 1.5 | path 模块 | ⭐⭐ |
| 1.6 | fs 文件系统 | ⭐⭐⭐ |
| 1.7 | events 事件模块 | ⭐⭐⭐ |
| 1.8 | util 工具模块 | ⭐⭐ |
| 1.9 | npm 包管理 | ⭐⭐ |

**学习目标：**
- 理解 Node.js 运行时环境和事件循环
- 掌握 CommonJS 和 ES Module 模块系统
- 能够使用核心模块进行文件操作和事件处理

---

#### 第 2 章：HTTP 与 Web 开发
学习构建 Web 服务和 RESTful API。

| 小节 | 内容 | 难度 |
|------|------|------|
| 2.1 | 原生 HTTP 模块 | ⭐⭐⭐ |
| 2.2 | 创建 HTTP 服务器 | ⭐⭐⭐ |
| 2.3 | 请求和响应处理 | ⭐⭐⭐ |
| 2.4 | Express 框架基础 | ⭐⭐ |
| 2.5 | 路由系统 | ⭐⭐⭐ |
| 2.6 | 中间件机制 | ⭐⭐⭐⭐ |
| 2.7 | RESTful API 设计 | ⭐⭐⭐⭐ |
| 2.8 | 错误处理 | ⭐⭐⭐ |

**学习目标：**
- 掌握原生 HTTP 模块的使用
- 理解 Express 中间件工作原理
- 能够设计和实现 RESTful API

---

### 进阶篇

#### 第 3 章：数据库集成
掌握 NoSQL 和关系型数据库的使用。

| 小节 | 内容 | 难度 |
|------|------|------|
| 3.1 | MongoDB 基础 | ⭐⭐ |
| 3.2 | MongoDB 安装和连接 | ⭐⭐ |
| 3.3 | Mongoose ORM | ⭐⭐⭐ |
| 3.4 | Schema 和 Model | ⭐⭐⭐ |
| 3.5 | 数据验证 | ⭐⭐⭐ |
| 3.6 | CRUD 操作 | ⭐⭐⭐ |
| 3.7 | 聚合查询 | ⭐⭐⭐⭐ |
| 3.8 | MySQL 基础 | ⭐⭐ |
| 3.9 | mysql2 连接池 | ⭐⭐⭐ |
| 3.10 | ORM 对比 | ⭐⭐ |

**学习目标：**
- 掌握 MongoDB 文档数据库的使用
- 理解 Mongoose Schema 建模
- 能够进行复杂查询和聚合操作
- 了解关系型数据库集成方法

---

#### 第 4 章：用户认证与安全
学习用户认证系统和安全最佳实践。

| 小节 | 内容 | 难度 |
|------|------|------|
| 4.1 | 密码加密（bcrypt） | ⭐⭐ |
| 4.2 | JWT 令牌认证 | ⭐⭐⭐ |
| 4.3 | 认证中间件实现 | ⭐⭐⭐⭐ |
| 4.4 | 权限控制 | ⭐⭐⭐⭐ |
| 4.5 | CORS 跨域配置 | ⭐⭐⭐ |
| 4.6 | 输入验证 | ⭐⭐⭐ |
| 4.7 | 安全最佳实践 | ⭐⭐⭐⭐ |
| 4.8 | 会话管理 | ⭐⭐⭐ |

**学习目标：**
- 理解密码加密原理和实现
- 掌握 JWT 认证流程
- 能够实现完整的用户认证系统
- 了解 Web 安全常见威胁和防御

---

### 实战篇

#### 第 5 章：实用技术
掌握实际开发中的常用技术。

| 小节 | 内容 | 难度 |
|------|------|------|
| 5.1 | 文件上传（Multer） | ⭐⭐⭐ |
| 5.2 | 多文件上传 | ⭐⭐⭐ |
| 5.3 | 文件类型验证 | ⭐⭐⭐ |
| 5.4 | Winston 日志 | ⭐⭐⭐ |
| 5.5 | 日志轮转 | ⭐⭐⭐ |
| 5.6 | 错误处理中间件 | ⭐⭐⭐⭐ |
| 5.7 | 统一错误响应 | ⭐⭐⭐ |
| 5.8 | 环境变量配置 | ⭐⭐ |
| 5.9 | 配置管理 | ⭐⭐⭐ |

**学习目标：**
- 掌握文件上传和处理技术
- 学会结构化日志记录
- 理解统一的错误处理机制
- 能够正确配置和管理环境变量

---

#### 第 6 章：项目实战
综合运用所学知识完成完整项目。

| 小节 | 内容 | 难度 |
|------|------|------|
| 6.1 | 项目概述和技术栈 | ⭐ |
| 6.2 | 项目结构设计 | ⭐⭐ |
| 6.3 | User 模型 | ⭐⭐⭐ |
| 6.4 | Post 模型 | ⭐⭐⭐ |
| 6.5 | Comment 模型 | ⭐⭐⭐ |
| 6.6 | 认证控制器 | ⭐⭐⭐⭐ |
| 6.7 | 用户控制器 | ⭐⭐⭐ |
| 6.8 | 文章控制器 | ⭐⭐⭐⭐ |
| 6.9 | 评论控制器 | ⭐⭐⭐ |
| 6.10 | 路由组织 | ⭐⭐⭐ |
| 6.11 | 中间件集成 | ⭐⭐⭐⭐ |
| 6.12 | API 测试 | ⭐⭐⭐ |
| 6.13 | 项目部署 | ⭐⭐⭐⭐ |

**学习目标：**
- 能够设计合理的目录结构
- 掌握 MVC 架构模式
- 理解完整的前后端分离开发流程
- 具备独立开发后端 API 的能力

---

## 学习路径建议

### 入门阶段（1-2 周）
```
第 1 章 → 第 2 章
```
**目标：** 掌握 Node.js 基础和 HTTP 服务器搭建

**建议：**
- 理解事件循环和异步编程
- 多动手写代码练习模块系统
- 使用原生 HTTP 模块创建简单服务器
- 学习 Express 中间件机制

---

### 进阶阶段（2-3 周）
```
第 3 章 → 第 4 章
```
**目标：** 掌握数据库集成和用户认证

**建议：**
- 理解 NoSQL 和 SQL 数据库的区别
- 掌握 Mongoose 建模和查询
- 理解 JWT 认证原理
- 实现完整的用户注册登录流程

---

### 实战阶段（2-3 周）
```
第 5 章 → 第 6 章
```
**目标：** 综合运用所学知识完成完整项目

**建议：**
- 学习文件上传和日志处理
- 理解统一的错误处理机制
- 完成博客 API 项目实战
- 尝试部署到云服务器

---

## 开发环境准备

### 安装 Node.js

```bash
# 下载安装包：https://nodejs.org/
# 推荐使用 LTS 版本

# 查看版本
node -v
npm -v

# 使用 nvm 管理版本（推荐）
# 安装 nvm：https://github.com/nvm-sh/nvm
nvm install --lts
nvm use --lts
```

### 安装数据库

```bash
# MongoDB（macOS）
brew install mongodb-community
brew services start mongodb-community

# MongoDB（Docker）
docker run -d -p 27017:27017 --name mongodb mongo:latest

# MySQL（macOS）
brew install mysql
brew services start mysql
```

### 项目初始化

```bash
# 创建项目
mkdir my-app && cd my-app
npm init -y

# 安装依赖
npm install express mongoose dotenv

# 安装开发依赖
npm install --save-dev nodemon jest supertest
```

### 配置文件

```json
// package.json
{
  "name": "my-nodejs-app",
  "version": "1.0.0",
  "type": "module",  // 或使用 CommonJS
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  }
}
```

```env
// .env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
```

### VS Code 配置

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "eslint.validate": ["javascript"]
}
```

### 推荐插件

- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **Thunder Client** - API 测试
- **MongoDB for VS Code** - 数据库管理
- **REST Client** - HTTP 请求测试

---

## 常用代码片段

### Express 基础

```javascript
import express from 'express';

const app = express();

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Mongoose 模型

```javascript
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model('User', userSchema);
```

### JWT 认证

```javascript
import jwt from 'jsonwebtoken';

// 生成令牌
const token = jwt.sign(
  { userId: user._id, username: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// 验证令牌
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

---

## 最佳实践

### ✅ 推荐做法

```javascript
// 1. 使用环境变量
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// 2. 统一错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'development'
      ? err.message
      : '服务器内部错误'
  });
});

// 3. 密码加密
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash(password, 10);

// 4. 异步错误处理
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// 5. 输入验证
const Joi = require('joi');
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required()
});

// 6. 日志记录
const logger = require('./utils/logger');
logger.info('用户登录', { userId: 123 });
```

### ❌ 避免做法

```javascript
// 1. 避免硬编码
const PORT = 3000;  // ❌
const PORT = process.env.PORT || 3000;  // ✅

// 2. 避免明文密码
const password = req.body.password;  // ❌ 直接存储
const hash = await bcrypt.hash(password, 10);  // ✅ 加密存储

// 3. 避免忽略错误
app.get('/users', (req, res) => {
  User.find().then(users => res.json(users));  // ❌
});
// ✅ 使用 try-catch 或 .catch()

// 4. 避免阻塞事件循环
data.forEach(item => {
  // 同步操作 ❌
});
// ✅ 使用异步操作

// 5. 避免过大的响应
app.get('/all-data', async (req, res) => {
  const data = await Data.find();  // ❌ 可能返回大量数据
  res.json(data);
});
// ✅ 使用分页
app.get('/data', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const data = await Data.find().limit(limit).skip((page - 1) * limit);
  res.json(data);
});
```

---

## API 设计规范

### RESTful 路由

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/users | 获取用户列表 |
| GET | /api/users/:id | 获取单个用户 |
| POST | /api/users | 创建用户 |
| PUT | /api/users/:id | 更新用户 |
| DELETE | /api/users/:id | 删除用户 |

### 响应格式

```javascript
// 成功响应
{
  "success": true,
  "data": { ... },
  "message": "操作成功"
}

// 错误响应
{
  "success": false,
  "error": "错误信息",
  "code": "ERROR_CODE"
}

// 分页响应
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### HTTP 状态码

| 状态码 | 含义 | 使用场景 |
|--------|------|----------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 204 | No Content | 删除成功 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权 |
| 403 | Forbidden | 禁止访问 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突 |
| 500 | Internal Server Error | 服务器错误 |

---

## 学习资源

### 官方文档
- [Node.js 官方文档](https://nodejs.org/docs/)
- [Express 官方文档](https://expressjs.com/)
- [MongoDB 官方文档](https://www.mongodb.com/docs/)
- [Mongoose 官方文档](https://mongoosejs.com/docs/)

### 在线课程
- [Node.js 官方教程](https://nodejs.org/zh-cn/learn/)
- [Express 入门指南](https://expressjs.com/zh-cn/starter/installing.html)
- [MongoDB University](https://university.mongodb.com/)

### 社区资源
- [Node.js 中文社区](https://nodejs.cn/)
- [NPM 包管理平台](https://www.npmjs.com/)
- [Stack Overflow - Node.js](https://stackoverflow.com/questions/tagged/node.js)

---

## 版本兼容性

本教程基于 Node.js 18.x LTS 编写，大部分内容向下兼容 Node.js 16.x。

| 特性 | 最低版本 |
|------|----------|
| ES Module | 12.x+ (需要 flag) |
| ES Module (稳定) | 14.x+ |
| Top-level await | 14.8+ |
| Fetch API | 18+ |
| Test Runner | 18+ |

---

**上一篇：** [← 05-typescript/](../05-typescript/)
**下一篇：** [→ 07-engineering/](../07-engineering/)
**开始学习：** [→ 01-Node.js 基础](./01-Node.js 基础.md)
