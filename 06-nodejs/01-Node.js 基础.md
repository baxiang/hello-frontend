# Node.js 基础

> 掌握 Node.js 运行时环境和核心模块，开启后端开发之旅

## 学习目标

- ✅ 理解 Node.js 运行时环境
- ✅ 掌握核心模块的使用
- ✅ 学会使用 Express 构建 Web 服务
- ✅ 了解数据库集成和 API 开发

---

## 1.1 什么是 Node.js？

### 1.1.1 Node.js 简介

```
┌─────────────────────────────────────────────────────────────┐
│  Node.js = JavaScript 运行环境                              │
│                                                             │
│  以前：                                                     │
│  - JavaScript 只能在浏览器中运行                            │
│  - 只能做网页交互                                           │
│                                                             │
│  现在：                                                     │
│  - Node.js 让 JavaScript 可以在电脑上运行                   │
│  - 可以做服务器、命令行工具、桌面应用等                      │
│                                                             │
│  就像：                                                     │
│  - 浏览器 = JavaScript 的"客厅"                            │
│  - Node.js = JavaScript 的"办公室"                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.1.2 Node.js 能做什么？

```javascript
// 服务器开发
// - Web 服务器
// - API 接口
// - 实时聊天

// 命令行工具
// - 构建工具（webpack, vite）
// - 包管理工具（npm, yarn）
// - 脚手架工具

// 桌面应用
// - VS Code（Electron）
// - Slack（Electron）

// 移动应用
// - React Native
// - Electron
```

### 1.1.3 Node.js 的特点

| 特点 | 说明 | 优势 |
|------|------|------|
| **事件驱动** | 基于事件循环 | 高并发性能好 |
| **非阻塞 I/O** | 不等待 I/O 完成 | 响应速度快 |
| **单线程** | 一个线程处理请求 | 简单、节省资源 |
| **跨平台** | Windows/Mac/Linux | 部署方便 |

---

## 1.2 环境配置

### 1.2.1 安装 Node.js

```bash
# 方法 1：官网下载
# https://nodejs.org/

# 方法 2：使用 nvm 管理（推荐）
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安装 Node.js
nvm install 18
nvm use 18
nvm alias default 18

# 验证安装
node -v    # v18.x.x
npm -v     # 9.x.x
```

### 1.2.2 初始化项目

```bash
# 创建项目目录
mkdir my-app
cd my-app

# 初始化（创建 package.json）
npm init -y

# 项目结构
my-app/
├── package.json          # 项目配置
├── package-lock.json    # 依赖锁定
├── src/
│   └── index.js         # 入口文件
└── node_modules/        # 依赖包
```

### 1.2.3 package.json 详解

```json
{
    "name": "my-app",           // 项目名称
    "version": "1.0.0",         // 版本号
    "description": "我的应用",   // 描述
    "main": "src/index.js",     // 入口文件
    "scripts": {                // 脚本命令
        "start": "node src/index.js",
        "dev": "nodemon src/index.js",
        "test": "jest"
    },
    "keywords": ["node", "app"],
    "author": "张三",
    "license": "MIT",
    "dependencies": {           // 生产依赖
        "express": "^4.18.0"
    },
    "devDependencies": {         // 开发依赖
        "nodemon": "^2.0.0"
    }
}
```

---

## 1.3 全局对象

### 1.3.1 什么是全局对象？

```
┌─────────────────────────────────────────────────────────────┐
│  全局对象 = 在任何地方都可以访问的对象                       │
│                                                             │
│  就像：                                                     │
│  - 公司的公共白板：所有人都能看到和修改                      │
│  - 家庭的客厅：家里任何房间都能进入                          │
│                                                             │
│  Node.js 的全局对象：                                        │
│  - global（类似浏览器的 window）                            │
│  - process（进程信息）                                       │
│  - __dirname（当前目录）                                    │
│  - __filename（当前文件）                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.3.2 __dirname 和 __filename

```javascript
// __dirname - 当前模块所在的目录路径
console.log(__dirname);
// 输出：/Users/zhangsan/project/src

// __filename - 当前模块的文件路径
console.log(__filename);
// 输出：/Users/zhangsan/project/src/index.js

// 实际应用：拼接文件路径
const path = require('path');
const configPath = path.join(__dirname, 'config.json');
```

