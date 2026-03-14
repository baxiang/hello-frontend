# Promise 与 async/await

## 学习目标
- 理解 Promise 的三种状态
- 掌握 Promise 链式调用
- 掌握 Promise 组合方法
- 熟练使用 async/await

---

## 8.0 通俗理解 Promise

### Promise 是什么？

```
Promise = "承诺" = 未来的结果

就像：
- 点外卖时，店员给你一个"取餐号"
- 做好了叫你来取（resolve）
- 没做好说抱歉（reject）
- 这就是 Promise
```

### Promise 的三种状态

```
┌─────────────────────────────────────────┐
│           Promise 状态                  │
├─────────────────────────────────────────┤
│                                         │
│  pending（等待中）                      │
│       ↓ 成功                            │
│  fulfilled（已完成） ──→ .then()       │
│       ↓ 失败                            │
│  rejected（已失败） ──→ .catch()       │
│                                         │
└─────────────────────────────────────────┘
```

### 1. setTimeout 的参数类型

```javascript
setTimeout(函数, 时间);
```

**setTimeout 接收两个参数：**

| 参数 | 类型 | 说明 |
|------|------|------|
| 第1个 | `function` | 延迟后要执行的函数 |
| 第2个 | `number` | 延迟时间（毫秒） |

**具体类型：**

```javascript
// setTimeout 的类型定义：
// setTimeout(callback: () => void, delay: number): number

setTimeout(() => {
    // 这里的 () => {} 是 function 类型
    console.log('执行了');
}, 1000);
//        │       │
//        │       └── number 类型
//        └── function 类型
```

**详细拆解：**

```javascript
// 第一个参数：function（函数）
// 可以是：
() => { }                    // 无参数函数
(a) => { }                   // 1个参数函数
(a, b) => { }                // 2个参数函数

// 第二个参数：number（数字）
// 必须是数字，单位是毫秒
1000    // 1秒
2000    // 2秒
500     // 0.5秒
```

**完整例子：**

```javascript
// setTimeout(函数, 时间)
setTimeout(() => console.log('Hello'), 1000);
//          │              │
//          │              └── 第二个参数：number（毫秒）
//          └── 第一个参数：function（箭头函数）
```

---

### 2. Promise 的参数类型

```javascript
new Promise((resolve, reject) => {
    //           │        │
    //           │        └── reject: (reason?: any) => void
    //           └── resolve: (value?: any) => void
});
```

**Promise 构造函数接收一个函数作为参数：**

```javascript
// Promise 的类型定义：
// new Promise(executor: (resolve, reject) => void)

// executor 是一个函数，接收两个参数：
// - resolve: (value?: any) => void
// - reject: (reason?: any) => void
```

**resolve 的类型：**

```javascript
// resolve 是一个函数，类型是：
(value?: any) => void

// 参数可以是任意类型：
resolve('成功');           // 传字符串
resolve(123);             // 传数字
resolve({ ok: true });    // 传对象
resolve([1, 2, 3]);      // 传数组
```

**reject 的类型：**

```javascript
// reject 是一个函数，类型是：
(reason?: any) => void

// 通常传 Error 对象：
reject(new Error('失败原因'));
reject('失败原因');  // 也可以传字符串
```

**完整类型标注：**

```javascript
// 完整写法
const promise = new Promise<any>((resolve: (value: any) => void, reject: (reason?: any) => void) => {
    // resolve 的类型：(value: any) => void
    // reject 的类型：(reason?: any) => void
    
    resolve('成功');  // resolve 接收 any 类型
    reject(new Error('失败'));  // reject 接收 any 类型
});
```

**简化理解：**

```javascript
new Promise((resolve, reject) => {
    // resolve = (value) => {}  ← 一个接收值的函数
    // reject = (error) => {}   ← 一个接收错误的函数
    
    // 调用 resolve，传递成功的结果
    resolve('操作成功');
    
    // 或者调用 reject，传递失败的原因
    reject(new Error('操作失败'));
});
```

---

### 2. resolve 和 reject 是什么？

```
resolve 和 reject 都是"函数"

- resolve = "解决" = 告诉 Promise 成功了
- reject = "拒绝" = 告诉 Promise 失败了
```

**它们是 Promise 给你的两个"按钮"：**

```javascript
new Promise((resolve, reject) => {
    // resolve 和 reject 是两个函数
    // 你来决定按哪个
    
    // 按这个 = 成功
    resolve('成功啦！');
    
    // 按这个 = 失败
    reject('失败啦！');
});
```

**实际例子：**

```javascript
// 模拟：点外卖
const order = new Promise((resolve, reject) => {
    // 假设 1 秒后出结果
    setTimeout(() => {
        const success = true;
        
        if (success) {
            // 成功！按这个按钮
            resolve('外卖到了！');
        } else {
            // 失败！按这个按钮
            reject('外卖没送到');
        }
    }, 1000);
});
```

