# ES6+ 系统学习教程

> 现代 JavaScript 特性完整学习路线：从 ES6 到 ES2024

---

## 教程特色

- **系统化学习** - 从 ES6 基础到最新特性，循序渐进
- **实战导向** - 每章都有实际应用场景和练习
- **对比学习** - 对比 ES5 和 ES6+ 写法差异
- **现代实践** - 掌握现代前端开发必备的 JavaScript 技能
- **全面覆盖** - 14 章完整内容，涵盖 ES6-ES2024 所有重要特性

---

## 完整学习路线

```
基础篇（第 1-4 章）              数据结构篇（第 5-6 章）           函数与面向对象（第 7-8 章）
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 1 章       │          │ 第 5 章       │           │ 第 7 章       │
│ let/const    │ ──────▶  │ Map/Set      │ ──────▶   │ 函数进阶     │
│ 块级作用域   │          │ WeakMap      │           │ 柯里化/组合  │
└─────────────┘          └─────────────┘           └─────────────┘
       │                        │                         │
       ▼                        ▼                         ▼
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 2 章       │          │ 第 6 章       │           │ 第 8 章       │
│ 箭头函数     │ ──────▶  │ 数组与对象   │ ──────▶   │ Class 类     │
│ this 绑定    │          │ 新方法       │           │ 继承/私有字段│
└─────────────┘          └─────────────┘           └─────────────┘
       │                        │                         │
       ▼                        ▼                         ▼
┌─────────────┐
│ 第 3 章       │
│ 解构与展开   │
│ 剩余参数     │
└─────────────┘
       │
       ▼
┌─────────────┐
│ 第 4 章       │
│ 模板字符串   │
│ Symbol       │
└─────────────┘

异步编程篇（第 9-10 章）          元编程与模块（第 11-12 章）       新特性与工具（第 13-14 章）
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 9 章       │          │ 第 11 章      │           │ 第 13 章      │
│ Promise      │ ──────▶  │ Proxy        │ ──────▶   │ ES2017-2024  │
│ async/await  │          │ Reflect      │           │ 历年新特性   │
└─────────────┘          └─────────────┘           └─────────────┘
       │                        │                         │
       ▼                        ▼                         ▼
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 10 章      │          │ 第 12 章      │           │ 第 14 章      │
│ 生成器       │ ──────▶  │ 模块化系统   │ ──────▶   │ 正则增强     │
│ 迭代器       │          │ import/export│           │ TypedArray   │
└─────────────┘          └─────────────┘           └─────────────┘
```

---

## 章节详情

### 基础篇（第 1-4 章）

#### 第 1 章：let/const 与作用域
掌握现代变量声明方式和作用域概念。

| 小节 | 内容 | 难度 |
|------|------|------|
| 1.1 | var 的问题与 let/const 的诞生 | ⭐ |
| 1.2 | let 的基本用法与特性 | ⭐ |
| 1.3 | const 的基本用法与注意事项 | ⭐ |
| 1.4 | 块级作用域详解 | ⭐⭐ |
| 1.5 | 暂时性死区（TDZ） | ⭐⭐ |
| 1.6 | var vs let vs const 对比表 | ⭐ |
| 1.7 | 全局对象与全局变量 | ⭐⭐ |
| 1.8 | 循环中的作用域问题 | ⭐⭐⭐ |
| 1.9 | 实践练习 | ⭐⭐ |
| 1.10 | 常见问答 | ⭐⭐ |

**学习目标：**
- 理解 let 和 const 的区别
- 掌握块级作用域的概念
- 理解暂时性死区
- 能够正确选择变量声明方式

---

#### 第 2 章：箭头函数
学习箭头函数的语法和 this 绑定规则。

