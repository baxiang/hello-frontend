# Class 类与继承 ⭐⭐

> ES6 面向对象编程：类语法、继承、私有字段

---

## 学习目标

- 掌握 class 基础语法和 constructor
- 理解静态方法、getter/setter
- 掌握 extends 和 super 的继承机制
- 学会使用私有字段（#）

---

## 生活化比喻

**Class 就像"产品模具"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  产品模具                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    Class = 模具图纸                                   │
│    ─────────────                                     │
│    图纸定义了产品的规格                               │
│    但图纸本身不是产品                                 │
│                                                      │
│    实例 = 用模具生产的产品                            │
│    ─────────────                                     │
│    new Class() → 用图纸生产一个产品                  │
│    每个产品独立，但规格相同                           │
│                                                      │
│    constructor = 生产线初始化                         │
│    ─────────────                                     │
│    产品刚生产出来时的默认设置                        │
│                                                      │
│    继承 = 在旧模具基础上改                            │
│    ─────────────                                     │
│    子类继承父类 = 旧模具 + 新功能                    │
│    super() = 先按旧模具做基础部分                    │
│                                                      │
│    静态方法 = 模具工厂的方法                          │
│    ─────────────                                     │
│    不需要产品就能调用的方法                           │
│    比如：工厂方法、工具方法                           │
│                                                      │
│    私有字段 = 产品内部结构                            │
│    ─────────────                                     │
│    用户看不到内部零件，只能通过按钮操作              │
│    #field → 外部无法直接访问                         │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### Class 基础

**语法结构图：**

```
Class 结构：

class Name {
    constructor(params) {   ← 构造函数，new 时自动调用
        this.prop = value;  ← 实例属性
    }

    method() { }            ← 实例方法（所有实例共享）

    static staticMethod() { }  ← 静态方法（类名调用）

    get prop() { }          ← getter（读取时触发）
    set prop(v) { }         ← setter（赋值时触发）

    #privateField = value;  ← 私有字段（ES2022）
}
```

**最简示例（1-3行）：**

```javascript
class User { constructor(name) { this.name = name; } greet() { return `Hi, ${this.name}`; } }
const u = new User('张三'); u.greet();  // 'Hi, 张三'
```

**详细示例：**

```javascript
class Person {
    #age;  // 私有字段

    constructor(name, age) {
        this.name = name;
        this.#age = age;
    }

    get age() { return this.#age; }
    set age(value) {
        if (value < 0 || value > 150) throw new Error('无效年龄');
        this.#age = value;
    }

    greet() { return `你好，我叫${this.name}`; }

    static create(name) { return new Person(name, 0); }  // 工厂方法
}

const p = new Person('张三', 25);
p.greet();        // '你好，我叫张三'
p.age = 30;       // ✅
// p.#age = 30;   // ❌ SyntaxError
const p2 = Person.create('李四');  // 工厂方法
```

---

### 继承

**语法结构图：**

```
继承结构：

class Child extends Parent {
    constructor(params) {
        super(parentParams);  ← 必须先调用
        this.childProp = value;
    }

    method() {
        super.method();  ← 调用父类方法
    }
}
```

**最简示例：**

```javascript
class Dog extends Animal {
    constructor(name) { super(name); }
    speak() { return `${this.name} 汪汪叫`; }
}
```

**详细示例：**

```javascript
class Animal {
    constructor(name) { this.name = name; }
    speak() { return `${this.name} 发出声音`; }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() { return `${this.name} 汪汪叫`; }  // 重写
    fetch() { return `${this.name} 捡球`; }    // 新方法
}

const dog = new Dog('旺财', '金毛');
dog.speak();   // '旺财 汪汪叫'（重写后）
dog.fetch();   // '旺财 捡球'（新方法）
dog instanceof Dog;     // true
dog instanceof Animal;  // true
```

---

## L2 实践层：用好

### 方法类型选择

| 方法类型 | 调用方式 | 用途 | 示例 |
|---------|---------|------|------|
| 实例方法 | `instance.method()` | 操作实例数据 | `user.greet()` |
| 静态方法 | `Class.method()` | 工具函数、工厂方法 | `User.createAdmin()` |
| getter | `instance.prop` | 计算属性、只读访问 | `rect.area` |
| setter | `instance.prop = v` | 数据验证 | `user.age = 25` |

### 反模式：不要这样做

```javascript
// ❌ 错误：在 constructor 外定义实例属性
class User {
    name = '张三';  // 虽然可用，但习惯放 constructor
    constructor() {}
}

// ✅ 推荐：在 constructor 中初始化
class User {
    constructor() { this.name = '张三'; }
}
```

