# TypeScript 零基础快速入门

> 完全不懂 TypeScript？从这里开始！5 分钟理解 TypeScript 是什么、为什么用它

---

## 一、TypeScript 是什么？

### 用一句话理解

**TypeScript = JavaScript + 类型检查**

> TypeScript 是 JavaScript 的"增强版"，给代码添加了"自动检查"功能

### 官方定义

> TypeScript is a strongly typed programming language that builds on JavaScript.

TypeScript 是建立在 JavaScript 基础之上的强类型编程语言。

### 编译关系

```
┌─────────────────┐     编译      ┌─────────────────┐
│   TypeScript   │ ──────────▶  │   JavaScript   │
│   (.ts 文件)    │    tsc       │   (.js 文件)    │
└─────────────────┘              └─────────────────┘
```

TypeScript 最终编译为 JavaScript，在浏览器或 Node.js 中运行。

### 生活例子

```
想象你在写作文：

JavaScript 就像：
- 写完作文直接交
- 老师批改时才发现错别字、语病
- 运行时才发现问题

TypeScript 就像：
- 有一个智能助手帮你检查
- 写的时候就会提示"这里可能有错"
- 编译时就发现问题
```

---

## 二、为什么需要 TypeScript？

### JavaScript 的问题

```javascript
// JavaScript 代码
function add(a, b) {
    return a + b;
}

// 调用时
add(1, 2);        // 3 ✅ 正确
add(1, '2');      // '12' ❌ 可能不是你想要的
add('1', '2');    // '12' ❌ 字符串拼接了
```

**问题：** 代码没有报错，但结果可能不对！

### TypeScript 的解决方案

```typescript
// TypeScript 代码
function add(a: number, b: number): number {
    return a + b;
}

// 调用时
add(1, 2);        // ✅ 正确
add(1, '2');      // ❌ 编译报错：类型 'string' 不能赋值给类型 'number'
```

**好处：** 写代码时就发现问题，不用等到运行！

### 对比图

```
┌─────────────────────────────────────────────────────┐
│                    JavaScript                        │
├─────────────────────────────────────────────────────┤
│  写代码 → 运行 → 发现问题 → 修复 → 重新运行         │
│            ↑                                        │
│            └────── 问题在运行时才暴露               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                    TypeScript                        │
├─────────────────────────────────────────────────────┤
│  写代码 → 检查 → 发现问题 → 修复 → 编译 → 运行      │
│            ↑                                        │
│            └────── 问题在写代码时就发现             │
└─────────────────────────────────────────────────────┘
```

---

## 三、TypeScript 的优势

### 1. 提前发现错误

在编译阶段就能发现类型错误，而不是等到运行时。

### 2. 代码提示

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

const user: User = {
    id: 1,
    name: 'Tom',
    // 输入 user. 时，编辑器会自动提示 id、name、email
};
```

### 3. 重构更安全

重命名属性时，TypeScript 会提示所有使用的地方，避免遗漏。

### 4. 更好的协作

```
场景：你写了一个函数，同事来调用

不用 TypeScript：
- 同事不知道参数应该传什么类型
- 传错了，运行时才报错
- 需要花时间调试

用了 TypeScript：
- 编辑器自动提示参数类型
- 传错了，立刻标红提示
- 省去了调试时间
```

---

## 四、TypeScript 的局限性

### 需要编译

```
TypeScript 代码 → 编译 → JavaScript → 浏览器运行
```

增加了编译步骤，但现代构建工具（Vite、Webpack）可以自动处理。

### 学习曲线

需要学习类型系统，但对于有 Java/C++ 等静态语言背景的开发者很友好。

### 不是所有浏览器都支持

编译后的 JavaScript 可以在任何浏览器运行，但部分新特性需要配置目标版本。

---

## 五、TypeScript 的核心概念

### 1. 类型注解 - 告诉 TS 这是什么类型

```typescript
// 语法：变量名: 类型

// 字符串
let name: string = '张三';

// 数字
let age: number = 25;

// 布尔
let isActive: boolean = true;

// 如果类型不对，会立刻报错
let count: number = 'hello';  // ❌ 报错
```

### 2. 接口 - 定义对象的形状

```typescript
// 定义一个"用户"应该有什么属性
interface User {
    id: number;
    name: string;
    age: number;
}

// 符合接口
const user1: User = {
    id: 1,
    name: '张三',
    age: 25
};

// 不符合接口 - 会报错
const user2: User = {
    id: 1,
    name: '张三'
    // ❌ 报错：缺少 age 属性
};
```

### 3. 类型推断 - TS 自动猜类型

```typescript
// 不用写类型，TS 会自动猜
let name = '张三';    // TS 知道这是 string
let age = 25;         // TS 知道这是 number

