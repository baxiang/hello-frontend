# timers 定时器模块

> 延迟执行和定时执行

## 什么是 timers 模块？

```
┌─────────────────────────────────────────────────────────────┐
│  timers = 定时器模块                                         │
│                                                             │
│  就像：                                                     │
│  - 闹钟：到点就响                                           │
│  - 倒计时：时间到了就提醒                                    │
│  - 循环任务：每隔一段时间执行一次                            │
│                                                             │
│  主要函数：                                                 │
│  - setTimeout  延迟执行                                      │
│  - setInterval  循环执行                                     │
│  - setImmediate  立即执行                                    │
│  - requestAnimationFrame  动画帧                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 10.1 setTimeout

### 基本用法

```javascript
// 延迟执行
setTimeout(() => {
    console.log('3秒后执行');
}, 3000);

// 带参数
setTimeout((name, age) => {
    console.log(`你好，${name}，${age}岁`);
}, 1000, '张三', 25);

// 取消
const timer = setTimeout(() => {
    console.log('这不会执行');
}, 3000);

clearTimeout(timer);
```

---

## 10.2 setInterval

### 基本用法

```javascript
// 每隔一段时间执行
const interval = setInterval(() => {
    console.log('每秒执行一次');
}, 1000);

// 取消
setTimeout(() => {
    clearInterval(interval);
    console.log('停止');
}, 5000);
```

### 实际应用：倒计时

```javascript
function countdown(seconds) {
    let count = seconds;

    const timer = setInterval(() => {
        console.log(count);
        count--;

        if (count < 0) {
            clearInterval(timer);
            console.log('时间到！');
        }
    }, 1000);
}

countdown(5);
// 输出: 5, 4, 3, 2, 1, 0, 时间到！
```

---

## 10.3 setImmediate

### 基本用法

```javascript
// 立即执行（比 setTimeout 0 更先执行）
setImmediate(() => {
    console.log('立即执行');
});

setTimeout(() => {
    console.log('延迟执行');
}, 0);

// 输出顺序：立即执行, 延迟执行
```

### 使用场景

```javascript
// I/O 回调后执行
fs.readFile('file.txt', () => {
    setImmediate(() => {
        console.log('在 I/O 回调后执行');
    });
});
```

---

## 10.4 process.nextTick

### 基本用法

```javascript
// 在当前操作完成后立即执行
process.nextTick(() => {
    console.log('下一个 tick 执行');
});

console.log('先执行这个');

// 输出: 先执行这个, 下一个 tick 执行
```

### nextTick vs setImmediate

```javascript
process.nextTick(() => {
    console.log('nextTick');
});

setImmediate(() => {
    console.log('setImmediate');
});

console.log('同步代码');

// 输出: 同步代码, nextTick, setImmediate
```

---

## 10.5 常见问答

### Q1: setTimeout 0 和 setImmediate 区别？

```javascript
// setTimeout 0：至少延迟到下一个事件循环
// setImmediate：在当前事件循环的 I/O 回调后执行

// 在 I/O 回调中
fs.readFile('file.txt', () => {
    setTimeout(() => console.log('timeout'), 0);
    setImmediate(() => console.log('immediate'));
});

// 输出: immediate, timeout (setImmediate 总是先执行)
```

### Q2: 什么时候用 process.nextTick？

```javascript
// 确保回调在下一个事件循环之前执行
// 适合需要尽快执行的场景
```

---

## 10.6 学习资源

- [Node.js timers 官方文档](https://nodejs.org/api/timers.html)

---

**上一章：** [← os 系统模块](./09-os-系统模块.md)  
**返回：** [← 返回目录](./00-Node.js%20内置模块概述.md)