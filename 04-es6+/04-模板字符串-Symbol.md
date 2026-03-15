# 模板字符串与 Symbol

> 从零开始理解 ES6 的模板字符串和 Symbol 类型

## 学习目标

- ✅ 掌握模板字符串的基本用法
- ✅ 理解标签模板的作用
- ✅ 掌握 Symbol 类型的特性
- ✅ 了解内置 Symbol 的应用

---

## 4.0 为什么要学模板字符串和 Symbol？

### 4.0.1 模板字符串解决的问题

在 ES6 之前，字符串拼接是一个痛苦的过程：

```javascript
// ES5 字符串拼接
const name = '张三';
const age = 25;
const city = '北京';

const message = '你好，我叫' + name + '，今年' + age + '岁，来自' + city + '。';
```

问题：
1. 代码冗长
2. 容易出错（特别是引号嵌套）
3. 可读性差
4. 多行字符串需要手动添加 `\n`

### 4.0.2 Symbol 解决的问题

JavaScript 对象的属性名都是字符串，这可能导致冲突：

```javascript
// 潜在冲突
const obj = {
    'name': '张三',
    'name': '李四'  // 覆盖了前面的
};
console.log(obj.name);  // '李四'
```

Symbol 提供了创建唯一标识符的方式。

### 4.0.3 本章学习路径

```
第一步：掌握模板字符串（字符串拼接的革命）
    ↓
第二步：理解标签模板（高级用法）
    ↓
第三步：学习 String 新方法
    ↓
第四步：掌握 Symbol（唯一标识符）
    ↓
第五步：了解内置 Symbol
```

---

## 4.1 模板字符串详解

> 用反引号 ` ` 包裹的字符串，可以嵌入变量和表达式

### 4.1.1 基础语法

```javascript
// 传统方式：字符串拼接
const name = '张三';
const age = 25;
const message = '你好，我叫' + name + '，今年' + age + '岁';

// 模板字符串方式
const message = `你好，我叫${name}，今年${age}岁`;

console.log(message);  // 你好，我叫张三，今年25岁
```

**语法图解：**

```
┌─────────────────────────────────────────────────────────────┐
│  `你好，我叫${name}，今年${age}岁`                           │
│  │                         │                                │
│  │                         └── 插值表达式（可以是变量、      │
│  │                             函数调用、表达式等）          │
│  └───────────────────────────── 用反引号包裹                 │
└─────────────────────────────────────────────────────────────┘
```

### 4.1.2 插值表达式

插值表达式 `${}` 中可以放任何 JavaScript 表达式：

```javascript
// 1. 变量
const name = '张三';
console.log(`你好，${name}`);  // 你好，张三

// 2. 算术表达式
const a = 10, b = 20;
console.log(`${a} + ${b} = ${a + b}`);  // 10 + 20 = 30

// 3. 函数调用
const getName = () => '李四';
console.log(`你好，${getName()}`);  // 你好，李四

// 4. 三元表达式
const isVip = true;
console.log(`欢迎${isVip ? 'VIP' : '普通'}用户`);  // 欢迎VIP用户

// 5. 对象属性
const user = { name: '王五', age: 30 };
console.log(`用户：${user.name}，${user.age}岁`);  // 用户：王五，30岁

// 6. 可选链 + 空值合并
const data = null;
console.log(`名称：${data?.name ?? '未知'}`);  // 名称：未知
```

### 4.1.3 多行字符串

```javascript
// ES5：需要手动添加换行符
const es5String = '第一行\n' +
                  '第二行\n' +
                  '第三行';

// ES6：直接写多行
const es6String = `第一行
第二行
第三行`;

console.log(es6String);
// 第一行
// 第二行
// 第三行
```

**实际应用：HTML 模板**

```javascript
const items = ['苹果', '香蕉', '橙子'];

const html = `
    <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
`;

console.log(html);
// <ul>
//     <li>苹果</li>
//     <li>香蕉</li>
//     <li>橙子</li>
// </ul>
```

---

## 4.2 标签模板详解

> 模板字符串的"高级玩法"

### 4.2.1 什么是标签模板？

标签模板 = 用一个函数"处理"模板字符串

```javascript
// 定义标签函数
function highlight(strings, ...values) {
    console.log('字符串部分:', strings);  // ['你好，', '，今年', '岁']
    console.log('值部分:', values);       // ['张三', 25]
    return '处理后的结果';
}

const name = '张三';
const age = 25;

// 使用标签函数
const result = highlight`你好，${name}，今年${age}岁`;
```

### 4.2.2 标签函数的参数

```javascript
// 标签函数的参数结构
function tag(strings, value1, value2, ...) {
    // strings: 字符串字面量部分的数组
    // value1, value2, ...: 插值表达式的值
}

// 或者使用剩余参数
function tag(strings, ...values) {
    // values: 所有插值值的数组
}
```

**示例：**