// 如果后面赋值类型不对，会报错
name = 123;  // ❌ 报错：不能把 number 赋值给 string
```

---

## 六、TypeScript 快速体验

### 在线体验（无需安装）

1. 打开 [TypeScript Playground](https://www.typescriptlang.org/play/)
2. 在左边写代码
3. 右边立刻看到结果和错误提示

### 第一个 TypeScript 程序

```typescript
// 1. 定义类型
interface Person {
    name: string;
    age: number;
}

// 2. 创建函数
function greet(person: Person): string {
    return `你好，${person.name}！你今年${person.age}岁。`;
}

// 3. 使用
const user: Person = {
    name: '张三',
    age: 25
};

console.log(greet(user));
// 输出：你好，张三！你今年 25 岁。
```

---

## 七、TypeScript 基础语法速查

### 基本类型

```typescript
// 字符串
let str: string = 'hello';

// 数字
let num: number = 42;

// 布尔
let bool: boolean = true;

// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<string> = ['a', 'b', 'c'];

// 任意类型（不推荐）
let any: any = '可以是任何值';

// 空值（函数没有返回值）
function log(): void {
    console.log('hello');
}

// 永不发生（抛出错误）
function error(): never {
    throw new Error('出错了');
}
```

### 对象和接口

```typescript
// 定义接口
interface User {
    id: number;
    name: string;
    email?: string;  // ? 表示可选
}

// 使用接口
const user: User = {
    id: 1,
    name: '张三'
    // email 可选，可以不写
};
```

### 函数

```typescript
// 基本函数
function add(a: number, b: number): number {
    return a + b;
}

// 箭头函数
const multiply = (a: number, b: number): number => a * b;

// 可选参数
function greet(name: string, greeting?: string): string {
    return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
}

// 默认参数
function sayHi(name: string = '访客'): string {
    return `你好，${name}`;
}
```

---

## 八、常见错误和解决方法

### 错误 1：类型不匹配

```typescript
let age: number = 25;
age = 'hello';  // ❌ 错误

// 解决：确保类型一致
age = 26;  // ✅
```

### 错误 2：缺少属性

```typescript
interface User {
    id: number;
    name: string;
}

const user: User = {
    id: 1
    // ❌ 错误：缺少 name 属性
};

// 解决：补全属性
const user: User = {
    id: 1,
    name: '张三'
};
```

### 错误 3：属性不存在

```typescript
interface User {
    id: number;
    name: string;
}

const user: User = { id: 1, name: '张三' };
console.log(user.email);  // ❌ 错误：User 没有 email 属性

// 解决：在接口中添加属性
interface User {
    id: number;
    name: string;
    email?: string;  // 添加可选属性
}
```

### 错误 4：函数参数类型不对

```typescript
function add(a: number, b: number): number {
    return a + b;
}

add(1, '2');  // ❌ 错误：第二个参数应该是 number

// 解决：传入正确的类型
add(1, 2);  // ✅
```

---

## 九、学习建议

### 初学者路线图

```
第 1 步：理解类型注解
  ↓
第 2 步：学会定义接口
  ↓
第 3 步：掌握函数类型
  ↓
第 4 步：理解泛型
  ↓
第 5 步：学习高级类型
```

### 学习技巧

1. **从简单开始** - 先给变量和函数添加简单类型
2. **善用错误提示** - TS 报错时，仔细阅读错误信息
3. **利用编辑器** - VS Code 会自动提示类型
4. **循序渐进** - 先用起来，再深入学习

---

## 十、常见问题

### Q1: TypeScript 和 JavaScript 能一起用吗？

**答：** 可以！TypeScript 是 JavaScript 的超集，所有 JavaScript 代码都是有效的 TypeScript 代码。

### Q2: TypeScript 会影响性能吗？

**答：** 不会！TypeScript 编译后会变成纯 JavaScript，运行时代码完全一样。类型信息在编译时被移除。

### Q3: 小项目需要用 TypeScript 吗？

**答：** 看情况：
- 学习项目可以先用 JavaScript
- 可能长期维护的项目建议用 TypeScript
- TypeScript 能帮助项目变大时保持代码质量

### Q4: TypeScript 难学吗？

**答：** 入门简单，精通需要时间：
- 基础语法：1-2 天
- 熟练使用：1-2 周
- 掌握高级特性：1-2 月

---

**祝你学习愉快！** 🎉

---

**上一篇：** [← TypeScript 学习路线](./README.md)
**下一篇：** [→ 开发环境搭建](./开发环境搭建.md)