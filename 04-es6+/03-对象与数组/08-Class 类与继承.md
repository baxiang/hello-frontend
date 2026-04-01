# Class 类与继承

> 从零开始理解 ES6 的面向对象编程

## 学习目标

- ✅ 掌握 class 基础语法
- ✅ 理解静态方法和 getter/setter
- ✅ 掌握 extends 和 super 的使用
- ✅ 理解原型链与 class 的关系

---

## 8.0 为什么要学 Class？

### 8.0.1 故事背景

在 ES6 之前，JavaScript 使用构造函数和原型来实现面向对象：

```javascript
// 构造函数
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 原型方法
Person.prototype.sayHi = function() {
    console.log('你好，我叫' + this.name);
};

// 创建实例
const person = new Person('张三', 25);
person.sayHi();
```

这种方式：
1. 语法繁琐
2. 继承实现复杂
3. 可读性差

### 8.0.2 Class 的优势

```
┌─────────────────────────────────────────────────────────────┐
│                    Class 的优势                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 语法更简洁                                              │
│     → 更像传统面向对象语言                                   │
│                                                             │
│  2. 继承更简单                                              │
│     → 使用 extends 和 super 关键字                           │
│                                                             │
│  3. 更清晰的结构                                            │
│     → constructor、方法、静态方法分开了                     │
│                                                             │
│  4. 内置 getter/setter                                      │
│     → 更方便地控制属性访问                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.0.3 本章学习路径

```
第一步：Class 基础语法（如何定义类）
    ↓
第二步：实例方法和静态方法（方法的类型）
    ↓
第三步：getter 和 setter（计算属性）
    ↓
第四步：继承（extends 和 super）
    ↓
第五步：私有字段（真正的私有属性）
```

---

## 8.1 Class 基础详解

### 8.1.1 基本语法

```javascript
// 定义类
class Person {
    // 构造函数
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // 实例方法
    sayHi() {
        console.log('你好，我叫' + this.name);
    }

    // 描述
    describe() {
        return this.name + '，' + this.age + '岁';
    }
}

// 创建实例
const person = new Person('张三', 25);

console.log(person.name);  // '张三'
console.log(person.age);   // 25
person.sayHi();            // 你好，我叫张三
```

**语法图解：**

```
┌─────────────────────────────────────────────────────────────┐
│  class Person {                                            │
│      constructor(name, age) {  ← 构造函数，初始化         │
│          this.name = name;                                 │
│          this.age = age;                                   │
│      }                                                      │
│                                                             │
│      sayHi() {  ← 实例方法，所有实例共享                   │
│          console.log('...');                               │
│      }                                                      │
│  }                                                          │
│                                                             │
│  const person = new Person('张三', 25);  ← 创建实例        │
└─────────────────────────────────────────────────────────────┘
```

### 8.1.2 Class vs 构造函数

```javascript
// 构造函数方式（ES5）
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHi = function() {
    console.log('你好，我叫' + this.name);
};

// Class 方式（ES6）
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHi() {
        console.log('你好，我叫' + this.name);
    }
}

// 使用方式相同
const p1 = new Person('张三', 25);
const p2 = new Person('李四', 30);

p1.sayHi();
p2.sayHi();
```

### 8.1.3 类表达式

```javascript
// 匿名类表达式
const Person = class {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log('你好');
    }
};

// 命名类表达式
const MyPerson = class NamedClass {
    constructor(name) {
        this.name = name;
    }
    getClassName() {
        return NamedClass.name;  // 'NamedClass'
    }
};
```

---

## 8.2 静态方法详解

### 8.2.1 什么是静态方法？

```
┌─────────────────────────────────────────────────────────────┐
│  静态方法 = 类的方法，不是实例的方法                         │
│                                                             │
│  特点：                                                     │
│  - 通过类名调用，不需要创建实例                             │
│  - 静态方法中的 this 指向类本身                             │
│  - 常用于工具函数、工厂方法                                  │
└─────────────────────────────────────────────────────────────┘
```

### 8.2.2 基本语法

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

    // 静态方法可以调用静态方法
    static square(x) {
        return this.multiply(x, x);  // this = MathUtils
    }
}

// 调用静态方法
console.log(MathUtils.multiply(3, 4));  // 12
console.log(MathUtils.square(5));        // 25

// 实例无法调用静态方法
const utils = new MathUtils();
// utils.multiply(3, 4);  // TypeError
```

