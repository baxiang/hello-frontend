# Proxy 与 Reflect ⭐⭐

> JavaScript 元编程：拦截和定制对象行为

---

## 学习目标

- 理解 Proxy 的工作原理和常用拦截器
- 掌握 Reflect API 与 Proxy 的配合使用
- 学会用 Proxy 实现数据验证、响应式系统等

---

## 生活化比喻

**Proxy 就像"智能门卫"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  智能门卫                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    原始对象 = 大楼里的住户                            │
│    ─────────────                                     │
│    住户自己住在那，不知道外面发生了什么               │
│                                                      │
│    Proxy = 门卫                                      │
│    ─────────────                                     │
│    所有进出都要经过门卫                               │
│    门卫可以：                                        │
│    - 记录谁来了（日志）                              │
│    - 检查身份证（验证）                              │
│    - 拒绝某些人进入（拦截）                          │
│    - 转发请求给住户（Reflect）                      │
│                                                      │
│    handler = 门卫的工作手册                          │
│    ─────────────                                     │
│    get → 有人要拿东西时的处理规则                    │
│    set → 有人要放东西时的处理规则                    │
│    has → 有人问"有没有这个东西"时的处理规则          │
│                                                      │
│    Reflect = 标准转接流程                            │
│    ─────────────                                     │
│    门卫不想处理时，按标准流程转给住户                │
│    Reflect.get(target, prop) = 直接拿住户的东西      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### Proxy 基础

**语法结构图：**

```
Proxy 结构：

const proxy = new Proxy(target, handler);
                            │        │
                            │        └─ 拦截规则对象
                            └─ 原始对象

常用拦截器：
handler.get(target, prop, receiver)     → 读取属性
handler.set(target, prop, value, receiver) → 设置属性
handler.has(target, prop)               → in 操作符
handler.deleteProperty(target, prop)    → delete 操作
handler.apply(target, thisArg, args)    → 函数调用
handler.construct(target, args, newTarget) → new 调用
```

**最简示例（1-3行）：**

```javascript
const proxy = new Proxy({ name: '张三' }, {
    get: (target, prop) => `访问了 ${prop}`
});
proxy.name;  // '访问了 name'
```

**详细示例：**

```javascript
const user = { name: '张三', age: 25 };

const proxy = new Proxy(user, {
    get(target, prop) {
        console.log(`读取: ${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        console.log(`设置: ${prop} = ${value}`);
        target[prop] = value;
        return true;
    }
});

proxy.name;          // 读取: name → '张三'
proxy.age = 30;      // 设置: age = 30
```

---

### Reflect

**最简示例：**

```javascript
const obj = { name: '张三' };
Reflect.get(obj, 'name');     // '张三'
Reflect.set(obj, 'age', 25);  // true
```

**详细示例 — Proxy + Reflect 组合：**

```javascript
const user = { name: '张三', age: 25 };

const proxy = new Proxy(user, {
    get(target, prop) {
        console.log(`读取 ${prop}`);
        return Reflect.get(target, prop);  // 默认行为
    },
    set(target, prop, value) {
        if (prop === 'age' && (value < 0 || value > 150)) {
            throw new Error('年龄必须在 0-150 之间');
        }
        return Reflect.set(target, prop, value);
    }
});

proxy.name;        // 读取 name → '张三'
proxy.age = 30;    // ✅
// proxy.age = -1; // ❌ Error
```

---

## L2 实践层：用好

### 常用拦截器速查

| 拦截器 | 触发时机 | 对应操作 |
|--------|---------|---------|
| `get` | 读取属性 | `obj.prop` |
| `set` | 设置属性 | `obj.prop = value` |
| `has` | 检查属性 | `'prop' in obj` |
| `deleteProperty` | 删除属性 | `delete obj.prop` |
| `ownKeys` | 获取属性列表 | `Object.keys(obj)` |
| `apply` | 函数调用 | `fn()` |
| `construct` | new 调用 | `new Fn()` |

### 实际应用

**数据验证：**

```javascript
function createValidator(schema) {
    return new Proxy({}, {
        set(target, prop, value) {
            if (schema[prop] && !schema[prop](value)) {
                throw new Error(`${prop} 验证失败`);
            }
            target[prop] = value;
            return true;
        }
    });
}

const user = createValidator({
    age: v => v >= 0 && v <= 150,
    email: v => v.includes('@')
});
user.age = 25;       // ✅
// user.age = -1;    // ❌ Error
```

**响应式系统（Vue 3 简化版）：**

```javascript
function reactive(obj, onChange) {
    return new Proxy(obj, {
        get(target, prop) {
            const value = target[prop];
            return typeof value === 'object' && value !== null
                ? reactive(value, onChange)
                : value;
        },
        set(target, prop, value) {
            const old = target[prop];
            target[prop] = value;
            if (old !== value) onChange(prop, value, old);
            return true;
        }
    });
}

const state = reactive({ count: 0 }, (prop, val) => {
    console.log(`${prop} 从 ${state[prop]} 变为 ${val}`);
});
state.count = 1;  // count 从 0 变为 1
```

### 反模式：不要这样做

```javascript
// ❌ 错误：set 拦截器不返回 true
const proxy = new Proxy({}, {
    set(target, prop, value) {
        target[prop] = value;
        // 忘记 return true → 严格模式下报错
    }
});