```javascript
// ❌ 错误：子类 constructor 中 this 在 super 之前使用
class Child extends Parent {
    constructor() {
        this.name = 'test';  // ❌ ReferenceError
        super();
    }
}

// ✅ 正确：super 必须在 this 之前
class Child extends Parent {
    constructor() {
        super();
        this.name = 'test';  // ✅
    }
}
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 数据结构建模 | class | 清晰的属性和方法组织 |
| 工具函数集合 | 静态方法或模块函数 | 不需要实例化 |
| 框架组件 | class 或函数 | React 用函数，Angular 用 class |
| 私有状态 | `#field` | 语言级私有，无法从外部访问 |

---

## L3 专家层：深入

### Class 与原型的关系

```
Class 本质上是构造函数的语法糖：

class Person {
    constructor(name) { this.name = name; }
    greet() { return `Hi, ${this.name}`; }
}

等价于：

function Person(name) { this.name = name; }
Person.prototype.greet = function() { return `Hi, ${this.name}`; };

实例原型链：
person → Person.prototype → Object.prototype → null
```

### 私有字段原理

```
#field 是语言级别的私有：

class User {
    #secret = 'hidden';
    getSecret() { return this.#secret; }
}

// 外部无法访问，即使是反射也无法获取
const u = new User();
Object.keys(u);           // []（不包含私有字段）
JSON.stringify(u);        // '{}'
u.#secret;               // SyntaxError
```

### 知识关联

```
Class 知识关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Class 定义 │────→│  实例与     │────→│  继承       │
│  constructor│     │  方法       │     │  extends/   │
│             │     │  getter/    │     │  super      │
└─────────────┘     │  setter     │     └─────────────┘
                    └─────────────┘          │
                           │                ↓
                           ↓          ┌─────────────┐
                    ┌─────────────┐   │  私有字段   │
                    │  静态方法   │   │  #field     │
                    │  工厂方法   │   │  真正私有   │
                    └─────────────┘   └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **Class** | ES6 引入的面向对象语法，构造函数的语法糖 | `class User {}` |
| **constructor** | 构造函数，new 时自动调用 | `constructor(name) { this.name = name; }` |
| **extends** | 声明继承关系 | `class Dog extends Animal {}` |
| **super** | 调用父类构造函数或方法 | `super(name)`、`super.speak()` |
| **静态方法** | 通过类名调用的方法，不属于实例 | `static create() {}` |
| **getter/setter** | 访问/赋值属性时自动执行的代码 | `get age() {}`、`set age(v) {}` |
| **私有字段** | 只能在类内部访问的字段 | `#secret` |

---

## 实践练习

### 练习：EventEmitter + 带验证的类

```javascript
// 练习 1：EventEmitter
class EventEmitter {
    #events = new Map();

    on(event, fn) {
        if (!this.#events.has(event)) this.#events.set(event, []);
        this.#events.get(event).push(fn);
    }

    off(event, fn) {
        const fns = this.#events.get(event);
        if (fns) this.#events.set(event, fns.filter(f => f !== fn));
    }

    emit(event, ...args) {
        this.#events.get(event)?.forEach(fn => fn(...args));
    }

    once(event, fn) {
        const wrapper = (...args) => { fn(...args); this.off(event, wrapper); };
        this.on(event, wrapper);
    }
}

const emitter = new EventEmitter();
emitter.once('data', d => console.log('收到:', d));
emitter.emit('data', 'hello');  // 收到: hello
emitter.emit('data', 'world');  // 无输出（once 已移除）

// 练习 2：带验证的 Rectangle
class Rectangle {
    #width; #height;

    constructor(w, h) { this.width = w; this.height = h; }

    get width() { return this.#width; }
    set width(v) { if (v <= 0) throw new Error('宽度必须为正'); this.#width = v; }

    get height() { return this.#height; }
    set height(v) { if (v <= 0) throw new Error('高度必须为正'); this.#height = v; }

    get area() { return this.#width * this.#height; }
    get perimeter() { return 2 * (this.#width + this.#height); }
}

const rect = new Rectangle(10, 5);
console.log(rect.area);      // 50
// rect.width = -1;          // ❌ Error
```

---

## 常见问题

### Q1：Class 和构造函数哪个好？

**Class 更清晰、更易读，推荐优先使用：**

```javascript
// Class（推荐）
class Person { constructor(name) { this.name = name; } }

// 构造函数（旧方式）
function Person(name) { this.name = name; }
Person.prototype.greet = function() {};
```

### Q2：私有字段（#）和 WeakMap 哪个好？

**ES2022+ 优先用 #，旧环境用 WeakMap：**

```javascript
// 现代方式
class User { #name; getName() { return this.#name; } }

// 兼容方式
const _data = new WeakMap();
class User { constructor(n) { _data.set(this, { name: n }); } }
```

---

## 学习资源

- [MDN - class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class) ⭐ 官方权威
- [MDN - extends](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends)
- [JavaScript.info - Class](https://zh.javascript.info/class)
