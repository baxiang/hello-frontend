# let/const 与作用域

> 从零开始理解现代 JavaScript 变量声明方式

## 学习目标

- ✅ 掌握 let 和 const 的基本用法
- ✅ 理解块级作用域的概念
- ✅ 理解暂时性死区（TDZ）
- ✅ 能够正确选择 var/let/const

---

## 1.0 为什么要学 let 和 const？

### 1.0.1 故事背景：var 的历史遗留问题

在 ES6 之前，JavaScript 只有 `var` 一种方式来声明变量。`var` 是在 1995 年 JavaScript 诞生时就有的特性，当时设计者可能没想到 JavaScript 会发展到今天这个规模。

随着 JavaScript 应用的复杂度增加，`var` 的三个"缺陷"逐渐暴露出来：

```
┌─────────────────────────────────────────────────────────────┐
│                    var 的三大问题                            │
├─────────────────────────────────────────────────────────────┤
│  1. 变量提升（Hoisting）                                     │
│     → 变量还没声明就能使用，违反直觉                         │
│                                                             │
│  2. 没有块级作用域                                          │
│     → 在 if/for 语句中声明的变量会泄漏到外部                 │
│                                                             │
│  3. 循环闭包问题                                            │
│     → 循环中的变量是共享的，导致意外结果                    │
└─────────────────────────────────────────────────────────────┘
```

### 1.0.2 ES6 的解决方案

2015 年，ECMAScript 6（简称 ES6）正式发布，带来了两个新的变量声明关键字：

```
┌─────────────────────────────────────────────────────────────┐
│                    ES6 新增的变量声明                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  let（发音：let）                                           │
│  → 可变的变量，相当于"可以改的盒子"                         │
│  → 修复了 var 的三个问题                                    │
│                                                             │
│  const（发音：const）                                       │
│  → 不可变的常量，相当于"不能改的盒子"                       │
│  → 同样修复了 var 的问题                                   │
│  → 声明时必须初始化（赋值）                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.0.3 本章学习路径

```
第一步：理解 var 的问题（为什么需要 let/const）
    ↓
第二步：学习 let 的用法（可变的变量）
    ↓
第三步：学习 const 的用法（不可变的常量）
    ↓
第四步：理解块级作用域（let/const 的核心优势）
    ↓
第五步：理解暂时性死区（TDZ）
    ↓
第六步：掌握最佳实践
```

---

## 1.1 var 的问题详解

> 在学习 let 和 const 之前，我们需要先理解 var 到底有什么问题。
> 只有理解了"为什么"，才能更好地理解"怎么做"。

### 1.1.1 问题一：变量提升（Hoisting）

**什么是变量提升？**

变量提升是 JavaScript 的一种特殊行为：变量的声明会被"提升"到作用域顶部，但赋值不会。

让我用一个生活中的例子来解释：

```
想象你在整理房间：

传统思维（没有变量提升）：
┌─────────────────────────────────────┐
│  1. 先把东西放到盒子里              │
│  2. 然后才能使用                    │
└─────────────────────────────────────┘

实际情况（有变量提升）：
┌─────────────────────────────────────┐
│  1. 先拿到一个空盒子（声明提升）     │
│  2. 盒子里是空的（undefined）       │
│  3. 然后再把东西放进去（赋值）       │
└─────────────────────────────────────┘
```

**代码演示：**

```javascript
// 代码是这样写的：
console.log(myName);  // 第 1 行
var myName = '张三';  // 第 2 行

// JavaScript 实际是这样执行的：
var myName;           // 声明被提升到顶部
console.log(myName);  // undefined（不是报错！）
myName = '张三';      // 赋值留在原地
```

**为什么这是问题？**

```javascript
// 这段代码看起来会报错，但实际上不会！
console.log(a);  // undefined（而不是报错）
var a = 1;

