# 模板字符串与 Symbol ⭐

> 字符串插值与唯一标识符

---

## 学习目标

- 掌握模板字符串的插值和多行语法
- 理解标签模板的原理和应用
- 掌握 Symbol 的特性和内置 Symbol 的使用

---

## 生活化比喻

**模板字符串就像"填空游戏"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  填空游戏                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    普通字符串 = 固定文字                              │
│    ─────────────                                     │
│    "你好，张三" → 文字是写死的                       │
│                                                      │
│    模板字符串 = 带空格的表格                          │
│    ─────────────                                     │
│    `你好，${name}` → ${} 就是填空的位置              │
│    填什么就显示什么                                   │
│                                                      │
│    标签模板 = 带审核的填空                            │
│    ─────────────                                     │
│    填的内容会先经过审核函数处理                       │
│    比如自动转义 HTML 特殊字符                        │
│                                                      │
│    Symbol = 世界上唯一的印章                          │
│    ─────────────                                     │
│    每次刻出来的印章都是独一无二的                    │
│    即使刻同样的文字，也是两个不同的印章              │
│    盖在文件上不会被其他印章覆盖                      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 模板字符串

**语法结构图：**

```
模板字符串：

`普通文本 ${表达式} 更多文本`
 │            │
 │            └─ 可以放变量、函数调用、三元表达式
 └─ 用反引号包裹

多行：直接换行，不需要 \n
```

**最简示例（1-3行）：**

```javascript
const name = '张三';
`你好，${name}`;  // '你好，张三'
```

**详细示例：**

```javascript
// 插值表达式
const a = 10, b = 20;
`${a} + ${b} = ${a + b}`;           // '10 + 20 = 30'
`${isVip ? 'VIP' : '普通'}用户`;    // 条件表达式

// 多行字符串
const html = `
    <div class="card">
        <h2>${title}</h2>
        <p>${content}</p>
    </div>
`;

// 函数调用
const items = ['苹果', '香蕉'];
`水果：${items.join(', ')}`;  // '水果：苹果, 香蕉'
```

---

### Symbol

**最简示例：**

```javascript
const sym = Symbol('id');
const obj = { [sym]: 123 };
obj[sym];  // 123
```

**详细示例：**

```javascript
// 创建 — 每个 Symbol 都是唯一的
const sym1 = Symbol('id');
const sym2 = Symbol('id');
sym1 === sym2;  // false（即使描述相同）

// 作为对象属性 — 不会与字符串键冲突
const user = {
    name: '张三',
    [sym1]: 'secret'
};
user.name;        // '张三'
user[sym1];       // 'secret'
Object.keys(user); // ['name']（不包含 Symbol 属性）

// 全局 Symbol — 跨文件共享
const globalSym = Symbol.for('app:id');
Symbol.keyFor(globalSym);  // 'app:id'
```

---

## L2 实践层：用好

### String 新方法

| 方法 | 用途 | 示例 |
|------|------|------|
| `includes()` | 是否包含子串 | `'hello'.includes('ell')` → true |
| `startsWith()` | 是否以指定字符串开头 | `'hello'.startsWith('he')` → true |
| `endsWith()` | 是否以指定字符串结尾 | `'hello'.endsWith('lo')` → true |
| `repeat()` | 重复字符串 | `'ha'.repeat(3)` → 'hahaha' |
| `padStart()` | 前面填充 | `'5'.padStart(3, '0')` → '005' |
| `padEnd()` | 后面填充 | `'5'.padEnd(3, '0')` → '500' |
| `replaceAll()` | 全部替换（ES2021） | `'aabb'.replaceAll('a', 'A')` → 'AAbb' |
| `trimStart/End()` | 去除首/尾空白 | `'  hi  '.trimStart()` → 'hi  ' |

### 反模式：不要这样做

```javascript
// ❌ 错误：用字符串拼接构建 HTML（易出错、难读）
const html = '<div class="' + cls + '">' + content + '</div>';

// ✅ 正确：用模板字符串
const html = `<div class="${cls}">${content}</div>`;
```

```javascript
// ❌ 错误：用普通字符串当唯一键
const obj = {};
obj['__my_private_key'] = value;  // 可能与其他代码冲突

// ✅ 正确：用 Symbol
const key = Symbol('my_private_key');
obj[key] = value;  // 绝对不会冲突
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 字符串插值 | 模板字符串 | 简洁可读 |
| 多行文本 | 模板字符串 | 不需要 `\n` |
| HTML 模板 | 模板字符串 | 保持缩进 |
| 避免属性名冲突 | Symbol | 唯一标识 |
| 自定义迭代行为 | `Symbol.iterator` | for...of 协议 |
| 私有属性（ES2022 前） | Symbol | 不会出现在枚举中 |

---

## L3 专家层：深入

### 标签模板原理

```
标签模板执行流程：

