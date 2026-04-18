# http / https 模块

> 创建 HTTP/HTTPS 服务器和发起请求

---

## 学习目标

- 掌握 http.createServer 创建服务器
- 学会用 http.request 发起 HTTP 请求
- 理解请求和响应对象

---

## L1 理解层

**最简示例（1-3行）：**

```javascript
const http = require('http');
const server = http.createServer((req, res) => res.end('Hello'));
server.listen(3000);
```

**详细示例：**

```javascript
// 创建服务器
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ method: req.method, url: req.url }));
});

// 发起请求
http.get('http://example.com/api', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.parse(data)));
});
```

---

## L2 实践层

### 请求 vs 响应

| 对象 | 属性/方法 | 用途 |
|------|---------|------|
| req | `req.method` | 请求方法 |
| req | `req.url` | 请求路径 |
| req | `req.headers` | 请求头 |
| res | `res.writeHead(code, headers)` | 设置状态码和头 |
| res | `res.end(data)` | 结束响应 |
| res | `res.statusCode` | 状态码 |

### 反模式

```javascript
// ❌ 错误：不设置 Content-Type
res.end('Hello');

// ✅ 正确
res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
res.end('Hello');
```

---

## L3 专家层

### https 与 http 的区别

```javascript
const https = require('https');
const fs = require('fs');

https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, (req, res) => res.end('Secure!')).listen(443);
```

## 学习资源

- [Node.js http 文档](https://nodejs.org/api/http.html) ⭐ 官方权威
