# 生成器与迭代器 ⭐

> 迭代协议与生成器函数

---

## 学习目标

- 理解 Iterable（可迭代）与 Iterator（迭代器）协议
- 掌握生成器函数（function*）和 yield 用法
- 学会用生成器实现无限序列、状态机和异步迭代

---

## 生活化比喻

**迭代器就像"自动售货机的出票口"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  自动售货机                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│    迭代器 = 出票口                                    │
│    ─────────────                                     │
│    按一次按钮出一张票（next()）                      │
│    票出完了就告诉你"售完"（done: true）              │
│                                                      │
│    可迭代对象 = 有出票口的机器                        │
│    ─────────────                                     │
│    数组、字符串、Set、Map 都有出票口                 │
│    所以都能用 for...of 遍历                           │
│                                                      │
│    生成器 = 智能出票机                                │
│    ─────────────                                     │
│    每次出什么票由程序决定                             │
│    可以随时暂停、继续、甚至改变出票规则              │
│    yield = "暂停，出一张票"                          │
│    next() = "继续，下一张"                           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 迭代协议

**语法结构图：**

```
Iterable 协议 — 对象可被 for...of 遍历：
  obj[Symbol.iterator] = function() {
      return Iterator;  // 返回迭代器
  };

Iterator 协议 — 迭代器有 next() 方法：
  iterator.next() → { value: 值, done: false }
  iterator.next() → { value: undefined, done: true }  ← 遍历结束

内置可迭代对象：Array, String, Set, Map, arguments
```

**最简示例（1-3行）：**

```javascript
const arr = [1, 2, 3];
for (const item of arr) console.log(item);  // 1, 2, 3
```

**详细示例：**

```javascript
// 手动使用迭代器
const arr = ['a', 'b'];
const it = arr[Symbol.iterator]();
it.next();  // { value: 'a', done: false }
it.next();  // { value: 'b', done: false }
it.next();  // { value: undefined, done: true }

// 自定义可迭代对象
const range = {
    from: 1, to: 5,
    [Symbol.iterator]() {
        let current = this.from;
        return {
            next: () => current <= this.to
                ? { value: current++, done: false }
                : { done: true }
        };
    }
};
[...range];  // [1, 2, 3, 4, 5]
```

---

### 生成器函数

**语法结构图：**

```
定义：function* name() { yield value; }

调用：const gen = name();  ← 不执行，返回生成器对象
      gen.next()            ← 执行到下一个 yield
                               返回 { value, done }

yield* 委托：yield* otherGenerator();  ← 委托给另一个生成器
```

**最简示例：**

```javascript
function* nums() { yield 1; yield 2; yield 3; }
[...nums()];  // [1, 2, 3]
```

**详细示例：**

```javascript
// 基本用法
function* greet() {
    yield '你好';
    yield 'Hello';
    yield 'Hola';
}
const gen = greet();
gen.next();  // { value: '你好', done: false }
gen.next();  // { value: 'Hello', done: false }
gen.next();  // { value: 'Hola', done: false }
gen.next();  // { value: undefined, done: true }

// yield* 委托
function* ab() { yield 'a'; yield 'b'; }
function* abc() { yield* ab(); yield 'c'; }
[...abc()];  // ['a', 'b', 'c']

// 接收外部传入的值
function* counter() {
    let count = yield 0;
    count = yield count + 1;
    yield count + 1;
}
const c = counter();
c.next();      // { value: 0 }
c.next(5);     // { value: 6 }
c.next(10);    // { value: 11 }
```

---

## L2 实践层：用好

### 生成器应用场景

| 场景 | 方案 | 示例 |
|------|------|------|
| 无限序列 | `while(true) { yield }` | 斐波那契数列 |
| 延迟计算 | 按需生成 | 分页数据流 |
| 状态机 | yield 接收事件 | 工作流引擎 |
| 异步迭代 | `for await...of` | 流式数据处理 |
| 自定义遍历 | `[Symbol.iterator] = function*` | 树的深度遍历 |

### 反模式：不要这样做

```javascript
// ❌ 错误：把生成器当普通函数用
function* nums() { yield 1; yield 2; }
const result = nums();  // 生成器对象，不是 [1, 2]

// ✅ 正确：用 spread 或 for...of
const result = [...nums()];  // [1, 2]
```

