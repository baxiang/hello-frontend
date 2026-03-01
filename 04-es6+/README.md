# ES6+ 系统学习教程

> 现代 JavaScript 特性完整学习路线：从 ES6 到 ES2022

---

## 教程特色

- **系统化学习** - 从 ES6 基础到最新特性，循序渐进
- **实战导向** - 每章都有实际应用场景和练习
- **对比学习** - 对比 ES5 和 ES6+ 写法差异
- **现代实践** - 掌握现代前端开发必备的 JavaScript 技能

---

## 完整学习路线

```
基础篇                    进阶篇                      高级篇
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 1 章       │          │ 第 4 章       │           │ 第 7 章       │
│ let/const    │ ──────▶  │ 模板字符串   │ ──────▶   │ 模块化       │
│ 块级作用域   │          │ Symbol       │           │ import/export│
└─────────────┘          └─────────────┘           └─────────────┘
       │                        │                         │
       ▼                        ▼                         ▼
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 2 章       │          │ 第 5 章       │           │ 第 8 章       │
│ 箭头函数     │ ──────▶  │ Map/Set      │ ──────▶   │ Promise      │
│ this 绑定    │          │ 新数据结构   │           │ async/await  │
└─────────────┘          └─────────────┘           └─────────────┘
       │                        │                         │
       ▼                        ▼                         ▼
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 3 章       │          │ 第 6 章       │           │ 第 9 章       │
│ 解构与展开   │ ──────▶  │ Class 类     │ ──────▶   │ ES2017-2022  │
│ 剩余参数     │          │ 继承         │           │ 历年新特性   │
└─────────────┘          └─────────────┘           └─────────────┘
```

---

## 章节详情

### 基础篇

#### 第 1 章：let/const 与作用域
掌握现代变量声明方式和作用域概念。

| 小节 | 内容 | 难度 |
|------|------|------|
| 1.1 | let 和 const 的基本用法 | ⭐ |
| 1.2 | 块级作用域概念 | ⭐⭐ |
| 1.3 | 暂时性死区（TDZ） | ⭐⭐ |
| 1.4 | var vs let vs const 对比 | ⭐ |
| 1.5 | 全局对象属性 | ⭐⭐ |
| 1.6 | 循环中的作用域 | ⭐⭐⭐ |
| 1.7 | 实践练习 | ⭐⭐ |

**学习目标：**
- 理解 let 和 const 的区别
- 掌握块级作用域的概念
- 理解暂时性死区
- 能够正确选择变量声明方式

---

#### 第 2 章：箭头函数
学习箭头函数的语法和 this 绑定规则。

| 小节 | 内容 | 难度 |
|------|------|------|
| 2.1 | 箭头函数语法基础 | ⭐ |
| 2.2 | 单表达式和函数体 | ⭐ |
| 2.3 | this 绑定规则 | ⭐⭐⭐ |
| 2.4 | 与普通函数的区别 | ⭐⭐⭐ |
| 2.5 | 使用场景 | ⭐⭐ |
| 2.6 | 注意事项 | ⭐⭐ |
| 2.7 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握箭头函数的语法
- 理解 this 绑定规则
- 能够正确使用箭头函数
- 了解使用场景和注意事项

---

#### 第 3 章：解构赋值与展开运算符
掌握高效的赋值和拷贝技巧。

| 小节 | 内容 | 难度 |
|------|------|------|
| 3.1 | 数组解构基础 | ⭐ |
| 3.2 | 对象解构基础 | ⭐ |
| 3.3 | 嵌套解构 | ⭐⭐ |
| 3.4 | 默认值和解构失败 | ⭐⭐ |
| 3.5 | 展开运算符（数组） | ⭐⭐ |
| 3.6 | 展开运算符（对象） | ⭐⭐ |
| 3.7 | 剩余参数 | ⭐⭐⭐ |
| 3.8 | 参数解构 | ⭐⭐⭐ |
| 3.9 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握数组和对象的解构
- 理解展开运算符的用法
- 能够使用剩余参数
- 学会在函数参数中解构

---

### 进阶篇

#### 第 4 章：模板字符串与 Symbol
学习新的字符串表示和唯一标识符。

