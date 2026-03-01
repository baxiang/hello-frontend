# 模板字符串与 Symbol

## 学习目标
- 掌握模板字符串的基本用法
- 理解标签模板的作用
- 掌握 Symbol 类型的特性
- 了解内置 Symbol 的应用

---

## 4.1 模板字符串基础

### 基本语法

```javascript
// 传统字符串拼接
const name = '张三';
const age = 25;
const greeting = '你好，我叫' + name + '，今年' + age + '岁';

// 模板字符串
const greeting = `你好，我叫${name}，今年${age}岁`;

// 多行字符串
// 传统方式
const multiline = '第一行\n' +
                  '第二行\n' +
                  '第三行';

// 模板字符串
const multiline = `第一行
第二行
第三行`;
```

### 插值表达式

```javascript
// 可以是任意表达式
const num1 = 10;
const num2 = 20;
console.log(`${num1} + ${num2} = ${num1 + num2}`);  // 10 + 20 = 21

// 调用函数
const getName = () => '张三';
console.log(`你好，${getName()}`);  // 你好，张三

// 三元表达式
const isLoggedIn = true;
console.log(`欢迎${isLoggedIn ? '回来' : '光临'}`);

// 嵌套模板
const user = { profile: { name: '张三' } };
console.log(`用户：${user?.profile?.name || '匿名'}`);
```

### 实用示例

```javascript
// URL 构建
const baseUrl = 'https://api.example.com';
const endpoint = 'users';
const id = 123;
const url = `${baseUrl}/${endpoint}/${id}`;

// HTML 模板
const items = ['苹果', '香蕉', '橙子'];
const html = `
    <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
`;

// 条件渲染
const showDetails = true;
const template = `
    <div>
        <h1>标题</h1>
        ${showDetails ? '<p>详细内容</p>' : ''}
    </div>
`;
```

---

## 4.2 标签模板

### 基础语法

```javascript
// 标签函数
function tag(strings, ...values) {
    console.log(strings);  // ['你好，', '，今年', '岁']
    console.log(values);   // ['张三', 25]
    return '处理后的结果';
}

const name = '张三';
const age = 25;
const result = tag`你好，${name}，今年${age}岁`;
```

### 实用标签函数

```javascript
// 1. 自动转义 HTML
function escapeHtml(strings, ...values) {
    const escape = str => str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    return strings.reduce((acc, str, i) =>
        acc + str + (values[i] ? escape(String(values[i])) : ''),
        ''
    );
}

const userInput = '<script>alert("xss")</script>';
const safe = escapeHtml`<div>${userInput}</div>`;
console.log(safe);  // <div>&lt;script&gt;alert("xss")&lt;/script&gt;</div>

// 2. 国际化
function i18n(strings, ...values) {
    const translations = {
        '你好，': 'Hello, ',
        '，今年': ', age ',
        '岁': ' years old'
    };

    return strings.reduce((acc, str, i) =>
        acc + (translations[str] || str) + (values[i] || ''),
        ''
    );
}

const msg = i18n`你好，${name}，今年${age}岁`;
console.log(msg);  // Hello, 张三，age 25 years old

// 3. JSON 格式化
function json(strings, ...values) {
    return strings.reduce((acc, str, i) =>
        acc + str + JSON.stringify(values[i] ?? ''),
        ''
    );
}

const data = { id: 1 };
console.log(json`用户数据：${data}`);  // 用户数据：{"id":1}
```

---

## 4.3 String 新方法

### 方法总览

```javascript
// includes - 是否包含子串
'hello world'.includes('world');  // true

// startsWith - 是否以指定字符串开头
'hello world'.startsWith('hello');  // true

// endsWith - 是否以指定字符串结尾
'hello world'.endsWith('world');  // true

// repeat - 重复字符串
'ha'.repeat(3);  // 'hahaha'

// padStart - 左侧填充
'5'.padStart(3, '0');  // '005'
'123'.padStart(5, '0');  // '00123'

// padEnd - 右侧填充
'5'.padEnd(3, '0');  // '500'

// trimStart/trimEnd - 去除首尾空白
'  hello  '.trimStart();  // 'hello  '
'  hello  '.trimEnd();    // '  hello'

// replaceAll - 全部替换
'hello world'.replaceAll('l', 'L');  // 'heLLo worLd'
```

### 实用示例

```javascript
// 格式化数字
function formatNumber(num, length = 3) {
    return String(num).padStart(length, '0');
}
console.log(formatNumber(5));      // '005'
console.log(formatNumber(123, 5)); // '00123'

// 隐藏敏感信息
function maskPhone(phone) {
    return String(phone).padStart(11, '*').slice(-4).padStart(11, '*');
}
console.log(maskPhone(13800138000));  // '*******8000'

// 检查文件扩展名
const filename = 'document.pdf';
if (filename.toLowerCase().endsWith('.pdf')) {
    console.log('PDF 文件');
}
```

---

## 4.4 Symbol 基础

### 创建 Symbol

```javascript
// 创建 Symbol
const sym1 = Symbol();
const sym2 = Symbol('description');

console.log(typeof sym1);  // 'symbol'
console.log(sym2.toString());  // 'Symbol(description)'

// 每个 Symbol 都是唯一的
const sym3 = Symbol('id');
const sym4 = Symbol('id');
console.log(sym3 === sym4);  // false
```

### Symbol 作为对象属性

```javascript
// Symbol 属性
const id = Symbol('id');
const user = {
    [id]: 1,
    name: '张三'
};

console.log(user[id]);  // 1
console.log(user.name); // '张三'

// Symbol 属性不会被遍历
console.log(Object.keys(user));        // ['name']
console.log(JSON.stringify(user));     // {"name":"张三"}
console.log(Object.getOwnPropertySymbols(user));  // [Symbol(id)]
```