| 小节 | 内容 | 难度 |
|------|------|------|
| 2.1 | 箭头函数语法基础 | ⭐ |
| 2.2 | 单表达式与函数体块 | ⭐ |
| 2.3 | this 绑定机制（词法绑定） | ⭐⭐⭐ |
| 2.4 | 与普通函数的核心区别 | ⭐⭐⭐ |
| 2.5 | arguments 对象的继承 | ⭐⭐ |
| 2.6 | 不能作为构造函数 | ⭐⭐ |
| 2.7 | 适用场景与不适用场景 | ⭐⭐ |
| 2.8 | 实践练习 | ⭐⭐ |
| 2.9 | 常见问答 | ⭐⭐ |

**学习目标：**
- 掌握箭头函数的语法
- 理解 this 绑定规则
- 能够正确使用箭头函数
- 了解使用场景和注意事项

---

#### 第 3 章：解构赋值与展开运算符
掌握高效的赋值和拷贝技巧。

| 小节 | 内容 | 难度 |
|------|------|------|
| 3.1 | 数组解构基础 | ⭐ |
| 3.2 | 对象解构基础 | ⭐ |
| 3.3 | 嵌套解构 | ⭐⭐ |
| 3.4 | 默认值与解构失败 | ⭐⭐ |
| 3.5 | 剩余参数（rest） | ⭐⭐ |
| 3.6 | 展开运算符（数组） | ⭐⭐ |
| 3.7 | 展开运算符（对象） | ⭐⭐ |
| 3.8 | 函数参数解构 | ⭐⭐⭐ |
| 3.9 | 实用技巧与场景 | ⭐⭐ |
| 3.10 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握数组和对象的解构
- 理解展开运算符的用法
- 能够使用剩余参数
- 学会在函数参数中解构

---

#### 第 4 章：模板字符串与 Symbol
学习新的字符串表示和唯一标识符。

| 小节 | 内容 | 难度 |
|------|------|------|
| 4.1 | 模板字符串基础 | ⭐ |
| 4.2 | 表达式插值 | ⭐ |
| 4.3 | 多行字符串 | ⭐ |
| 4.4 | 标签模板函数 | ⭐⭐⭐ |
| 4.5 | 内置标签（String.raw） | ⭐⭐ |
| 4.6 | String 新方法 | ⭐⭐ |
| 4.7 | Symbol 类型基础 | ⭐⭐⭐ |
| 4.8 | Symbol.for 与 Symbol.keyFor | ⭐⭐⭐ |
| 4.9 | 内置 Symbol 值 | ⭐⭐⭐ |
| 4.10 | Symbol 作为私有属性 | ⭐⭐⭐ |
| 4.11 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握模板字符串的用法
- 了解标签模板函数
- 理解 Symbol 的特性和用途
- 能够使用 Symbol 创建唯一标识

---

### 数据结构篇（第 5-6 章）

#### 第 5 章：Map、Set 与 WeakMap
掌握新的数据结构。

| 小节 | 内容 | 难度 |
|------|------|------|
| 5.1 | Map 基础操作 | ⭐⭐ |
| 5.2 | Map 遍历 | ⭐⭐ |
| 5.3 | Map vs Object 对比 | ⭐⭐ |
| 5.4 | Set 基础操作 | ⭐⭐ |
| 5.5 | Set 运算（并集/交集/差集） | ⭐⭐⭐ |
| 5.6 | WeakMap 特性与应用 | ⭐⭐⭐ |
| 5.7 | WeakSet 特性与应用 | ⭐⭐⭐ |
| 5.8 | 实际应用场景 | ⭐⭐⭐ |
| 5.9 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握 Map 和 Set 的使用
- 理解 WeakMap 和 WeakSet 的特性
- 能够进行集合运算
- 了解实际应用场景

---

#### 第 6 章：数组与对象新方法（新增）
掌握 ES6+ 新增的数组和对象方法。

