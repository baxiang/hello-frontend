# JavaScript 异步编程 ⭐⭐⭐

> 回调、Promise、async/await — 让异步代码像同步一样清晰

---

## 学习目标

- 理解同步和异步的本质区别
- 掌握回调函数及其局限性（回调地狱）
- 精通 Promise 的创建、链式调用和组合方法
- 熟练使用 async/await 编写清晰的异步代码
- 学会实际场景：并行请求、重试、超时

---

## 生活化比喻

**异步编程就像"餐厅取餐系统"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  餐厅取餐系统                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│    同步 = 排队等餐                                    │
│    ─────────────                                     │
│    点单 → 站在柜台等 → 取餐 → 下一位                  │
│    整个队伍卡住，效率极低                             │
│                                                      │
│    回调 = 拿到号牌，厨师叫你                          │
│    ─────────────────                                 │
│    点单 → 拿号牌 → 去别的事 → 叫号取餐                │
│    但多了会搞混谁叫谁（回调地狱）                      │
│                                                      │
│    Promise = 智能取餐机                               │
│    ─────────────────                                 │
│    给你一个"取餐凭证"，有三种状态：                    │
│    制作中(pending) → 做好了(fulfilled) → 做不了(rejected) │
│    凭证可以串联：等前一个好了再取下一个               │
│                                                      │
│    async/await = VIP 专属服务员                       │
│    ─────────────────                                 │
│    你只需说"我要 A、然后 B、然后 C"                   │
│    服务员帮你排队等，你不用操心                       │
│    代码写起来就像同步一样自然                         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 同步 vs 异步

**语法结构图：**

```
执行顺序对比：

同步（排队）                    异步（拿号等叫）
────────                      ──────────────
console.log('1')              console.log('1')
console.log('2')              setTimeout(fn, 1000)  ← 不等待
console.log('3')              console.log('2')
输出：1 → 2 → 3               输出：1 → 2 → (1 秒后) fn
```

**最简示例（1-3行）：**

```javascript
// 同步：按顺序执行
console.log('先'); console.log('后');

// 异步：不阻塞后续代码
setTimeout(() => console.log('1 秒后'), 1000);
```

**详细示例：**

```javascript
// 同步代码
console.log('1. 点单');
console.log('2. 付款');
console.log('3. 取餐');
// 输出：1 → 2 → 3

// 异步代码
console.log('1. 点单');

setTimeout(() => {
    console.log('3. 取餐（1 秒后）');
}, 1000);

console.log('2. 玩手机');
// 输出：1 → 2 → 3
```

---

### 回调函数

**最简示例：**

```javascript
function cookFood(callback) {
    setTimeout(() => callback('饭好了'), 1000);
}
cookFood(msg => console.log(msg));  // '饭好了'
```

**详细示例 — 回调地狱：**

```javascript
// 回调地狱：嵌套越来越深
loadFile('file1.txt', (err, content1) => {
    if (err) return handleError(err);
    loadFile('file2.txt', (err, content2) => {
        if (err) return handleError(err);
        loadFile('file3.txt', (err, content3) => {
            if (err) return handleError(err);
            console.log(content1, content2, content3);
        });
    });
});

// ❌ 问题：嵌套深、错误处理重复、难以维护
```

---

### Promise 基础

**语法结构图：**

```
Promise 结构：

const p = new Promise((resolve, reject) => {
                               │         │
                               │         └─ 失败时调用 → .catch()
                               └─ 成功时调用 → .then()
});

p.then(result => { /* 成功 */ })
 .catch(error => { /* 失败 */ })
 .finally(() => { /* 无论成败 */ });

状态流转：
pending（进行中）──resolve──→ fulfilled（成功）
                ──reject──→ rejected（失败）
状态一旦改变，不可逆转
```

**最简示例：**

```javascript
const p = new Promise(resolve => resolve('成功'));
p.then(result => console.log(result));  // '成功'
```

**详细示例：**

```javascript
// 创建 Promise
function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.ok) resolve(response.json());
                else reject(new Error(`HTTP ${response.status}`));
            })
            .catch(reject);
    });
}

// 使用
fetchData('/api/users')
    .then(data => console.log(data))
    .catch(error => console.error('请求失败:', error))
    .finally(() => console.log('请求结束'));
```