**resolve('值') 传递的值去哪了？**

```javascript
// 1. 创建 Promise
const promise = new Promise((resolve, reject) => {
    resolve('操作成功');  // 把"操作成功"传出去
});

// 2. 用 .then() 接收
promise.then((result) => {
    console.log(result);  // 输出："操作成功"
});
```

---

### 3. 完整例子逐步拆解

```javascript
const promise = new Promise((resolve, reject) => {
    // 1. 这里写异步代码
    setTimeout(() => {
        // 2. 1秒后执行这里
        
        const success = true;
        
        if (success) {
            // 3. 成功，调用 resolve
            resolve('操作成功');
        } else {
            // 4. 失败，调用 reject
            reject(new Error('操作失败'));
        }
    }, 1000);  // 延迟 1 秒
});
```

**流程图：**

```
new Promise((resolve, reject) => {
    │
    │  ← resolve 和 reject 是两个"按钮"
    │
    ▼
setTimeout(() => {
    │
    │  ← 1秒后执行
    │
    ▼
    if (success) {
        resolve('成功');  ← 按成功按钮，传递"成功"
    } else {
        reject('失败');   ← 按失败按钮，传递"失败"
    }
})
```

---

### 4. 箭头函数简化过程

```javascript
// 原始写法（不用箭头函数）
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('成功');
    }, 1000);
});

// 箭头函数简化
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 1000);
});

// 对比：
// function(resolve, reject) { }  = (resolve, reject) => { }
// function() { }                = () => { }
// function(result) { }          = (result) => { }
```

### 箭头函数详细解释

```javascript
// 原始写法
const promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('成功');
    }, 1000);
});

// 箭头函数简化
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 1000);
});

// 对比：
// function(resolve, reject) { }  = (resolve, reject) => { }
// function() { }                = () => { }
// function(result) { }          = (result) => { }
```

### 用法：等待结果

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('操作成功');
    }, 1000);
});

// 等待结果
promise
    .then(result => {
        console.log('成功:', result);  // "操作成功"
    })
    .catch(error => {
        console.log('失败:', error);
    });
```

---

## 8.1 Promise 基础

### 创建 Promise

```javascript
const promise = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve('操作成功');
        } else {
            reject(new Error('操作失败'));
        }
    }, 1000);
});

// Promise 的三种状态
// pending - 进行中
// fulfilled - 已成功
// rejected - 已失败
```

### then/catch/finally

```javascript
promise
    .then(result => {
        console.log('成功:', result);
        return '新的值';
    })
    .catch(error => {
        console.error('失败:', error);
        throw error;  // 可以重新抛出
    })
    .finally(() => {
        console.log('无论成功失败都会执行');
    });
```

### 链式调用

```javascript
fetchData()
    .then(data => process(data))
    .then(result => save(result))
    .then(saved => notify(saved))
    .catch(error => console.error(error));

// 每个 then 都返回新的 Promise
// 可以链式调用
```

---

## 8.2 Promise 组合

### Promise.all

```javascript
// 等待所有 Promise 完成
Promise.all([
    fetch('/api/users'),
    fetch('/api/posts'),
    fetch('/api/comments')
])
.then(([usersRes, postsRes, commentsRes]) => {
    return Promise.all([
        usersRes.json(),
        postsRes.json(),
        commentsRes.json()
    ]);
})
.then(([users, posts, comments]) => {
    console.log('全部完成');
})
.catch(error => {
    // 任一失败都会触发
    console.error('有请求失败:', error);
});
```

### Promise.allSettled

```javascript
// 等待所有完成，不管成功失败
Promise.allSettled([
    Promise.resolve('成功 1'),
    Promise.reject('失败 1'),
    Promise.resolve('成功 2')
])
.then(results => {
    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log('成功:', result.value);
        } else {
            console.log('失败:', result.reason);
        }
    });
});
```

### Promise.race

```javascript
// 第一个完成的 Promise
Promise.race([
    fetch('/api/fast'),
    fetch('/api/slow')
])
.then(response => {
    console.log('最快的响应:', response);
});

// 超时控制
function fetchWithTimeout(url, timeout = 5000) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('超时')), timeout);
    });

    return Promise.race([
        fetch(url),
        timeoutPromise
    ]);
}
```

### Promise.any

```javascript
// 第一个成功的 Promise
Promise.any([
    fetch('/api/primary'),
    fetch('/api/backup1'),
    fetch('/api/backup2')
])
.then(response => {
    console.log('第一个成功的响应');
})
.catch(error => {
    // 所有都失败时的聚合错误
    console.error('所有请求都失败了');
});
```

---

## 8.3 async/await

### 基础语法

```javascript
// async 函数总是返回 Promise
async function getData() {
    return '数据';
    // 等价于 return Promise.resolve('数据');
}

// await 只能在 async 函数中使用
async function fetchUser(id) {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
}

