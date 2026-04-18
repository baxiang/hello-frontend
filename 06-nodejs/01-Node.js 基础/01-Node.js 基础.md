# Node.js 基础 ⭐

> 运行时环境、全局对象、模块系统、内置模块

---

## 学习目标

- 理解 Node.js 运行时和事件驱动模型
- 掌握全局对象（process、\_\_dirname、\_\_filename）
- 理解 CommonJS 和 ES Module 模块系统
- 学会使用 path、fs、events、util 内置模块

---

## 生活化比喻

**Node.js 就像"JavaScript 的办公室"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  办公室环境                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│    浏览器 = JavaScript 的客厅                        │
│    ─────────────                                     │
│    有 window（窗户）、document（家具）               │
│    适合和用户交互（网页）                            │
│                                                      │
│    Node.js = JavaScript 的办公室                     │
│    ─────────────                                     │
│    有 global（公司公告板）、process（前台）          │
│    适合处理后台工作（服务器）                        │
│                                                      │
│    模块 = 办公室的部门                               │
│    ─────────────                                     │
│    fs = 档案管理室（读写文件）                      │
│    http = 前台接待（处理请求）                      │
│    events = 通知系统（发布/订阅）                   │
│    path = 地址簿（路径处理）                        │
│                                                      │
│    require/import = 向其他部门借工具                 │
│    ─────────────                                     │
│    需要文件管理工具 → require('./fs')               │
│    每个部门的东西独立，不互相污染                    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 全局对象

**最简示例（1-3行）：**

```javascript
__dirname;           // 当前文件目录
__filename;          // 当前文件路径
process.env.PORT;    // 环境变量
```

**详细示例：**

```javascript
// process — 进程信息
console.log(process.argv);      // 命令行参数
console.log(process.env.NODE_ENV);  // 环境变量
console.log(process.cwd());     // 当前工作目录
process.exit(0);               // 正常退出

// __dirname 和 __filename
console.log(__dirname);   // /Users/zhangsan/project/src
console.log(__filename);  // /Users/zhangsan/project/src/index.js

// 拼接路径
const path = require('path');
const configPath = path.join(__dirname, 'config.json');
```

---

### 模块系统

**语法结构图：**

```
CommonJS（Node.js 默认）:
  导出：module.exports = { add, sub }
  导入：const math = require('./math')

ES Module（需 "type": "module"）:
  导出：export function add() {}
  导入：import { add } from './math'
```

**最简示例：**

```javascript
// math.js — 导出
module.exports = { add: (a, b) => a + b }

// main.js — 导入
const { add } = require('./math')
add(1, 2);  // 3
```

**详细示例：**

```javascript
// CommonJS — 导出多个值
// math.js
const PI = 3.14159;
function add(a, b) { return a + b; }
module.exports = { PI, add };

// CommonJS — 导入
const math = require('./math');
const { add, PI } = require('./math');

// ES Module — 需 package.json 设置 "type": "module"
// math.mjs
export const PI = 3.14159;
export function add(a, b) { return a + b; }

// 导入
import { PI, add } from './math.mjs';
```

---

### 内置模块

**最简示例：**

```javascript
const path = require('path');
path.join('/a', 'b', 'c');  // '/a/b/c'

const fs = require('fs').promises;
await fs.readFile('file.txt', 'utf-8');

const { EventEmitter } = require('events');
const emitter = new EventEmitter();
emitter.on('data', (msg) => console.log(msg));
emitter.emit('data', 'Hello');
```

**详细示例：**

```javascript
// path — 路径处理
path.join('/users', 'docs', 'file.txt');      // '/users/docs/file.txt'
path.resolve('file.txt');                      // 绝对路径
path.extname('file.txt');                      // '.txt'
path.basename('/a/b/file.txt');                // 'file.txt'

// fs — 文件操作（异步）
await fs.readFile('input.txt', 'utf-8');
await fs.writeFile('output.txt', 'Hello');
await fs.appendFile('log.txt', 'new line\n');
await fs.mkdir('./new-dir', { recursive: true });
await fs.unlink('old.txt');
const stat = await fs.stat('file.txt');

// events — 事件
const emitter = new EventEmitter();
emitter.on('user:login', (user) => console.log(`${user} 登录`));
emitter.emit('user:login', '张三');

// util — 工具
util.format('Hello %s', '张三');  // 'Hello 张三'
const readFile = util.promisify(require('fs').readFile);
```

