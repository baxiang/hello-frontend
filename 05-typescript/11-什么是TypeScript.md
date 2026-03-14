# 什么是 TypeScript

> 本章时长：30分钟 | 难度：⭐

---

## 本章目标

- 理解 TypeScript 是什么
- 理解 TypeScript 与 JavaScript 的关系
- 理解为什么需要 TypeScript

---

## 1.1 TypeScript 定义

### 一句话理解

**TypeScript = JavaScript + 类型系统**

TypeScript 是 JavaScript 的"增强版"，给代码添加了"自动检查"功能。

### 官方定义

> TypeScript is a strongly typed programming language that builds on JavaScript.

TypeScript 是建立在 JavaScript 基础之上的强类型编程语言。

---

## 1.2 与 JavaScript 的关系

### 编译关系

```
┌─────────────────┐     编译      ┌─────────────────┐
│   TypeScript   │ ──────────▶  │   JavaScript   │
│   (.ts 文件)    │    tsc       │   (.js 文件)    │
└─────────────────┘              └─────────────────┘
```

TypeScript 最终编译为 JavaScript，在浏览器或 Node.js 中运行。

### 代码对比

```javascript
// JavaScript
function add(a, b) {
    return a + b;
}

add(1, 2);      // 3 ✅
add(1, '2');    // '12' ❌ 字符串拼接，不是数字相加
add('1', '2');  // '12' ❌
```

```typescript
// TypeScript
function add(a: number, b: number): number {
    return a + b;
}

add(1, 2);      // 3 ✅
add(1, '2');    // ❌ 编译错误：类型 'string' 不能赋值给类型 'number'
add('1', '2');  // ❌ 编译错误：类型 'string' 不能赋值给类型 'number'
```

---

## 1.3 为什么需要 TypeScript

### JavaScript 的问题

```javascript
// 一个看似正常的函数
function getUser(id) {
    return {
        id: id,
        name: 'Tom',
        age: 25
    };
}

// 调用时可能出错
const user = getUser(1);
console.log(user.nmae);  // ❌ 拼写错误，运行时返回 undefined
```

### TypeScript 的解决方案

```typescript
interface User {
    id: number;
    name: string;
    age: number;
}

function getUser(id: number): User {
    return {
        id: id,
        name: 'Tom',
        age: 25
    };
}

const user = getUser(1);
console.log(user.nmae);  // ❌ 编译错误：属性 'nmae' 不存在于类型 'User'
```

### 生活化类比

```
JavaScript 就像：
┌──────────────────────────────────────┐
│  写完作文直接交卷                      │
│  老师批改时才发现错别字、语病           │
│  运行代码时才报错                      │
└──────────────────────────────────────┘

TypeScript 就像：
┌──────────────────────────────────────┐
│  有一个智能助手帮你检查                │
│  写的时候就会提示"这里可能有错"        │
│  编译时就发现问题                      │
└──────────────────────────────────────┘
```

---

## 1.4 TypeScript 的优势

### 1. 提前发现错误

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

```typescript
// 重命名属性时，TypeScript 会提示所有使用的地方
interface User {
    id: number;
    // 改名为 userId，所有引用处都会报错提示
}
```

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

## 1.5 TypeScript 的局限性

### 需要编译

```
TypeScript 代码 → 编译 → JavaScript → 浏览器运行
```

增加了编译步骤，但现代构建工具可以自动处理。

### 不是所有浏览器都支持

编译后的 JavaScript 可以在任何浏览器运行，但部分新特性需要配置目标版本。

### 学习曲线

需要学习类型系统，但对于有 Java/C++ 等静态语言背景的开发者很友好。

---

## 1.6 快速体验

### 在线 Playground

访问 [TypeScript Playground](https://www.typescriptlang.org/play/) 直接体验：

```typescript
// 1. 定义类型
interface User {
    name: string;
    age: number;
}

// 2. 使用类型
function greet(user: User): string {
    return `Hello, ${user.name}! You are ${user.age} years old.`;
}

// 3. 调用函数
const result = greet({ name: 'Tom', age: 25 });
console.log(result);
```

尝试修改代码，观察错误提示。

---

## 本章小结

| 概念 | 说明 |
|------|------|
| TypeScript | JavaScript 的超集，添加了类型系统 |
| 编译 | TypeScript → JavaScript |
| 优势 | 提前发现错误、代码提示、重构安全 |
| 局限 | 需要编译、有学习曲线 |

---

## 下一章

[→ 12-开发环境搭建](./12-开发环境搭建.md)

---

## 练习

1. 访问 TypeScript Playground，尝试编写带类型注解的代码
2. 故意写错类型，观察错误提示
3. 思考：你的项目中哪些场景适合使用 TypeScript？