# events 事件模块

> 事件驱动编程的核心模块

## 什么是 events 模块？

```
┌─────────────────────────────────────────────────────────────┐
│  events = 事件发射和处理机制                                 │
│                                                             │
│  就像：                                                     │
│  - 公司的通知系统：发布消息，相关人收到通知                   │
│  - 电视台：发射信号，电视接收并显示                          │
│  - 门铃：有人按铃，屋内人听到并开门                          │
│  - 订报纸：订阅后，每次新报纸送来都会收到                   │
│                                                             │
│  核心概念：                                                  │
│  - 发射器（Emitter）：发射事件                             │
│  - 监听器（Listener）：接收事件并处理                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 4.1 EventEmitter 基础

### 创建事件发射器

```javascript
const EventEmitter = require('events');

// 创建类
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();

// 或者直接使用
const emitter = new EventEmitter();
```

### 监听事件

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// 监听事件
emitter.on('event', (data) => {
    console.log('事件触发了！', data);
});

// 触发事件
emitter.emit('event', 'Hello');
```

---

## 4.2 事件方法

### on() - 监听事件

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// 监听事件（可多次绑定）
emitter.on('click', () => console.log('监听器1'));
emitter.on('click', () => console.log('监听器2'));

// 触发
emitter.emit('click');
// 输出：
// 监听器1
// 监听器2
```

### once() - 一次性监听

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// 只触发一次
emitter.once('single', () => console.log('只会触发一次'));

emitter.emit('single');  // 输出
emitter.emit('single');  // 不输出
```

### emit() - 触发事件

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// 触发事件
emitter.emit('eventName');
emitter.emit('eventName', arg1, arg2);
emitter.emit('eventName', { data: 123 });
```

### off() / removeListener() - 移除监听

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

function handler() {
    console.log('触发');
}

emitter.on('click', handler);

// 移除指定监听器
emitter.off('click', handler);
// 或
emitter.removeListener('click', handler);

// 移除所有 click 监听器
emitter.removeAllListeners('click');

// 移除所有监听器
emitter.removeAllListeners();
```

---

## 4.3 事件名称和通配符

### 多个事件监听器

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// 多个事件
emitter.on('event1', () => console.log('event1'));
emitter.on('event2', () => console.log('event2'));
emitter.on('event3', () => console.log('event3'));

// 触发多个
emitter.emit('event1');
emitter.emit('event2');
emitter.emit('event3');

// 或者用 on() 链式调用
emitter
    .on('a', () => console.log('a'))
    .on('b', () => console.log('b'))
    .on('c', () => console.log('c'));
```

---

## 4.4 错误处理

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// 监听 error 事件
emitter.on('error', (err) => {
    console.error('发生错误:', err.message);
});

// 触发错误
emitter.emit('error', new Error('Something went wrong'));

// 如果没有监听 error，会抛出异常
// 建议始终监听 error
```

---

## 4.5 获取监听器信息

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('click', () => {});
emitter.on('click', () => {});
emitter.on('hover', () => {});

// 获取监听器数量
console.log(emitter.listenerCount('click'));  // 2

// 获取所有事件
console.log(emitter.eventNames());
// ['click', 'hover']

// 获取监听器数组
console.log(emitter.listeners('click'));
// [ [Function], [Function] ]
```

---

## 4.6 继承 EventEmitter

### 创建自定义类

```javascript
const EventEmitter = require('events');

class Dog extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
    }

    bark() {
        console.log(`${this.name} 叫了一声`);
        this.emit('bark');
    }

    eat(food) {
        console.log(`${this.name} 吃了 ${food}`);
        this.emit('eat', food);
    }
}

const dog = new Dog('旺财');

// 监听事件
dog.on('bark', () => console.log('主人：别叫了'));
dog.on('eat', (food) => console.log(`主人：${food} 好吃吗？`));

// 触发
dog.bark();  // 旺财叫了一声 / 主人：别叫了
dog.eat('骨头');  // 旺财吃了骨头 / 主人：骨头好吃吗？
```

### 完整示例：事件总线

```javascript
const EventEmitter = require('events');

class EventBus extends EventEmitter {
    constructor() {
        super();
    }
}

const eventBus = new EventBus();

// 用户模块
class UserService {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    createUser(name) {
        const user = { id: Date.now(), name };
        this.eventBus.emit('user:created', user);
        return user;
    }

    deleteUser(id) {
        this.eventBus.emit('user:deleted', id);
    }
}

// 通知模块
class NotificationService {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.init();
    }

    init() {
        this.eventBus.on('user:created', (user) => {
            console.log(`📧 发送欢迎邮件给 ${user.name}`);
        });

        this.eventBus.on('user:deleted', (id) => {
            console.log(`📧 通知管理员：用户 ${id} 已删除`);
        });
    }
}

// 日志模块
class LoggerService {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.init();
    }

    init() {
        this.eventBus.on('user:created', (user) => {
            console.log(`📝 记录日志：创建用户 ${user.name}`);
        });

        this.eventBus.on('user:deleted', (id) => {
            console.log(`📝 记录日志：删除用户 ${id}`);
        });
    }
}

// 使用
const userService = new UserService(eventBus);
new NotificationService(eventBus);
new LoggerService(eventBus);

console.log('--- 创建用户 ---');
userService.createUser('张三');

console.log('\n--- 删除用户 ---');
userService.deleteUser(123);
```

---

## 4.7 常见问答

### Q1: on 和 once 区别？

```javascript
// on：持续监听，每次触发都执行
emitter.on('event', fn);
emitter.emit('event');  // 执行
emitter.emit('event');  // 执行

// once：只执行一次
emitter.once('event', fn);
emitter.emit('event');  // 执行
emitter.emit('event');  // 不执行
```

### Q2: 如何传递多个参数？

```javascript
emitter.on('event', (a, b, c) => {
    console.log(a, b, c);
});

emitter.emit('event', 1, 2, 3);  // 1 2 3
```

---

## 4.8 学习资源

- [Node.js events 官方文档](https://nodejs.org/api/events.html)

---

**上一章：** [← path 路径模块](./03-path-路径模块.md)  
**下一章：** [→ stream 流模块](./05-stream-流模块.md)