// ✅ 正确：总是返回 true
const proxy = new Proxy({}, {
    set(target, prop, value) {
        target[prop] = value;
        return true;
    }
});
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 数据验证 | Proxy set 拦截 | 写入时自动验证 |
| 响应式系统 | Proxy get/set | Vue 3 的核心机制 |
| 属性访问日志 | Proxy get | 调试和监控 |
| 默认值 | Proxy get | 访问不存在属性时返回默认值 |
| API 客户端 | Proxy get | 动态方法调用 |

---

## L3 专家层：深入

### Proxy vs Object.defineProperty

| 特性 | Proxy | Object.defineProperty |
|------|-------|----------------------|
| 监听范围 | 整个对象 | 单个属性 |
| 新增属性 | 自动监听 | 需要重新 define |
| 删除属性 | 可以拦截 | 无法拦截 |
| 数组索引 | 可以监听 | 需要单独处理 |
| 性能 | 稍慢 | 更快 |
| 兼容 | ES6+ | ES5+ |

### Reflect 方法列表

```javascript
Reflect.get(target, prop, receiver)
Reflect.set(target, prop, value, receiver)
Reflect.has(target, prop)
Reflect.deleteProperty(target, prop)
Reflect.apply(target, thisArg, args)
Reflect.construct(target, args, newTarget)
Reflect.getOwnPropertyDescriptor(target, prop)
Reflect.defineProperty(target, prop, desc)
Reflect.getPrototypeOf(target)
Reflect.setPrototypeOf(target, proto)
Reflect.isExtensible(target)
Reflect.preventExtensions(target)
Reflect.ownKeys(target)
```

### 知识关联

```
元编程关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Proxy      │────→│  handler    │────→│  Reflect    │
│  代理对象   │     │  拦截规则   │     │  默认行为   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
              ┌────────────┼────────────┐
              ↓            ↓            ↓
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ 数据验证 │ │ 响应式   │ │ 日志/    │
        │ 类型检查 │ │ 自动更新 │ │ 监控     │
        └──────────┘ └──────────┘ └──────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **Proxy** | 代理对象，拦截对目标对象的操作 | `new Proxy(target, handler)` |
| **handler** | 拦截器对象，定义各种操作的拦截逻辑 | `{ get() {}, set() {} }` |
| **Reflect** | 提供对象操作的默认实现 | `Reflect.get(obj, 'key')` |
| **拦截器（Trap）** | handler 中拦截特定操作的方法 | `get`, `set`, `has` 等 |
| **元编程** | 编写操作程序本身的程序 | Proxy 是元编程工具 |

---

## 实践练习

### 练习：只读代理 + 负索引数组

```javascript
// 练习 1：只读代理
function readonly(obj) {
    return new Proxy(obj, {
        set() { throw new Error('对象是只读的'); },
        deleteProperty() { throw new Error('对象是只读的'); }
    });
}

const config = readonly({ theme: 'dark', lang: 'zh' });
// config.theme = 'light';  // ❌ Error

// 练习 2：负索引数组
function createArray(...items) {
    return new Proxy(items, {
        get(target, prop) {
            const index = Number(prop);
            if (index < 0) return target[target.length + index];
            return target[prop];
        }
    });
}

const arr = createArray('a', 'b', 'c');
arr[-1];  // 'c'
arr[-2];  // 'b'

// 练习 3：API 客户端
function createAPI(baseURL) {
    return new Proxy({}, {
        get(_, method) {
            return async (path, options = {}) => {
                const res = await fetch(`${baseURL}/${method}${path}`, options);
                return res.json();
            };
        }
    });
}

const api = createAPI('/api');
// await api.get('/users');      → GET /api/get/users
// await api.post('/users', {});  → POST /api/post/users
```

---

## 常见问题

### Q1：Proxy 和 Object.defineProperty 有什么区别？

**Proxy 拦截整个对象，Object.defineProperty 只拦截单个属性：**

```javascript
// Proxy：自动监听所有属性（包括新增）
const proxy = new Proxy({}, { get() {}, set() {} });
proxy.newProp = 1;  // 自动被 set 拦截

// defineProperty：需要预先定义
const obj = {};
Object.defineProperty(obj, 'name', { get() {}, set() {} });
obj.newProp = 1;    // 不会被拦截
```

### Q2：为什么 handler.set 必须返回 true？

**ECMAScript 规范要求：set 拦截器返回 false 时，严格模式下会抛出 TypeError：**

```javascript
new Proxy({}, {
    set() { return false; }  // ❌ 严格模式报错
});
```

### Q3：Proxy 能代理所有类型吗？

**只能代理对象类型（包括数组、函数、Map、Set 等），不能代理基本类型：**

```javascript
new Proxy({} , {});     // ✅
new Proxy([], {});      // ✅
new Proxy(() => {}, {}); // ✅
new Proxy(42, {});      // ❌ TypeError
```

---

## 学习资源

- [MDN - Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) ⭐ 官方权威
- [MDN - Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [JavaScript.info - Proxy](https://zh.javascript.info/proxy)
