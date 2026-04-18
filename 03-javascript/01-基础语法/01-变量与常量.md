# JavaScript 变量与常量 ⭐

> var、let、const 的区别，变量提升与命名规范

---

## 学习目标

- 理解变量和常量的概念
- 掌握 var、let、const 三种声明方式的区别
- 理解变量提升和暂时性死区（TDZ）
- 学会正确的命名规范

---

## 生活化比喻

**变量就像"带标签的储物盒"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  储物盒                               │
├──────────────────────────────────────────────────────┤
│                                                      │
│    let = 可换内容的盒子                               │
│    ─────────────                                     │
│    盒子上贴好标签，里面的东西可以随时更换              │
│    但同一个标签只能贴一个盒子                         │
│                                                      │
│    const = 封死的盒子                                 │
│    ─────────────                                     │
│    盒子贴上标签并封死，不能换整个盒子                 │
│    但如果盒子里装的是个小柜子，柜子的抽屉可以开关      │
│    （对象/数组的内容可以修改）                        │
│                                                      │
│    var = 不安全的旧盒子（已淘汰）                     │
│    ─────────────────                                 │
│    同一个标签可以贴多个盒子，会搞混                   │
│    标签会"飘"到房间顶部（变量提升）                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 声明方式

**语法结构图：**

```
三种声明方式：

let 变量名 = 值;      ← 可修改，块级作用域
const 常量名 = 值;    ← 不可修改，块级作用域，必须初始化
var 变量名 = 值;      ← 可修改，函数作用域（不推荐）

使用建议：
优先 const → 需要修改时用 let → 永远不用 var
```

**最简示例（1-3行）：**

```javascript
const PI = 3.14159;
let count = 0; count++;
```

**详细示例：**

```javascript
// const — 值不变
const MAX_SIZE = 100;
const API_URL = 'https://api.example.com';

// let — 值会变
let isLoggedIn = false;
isLoggedIn = true;

// var — 不推荐
var name = '张三';  // 可以重复声明，容易出错
```

---

### 变量提升与 TDZ

**最简示例：**

```javascript
console.log(a);  // undefined（var 提升）
var a = 1;

console.log(b);  // ❌ ReferenceError（let 的暂时性死区）
let b = 2;
```

**详细示例：**

```javascript
// var 的变量提升
// 实际执行顺序：
var x;          // 声明提升到顶部
console.log(x); // undefined
x = 10;         // 赋值留在原地

// let/const 的暂时性死区（TDZ）
// 从块开始到声明之间，访问变量会报错
if (true) {
    // console.log(y);  // ❌ TDZ
    let y = 20;
    console.log(y);  // ✅ 20
}

// 循环中的经典问题
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var:', i), 0);
}
// 输出：3, 3, 3（i 是同一个变量）

for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log('let:', j), 0);
}
// 输出：0, 1, 2（每次循环 j 都是新变量）
```

---

### const 与对象

**最简示例：**

```javascript
const user = { name: '张三' };
user.name = '李四';  // ✅ 可以修改属性
// user = {};        // ❌ 不能重新赋值
```

**详细示例：**

```javascript
// const 保证引用不变，不保证内容不变
const arr = [1, 2, 3];
arr.push(4);       // ✅ [1, 2, 3, 4]
// arr = [];       // ❌

const obj = { name: '张三' };
obj.age = 25;      // ✅ { name: '张三', age: 25 }
delete obj.name;   // ✅ { age: 25 }
// obj = {};       // ❌

// 如果需要完全冻结
const frozen = Object.freeze({ name: '张三' });
// frozen.name = '李四';  // 无效（严格模式报错）
```

---

## L2 实践层：用好

### 三种声明对比

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 变量提升 | ✅ 是 | ❌ 否（有 TDZ） | ❌ 否（有 TDZ） |
| 重复声明 | ✅ 允许 | ❌ 不允许 | ❌ 不允许 |
| 重新赋值 | ✅ 允许 | ✅ 允许 | ❌ 不允许 |
| 必须初始化 | ❌ 否 | ❌ 否 | ✅ 是 |

### 反模式：不要这样做

```javascript
// ❌ 错误：用 var 声明（可能意外覆盖）
var count = 0;
if (true) {
    var count = 1;  // 覆盖了外面的 count
}
console.log(count);  // 1（不是预期的 0）

// ✅ 正确：用 let
let count = 0;
if (true) {
    let count = 1;  // 新的块级变量，不影响外面
}
console.log(count);  // 0
```

```javascript
// ❌ 错误：const 声明了却不用
const data;  // ❌ 必须初始化

// ❌ 错误：用 const 存会变的值
const count = 0;
count++;  // ❌ Assignment to constant variable

// ✅ 正确：会变的值用 let
let count = 0;
count++;  // ✅
```

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 变量/函数 | 小驼峰 | `userName`, `getData()` |
| 常量 | 全大写 + 下划线 | `MAX_SIZE`, `API_URL` |
| 布尔值 | is/has/can 前缀 | `isLoggedIn`, `hasPermission` |
| 数组 | 复数名词 | `users`, `productList` |