### 8.2.3 实际应用场景

```javascript
// 场景 1：工厂方法
class User {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    static createAdmin(name) {
        return new User(name, 'admin');
    }

    static createGuest(name) {
        return new User(name, 'guest');
    }
}

const admin = User.createAdmin('张三');
const guest = User.createGuest('李四');

// 场景 2：工具方法
class StringUtils {
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static reverse(str) {
        return str.split('').reverse().join('');
    }
}

console.log(StringUtils.capitalize('hello'));  // 'Hello'
console.log(StringUtils.reverse('hello'));    // 'olleh'
```

---

## 8.3 getter 和 setter

### 8.3.1 什么是 getter/setter？

```
┌─────────────────────────────────────────────────────────────┐
│  getter 和 setter = 计算属性                                │
│                                                             │
│  getter：获取属性时执行的代码                                │
│  setter：设置属性时执行的代码                                │
│                                                             │
│  用途：                                                     │
│  - 数据验证                                                │
│  - 计算属性                                                │
│  - 隐藏内部实现                                             │
└─────────────────────────────────────────────────────────────┘
```

### 8.3.2 基本语法

```javascript
class Person {
    constructor(name) {
        this._name = name;  // 私有属性（约定用下划线）
    }

    // getter：读取 name 时执行
    get name() {
        console.log('获取 name');
        return this._name;
    }

    // setter：设置 name 时执行
    set name(value) {
        console.log('设置 name 为', value);
        this._name = value;
    }
}

const person = new Person('张三');

console.log(person.name);  // '获取 name' + '张三'
person.name = '李四';      // '设置 name 为 李四'
```

### 8.3.3 实际应用

```javascript
// 应用 1：数据验证
class User {
    constructor(age) {
        this.age = age;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        if (value < 0 || value > 150) {
            throw new Error('年龄必须在 0-150 之间');
        }
        this._age = value;
    }
}

const user = new User(25);
user.age = 30;  // OK
// user.age = -1;  // 抛出错误

// 应用 2：计算属性
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // 计算属性：面积
    get area() {
        return this.width * this.height;
    }

    // 计算属性：周长
    get perimeter() {
        return 2 * (this.width + this.height);
    }
}

const rect = new Rectangle(10, 5);
console.log(rect.area);      // 50
console.log(rect.perimeter); // 30
```

---

## 8.4 继承详解

### 8.4.1 什么是继承？

```
┌─────────────────────────────────────────────────────────────┐
│  继承 = "父子关系"                                          │
│                                                             │
│  子类继承父类：                                             │
│  - 可以使用父类的属性和方法                                  │
│  - 可以重写父类的方法                                        │
│  - 可以添加自己的新方法                                      │
│                                                             │
│  关键字：                                                   │
│  - extends：声明继承关系                                    │
│  - super：调用父类                                         │
└─────────────────────────────────────────────────────────────┘
```

### 8.4.2 基本语法

```javascript
// 父类
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(this.name + ' makes a sound');
    }
}

// 子类
class Dog extends Animal {
    constructor(name, breed) {
        // 调用父类构造函数
        super(name);
        this.breed = breed;
    }

    // 重写父类方法
    speak() {
        console.log(this.name + ' barks');
    }

    // 新增方法
    fetch() {
        console.log(this.name + ' fetches the ball');
    }
}

const dog = new Dog('旺财', '金毛');
dog.speak();     // '旺财 barks'（重写后的方法）
dog.fetch();     // '旺财 fetches the ball'（子类新方法）
```

### 8.4.3 super 的使用

```javascript
class Parent {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return '你好，我是' + this.name;
    }

    static staticMethod() {
        return '父类的静态方法';
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name);  // 调用父类构造函数
        this.age = age;
    }

    greet() {
        // 调用父类方法
        const parentGreeting = super.greet();
        return parentGreeting + '，今年' + this.age + '岁';
    }

    static staticMethod() {
        // 调用父类静态方法
        return super.staticMethod() + '的扩展';
    }
}

const child = new Child('张三', 25);
console.log(child.greet());  // 你好，我是张三，今年25岁
```