// 对比：如果用 let 会怎样？
// console.log(b);  // ReferenceError: Cannot access 'b' before initialization
// let b = 1;
```

这种行为违反了直觉，可能会导致难以发现的 bug。

### 1.1.2 问题二：没有块级作用域

**什么是块级作用域？**

在 JavaScript 中，`{}` 包裹的代码称为一个"块"（Block）。块级作用域意味着在块内声明的变量只能在这个块内访问。

**var 的问题：var 没有块级作用域**

```javascript
// 示例 1：if 语句中的变量泄漏
if (true) {
    var secret = '我是秘密';
}
console.log(secret);  // '我是秘密'（泄漏到外部了！）

// 示例 2：for 循环中的变量泄漏
for (var i = 0; i < 3; i++) {
    // 循环中
}
console.log(i);  // 3（循环结束后 i 仍然存在）
```

**生活中的例子：**

```
┌─────────────────────────────────────────────────────────────┐
│  块级作用域 = 房间                                           │
│                                                             │
│  正确理解（let/const）：                                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  房间 A（块级作用域）                                │    │
│  │  ├── 变量 x：只能在这个房间里用                     │    │
│  │  └── 出了房间就用不了了                             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  错误理解（var）：                                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  房间 A                                              │    │
│  │  ├── 变量 x：虽然在这里声明，但走廊上也能用！       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  → var 声明的变量会"泄漏"到函数或全局作用域                  │
└─────────────────────────────────────────────────────────────┘
```

### 1.1.3 问题三：循环中的闭包问题

**这是最经典的问题之一**

```javascript
// 使用 var 的循环
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);  // 输出什么？
    }, 100);
}
// 输出：3, 3, 3（而不是 0, 1, 2）
```

**为什么会这样？**

让我逐步分析：

```
步骤 1：循环开始，创建 var i = 0
步骤 2：setTimeout 被调用，它创建了一个"回调函数"
步骤 3：循环继续，i 变成 1
步骤 4：setTimeout 被调用
步骤 5：循环继续，i 变成 2
步骤 6：setTimeout 被调用
步骤 7：循环继续，i 变成 3
步骤 8：循环结束（i < 3 为 false）
步骤 9：100ms 后，三个 setTimeout 回调函数执行
        此时 i 的值是 3（因为 var i 是共享的）
        所以输出 3, 3, 3
```

**生活化的比喻：**

```
想象你在拍照：

var 版本：
┌─────────────────────────────────────────────────────────────┐
│  摄影师（setTimeout）说："等一下，我过 100ms 后再拍"        │
│  但摄影师记住的不是你站的位置，而是"最后一个人的位置"       │
│  等到拍照时，大家都已经站好了（i=3），所以拍到的是第 3 个人 │
└─────────────────────────────────────────────────────────────┘

let 版本：
┌─────────────────────────────────────────────────────────────┐
│  摄影师给每个人单独的提示："100ms 后给我拍照"                │
│  每个人记住的是自己站的位置                                  │
│  所以拍到的是 0, 1, 2                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 1.2 let 的基本用法

> 理解了 var 的问题，现在学习 let 如何解决这些问题。

### 1.2.1 let 的声明语法

```javascript
// 基本语法：let 变量名 = 值;
let name = '张三';
let age = 25;
let isStudent = true;

// 可以重新赋值
age = 26;  // ✅ 允许
console.log(age);  // 26
```

### 1.2.2 let 的核心特性

**特性 1：块级作用域**

```javascript
// let 声明的变量只在 {} 块内有效
{
    let blockVar = '我在块里面';
    console.log(blockVar);  // ✅ 可以访问
}
console.log(blockVar);  // ❌ ReferenceError: blockVar is not defined
```

**特性 2：不能重复声明**

```javascript
let name = '张三';
// let name = '李四';  // ❌ SyntaxError: Identifier 'name' has already been declared
name = '李四';  // ✅ 可以重新赋值
```

**特性 3：不会变量提升（存在 TDZ）**

