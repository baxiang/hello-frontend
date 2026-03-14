# Proxy 与 Reflect

> 掌握 JavaScript 元编程的核心工具

---

## 学习目标

- 理解 Proxy 的基本概念和工作原理
- 掌握常用拦截器的用法
- 理解 Reflect API 的作用
- 掌握 Proxy 与 Reflect 的配合使用
- 能够使用 Proxy 实现数据验证、响应式等应用

---

## 11.0 通俗理解

### Proxy 是什么？

```
Proxy = "代理" = 拦截对象操作

就像：
- 门卫：有人进出都要经过
- Proxy：对象的所有操作都经过它
```

### 通俗比喻

```
原始对象：真实的人
Proxy：代理人/中介

你要租房：
- 直接找房东（原始对象）
- 通过中介（Proxy）

中介可以：
- 房东不在时帮你（get）
- 审核你的条件（set）
- 记录谁来过（delete）
```

### Reflect 是什么？

```
Reflect = "反射" = 操作对象的工具

就像：
- Proxy 负责拦截
- Reflect 负责执行
```

---

## 11.1 Proxy 基础概念

### 什么是 Proxy

```javascript
// Proxy 用于创建一个对象的代理，拦截并自定义基本操作
const target = {
    name: '张三',
    age: 25
};

const handler = {
    get(target, prop) {
        console.log(`读取属性：${prop}`);
        return target[prop];
    },
    set(target, prop, value) {
        console.log(`设置属性：${prop} = ${value}`);
        target[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

// 触发 get 拦截
console.log(proxy.name);  // 读取属性：name -> '张三'

// 触发 set 拦截
proxy.age = 26;  // 设置属性：age = 26
```

### Proxy 的特点

```javascript
// 1. Proxy 拦截的是操作，不是值
const target = { count: 0 };
const proxy = new Proxy(target, {
    get(t, p) {
        console.log('访问', p);
        return t[p];
    }
});

proxy.count;  // 访问 count
proxy.count;  // 访问 count（每次都触发拦截）

// 2. Proxy 不会修改原对象
console.log(target.count);  // 0（原对象不变）

// 3. 对 proxy 的操作会传递到 target
proxy.count = 1;
console.log(target.count);  // 1

// 4. Proxy 是"透传"的，默认行为是转发操作
const emptyProxy = new Proxy(target, {});
emptyProxy.name = '李四';
console.log(target.name);  // '李四'
```

### 撤销 Proxy

```javascript
const target = { name: '张三' };
const handler = {
    get(t, p) { return t[p]; }
};

const { proxy, revoke } = Proxy.revocable(target, handler);

console.log(proxy.name);  // '张三'

// 撤销后不能再使用
revoke();
// console.log(proxy.name);  // TypeError: Cannot perform 'get' on a proxy that has been revoked
```

---

## 11.2 常用拦截器

### get 拦截器

```javascript
// 1. 读取不存在属性时返回默认值
const user = new Proxy({}, {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        }
        return '默认值';
    }
});

user.name = '张三';
console.log(user.name);    // '张三'
console.log(user.age);     // '默认值'
console.log(user.unknown); // '默认值'

// 2. 属性访问日志
const loggingProxy = new Proxy({ count: 0 }, {
    get(target, prop) {
        console.log(`[LOG] 读取属性 "${prop}"`);
        return target[prop];
    }
});

loggingProxy.count;  // [LOG] 读取属性 "count"

// 3. 链式调用支持
const chainProxy = new Proxy({}, {
    get(target, prop) {
        if (prop === 'execute') {
            return () => console.log('执行:', target._actions || []);
        }
        target._actions = target._actions || [];
        target._actions.push(prop);
        return chainProxy;
    }
});

chainProxy.login('user').buy('item').quit().execute();
// 执行：['login', 'buy', 'quit']
```

### set 拦截器

```javascript
// 1. 数据验证
const validator = new Proxy({}, {
    set(target, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('年龄必须是整数');
            }
            if (value < 0 || value > 150) {
                throw new RangeError('年龄必须在 0-150 之间');
            }
        }
        if (prop === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                throw new TypeError('无效的邮箱格式');
            }
        }
        target[prop] = value;
        return true;
    }
});

validator.age = 25;  // OK
// validator.age = -1;  // RangeError
// validator.email = 'invalid';  // TypeError

// 2. 防止修改只读属性
const readOnly = new Proxy({ name: '常量' }, {
    set(target, prop, value) {
        console.log(`无法修改属性 "${prop}"`);
        return false;  // 返回 false 表示设置失败
    }
});

readOnly.name = '新值';  // 无法修改属性 "name"
console.log(readOnly.name);  // '常量'
```