| 小节 | 内容 | 难度 |
|------|------|------|
| 6.1 | Array.from 与 Array.of | ⭐⭐ |
| 6.2 | find/findIndex/findLast | ⭐⭐ |
| 6.3 | includes | ⭐ |
| 6.4 | entries/keys/values | ⭐⭐ |
| 6.5 | flat/flatMap | ⭐⭐⭐ |
| 6.6 | at() 方法 | ⭐ |
| 6.7 | ES2023 数组新方法 | ⭐⭐⭐ |
| 6.8 | Object.assign | ⭐⭐ |
| 6.9 | Object.entries/Object.values | ⭐⭐ |
| 6.10 | Object.fromEntries | ⭐⭐⭐ |
| 6.11 | Object.hasOwn | ⭐⭐ |
| 6.12 | 可选链操作符 ?. | ⭐⭐⭐ |
| 6.13 | 空值合并操作符 ?? | ⭐⭐ |
| 6.14 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握 ES6+ 新增的数组方法
- 掌握 ES6+ 新增的对象方法
- 理解 ES2023 数组新方法的使用场景
- 能够灵活运用可选链和空值合并操作符

---

### 函数与面向对象篇（第 7-8 章）

#### 第 7 章：函数进阶（新增）
深入理解 ES6+ 函数的特性与高级用法。

| 小节 | 内容 | 难度 |
|------|------|------|
| 7.1 | 参数默认值 | ⭐⭐ |
| 7.2 | rest 参数详解 | ⭐⭐ |
| 7.3 | 展开运算符在函数中的应用 | ⭐⭐ |
| 7.4 | name 与 length 属性 | ⭐⭐ |
| 7.5 | 尾调用优化（了解） | ⭐⭐⭐ |
| 7.6 | 函数柯里化 | ⭐⭐⭐ |
| 7.7 | 函数组合 | ⭐⭐⭐ |
| 7.8 | IIFE 现代写法 | ⭐⭐ |
| 7.9 | 实践练习 | ⭐⭐⭐ |

**学习目标：**
- 掌握参数默认值与 rest 参数的用法
- 理解展开运算符在函数中的应用
- 掌握函数的 name 与 length 属性
- 掌握函数柯里化与组合的技巧

---

#### 第 8 章：Class 类与继承
学习面向对象编程的新语法。

| 小节 | 内容 | 难度 |
|------|------|------|
| 8.1 | class 基础语法 | ⭐⭐ |
| 8.2 | 构造函数与实例 | ⭐⭐ |
| 8.3 | 实例方法和静态方法 | ⭐⭐ |
| 8.4 | getter 和 setter | ⭐⭐⭐ |
| 8.5 | 继承（extends） | ⭐⭐⭐ |
| 8.6 | super 关键字详解 | ⭐⭐⭐ |
| 8.7 | 私有字段（#） | ⭐⭐⭐ |
| 8.8 | 静态块 | ⭐⭐⭐ |
| 8.9 | 类的表达式 | ⭐⭐ |
| 8.10 | 抽象类模拟 | ⭐⭐⭐ |
| 8.11 | 实践练习 | ⭐⭐⭐ |

**学习目标：**
- 掌握 class 的基本语法
- 理解继承和 super 的用法
- 能够使用 getter 和 setter
- 了解私有字段的定义

---

### 异步编程篇（第 9-10 章）

#### 第 9 章：Promise 与 async/await
掌握异步编程的核心概念和最佳实践。

| 小节 | 内容 | 难度 |
|------|------|------|
| 9.1 | 异步编程演进 | ⭐⭐ |
| 9.2 | Promise 基础概念与状态 | ⭐⭐⭐ |
| 9.3 | then/catch/finally 链式调用 | ⭐⭐⭐ |
| 9.4 | Promise 静态方法 | ⭐⭐⭐ |
| 9.5 | Promise.all 并行处理 | ⭐⭐⭐ |
| 9.6 | Promise.allSettled 等待所有完成 | ⭐⭐⭐ |
| 9.7 | Promise.race 竞速 | ⭐⭐⭐ |
| 9.8 | Promise.any 任意一个成功 | ⭐⭐⭐ |
| 9.9 | async/await 语法 | ⭐⭐⭐ |
| 9.10 | async/await 错误处理 | ⭐⭐⭐ |
| 9.11 | 并行执行优化 | ⭐⭐⭐⭐ |
| 9.12 | async 迭代器与 for await...of | ⭐⭐⭐ |
| 9.13 | 微任务与宏任务（事件循环） | ⭐⭐⭐⭐ |
| 9.14 | 实践练习 | ⭐⭐⭐ |

