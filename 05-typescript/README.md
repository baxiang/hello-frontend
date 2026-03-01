# TypeScript 系统学习教程

> 从入门到精通的完整 TypeScript 类型系统学习路线

---

## 教程特色

- **系统化学习** - 从基础类型到高级类型，循序渐进
- **实战导向** - 每章都有实际应用场景和练习
- **类型安全** - 培养类型思维，写出更安全的代码
- **现代实践** - 涵盖 TypeScript 5.x 最新特性

---

## 完整学习路线

```
基础篇                    进阶篇                      高级篇
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 1 章       │          │ 第 3 章       │           │ 第 5 章       │
│ 基础类型     │ ──────▶  │ 类型别名     │ ──────▶   │ 类型守卫     │
│             │          │ 联合类型     │           │ 高级类型     │
└─────────────┘          └─────────────┘           └─────────────┘
       │                        │                         │
       ▼                        ▼                         ▼
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 2 章       │          │ 第 4 章       │           │ 第 6 章       │
│ 接口         │ ──────▶  │ 泛型         │ ──────▶   │ 装饰器       │
└─────────────┘          └─────────────┘           └─────────────┘
```

---

## 章节详情

### 基础篇

#### 第 1 章：基础类型
掌握 TypeScript 的基本数据类型和类型系统基础。

| 小节 | 内容 | 难度 |
|------|------|------|
| 1.1 | 布尔类型 | ⭐ |
| 1.2 | 数字类型 | ⭐ |
| 1.3 | 字符串类型 | ⭐ |
| 1.4 | 数组 | ⭐⭐ |
| 1.5 | 元组（Tuple） | ⭐⭐ |
| 1.6 | 枚举（Enum） | ⭐⭐ |
| 1.7 | any - 任意类型 | ⭐ |
| 1.8 | unknown - 未知类型 | ⭐⭐ |
| 1.9 | void - 空值 | ⭐ |
| 1.10 | null 和 undefined | ⭐ |
| 1.11 | never - 永不存在的值 | ⭐⭐⭐ |
| 1.12 | object 类型 | ⭐⭐ |
| 1.13 | 类型推断 | ⭐⭐ |
| 1.14 | 类型断言 | ⭐⭐ |

**学习目标：**
- 理解 TypeScript 类型系统的基本概念
- 能够正确使用各种基础类型
- 理解类型推断和类型断言的区别

---

#### 第 2 章：接口
学习如何定义对象结构和契约。

| 小节 | 内容 | 难度 |
|------|------|------|
| 2.1 | 接口基础 | ⭐⭐ |
| 2.2 | 可选属性 | ⭐⭐ |
| 2.3 | 只读属性 | ⭐⭐ |
| 2.4 | 函数类型接口 | ⭐⭐⭐ |
| 2.5 | 接口继承 | ⭐⭐⭐ |
| 2.6 | 实现接口（implements） | ⭐⭐⭐ |
| 2.7 | 混合类型接口 | ⭐⭐⭐⭐ |
| 2.8 | 接口 vs 类型别名 | ⭐⭐ |

**学习目标：**
- 掌握接口的定义和使用
- 理解接口继承和多接口实现
- 能够正确使用接口描述复杂数据结构

---

### 进阶篇

#### 第 3 章：类型别名与联合类型
深入学习类型别名、联合类型和映射类型。

| 小节 | 内容 | 难度 |
|------|------|------|
| 3.1 | type 基础用法 | ⭐⭐ |
| 3.2 | 联合类型 | ⭐⭐⭐ |
| 3.3 | 交叉类型 | ⭐⭐⭐ |
| 3.4 | 映射类型基础 | ⭐⭐⭐⭐ |
| 3.5 | 常用工具类型 | ⭐⭐⭐ |
| 3.6 | 自定义工具类型 | ⭐⭐⭐⭐ |
| 3.7 | 模板字面量类型 | ⭐⭐⭐⭐ |
| 3.8 | 条件类型 | ⭐⭐⭐⭐⭐ |

