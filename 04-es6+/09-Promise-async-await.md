# Promise 与 async/await

## 学习目标
- 理解 Promise 的三种状态
- 掌握 Promise 链式调用
- 掌握 Promise 组合方法
- 熟练使用 async/await

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
