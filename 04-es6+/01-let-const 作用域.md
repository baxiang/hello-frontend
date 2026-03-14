# let/const 与作用域

## 学习目标
- 掌握 let 和 const 的基本用法
- 理解块级作用域的概念
- 理解暂时性死区（TDZ）
- 能够正确选择 var/let/const

---

## 1.0 通俗理解 let/const

### 什么是变量？

```
变量 = 存储数据的"盒子"

var 盒子 = "可以随便改";
let 盒子 = "可以改";
const 盒子 = "不能改";
```

### var 的问题

```
var = 老式盒子（有漏洞）

1. 变量提升 = 还没声明就能用（奇怪吧？）
2. 没有块级作用域 = 会泄漏到外面
3. 循环闭包问题 = 永远只记住最后一个值
```

### let/const = 修复后的新盒子

```
let = 可以改的盒子
const = 不能改的盒子
```

---

## 1.1 为什么需要 let/const

### var 的问题

```javascript
// 问题 1：变量提升导致意外结果
console.log(a);  // undefined（不会报错）
var a = 1;

// 问题 2：没有块级作用域
if (true) {
    var b = 2;
}
console.log(b);  // 2（泄漏到外部）

// 问题 3：循环中的闭包问题
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);  // 3, 3, 3（而不是 0, 1, 2）
    }, 100);
}
```

### let/const 解决这些问题

```javascript
// let 声明块级作用域变量
let a = 1;

// const 声明常量
const PI = 3.14159;
```

---

## 1.2 let 的基本用法

### 声明变量

```javascript
// 基础用法
let name = '张三';
let age = 25;

// 可以重新赋值
age = 26;  // OK

// 可以重新声明（同一作用域内不行）
let name = '李四';  // SyntaxError: Identifier 'name' has already been declared

// 块级作用域
if (true) {
    let blockVar = '块级变量';
    console.log(blockVar);  // '块级变量'
}
console.log(blockVar);  // ReferenceError: blockVar is not defined
```

### for 循环中的 let

```javascript
// let 创建块级作用域，每次迭代都有新的 i
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);  // 0, 1, 2（正确！）
    }, 100);
}

// 对比 var
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i);  // 3, 3, 3
    }, 100);
}
```

---

## 1.3 const 的基本用法

### 声明常量

```javascript
// 基础用法
const PI = 3.14159;
const API_URL = 'https://api.example.com';

// 不能重新赋值
// PI = 3;  // TypeError: Assignment to constant variable

// 必须在声明时初始化
// const MAX;  // SyntaxError: Missing initializer in const declaration
```

### const 与对象

```javascript
// const 保证的是引用不变，不是值不变
const obj = { name: '张三' };

// 可以修改对象属性
obj.name = '李四';  // OK
obj.age = 25;       // OK

// 但不能重新赋值
// obj = {};  // TypeError

// 数组同理
const arr = [1, 2, 3];
arr.push(4);      // OK
arr[0] = 100;     // OK
// arr = [];      // TypeError
```

### 冻结对象

```javascript
// 如果需要对象也不能修改，使用 Object.freeze
const frozen = Object.freeze({ name: '张三' });
frozen.name = '李四';  // 静默失败（非严格模式）
console.log(frozen.name);  // '张三'

// 深度冻结
function deepFreeze(obj) {
    Object.freeze(obj);
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && !Object.isFrozen(obj[key])) {
            deepFreeze(obj[key]);
        }
    });
    return obj;
}

const deepFrozen = deepFreeze({ user: { name: '张三' } });
deepFrozen.user.name = '李四';  // 不会生效
```

---

## 1.4 块级作用域

### 什么是块级作用域

```javascript
// 块：由 {} 包裹的代码
{
    let a = 1;
    const b = 2;
    var c = 3;  // var 没有块级作用域
}

console.log(a);  // ReferenceError
console.log(b);  // ReferenceError
console.log(c);  // 3（var 泄漏了）
```

### 常见块级结构

```javascript
// if 语句
if (true) {
    let insideIf = '在 if 内';
}
// console.log(insideIf);  // ReferenceError

// for 循环
for (let i = 0; i < 3; i++) {
    let insideLoop = '在循环内';
}
// console.log(i);         // ReferenceError
// console.log(insideLoop); // ReferenceError

// switch 语句
switch (1) {
    case 1:
        let caseVar = 'case 1';
        break;
}
// console.log(caseVar);  // ReferenceError

// 单独的块
{
    let temp = '临时变量';
    console.log(temp);  // '临时变量'
}
// console.log(temp);   // ReferenceError
```

### 块级作用域的应用

```javascript
// 场景 1：临时变量不污染外部作用域
function process() {
    {
        // 使用临时的 i，不影响外部
        let i = 0;
        console.log('内部:', i);
    }
    let i = 100;
    console.log('外部:', i);
}
process();
// 内部：0
// 外部：100

// 场景 2：条件分支中的同名变量
if (condition) {
    let data = fetchDataA();
    processData(data);
} else {
    let data = fetchDataB();
    processData(data);
}
// 两个 data 互不干扰dj
```

---