| 小节 | 内容 | 难度 |
|------|------|------|
| 4.1 | 模板字符串基础 | ⭐ |
| 4.2 | 表达式插值 | ⭐ |
| 4.3 | 标签模板 | ⭐⭐⭐ |
| 4.4 | String 新方法 | ⭐⭐ |
| 4.5 | Symbol 类型基础 | ⭐⭐⭐ |
| 4.6 | Symbol.for 和 keyFor | ⭐⭐⭐ |
| 4.7 | 内置 Symbol | ⭐⭐⭐ |
| 4.8 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握模板字符串的用法
- 了解标签模板函数
- 理解 Symbol 的特性和用途
- 能够使用 Symbol 创建唯一标识

---

#### 第 5 章：Map、Set 与 WeakMap
掌握新的数据结构。

| 小节 | 内容 | 难度 |
|------|------|------|
| 5.1 | Map 基础操作 | ⭐⭐ |
| 5.2 | Map 遍历 | ⭐⭐ |
| 5.3 | Map vs Object | ⭐⭐ |
| 5.4 | Set 基础操作 | ⭐⭐ |
| 5.5 | Set 运算（并集/交集/差集） | ⭐⭐⭐ |
| 5.6 | WeakMap 基础 | ⭐⭐⭐ |
| 5.7 | WeakSet 基础 | ⭐⭐⭐ |
| 5.8 | 应用场景 | ⭐⭐⭐ |
| 5.9 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握 Map 和 Set 的使用
- 理解 WeakMap 和 WeakSet 的特性
- 能够进行集合运算
- 了解实际应用场暯

---

#### 第 6 章：Class 类与继承
学习面向对象编程的新语法。

| 小节 | 内容 | 难度 |
|------|------|------|
| 6.1 | class 基础语法 | ⭐⭐ |
| 6.2 | 构造函数 | ⭐⭐ |
| 6.3 | 实例方法和静态方法 | ⭐⭐ |
| 6.4 | getter 和 setter | ⭐⭐⭐ |
| 6.5 | 继承（extends） | ⭐⭐⭐ |
| 6.6 | super 关键字 | ⭐⭐⭐ |
| 6.7 | 私有字段（#） | ⭐⭐⭐ |
| 6.8 | 静态块 | ⭐⭐⭐ |
| 6.9 | 实践练习 | ⭐⭐⭐ |

**学习目标：**
- 掌握 class 的基本语法
- 理解继承和 super 的用法
- 能够使用 getter 和 setter
- 了解私有字段的定义

---

### 高级篇

#### 第 7 章：模块化
掌握 ES6 模块系统。

| 小节 | 内容 | 难度 |
|------|------|------|
| 7.1 | ES6 Module 基础 | ⭐⭐ |
| 7.2 | export 导出 | ⭐⭐ |
| 7.3 | import 导入 | ⭐⭐ |
| 7.4 | 默认导出 | ⭐⭐ |
| 7.5 | 重命名导出/导入 | ⭐⭐ |
| 7.6 | 批量导出/导入 | ⭐⭐ |
| 7.7 | 动态导入（import()） | ⭐⭐⭐ |
| 7.8 | 与 CommonJS 对比 | ⭐⭐⭐ |
| 7.9 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握 import/export 语法
- 理解默认导出和命名导出的区别
- 能够使用动态导入
- 了解 ES6 Module 与 CommonJS 的区别

---

#### 第 8 章：Promise 与 async/await
掌握异步编程的现代方式。

| 小节 | 内容 | 难度 |
|------|------|------|
| 8.1 | Promise 基础概念 | ⭐⭐⭐ |
| 8.2 | then/catch 链式调用 | ⭐⭐⭐ |
| 8.3 | Promise.all | ⭐⭐⭐ |
| 8.4 | Promise.race | ⭐⭐⭐ |
| 8.5 | Promise.allSettled | ⭐⭐⭐ |
| 8.6 | Promise.any | ⭐⭐⭐ |
| 8.7 | async/await 语法 | ⭐⭐⭐ |
| 8.8 | 错误处理 | ⭐⭐⭐ |
| 8.9 | 并行执行 | ⭐⭐⭐⭐ |
| 8.10 | 实践练习 | ⭐⭐⭐ |

**学习目标：**
- 理解 Promise 的三种状态
- 掌握 Promise 链式调用
- 熟练使用 async/await
- 能够进行 Promise 组合和错误处理

---

#### 第 9 章：ES2017-ES2022 新特性
了解历年新增的实用特性。