// 使用
fetchUser(1).then(user => console.log(user));
```

### 错误处理

```javascript
// try-catch
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('请求失败:', error);
        throw error;  // 重新抛出
    }
}

// .catch()
fetchData().catch(error => {
    console.error('处理错误:', error);
});
```

### 并行执行

```javascript
// 串行（慢）
async function getData() {
    const user = await fetch('/api/user').then(r => r.json());
    const posts = await fetch('/api/posts').then(r => r.json());
    return { user, posts };
}

// 并行（快）- 推荐
async function getData() {
    const [user, posts] = await Promise.all([
        fetch('/api/user').then(r => r.json()),
        fetch('/api/posts').then(r => r.json())
    ]);
    return { user, posts };
}
```

---

## 8.4 实用技巧

### 封装请求

```javascript
// request.js
const request = {
    base: '/api',

    async get(url, params = {}) {
        const query = new URLSearchParams(params);
        const res = await fetch(`${this.base}/${url}?${query}`);
        return this.handle(res);
    },

    async post(url, data = {}) {
        const res = await fetch(`${this.base}/${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return this.handle(res);
    },

    async handle(res) {
        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
    }
};

// 使用
const users = await request.get('/users');
```

### 重试机制

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const res = await fetch(url, options);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            // 指数退避
            await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
        }
    }
}
```

### 并发限制

```javascript
class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
    }

    add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.run();
        });
    }

    async run() {
        while (this.running < this.concurrency && this.queue.length) {
            const { task, resolve, reject } = this.queue.shift();
            this.running++;
            try {
                const result = await task();
                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
                this.running--;
                this.run();
            }
        }
    }
}

// 使用
const queue = new TaskQueue(2);
queue.add(() => download(1));
queue.add(() => download(2));
queue.add(() => download(3));
```

---

## 8.5 实践练习

### 练习 1：图片加载器

```javascript
class ImageLoader {
    constructor() {
        this.cache = new Map();
    }

    async load(src) {
        if (this.cache.has(src)) {
            return this.cache.get(src);
        }

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.cache.set(src, img);
                resolve(img);
            };
            img.onerror = () => reject(new Error(`加载失败：${src}`));
            img.src = src;
        });
    }

    async loadAll(sources) {
        return Promise.allSettled(
            sources.map(src => this.load(src))
        );
    }
}

// 使用
const loader = new ImageLoader();
const images = await loader.loadAll(['a.jpg', 'b.jpg', 'c.jpg']);
```

### 练习 2：延迟队列

```javascript
class DelayQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    add(task, delay) {
        return new Promise((resolve) => {
            this.queue.push({ task, delay, resolve });
            this.process();
        });
    }

    async process() {
        if (this.processing || this.queue.length === 0) return;

        this.processing = true;

        while (this.queue.length > 0) {
            const { task, delay, resolve } = this.queue.shift();
            await new Promise(r => setTimeout(r, delay));
            const result = await task();
            resolve(result);
        }

        this.processing = false;
    }
}

// 使用
const queue = new DelayQueue();
queue.add(() => console.log('任务 1'), 1000);
queue.add(() => console.log('任务 2'), 2000);
```

### 练习 3：取消请求

```javascript
class CancelablePromise {
    constructor(executor) {
        this.cancel = () => {};
        this.promise = new Promise((resolve, reject) => {
            this.cancel = reject;
            executor(resolve, reject, this.cancel);
        });
    }

    then(...args) {
        return this.promise.then(...args);
    }

    catch(...args) {
        return this.promise.catch(...args);
    }
}

// 使用
const request = new CancelablePromise((resolve, reject, cancel) => {
    const controller = new AbortController();
    cancel = () => controller.abort();

    fetch('/api/data', { signal: controller.signal })
        .then(resolve)
        .catch(reject);
});

// 取消
request.cancel();
```

---

## 8.6 常见问答

### Q1: Promise 和 async/await 如何选择？

**答：** 推荐优先使用 async/await，但以下情况用 Promise：
- 并发执行（Promise.all）
- 竞争执行（Promise.race）
- 库的 API 返回 Promise

### Q2: async/await 可以循环中使用吗？

```javascript
// 串行（一个接一个）
for (const url of urls) {
    const res = await fetch(url);  // 等待完成
}

// 并行（同时）
const promises = urls.map(url => fetch(url));
const results = await Promise.all(promises);
```

### Q3: 顶层 await 是什么？

**答：** 在 ES Module 顶层可以直接使用 await。

```javascript
// ES Module
const data = await fetch('/api/data').then(r => r.json());
export default data;
```

---

## 8.7 学习资源

- [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - async/await](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Asynchronous/Async_await)
- [JavaScript.info - Promise](https://zh.javascript.info/promise-basics)

---

**上一章：** [← 08-Class 类与继承](./08-Class 类与继承.md)
**下一章：** [→ 10-生成器与迭代器](./10-生成器与迭代器.md)