### 8.4.4 原型链

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log('动物叫声');
    }
}

class Dog extends Animal {
    speak() {
        console.log('狗叫声');
    }
}

const dog = new Dog('旺财');

console.log(dog instanceof Dog);      // true
console.log(dog instanceof Animal);    // true
console.log(dog instanceof Object);    // true

// 原型链：dog → Dog.prototype → Animal.prototype → Object.prototype → null
```

---

## 8.5 私有字段（ES2022）

### 8.5.1 什么是私有字段？

```javascript
// 传统方式：约定私有（不真正私有）
class Person {
    constructor(name) {
        this._name = name;  // 下划线表示私有
    }
}

const person = new Person('张三');
console.log(person._name);  // 可以访问，但不规范

// 私有字段：真正的私有
class Person {
    #name;  // 私有字段

    constructor(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }
}

const person = new Person('张三');
console.log(person.getName());  // '张三'
// console.log(person.#name);  // 语法错误！无法直接访问
```

### 8.5.2 私有字段的使用

```javascript
class BankAccount {
    #balance = 0;

    constructor(initialBalance) {
        if (initialBalance > 0) {
            this.#balance = initialBalance;
        }
    }

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return true;
        }
        return false;
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            return true;
        }
        return false;
    }

    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(1000);
console.log(account.getBalance());  // 1000
account.deposit(500);
console.log(account.getBalance());  // 1500
// account.#balance  // 语法错误，无法直接访问
```

---

## 8.6 实践练习

### 练习 1：基础 Class

```javascript
// 1.1 创建 User 类
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    introduce() {
        return `你好，我是${this.name}`;
    }
}

const user = new User('张三', 'zhang@example.com');
console.log(user.introduce());  // 你好，我是张三
```

### 练习 2：继承

```javascript
// 2.1 创建 Animal 和 Dog 类
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} 发出了声音`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} 汪汪叫`);
    }
}

const dog = new Dog('旺财');
dog.speak();  // 旺财 汪汪叫
```

### 练习 3：getter/setter

```javascript
// 3.1 创建带验证的 Temperature 类
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }

    get celsius() {
        return this._celsius;
    }

    set celsius(value) {
        this._celsius = value;
    }

    get fahrenheit() {
        return this._celsius * 9 / 5 + 32;
    }

    set fahrenheit(value) {
        this._celsius = (value - 32) * 5 / 9;
    }
}

const temp = new Temperature(25);
console.log(temp.celsius);     // 25
console.log(temp.fahrenheit);   // 77
temp.fahrenheit = 100;
console.log(temp.celsius);     // 37.777...
```

---

## 8.7 常见问答

### Q1: Class 和构造函数哪个好？

**答：** Class 更清晰、更易读，推荐使用 Class。

```javascript
// 推荐
class Person {
    constructor(name) {
        this.name = name;
    }
}

// 构造函数仍然可用，但不如 Class 清晰
function Person(name) {
    this.name = name;
}
```

### Q2: super 必须在 constructor 的第一行调用吗？

```javascript
// 是的
class Child extends Parent {
    constructor() {
        // super() 必须在 this 之前调用
        super();
        this.name = '张三';  // 这行在 super() 之后
    }
}
```

### Q3: 私有字段和 Symbol 哪个好？

```javascript
// 私有字段（推荐）
class Person {
    #name;
}

// Symbol（不推荐，无法真正私有）
const _name = Symbol('name');
class Person {
    constructor(name) {
        this[_name] = name;
    }
}

// 私有字段是语言级别的支持，更可靠
```

---

## 8.8 学习资源

### 官方文档

- [MDN - class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class)
- [MDN - extends](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends)

### 推荐教程

- [ES6 入门教程 - 阮一峰](https://es6.ruanyifeng.com/#docs/class)
- [JavaScript.info - Class](https://zh.javascript.info/class)

---

**上一章：** [← 07-函数进阶](./07-函数进阶.md)  
**下一章：** [→ 09-Promise-async-await](./09-Promise-async-await.md)