### 1.3.3 process 对象

```
┌─────────────────────────────────────────────────────────────┐
│  process = 进程对象，管理 Node.js 进程信息                   │
│                                                             │
│  就像：                                                     │
│  - 公司的前台：管理公司的大小事务                            │
│  - 操作系统的工作管理器：查看进程状态                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

```javascript
// process.argv - 命令行参数
// node index.js arg1 arg2
console.log(process.argv);
// ['node路径', '文件路径', 'arg1', 'arg2']

// process.env - 环境变量
console.log(process.env.NODE_ENV);  // development
console.log(process.env.PORT);      // 3000

// 设置环境变量
// PORT=3000 node index.js

// process.cwd() - 当前工作目录
console.log(process.cwd());  // /Users/zhangsan/project

// process.exit() - 退出进程
process.exit(0);  // 正常退出
process.exit(1);  // 异常退出

// process.memoryUsage() - 内存使用
console.log(process.memoryUsage());
// {
//   rss: 24MB,
//   heapTotal: 8MB,
//   heapUsed: 4MB,
//   external: 1MB
// }
```

### 1.3.4 global 对象

```javascript
// global - 全局对象（类似浏览器的 window）
global.myVar = 'Hello';
console.log(myVar);  // Hello（在其他模块也能访问）

// 谨慎使用全局变量
// 最好用模块作用域或闭包
```

---

## 1.4 模块系统

### 1.4.1 什么是模块？

```
┌─────────────────────────────────────────────────────────────┐
│  模块 = 代码的"打包盒"                                       │
│                                                             │
│  就像：                                                     │
│  - 公司的部门：每个部门负责不同工作                          │
│  - 汽车的零件：发动机、轮子、方向盘                          │
│  - 厨房的厨具：刀、锅、勺子                                  │
│                                                             │
│  模块的好处：                                                │
│  - 代码复用：一次编写，多次使用                              │
│  - 便于维护：修改一个模块，不影响其他                        │
│  - 命名空间：避免变量名冲突                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.4.2 CommonJS 模块

**导出方式：**

```javascript
// math.js - 导出模块

// 方式 1：导出单个值
const PI = 3.14159;
module.exports = PI;

// 方式 2：导出多个值（对象）
const PI = 3.14159;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    PI,
    add,
    subtract
};

// 方式 3：使用 exports（简写）
exports.add = add;
exports.subtract = subtract;

// 注意：exports 是 module.exports 的引用
// 但 exports = {} 会断开引用！
```

**导入方式：**

```javascript
// main.js - 导入模块

// 导入整个模块
const math = require('./math.js');
console.log(math.add(1, 2));  // 3

// 解构导入
const { add, PI } = require('./math.js');
console.log(add(1, 2));  // 3
console.log(PI);         // 3.14159
```

### 1.4.3 ES Module

**导出方式：**

```javascript
// math.mjs

// 命名导出
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// 默认导出
export default function multiply(a, b) { return a * b; }
```

**导入方式：**

```javascript
// main.mjs

// 导入命名导出
import { PI, add } from './math.mjs';

// 导入默认导出
import multiply from './math.mjs';

// 导入全部
import * as Math from './math.mjs';
```

**配置：**

```json
// package.json
{
    "type": "module"  // 启用 ES Module
}
```

### 1.4.4 CommonJS vs ES Module

```
┌─────────────────────────────────────────────────────────────┐
│                    CommonJS vs ES Module                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CommonJS：                                                 │
│  - 同步加载（适合服务器）                                    │
│  - module.exports 导出                                      │
│  - require() 导入                                           │
│  - Node.js 默认支持                                         │
│                                                             │
│  ES Module：                                                │
│  - 异步加载（适合浏览器）                                    │
│  - export 导出                                              │
│  - import 导入                                               │
│  - 需要设置 "type": "module"                                │
│                                                             │
│  推荐：                                                     │
│  - Node.js 项目：CommonJS（兼容性好）                       │
│  - 新项目/前端：ES Module                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 1.5 核心模块

### 1.5.1 path 模块 - 路径处理

```
┌─────────────────────────────────────────────────────────────┐
│  path = 处理文件路径的工具                                   │
│                                                             │
│  就像：                                                     │
│  - 导航仪：帮你规划路线                                      │
│  - 地址簿：记录各种地址                                      │
│                                                             │
│  主要功能：                                                  │
│  - 拼接路径                                                 │
│  - 解析路径                                                 │
│  - 获取文件名/扩展名                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

