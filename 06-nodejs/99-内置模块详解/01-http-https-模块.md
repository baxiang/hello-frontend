# http / https 模块

> 创建 HTTP/HTTPS 服务器和客户端

## 什么是 http 模块？

```
┌─────────────────────────────────────────────────────────────┐
│  http = Node.js 的 Web 服务器模块                           │
│                                                             │
│  就像：                                                     │
│  - 餐厅服务员：接收点餐（请求），端菜上桌（响应）            │
│  - 快递公司：接收包裹（请求），送到目的地（响应）           │
│  - 前台接待：迎接客人（请求），指引位置（响应）             │
│                                                             │
│  主要功能：                                                 │
│  - 创建 HTTP 服务器                                         │
│  - 发起 HTTP 请求                                           │
│  - 处理请求和响应                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 1.1 创建 HTTP 服务器

### 基本语法

```javascript
const http = require('http');

// 创建服务器
const server = http.createServer((req, res) => {
    // req = 请求对象（客户端发来的）
    // res = 响应对象（我们要返回的）

    // 设置响应内容
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
});

// 监听端口
server.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
});
```

### 请求对象 (req)

```javascript
const server = http.createServer((req, res) => {
    // 请求方法
    console.log(req.method);  // GET, POST, PUT, DELETE

    // 请求 URL
    console.log(req.url);  // /api/users

    // 请求头
    console.log(req.headers);
    // {
    //   'host': 'localhost:3000',
    //   'content-type': 'application/json',
    //   'user-agent': 'Mozilla/5.0...'
    // }

    // 请求体（需要监听 data 事件）
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log(body);  // POST 数据
    });

    res.end('OK');
});
```

### 响应对象 (res)

```javascript
const server = http.createServer((req, res) => {
    // 设置状态码
    res.statusCode = 200;  // 成功
    // res.statusCode = 404;  // 未找到
    // res.statusCode = 500;  // 服务器错误

    // 设置响应头
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // 发送响应体
    res.end('Hello');  // 字符串
    // res.end(JSON.stringify({ data: 123 }));  // JSON

    // 简化写法
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'OK' }));
});
```

---

## 1.2 处理不同路由

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // 解析 URL
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const method = req.method;

    // 设置通用响应头
    res.setHeader('Content-Type', 'application/json');

    // 路由判断
    if (pathname === '/' && method === 'GET') {
        res.end(JSON.stringify({ message: '欢迎首页' }));

    } else if (pathname === '/api/users' && method === 'GET') {
        // 获取用户列表
        res.end(JSON.stringify([
            { id: 1, name: '张三' },
            { id: 2, name: '李四' }
        ]));

    } else if (pathname === '/api/users' && method === 'POST') {
        // 创建用户
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const data = JSON.parse(body);
            res.end(JSON.stringify({
                id: Date.now(),
                ...data
            }));
        });

    } else if (pathname.startsWith('/api/users/') && method === 'GET') {
        // 获取单个用户 /api/users/123
        const id = pathname.split('/')[3];
        res.end(JSON.stringify({ id, name: '用户' + id }));

    } else {
        // 404
        res.statusCode = 404;
        res.end(JSON.stringify({ error: '未找到' }));
    }
});

server.listen(3000);
```

---

## 1.3 发起 HTTP 请求

### GET 请求

```javascript
const http = require('http');

// 方式 1：get() 方法
http.get('http://localhost:3000/api/users', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log(JSON.parse(data));
    });
}).on('error', err => {
    console.error('请求错误:', err);
});

// 方式 2：request() 方法
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/users',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log(JSON.parse(data));
    });
});

req.on('error', err => console.error(err));
req.end();
```

### POST 请求

```javascript
const http = require('http');

const data = JSON.stringify({
    name: '张三',
    email: 'zhang@example.com'
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    let responseData = '';
    res.on('data', chunk => responseData += chunk);
    res.on('end', () => {
        console.log('响应:', JSON.parse(responseData));
    });
});

req.on('error', err => console.error(err));
req.write(data);
req.end();
```

---

## 1.4 http 模块核心 API

### http.createServer()

```javascript
// 创建 HTTP 服务器
const server = http.createServer([options], requestListener);

// options:
{
    IncomingMessage: http.IncomingMessage,  // 自定义请求类
    ServerResponse: http.ServerResponse     // 自定义响应类
}

// requestListener: (req, res) => void
```

### http.request()