---

## L2 实践层：用好

### 异步 vs 同步

| 方式 | 特点 | 适用场景 |
|------|------|---------|
| 异步（promises） | 不阻塞主线程 | 文件 I/O、网络请求 |
| 同步 | 阻塞直到完成 | 启动脚本、配置读取 |

### 反模式：不要这样做

```javascript
// ❌ 错误：同步读取阻塞主线程
const data = require('fs').readFileSync('large-file.txt');

// ✅ 正确：异步读取
const data = await require('fs').promises.readFile('large-file.txt');
```

```javascript
// ❌ 错误：exports = {} 断开引用
exports = { add: (a, b) => a + b };

// ✅ 正确：使用 module.exports 或 exports.add
module.exports = { add: (a, b) => a + b };
```

```javascript
// ❌ 错误：硬编码路径
fs.readFile('src/config.json');

// ✅ 正确：用 __dirname 拼接
fs.readFile(path.join(__dirname, 'config.json'));
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 文件读写 | fs.promises | 异步，不阻塞 |
| 路径拼接 | path.join | 跨平台兼容 |
| 模块通信 | EventEmitter | 解耦，可扩展 |
| 回调转 Promise | util.promisify | 统一异步风格 |

---

## L3 专家层：深入

### 模块加载机制

```
CommonJS 加载流程：

1. 解析：找到模块文件路径
2. 加载：读取文件内容
3. 包装：用函数包裹 (function(exports, require, module, __filename, __dirname) { ... })
4. 执行：运行包装后的函数
5. 缓存：存入 require.cache，下次直接取缓存

关键点：
- CommonJS 是同步加载
- 模块只执行一次（有缓存）
- module.exports 和 exports 初始指向同一对象
```

### 性能考量

| 操作 | 性能影响 | 说明 |
|------|---------|------|
| require() | 低（有缓存） | 首次加载慢，后续从缓存取 |
| fs.readFileSync | 高 | 阻塞主线程 |
| fs.promises | 低 | 异步非阻塞 |
| EventEmitter | 极低 | 纯内存操作 |

### 知识关联

```
Node.js 基础关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  运行时环境 │────→│  模块系统   │────→│  内置模块   │
│  Node.js/   │     │  CommonJS/  │     │  fs/path/   │
│  process    │     │  ES Module  │     │  events/    │
└─────────────┘     └─────────────┘     │  util       │
                                        └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **运行时** | 代码执行的环境 | 浏览器、Node.js |
| **全局对象** | 任何地方都可访问的对象 | global、process |
| **CommonJS** | Node.js 默认的模块系统 | `require()` / `module.exports` |
| **ES Module** | ES6 标准的模块系统 | `import` / `export` |
| **事件驱动** | 通过事件触发回调的编程模型 | `emitter.on('event', handler)` |
| **非阻塞 I/O** | 不等待 I/O 完成就继续执行 | `fs.readFile` 异步读取 |

---

## 实践练习

### 练习：日志工具模块

```javascript
// logger.js
const fs = require('fs').promises;
const path = require('path');

const logFile = path.join(__dirname, 'app.log');

async function log(level, message) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${level}] ${message}\n`;
    await fs.appendFile(logFile, line);
    console.log(line.trim());
}

module.exports = { log };

// main.js
const { log } = require('./logger');
log('INFO', '应用启动');
log('ERROR', '数据库连接失败');
```

---

## 常见问题

### Q1：Node.js 和浏览器 JavaScript 有什么区别？

| 特性 | 浏览器 | Node.js |
|------|--------|---------|
| 全局对象 | window | global |
| DOM API | 有 | 无 |
| 文件系统 | 无 | fs 模块 |
| 模块系统 | ES Module | CommonJS（默认） |

### Q2：CommonJS 和 ES Module 怎么选？

**老项目用 CommonJS，新项目推荐 ES Module（`"type": "module"`）。**

### Q3：module.exports 和 exports 有什么区别？

**exports 是 module.exports 的引用。直接赋值会断开引用：**

```javascript
exports.add = fn;              // ✅ 正确
module.exports = { add: fn };  // ✅ 正确
exports = { add: fn };         // ❌ 断开引用
```

---

## 学习资源

- [Node.js 官方文档](https://nodejs.org/docs/) ⭐ 官方权威
- [Node.js 入门教程](https://nodejs.dev/learn)