```javascript
const path = require('path');

// 路径拼接
path.join('/users', 'zhangsan', 'file.txt');
// 结果：/users/zhangsan/file.txt

// 解析为绝对路径
path.resolve('file.txt');
// 结果：/Users/zhangsan/project/file.txt

// 解析路径（获取各部分）
path.parse('/users/zhangsan/file.txt');
// 结果：
// {
//   root: '/',
//   dir: '/users/zhangsan',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// 获取文件名
path.basename('/users/zhangsan/file.txt');
// 结果：file.txt

// 获取扩展名
path.extname('/users/zhangsan/file.txt');
// 结果：.txt

// 获取目录名
path.dirname('/users/zhangsan/file.txt');
// 结果：/users/zhangsan
```

### 1.5.2 fs 模块 - 文件系统

```
┌─────────────────────────────────────────────────────────────┐
│  fs = 操作文件的工具                                         │
│                                                             │
│  就像：                                                     │
│  - 文件管理器：创建、读取、修改、删除文件                     │
│  - 仓库管理员：整理和查找文件                                │
│                                                             │
│  主要功能：                                                  │
│  - 读取文件                                                 │
│  - 写入文件                                                 │
│  - 创建目录                                                 │
│  - 删除文件/目录                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

```javascript
const fs = require('fs').promises;

// 读取文件
const content = await fs.readFile('file.txt', 'utf-8');
console.log(content);

// 写入文件（覆盖）
await fs.writeFile('output.txt', 'Hello World');

// 追加内容
await fs.appendFile('log.txt', 'new line\n');

// 读取目录
const files = await fs.readdir('./src');
console.log(files);  // ['index.js', 'utils.js', ...]

// 创建目录
await fs.mkdir('./new-folder');

// 删除文件
await fs.unlink('old-file.txt');

// 检查文件是否存在
await fs.access('file.txt');  // 不报错表示存在

// 获取文件信息
const stat = await fs.stat('file.txt');
console.log(stat.isFile());      // true
console.log(stat.isDirectory()); // false
console.log(stat.size);          // 文件大小（字节）
console.log(stat.mtime);         // 修改时间
```

**同步 vs 异步：**

```javascript
// 异步（推荐）
const fs = require('fs').promises;
await fs.readFile('file.txt');

// 同步（不推荐，会阻塞）
const fsSync = require('fs');
const content = fsSync.readFileSync('file.txt');