---

### Promise 链式调用

**最简示例：**

```javascript
fetchData('/api/user/1')
    .then(user => fetchData(`/api/posts/${user.id}`))
    .then(posts => console.log(posts))
    .catch(err => console.error(err));
```

**详细示例：**

```javascript
// 对比：回调地狱 vs Promise 链式

// ❌ 回调地狱
loadFile('a.txt', (a) => {
    loadFile('b.txt', (b) => {
        loadFile('c.txt', (c) => {
            console.log(a, b, c);
        });
    });
});

// ✅ Promise 链式 — 扁平化
loadFile('a.txt')
    .then(a => loadFile('b.txt'))
    .then(b => loadFile('c.txt'))
    .then(c => console.log(c))
    .catch(err => console.error('任一环节出错:', err));

// 链式规则
Promise.resolve(1)
    .then(n => n + 1)              // 返回普通值 → 自动包装为 Promise
    .then(n => Promise.resolve(n * 2))  // 返回 Promise → 等待完成
    .then(n => console.log(n));    // 4
```

---

### Promise 组合方法

**语法结构图：**

```
四种组合方法：

Promise.all([...])          → 全部成功才成功，一个失败就失败
Promise.race([...])         → 谁先完成用谁
Promise.allSettled([...])   → 全部完成（不管成败），返回每个的结果
Promise.any([...])          → 一个成功就成功，全部失败才失败
```

**最简示例：**

```javascript
// all：全部成功
Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => { });

// race：谁快用谁
Promise.race([fast, slow]).then(result => { });

// allSettled：全部完成
Promise.allSettled([p1, p2]).then(results => { });

// any：一个成功就行
Promise.any([s1, s2, s3]).then(result => { });
```

**详细示例：**

```javascript
// Promise.all — 并行请求，一个失败全失败
Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
])
.then(([users, posts]) => console.log(users, posts))
.catch(err => console.error('有请求失败'));

// Promise.allSettled — 全部完成，返回每个状态
Promise.allSettled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/error').then(r => r.json()),
])
.then(results => {
    results.forEach(r => {
        if (r.status === 'fulfilled') console.log('成功:', r.value);
        else console.log('失败:', r.reason);
    });
});

// Promise.any — 多服务器容错
Promise.any([
    fetch('/api/server1'),
    fetch('/api/server2'),
])
.then(response => console.log('最快的服务器:', response))
.catch(() => console.error('所有服务器都挂了'));
```

---

### async/await

**语法结构图：**

```
async/await 结构：

async function fn() {          ← async 声明，返回 Promise
    const result = await p;    ← await 等待 Promise 完成
    return result;             ← 相当于 Promise.resolve(result)
}

错误处理：
async function fn() {
    try {
        const result = await riskyOperation();
    } catch (error) {
        // 处理错误
    }
}
```

**最简示例：**

```javascript
async function load() {
    const data = await fetch('/api/data').then(r => r.json());
    return data;
}
```

**详细示例：**

```javascript
// 对比：Promise 链式 vs async/await

// Promise 链式
function loadData1() {
    return fetch('/api/users')
        .then(res => res.json())
        .then(data => { console.log(data); return data; })
        .catch(err => console.error(err));
}

// async/await — 更像同步代码，更清晰
async function loadData2() {
    try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('请求失败');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('出错了:', error);
    }
}
```

---

## L2 实践层：用好

### 最佳实践

| 实践 | 原因 | 示例 |
|------|------|------|
| 优先用 async/await | 代码清晰、易调试 | `const data = await fetch(url)` |
| 并行请求用 Promise.all | 比顺序快 N 倍 | `await Promise.all([p1, p2])` |
| 总是处理错误 | 未捕获的 Promise 错误会丢失 | `try/catch` 或 `.catch()` |
| 检查 response.ok | fetch 不会因 HTTP 错误 reject | `if (!response.ok) throw ...` |
| 用 AbortController 做超时 | 避免请求无限等待 | `signal: controller.signal` |
| 避免在循环中 await | 串行太慢，改用 Promise.all | `await Promise.all(items.map(fn))` |

