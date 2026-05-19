# 数据库集成 ⭐⭐

> 从"数据存在内存里重启就没了"的烦恼出发，理解 MongoDB 和 Mongoose

---

## 学习目标

学完本节，你能：
- 理解为什么需要数据库
- 用 Mongoose 连接 MongoDB
- 定义 Schema 和 Model
- 完成 CRUD 操作

---

## 生活化比喻

**数据库就像"智能图书馆"**：

```
内存存储 = 临时便签：
┌─────────────────────────────┐
│  写在便签上，关机就没了     │
│  let users = []             │
└─────────────────────────────┘

数据库 = 智能图书馆：
┌─────────────────────────────┐
│  按规则登记，永久保存       │
│  随时查找、修改、删除       │
│  Schema = 登记模板          │
│  Model = 管理系统           │
└─────────────────────────────┘
```

---

## 第一步：看看问题

之前的 Express API 把数据存在数组里：

```javascript
let books = [
    { id: 1, title: 'JavaScript 高级程序设计' }
];
```

**发现问题了吗？**

- 服务器重启，数据就没了
- 数据量大，数组查找很慢
- 多个人同时写，数据会乱

**你需要一个专门存储数据的地方——数据库。**

---

## 第二步：MongoDB 怎么解决？

MongoDB 是一个**文档型数据库**，数据以类似 JSON 的格式存储：

```javascript
// MongoDB 里的一条记录（文档）
{
    "_id": "507f1f77bcf86cd799439011",
    "name": "张三",
    "email": "zhang@example.com",
    "age": 25
}
```

和 MySQL 不同，MongoDB **不需要预先定义表结构**，每个文档可以有不同的字段。

但为了让数据更规范，我们通常用 **Mongoose**——一个 MongoDB 的对象建模工具。

---

## 第三步：试试连接数据库

### 安装

```bash
npm install mongoose
```

### 连接

```javascript
const mongoose = require('mongoose');

await mongoose.connect('mongodb://localhost:27017/myapp');
console.log('数据库连接成功');
```

`mongodb://localhost:27017/myapp` 的意思是：
- `localhost:27017` → 本地 MongoDB 服务
- `myapp` → 数据库名

---

### 动手试试

确保本地安装了 MongoDB，然后运行：

```javascript
const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('连接成功！');
    await mongoose.disconnect();
}

main();
```

---

## 第四步：Schema 和 Model — 定义数据结构

### Schema（模板）

Schema 规定文档应该有哪些字段、什么类型：

```javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0, max: 150 },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });  // 自动添加 createdAt 和 updatedAt
```

### Model（管理系统）

Model 是基于 Schema 创建的操作接口：

```javascript
const User = mongoose.model('User', userSchema);
```

现在你可以用 `User` 来增删改查了。

---

## 第五步：CRUD 操作

### Create — 创建

```javascript
const user = await User.create({
    name: '张三',
    email: 'zhang@example.com',
    age: 25
});
```

### Read — 查询

```javascript
// 查所有
const users = await User.find();

// 条件查询
const admins = await User.find({ role: 'admin' });

// 查一个
const user = await User.findById('507f1...');

// 查一个（按条件）
const user = await User.findOne({ email: 'zhang@example.com' });
```

### Update — 更新

```javascript
// 按 ID 更新
const user = await User.findByIdAndUpdate(id, { age: 26 }, { new: true });

// 按条件更新
await User.updateOne({ name: '张三' }, { age: 27 });
```

### Delete — 删除

```javascript
// 按 ID 删除
await User.findByIdAndDelete(id);

// 按条件删除
await User.deleteMany({ role: 'guest' });
```

---

## 第六步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `MongooseServerSelectionError` | MongoDB 没启动 | 运行 `mongod` |
| `ValidationError` | 数据不符合 Schema | 检查必填字段 |
| `E11000 duplicate key` | 唯一字段重复 | 检查 unique 字段 |
| `Operation buffering timed out` | 连接还没建立就查询 | 等 `mongoose.connect` 完成再操作 |

---

## 第七步：完整示例

把数据库集成到 Express API 中：

```javascript
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// 连接数据库
await mongoose.connect('mongodb://localhost:27017/books');

// 定义 Schema 和 Model
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, min: 0 }
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

// API 路由
app.get('/api/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

app.post('/api/books', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/books/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    book ? res.json(book) : res.status(404).json({ error: '不存在' });
});

app.delete('/api/books/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.listen(3000);
```

---

## 总结：速查表

| 操作 | 方法 | 示例 |
|------|------|------|
| 连接 | `mongoose.connect(url)` | `mongoose.connect('mongodb://localhost/db')` |
| 创建 | `Model.create(data)` | `User.create({ name: '张三' })` |
| 查询所有 | `Model.find()` | `User.find({ role: 'admin' })` |
| 查一个 | `Model.findById(id)` | `User.findById('507f...')` |
| 更新 | `Model.findByIdAndUpdate(id, data)` | `User.findByIdAndUpdate(id, { age: 26 })` |
| 删除 | `Model.findByIdAndDelete(id)` | `User.findByIdAndDelete(id)` |

**记住：**
- Schema 定义数据结构，Model 提供操作接口
- 用 `{ timestamps: true }` 自动添加创建/更新时间
- API 操作要用 `try/catch` 处理数据库错误

---

## 实践练习

打开终端，试试完成以下练习：

### 练习：Todo 数据库 API

```javascript
// 定义 Todo Schema：
// - text: String（必填）
// - completed: Boolean（默认 false）
// - 自动添加 timestamps

// 实现 API：
// GET /api/todos - 获取所有
// POST /api/todos - 创建
// PUT /api/todos/:id - 切换 completed
// DELETE /api/todos/:id - 删除
```

---

## 常见问题

### Q：MongoDB 和 MySQL 选哪个？

**数据结构多变用 MongoDB，需要事务和复杂关联用 MySQL。**

### Q：Schema 里的 `required: true` 是什么意思？

**表示这个字段必填。如果不传，Mongoose 会报 ValidationError。**

### Q：`{ new: true }` 是什么意思？

**更新后返回更新后的文档。默认返回更新前的文档。**

---

## 学习资源

- [Mongoose 官方文档](https://mongoosejs.com/) ⭐ 官方文档
- [MongoDB 官方文档](https://www.mongodb.com/docs/)