```javascript
// console.log(x);  // ❌ ReferenceError（不是 undefined）
let x = 1;
```

### 1.2.3 for 循环中的 let

**这是 let 最重要的应用场景之一**

```javascript
// 使用 let 的循环 - 正确！
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);  // 0, 1, 2（正确！）
    }, 100);
}
```

**为什么 let 能解决这个问题？**

```
关键区别：
┌─────────────────────────────────────────────────────────────┐
│  var i：整个函数只有一个 i，循环结束后 i = 3               │
│                                                             │
│  let i：每次循环迭代都会创建新的 i（新的作用域）            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  第 1 次迭代：创建 i=0                              │    │
│  │  第 2 次迭代：创建 i=1（新的，不是之前的 i）        │    │
│  │  第 3 次迭代：创建 i=2（新的）                      │    │
│  └─────────────────────────────────────────────────────┘    │
│  每个 setTimeout 回调函数记住的是自己那个 i                │
└─────────────────────────────────────────────────────────────┘
```

---

## 1.3 const 的基本用法

> const 用于声明"常量"——不应该改变的值

### 1.3.1 const 的声明语法

```javascript
// 基本语法：const 变量名 = 值;
const PI = 3.14159;
const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
```

### 1.3.2 const 的核心特性

**特性 1：声明时必须初始化**

```javascript
// const 必须立即赋值
const PI = 3.14159;  // ✅ 正确

// const PI;  // ❌ SyntaxError: Missing initializer in const declaration
```

**特性 2：不能重新赋值**

```javascript
const PI = 3.14159;
// PI = 3;  // ❌ TypeError: Assignment to constant variable
```

**特性 3：对象和数组的内容可以修改**

```javascript
// const 保证的是"引用"不变，不是"内容"不变
const user = { name: '张三' };

// 可以修改属性
user.name = '李四';  // ✅ 可以
user.age = 25;       // ✅ 可以

// 不能重新赋值
// user = {};  // ❌ TypeError
```

**生活比喻：**

```
const 就像一份"租约"：
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  你租了一个柜子（const user = {...}）                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  柜子本身不能换（user = {} 不行）                    │   │
│  │  但柜子里的东西可以换（user.name = '李四' 可以）    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  → const 保证的是"柜子的位置"不变                           │
│  → 不保证"柜子里装什么"不变                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.3.3 冻结对象（Object.freeze）

如果需要让对象完全不可修改，使用 `Object.freeze`：

```javascript
const config = Object.freeze({
    theme: 'dark',
    language: 'zh-CN'
});

config.theme = 'light';  // 静默失败（非严格模式）或报错（严格模式）
console.log(config.theme);  // 'dark'（没有改变）
```

---

## 1.4 块级作用域详解

> 块级作用域是 let 和 const 最重要的特性

### 1.4.1 什么是块？

在 JavaScript 中，`{}` 包裹的代码就是一个块：

```javascript
// 这是一个块
{
    let a = 1;
    const b = 2;
}

// if 语句的块
if (condition) {
    // ...
}

// for 循环的块
for (let i = 0; i < 10; i++) {
    // ...
}

// 单独的块
{
    let temp = '临时变量';
}
```

### 1.4.2 块级作用域的实际应用

**场景 1：避免变量污染**

```javascript
function processData() {
    // 使用块级作用域隔离临时变量
    {
        let tempData = fetchTemp();
        console.log(process(tempData));
    }
    
    {
        let userData = fetchUser();
        console.log(processUser(userData));
    }
    
    // tempData 和 userData 不会相互影响
}
```

**场景 2：条件分支中的变量**

```javascript
// var 版本（有问题）
if (false) {
    var result = 'A';
}
console.log(result);  // undefined（不是报错！）