```javascript
// ❌ 错误：普通函数中用 yield
function fn() {
    yield 1;  // SyntaxError
}

// ✅ 正确：必须是 function*
function* fn() { yield 1; }
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 简单遍历 | for...of / forEach | 生成器过重 |
| 惰性序列 | 生成器 | 节省内存 |
| 异步数据流 | async generator | 原生支持 |
| 状态管理 | 状态机模式 | 代码清晰 |

---

## L3 专家层：深入

### 生成器执行模型

```
生成器状态机：

function* gen() {
    const a = yield 1;    ← 状态 1：返回 1，暂停
    const b = yield a + 1; ← 状态 2：返回 a+1，暂停
    return b;              ← 状态 3：返回 b，结束
}

const g = gen();           ← 创建，不执行
g.next();                  ← 执行到 yield 1，返回 {value:1, done:false}
g.next(5);                 ← a=5，执行到 yield 6，返回 {value:6, done:false}
g.next(10);                ← b=10，return 10，返回 {value:10, done:true}
```

### 异步生成器

```javascript
async function* fetchPages(url) {
    let page = 1;
    while (true) {
        const res = await fetch(`${url}?page=${page++}`);
        const data = await res.json();
        if (data.length === 0) break;
        yield* data;
    }
}

// 消费
for await (const item of fetchPages('/api/items')) {
    console.log(item);
}
```

### 知识关联

```
迭代与生成器关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Iterable   │────→│  Iterator   │────→│  Generator  │
│  for...of   │     │  next()     │     │  yield      │
│  可遍历     │     │  手动遍历   │     │  自动生成   │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                     ┌────────┼────────┐
                                     ↓        ↓        ↓
                              ┌──────────┐ ┌──────┐ ┌──────────┐
                              │ 无限序列 │ │ 状态 │ │ 异步迭代 │
                              └──────────┘ └──────┘ └──────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **Iterable** | 实现了 `[Symbol.iterator]` 方法的对象，可用 for...of 遍历 | 数组、字符串、Set、Map |
| **Iterator** | 有 `next()` 方法的对象，返回 `{value, done}` | `arr[Symbol.iterator]()` |
| **Generator** | 用 `function*` 定义的函数，返回生成器对象 | `function* gen() { yield 1; }` |
| **yield** | 暂停生成器执行并返回值 | `yield 1` |
| **yield\*** | 委托给另一个可迭代对象或生成器 | `yield* [1, 2, 3]` |
| **for await...of** | 遍历异步生成器 | `for await (const x of asyncGen())` |

---

## 实践练习

### 练习：斐波那契 + 分页流

```javascript
// 练习 1：斐波那契数列生成器
function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
const fib = fibonacci();
[...Array(10)].map(() => fib.next().value);  // [0,1,1,2,3,5,8,13,21,34]

// 练习 2：异步分页生成器
async function* paginate(fetchFn, pageSize = 10) {
    let page = 1;
    while (true) {
        const data = await fetchFn(page, pageSize);
        if (data.length === 0) break;
        yield* data;
        page++;
    }
}

// 练习 3：树的深度优先遍历
function* dfs(node) {
    yield node.value;
    for (const child of (node.children || [])) {
        yield* dfs(child);
    }
}
const tree = { value: 'A', children: [
    { value: 'B', children: [{ value: 'C' }] },
    { value: 'D' }
]};
[...dfs(tree)];  // ['A', 'B', 'C', 'D']
```

---

## 常见问题

### Q1：生成器和普通函数有什么区别？

```javascript
// 普通函数：一次性执行完
function fn() { return 1; return 2; }  // 只返回 1

// 生成器：可以暂停和恢复
function* gen() { yield 1; yield 2; }  // 可以逐个返回
```

### Q2：生成器有什么实际用途？

**三大场景：**

```javascript
// 1. 惰性生成无限序列（节省内存）
function* range(start, end) {
    for (let i = start; i <= end; i++) yield i;
}

// 2. 状态机
function* workflow() {
    while (true) {
        const event = yield 'waiting';
        if (event === 'start') yield 'running';
    }
}

// 3. 异步数据流
async function* streamData(url) {
    for await (const chunk of fetchStream(url)) yield chunk;
}
```

---

## 学习资源

- [MDN - 迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) ⭐ 官方权威
- [MDN - 生成器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)
- [JavaScript.info - 生成器](https://zh.javascript.info/generators)
