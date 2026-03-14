# Class 类与继承

## 学习目标
- 掌握 class 基础语法
- 理解静态方法和 getter/setter
- 掌握 extends 和 super 的使用
- 理解原型链与 class 的关系

---

## 6.0 通俗理解 Class

### 什么是 Class？

```
Class = "类" = 对象的"模板"

就像：
- 蓝图：定义了房子长什么样
- Class：定义了对象有什么属性和方法
- new：按照蓝图造房子
```

### Class vs 构造函数

```javascript
// 构造函数（老方式）
function Person(name) {
    this.name = name;
}
Person.prototype.sayHi = function() { };

// Class（新方式）
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHi() { }
}
// 效果一样，但更简洁！
```

### 核心概念

| 概念 | 通俗理解 |
|------|----------|
| class | 模板/蓝图 |
| constructor | 构造函数（创建时调用） |
| new | 按模板造对象 |
| extends | 继承/父子关系 |
| super | 调用父类方法 |

---

## 6.1 class 基础

### 基本语法

```javascript
// 构造函数方式
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function() {
    console.log(`Hi, I'm ${this.name}`);
};

// class 方式
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHi() {
        console.log(`Hi, I'm ${this.name}`);
    }
}

// 使用
const person = new Person('张三', 25);
person.sayHi();  // 'Hi, I'm 张三'
```

### 类表达式

```javascript
// 匿名类表达式
const MyClass = class {
    sayHi() {
        console.log('Hi');
    }
};

// 命名类表达式
const MyClass = class NamedClass {
    sayHi() {
        console.log('Hi');
    }
};

// 立即执行的类
const instance = new class {
    sayHi() {
        console.log('Hi');
    }
}();
```

---

## 6.2 静态方法

### 定义和使用

```javascript
class MathUtils {
    // 实例方法
    add(a, b) {
        return a + b;
    }

    // 静态方法
    static multiply(a, b) {
        return a * b;
    }

    // 静态方法调用其他静态方法
    static square(x) {
        return this.multiply(x, x);
    }
}

// 静态方法通过类调用
console.log(MathUtils.multiply(3, 4));  // 12
console.log(MathUtils.square(5));       // 25

// 实例无法调用静态方法
const utils = new MathUtils();
// utils.multiply(3, 4);  // TypeError
```

### 静态属性

```javascript
// ES2022 支持静态字段
class MyClass {
    static count = 0;
    static config = {
        debug: true,
        version: '1.0.0'
    };

    constructor() {
        MyClass.count++;
    }

    static getCount() {
        return MyClass.count;
    }
}

console.log(MyClass.config.version);  // '1.0.0'
```

---

## 6.3 getter 和 setter

### 基本用法

```javascript
class Person {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }

    // getter
    get name() {
        return this._name;
    }

    // setter
    set name(value) {
        if (value) {
            this._name = value;
        }
    }

    // getter
    get age() {
        return this._age;
    }

    // setter（带验证）
    set age(value) {
        if (value < 0 || value > 150) {
            throw new Error('年龄必须在 0-150 之间');
        }
        this._age = value;
    }

    // 计算属性
    get info() {
        return `${this._name}, ${this._age}岁`;
    }
}

// 使用
const person = new Person('张三', 25);
console.log(person.name);  // '张三'（调用 getter）
person.name = '李四';       // 调用 setter
console.log(person.info);  // '李四，25 岁'
```

---

## 6.4 继承

### extends 和 super

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

// 继承
class Dog extends Animal {
    constructor(name, breed) {
        // 调用父类构造函数
        super(name);
        this.breed = breed;
    }

    // 重写父类方法
    speak() {
        console.log(`${this.name} barks`);
    }

    // 调用父类方法
    speakWithParent() {
        super.speak();  // 'DogName makes a sound'
        this.speak();   // 'DogName barks'
    }
}

const dog = new Dog('旺财', '金毛');
dog.speak();           // '旺财 barks'
dog.speakWithParent(); // '旺财 makes a sound' + '旺财 barks'
```

### 子类中的 super

```javascript
class Parent {
    getName() {
        return 'Parent';
    }
}

class Child extends Parent {
    getName() {
        return 'Child';
    }

    getParentName() {
        return super.getName();  // 'Parent'
    }
}

// super 也用于访问父类的 getter/setter
class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get area() {
        return this._width * this._height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }

    // 重写 area getter
    get area() {
        return super.area * 2;  // 可以使用 super 访问父类 getter
    }
}
```

---

## 6.5 私有字段