**学习目标：**
- 理解 Promise 的三种状态
- 掌握 Promise 链式调用
- 熟练使用 async/await
- 能够进行 Promise 组合和错误处理

---

#### 第 10 章：生成器与迭代器（新增）
理解 JavaScript 的迭代协议与生成器函数。

| 小节 | 内容 | 难度 |
|------|------|------|
| 10.1 | Iterable 协议 | ⭐⭐⭐ |
| 10.2 | Iterator 协议 | ⭐⭐⭐ |
| 10.3 | 自定义迭代器 | ⭐⭐⭐ |
| 10.4 | 生成器函数基础 | ⭐⭐⭐ |
| 10.5 | next() 方法与返回值 | ⭐⭐⭐ |
| 10.6 | yield* 委托生成 | ⭐⭐⭐ |
| 10.7 | 生成器的应用场景 | ⭐⭐⭐⭐ |
| 10.8 | 异步生成器 | ⭐⭐⭐⭐ |
| 10.9 | 实践练习 | ⭐⭐⭐ |

**学习目标：**
- 理解 Iterable 与 Iterator 协议
- 掌握自定义迭代器的方法
- 熟练使用生成器函数
- 理解 yield 与 yield* 的用法

---

### 元编程与模块化篇（第 11-12 章）

#### 第 11 章：Proxy 与 Reflect（新增）
掌握 JavaScript 元编程的核心工具。

| 小节 | 内容 | 难度 |
|------|------|------|
| 11.1 | Proxy 基础概念 | ⭐⭐⭐ |
| 11.2 | 常用拦截器 | ⭐⭐⭐⭐ |
| 11.3 | Reflect 基础 | ⭐⭐⭐ |
| 11.4 | Proxy 与 Reflect 配合使用 | ⭐⭐⭐⭐ |
| 11.5 | Proxy 应用：数据验证 | ⭐⭐⭐ |
| 11.6 | Proxy 应用：响应式原理 | ⭐⭐⭐⭐ |
| 11.7 | Proxy 应用：API 代理 | ⭐⭐⭐ |
| 11.8 | 实践练习 | ⭐⭐⭐⭐ |

**学习目标：**
- 理解 Proxy 的基本概念和工作原理
- 掌握常用拦截器的用法
- 理解 Reflect API 的作用
- 能够使用 Proxy 实现数据验证、响应式等应用

---

#### 第 12 章：模块化系统
掌握 ES6 模块系统及其与 CommonJS 的对比。

| 小节 | 内容 | 难度 |
|------|------|------|
| 12.1 | ES6 Module 基础概念 | ⭐⭐ |
| 12.2 | export 导出（具名/默认） | ⭐⭐ |
| 12.3 | import 导入（各种语法） | ⭐⭐ |
| 12.4 | 重命名导出/导入 | ⭐⭐ |
| 12.5 | 批量导出/导入 | ⭐⭐ |
| 12.6 | 动态导入 import() | ⭐⭐⭐ |
| 12.7 | 模块加载过程（了解） | ⭐⭐⭐ |
| 12.8 | 循环依赖处理 | ⭐⭐⭐ |
| 12.9 | CommonJS vs ES6 Module 深度对比 | ⭐⭐⭐ |
| 12.10 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握 import/export 语法
- 理解默认导出和命名导出的区别
- 能够使用动态导入
- 了解 ES6 Module 与 CommonJS 的区别

