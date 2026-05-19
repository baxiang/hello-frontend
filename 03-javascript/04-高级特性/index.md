# JavaScript 作用域与闭包 ⭐⭐⭐

> 理解变量的"活动范围"和函数如何"记住"外部环境

---

## 学习目标

- 理解三种作用域类型（全局、函数、块级）
- 掌握词法作用域和作用域链的查找规则
- 理解闭包的原理：函数如何记住创建时的环境
- 学会闭包的实际应用：数据私有化、防抖节流、模块模式
- 了解闭包的内存影响和优化方法

---

## 生活化比喻

**作用域就像"建筑楼层权限"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  建筑楼层权限                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│    全局作用域 = 一楼大厅                               │
│    ─────────────                                     │
│    所有人都能进入和使用                               │
│    但人多了会混乱（全局污染）                         │
│                                                      │
│    函数作用域 = 独立办公室                            │
│    ─────────────                                     │
│    只有办公室内的人能看到内部文件                      │
│    但办公室的人可以看到大厅的东西                     │
│                                                      │
│    块级作用域 = 带锁的文件柜                          │
│    ─────────────                                     │
│    只有持有钥匙（let/const）的人才能打开               │
│    出了这个块，钥匙就失效了                           │
│                                                      │
│    闭包 = 带着文件离开办公室                          │
│    ─────────────────                                 │
│    你离开了办公室（函数执行完毕）                      │
│    但口袋里还装着办公室的文件（闭包）                  │
│    无论走到哪里，都能查看这些文件                      │
│    文件一直存在，不会消失                             │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 三种作用域

**语法结构图：**

```
作用域类型：

全局作用域 ────────────── 任何地方都能访问
  let global = '全局';
  function fn() { console.log(global); }  ✅

函数作用域 ────────────── 只有函数内能访问（var）
  function outer() {
    var fnVar = '函数内';
  }
  console.log(fnVar);  ❌ 报错

块级作用域 ────────────── 只有 {} 内能访问（let/const）
  if (true) {
    let blockVar = '块内';
  }
  console.log(blockVar);  ❌ 报错

变量查找规则：从内向外，逐层查找
  当前作用域 → 外层作用域 → ... → 全局作用域 → 找不到则报错
```

**最简示例（1-3行）：**

```javascript
let global = '全局';
function fn() { let local = '局部'; console.log(global); }
fn();  // '全局'
```

**详细示例：**

```javascript
// 全局作用域
let appName = 'MyApp';

// 函数作用域
function greet() {
    let message = 'Hello';
    console.log(message, appName);  // 'Hello' 'MyApp'
}
greet();
// console.log(message);  // ❌ ReferenceError

// 块级作用域
if (true) {
    let temp = '临时变量';
    const PI = 3.14;
    console.log(temp);  // ✅
}
// console.log(temp);  // ❌ ReferenceError
```

---

### 词法作用域与作用域链

**最简示例：**

```javascript
let name = '全局';
function outer() {
    let name = '外层';
    function inner() { console.log(name); }
    return inner;
}
outer()();  // '外层'（不是'全局'）
```

**详细示例 — 作用域链：**

```javascript
// 变量从内向外逐层查找
let level1 = '第一层';

function outer() {
    let level2 = '第二层';

    function inner() {
        let level3 = '第三层';
        console.log(level3);  // 第三层（本层）
        console.log(level2);  // 第二层（外层）
        console.log(level1);  // 第一层（全局）
    }

    inner();
}
outer();

// 词法作用域：作用域在定义时确定，不在调用时确定
let x = '全局';

function createFn() {
    let x = '函数内';
    return function() { console.log(x); };
}

const fn = createFn();
fn();  // '函数内'（不是'全局'，因为 fn 在 createFn 内定义）
```

---

### 闭包基础

**语法结构图：**

```
闭包结构：

function outer() {
    let secret = '私有数据';     ← 外部函数的变量
                              │
    return function inner() {  │
        console.log(secret);   │  ← 内部函数引用外部变量
    };                         │
}                             │
                              ↓
const fn = outer();  outer 执行完毕，但 secret 仍然存活
fn();  // '私有数据'  inner "记住"了它定义时的环境
```

**最简示例：**

```javascript
function createCounter() {
    let count = 0;
    return () => ++count;
}
const counter = createCounter();
counter();  // 1
counter();  // 2
```

**详细示例：**

```javascript
// 闭包的本质：函数 + 它定义时的词法环境
function outer(x) {
    return function inner(y) {
        return x + y;  // x 来自外层作用域
    };
}

const add5 = outer(5);
console.log(add5(3));  // 8
console.log(add5(10)); // 15

// add5 "记住"了 x=5，即使 outer 已经执行完毕
```