| 小节 | 内容 | 难度 |
|------|------|------|
| 9.1 | ES2017: Object.values/entries | ⭐⭐ |
| 9.2 | ES2017: padStart/padEnd | ⭐⭐ |
| 9.3 | ES2017: Async 函数 | ⭐⭐⭐ |
| 9.4 | ES2018: 对象展开 | ⭐⭐ |
| 9.5 | ES2018: Async 迭代 | ⭐⭐⭐ |
| 9.6 | ES2019: flat/flatMap | ⭐⭐⭐ |
| 9.7 | ES2019: Object.fromEntries | ⭐⭐⭐ |
| 9.8 | ES2020: Optional chaining (?.) | ⭐⭐⭐ |
| 9.9 | ES2020: Nullish coalescing (??) | ⭐⭐⭐ |
| 9.10 | ES2020: BigInt | ⭐⭐ |
| 9.11 | ES2020: Promise.allSettled | ⭐⭐⭐ |
| 9.12 | ES2021: replaceAll | ⭐⭐ |
| 9.13 | ES2021: 逻辑赋值运算符 | ⭐⭐⭐ |
| 9.14 | ES2022: 顶层 await | ⭐⭐⭐ |
| 9.15 | ES2022: 私有字段增强 | ⭐⭐⭐ |
| 9.16 | ES2022: Array.at() | ⭐⭐ |
| 9.17 | 实践练习 | ⭐⭐⭐ |

**学习目标：**
- 了解 ES2017-ES2022 的新特性
- 掌握常用新特性的用法
- 能够在新项目中使用现代语法
- 理解各版本的重点更新

---

## 学习路径建议

### 入门阶段（1-2 周）
```
第 1 章 → 第 2 章 → 第 3 章
```
**目标：** 掌握 ES6 基础语法，能够编写现代 JavaScript 代码

**建议：**
- 理解 let/const 和块级作用域
- 熟练使用箭头函数
- 掌握解构赋值和展开运算符

---

### 进阶阶段（2-3 周）
```
第 4 章 → 第 5 章 → 第 6 章
```
**目标：** 掌握新的数据结构和 class 语法

**建议：**
- 理解 Map/Set 与 Object/Array 的区别
- 掌握 class 继承和 super 的用法
- 在实际项目中使用新语法

---

### 高级阶段（2-3 周）
```
第 7 章 → 第 8 章 → 第 9 章
```
**目标：** 掌握模块化和异步编程，了解最新特性

**建议：**
- 理解 ES6 Module 的工作方式
- 熟练使用 Promise 和 async/await
- 了解 ES2017-ES2022 的新特性

---

## 开发环境准备

### 安装 Node.js

```bash
# 下载安装包：https://nodejs.org/
# 推荐使用 LTS 版本（16.x 或更高）

# 查看版本
node -v
npm -v
```

### 项目配置

```json
// package.json
{
  "name": "es6-learning",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --experimental-modules src/index.js",
    "build": "babel src -d dist"
  },
  "devDependencies": {
    "@babel/cli": "^7.x",
    "@babel/core": "^7.x",
    "@babel/preset-env": "^7.x"
  }
}
```

### Babel 配置

```javascript
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: '> 0.25%, not dead',
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ]
};
```

### VS Code 配置

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "eslint.validate": ["javascript"],
  "javascript.updateImportsOnFileMove.enabled": "always"
}
```

---

## 常用代码片段

### 解构与展开

```javascript
// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// 对象解构
const { name, age, city = '北京' } = user;

// 展开运算符
const newArr = [...oldArr, 4, 5, 6];
const newObj = { ...oldObj, c: 3 };
```

### 箭头函数

```javascript
// 基本语法
const add = (a, b) => a + b;

// 返回对象
const getUser = () => ({ name: '张三' });

