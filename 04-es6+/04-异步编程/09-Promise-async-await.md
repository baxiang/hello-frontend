# Promise 与 async/await

> 从零开始理解 JavaScript 的异步编程

## 学习目标

- ✅ 理解 Promise 的三种状态
- ✅ 掌握 Promise 链式调用
- ✅ 掌握 Promise 组合方法
- ✅ 熟练使用 async/await

---

## 9.0 为什么要学 Promise？

### 9.0.1 故事背景：异步编程

JavaScript 是单线程的，很多操作不能"等待"完成：

```javascript
// 同步代码：一步一步执行
console.log('1');
console.log('2');
console.log('3');

// 异步代码：不能等待
console.log('1');
setTimeout(() => console.log('2'), 1000);  // 1秒后执行
console.log('3');  // 立即执行，不等待 setTimeout
```

### 9.0.2 回调函数的问题

```javascript
// 回调地狱
fetchData(function(a) {
    processData(a, function(b) {
        saveData(b, function(c) {
            console.log(c);
        });
    });
});
```

### 9.0.3 Promise 的解决方案

```
┌─────────────────────────────────────────────────────────────┐
│                    Promise 的优势                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 更清晰的异步流程控制                                    │
│     → 链式调用 .then().then()                               │
│                                                             │
│  2. 统一的错误处理                                          │
│     → .catch() 集中处理错误                                 │
│                                                             │
│  3. 组合多个异步操作                                        │
│     → Promise.all、Promise.race                           │
│                                                             │
│  4. async/await 语法糖                                       │
│     → 看起来像同步代码                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.0.4 本章学习路径

```
第一步：理解 Promise 概念（什么是 Promise）
    ↓
第二步：Promise 基础（创建和使用）
    ↓
第三步：Promise 链式调用（.then().catch()）
    ↓
第四步：Promise 组合方法（all、race）
    ↓
第五步：async/await（更简洁的语法）
```

---

## 9.1 Promise 基础详解

### 9.1.1 什么是 Promise？

```
┌─────────────────────────────────────────────────────────────┐
│  Promise = "承诺" = 异步操作的结果                          │
│                                                             │
│  三种状态：                                                  │
│  - pending（等待中）：刚开始，还没结果                        │
│  - fulfilled（已完成）：成功了！                              │
│  - rejected（已失败）：失败了                                │
│                                                             │
│  状态变化：                                                  │
│  pending → fulfilled（调用 resolve）                        │
│  pending → rejected（调用 reject）                         │
│                                                             │
│  一旦状态改变，就不能再变                                    │
└─────────────────────────────────────────────────────────────┘
```

### 9.1.2 逐步理解 Promise 代码

**先理解整体结构：**

```javascript
const promise = new Promise((resolve, reject) => {
    // 这里是" executor "函数，会立即执行
    // resolve 和 reject 是两个"回调函数"
    
    // 异步操作（比如等待 1 秒）
    setTimeout(() => {
        // 1 秒后执行这里
    }, 1000);
});
```

**逐个解释每个部分：**

```
┌─────────────────────────────────────────────────────────────┐
│  new Promise((resolve, reject) => { ... })                  │
│                                                             │
│  就像：点外卖时，店家给你一个"承诺"                          │
│  - resolve = 打电话说"饭做好了，来取吧"                     │
│  - reject = 打电话说"不好意思，食材用完了"                   │
│                                                             │
│  参数解释：                                                 │
│  - resolve：函数，调用它表示"成功了"                        │
│  - reject：函数，调用它表示"失败了"                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**setTimeout 解释：**

```javascript
setTimeout(() => {
    // 这里是要执行的代码
}, 1000);
//      ↑
//      1000 毫秒 = 1 秒
//      延迟 1 秒后执行箭头函数里的代码
```

**完整代码逐行解释：**

```javascript
const promise = new Promise((resolve, reject) => {
    // 1. 这里开始执行一些异步操作
    
    setTimeout(() => {  // 2. 等待 1000 毫秒（1秒）
        
        const success = true;  // 3. 假设操作成功了
        
        if (success) {  // 4. 判断是否成功
            resolve('操作成功！');  // 5a. 成功！调用 resolve，传入结果
        } else {
            reject(new Error('操作失败'));  // 5b. 失败！调用 reject，传入错误
        }
    }, 1000);  // 延迟 1 秒
});
```