---

### 新特性与工具篇（第 13-14 章）

#### 第 13 章：ES2017-ES2024 新特性
了解历年新增的实用特性。

| 小节 | 内容 | 难度 |
|------|------|------|
| 13.1 | ES2017: Object.values/entries, String padding | ⭐⭐ |
| 13.2 | ES2017: Async 函数 | ⭐⭐⭐ |
| 13.3 | ES2018: 对象展开，Promise.finally | ⭐⭐ |
| 13.4 | ES2018: 异步迭代 | ⭐⭐⭐ |
| 13.5 | ES2019: flat/flatMap, Object.fromEntries | ⭐⭐⭐ |
| 13.6 | ES2019: Optional catch | ⭐⭐ |
| 13.7 | ES2020: Optional chaining, Nullish coalescing | ⭐⭐⭐ |
| 13.8 | ES2020: BigInt, Promise.allSettled | ⭐⭐⭐ |
| 13.9 | ES2021: replaceAll, 逻辑赋值运算符 | ⭐⭐⭐ |
| 13.10 | ES2022: 顶层 await, 类字段增强 | ⭐⭐⭐ |
| 13.11 | ES2023: 数组新方法 | ⭐⭐⭐ |
| 13.12 | ES2024: 正则表达式增强，数组分组 | ⭐⭐⭐ |
| 13.13 | 实践练习 | ⭐⭐⭐ |

**学习目标：**
- 了解 ES2017-ES2024 的新特性
- 掌握常用新特性的用法
- 能够在新项目中使用现代语法

---

#### 第 14 章：正则表达式与类型化数组（新增）
掌握 ES2018+ 正则增强特性与二进制数据处理。

| 小节 | 内容 | 难度 |
|------|------|------|
| 14.1 | 点号匹配换行符（dotAll） | ⭐⭐ |
| 14.2 | 后行断言（Lookbehind） | ⭐⭐⭐ |
| 14.3 | 命名捕获组 | ⭐⭐ |
| 14.4 | Unicode 属性转义 | ⭐⭐⭐ |
| 14.5 | String.matchAll | ⭐⭐⭐ |
| 14.6 | RegExp 新属性 | ⭐⭐ |
| 14.7 | ArrayBuffer 基础 | ⭐⭐⭐ |
| 14.8 | TypedArray | ⭐⭐⭐ |
| 14.9 | DataView | ⭐⭐⭐ |
| 14.10 | 实际应用场景 | ⭐⭐⭐⭐ |
| 14.11 | Intl API 简介 | ⭐⭐ |
| 14.12 | 实践练习 | ⭐⭐⭐ |

**学习目标：**
- 掌握 ES2018+ 正则表达式的新特性
- 理解后行断言、命名捕获组等高级用法
- 理解 ArrayBuffer 与 TypedArray 的基础
- 了解二进制数据处理的实际场景

---

## 学习路径建议

### 入门阶段（2-3 周）
```
第 1 章 → 第 2 章 → 第 3 章 → 第 4 章
```
**目标：** 掌握 ES6 基础语法，能够编写现代 JavaScript 代码

**建议：**
- 理解 let/const 和块级作用域
- 熟练使用箭头函数
- 掌握解构赋值和展开运算符
- 理解模板字符串和 Symbol

---

### 进阶阶段（2-3 周）
```
第 5 章 → 第 6 章 → 第 7 章 → 第 8 章
```
**目标：** 掌握数据结构和面向对象编程

**建议：**
- 理解 Map/Set 与 Object/Array 的区别
- 掌握 class 继承和 super 的用法
- 学习数组和对象的新方法
- 了解函数柯里化和组合

---

### 高级阶段（3-4 周）
```
第 9 章 → 第 10 章 → 第 11 章 → 第 12 章
```
**目标：** 掌握异步编程、迭代器、元编程和模块化