**学习目标：**
- 理解联合类型和交叉类型的区别
- 掌握内置工具类型的使用
- 能够自定义复杂的工具类型

---

#### 第 4 章：泛型
掌握泛型的概念和应用，编写可复用的类型安全代码。

| 小节 | 内容 | 难度 |
|------|------|------|
| 4.1 | 泛型基础 | ⭐⭐⭐ |
| 4.2 | 泛型接口 | ⭐⭐⭐ |
| 4.3 | 泛型类 | ⭐⭐⭐ |
| 4.4 | 泛型约束（extends） | ⭐⭐⭐⭐ |
| 4.5 | 泛型工具类型 | ⭐⭐⭐⭐ |
| 4.6 | 高级泛型技巧 | ⭐⭐⭐⭐⭐ |

**学习目标：**
- 理解泛型的概念和使用场景
- 掌握泛型约束和条件类型
- 能够编写通用的泛型工具函数

---

### 高级篇

#### 第 5 章：类型守卫与高级类型
掌握类型收窄技术和高级类型编程技巧。

| 小节 | 内容 | 难度 |
|------|------|------|
| 5.1 | typeof 类型守卫 | ⭐⭐ |
| 5.2 | instanceof 守卫 | ⭐⭐ |
| 5.3 | in 操作符守卫 | ⭐⭐⭐ |
| 5.4 | 类型谓词（is） | ⭐⭐⭐⭐ |
| 5.5 | 可辨识联合 | ⭐⭐⭐⭐ |
| 5.6 | 类型收窄综合应用 | ⭐⭐⭐⭐ |
| 5.7 | 条件类型深入 | ⭐⭐⭐⭐⭐ |
| 5.8 | infer 推断 | ⭐⭐⭐⭐⭐ |
| 5.9 | 高级映射类型 | ⭐⭐⭐⭐⭐ |
| 5.10 | 类型编程实战 | ⭐⭐⭐⭐⭐ |

**学习目标：**
- 掌握各种类型守卫技术
- 理解可辨识联合和 exhaustiveness checking
- 能够编写复杂的条件类型和映射类型

---

#### 第 6 章：装饰器（选学）
了解装饰器的概念和在框架中的应用。

| 小节 | 内容 | 难度 |
|------|------|------|
| 6.1 | 装饰器基础 | ⭐⭐⭐ |
| 6.2 | 类装饰器 | ⭐⭐⭐⭐ |
| 6.3 | 方法装饰器 | ⭐⭐⭐⭐ |
| 6.4 | 属性装饰器 | ⭐⭐⭐⭐ |
| 6.5 | 参数装饰器 | ⭐⭐⭐⭐ |
| 6.6 | 装饰器组合 | ⭐⭐⭐⭐⭐ |
| 6.7 | 元数据反射 | ⭐⭐⭐⭐⭐ |

**学习目标：**
- 理解装饰器的工作原理
- 掌握装饰器的使用场景
- 了解装饰器在框架中的应用

---

## 学习路径建议

### 入门阶段（1-2 周）
```
第 1 章 → 第 2 章
```
**目标：** 掌握基础类型和接口，能够给代码添加类型注解

**建议：**
- 每学一个类型就动手写代码练习
- 尝试将已有的 JavaScript 代码改造为 TypeScript
- 理解编译错误，学会阅读类型信息

---

### 进阶阶段（2-3 周）
```
第 3 章 → 第 4 章
```
**目标：** 掌握联合类型、工具类型和泛型，编写可复用的类型安全代码

**建议：**
- 学习使用内置工具类型（Partial、Pick、Omit 等）
- 理解泛型约束的应用场景
- 在项目中尝试使用泛型函数和泛型接口

---

### 高级阶段（2-3 周）
```
第 5 章 → 第 6 章
```
**目标：** 掌握高级类型技术，理解类型系统的设计思想

**建议：**
- 深入学习类型守卫和类型收窄
- 理解条件类型和 infer 的用法
- 装饰器可以选学，了解原理即可

---

## 开发环境准备