**resolve 和 reject 的参数类型：**

```javascript
// resolve 可以传入任何值
resolve('操作成功！');        // 字符串
resolve(123);                // 数字
resolve({ name: '张三' });   // 对象
resolve([1, 2, 3]);          // 数组

// reject 通常传入 Error 对象
reject(new Error('操作失败'));
reject('失败原因');  // 也可以传字符串，但不推荐
```

**生活比喻：**

```
┌─────────────────────────────────────────────────────────────┐
│  就像点外卖：                                              │
│                                                             │
│  1. 你下单（new Promise）                                   │
│  2. 店家开始做饭（executor 函数立即执行）                   │
│  3. 等待 1 小时（setTimeout 延迟）                          │
│  4. 饭做好了 → 打电话通知你（resolve）                      │
│     或者食材没了 → 打电话告诉你（reject）                   │
│  5. 你去取饭（.then() 处理结果）                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => {
        const success = true;

        if (success) {
            resolve('操作成功！');  // 成功，传递结果
        } else {
            reject(new Error('操作失败'));  // 失败，传递错误
        }
    }, 1000);
});

// 使用 Promise
promise
    .then(result => {
        console.log(result);  // '操作成功！'
    })
    .catch(error => {
        console.error(error);  // Error: 操作失败
    });
```

### 9.1.3 resolve 和 reject

```javascript
// resolve：告诉 Promise 成功了
const promise1 = new Promise((resolve, reject) => {
    resolve('成功的结果');
});

// reject：告诉 Promise 失败了
const promise2 = new Promise((resolve, reject) => {
    reject(new Error('失败的原因'));
});

// 简化：直接返回成功/失败的 Promise
const promise3 = Promise.resolve('直接成功');
const promise4 = Promise.reject(new Error('直接失败'));
```

---

## 9.2 Promise 链式调用

### 9.2.1 .then()

```javascript
// .then() 处理成功的情况
const promise = new Promise((resolve, reject) => {
    resolve(1);
});

promise
    .then(result => {
        console.log(result);  // 1
        return result * 2;     // 返回值会传递给下一个 .then()
    })
    .then(result => {
        console.log(result);  // 2
        return result * 2;
    })
    .then(result => {
        console.log(result);  // 4
    });
```

### 9.2.2 .catch()

```javascript
// .catch() 处理错误
const promise = new Promise((resolve, reject) => {
    reject(new Error('出错了'));
});

promise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error.message);  // '出错了'
    });
```

### 9.2.3 .finally()

```javascript
// .finally() 无论成功失败都执行
const promise = new Promise((resolve, reject) => {
    resolve('成功');
});

promise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        console.log('清理工作');  // 无论成功失败都执行
    });
```

### 9.2.4 完整流程

```javascript
new Promise((resolve, reject) => {
    // 异步操作
})
    .then(成功的处理函数)
    .then(成功的处理函数)
    .catch(失败的处理函数)
    .finally(最终清理);
```

---

## 9.3 Promise 组合方法

### 9.3.1 Promise.all()

等待所有 Promise 完成。

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
    .then(results => {
        console.log(results);  // [1, 2, 3]
    });

// 实际应用：并行请求多个 API
const request1 = fetch('/api/users');
const request2 = fetch('/api/posts');

Promise.all([request1, request2])
    .then(([usersResponse, postsResponse]) => {
        return Promise.all([
            usersResponse.json(),
            postsResponse.json()
        ]);
    })
    .then(([users, posts]) => {
        console.log(users, posts);
    });
```

### 9.3.2 Promise.race()

返回最先完成（无论成功或失败）的 Promise。

```javascript
const p1 = new Promise(resolve => setTimeout(() => resolve('1'), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve('2'), 500));
const p3 = new Promise((_, reject) => setTimeout(() => reject('3'), 300));

Promise.race([p1, p2, p3])
    .then(result => {
        console.log(result);  // '2'（p2 最先完成）
    })
    .catch(error => {
        console.log(error);  // 如果 p3 先失败，会输出 '3'
    });