```javascript
function myTag(strings, ...values) {
    console.log('=== 调试信息 ===');
    console.log('字符串数组:', strings);
    console.log('值数组:', values);
    
    // 返回处理后的字符串
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? values[i] : '');
    }, '');
}

const name = '张三';
const age = 25;
const result = myTag`你好，${name}，今年${age}岁`;
console.log('结果:', result);
```

### 4.2.3 实际应用场景

**场景 1：HTML 转义**

```javascript
function escapeHtml(strings, ...values) {
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };
    
    const escape = (str) => str.replace(/[&<>"']/g, char => escapeMap[char]);
    
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] !== undefined ? escape(String(values[i])) : '');
    }, '');
}

const userInput = '<script>alert("xss")</script>';
const safe = escapeHtml`<div>用户输入：${userInput}</div>`;
console.log(safe);
// <div>用户输入：&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</div>
```

**场景 2：国际化**

```javascript
function i18n(strings, ...values) {
    const translations = {
        '你好，': 'Hello, ',
        '，今年': ', age ',
        '岁': ' years old'
    };
    
    return strings.reduce((result, str, i) => {
        return result + (translations[str] || str) + (values[i] || '');
    }, '');
}

const name = '张三';
const age = 25;
const message = i18n`你好，${name}，今年${age}岁`;
console.log(message);  // Hello, 张三，age 25 years old
```

---

## 4.3 String 新方法

> ES6 为 String 对象添加了几个实用方法

### 4.3.1 查找方法

```javascript
// includes - 是否包含子串
const str = 'Hello World';
str.includes('World');   // true
str.includes('world');   // false（区分大小写）
str.includes('Hello', 0); // true（从索引 0 开始）

// startsWith - 是否以指定字符串开头
str.startsWith('Hello');  // true
str.startsWith('World', 6); // true（从索引 6 开始）

// endsWith - 是否以指定字符串结尾
str.endsWith('World');  // true
str.endsWith('Hello', 5); // true（只检查前 5 个字符）
```

### 4.3.2 填充方法

```javascript
// padStart - 在前面填充
'5'.padStart(3, '0');     // '005'
'hello'.padStart(10, '*'); // '*****hello'

// padEnd - 在后面填充
'5'.padEnd(3, '0');       // '500'
'hello'.padEnd(10, '*');   // 'hello*****'

// 实际应用：格式化数字
function formatNumber(num, width) {
    return String(num).padStart(width, '0');
}

console.log(formatNumber(7, 3));   // '007'
console.log(formatNumber(123, 5));  // '00123'
```

### 4.3.3 其他方法

```javascript
// repeat - 重复字符串
'ha'.repeat(3);    // 'hahaha'
'abc'.repeat(0);   // ''
'abc'.repeat(2.5); // 'abcabc'（向下取整）

// trimStart / trimEnd - 去除首尾空白
'  hello  '.trimStart();  // 'hello  '
'  hello  '.trimEnd();    // '  hello'

// replaceAll - 全部替换（ES2021）
'hello world'.replaceAll('l', 'L');  // 'heLLo worLd'
```

---

## 4.4 Symbol 详解

> Symbol = 唯一的标识符

### 4.4.1 什么是 Symbol？

```
┌─────────────────────────────────────────────────────────────┐
│  Symbol（符号）是 ES6 引入的一种新的原始类型                 │
│                                                             │
│  特点：                                                     │
│  1. 每个 Symbol 值都是唯一的                                 │
│  2. Symbol 值可以作为对象的属性名                            │
│  3. Symbol 属性不会出现在 for...in、Object.keys 中           │
│  4. Symbol 是不可枚举的                                      │
│                                                             │
│  用途：                                                     │
│  1. 创建唯一的对象属性名                                     │
│  2. 定义类的私有成员                                         │
│  3. 自定义迭代行为                                           │
└─────────────────────────────────────────────────────────────┘
```

### 4.4.2 创建 Symbol

```javascript
// 创建 Symbol
const sym1 = Symbol();
const sym2 = Symbol('description');  // 描述（可选）

console.log(typeof sym1);  // 'symbol'

// 每个 Symbol 都是唯一的
const sym3 = Symbol('id');
const sym4 = Symbol('id');
console.log(sym3 === sym4);  // false（即使描述相同）

// toString 方法
console.log(sym3.toString());  // 'Symbol(id)'
console.log(sym4.toString());  // 'Symbol(id)'
```

### 4.4.3 Symbol 作为对象属性

```javascript
// 使用 Symbol 作为属性名
const id = Symbol('id');
const user = {
    [id]: 1,        // Symbol 属性
    name: '张三',
    age: 25
};

// 访问 Symbol 属性
console.log(user[id]);    // 1
console.log(user.name);   // '张三'

// Symbol 属性的特点
console.log(Object.keys(user));        // ['name', 'age']（不包含 Symbol）
console.log(Object.getOwnPropertyNames(user));  // ['name', 'age']

// 获取所有 Symbol 属性
console.log(Object.getOwnPropertySymbols(user));  // [Symbol(id)]

// JSON 序列化时不包含 Symbol
console.log(JSON.stringify(user));  // {"name":"张三","age":25}
```

### 4.4.4 全局 Symbol 注册表