```javascript
// 发起 HTTP 请求
const req = http.request(options, callback);

// options:
{
    hostname: 'example.com',    // 主机名
    port: 80,                  // 端口
    path: '/api',              // 路径
    method: 'GET',              // 方法
    headers: {},                // 请求头
    auth: 'user:pass',          // 认证
}

// 返回 http.ClientRequest
```

### http.get()

```javascript
// 简化的 GET 请求
http.get('http://example.com', callback);
// 等同于
http.request({ method: 'GET' }, callback).end();
```

---

## 1.5 请求和响应对象

### IncomingMessage（请求对象）

```javascript
// 服务器端
const server = http.createServer((req, res) => {
    // req 是 IncomingMessage 实例

    // 属性
    req.method;           // 请求方法
    req.url;              // 请求 URL
    req.headers;          // 请求头对象
    req.httpVersion;      // HTTP 版本
    req.socket;           // 底层 socket

    // 方法
    req.on('data', fn);   // 监听数据
    req.on('end', fn);    // 监听结束
});

// 客户端
http.get('http://example.com', (res) => {
    // res 也是 IncomingMessage 实例

    // 额外属性
    res.statusCode;       // 响应状态码
    res.statusMessage;    // 响应状态消息
    res.headers;          // 响应头
});
```

### ServerResponse（响应对象）

```javascript
const server = http.createServer((req, res) => {
    // res 是 ServerResponse 实例

    // 方法
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('Hello');  // 写入响应体
    res.end();          // 结束响应

    // 状态码
    res.statusCode = 200;

    // 响应头
    res.setHeader('Content-Type', 'application/json');
    res.getHeader('Content-Type');
    res.removeHeader('Content-Type');
});
```

---

## 1.6 完整示例：RESTful API

```javascript
const http = require('http');
const url = require('url');

// 模拟数据
const users = [
    { id: 1, name: '张三', email: 'zhang@example.com' },
    { id: 2, name: '李四', email: 'li@example.com' }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // 设置 CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Content-Type', 'application/json');

    // 处理预检请求
    if (method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 路由处理
    try {
        // GET /api/users - 获取所有用户
        if (pathname === '/api/users' && method === 'GET') {
            res.end(JSON.stringify(users));
            return;
        }

        // GET /api/users/:id - 获取单个用户
        const userMatch = pathname.match(/^\/api\/users\/(\d+)$/);
        if (userMatch && method === 'GET') {
            const id = parseInt(userMatch[1]);
            const user = users.find(u => u.id === id);
            if (user) {
                res.end(JSON.stringify(user));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: '用户不存在' }));
            }
            return;
        }

        // POST /api/users - 创建用户
        if (pathname === '/api/users' && method === 'POST') {
            let body = '';
            req.on('data', chunk => body += chunk);
            req.on('end', () => {
                const newUser = JSON.parse(body);
                newUser.id = Date.now();
                users.push(newUser);
                res.statusCode = 201;
                res.end(JSON.stringify(newUser));
            });
            return;
        }

        // DELETE /api/users/:id - 删除用户
        if (userMatch && method === 'DELETE') {
            const id = parseInt(userMatch[1]);
            const index = users.findIndex(u => u.id === id);
            if (index !== -1) {
                users.splice(index, 1);
                res.end(JSON.stringify({ message: '删除成功' }));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: '用户不存在' }));
            }
            return;
        }

        // 404
        res.statusCode = 404;
        res.end(JSON.stringify({ error: '未找到' }));

    } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: '服务器错误' }));
    }
});

server.listen(3000, () => {
    console.log('API 服务器运行在 http://localhost:3000');
});
```

---

## 1.7 https 模块

https 模块的使用与 http 几乎相同，区别在于需要配置 SSL 证书：

```javascript
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),      // 私钥
    cert: fs.readFileSync('cert.pem')    // 证书
};

const server = https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('Hello HTTPS');
});

server.listen(443);
```

---

## 1.8 常见问答

### Q1: http 和 Express 有什么区别？

```javascript
// http：原生模块，简单但功能少
const http = require('http');
http.createServer((req, res) => {
    res.end('Hello');
});

// Express：第三方框架，功能强大
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello'));
// Express 底层就是用 http 模块实现的
```

### Q2: 如何处理中文乱码？

```javascript
res.setHeader('Content-Type', 'text/html; charset=utf-8');
res.end('你好世界');
```

---

## 1.9 学习资源

- [Node.js http 官方文档](https://nodejs.org/api/http.html)

---

**上一章：** [← 内置模块概述](./00-Node.js%20内置模块概述.md)  
**下一章：** [→ fs 文件模块](./02-fs-文件模块.md)