```

### 9.3.3 Promise.allSettled()

等待所有 Promise 结束（无论成功或失败）。

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.reject(new Error('失败'));
const p3 = Promise.resolve(3);

Promise.allSettled([p1, p2, p3])
    .then(results => {
        console.log(results);
        // [
        //   { status: 'fulfilled', value: 1 },
        //   { status: 'rejected', reason: Error: 失败 },
        //   { status: 'fulfilled', value: 3 }
        // ]
    });
```

### 9.3.4 Promise.any()

返回第一个成功的 Promise。

```javascript
const p1 = Promise.reject(new Error('1'));
const p2 = Promise.resolve('2');
const p3 = Promise.resolve('3');

Promise.any([p1, p2, p3])
    .then(result => {
        console.log(result);  // '2'（p2 最先成功）
    })
    .catch(error => {
        console.log(error);  // 全部失败时
    });
```

---

## 9.4 async/await 详解

### 9.4.1 什么是 async/await？

```
┌─────────────────────────────────────────────────────────────┐
│  async/await = Promise 的"语法糖"                           │
│                                                             │
│  让异步代码看起来像同步代码                                  │
│                                                             │
│  async：声明异步函数                                         │
│  await：等待 Promise 完成                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 9.4.2 基本语法

```javascript
// Promise 方式
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('数据');
        }, 1000);
    });
}

fetchData()
    .then(data => {
        console.log(data);
    });

// async/await 方式
async function fetchData() {
    const data = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('数据');
        }, 1000);
    });
    console.log(data);  // 看起来像同步代码
}

fetchData();
```

### 9.4.3 错误处理

```javascript
// 使用 try...catch
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('请求失败:', error);
        throw error;
    }
}
```

### 9.4.4 并行执行

```javascript
// 串行：一个个等待
async function serial() {
    const user = await fetch('/api/user').then(r => r.json());
    const posts = await fetch('/api/posts').then(r => r.json());
    return { user, posts };
}

// 并行：同时请求
async function parallel() {
    const [userResponse, postsResponse] = await Promise.all([
        fetch('/api/user'),
        fetch('/api/posts')
    ]);
    const user = await userResponse.json();
    const posts = await postsResponse.json();
    return { user, posts };
}
```

---

## 9.5 实践练习

### 练习 1：Promise 基础

```javascript
// 1.1 创建 Promise
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

delay(1000).then(() => {
    console.log('1秒后执行');
});

// 1.2 链式调用
Promise.resolve(1)
    .then(x => x + 1)
    .then(x => x * 2)
    .then(x => console.log(x));  // 4
```

### 练习 2：async/await

```javascript
// 2.1 async 函数
async function greet() {
    return '你好';
}

greet().then(message => console.log(message));  // 你好

// 2.2 await 使用
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function example() {
    console.log('开始');
    await wait(1000);
    console.log('1秒后');
}

example();
```

### 练习 3：错误处理

```javascript
// 3.1 try...catch
async function safeFetch(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('请求失败:', error);
        return null;
    }
}
```

---

## 9.6 常见问答

### Q1: Promise 和 async/await 哪个好？

**答：** 功能相同，async/await 更简洁。

```javascript
// Promise
fetchData()
    .then(data => process(data))
    .catch(error => console.error(error));

// async/await（更易读）
async function main() {
    try {
        const data = await fetchData();
        await process(data);
    } catch (error) {
        console.error(error);
    }
}
```

### Q2: async 函数总是返回 Promise 吗？

```javascript
// 是的，async 函数总是返回 Promise
async function fn() {
    return 'hello';
}

fn().then(console.log);  // 'hello'

// 即使返回非 Promise 值，也会被包装成 Promise
async function fn2() {
    return 'hello';
}
```

### Q3: await 可以在循环中使用吗？

```javascript
// 可以，但要注意性能
async function processItems(items) {
    for (const item of items) {
        await process(item);  // 串行处理
    }
}

// 如果可以并行：
async function processItems(items) {
    await Promise.all(items.map(item => process(item)));
}
```

---

## 9.7 学习资源

### 官方文档

- [MDN - Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN - async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

### 推荐教程

- [ES6 入门教程 - 阮一峰](https://es6.ruanyifeng.com/#docs/promise)
- [JavaScript.info - Promise](https://zh.javascript.info/promise-basics)

---

**上一章：** [← 08-Class 类与继承](./08-Class%20类与继承.md)  
**下一章：** [→ 10-生成器与迭代器](./10-生成器与迭代器.md)