### has 拦截器

```javascript
// 拦截 in 操作符
const hidden = new Proxy({ public: 1, _private: 2 }, {
    has(target, prop) {
        // 隐藏以_开头的属性
        if (prop.startsWith('_')) {
            return false;
        }
        return prop in target;
    }
});

console.log('public' in hidden);    // true
console.log('_private' in hidden);  // false

// 应用：隐藏特定属性
console.log(Object.keys(hidden));   // ['public']
```

### deleteProperty 拦截器

```javascript
// 拦截 delete 操作
const protectedObj = new Proxy({ name: '受保护', temp: '临时' }, {
    deleteProperty(target, prop) {
        if (prop === 'name') {
            console.log('不能删除 name 属性');
            return false;
        }
        delete target[prop];
        return true;
    }
});

delete protectedObj.temp;  // OK
// delete protectedObj.name;  // 不能删除 name 属性

console.log(protectedObj);  // { temp: undefined }
```

### apply 拦截器

```javascript
// 拦截函数调用
function sum(a, b) {
    return a + b;
}

const loggedSum = new Proxy(sum, {
    apply(target, thisArg, args) {
        console.log(`调用函数：${args.join(' + ')}`);
        const result = target.apply(thisArg, args);
        console.log(`结果：${result}`);
        return result;
    }
});

console.log(loggedSum(2, 3));
// 调用函数：2 + 3
// 结果：5
// 5

// 应用：函数参数验证
const validatedFn = new Proxy(
    (a, b) => a + b,
    {
        apply(target, thisArg, args) {
            if (!args.every(arg => typeof arg === 'number')) {
                throw new TypeError('参数必须是数字');
            }
            return target.apply(thisArg, args);
        }
    }
);

console.log(validatedFn(1, 2));  // 3
// validatedFn(1, '2');  // TypeError
```

### construct 拦截器

```javascript
// 拦截 new 操作
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const PersonProxy = new Proxy(Person, {
    construct(target, args) {
        console.log(`创建 ${target.name} 实例`);
        console.log(`参数：${args.join(', ')}`);
        return new target(...args);
    }
});

const p = new PersonProxy('张三', 25);
// 创建 Person 实例
// 参数：张三，25
```

---

## 11.3 Reflect 基础

### 什么是 Reflect

```javascript
// Reflect 是一个内置对象，提供拦截 JavaScript 操作的方法
// Reflect 的方法与 Proxy 拦截器一一对应

// 基本用法
const obj = { foo: 'bar' };

// 传统方式
console.log(obj.foo);  // 'bar'

// Reflect 方式
console.log(Reflect.get(obj, 'foo'));  // 'bar'

// Reflect.set 返回布尔值表示是否成功
const result = Reflect.set(obj, 'baz', 'qux');
console.log(result);  // true
console.log(obj.baz);  // 'qux'
```

### Reflect 的主要方法

```javascript
const obj = { name: '张三', age: 25 };

// Reflect.get
console.log(Reflect.get(obj, 'name'));  // '张三'
console.log(Reflect.get(obj, 'name', { name: '李四' }));  // '李四'（指定 receiver）

// Reflect.set
Reflect.set(obj, 'age', 26);
console.log(obj.age);  // 26

// Reflect.has
console.log(Reflect.has(obj, 'name'));  // true
console.log(Reflect.has(obj, 'unknown'));  // false

// Reflect.deleteProperty
Reflect.deleteProperty(obj, 'age');
console.log(obj.age);  // undefined

// Reflect.getOwnPropertyDescriptor
const desc = Reflect.getOwnPropertyDescriptor(obj, 'name');
console.log(desc);  // { value: '张三', writable: true, enumerable: true, configurable: true }

// Reflect.defineProperty
Reflect.defineProperty(obj, 'readOnly', {
    value: '只读',
    writable: false,
    enumerable: false
});

// Reflect.ownKeys
console.log(Reflect.ownKeys(obj));  // ['name']

// Reflect.getPrototypeOf
console.log(Reflect.getPrototypeOf(obj));  // Object.prototype

// Reflect.setPrototypeOf
Reflect.setPrototypeOf(obj, null);
console.log(Reflect.getPrototypeOf(obj));  // null
```

---

## 11.4 Proxy 与 Reflect 配合使用

### 默认行为转发

```javascript
// 使用 Reflect 转发默认行为
const handler = {
    get(target, prop, receiver) {
        console.log(`读取：${prop}`);
        // 使用 Reflect.get 转发默认行为
        return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value, receiver) {
        console.log(`设置：${prop} = ${value}`);
        // 使用 Reflect.set 转发默认行为
        return Reflect.set(target, prop, value, receiver);
    }
};

const proxy = new Proxy({ name: '张三' }, handler);
console.log(proxy.name);  // 读取：name -> '张三'
proxy.age = 25;           // 设置：age = 25
```

