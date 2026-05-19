# Node.js 基础 ⭐

> 从"JavaScript 怎么运行在服务器上"的疑问出发，理解 Node.js

---

## 学习目标

学完本节，你能：
- 理解 Node.js 是什么以及为什么需要它
- 掌握 process、\_\_dirname、\_\_filename 的使用
- 理解 CommonJS 和 ES Module 的区别
- 学会使用 path、fs、events 等内置模块

---

## 生活化比喻

**Node.js 就像"JavaScript 的办公室"**：

```
浏览器 = JavaScript 的客厅：
┌─────────────────────────────┐
│  有 window（窗户）          │
│  有 document（家具）        │
│  适合和用户交互（网页）     │
└─────────────────────────────┘

Node.js = JavaScript 的办公室：
┌─────────────────────────────┐
│  有 global（公司公告板）    │
│  有 process（前台）         │
│  有 fs（档案管理室）        │
│  适合处理后台工作（服务器） │
└─────────────────────────────┘
```

---

## 第一步：看看 JavaScript 的局限

在浏览器里，JavaScript 能做什么？

```javascript
// ✅ 可以操作网页
document.getElementById('app').innerHTML = 'Hello';

// ✅ 可以监听点击
button.addEventListener('click', () => { alert('点了！') });

// ❌ 不能读写文件
// ❌ 不能连接数据库
// ❌ 不能创建 HTTP 服务器
```

**发现问题了吗？**

浏览器里的 JavaScript 被"关在沙盒里"——只能操作网页，不能访问文件系统、不能连接数据库、不能做服务器端的工作。

---

## 第二步：Node.js 怎么解决？

Node.js 的做法是——**把 JavaScript 从浏览器里"解放"出来，让它在服务器上运行**：

```javascript
// ✅ 可以读写文件
const fs = require('fs');
fs.writeFileSync('hello.txt', 'Hello World');

// ✅ 可以创建 HTTP 服务器
const http = require('http');
http.createServer((req, res) => {
    res.end('Hello from Node.js!');
}).listen(3000);

// ✅ 可以连接数据库
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/myapp');
```

Node.js 本质上就是 **Chrome 浏览器的 V8 引擎 + 一堆服务器端 API**。它让 JavaScript 能做任何其他后端语言（Python、Java、Ruby）能做的事。

---

## 第三步：试试全局对象

在浏览器里，全局对象是 `window`。在 Node.js 里，全局对象是 `global`。

但更重要的是以下几个全局变量：

### \_\_dirname 和 \_\_filename

```javascript
console.log(__dirname);   // 当前文件所在的目录
console.log(__filename);  // 当前文件的完整路径
```

比如在 `/Users/zhangsan/project/src/index.js` 里运行：
- `__dirname` → `/Users/zhangsan/project/src`
- `__filename` → `/Users/zhangsan/project/src/index.js`

### process — 进程信息

```javascript
console.log(process.argv);      // 命令行参数
console.log(process.env.PORT);  // 环境变量
console.log(process.cwd());     // 当前工作目录
process.exit(0);                // 正常退出程序
```

---

### 动手试试

创建一个文件 `test.js`，输入以下代码并运行：

```javascript
console.log('当前目录:', __dirname);
console.log('当前文件:', __filename);
console.log('Node 版本:', process.version);
console.log('环境变量:', process.env.NODE_ENV || '未设置');
```

运行：`node test.js`

---

## 第四步：模块系统 — 代码怎么组织

在 Node.js 里，每个文件就是一个**模块**。模块之间互不干扰，需要用的时候"导入"。

### CommonJS（Node.js 默认）

**导出：**

```javascript
// math.js
const PI = 3.14159;

function add(a, b) {
    return a + b;
}

module.exports = { PI, add };
```

**导入：**

```javascript
// main.js
const math = require('./math');

console.log(math.PI);      // 3.14159
console.log(math.add(1, 2)); // 3
```

### ES Module（现代标准）

如果你想在 Node.js 里用 `import/export`，需要在 `package.json` 里加一行：

```json
{
    "type": "module"
}
```

然后就可以用了：

```javascript
// math.mjs
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// main.mjs
import { PI, add } from './math.mjs';
```

**CommonJS vs ES Module 对比：**

| 特性 | CommonJS | ES Module |
|------|----------|-----------|
| 导出 | `module.exports` | `export` |
| 导入 | `require()` | `import` |
| 加载方式 | 同步 | 异步 |
| Node.js 默认 | ✅ | 需配置 `"type": "module"` |

---

## 第五步：内置模块 — Node.js 自带的工具

Node.js 内置了很多模块，不需要安装就能用。

### path — 路径处理

```javascript
const path = require('path');

path.join('/users', 'docs', 'file.txt');   // '/users/docs/file.txt'
path.resolve('file.txt');                   // 转为绝对路径
path.extname('file.txt');                   // '.txt'
path.basename('/a/b/file.txt');             // 'file.txt'
```

### fs — 文件操作

