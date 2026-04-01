# Proxy 与 Reflect

> 掌握 JavaScript 元编程的核心工具

## 学习目标

- ✅ 理解 Proxy 的基本概念和工作原理
- ✅ 掌握常用拦截器的用法
- ✅ 理解 Reflect API 的作用
- ✅ 掌握 Proxy 与 Reflect 的配合使用
- ✅ 能够使用 Proxy 实现数据验证、响应式等应用

---

## 11.0 为什么要学 Proxy？

### 11.0.1 故事背景

在 ES6 之前，无法拦截对象的操作：

```javascript
const obj = { name: '张三' };

// 无法拦截这些操作
obj.name;           // 读取
obj.name = '李四';   // 设置
delete obj.name;    // 删除
'name' in obj;      // 检查
```

ES6 引入了 Proxy，可以拦截这些操作。

### 11.0.2 本章学习路径

```
第一步：Proxy 基础（什么是 Proxy）
    ↓
第二步：handler 拦截器（各种拦截方法）
    ↓
第三步：Reflect（配合 Proxy 使用）
    ↓
第四步：实际应用（验证、响应式等）
```

---

## 11.1 Proxy 基础详解

### 11.1.1 什么是 Proxy？

```
┌─────────────────────────────────────────────────────────────┐
│  Proxy = 代理 = 拦截对象操作的"中间人"                      │
│                                                             │
│  组成部分：                                                  │
│  - target：原始对象                                         │
│  - handler：拦截规则                                        │
│  - proxy：代理后的对象                                       │
│                                                             │
│  就像：                                                     │
│  - 房东（target）                                          │
│  - 中介规则（handler）                                      │
│  - 租房找中介（proxy）                                      │
└─────────────────────────────────────────────────────────────┘
```

### 11.1.2 基本语法

```javascript
const target = { name: '张三' };

const handler = {
    // 读取属性时触发
    get(target, prop) {
        return target[prop];
    },
    
    // 设置属性时触发
    set(target, prop, value) {
        target[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name);   // '张三'（触发 get）
proxy.name = '李四';       // 触发 set
console.log(proxy.name);   // '李四'
```

---

## 11.2 拦截器详解

### 11.2.1 get - 读取属性

```javascript
const user = {
    name: '张三',
    age: 25
};

const proxy = new Proxy(user, {
    get(target, prop) {
        console.log(`读取 ${prop}`);
        return target[prop];
    }
});

console.log(proxy.name);  // 读取 name -> '张三'
console.log(proxy.age);   // 读取 age -> 25
```

### 11.2.2 set - 设置属性

```javascript
const user = {};

const proxy = new Proxy(user, {
    set(target, prop, value) {
        console.log(`设置 ${prop} = ${value}`);
        target[prop] = value;
        return true;
    }
});

proxy.name = '张三';  // 设置 name = 张三
proxy.age = 25;      // 设置 age = 25
```

### 11.2.3 has - in 操作符

```javascript
const user = { name: '张三' };

const proxy = new Proxy(user, {
    has(target, prop) {
        console.log(`检查 ${prop}`);
        return prop in target;
    }
});

console.log('name' in proxy);  // 检查 name -> true
console.log('age' in proxy);   // 检查 age -> false
```

### 11.2.4 deleteProperty - delete 操作

```javascript
const user = { name: '张三' };

const proxy = new Proxy(user, {
    deleteProperty(target, prop) {
        console.log(`删除 ${prop}`);
        delete target[prop];
        return true;
    }
});

delete proxy.name;  // 删除 name
```

---

## 11.3 Reflect 详解

### 11.3.1 什么是 Reflect？

```
┌─────────────────────────────────────────────────────────────┐
│  Reflect = 反射 = 操作对象的"工具函数"                     │
│                                                             │
│  作用：                                                     │
│  - 提供拦截对象操作的默认实现                               │
│  - 作为 Proxy 拦截器的"后备"                                │
│  - 让代码更简洁                                             │
│                                                             │
│  常用方法：                                                  │
│  - Reflect.get()                                            │
│  - Reflect.set()                                            │
│  - Reflect.has()                                             │
│  - Reflect.deleteProperty()                                  │
└─────────────────────────────────────────────────────────────┘
```

### 11.3.2 使用 Reflect

```javascript
const user = { name: '张三' };

// 不使用 Reflect
const proxy1 = new Proxy(user, {
    get(target, prop) {
        return target[prop];  // 手动访问
    }
});

// 使用 Reflect
const proxy2 = new Proxy(user, {
    get(target, prop) {
        return Reflect.get(target, prop);  // 更简洁
    }
});
```

### 11.3.3 Proxy + Reflect 组合

```javascript
const user = { name: '张三', age: 25 };

const proxy = new Proxy(user, {
    get(target, prop) {
        // 记录访问日志
        console.log(`访问 ${prop}`);
        // 使用 Reflect 返回默认值
        return Reflect.get(target, prop, { name: '默认' });
    },
    
    set(target, prop, value) {
        // 验证
        if (prop === 'age' && value < 0) {
            throw new Error('年龄不能为负');
        }
        return Reflect.set(target, prop, value);
    }
});
```

---

## 11.4 实际应用场景

### 11.4.1 数据验证

```javascript
function createValidator(schema) {
    return new Proxy({}, {
        set(target, prop, value) {
            const validator = schema[prop];
            if (validator && !validator(value)) {
                throw new Error(`属性 ${prop} 验证失败`);
            }
            target[prop] = value;
            return true;
        }
    });
}

const validator = createValidator({
    age: v => v >= 0 && v <= 150,
    email: v => v.includes('@')
});

validator.age = 25;    // OK
validator.email = 'test@example.com';  // OK
// validator.age = -1;  // 抛出错误
```

### 11.4.2 响应式系统

```javascript
function createReactive(obj, onChange) {
    const handler = {
        get(target, prop) {
            return target[prop];
        },
        set(target, prop, value) {
            target[prop] = value;
            onChange(prop, value);
            return true;
        }
    };
    
    return new Proxy(obj, handler);
}

const state = createReactive({ count: 0 }, (prop, value) => {
    console.log(`${prop} 变为 ${value}`);
});

state.count = 1;  // count 变为 1
state.count = 2;  // count 变为 2
```

---

## 11.5 常见问答

### Q1: Proxy 和 Object.defineProperty 有什么区别？

```javascript
// Object.defineProperty：只能监听单个属性
const obj = {};
Object.defineProperty(obj, 'name', {
    get() { return '张三'; }
});

// Proxy：可以监听整个对象的所有操作
const proxy = new Proxy({}, {
    get() { return '张三'; }
});
```

### Q2: Proxy 有什么实际用途？

```javascript
// 1. 数据验证
// 2. 响应式系统（Vue 3 使用 Proxy）
// 3. API 代理
// 4. 私有属性
// 5. 日志记录
```

---

## 11.6 学习资源

### 官方文档

- [MDN - Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN - Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

### 推荐教程

- [JavaScript.info - Proxy](https://zh.javascript.info/proxy)

---

**上一章：** [← 10-生成器与迭代器](./10-生成器与迭代器.md)  
**下一章：** [→ 12-模块化系统](./12-模块化系统.md)