```javascript
// ✅ 推荐
const MAX_RETRIES = 3;
let retryCount = 0;
let hasError = false;
let userList = [];

// ❌ 不推荐
let a = 100;                    // 名称无意义
let USER_NAME = '张三';         // 非常量用大写
let myVariableNameThatIsTooLong = 'test';  // 太长
```

---

## L3 专家层：深入

### 变量提升原理

```
变量提升的引擎行为：

代码：
  console.log(x);
  var x = 10;

引擎处理（两个阶段）：
1. 编译阶段：扫描所有 var 声明，分配内存
   ┌──────────────────────────────┐
   │  变量环境: { x: undefined }  │  ← x 已存在但未赋值
   └──────────────────────────────┘

2. 执行阶段：逐行执行
   console.log(x);  // 读取到 undefined
   x = 10;          // 赋值

let/const 的不同：
1. 编译阶段：同样分配内存，但标记为"未初始化"
   ┌──────────────────────────────┐
   │  变量环境: { y: TDZ }        │  ← TDZ = 暂时性死区
   └──────────────────────────────┘

2. 执行到 let y = 20 时才解除 TDZ
```

### 性能考量

| 操作 | 性能影响 | 说明 |
|------|---------|------|
| let/const 声明 | 极低 | 现代引擎优化得很好 |
| var 声明 | 极低 | 与 let/const 无差异 |
| 全局变量 | 中等 | 查找作用域链更长 |
| 过多全局变量 | 高 | 污染全局命名空间 |

### 设计动机

**为什么 JavaScript 引入 let/const？**

| 设计选择 | 原因 | 对比 var |
|----------|------|----------|
| 块级作用域 | 符合直觉，减少意外 | var 只有函数作用域 |
| 不允许重复声明 | 避免意外覆盖 | var 可重复声明 |
| TDZ | 尽早发现错误 | var 提升导致难以调试的 bug |
| const | 明确不可变意图 | 提高代码可读性和安全性 |

### 知识关联

```
变量知识关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  变量声明   │────→│  作用域     │────→│  变量提升   │
│  let/const  │     │  块级/函数  │     │  TDZ        │
│  var        │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ↓
                    ┌─────────────┐
                    │  命名规范   │
                    │  驼峰/常量  │
                    └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **变量** | 存储数据的命名容器 | `let age = 25` |
| **常量** | 声明后不能重新赋值的变量 | `const PI = 3.14` |
| **作用域** | 变量可访问的范围 | 块级 `{}` 内 |
| **变量提升** | var 声明被移到作用域顶部的行为 | `console.log(x); var x = 1;` 输出 undefined |
| **TDZ** | 暂时性死区，let/const 声明前的区域 | 访问会抛 ReferenceError |
| **块级作用域** | 只在 `{}` 内有效的变量范围 | `if (true) { let x = 1; }` |
| **函数作用域** | 只在函数内有效的变量范围 | `function fn() { var x = 1; }` |
| **小驼峰** | 首字母小写，后续单词首字母大写的命名方式 | `userName` |

---

## 实践练习

### 练习：声明方式判断 + 命名修正

```javascript
// 练习 1：选择正确的声明方式
// ___ 声明一个不会变的配置对象
const CONFIG = { timeout: 5000, retries: 3 };

// ___ 声明一个计数器
let retryCount = 0;

// ___ 声明一个布尔状态
let isLoading = false;

// 练习 2：预测输出
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var:', i), 0);
}
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log('let:', j), 0);
}
// var: 3, 3, 3
// let: 0, 1, 2

// 练习 3：修正不规范的命名
let maxScore = 100;           // 替代 let a = 100
const userName = '张三';      // 替代 let USER_NAME = '张三'
let isUserLoggedIn = true;    // 替代 let flag = true
```

---

## 常见问题

### Q1：什么时候用 let，什么时候用 const？

**原则：优先 const，需要修改时用 let：**

```javascript
// 值不会变 → const
const PI = 3.14159;
const API_URL = 'https://api.example.com';

// 值会变 → let
let count = 0;
let isLoggedIn = false;
```

### Q2：const 声明的对象为什么能修改属性？

**const 保证的是"引用"不变，不是"内容"不变：**

```javascript
const user = { name: '张三' };
user.name = '李四';  // ✅ 修改内容，引用地址没变
// user = {};        // ❌ 改变了引用地址
```

### Q3：var 和 let 在循环中有什么区别？

```javascript
// var：i 是同一个变量，所有回调共享最终值
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0);
}
// 输出：3, 3, 3

// let：每次循环创建新的 i，每个回调持有各自的值
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 0);
}
// 输出：0, 1, 2
```

---

## 学习资源

- [MDN - var](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)
- [MDN - let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)
- [JavaScript.info - 变量](https://zh.javascript.info/variables)
