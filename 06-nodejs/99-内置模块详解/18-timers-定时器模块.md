# timers 定时器模块

> setTimeout、setInterval、setImmediate

---

## L1 理解层

**最简示例：**

```javascript
setTimeout(() => console.log('1 秒后'), 1000);
setInterval(() => console.log('每 2 秒'), 2000);
```

**详细示例：**

```javascript
// setTimeout — 延迟执行
const timer = setTimeout(() => console.log('执行'), 1000);
clearTimeout(timer);  // 取消

// setInterval — 重复执行
const interval = setInterval(() => console.log('tick'), 1000);
clearInterval(interval);  // 停止

// setImmediate — 当前事件循环末尾执行
setImmediate(() => console.log('immediate'));

// process.nextTick — 下一个事件循环之前执行
process.nextTick(() => console.log('nextTick'));
```

---

## L2 实践层

### 定时器对比

| 方法 | 执行时机 |
|------|---------|
| `process.nextTick` | 当前操作完成后立即执行 |
| `setImmediate` | 当前事件循环末尾 |
| `setTimeout(fn, 0)` | 下一个事件循环 |

---

## 学习资源

- [Node.js timers 文档](https://nodejs.org/api/timers.html) ⭐ 官方权威