### 反模式：不要这样做

```javascript
// ❌ 错误：for 循环中 await（串行，慢）
for (const url of urls) {
    const data = await fetch(url).then(r => r.json());
    results.push(data);
}

// ✅ 正确：并行请求
const results = await Promise.all(
    urls.map(url => fetch(url).then(r => r.json()))
);
```

```javascript
// ❌ 错误：忽略 fetch 的 HTTP 错误
const data = await fetch('/api/users').then(r => r.json());
// 如果返回 404/500，fetch 不会 reject，但 data 不是预期的 JSON

// ✅ 正确：检查状态码
const response = await fetch('/api/users');
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const data = await response.json();
```

```javascript
// ❌ 错误：混用 .then() 和 await（混乱）
const response = await fetch(url).then(r => r.json()).then(d => d.data);

// ✅ 正确：统一风格
const response = await fetch(url);
const data = await response.json();
const result = data.data;
```

```javascript
// ❌ 错误：异步代码不 catch
async function load() {
    const data = await fetch('/api/data');  // 可能 reject
    return data.json();
}
load();  // 未捕获的 Promise rejection

// ✅ 正确：用 try/catch 包裹
async function load() {
    try {
        const response = await fetch('/api/data');
        return await response.json();
    } catch (error) {
        console.error('加载失败:', error);
        return null;
    }
}
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 单一异步操作 | async/await | 代码最清晰 |
| 多个独立请求 | Promise.all + await | 并行，速度快 |
| 多个依赖请求 | 连续 await | 需要上一个结果 |
| 容错（多服务器） | Promise.any | 一个成功就行 |
| 不管成败都要结果 | Promise.allSettled | 返回每个状态 |
| 超时控制 | AbortController | 标准 API |
| 自动重试 | 自定义循环 + await | 灵活可控 |

---

## L3 专家层：深入

### 事件循环原理

```
事件循环执行流程：

┌────────────────────────────────────┐
│  步骤 1：执行同步代码（Call Stack）  │
│  所有同步代码执行完毕               │
└────────────────────────────────────┘
          ↓
┌────────────────────────────────────┐
│  步骤 2：清空微任务队列              │
│  - Promise.then/catch/finally      │
│  - queueMicrotask                  │
│  - MutationObserver                │
│  → 全部执行完，才进入下一步          │
└────────────────────────────────────┘
          ↓
┌────────────────────────────────────┐
│  步骤 3：执行一个宏任务              │
│  - setTimeout/setInterval          │
│  - I/O 回调                        │
│  - UI 渲染                         │
│  → 每次只取一个                     │
└────────────────────────────────────┘
          ↓
       回到步骤 2（循环往复）
```

```javascript
// 验证执行顺序
console.log('1. 同步');

setTimeout(() => console.log('2. 宏任务'), 0);

Promise.resolve()
    .then(() => console.log('3. 微任务 1'))
    .then(() => console.log('4. 微任务 2'));

console.log('5. 同步');

// 输出：1 → 5 → 3 → 4 → 2
// 同步 → 所有微任务 → 第一个宏任务
```

### 性能考量

| 操作 | 性能影响 | 说明 |
|------|---------|------|
| Promise 创建 | 极低 | 现代引擎高度优化 |
| 过多微任务 | 阻塞 UI | 微任务会阻塞宏任务执行 |
| 串行 await | 慢 | 多个 await 应改为 Promise.all |
| 未 catch 的 Promise | 内存泄漏 | 浏览器会发出警告 |
| 大型 Promise.all | 并发过高 | 可能被服务器限流，需控制并发 |

### 设计动机

**JavaScript 为什么是单线程 + 异步？**

| 设计选择 | 原因 | 替代方案对比 |
|----------|------|-------------|
| 单线程 | 避免 DOM 操作的竞态条件 | 多线程需要锁机制，复杂度高 |
| 事件循环 | 异步不阻塞主线程 | 阻塞式会导致 UI 卡死 |
| 微任务优先 | Promise 需要尽快执行 | 保证异步链式调用的可预测性 |
| async/await | 降低异步编程门槛 | Promise 链式在深层嵌套时仍不够清晰 |

### 知识关联

```
异步编程关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  回调函数   │────→│   Promise   │────→│ async/await │
│  最早方案   │     │  链式调用   │     │  终极方案   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Promise  │ │ Promise  │ │ Promise  │
        │   .all   │ │  .race   │ │.allSettled│
        └──────────┘ └──────────┘ └──────────┘
                           │
                           ↓
                  ┌─────────────────┐
                  │    事件循环     │
                  │  微任务/宏任务  │
                  └─────────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **同步** | 代码按顺序执行，每行等前一行完成 | `console.log('a'); console.log('b')` |