```javascript
// Symbol.for() - 在全局注册表中查找或创建 Symbol
const sym1 = Symbol.for('userId');
const sym2 = Symbol.for('userId');

console.log(sym1 === sym2);  // true（同一个 Symbol）

// Symbol.keyFor() - 获取全局 Symbol 的 key
const key = Symbol.keyFor(sym1);
console.log(key);  // 'userId'

// 实际应用：跨 iframe 或 Worker 共享 Symbol
```

---

## 4.5 内置 Symbol

> JavaScript 提供了一些预定义的 Symbol，用于自定义语言行为

### 4.5.1 Symbol.iterator

```javascript
// 自定义对象的迭代行为
const range = {
    from: 1,
    to: 5,
    
    // 实现 Symbol.iterator 方法
    [Symbol.iterator]() {
        let current = this.from;
        const last = this.to;
        
        return {
            next() {
                if (current <= last) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
};

// 现在可以使用 for...of 遍历
for (const num of range) {
    console.log(num);  // 1, 2, 3, 4, 5
}

// 或者使用展开运算符
console.log([...range]);  // [1, 2, 3, 4, 5]
```

### 4.5.2 Symbol.toStringTag

```javascript
// 自定义对象的 toString 标签
const user = {
    [Symbol.toStringTag]: 'User',
    name: '张三'
};

console.log(Object.prototype.toString.call(user));  // '[object User]'
```

### 4.5.3 Symbol.hasInstance

```javascript
// 自定义 instanceof 行为
class EvenArray {
    static [Symbol.hasInstance](instance) {
        return Array.isArray(instance) && instance.every(n => n % 2 === 0);
    }
}

console.log([2, 4, 6] instanceof EvenArray);  // true
console.log([1, 2, 3] instanceof EvenArray); // false
```

---

## 4.6 实践练习

### 练习 1：模板字符串

```javascript
// 1.1 基本插值
const name = '李四';
const age = 30;
console.log(`我叫${name}，今年${age}岁`);

// 1.2 表达式
const a = 5, b = 3;
console.log(`${a} * ${b} = ${a * b}`);

// 1.3 多行字符串
const poem = `春眠不觉晓，
处处闻啼鸟。
夜来风雨声，
花落知多少。`;
console.log(poem);

// 1.4 函数调用
const items = ['苹果', '香蕉'];
console.log(`水果：${items.join(', ')}`);
```

### 练习 2：标签模板

```javascript
// 创建简单的日志标签函数
function log(strings, ...values) {
    const timestamp = new Date().toLocaleTimeString();
    return strings.reduce((acc, str, i) => {
        return acc + `[${timestamp}] ` + str + (values[i] !== undefined ? values[i] : '');
    }, '');
}

const name = '用户';
log`你好，${name}，欢迎回来`;
// 输出类似：[10:30:00] 你好，用户，欢迎回来
```

### 练习 3：Symbol

```javascript
// 3.1 创建 Symbol
const id = Symbol('id');
const user = { [id]: 123, name: '张三' };
console.log(user[id]);  // 123

// 3.2 全局 Symbol
const sym1 = Symbol.for('appId');
const sym2 = Symbol.for('appId');
console.log(sym1 === sym2);  // true

// 3.3 Symbol 属性
const secret = Symbol('secret');
const obj = { name: 'test', [secret]: 'hidden' };
console.log(Object.keys(obj));  // ['name']
console.log(obj[secret]);       // 'hidden'
```

---

## 4.7 常见问答

### Q1: 模板字符串和普通字符串哪个好？

**答：** 根据场景选择。

```javascript
// 简单字符串：普通字符串
const simple = 'Hello World';

// 需要插值：模板字符串
const name = '张三';
const greeting = `你好，${name}`;

// 多行字符串：模板字符串
const html = `<div>
    <h1>标题</h1>
</div>`;
```

### Q2: Symbol 有什么实际用途？

**答：** 主要有三个用途：

```javascript
// 1. 创建唯一的对象属性名（避免冲突）
const id = Symbol('id');
const obj = { [id]: 1, id: 'stringId' };

// 2. 定义类的私有成员（模拟）
const _private = Symbol('private');
class MyClass {
    constructor() {
        this[_private] = '私有数据';
    }
}

// 3. 自定义迭代行为
obj[Symbol.iterator] = function() { ... };
```

### Q3: Symbol 能被序列化吗？

**答：** 不能。

```javascript
const sym = Symbol('test');
const obj = { [sym]: 'value' };

JSON.stringify(obj);  // '{}'（Symbol 属性被忽略）
```

---

## 4.8 学习资源

### 官方文档

- [MDN - 模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)
- [MDN - Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

### 推荐教程

- [ES6 入门教程 - 阮一峰](https://es6.ruanyifeng.com/#docs/string)
- [JavaScript.info - Symbol](https://zh.javascript.info/symbol)

---

**上一章：** [← 03-解构与展开](./03-解构与展开.md)  
**下一章：** [→ 05-Map-Set-WeakMap](./05-Map-Set-WeakMap.md)