### ES2022 私有字段

```javascript
class Person {
    // 私有字段
    #name;
    #age;

    constructor(name, age) {
        this.#name = name;
        this.#age = age;
    }

    // 私有方法
    #validate() {
        return this.#age > 0;
    }

    getName() {
        return this.#name;
    }

    getAge() {
        if (this.#validate()) {
            return this.#age;
        }
    }
}

const person = new Person('张三', 25);
console.log(person.getName());  // '张三'
// console.log(person.#name);   // SyntaxError（外部无法访问）
```

### 私有字段继承

```javascript
class Parent {
    #secret = 'parent secret';

    getSecret() {
        return this.#secret;
    }
}

class Child extends Parent {
    #secret = 'child secret';

    getChildSecret() {
        return this.#secret;
    }
}

const child = new Child();
console.log(child.getSecret());    // 'parent secret'
console.log(child.getChildSecret()); // 'child secret'
```

---

## 6.6 实践练习

### 练习 1：事件发射器

```javascript
class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
        return this;
    }

    off(event, listener) {
        const listeners = this.events.get(event);
        if (listeners) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
        return this;
    }

    emit(event, ...args) {
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(...args));
        }
        return true;
    }

    once(event, listener) {
        const wrapper = (...args) => {
            listener(...args);
            this.off(event, wrapper);
        };
        return this.on(event, wrapper);
    }
}

// 使用
const emitter = new EventEmitter();
emitter.on('message', msg => console.log(msg));
emitter.emit('message', 'Hello');
```

### 练习 2：栈和队列

```javascript
// 栈（LIFO）
class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    get size() {
        return this.items.length;
    }
}

// 队列（FIFO）
class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    front() {
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// 使用
const stack = new Stack();
stack.push(1);
stack.push(2);
console.log(stack.pop());  // 2

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue());  // 1
```

### 练习 3：工具类

```javascript
class StringUtils {
    // 静态工具方法
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static truncate(str, length) {
        return str.length > length ? str.slice(0, length) + '...' : str;
    }

    static slugify(str) {
        return str.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
    }

    static isPalindrome(str) {
        const clean = str.toLowerCase().replace(/\W/g, '');
        return clean === clean.split('').reverse().join('');
    }
}

// 使用
console.log(StringUtils.capitalize('hello'));  // 'Hello'
console.log(StringUtils.truncate('这是一段很长的文字', 5));  // '这是一段很...'
console.log(StringUtils.slugify('Hello World'));  // 'hello-world'
console.log(StringUtils.isPalindrome('A man a plan a canal Panama'));  // true
```

---

## 6.7 常见问答

### Q1: class 和构造函数有什么区别？

| 特性 | class | 构造函数 |
|------|-------|----------|
| 提升 | ❌ 不提升 | ✅ 提升 |
| 严格模式 | 自动 | 需要手动 |
| 不可枚举 | ✅ | ❌ |
| 必须 new | ✅ | ❌ |

### Q2: 箭头函数能作为类方法吗？

**答：** 可以，但 this 绑定不同。

```javascript
class MyClass {
    // 普通方法
    normalMethod() {
        console.log(this);  // 指向实例
    }

    // 箭头函数方法
    arrowMethod = () => {
        console.log(this);  // 也指向实例（绑定在构造函数中）
    }
}
```

### Q3: 如何实现 mixin？

```javascript
// mixin 模式
const canEat = {
    eat() {
        console.log(`${this.name} is eating`);
        return this;
    }
};

const canWalk = {
    walk() {
        console.log(`${this.name} is walking`);
        return this;
    }
};

class Animal {}
Object.assign(Animal.prototype, canEat, canWalk);

class Dog extends Animal {
    constructor(name) {
        super();
        this.name = name;
    }
}

const dog = new Dog('旺财');
dog.eat().walk();
```

### Q4: class 能继承内置类型吗？

**答：** 可以。

```javascript
class MyArray extends Array {
    last() {
        return this[this.length - 1];
    }

    first() {
        return this[0];
    }
}

const arr = new MyArray(1, 2, 3);
console.log(arr.last());  // 3
console.log(arr.first()); // 1
```

---

## 6.8 学习资源

- [MDN - Class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
- [ES6 入门教程 - Class](https://es6.ruanyifeng.com/#docs/class)
- [JavaScript.info - Class](https://zh.javascript.info/classes)

---

**上一章：** [← 07-函数进阶](./07-函数进阶.md)
**下一章：** [→ 09-Promise 与 async/await](./09-Promise-async-await.md)