### 全局 Symbol

```javascript
// 全局 Symbol 注册表
const sym1 = Symbol.for('userId');
const sym2 = Symbol.for('userId');
console.log(sym1 === sym2);  // true

// 获取 Symbol 的 key
const key = Symbol.keyFor(sym1);
console.log(key);  // 'userId'

// 从全局注册表获取
const globalSym = Symbol.keyFor(sym1);
const fromGlobal = Symbol.for(globalSym);
console.log(sym1 === fromGlobal);  // true
```

---

## 4.5 内置 Symbol

### Symbol.iterator

```javascript
// 自定义可迭代对象
const iterable = {
    [Symbol.iterator]() {
        let step = 0;
        return {
            next() {
                step++;
                if (step <= 3) {
                    return { value: step, done: false };
                }
                return { done: true };
            }
        };
    }
};

// 可以使用 for...of
for (const value of iterable) {
    console.log(value);  // 1, 2, 3
}

// 可以使用展开运算符
console.log([...iterable]);  // [1, 2, 3]
```

### Symbol.match 等

```javascript
// Symbol.match - 自定义字符串匹配
class MyMatcher {
    constructor(pattern) {
        this.pattern = pattern;
    }

    [Symbol.match](string) {
        return string.includes(this.pattern);
    }
}

const result = 'hello world'[Symbol.match](new MyMatcher('world'));
console.log(result);  // true

// Symbol.replace - 自定义替换
class Replacer {
    [Symbol.replace](string) {
        return string.replace(/hello/gi, 'Hi');
    }
}

console.log('Hello World'.replace(new Replacer()));  // 'Hi World'

// Symbol.species - 控制派生对象的构造函数
class MyArray extends Array {
    static get [Symbol.species]() {
        return Array;  // 返回原生 Array
    }
}

const myArr = new MyArray(1, 2, 3);
const mapped = myArr.map(x => x * 2);
console.log(mapped instanceof MyArray);  // false
console.log(mapped instanceof Array);    // true
```

---

## 4.6 实践练习

### 练习 1：模板系统

```javascript
// 简单的模板引擎
function template(str, data) {
    return str.replace(/\${(\w+)}/g, (match, key) => {
        return data[key] !== undefined ? data[key] : match;
    });
}

// 使用
const tpl = '你好，${name}！你今年${age}岁。';
const result = template(tpl, { name: '张三', age: 25 });
console.log(result);  // '你好，张三！你今年 25 岁。'

// 支持嵌套属性
function advancedTemplate(str, data) {
    return str.replace(/\${([\w.]+)}/g, (match, path) => {
        return path.split('.').reduce((obj, key) => obj?.[key], data) ?? match;
    });
}

const user = { profile: { name: '张三', age: 25 } };
const result = advancedTemplate('用户：${profile.name}, ${profile.age}岁', user);
console.log(result);  // '用户：张三，25 岁'
```

### 练习 2：CSS-in-JS

```javascript
// 使用标签模板实现简单的 CSS-in-JS
function css(strings, ...values) {
    return strings.reduce((acc, str, i) =>
        acc + str + (values[i] ?? ''),
        ''
    );
}

const color = '#ff0000';
const fontSize = '16px';

const styles = css`
    .button {
        color: ${color};
        font-size: ${fontSize};
        padding: 10px 20px;
    }
`;

console.log(styles);
```

### 练习 3：私有属性模拟

```javascript
// 使用 Symbol 模拟私有属性
const _name = Symbol('name');
const _age = Symbol('age');

class Person {
    constructor(name, age) {
        this[_name] = name;
        this[_age] = age;
    }

    getInfo() {
        return `${this[_name]}, ${this[_age]}岁`;
    }
}

const person = new Person('张三', 25);
console.log(person.getInfo());  // '张三，25 岁'
console.log(person._name);      // undefined（无法直接访问）
console.log(Object.keys(person));  // []（Symbol 属性不显示）
```

---

## 4.7 常见问答

### Q1: 模板字符串中的表达式有什么限制？

**答：** 可以是任何有效的 JavaScript 表达式，包括函数调用、三元运算符等。

```javascript
// 都可以使用
const result = `${fn()} ${a ? 'yes' : 'no'} ${obj?.prop ?? 'default'}`;
```

### Q2: Symbol 属性真的私有吗？

**答：** 不是真正的私有，只是不会在普通遍历中显示。

```javascript
const sym = Symbol('secret');
const obj = { [sym]: 'value' };

// 仍然可以访问
const symbols = Object.getOwnPropertySymbols(obj);
console.log(obj[symbols[0]]);  // 'value'
```

### Q3: 什么时候应该使用 Symbol？

**答：** 主要用于：
1. 创建不会冲突的对象属性
2. 模拟私有属性
3. 自定义迭代器
4. 元编程

### Q4: 标签模板的性能如何？

**答：** 标签函数会在每次使用时执行，适合用于：
- HTML 转义
- 国际化
- SQL 防注入
- 样式处理

---

## 4.8 学习资源

- [MDN - 模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals)
- [MDN - Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [ES6 入门教程 - 模板字符串](https://es6.ruanyifeng.com/#docs/string-template)
- [ES6 入门教程 - Symbol](https://es6.ruanyifeng.com/#docs/symbol)

---

**上一章：** [← 03-解构与展开](./03-解构与展开.md)
**下一章：** [→ 05-Map 与 Set](./05-Map-Set.md)
