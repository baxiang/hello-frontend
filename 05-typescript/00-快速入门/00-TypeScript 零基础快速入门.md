# TypeScript 零基础快速入门 ⭐

> 5 分钟理解 TypeScript 是什么、为什么用它

---

## 学习目标

- 理解 TypeScript 和 JavaScript 的关系
- 掌握类型注解的基本语法
- 学会安装和运行 TypeScript

---

## 生活化比喻

**TypeScript 就像"智能拼写检查器"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  写作文                               │
├──────────────────────────────────────────────────────┤
│                                                      │
│    JavaScript = 写完直接交                            │
│    ─────────────                                     │
│    没有检查，交上去才发现错别字                      │
│    运行时才报错                                      │
│                                                      │
│    TypeScript = 智能检查器                           │
│    ─────────────                                     │
│    写的时候就会标红提示                             │
│    编译时就发现问题，不用等到运行                    │
│                                                      │
│    类型注解 = 语法标注                                │
│    ─────────────                                     │
│    告诉检查器"这个词是名词"、"那个是动词"           │
│    let name: string → name 是字符串                 │
│                                                      │
│    编译 = 交稿前的最后检查                           │
│    ─────────────                                     │
│    TypeScript 代码 → 编译 → JavaScript 代码         │
│    检查通过才能交                                    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 什么是 TypeScript

**一句话：TypeScript = JavaScript + 类型检查**

```
编译关系：

┌─────────────────┐     编译      ┌─────────────────┐
│   TypeScript   │ ──────────▶  │   JavaScript   │
│   (.ts 文件)    │    tsc       │   (.js 文件)    │
└─────────────────┘              └─────────────────┘
```

### 类型注解

**最简示例（1-3行）：**

```typescript
let name: string = 'Tom';
let age: number = 25;
function greet(name: string): string { return `Hello, ${name}!`; }
```

**详细示例：**

```typescript
// 基础类型
let message: string = 'Hello TypeScript';
let count: number = 42;
let isActive: boolean = true;

// 数组
let numbers: number[] = [1, 2, 3];

// 对象
let user: { name: string; age: number } = { name: 'Tom', age: 25 };

// 函数
function add(a: number, b: number): number {
    return a + b;
}

// 类型推断（可以省略标注）
let inferred = '自动推断为 string';  // 等同于 let inferred: string = ...
```

---

## L2 实践层：用好

### JavaScript vs TypeScript 对比

| 特性 | JavaScript | TypeScript |
|------|-----------|------------|
| 类型检查 | 运行时 | 编译时 |
| 错误发现 | 运行后 | 编写时 |
| IDE 提示 | 基础 | 完整 |
| 重构安全 | 低 | 高 |
| 学习曲线 | 低 | 中 |

### 反模式

```typescript
// ❌ 错误：滥用 any
let data: any = fetchData();
data.foo();  // 编译通过，运行时报错

// ✅ 正确：定义具体类型
interface Data { foo: string }
let data: Data = fetchData();
data.foo;  // 编译通过，运行也安全
```

### 适用场景

| 场景 | 推荐 | 原因 |
|------|------|------|
| 新项目 | TypeScript | 从一开始就有类型保护 |
| 老项目迁移 | 渐进式添加 | 先用 `.ts` 扩展名，逐步加类型 |
| 快速原型 | 类型推断 | 先写逻辑，后补类型 |

---

## L3 专家层：深入

### 编译流程

```
TypeScript 编译流程：

.ts 文件 → 词法分析 → 语法分析 → 类型检查 → 代码生成 → .js 文件

关键点：
1. 类型检查在编译时进行，不影响运行时性能
2. 编译后的 .js 文件不包含任何类型信息
3. TypeScript 只是 JavaScript 的"超集"
```

### 知识关联

```
TypeScript 学习路径：

快速入门 → 类型基础 → 接口与对象 → 函数类型 → 泛型编程
    ↓          ↓           ↓           ↓          ↓
  是什么    类型注解    对象建模    函数签名    类型复用
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **类型注解** | 告诉 TypeScript 变量/参数的类型 | `let x: number` |
| **类型推断** | TypeScript 自动推断类型 | `let x = 5` 推断为 number |
| **编译** | 将 .ts 转换为 .js 的过程 | `tsc file.ts` |
| **超集** | TypeScript 包含 JavaScript 的所有功能 | JS 代码在 TS 中合法 |

---

## 实践练习

```typescript
// 练习 1：基础类型
let title: string = 'TypeScript 入门';
let version: number = 5.0;
let isStable: boolean = true;

// 练习 2：函数类型
function greet(name: string): string {
    return `Hello, ${name}!`;
}
console.log(greet('Tom'));

// 练习 3：对象类型
let config: { port: number; host: string } = {
    port: 3000,
    host: 'localhost'
};
```

---

## 常见问题

### Q1：TypeScript 和 JavaScript 什么关系？

**TypeScript 是 JavaScript 的超集，所有 JS 代码都是合法的 TS 代码。TS 编译后生成 JS。**

### Q2：类型标注是不是多余的工作？

**类型标注在编写时增加了一点工作量，但能减少大量运行时 bug。大型项目中收益远大于成本。**

### Q3：什么时候用类型推断，什么时候手动标注？

**简单变量用推断（`let x = 5`），函数参数和返回值建议标注（`function fn(x: number): string`）。**

---

## 学习资源

- [TypeScript 官方文档](https://www.typescriptlang.org/) ⭐ 官方权威
- [TypeScript Playground](https://www.typescriptlang.org/play) - 在线练习