// let 版本（正确）
if (false) {
    let result = 'A';
}
console.log(result);  // ReferenceError
```

### 1.4.3 块级作用域的嵌套

```javascript
{
    let outer = '外层';
    {
        let inner = '内层';
        console.log(outer);  // ✅ 可以访问外层
        console.log(inner);  // ✅
    }
    // console.log(inner);  // ❌ ReferenceError
}
console.log(outer);  // ✅
```

---

## 1.5 暂时性死区（TDZ）

> 暂时性死区是 let/const 最重要的概念之一

### 1.5.1 什么是 TDZ？

TDZ = Temporal Dead Zone（暂时性死区）

```
┌─────────────────────────────────────────────────────────────┐
│  暂时性死区 = 从块开始到变量声明之间的区域                   │
│                                                             │
│  在这个区域内：                                             │
│  - 变量已经存在（因为在块级作用域内）                        │
│  - 但不能访问（会报错）                                     │
│  - 只有执行到声明语句后，才能正常使用                       │
└─────────────────────────────────────────────────────────────┘
```

### 1.5.2 TDZ 图解

```javascript
{
    // ↓ 这里开始是 TDZ
    // ↓ 变量 a 存在但不能访问
    console.log(a);  // ❌ ReferenceError
    
    let a = 'hello';  // ← 这里是 TDZ 的终点
    
    console.log(a);  // ✅ 'hello'（TDZ 结束）
}
```

### 1.5.3 TDZ 的实际影响

**影响 1：typeof 操作符**

```javascript
// 对于未声明的变量，typeof 是安全的
console.log(typeof undefinedVar);  // 'undefined'

// 但对于 let/const 声明的变量（在 TDZ 中），typeof 会报错
{
    console.log(typeof letVar);  // ❌ ReferenceError
    let letVar = 'test';
}
```

**影响 2：函数默认参数**

```javascript
// 默认参数也有 TDZ
function foo(a = b, b = 1) {
    console.log(a, b);
}
foo();  // ❌ ReferenceError: Cannot access 'b' before initialization

// 解释：默认参数从左到右计算
// 当计算 a = b 时，b 还在 TDZ 中
```

**影响 3：循环中的 let**

```javascript
// 每次迭代都有独立的 TDZ
for (let i = 0; i < 3; i++) {
    // 这里的 i 是当前迭代新创建的
    setTimeout(() => console.log(i), 100);
}
```

---

## 1.6 var vs let vs const 对比

### 1.6.1 特性对比表

| 特性 | var | let | const |
|------|-----|-----|-------|
| **作用域** | 函数级 | 块级 | 块级 |
| **变量提升** | ✅ 是 | ❌ 否 | ❌ 否 |
| **暂时性死区** | ❌ 否 | ✅ 是 | ✅ 是 |
| **重复声明** | ✅ 允许 | ❌ 不允许 | ❌ 不允许 |
| **重新赋值** | ✅ 允许 | ✅ 允许 | ❌ 不允许 |
| **初始化** | 可选 | 可选 | 必须 |

### 1.6.2 使用建议

```
┌─────────────────────────────────────────────────────────────┐
│                    最佳实践                                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 优先使用 const                                          │
│     → 不会改变的值用 const                                   │
│     → 如：配置常量、API URL、数学常数                        │
│                                                             │
│  2. 需要改变时使用 let                                      │
│     → 计数器、累加器等需要改变                               │
│     → 循环中的索引                                          │
│                                                             │
│  3. 永远不要使用 var                                        │
│     → 现代 JavaScript 中 var 没有优势                        │
│     → 只有在维护旧代码时可能需要                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.6.3 代码示例

```javascript
// ✅ 好的实践
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 5000;

let retryCount = 0;
let isConnected = false;

for (let i = 0; i < 10; i++) {
    // ...
}

// ❌ 不好的实践
var name = '张三';  // 用 const
var count = 0;      // 用 let
```

---

## 1.7 实践练习

### 练习 1：预测输出结果

