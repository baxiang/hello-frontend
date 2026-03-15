# util 工具模块

> 常用的工具函数

## 什么是 util 模块？

```
┌─────────────────────────────────────────────────────────────┐
│  util = 工具函数集合                                         │
│                                                             │
│  就像：                                                     │
│  - 瑞士军刀：各种小工具                                      │
│  - 百宝箱：需要什么就拿什么                                  │
│  - 工具箱：常用的工具都在这里                                │
│                                                             │
│  主要功能：                                                 │
│  - 格式化字符串                                             │
│  - 类型检查                                                  │
│  - 继承实现                                                  │
│  - Promise 化                                                 │
│  - 对象检查                                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 8.1 格式化字符串

### util.format()

```javascript
const util = require('util');

// 格式化字符串
util.format('Hello %s', 'World');  // Hello World
util.format('数字: %d', 123);      // 数字: 123
util.format('JSON: %j', { a: 1 }); // JSON: {"a":1}

// 多个参数
util.format('Hello', 'World');    // Hello World
util.format('%s %s', 'Hello');     // Hello %s (只识别第一个占位符)

// 占位符
// %s - 字符串
// %d - 数字
// %j - JSON
// %% - 转义 %
```

---

## 8.2 类型检查

### util.types

```javascript
const util = require('util');
const buf = Buffer.from('hello');

console.log(util.types.isArray([1, 2, 3]));      // true
console.log(util.types.isArrayBuffer(buf));     // true
console.log(util.types.isDate(new Date()));     // true
console.log(util.types.isMap(new Map()));        // true
console.log(util.types.isSet(new Set()));        // true
console.log(util.types.isPromise(Promise.resolve())); // true
console.log(util.types.isRegExp(/abc/));         // true
```

---

## 8.3 Promise 化

### util.promisify()

```javascript
const util = require('util');
const fs = require('fs');

// 将回调函数转为 Promise
const readFile = util.promisify(fs.readFile);

readFile('file.txt', 'utf-8')
    .then(content => console.log(content))
    .catch(err => console.error(err));

// 或者用 async/await
async function main() {
    const content = await readFile('file.txt', 'utf-8');
    console.log(content);
}
```

### util.promisify.all()

```javascript
const util = require('util');
const fs = require('fs');

// promisify.all 批量处理
const readFilePromise = util.promisify(fs.readFile);

// 读取多个文件
const [file1, file2, file3] = await Promise.all([
    readFilePromise('file1.txt', 'utf-8'),
    readFilePromise('file2.txt', 'utf-8'),
    readFilePromise('file3.txt', 'utf-8')
]);
```

---

## 8.4 继承实现

### util.inherits()

```javascript
const util = require('util');

function Parent() {
    this.name = 'parent';
}

Parent.prototype.say = function() {
    return 'Hello from ' + this.name;
};

function Child() {
    Parent.call(this);
    this.name = 'child';
}

// 实现继承
util.inherits(Child, Parent);

const child = new Child();
console.log(child.say());  // Hello from child
console.log(child instanceof Parent);  // false
```

### class 方式（推荐）

```javascript
// 现代方式使用 class
class Parent {
    constructor() {
        this.name = 'parent';
    }

    say() {
        return 'Hello from ' + this.name;
    }
}

class Child extends Parent {
    constructor() {
        super();
        this.name = 'child';
    }
}

const child = new Child();
console.log(child.say());  // Hello from child
```

---

## 8.5 对象检查

### util.inspect()

```javascript
const util = require('util');

const obj = { name: '张三', age: 25 };

// 查看对象
console.log(util.inspect(obj));
// { name: '张三', age: 25 }

// 自定义选项
console.log(util.inspect(obj, { colors: true, depth: 2 }));

// 查看函数
const fn = function() {};
console.log(util.inspect(fn));
```

### util.isDeepStrictEqual()

```javascript
const util = require('util');

console.log(util.isDeepStrictEqual({ a: 1 }, { a: 1 }));  // true
console.log(util.isDeepStrictEqual({ a: 1 }, { a: '1' }));  // false
console.log(util.isDeepStrictEqual(NaN, NaN));  // true
```

---

## 8.6 调试

### 自定义 inspect

```javascript
const util = require('util');

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    [util.inspect.custom]() {
        return `Person(${this.name}, ${this.age})`;
    }
}

const p = new Person('张三', 25);
console.log(p);
// Person(张三, 25)
```

---

## 8.7 常见问答

### Q1: 什么时候用 util？

```javascript
// 格式化
util.format('Hello %s', name);

// Promise 化
const fn = util.promisify(oldFn);

// 类型检查
util.types.isArray(x);
```

### Q2: 还有哪些常用工具？

```javascript
// 现在很多功能被其他模块替代：
// - Promise 化 → fs.promises
// - 继承 → class extends
// - 格式化 → console.log + 模板字符串
```

---

## 8.8 学习资源

- [Node.js util 官方文档](https://nodejs.org/api/util.html)

---

**上一章：** [← crypto 加密模块](./07-crypto-加密模块.md)  
**下一章：** [→ os 系统模块](./09-os-系统模块.md)