### 为什么使用 Reflect

```javascript
// 问题：直接操作 target 的问题
const target = {
    _name: '张三',
    get name() {
        return this._name;
    }
};

const handler1 = {
    get(target, prop) {
        console.log('拦截读取');
        return target[prop];  // 问题：this 指向错误
    }
};

const handler2 = {
    get(target, prop, receiver) {
        console.log('拦截读取');
        return Reflect.get(target, prop, receiver);  // 正确：传递 receiver
    }
};

const proxy1 = new Proxy(target, handler1);
const proxy2 = new Proxy(target, handler2);

console.log(proxy1.name);  // undefined（this 指向 target 而非 proxy1）
console.log(proxy2.name);  // '张三'（正确）
```

---

## 11.5 Proxy 应用：数据验证

### 类型检查

```javascript
// 创建类型检查的 Proxy
function createTypedObject(typeSchema) {
    return new Proxy({}, {
        set(target, prop, value) {
            const expectedType = typeSchema[prop];

            if (expectedType) {
                const actualType = typeof value;

                if (actualType !== expectedType) {
                    throw new TypeError(
                        `属性 "${prop}" 期望 ${expectedType} 类型，但得到 ${actualType}`
                    );
                }
            }

            target[prop] = value;
            return true;
        }
    });
}

// 使用
const user = createTypedObject({
    name: 'string',
    age: 'number',
    isAdmin: 'boolean'
});

user.name = '张三';     // OK
user.age = 25;          // OK
user.isAdmin = true;    // OK
// user.age = '25';     // TypeError
```

### 范围验证

```javascript
function createValidatedObject(validators) {
    return new Proxy({}, {
        set(target, prop, value) {
            const validator = validators[prop];

            if (validator) {
                const errors = validator(value);
                if (errors) {
                    throw new Error(`${prop}: ${errors}`);
                }
            }

            target[prop] = value;
            return true;
        }
    });
}

// 使用
const config = createValidatedObject({
    port: (value) => {
        if (!Number.isInteger(value) || value < 1 || value > 65535) {
            return '端口必须在 1-65535 之间';
        }
    },
    host: (value) => {
        if (typeof value !== 'string' || value.length === 0) {
            return '主机名不能为空';
        }
    }
});

config.port = 8080;   // OK
config.host = 'localhost';  // OK
// config.port = 99999;  // Error
```

---

## 11.6 Proxy 应用：响应式原理（Vue 3 案例）

### 简易响应式系统

```javascript
// 依赖收集
let activeEffect = null;

function effect(fn) {
    activeEffect = fn;
    fn();  // 执行时会触发 get，进行依赖收集
    activeEffect = null;
}

// 依赖存储
const targetMap = new WeakMap();

function track(target, prop) {
    if (!activeEffect) return;

    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }

    let deps = depsMap.get(prop);
    if (!deps) {
        deps = new Set();
        depsMap.set(prop, deps);
    }

    deps.add(activeEffect);
}

function trigger(target, prop) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;

    const deps = depsMap.get(prop);
    if (!deps) return;

    deps.forEach(fn => fn());
}

// 创建响应式对象
function reactive(obj) {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            track(target, prop);  // 依赖收集
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            const result = Reflect.set(target, prop, value, receiver);
            trigger(target, prop);  // 触发更新
            return result;
        }
    });
}

// 使用示例
const state = reactive({ count: 0 });

effect(() => {
    console.log(`count: ${state.count}`);
});

state.count = 1;  // 自动触发 effect 重新执行
state.count = 2;  // 自动触发 effect 重新执行
```

---

## 11.7 Proxy 应用：API 代理

### 自动错误处理

```javascript
// API 请求代理
function createApiProxy(baseUrl) {
    return new Proxy({}, {
        get(target, prop) {
            return async (...args) => {
                try {
                    const response = await fetch(`${baseUrl}/${prop}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(args[0])
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }

                    return await response.json();
                } catch (error) {
                    console.error(`API 调用失败 [${prop}]:`, error);
                    throw error;
                }
            };
        }
    });
}

// 使用
const api = createApiProxy('https://api.example.com');