// 与 this
class Counter {
  constructor() {
    this.count = 0;
    setInterval(() => {
      this.count++;  // 这里的 this 是 Counter 实例
    }, 1000);
  }
}
```

### Promise 与 async/await

```javascript
// Promise 链
fetch('/api/user')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await
async function getUser() {
  try {
    const res = await fetch('/api/user');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// 并行执行
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
```

### 可选链与空值合并

```javascript
// 可选链
const city = user?.address?.city ?? '未知城市';

// 空值合并
const name = userName ?? '匿名用户';

// 逻辑赋值
a ??= b;  // 等价于 a = a ?? b
a ||= b;  // 等价于 a = a || b
a &&= b;  // 等价于 a = a && b
```

---

## 最佳实践

### ✅ 推荐做法

```javascript
// 1. 使用 const 和 let
const config = { debug: true };
let count = 0;

// 2. 使用箭头函数
const multiply = (a, b) => a * b;

// 3. 使用模板字符串
console.log(`Hello, ${name}!`);

// 4. 使用解构
const { name, age } = person;
const [first, ...rest] = arr;

// 5. 使用展开运算符
const merged = { ...obj1, ...obj2 };
const newArr = [...arr1, ...arr2];

// 6. 使用 async/await
async function fetchData() {
  const res = await fetch(url);
  return res.json();
}

// 7. 使用可选链
const value = data?.items?.[0]?.name ?? 'default';

// 8. 使用模块化
import { foo } from './module.js';
export const bar = 'bar';
```

### ❌ 避免做法

```javascript
// 1. 避免使用 var
var x = 1;  // ❌
const x = 1; // ✅

// 2. 避免使用 function 声明
function add(a, b) { return a + b; }  // ❌
const add = (a, b) => a + b;          // ✅

// 3. 避免回调地狱
getData(() => {
  getMore(() => {
    // 嵌套过深 ❌
  });
});
// 使用 Promise 链或 async/await ✅

// 4. 避免使用 arguments
function fn() {
  console.log(arguments);  // ❌
}
// 使用剩余参数
const fn = (...args) => args;  // ✅

// 5. 避免修改原型
Array.prototype.myMethod = () => {};  // ❌
```

---

## ES5 vs ES6+ 对比

### 变量声明

```javascript
// ES5
var name = '张三';

// ES6+
const name = '张三';
```

### 字符串拼接

```javascript
// ES5
var greeting = '你好，' + name + '！';

// ES6+
const greeting = `你好，${name}！`;
```

### 函数定义

```javascript
// ES5
var add = function(a, b) {
  return a + b;
};

// ES6+
const add = (a, b) => a + b;
```

### 对象方法

```javascript
// ES5
var obj = {
  name: '张三',
  sayHello: function() {
    console.log('你好');
  }
};

// ES6+
const obj = {
  name: '张三',
  sayHello() {
    console.log('你好');
  }
};
```

### 模块化

```javascript
// ES5 (CommonJS)
var module = require('./module');
module.exports = { foo: 'foo' };

// ES6+
import module from './module';
export const foo = 'foo';
```

---

## 学习资源

### 官方文档
- [MDN JavaScript 教程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [ECMAScript 规范](https://tc39.es/ecma262/)
- [Babel 文档](https://babeljs.io/docs/)

### 在线课程
- [ES6 入门教程 - 阮一峰](https://es6.ruanyifeng.com/)
- [JavaScript.info](https://zh.javascript.info/)
- [freeCodeCamp](https://www.freecodecamp.org/)

### 社区资源
- [Stack Overflow - JavaScript](https://stackoverflow.com/questions/tagged/javascript)
- [掘金 - JavaScript](https://juejin.cn/tag/JavaScript)
- [GitHub 优质项目](https://github.com/topics/es6)

### 工具推荐
- [Babel REPL](https://babeljs.io/repl) - 在线转译
- [TypeScript Playground](https://www.typescriptlang.org/play/) - 在线运行
- [Can I use](https://caniuse.com/) - 兼容性查询

---

## 浏览器兼容性

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| let/const | 49+ | 44+ | 10+ | 14+ |
| 箭头函数 | 45+ | 45+ | 10+ | 12+ |
| 模板字符串 | 41+ | 34+ | 9+ | 12+ |
| 解构赋值 | 49+ | 41+ | 10+ | 14+ |
| Promise | 32+ | 29+ | 8+ | 12+ |
| async/await | 55+ | 52+ | 10.1+ | 15+ |
| 模块化 | 61+ | 67+ | 11+ | 16+ |

> 注：旧浏览器可通过 Babel 转译使用 ES6+ 语法

---

**上一篇：** [← 03-javascript/](../03-javascript/)
**下一章：** [→ 05-typescript/](../05-typescript/)
**开始学习：** [→ 01-let/const 与作用域](./01-let-const 作用域.md)
