# 用户认证与安全 ⭐⭐

> 从"怎么保护用户密码"的疑问出发，理解 JWT 认证

---

## 学习目标

学完本节，你能：
- 理解为什么不能明文存储密码
- 用 bcrypt 加密密码
- 理解 JWT 认证的原理
- 实现登录和认证中间件

---

## 生活化比喻

**认证系统就像"游乐园手环"**：

```
登录 = 买票换手环：
┌─────────────────────────────┐
│  出示身份证（账号密码）     │
│  换取手环（JWT 令牌）       │
└─────────────────────────────┘

JWT 令牌 = 防伪手环：
┌─────────────────────────────┐
│  手环上有你的信息（payload）│
│  有游乐园防伪标记（签名）   │
│  戴着可以在园区自由通行     │
└─────────────────────────────┘

密码加密 = 保险箱：
┌─────────────────────────────┐
│  密码放进去就变成乱码       │
│  只有用钥匙（bcrypt）才能对比│
│  但不能取出原文             │
└─────────────────────────────┘
```

---

## 第一步：看看问题

假设你的用户系统是这样的：

```javascript
// ❌ 危险：明文存储密码
let users = [
    { id: 1, username: '张三', password: '123456' }
];

// 登录验证
function login(username, password) {
    const user = users.find(u => u.username === username);
    if (user && user.password === password) {
        return { success: true };
    }
    return { success: false };
}
```

**发现问题了吗？**

- 密码明文存储在数据库里
- 数据库泄露，所有密码都暴露
- 没有"登录状态"，每次请求都要传密码

---

## 第二步：密码加密怎么解决？

**永远不要明文存储密码。** 正确的做法是用 bcrypt 加密：

```javascript
const bcrypt = require('bcryptjs');

// 注册：加密密码
const hashedPassword = await bcrypt.hash('123456', 10);
// 存储哈希值，不是原文

// 登录：对比密码
const isValid = await bcrypt.compare('123456', hashedPassword);
// true 或 false
```

`bcrypt.hash('123456', 10)` 会把密码变成类似这样的乱码：
`$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

**关键点：bcrypt 是单向的——只能对比，不能解密。**

---

## 第三步：试试 bcrypt

### 安装

```bash
npm install bcryptjs
```

### 加密密码

```javascript
const bcrypt = require('bcryptjs');

async function hashPassword(plainPassword) {
    const salt = await bcrypt.genSalt(10);  // 生成盐值
    return bcrypt.hash(plainPassword, salt);
}

const hashed = await hashPassword('123456');
console.log(hashed);
// $2a$10$...
```

### 验证密码

```javascript
async function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

const isValid = await verifyPassword('123456', hashed);
console.log(isValid);  // true 或 false
```

---

### 动手试试

```javascript
const bcrypt = require('bcryptjs');

async function test() {
    const hashed = await bcrypt.hash('mypassword', 10);
    console.log('加密后:', hashed);

    const valid = await bcrypt.compare('mypassword', hashed);
    console.log('密码正确:', valid);  // true

    const invalid = await bcrypt.compare('wrongpassword', hashed);
    console.log('密码错误:', invalid);  // false
}

test();
```

---

## 第四步：JWT — 怎么保持登录状态？

密码加密解决了存储问题，但还有一个问题：**用户登录后，怎么保持登录状态？**

传统做法是用 Session，但现在更流行的是 **JWT（JSON Web Token）**。

### JWT 是什么？

JWT 是一个加密的字符串，包含三部分：

```
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IuW8oOS4iSJ9.签名
│                    │                    │
├─ 头部（算法）       ├─ 载荷（用户信息）   ├─ 签名（防伪）
```

### 签发令牌

```javascript
const jwt = require('jsonwebtoken');
const SECRET = 'my-secret-key';  // 实际项目用环境变量

// 登录成功后签发
const token = jwt.sign(
    { id: user.id, name: user.name },  // 载荷
    SECRET,                             // 密钥
    { expiresIn: '7d' }                 // 7 天过期
);

// 返回给客户端
res.json({ token });
```

### 验证令牌

```javascript
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: '未授权' });

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;  // 挂载到 req 上
        next();
    } catch (err) {
        res.status(401).json({ error: '令牌无效' });
    }
}
```

---

## 第五步：完整登录流程

```javascript
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'my-secret-key';
let users = [];  // 实际项目用数据库

// 注册
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 检查用户是否存在
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ error: '用户已存在' });
        }

        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 保存用户
        const user = { id: Date.now(), username, password: hashedPassword };
        users.push(user);

        res.status(201).json({ message: '注册成功' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 登录
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(401).json({ error: '用户不存在' });
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ error: '密码错误' });
    }

    // 签发令牌
    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET,
        { expiresIn: '7d' }
    );

    res.json({ token });
});

// 受保护的路由
app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({ message: `你好，${req.user.username}` });
});

app.listen(3000);
```

---

## 第六步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `jwt expired` | 令牌过期了 | 重新登录或刷新令牌 |
| `invalid signature` | 密钥不对或令牌被篡改 | 检查 SECRET 是否一致 |
| `bcrypt.compare 返回 false` | 密码不对 | 检查注册时是否正确加密 |
| `token not provided` | 请求没带 Authorization | 客户端需要带 `Bearer <token>` |

---

## 第七步：客户端怎么使用？

前端收到 token 后，每次请求都要带上：

```javascript
// 登录
const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: '张三', password: '123456' })
});
const { token } = await res.json();

// 保存 token
localStorage.setItem('token', token);

// 后续请求带上 token
const profile = await fetch('/api/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
});
```

---

## 总结：速查表

| 操作 | 方法 | 示例 |
|------|------|------|
| 加密密码 | `bcrypt.hash(password, 10)` | `await bcrypt.hash('123', 10)` |
| 验证密码 | `bcrypt.compare(plain, hash)` | `await bcrypt.compare('123', hash)` |
| 签发令牌 | `jwt.sign(payload, secret)` | `jwt.sign({ id: 1 }, SECRET)` |
| 验证令牌 | `jwt.verify(token, secret)` | `jwt.verify(token, SECRET)` |
| 认证中间件 | 检查 Authorization 头 | `req.headers.authorization` |

**记住：**
- 永远不要明文存储密码
- JWT 密钥要用环境变量，不要硬编码
- 客户端请求带 `Authorization: Bearer <token>`

---

## 实践练习

打开终端，试试完成以下练习：

### 练习：完整用户系统

```javascript
// 实现以下功能：
// 1. 注册（POST /api/register）- 加密密码
// 2. 登录（POST /api/login）- 返回 JWT
// 3. 获取个人信息（GET /api/profile）- 需要认证
// 4. 修改密码（PUT /api/password）- 需要认证，验证旧密码
```

---

## 常见问题

### Q：JWT 和 Session 选哪个？

**API 项目用 JWT（无状态、适合分布式），传统 Web 项目用 Session。**

### Q：JWT 泄露了怎么办？

**JWT 无法撤销。设置较短的过期时间，配合 Refresh Token 机制。**

### Q：bcrypt 的 salt rounds 设多少？

**10 是默认值，生产环境可以设 12。越高越安全但越慢。**

---

## 学习资源

- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [JWT 官方](https://jwt.io/) ⭐