```javascript
// 练习 1.1
console.log('--- 1.1 ---');
console.log(a);  // 输出什么？
var a = 1;

// 练习 1.2
console.log('--- 1.2 ---');
{
    let b = 2;
    console.log(b);  // 输出什么？
}
// console.log(b);  // 这行会报错吗？

// 练习 1.3
console.log('--- 1.3 ---');
for (var i = 0; i < 3; i++) {
    // 这里的 setTimeout 会输出什么？
}
console.log('循环后:', i);

// 练习 1.4
console.log('--- 1.4 ---');
const obj = { name: '张三' };
obj.name = '李四';
console.log(obj.name);  // 输出什么？
// obj = {};  // 这行会报错吗？
```

### 练习 2：修复代码

```javascript
// 练习 2.1：修复循环问题
// 期望输出：0, 1, 2
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);
    }, 100);
}

// 你的修复方案：
// ...

// 练习 2.2：选择正确的声明方式
// 为以下场景选择 let 或 const

// 场景 1：圆的周长公式（固定不变）
const PI = 3.14159;  // 答案

// 场景 2：用户点击次数（会变化）
let clickCount = 0;  // 答案

// 场景 3：用户对象（属性会变，但引用不变）
const currentUser = { name: '张三' };  // 答案

// 场景 4：循环索引
for (let i = 0; i < 10; i++) {}  // 答案
```

### 练习 3：实现功能

```javascript
// 练习 3.1：使用块级作用域交换变量
let a = 1;
let b = 2;

// 使用块级作用域交换 a 和 b 的值
{
    // 在这里添加代码
}

console.log(a, b);  // 期望输出：2, 1

// 练习 3.2：统计函数调用次数
function createCounter() {
    // 使用 let 创建一个计数器
    // 返回一个函数，每次调用返回调用次数
    
    let count = 0;
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
```

---

## 1.8 常见问答

### Q1: const 声明的对象真的不能修改吗？

**答：** const 保证的是引用（内存地址）不变，不是值不变。

```javascript
const obj = { name: '张三' };

// ✅ 可以修改属性
obj.name = '李四';
obj.age = 25;
obj.hobbies = ['coding', 'reading'];

// ❌ 不能重新赋值
// obj = {};  // TypeError

// 如果需要完全不可变，使用 Object.freeze
const frozen = Object.freeze({ name: '张三' });
frozen.name = '李四';  // 静默失败或报错
```

### Q2: 什么时候用 let，什么时候用 const？

**答：** 遵循"最小可变原则"。

```javascript
// 默认使用 const
const API_URL = 'https://api.example.com';
const MAX_COUNT = 100;
const config = { theme: 'dark' };

// 只有确定需要重新赋值时，才用 let
let count = 0;
count++;
count = count + 1;

// 常见场景
for (let i = 0; i < 10; i++) { }  // 循环变量
let result = '';  // 需要累积结果
```

### Q3: var 是不是完全不能用了？

**答：** 在现代 JavaScript 开发中，应该避免使用 var。但在以下情况需要理解 var：

1. 维护旧代码时
2. 阅读历史遗留代码时
3. 理解 JavaScript 语言发展时

### Q4: 为什么 const 声明时必须赋值？

```javascript
// const 必须初始化
const PI = 3.14159;  // ✅

// const PI;  // ❌ SyntaxError
```

这是设计决策：如果 const 不初始化，后来再赋值会报错（因为 const 不能重新赋值），所以不如强制要求初始化。

---

## 1.9 学习资源

### 官方文档

- [MDN - let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)
- [MDN - 块级作用域](https://developer.mozilla.org/zh-CN/docs/Glossary/Block)

### 推荐教程

- [ES6 入门教程 - 阮一峰](https://es6.ruanyifeng.com/#docs/let)
- [JavaScript.info - 变量](https://zh.javascript.info/variables)

---

**上一章：** [← ES6+ 学习路线](./README.md)  
**下一章：** [→ 02-箭头函数](./02-箭头函数.md)