// 回调风格
const fs = require('fs');
fs.readFile('file.txt', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

### 1.5.3 events 模块 - 事件处理

```
┌─────────────────────────────────────────────────────────────┐
│  events = 事件发射和处理机制                                │
│                                                             │
│  就像：                                                     │
│  - 公司的通知系统：发布消息，相关人收到通知                    │
│  - 电视台：发射信号，电视接收并显示                          │
│  - 门铃：有人按铃，屋内人听到并开门                          │
│                                                             │
│  核心概念：                                                  │
│  - 发射器（Emitter）：发射事件                               │
│  - 监听器（Listener）：接收事件处理                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

```javascript
const EventEmitter = require('events');

// 创建事件发射器
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

// 监听事件
emitter.on('event', (arg) => {
    console.log('事件触发了！', arg);
});

// 触发事件
emitter.emit('event', 'Hello');

// 一次性事件（只触发一次）
emitter.once('once-event', () => {
    console.log('只会触发一次');
});

// 移除监听器
function handler() {
    console.log('触发');
}
emitter.on('event', handler);
emitter.removeListener('event', handler);

// 事件类型
emitter.on('error', (err) => {
    console.error('发生错误:', err);
});
```

### 1.5.4 util 模块 - 工具函数

```javascript
const util = require('util');

// 格式化字符串（类似 printf）
util.format('Hello %s, you are %d years old', '张三', 25);
// 结果：Hello 张三, you are 25 years old

// 格式化说明符：
// %s - 字符串
// %d - 数字
// %j - JSON
// %o - 对象

// promisify - 将回调函数转为 Promise
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
const content = await readFile('file.txt', 'utf-8');

// inspect - 查看对象信息
const obj = { name: '张三', age: 25 };
console.log(util.inspect(obj));
// { name: '张三', age: 25 }

// 继承（ES6 后推荐使用 class extends）
util.inherits(MyClass, ParentClass);
```

---

## 1.6 npm 包管理

### 1.6.1 常用命令

```bash
# 初始化项目
npm init -y

# 安装依赖
npm install express          # 安装生产依赖
npm install -D nodemon       # 安装开发依赖
npm install                  # 安装所有依赖

# 全局安装
npm install -g nodemon

# 更新依赖
npm update express

# 删除依赖
npm uninstall express

# 查看依赖
npm list                     # 查看已安装
npm list express            # 查看特定包
npm outdated                 # 查看可更新的包
```

### 1.6.2 package.json 版本号

```
┌─────────────────────────────────────────────────────────────┐
│  版本号格式：major.minor.patch                               │
│                                                             │
│  - major：不兼容的 API 变更                                 │
│  - minor：向后兼容的新功能                                   │
│  - patch：向后兼容的 bug 修复                               │
│                                                             │
│  符号：                                                     │
│  - ^1.2.3：允许 minor 和 patch 更新（~1.2.3 只允许 patch）│
│  - latest：最新版本                                         │
│  - *：任意版本                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.6.3 npx 运行命令

```bash
# 运行本地安装的命令
npx nodemon index.js

# 运行远程包
npx create-react-app my-app

# 不安装直接运行
npx cowsay "Hello"
```

---

## 1.7 实践练习

### 练习 1：创建计算器模块

```javascript
// calculator.js
module.exports = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : '不能除以零'
};

// main.js
const calculator = require('./calculator');

console.log(calculator.add(1, 2));      // 3
console.log(calculator.divide(10, 2)); // 5
console.log(calculator.divide(10, 0)); // 不能除以零
```

### 练习 2：文件操作

```javascript
const fs = require('fs').promises;
const path = require('path');

async function main() {
    // 创建目录
    await fs.mkdir('./logs', { recursive: true });
    
    // 写入日志
    const timestamp = new Date().toISOString();
    await fs.appendFile('./logs/app.log', `${timestamp} - 应用启动\n`);
    
    // 读取日志
    const logs = await fs.readFile('./logs/app.log', 'utf-8');
    console.log(logs);
}

main();
```

---

## 1.8 常见问答

### Q1: Node.js 和浏览器 JavaScript 有什么区别？

```javascript
// 浏览器：有 window、document、DOM
document.getElementById('app');
window.alert('Hello');

// Node.js：没有 window、document
// 有 global、process、fs、http 等
const http = require('http');
console.log(process.env);
```

### Q2: 同步和异步怎么选择？

```javascript
// 异步（推荐）：不阻塞主线程
async function readAsync() {
    const data = await fs.readFile('file.txt');
    return data;
}

// 同步（谨慎）：会阻塞主线程
function readSync() {
    return fs.readFileSync('file.txt');
}

// 场景选择：
// - 文件 I/O、网络请求：异步
// - 启动脚本、简单工具：同步也可以
```

### Q3: module.exports 和 exports 有什么区别？

```javascript
// 两者初始时指向同一个对象
console.log(module.exports === exports);  // true

// 但赋值会断开引用
exports = { name: 'new' };  // 断开！
module.exports = { name: 'new' };  // 正确

// 常见正确用法
exports.add = (a, b) => a + b;  // 保持引用
module.exports = { add: (a, b) => a + b };  // 直接赋值
```

---

## 1.9 学习资源

### 官方文档

- [Node.js 官网](https://nodejs.org/)
- [Node.js 文档](https://nodejs.org/docs/)

### 推荐教程

- [Node.js 入门教程](https://nodejs.dev/learn)
- [MDN Node.js 简介](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Express_Nodejs/Introduction)

---

**上一章：** [← 05-typescript/](../05-typescript/)  
**下一章：** [→ 02-HTTP 与 Web 开发](./02-HTTP%20与%20Web%20开发.md)