**建议：**
- 深入理解 Promise 和 async/await
- 掌握生成器和迭代器
- 理解 Proxy 和 Reflect 的元编程能力
- 掌握 ES6 Module 的工作方式

---

### 拓展阶段（1-2 周）
```
第 13 章 → 第 14 章
```
**目标：** 了解历年新特性和高级主题

**建议：**
- 关注每年 JavaScript 的新增特性
- 学习正则表达式高级用法
- 了解二进制数据处理

---

## 开发环境准备

### 安装 Node.js

```bash
# 下载安装包：https://nodejs.org/
# 推荐使用 LTS 版本（18.x 或更高）

# 查看版本
node -v
npm -v
```

### 项目配置

```json
// package.json
{
  "name": "es6-learning",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --experimental-modules src/index.js",
    "build": "babel src -d dist"
  },
  "devDependencies": {
    "@babel/cli": "^7.x",
    "@babel/core": "^7.x",
    "@babel/preset-env": "^7.x"
  }
}
```

### Babel 配置

```javascript
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: '> 0.25%, not dead',
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ]
};
```

### VS Code 配置

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "eslint.validate": ["javascript"],
  "javascript.updateImportsOnFileMove.enabled": "always"
}
```

---

## 常用代码片段

### 解构与展开

```javascript
// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// 对象解构
const { name, age, city = '北京' } = user;

// 展开运算符
const newArr = [...oldArr, 4, 5, 6];
const newObj = { ...oldObj, c: 3 };
```

### 箭头函数

```javascript
// 基本语法
const add = (a, b) => a + b;

// 返回对象
const getUser = () => ({ name: '张三' });

