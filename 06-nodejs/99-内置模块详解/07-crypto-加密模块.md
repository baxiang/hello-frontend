# crypto 加密模块

> 加密解密、哈希、签名

## 什么是 crypto 模块？

```
┌─────────────────────────────────────────────────────────────┐
│  crypto = 加密解密工具                                       │
│                                                             │
│  就像：                                                     │
│  - 保险箱：东西放进去锁起来                                  │
│  - 密码锁：输入密码才能打开                                  │
│  - 指纹识别：验证身份                                       │
│  - 密封信封：确保内容不被偷看                                │
│                                                             │
│  主要功能：                                                 │
│  - 哈希加密（MD5、SHA）                                    │
│  - 对称加密（AES）                                         │
│  - 非对称加密（RSA）                                        │
│  - 数字签名                                                 │
│  - HMAC                                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 7.1 哈希算法

### createHash

```javascript
const crypto = require('crypto');

// 创建哈希
const hash = crypto.createHash('sha256');

// 更新数据
hash.update('Hello');
hash.update(' World');

// 输出
const result = hash.digest('hex');
console.log(result);
// 正确的 SHA256: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e
```

### 简写方式

```javascript
const crypto = require('crypto');

// 一步完成
const hash = crypto.createHash('sha256').update('Hello World').digest('hex');
console.log(hash);

// MD5（不安全，仅示例）
const md5 = crypto.createHash('md5').update('password').digest('hex');
console.log(md5);
```

---

## 7.2 HMAC

```javascript
const crypto = require('crypto');

// HMAC = 哈希 + 密钥
const hmac = crypto.createHmac('sha256', 'secret-key');

hmac.update('Hello');
hmac.update(' World');

const result = hmac.digest('hex');
console.log(result);

// 一步完成
const hmac2 = crypto.createHmac('sha256', 'secret-key')
    .update('message')
    .digest('hex');
```

---

## 7.3 对称加密

### AES 加密

```javascript
const crypto = require('crypto');

// 密钥（32 字节 = 256 位）
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);  // 初始化向量

// 加密
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

let encrypted = cipher.update('Hello World', 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log('加密:', encrypted);

// 解密
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log('解密:', decrypted);  // Hello World
```

---

## 7.4 密码加密（bcrypt 风格）

```javascript
const crypto = require('crypto');

// 生成盐值
const salt = crypto.randomBytes(16).toString('hex');

// 加密密码
const hash = crypto.pbkdf2Sync('password123', salt, 100000, 64, 'sha512').toString('hex');

console.log('盐值:', salt);
console.log('加密:', hash);

// 验证密码
const verifyHash = crypto.pbkdf2Sync('password123', salt, 100000, 64, 'sha512').toString('hex');
console.log('验证:', hash === verifyHash);  // true
```

---

## 7.5 非对称加密

```javascript
const crypto = require('crypto');

// 生成 RSA 密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// 加密（用公钥）
const encrypted = crypto.publicEncrypt(
    {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    Buffer.from('Hello World')
);

console.log('加密:', encrypted.toString('base64'));

// 解密（用私钥）
const decrypted = crypto.privateDecrypt(
    {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    encrypted
);

console.log('解密:', decrypted.toString());
```

---

## 7.6 数字签名

```javascript
const crypto = require('crypto');

// 生成密钥
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// 签名
const sign = crypto.createSign('SHA256');
sign.update('要签名的数据');
sign.update('更多数据');
const signature = sign.sign(privateKey, 'base64');

console.log('签名:', signature);

// 验证
const verify = crypto.createVerify('SHA256');
verify.update('要签名的数据');
verify.update('更多数据');
const isValid = verify.verify(publicKey, signature, 'base64');

console.log('验证结果:', isValid);  // true
```

---

## 7.7 随机数

```javascript
const crypto = require('crypto');

// 随机字节
const randomBytes = crypto.randomBytes(16);
console.log(randomBytes.toString('hex'));

// 随机整数
const randomInt = crypto.randomInt(100);  // 0-99
const randomInt2 = crypto.randomInt(10, 100);  // 10-99

// 随机 UUID
const uuid = crypto.randomUUID();
console.log(uuid);
```

---

## 7.8 实际应用

### 用户密码加密

```javascript
const crypto = require('crypto');

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
    const [salt, hash] = stored.split(':');
    const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
}

// 使用
const hashed = hashPassword('mypassword123');
console.log('存储:', hashed);

console.log('验证:', verifyPassword('mypassword123', hashed));  // true
console.log('验证错误:', verifyPassword('wrong', hashed));      // false
```

---

## 7.9 常见问答

### Q1: MD5 和 SHA 区别？

```javascript
// MD5：128 位，已被破解，不安全
// SHA-1：160 位，已被破解，不安全
// SHA-256：256 位，目前安全
// SHA-512：512 位，更安全

// 推荐使用 SHA-256 或更高级
```

### Q2: 对称和非对称加密区别？

```javascript
// 对称加密：加密解密用同一个密钥
// 优点：快
// 缺点：密钥传输不安全

// 非对称加密：公钥加密，私钥解密
// 优点：安全
// 缺点：慢
// 用途：数字签名、密钥交换
```

---

## 7.10 学习资源

- [Node.js crypto 官方文档](https://nodejs.org/api/crypto.html)

---

**上一章：** [← buffer 缓冲模块](./06-buffer-缓冲模块.md)  
**下一章：** [→ util 工具模块](./08-util-工具模块.md)