---

## L2 实践层：用好

### 闭包的实际应用

| 应用 | 说明 | 示例 |
|------|------|------|
| 数据私有化 | 外部无法直接访问内部变量 | 银行账户、计数器 |
| 函数工厂 | 生成定制化函数 | `createMultiplier(factor)` |
| 防抖函数 | 延迟执行，重新触发则重置 | 搜索框输入 |
| 节流函数 | 固定时间内只执行一次 | 滚动事件、resize |
| 模块模式 | 封装私有状态 + 公开接口 | IIFE + 返回对象 |
| 迭代器 | 记住当前遍历位置 | `createIterator(arr)` |

**数据私有化：**

```javascript
function createBankAccount(initialBalance) {
    let balance = initialBalance;  // 私有变量，外部无法直接访问

    return {
        deposit(amount) { balance += amount; },
        withdraw(amount) {
            if (amount > balance) throw new Error('余额不足');
            balance -= amount;
        },
        getBalance() { return balance; }
    };
}

const account = createBankAccount(1000);
account.deposit(500);
console.log(account.getBalance());  // 1500
// account.balance  // undefined（无法直接访问）
```

**防抖与节流：**

```javascript
// 防抖：延迟执行，期间被触发则重新计时
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 节流：固定时间内只执行一次
function throttle(fn, limit) {
    let inThrottle = false;
    return function(...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 使用
const search = debounce(query => fetchResults(query), 300);
const handleScroll = throttle(() => updatePosition(), 100);
```

### 反模式：不要这样做

```javascript
// ❌ 错误：闭包持有不需要的大对象（内存浪费）
function createClosure() {
    let largeData = new Array(1000000).fill('data');
    return function() {
        console.log('small');  // 根本没用到 largeData
    };
}

// ✅ 正确：只保留需要的数据
function createClosure() {
    let largeData = new Array(1000000).fill('data');
    let needed = largeData[0];
    return function() { console.log(needed); };
}
```

```javascript
// ❌ 错误：循环中用 var + 闭包（经典陷阱）
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// 输出：3, 3, 3（i 是同一个变量）

// ✅ 正确：用 let（每次循环创建新变量）
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
// 输出：0, 1, 2
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 需要私有状态 | 闭包 / 模块模式 | 数据封装，防止外部修改 |
| 事件处理需要记住状态 | 闭包 | 函数自带"记忆" |
| 全局变量过多 | 模块模式 | 减少全局污染 |
| 只是简单封装 | ES6 Class + #私有字段 | 更现代的语法 |

---

## L3 专家层：深入

### 闭包底层原理

```
闭包的内存模型：

function outer() {
    let x = 10;
    return function inner() { console.log(x); };
}

执行流程：
1. outer() 调用 → 创建执行上下文
   ┌──────────────────────────────┐
   │  outer 执行上下文             │
   │  变量环境: { x: 10 }          │
   │  词法环境引用: → 全局环境      │
   └──────────────────────────────┘

2. inner 函数被创建 → 保存 outer 的词法环境引用
   inner.[[Environment]] = outer 的词法环境

3. outer 返回 inner → outer 的上下文本该销毁
   但 inner 的 [[Environment]] 仍引用着 outer 的词法环境
   → 所以 x 不会被垃圾回收

4. 调用 inner() → 通过 [[Environment]] 找到 x = 10
```

```javascript
// 验证：闭包确实持有环境引用
function createClosures() {
    let a = 'a';
    let b = 'b';
    let c = 'c';

    return {
        getA() { return a; },   // 只引用 a
        // getB 和 getC 虽然没定义，但 b 和 c 仍可能被保留
    };
}

// 现代引擎会优化：只保留实际引用的变量
// 但不要依赖这个优化，最佳做法是手动释放不需要的变量
```

### 性能考量

| 操作 | 性能影响 | 说明 |
|------|---------|------|
| 创建闭包 | 极低 | 现代引擎高度优化 |
| 闭包持有大对象 | 中等 | 阻止垃圾回收，占用内存 |
| 大量闭包实例 | 中等 | 每个闭包都有独立环境 |
| 深度嵌套闭包 | 低 | 作用域链查找稍慢，影响可忽略 |

### 设计动机

**JavaScript 为什么设计词法作用域？**

| 设计选择 | 原因 | 替代方案对比 |
|----------|------|-------------|
| 词法作用域 | 作用域在编写时就能确定，可静态分析 | 动态作用域（如 bash）在运行时确定，难以推理 |
| 闭包 | 函数是一等公民，需要携带定义时的环境 | 没有闭包的语言无法实现函数工厂、模块模式 |
| 块级作用域（let/const） | 修复 var 的函数作用域缺陷 | var 在循环和 if 块中泄漏变量 |

### 知识关联

```
作用域与闭包关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  变量声明   │────→│  作用域     │────→│  作用域链   │
│  var/let/   │     │  类型       │     │  查找规则   │
│  const      │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ↓
                    ┌─────────────┐
                    │   闭包      │
                    │  函数+环境  │
                    └─────────────┘
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ 数据私有 │ │ 防抖节流 │ │ 模块模式 │
        └──────────┘ └──────────┘ └──────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **作用域** | 变量的可访问范围 | `function fn() { let x = 1; }` 中 x 只在 fn 内可访问 |
