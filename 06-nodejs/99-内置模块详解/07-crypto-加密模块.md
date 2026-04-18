# crypto 加密模块

> 哈希、加密、解密

---

## L1 理解层

**最简示例（1-3行）：**

```javascript
const crypto = require('crypto');
const hash = crypto.createHash('sha256').update('data').digest('hex');
```

**详细示例：**

```javascript
const crypto = require('crypto');

// 哈希
crypto.createHash('sha256').update('data').digest('hex');

// HMAC
crypto.createHmac('sha256', 'secret').update('data').digest('hex');

// 随机字节
crypto.randomBytes(16).toString('hex');

// 对称加密
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('secret', 'utf8', 'hex');
encrypted += cipher.final('hex');
```

---

## 学习资源

- [Node.js crypto 文档](https://nodejs.org/api/crypto.html) ⭐ 官方权威