// 与 this
class Counter {
  constructor() {
    this.count = 0;
    setInterval(() => {
      this.count++;  // 这里的 this 是 Counter 实例
    }, 1000);
  }
}
```

### Promise 与 async/await

```javascript
// Promise 链
fetch('/api/user')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await
async function getUser() {
  try {
    const res = await fetch('/api/user');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// 并行执行
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);
```

### 可选链与空值合并

```javascript
// 可选链
const city = user?.address?.city ?? '未知城市';

// 空值合并
const name = userName ?? '匿名用户';

// 逻辑赋值
a ??= b;  // 等价于 a = a ?? b
a ||= b;  // 等价于 a = a || b
a &&= b;  // 等价于 a = a && b
```

---

## 最佳实践

### ✅ 推荐做法

```javascript
// 1. 使用 const 和 let
const config = { debug: true };
let count = 0;

// 2. 使用箭头函数
const multiply = (a, b) => a * b;

// 3. 使用模板字符串
console.log(`Hello, ${name}!`);

// 4. 使用解构
const { name, age } = person;
const [first, ...rest] = arr;

// 5. 使用展开运算符
const merged = { ...obj1, ...obj2 };
const newArr = [...arr1, ...arr2];

// 6. 使用 async/await
async function fetchData() {
  const res = await fetch(url);
  return res.json();
}

// 7. 使用可选链
const value = data?.items?.[0]?.name ?? 'default';

// 8. 使用模块化
import { foo } from './module.js';
export const bar = 'bar';

// 9. 使用新方法的数组操作
const result = arr
  .filter(x => x > 0)
  .map(x => x * 2)
  .toSorted((a, b) => a - b);
```

### ❌ 避免做法

```javascript
// 1. 避免使用 var
var x = 1;  // ❌
const x = 1; // ✅

// 2. 避免使用 function 声明
function add(a, b) { return a + b; }  // ❌
const add = (a, b) => a + b;          // ✅

// 3. 避免回调地狱
getData(() => {
  getMore(() => {
    // 嵌套过深 ❌
  });
});
// 使用 Promise 链或 async/await ✅

// 4. 避免使用 arguments
function fn() {
  console.log(arguments);  // ❌
}
// 使用剩余参数
const fn = (...args) => args;  // ✅

// 5. 避免修改原型
Array.prototype.myMethod = () => {};  // ❌
```

---

## ES5 vs ES6+ 对比

### 变量声明

```javascript
// ES5
var name = '张三';

// ES6+
const name = '张三';
```

### 字符串拼接

```javascript
// ES5
var greeting = '你好，' + name + '！';

// ES6+
const greeting = `你好，${name}！`;
```

### 函数定义

```javascript
// ES5
var add = function(a, b) {
  return a + b;
};

// ES6+
const add = (a, b) => a + b;
```

### 对象方法

```javascript
// ES5
var obj = {
  name: '张三',
  sayHello: function() {
    console.log('你好');
  }
};

// ES6+
const obj = {
  name: '张三',
  sayHello() {
    console.log('你好');
  }
};
```

### 模块化

```javascript
// ES5 (CommonJS)
var module = require('./module');
module.exports = { foo: 'foo' };

// ES6+
import module from './module';
export const foo = 'foo';
```

### 异步编程

```javascript
// ES5 (回调)
getData(function(err, data) {
  if (err) throw err;
  processData(data, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
});

// ES6+ (Promise)
getData()
  .then(data => processData(data))
  .then(result => console.log(result))
  .catch(err => console.error(err));

// ES8+ (async/await)
try {
  const data = await getData();
  const result = await processData(data);
  console.log(result);
} catch (err) {
  console.error(err);
}
```

---

## 浏览器兼容性

| 特性 | Chrome | Firefox | Safari | Edge |
|------|--------|---------|--------|------|
| let/const | 49+ | 44+ | 10+ | 14+ |
| 箭头函数 | 45+ | 45+ | 10+ | 12+ |
| 模板字符串 | 41+ | 34+ | 9+ | 12+ |
| 解构赋值 | 49+ | 41+ | 10+ | 14+ |
| Promise | 32+ | 29+ | 8+ | 12+ |
| async/await | 55+ | 52+ | 10.1+ | 15+ |
| 模块化 | 61+ | 67+ | 11+ | 16+ |
| Proxy | 49+ | 18+ | 10+ | 12+ |
| 生成器 | 39+ | 26+ | 10+ | 12+ |

> 注：旧浏览器可通过 Babel 转译使用 ES6+ 语法

---

## 学习资源

### 官方文档
- [MDN JavaScript 教程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [ECMAScript 规范](https://tc39.es/ecma262/)
- [Babel 文档](https://babeljs.io/docs/)

### 在线课程
- [ES6 入门教程 - 阮一峰](https://es6.ruanyifeng.com/)
- [JavaScript.info](https://zh.javascript.info/)
- [freeCodeCamp](https://www.freecodecamp.org/)

### 社区资源
- [Stack Overflow - JavaScript](https://stackoverflow.com/questions/tagged/javascript)
- [掘金 - JavaScript](https://juejin.cn/tag/JavaScript)
- [GitHub 优质项目](https://github.com/topics/es6)

### 工具推荐
- [Babel REPL](https://babeljs.io/repl) - 在线转译
- [TypeScript Playground](https://www.typescriptlang.org/play/) - 在线运行
- [Can I use](https://caniuse.com/) - 兼容性查询
- [V8 JavaScript Engine](https://v8.dev/) - 了解 JavaScript 引擎工作原理

---

**上一篇：** [← 03-javascript/](../03-javascript/)
**下一篇：** [→ 05-typescript/](../05-typescript/)

---

## 更新日志

### v2.0 - 2024 年重构
- 新增第 6 章：数组与对象新方法
- 新增第 7 章：函数进阶
- 新增第 10 章：生成器与迭代器
- 新增第 11 章：Proxy 与 Reflect
- 新增第 14 章：正则表达式与类型化数组
- 重构第 13 章：扩展到 ES2024 特性
- 优化所有章节结构和代码示例