tag`Hello ${name}, you are ${age} years old`

↓ 引擎拆分

strings: ['Hello ', ', you are ', ' years old']
values:  [name, age]

↓ 调用函数

tag(strings, ...values)
```

```javascript
// HTML 转义标签
function html(strings, ...values) {
    const escape = str => String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;');
    return strings.reduce((result, s, i) =>
        result + s + (i < values.length ? escape(values[i]) : ''), '');
}

const userInput = '<script>alert(1)</script>';
html`<div>${userInput}</div>`;
// '<div>&lt;script&gt;alert(1)&lt;/script&gt;</div>'
```

### 内置 Symbol

| Symbol | 用途 | 示例 |
|--------|------|------|
| `Symbol.iterator` | 自定义 for...of 行为 | `obj[Symbol.iterator] = function*(){}` |
| `Symbol.toStringTag` | 自定义 Object.prototype.toString | `{[Symbol.toStringTag]: 'MyClass'}` |
| `Symbol.hasInstance` | 自定义 instanceof 行为 | `class X { static [Symbol.hasInstance](v){} }` |
| `Symbol.search` | 自定义 String.prototype.search | |
| `Symbol.match` | 自定义 String.prototype.match | |
| `Symbol.replace` | 自定义 String.prototype.replace | |

### 知识关联

```
模板字符串与 Symbol 关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  模板字符串 │────→│  标签模板   │────→│  字符串方法 │
│  插值/多行  │     │  自定义处理 │     │  includes/  │
│             │     │  HTML 转义  │     │  repeat/    │
└─────────────┘     └─────────────┘     │  padStart   │
                                        └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Symbol     │────→│  作为属性   │────→│  内置 Symbol│
│  唯一标识   │     │  不冲突     │     │  iterator/  │
│             │     │  不可枚举   │     │  hasInstance│
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **模板字符串** | 用反引号包裹的字符串，支持插值和多行 | `` `Hello ${name}` `` |
| **插值表达式** | 模板字符串中的 `${}` 占位符 | `` `${a + b}` `` |
| **标签模板** | 用函数处理模板字符串的语法 | `tag\`Hello ${name}\`` |
| **Symbol** | ES6 引入的原始类型，每个值唯一 | `Symbol('id')` |
| **全局 Symbol** | 通过 `Symbol.for()` 注册的全局唯一 Symbol | `Symbol.for('app:id')` |

---

## 实践练习

### 练习：SQL 构建器 + Symbol 私有属性

```javascript
// 练习 1：SQL 查询构建器（标签模板）
function sql(strings, ...values) {
    return strings.reduce((query, s, i) => {
        const val = i < values.length ? '?' : '';
        return query + s + val;
    }, '');
}

const name = '张三';
const age = 25;
sql`SELECT * FROM users WHERE name = ${name} AND age = ${age}`;
// 'SELECT * FROM users WHERE name = ? AND age = ?'

// 练习 2：Symbol 实现隐藏属性
const _private = Symbol('private');

class EventEmitter {
    constructor() { this[_private] = new Map(); }
    on(event, fn) {
        if (!this[_private].has(event)) this[_private].set(event, []);
        this[_private].get(event).push(fn);
    }
    emit(event, ...args) {
        this[_private].get(event)?.forEach(fn => fn(...args));
    }
}

// 练习 3：自定义迭代器
const fibonacci = {
    *[Symbol.iterator]() {
        let [a, b] = [0, 1];
        while (true) { yield a; [a, b] = [b, a + b]; }
    }
};
const fib = fibonacci[Symbol.iterator]();
[...Array(10)].map(() => fib.next().value);  // [0,1,1,2,3,5,8,13,21,34]
```

---

## 常见问题

### Q1：模板字符串和普通字符串哪个好？

**模板字符串用于插值和多行，普通字符串用于简单固定文本：**

```javascript
const simple = 'Hello World';              // 简单固定
const greeting = `Hello, ${name}!`;        // 需要插值
const multiline = `Line 1\nLine 2`;        // 多行
```

### Q2：Symbol 能被 JSON 序列化吗？

**不能。Symbol 属性会被 JSON.stringify 忽略：**

```javascript
const sym = Symbol('key');
const obj = { [sym]: 'value', name: 'test' };
JSON.stringify(obj);  // '{"name":"test"}'
```

### Q3：Symbol 和私有字段（#）哪个好？

**ES2022+ 优先用私有字段 `#field`，旧环境用 Symbol：**

```javascript
// 现代方式（推荐）
class User { #name; getName() { return this.#name; } }

// 兼容方式
const _name = Symbol('name');
class User { constructor(n) { this[_name] = n; } }
```

---

## 学习资源

- [MDN - 模板字符串](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Template_literals) ⭐ 官方权威
- [MDN - Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [JavaScript.info - Symbol](https://zh.javascript.info/symbol)