```javascript
const fs = require('fs').promises;  // 用 promises 版本（异步）

// 读取文件
const content = await fs.readFile('hello.txt', 'utf-8');

// 写入文件
await fs.writeFile('output.txt', 'Hello World');

// 追加内容
await fs.appendFile('log.txt', '新的一行\n');

// 创建目录
await fs.mkdir('./new-dir', { recursive: true });

// 删除文件
await fs.unlink('old.txt');
```

### events — 事件系统

```javascript
const { EventEmitter } = require('events');

const emitter = new EventEmitter();

// 监听事件
emitter.on('user:login', (user) => {
    console.log(`${user} 登录了`);
});

// 触发事件
emitter.emit('user:login', '张三');
// 输出：张三 登录了
```

---

## 第六步：常见错误和修复

| 错误 | 原因 | 修复 |
|------|------|------|
| `Cannot find module './xxx'` | 文件路径不对 | 检查路径，用 `path.join(__dirname, 'xxx')` |
| `require is not defined` | 用了 ES Module 模式 | 把 `import` 改成 `require`，或加 `"type": "module"` |
| `fs.readFile 返回 Buffer` | 没指定编码 | 加 `'utf-8'` 参数 |
| `exports = {} 不生效` | 断开了引用 | 用 `module.exports = {}` |

---

## 第七步：同步 vs 异步

Node.js 的文件操作有同步和异步两种方式。

### 同步（阻塞）

```javascript
const fs = require('fs');
const data = fs.readFileSync('config.json', 'utf-8');
console.log(data);  // 读完才继续
```

同步会**阻塞主线程**——文件没读完，后面的代码都不会执行。

### 异步（非阻塞）

```javascript
const fs = require('fs').promises;
const data = await fs.readFile('config.json', 'utf-8');
console.log(data);  // 读完才继续，但不会阻塞其他请求
```

**什么时候用哪个？**

| 场景 | 推荐 | 原因 |
|------|------|------|
| 启动时读配置 | 同步 | 简单，启动时阻塞没关系 |
| 处理用户请求 | 异步 | 不能阻塞其他用户 |
| 写日志 | 异步 | 不能影响主流程 |

**记住：生产环境尽量用异步。**

---

## 总结：速查表

| 全局变量 | 含义 | 示例 |
|----------|------|------|
| `__dirname` | 当前文件目录 | `'/Users/zhangsan/project/src'` |
| `__filename` | 当前文件路径 | `'/Users/zhangsan/project/src/index.js'` |
| `process.argv` | 命令行参数 | `['node', 'index.js', '--port', '3000']` |
| `process.env` | 环境变量 | `process.env.PORT` |
| `module.exports` | 导出模块 | `module.exports = { add }` |
| `require()` | 导入模块 | `const fs = require('fs')` |

**记住：**
- Node.js 让 JavaScript 能在服务器端运行
- 每个文件是一个模块，用 `require` 导入
- 生产环境用异步 API（`fs.promises`）
- 路径拼接用 `path.join(__dirname, 'xxx')`

---

## 实践练习

打开终端，试试完成以下练习：

### 练习 1：创建日志工具

```javascript
// logger.js
// 实现一个 log 函数，把日志追加写入 app.log 文件
// 格式：[2026-04-20T10:30:00.000Z] [INFO] 应用启动

const fs = require('fs').promises;
const path = require('path');

async function log(level, message) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${level}] ${message}\n`;
    const logFile = path.join(__dirname, 'app.log');
    await fs.appendFile(logFile, line);
    console.log(line.trim());
}

module.exports = { log };
```

### 练习 2：事件发射器

```javascript
// 用 EventEmitter 实现一个简单的消息系统
const { EventEmitter } = require('events');

const messenger = new EventEmitter();

messenger.on('message', (msg) => {
    console.log('收到消息:', msg);
});

messenger.emit('message', 'Hello Node.js!');
```

---

## 常见问题

### Q：Node.js 和浏览器 JavaScript 有什么区别？

**全局对象不同、API 不同：**

| 特性 | 浏览器 | Node.js |
|------|--------|---------|
| 全局对象 | `window` | `global` |
| DOM API | 有 | 无 |
| 文件系统 | 无 | `fs` 模块 |
| 模块系统 | ES Module | CommonJS（默认） |

### Q：module.exports 和 exports 有什么区别？

**exports 是 module.exports 的引用。直接赋值会断开引用：**

```javascript
exports.add = fn;              // ✅ 正确
module.exports = { add: fn };  // ✅ 正确
exports = { add: fn };         // ❌ 断开引用，不生效
```

### Q：CommonJS 和 ES Module 选哪个？

**老项目用 CommonJS，新项目推荐 ES Module（`"type": "module"`）：**

```json
// package.json
{ "type": "module" }
```

---

## 学习资源

- [Node.js 官方文档](https://nodejs.org/docs/) ⭐ 官方文档
- [Node.js 入门教程](https://nodejs.dev/learn)
- [Node.js 模块系统](https://nodejs.org/api/modules.html)