### 安装 TypeScript

```bash
# 全局安装
npm install -g typescript

# 项目安装
npm install --save-dev typescript

# 查看版本
tsc --version
```

### 配置文件

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### VS Code 配置

```json
// .vscode/settings.json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

### 推荐插件

- **ESLint** - 代码检查
- **Prettier** - 代码格式化
- **TypeScript Hero** - 导入管理
- **Error Lens** - 错误提示增强

---

## 类型系统速查表

### 基础类型
| 类型 | 描述 | 示例 |
|------|------|------|
| `boolean` | 布尔值 | `true`, `false` |
| `number` | 数字 | `42`, `3.14` |
| `string` | 字符串 | `"hello"` |
| `null` | 空值 | `null` |
| `undefined` | 未定义 | `undefined` |
| `void` | 无返回值 | `(): void` |
| `never` | 永不发生 | `(): never` |
| `unknown` | 未知类型 | 类型安全的 `any` |
| `any` | 任意类型 | 不推荐使用 |

### 内置工具类型
| 工具类型 | 作用 | 示例 |
|----------|------|------|
| `Partial<T>` | 所有属性可选 | `Partial<User>` |
| `Required<T>` | 所有属性必填 | `Required<User>` |
| `Readonly<T>` | 所有属性只读 | `Readonly<User>` |
| `Pick<T, K>` | 选取指定属性 | `Pick<User, 'id' \| 'name'>` |
| `Omit<T, K>` | 排除指定属性 | `Omit<User, 'password'>` |
| `Exclude<T, U>` | 排除联合类型 | `Exclude<string \| number, number>` |
| `Extract<T, U>` | 提取联合类型 | `Extract<string \| number, number>` |
| `NonNullable<T>` | 排除 null/undefined | `NonNullable<string \| null>` |
| `ReturnType<T>` | 获取返回类型 | `ReturnType<() => string>` |
| `Parameters<T>` | 获取参数类型 | `Parameters<(a: string) => void>` |

---

## 最佳实践

### ✅ 推荐做法

```typescript
// 1. 使用 strict 模式
// tsconfig.json: "strict": true

// 2. 优先使用 interface 定义对象类型
interface User {
  id: number;
  name: string;
}

// 3. 使用 readonly 保护不可变数据
interface Config {
  readonly apiUrl: string;
}

// 4. 使用 unknown 代替 any
function safeParse(json: string): unknown {
  return JSON.parse(json);
}

// 5. 使用类型守卫收窄类型
function process(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// 6. 使用泛型提高代码复用性
function identity<T>(arg: T): T {
  return arg;
}
```

### ❌ 避免做法

```typescript
// 1. 避免使用 any
let data: any;  // ❌
let data: unknown;  // ✅

// 2. 避免类型断言滥用
const name = value as string;  // 谨慎使用

// 3. 避免复杂的嵌套条件类型
// 保持类型定义简洁可读

// 4. 避免忽略编译错误
// 认真理解每个错误的含义
```

---

## 学习资源

### 官方文档
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript 中文文档](https://www.typescriptlang.org/zh/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play/)

### 在线课程
- [TypeScript 官方教程](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Type Challenges](https://github.com/type-challenges/type-challenges) - 类型编程练习

### 社区资源
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Effective TypeScript](https://effectivetypescript.com/)
- [Total TypeScript](https://www.totaltypescript.com/)

---

## 版本兼容性

本教程基于 TypeScript 5.x 编写，大部分内容向下兼容 TypeScript 4.x。

| 特性 | 最低版本 |
|------|----------|
| 基础类型 | 所有版本 |
| 泛型 | 所有版本 |
| 映射类型 | 2.1+ |
| 条件类型 | 2.8+ |
| infer | 2.8+ |
| 模板字面量类型 | 4.1+ |
| as const | 3.4+ |
|  satisfies | 4.9+ |

---

**上一篇：** [← 04-es6+/](../04-es6+/)
**下一篇：** [→ 01-基础类型](./01-基础类型.md)