// api.user({ id: 1 });  // POST /user
// api.posts({ page: 1 });  // POST /posts
```

### 请求缓存

```javascript
function createCachedApi(baseUrl, cacheTime = 5000) {
    const cache = new Map();

    return new Proxy({}, {
        get(target, prop) {
            return async (params) => {
                const key = `${prop}:${JSON.stringify(params)}`;

                // 检查缓存
                const cached = cache.get(key);
                if (cached && Date.now() - cached.timestamp < cacheTime) {
                    console.log(`缓存命中：${key}`);
                    return cached.data;
                }

                // 发起请求
                const response = await fetch(`${baseUrl}/${prop}`);
                const data = await response.json();

                // 更新缓存
                cache.set(key, { data, timestamp: Date.now() });

                return data;
            };
        }
    });
}
```

---

## 11.8 实践练习

### 练习 1：实现访问日志

```javascript
// 创建带访问日志的 Proxy
function createLoggingProxy(obj, name = 'Object') {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            console.log(`[${name}] 读取：${prop}`);
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
            console.log(`[${name}] 设置：${prop} = ${value}`);
            return Reflect.set(target, prop, value, receiver);
        },
        deleteProperty(target, prop) {
            console.log(`[${name}] 删除：${prop}`);
            return Reflect.deleteProperty(target, prop);
        }
    });
}

// 测试
const user = createLoggingProxy({ name: '张三', age: 25 }, 'User');
user.name;        // [User] 读取：name
user.age = 26;    // [User] 设置：age = 26
delete user.name; // [User] 删除：name
```

### 练习 2：实现负索引数组

```javascript
// 支持负数索引访问的数组
function createNegativeIndexArray(arr) {
    return new Proxy(arr, {
        get(target, prop) {
            const index = Number(prop);

            // 如果是负数索引
            if (Number.isInteger(index) && index < 0) {
                return target[target.length + index];
            }

            return target[prop];
        },
        set(target, prop, value) {
            const index = Number(prop);

            if (Number.isInteger(index) && index < 0) {
                target[target.length + index] = value;
                return true;
            }

            target[prop] = value;
            return true;
        }
    });
}

// 测试
const arr = createNegativeIndexArray([1, 2, 3, 4, 5]);
console.log(arr[-1]);  // 5（最后一个元素）
console.log(arr[-2]);  // 4（倒数第二个）
arr[-1] = 100;
console.log(arr);      // [1, 2, 3, 4, 100]
```

### 练习 3：实现属性映射

```javascript
// 属性名映射代理
function createAliasProxy(obj, aliases) {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            const realProp = aliases[prop] || prop;
            return Reflect.get(target, realProp, receiver);
        },
        set(target, prop, value, receiver) {
            const realProp = aliases[prop] || prop;
            return Reflect.set(target, realProp, value, receiver);
        }
    });
}

// 测试
const user = { firstName: '张', lastName: '三' };
const aliased = createAliasProxy(user, {
    name: 'firstName',
    surname: 'lastName'
});

console.log(aliased.name);     // '张'
console.log(aliased.surname);  // '三'
aliased.name = '李';
console.log(user.firstName);   // '李'
```

---

## 11.9 常见问答

### Q1: Proxy 有哪些性能问题？

**答：**
1. Proxy 每次访问都会触发拦截器，频繁访问可能影响性能
2. 深层嵌套对象需要递归创建 Proxy，内存开销大
3. 解决方案：对不需要的属性跳过拦截，使用 WeakMap 缓存

### Q2: Proxy 能拦截哪些操作？

**答：** 常见拦截操作：
- `get` - 属性读取
- `set` - 属性设置
- `has` - `in` 操作符
- `deleteProperty` - `delete` 操作
- `apply` - 函数调用
- `construct` - `new` 操作
- `ownKeys` - `Object.keys()` 等
- `getOwnPropertyDescriptor` - 属性描述符
- `getPrototypeOf` / `setPrototypeOf` - 原型操作

### Q3: Reflect 的所有方法都有用吗？

**答：** 不是所有 Reflect 方法都常用。最常用的是：
- `Reflect.get()` / `Reflect.set()` - 配合 Proxy
- `Reflect.has()` - 检查属性
- `Reflect.deleteProperty()` - 删除属性
- `Reflect.ownKeys()` - 获取所有键
- `Reflect.apply()` - 函数应用

### Q4: Proxy 有浏览器兼容性问题吗？

**答：** Proxy 是 ES6 特性，现代浏览器都支持，但：
- IE 完全不support
- 某些旧版本浏览器支持不完整
- 生产环境如需支持旧浏览器，需要 polyfill 或转译

---

## 11.10 学习资源

- [MDN - Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN - Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [ES6 入门教程 - Proxy 与 Reflect](https://es6.ruanyifeng.com/#docs/proxy)
- [Vue 3 响应式原理](https://vuejs.org/guide/extras/reactivity-in-depth.html)

---

**上一章：** [→ 10-生成器与迭代器](./10-生成器与迭代器.md)
**下一章：** [→ 12-模块化系统](./12-模块化系统.md)