| **全局作用域** | 整个程序都能访问的作用域 | 在最外层声明的变量 |
| **函数作用域** | 只有函数内部能访问的作用域 | `var` 声明的变量 |
| **块级作用域** | 只有 `{}` 块内能访问的作用域 | `let`/`const` 声明的变量 |
| **词法作用域** | 作用域在函数定义时就确定，而非调用时 | 内层函数能访问外层变量 |
| **作用域链** | 变量查找时从内向外逐层搜索的链 | 当前层 → 外层 → ... → 全局 |
| **闭包** | 函数与其定义时词法环境的组合 | 函数能"记住"外部变量 |
| **TDZ（暂时性死区）** | let/const 声明前到声明后的区域，访问会报错 | `console.log(x); let x = 1; // ❌` |
| **模块模式** | 用闭包封装私有状态和公开接口的模式 | IIFE 返回对象 |
| **防抖** | 延迟执行，期间被触发则重置计时器 | 搜索框输入 |
| **节流** | 固定时间间隔内最多执行一次 | 滚动事件 |

---

## 实践练习

### 练习：Todo 模块 + 计数器工厂

```javascript
// 练习 1：用闭包实现 Todo 模块
const TodoModule = (function() {
    let todos = [];
    let nextId = 1;

    return {
        add(text) {
            todos.push({ id: nextId++, text, completed: false });
        },
        remove(id) {
            todos = todos.filter(t => t.id !== id);
        },
        list() { return [...todos]; },
        count() { return todos.length; }
    };
})();

TodoModule.add('学习 JavaScript');
TodoModule.add('完成练习');
console.log(TodoModule.count());  // 2
console.log(TodoModule.list());   // [{id: 1, text: '...'}, {id: 2, text: '...'}]

// 练习 2：计数器工厂（支持加减和重置）
function createCounter(initial = 0) {
    let count = initial;

    return {
        increment() { return ++count; },
        decrement() { return --count; },
        reset() { count = initial; return count; },
        getCount() { return count; }
    };
}

const counter = createCounter(10);
console.log(counter.increment());  // 11
console.log(counter.decrement());  // 10
console.log(counter.reset());      // 10

// 练习 3：实现 once 函数（只执行一次）
function once(fn) {
    let called = false;
    let result;

    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

const init = once(() => {
    console.log('初始化');
    return 'done';
});
init();  // '初始化'，返回 'done'
init();  // 无输出，返回 'done'
```

---

## 常见问题

### Q1：闭包会导致内存泄漏吗？

**不一定。** 只有当闭包持有不再需要的大对象时才可能造成问题。现代引擎会优化只保留实际引用的变量。

```javascript
// 潜在问题
function createClosure() {
    let largeData = new Array(1000000);
    return function() {};  // 即使不用 largeData，也可能被保留
}

// 正确做法：手动释放
function createClosure() {
    let largeData = new Array(1000000);
    let needed = largeData[0];
    return function() { console.log(needed); };
}
```

### Q2：如何销毁闭包释放内存？

**解除引用即可：**

```javascript
let fn = createCounter();
fn();  // 使用
fn = null;  // 解除引用，垃圾回收器会清理
```

### Q3：var 和 let 在循环中有什么区别？

```javascript
// var：i 是同一个变量，循环结束后所有回调共享 i=3
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var:', i), 0);
}
// 输出：3, 3, 3

// let：每次循环创建新的 i，每个回调持有不同的 i
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log('let:', i), 0);
}
// 输出：0, 1, 2
```

---

## 学习资源

- [MDN - 闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures) ⭐ 官方权威
- [MDN - 作用域](https://developer.mozilla.org/zh-CN/docs/Glossary/Scope)
- [JavaScript.info - 作用域和闭包](https://zh.javascript.info/closure)
- [You Don't Know JS - Scope & Closures](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/scope%20%26%20closures/README.md) ⭐ 深入原理
