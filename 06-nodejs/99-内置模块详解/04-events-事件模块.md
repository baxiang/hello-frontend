# events 事件模块

> 事件驱动编程的基础

---

## L1 理解层

**最简示例（1-3行）：**

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('data', msg => console.log(msg));
emitter.emit('data', 'Hello');  // 'Hello'
```

**详细示例：**

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

// 监听
emitter.on('user:login', (user) => console.log(`${user} 登录`));

// 触发
emitter.emit('user:login', '张三');

// 一次性
emitter.once('init', () => console.log('只执行一次'));

// 移除监听
const handler = () => console.log('触发');
emitter.on('event', handler);
emitter.removeListener('event', handler);

// 错误事件（必须监听，否则抛出异常）
emitter.on('error', (err) => console.error('错误:', err));
```

---

## L2 实践层

### 常用 API

| 方法 | 用途 |
|------|------|
| `on(event, fn)` | 监听事件 |
| `once(event, fn)` | 只触发一次 |
| `emit(event, ...args)` | 触发事件 |
| `removeListener(event, fn)` | 移除监听 |
| `listenerCount(event)` | 监听器数量 |

---

## 学习资源

- [Node.js events 文档](https://nodejs.org/api/events.html) ⭐ 官方权威