## 1.5 暂时性死区（TDZ）

### 什么是 TDZ

```javascript
// 在 let/const 声明之前使用会报错
console.log(a);  // ReferenceError: Cannot access 'a' before initialization
let a = 1;

// 对比 var
console.log(b);  // undefined（变量提升）
var b = 1;
```

### TDZ 范围≥ ≤011001\\\
+-`
365

```javascript
// TDZ 从块开始到变量声明
{
    // TDZ 开始
    console.log(x);  // ReferenceError
    let x = 1;
    // TDZ 结束
}

// 外层变量被遮蔽
let outer = '外层';
{
    console.log(outer);  // ReferenceError（不是 '外层'）
    let outer = '内层';
}
```

### 经典案例

```javascript
// 默认参数中的 TDZ
function foo(x = y, y = 1) {
    console.log(x, y);
}
foo();  // ReferenceError: y is not defined

// typeof 在 TDZ 中也会报错
console.log(typeof undeclaredVar);  // 'undefined'（安全）
console.log(typeof tdzVar);         // ReferenceError
let tdzVar = 1;

// 函数参数中的 TDZ
function bar(x = () => y) {
    let y = 1;
    console.log(x());
}
bar();  // ReferenceError: y is not defined
```

---

## 1.6 var vs let vs const 对比

### 特性对比表

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数级 | 块级 | 块级 |
| 变量提升 | ✅ | ❌ | ❌ |
| 暂时性死区 | ❌ | ✅ | ✅ |
| 重复声明 | ✅ | ❌ | ❌ |
| 重新赋值 | ✅ | ✅ | ❌ |
| 初始化为 undefined | ✅ | ✅ | ❌ |

### 使用建议

```javascript
// 优先使用 const
const MAX_COUNT = 100;
const config = { debug: true };

// 需要重新赋值时用 let
let count = 0;
count++;

// 避免使用 var
// var name = '张三';  // 不推荐
```

### 迁移示例

```javascript
// ES5 var 代码
function processData(items) {
    var results = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var result = transform(item);
        results.push(result);
    }
    return results;
}

// ES6+ 重构
function processData(items) {
    const results = [];
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const result = transform(item);
        results.push(result);
    }
    return results;
}
```

---

## 1.7 实践练习

### 练习 1：修复闭包问题

```javascript
// 问题代码：使用 var 导致输出 3 个 3
const buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        console.log(`点击了第 ${i} 个按钮`);
    });
}

// 修复方案 1：使用 let
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        console.log(`点击了第 ${i} 个按钮`);
    });
}

// 修复方案 2：使用 IIFE（了解即可）
for (var i = 0; i < buttons.length; i++) {
    ((index) => {
        buttons[index].addEventListener('click', function() {
            console.log(`点击了第 ${index} 个按钮`);
        });
    })(i);
}
```

### 练习 2：常量与变量的选择

```javascript
// 判断以下场景应该使用什么声明

// 1. API 基础 URL
// 答案：const API_BASE = 'https://api.example.com';

// 2. 计数器
// 答案：let count = 0;

// 3. 用户配置对象（需要修改属性）
// 答案：const config = { theme: 'light' };

// 4. 循环索引
// 答案：for (let i = 0; i < 10; i++) {}

// 5. 数学常数 π
// 答案：const PI = 3.14159265359;
```

### 练习 3：块级作用域应用

```javascript
// 实现一个函数，交换两个变量的值，不使用临时全局变量
function swapExample() {
    let a = 1, b = 2;

    // 使用块级作用域
    {
        let temp = a;
        a = b;
        b = temp;
    }

    console.log(a, b);  // 2, 1
}

// 更简洁的解构方式
function swapWithDestructuring() {
    let a = 1, b = 2;
    [a, b] = [b, a];
    console.log(a, b);  // 2, 1
}
```

---

## 1.8 常见问答

### Q1: const 声明的对象真的不能修改吗？

**答：** const 保证的是引用不变，对象属性可以修改。

```javascript
const obj = { name: '张三' };
obj.name = '李四';  // 可以
obj = {};           // 不可以
```

### Q2: 什么时候用 let，什么时候用 const？

**答：** 优先使用 const，只有在需要重新赋值时才使用 let。

```javascript
// 好的实践
const PI = 3.14159;
let count = 0;
count++;
```

### Q3: var 是不是完全不能用了？

**答：** 在现代代码中应避免使用 var，但在维护旧代码时需要理解其行为。

### Q4: 块级函数声明的问题

```javascript
// 不要这样做 - 块级函数声明行为不一致
if (true) {
    function foo() {}
}

// 推荐做法 - 使用函数表达式
if (true) {
    const foo = function() {};
}
```

---

## 1.9 学习资源

- [MDN - let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
- [MDN - const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)
- [MDN - 块级作用域](https://developer.mozilla.org/zh-CN/docs/Glossary/Block)
- [ES6 入门教程 - 阮一峰](https://es6.ruanyifeng.com/#docs/let)

---

**上一章：** [← ES6+ 学习路线](./README.md)
**下一章：** [→ 02-箭头函数](./02-箭头函数.md)