| **异步** | 不等待操作完成，继续执行后续代码 | `setTimeout(fn, 1000)` |
| **回调函数** | 作为参数传递，在操作完成后调用的函数 | `fs.readFile(path, callback)` |
| **回调地狱** | 多层回调嵌套导致代码难以阅读和维护 | 金字塔形嵌套结构 |
| **Promise** | 表示异步操作最终结果的对象 | `new Promise((resolve, reject) => {})` |
| **pending** | Promise 的初始状态，操作进行中 | Promise 创建后的状态 |
| **fulfilled** | Promise 成功完成的状态 | `resolve()` 后的状态 |
| **rejected** | Promise 失败的状态 | `reject()` 后的状态 |
| **async** | 声明异步函数，返回值自动包装为 Promise | `async function fn() {}` |
| **await** | 等待 Promise 完成，只能在 async 函数中使用 | `const data = await fetch(url)` |
| **事件循环** | JavaScript 处理异步的执行机制 | 调用栈 → 微任务 → 宏任务 |
| **微任务** | 优先级高的异步任务队列 | `Promise.then`、`queueMicrotask` |
| **宏任务** | 优先级低的异步任务队列 | `setTimeout`、`setInterval`、I/O |

---

## 实践练习

### 练习：并发请求 + 重试 + 超时

```javascript
// 场景：从 API 加载数据，带重试和超时控制

class ApiClient {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl;
        this.retries = options.retries ?? 3;
        this.timeout = options.timeout ?? 5000;
    }

    async request(endpoint) {
        const url = `${this.baseUrl}${endpoint}`;

        for (let attempt = 1; attempt <= this.retries; attempt++) {
            try {
                return await this.fetchWithTimeout(url);
            } catch (error) {
                console.log(`第 ${attempt} 次请求失败: ${error.message}`);
                if (attempt === this.retries) throw error;
                await this.delay(attempt * 1000);
            }
        }
    }

    async fetchWithTimeout(url) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), this.timeout);

        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timer);

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            clearTimeout(timer);
            if (error.name === 'AbortError') throw new Error('请求超时');
            throw error;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// 使用示例
const api = new ApiClient('https://jsonplaceholder.typicode.com', {
    retries: 2,
    timeout: 3000,
});

// 单个请求
const post = await api.request('/posts/1');
console.log(post);

// 并行请求
const [posts, comments] = await Promise.all([
    api.request('/posts'),
    api.request('/comments'),
]);
console.log(`加载了 ${posts.length} 篇文章，${comments.length} 条评论`);
```

---

## 常见问题

### Q1：setTimeout 和 Promise.then 谁先执行？

**Promise.then 先执行。** 微任务优先于宏任务：

```javascript
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
// 输出：promise → timeout
```

### Q2：async/await 和 Promise 是什么关系？

**async/await 是 Promise 的语法糖：**

```javascript
// 这两种写法等价
async function fn() {
    const data = await fetch('/api');
    return data;
}

function fn() {
    return fetch('/api').then(data => data);
}
```

### Q3：如何处理多个异步操作的错误？

```javascript
// 并行请求：一个失败不影响其他
const results = await Promise.allSettled([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/error').then(r => r.json()),
]);

results.forEach(r => {
    if (r.status === 'fulfilled') console.log('成功:', r.value);
    else console.log('失败:', r.reason);
});
```

---

## 学习资源

- [MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) ⭐ 官方权威
- [MDN async/await](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Async_await)
- [JavaScript.info 异步](https://zh.javascript.info/async)
- [Jake Archibald: Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) ⭐ 事件循环必读
