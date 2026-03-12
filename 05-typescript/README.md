# TypeScript 系统学习教程

> 从入门到精通的完整 TypeScript 类型系统学习路线 · 基于 TypeScript 5.x

---

## 教程特色

- **全面系统化** - 从基础语法到高级类型编程，循序渐进
- **实战导向** - 每章都有实际应用场景和项目实战
- **最新特性** - 涵盖 TypeScript 5.x 新特性（const 参数、satisfies 等）
- **类型安全** - 培养类型思维，写出更安全的代码
- **详细讲解** - 每章 12-15 个小节，知识点无死角

---

## 完整学习路线

```
入门篇                    基础篇                      进阶篇
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 1 章       │          │ 第 2 章       │           │ 第 4 章       │
│ 入门与环境   │ ──────▶  │ 基础类型     │ ──────▶   │ 类型别名     │
│ 配置        │          │ 详解        │           │ 联合类型     │
└─────────────┘          └─────────────┘           └─────────────┘
       │                        │                         │
       ▼                        ▼                         ▼
┌─────────────┐          ┌─────────────┐           ┌─────────────┐
│ 第 3 章       │          │ 第 5 章       │           │ 第 6 章       │
│ 接口与对象  │ ──────▶  │ 泛型编程     │ ──────▶   │ 类型守卫     │
│ 类型        │          │            │           │ 类型收窄     │
└─────────────┘          └─────────────┘           └─────────────┘

高级篇                    实战篇
┌─────────────┐          ┌─────────────┐
│ 第 7 章       │          │ 第 9 章       │
│ 高级类型     │ ──────▶  │ 装饰器       │
│ 编程        │          │            │
└─────────────┘          └─────────────┘
       │                        │
       ▼                        ▼
┌─────────────┐          ┌─────────────┐
│ 第 8 章       │          │ 第 10 章      │
│ 工具类型     │ ──────▶  │ 实战与最佳   │
│ 深度解析     │          │ 实践        │
└─────────────┘          └─────────────┘
```

---

## 章节详情

### 入门篇

#### 第 1 章：TypeScript 入门与环境配置
**难度：** ⭐⭐ | **预计时间：** 2-3 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 1.1 | TypeScript 简介与优势 | ⭐ |
| 1.2 | JavaScript 与 TypeScript 的关系 | ⭐ |
| 1.3 | 安装 TypeScript | ⭐ |
| 1.4 | 第一个 TypeScript 程序 | ⭐ |
| 1.5 | tsconfig.json 详解 | ⭐⭐ |
| 1.6 | 严格模式配置 | ⭐⭐ |
| 1.7 | 编译选项详解 | ⭐⭐ |
| 1.8 | 类型检查与类型推断 | ⭐⭐ |
| 1.9 | 使用 tsc 编译项目 | ⭐⭐ |
| 1.10 | 集成 VS Code | ⭐ |
| 1.11 | 集成 ESLint + Prettier | ⭐⭐ |
| 1.12 | 常见编译错误与解决 | ⭐⭐ |
| 1.13 | 实践练习：搭建 TS 项目 | ⭐⭐ |
| 1.14 | 常见问答 | ⭐⭐ |

**学习目标：**
- 理解 TypeScript 的核心价值和适用场景
- 掌握 TypeScript 开发环境的搭建
- 能够配置 tsconfig.json 和常用工具
- 完成第一个 TypeScript 项目的搭建

---

#### 第 2 章：基础类型详解
**难度：** ⭐⭐ | **预计时间：** 4-5 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 2.1 | 布尔类型（boolean） | ⭐ |
| 2.2 | 数字类型（number） | ⭐ |
| 2.3 | 字符串类型（string） | ⭐ |
| 2.4 | 数组类型 | ⭐⭐ |
| 2.5 | 元组类型（Tuple） | ⭐⭐ |
| 2.6 | 枚举类型（Enum） | ⭐⭐ |
| 2.7 | any 类型与使用场景 | ⭐ |
| 2.8 | unknown 类型与安全实践 | ⭐⭐ |
| 2.9 | void 与 undefined | ⭐ |
| 2.10 | null 与严格空值检查 | ⭐ |
| 2.11 | never 类型与应用场景 | ⭐⭐⭐ |
| 2.12 | object 与内置对象类型 | ⭐⭐ |
| 2.13 | 字面量类型 | ⭐⭐ |
| 2.14 | 类型推断 | ⭐⭐ |
| 2.15 | 类型断言 | ⭐⭐ |
| 2.16 | const 断言（as const） | ⭐⭐⭐ |
| 2.17 | 实践练习 | ⭐⭐ |

**学习目标：**
- 掌握所有基础类型的使用
- 理解 any、unknown、never 的区别
- 学会类型推断和类型断言
- 理解字面量类型和 const 断言

---

#### 第 3 章：接口与对象类型
**难度：** ⭐⭐⭐ | **预计时间：** 4-5 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 3.1 | 接口基础 | ⭐⭐ |
| 3.2 | 可选属性与只读属性 | ⭐⭐ |
| 3.3 | 函数类型接口 | ⭐⭐⭐ |
| 3.4 | 接口继承 | ⭐⭐⭐ |
| 3.5 | 实现接口（implements） | ⭐⭐⭐ |
| 3.6 | 混合类型接口 | ⭐⭐⭐⭐ |
| 3.7 | 接口与类型别名的区别 | ⭐⭐ |
| 3.8 | 索引签名 | ⭐⭐⭐ |
| 3.9 | 接口描述函数 | ⭐⭐⭐ |
| 3.10 | 接口描述类 | ⭐⭐⭐ |
| 3.11 | 泛型接口 | ⭐⭐⭐ |
| 3.12 | 接口在 React/Vue 中的应用 | ⭐⭐⭐ |
| 3.13 | 实践练习：API 类型定义 | ⭐⭐⭐ |
| 3.14 | 常见问答 | ⭐⭐ |

**学习目标：**
- 掌握接口的定义和使用
- 理解接口继承和多接口实现
- 能够使用接口描述复杂数据结构
- 学会在框架中使用接口

---

### 进阶篇

#### 第 4 章：类型别名与联合类型
**难度：** ⭐⭐⭐ | **预计时间：** 5-6 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 4.1 | type 基础用法 | ⭐⭐ |
| 4.2 | 联合类型 | ⭐⭐⭐ |
| 4.3 | 交叉类型 | ⭐⭐⭐ |
| 4.4 | 字面量联合类型 | ⭐⭐⭐ |
| 4.5 | 类型别名泛型 | ⭐⭐⭐ |
| 4.6 | 映射类型基础 | ⭐⭐⭐⭐ |
| 4.7 | 映射类型修饰符 | ⭐⭐⭐⭐ |
| 4.8 | 模板字面量类型 | ⭐⭐⭐⭐ |
| 4.9 | 键的重映射（as 子句） | ⭐⭐⭐⭐ |
| 4.10 | 条件类型基础 | ⭐⭐⭐⭐⭐ |
| 4.11 | infer 推断 | ⭐⭐⭐⭐⭐ |
| 4.12 | 分布式条件类型 | ⭐⭐⭐⭐⭐ |
| 4.13 | 实践练习：类型转换 | ⭐⭐⭐⭐ |
| 4.14 | 常见问答 | ⭐⭐⭐ |

**学习目标：**
- 理解联合类型和交叉类型的区别
- 掌握映射类型和模板字面量类型
- 理解条件类型和 infer 推断
- 能够进行基础类型编程

---

#### 第 5 章：泛型编程
**难度：** ⭐⭐⭐⭐ | **预计时间：** 6-7 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 5.1 | 为什么使用泛型 | ⭐⭐⭐ |
| 5.2 | 泛型函数 | ⭐⭐⭐ |
| 5.3 | 泛型接口 | ⭐⭐⭐ |
| 5.4 | 泛型类 | ⭐⭐⭐ |
| 5.5 | 泛型约束（extends） | ⭐⭐⭐⭐ |
| 5.6 | keyof 约束 | ⭐⭐⭐⭐ |
| 5.7 | 默认泛型参数 | ⭐⭐⭐ |
| 5.8 | 泛型工具类型 | ⭐⭐⭐⭐ |
| 5.9 | 高级泛型技巧 | ⭐⭐⭐⭐⭐ |
| 5.10 | 泛型与条件类型 | ⭐⭐⭐⭐⭐ |
| 5.11 | 泛型在 API 中的应用 | ⭐⭐⭐⭐ |
| 5.12 | 泛型在 React 中的应用 | ⭐⭐⭐⭐ |
| 5.13 | 实践练习：通用缓存 | ⭐⭐⭐⭐ |
| 5.14 | 常见问答 | ⭐⭐⭐ |

**学习目标：**
- 理解泛型的概念和使用场景
- 掌握泛型约束和条件类型
- 能够编写通用的泛型工具函数
- 学会在框架中使用泛型

---

#### 第 6 章：类型守卫与类型收窄
**难度：** ⭐⭐⭐⭐ | **预计时间：** 5-6 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 6.1 | 类型守卫概述 | ⭐⭐ |
| 6.2 | typeof 类型守卫 | ⭐⭐ |
| 6.3 | instanceof 守卫 | ⭐⭐ |
| 6.4 | in 操作符守卫 | ⭐⭐⭐ |
| 6.5 | 类型谓词（is） | ⭐⭐⭐⭐ |
| 6.6 | 可辨识联合 | ⭐⭐⭐⭐ |
| 6.7 | 相等性检查 | ⭐⭐ |
| 6.8 | 真值检查 | ⭐⭐ |
| 6.9 | 完整性检查（exhaustive） | ⭐⭐⭐⭐ |
| 6.10 | 类型收窄实战 | ⭐⭐⭐⭐ |
| 6.11 | 自定义类型守卫 | ⭐⭐⭐⭐ |
| 6.12 | 实践练习：状态机 | ⭐⭐⭐⭐ |
| 6.13 | 常见问答 | ⭐⭐⭐ |

**学习目标：**
- 掌握各种类型守卫技术
- 理解可辨识联合和完整性检查
- 能够编写自定义类型守卫
- 在实际项目中应用类型收窄

---

### 高级篇

#### 第 7 章：高级类型编程
**难度：** ⭐⭐⭐⭐⭐ | **预计时间：** 8-10 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 7.1 | 类型编程概述 | ⭐⭐⭐ |
| 7.2 | 条件类型深入 | ⭐⭐⭐⭐⭐ |
| 7.3 | infer 高级用法 | ⭐⭐⭐⭐⭐ |
| 7.4 | 递归类型 | ⭐⭐⭐⭐⭐ |
| 7.5 | 高级映射类型 | ⭐⭐⭐⭐⭐ |
| 7.6 | 模板字面量类型进阶 | ⭐⭐⭐⭐ |
| 7.7 | 字符串工具类型 | ⭐⭐⭐⭐ |
| 7.8 | 数组类型编程 | ⭐⭐⭐⭐⭐ |
| 7.9 | 元组类型编程 | ⭐⭐⭐⭐⭐ |
| 7.10 | 类型挑战练习 | ⭐⭐⭐⭐⭐ |
| 7.11 | 性能优化 | ⭐⭐⭐⭐⭐ |
| 7.12 | 实践练习：类型工具库 | ⭐⭐⭐⭐⭐ |
| 7.13 | 常见问答 | ⭐⭐⭐⭐ |

**学习目标：**
- 掌握高级类型编程技巧
- 能够编写复杂的条件类型和映射类型
- 理解递归类型和类型性能优化
- 完成类型挑战练习

---

#### 第 8 章：工具类型深度解析
**难度：** ⭐⭐⭐⭐ | **预计时间：** 5-6 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 8.1 | 内置工具类型概览 | ⭐⭐ |
| 8.2 | Partial / Required / Readonly | ⭐⭐ |
| 8.3 | Pick / Omit | ⭐⭐⭐ |
| 8.4 | Record / Map / Set | ⭐⭐⭐ |
| 8.5 | Exclude / Extract / NonNullable | ⭐⭐⭐ |
| 8.6 | Parameters / ReturnType | ⭐⭐⭐ |
| 8.7 | InstanceType / ThisType | ⭐⭐⭐ |
| 8.8 | Awaited / Unwrap | ⭐⭐⭐ |
| 8.9 | 自定义工具类型 | ⭐⭐⭐⭐ |
| 8.10 | DeepPartial / DeepReadonly | ⭐⭐⭐⭐ |
| 8.11 | 实用工具类型库 | ⭐⭐⭐⭐ |
| 8.12 | 实践练习：工具类型实现 | ⭐⭐⭐⭐ |
| 8.13 | 常见问答 | ⭐⭐⭐ |

**学习目标：**
- 掌握所有内置工具类型的使用
- 理解工具类型的实现原理
- 能够自定义工具类型
- 构建自己的工具类型库

---

#### 第 9 章：装饰器（选学）
**难度：** ⭐⭐⭐⭐ | **预计时间：** 4-5 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 9.1 | 装饰器基础 | ⭐⭐⭐ |
| 9.2 | 类装饰器 | ⭐⭐⭐⭐ |
| 9.3 | 方法装饰器 | ⭐⭐⭐⭐ |
| 9.4 | 属性装饰器 | ⭐⭐⭐⭐ |
| 9.5 | 参数装饰器 | ⭐⭐⭐⭐ |
| 9.6 | 访问器装饰器 | ⭐⭐⭐⭐ |
| 9.7 | 装饰器组合 | ⭐⭐⭐⭐⭐ |
| 9.8 | 装饰器工厂 | ⭐⭐⭐⭐ |
| 9.9 | 元数据反射 | ⭐⭐⭐⭐⭐ |
| 9.10 | 依赖注入 | ⭐⭐⭐⭐⭐ |
| 9.11 | 在 NestJS 中的应用 | ⭐⭐⭐⭐⭐ |
| 9.12 | 实践练习：AOP 切面 | ⭐⭐⭐⭐⭐ |
| 9.13 | 常见问答 | ⭐⭐⭐⭐ |

**学习目标：**
- 理解装饰器的工作原理
- 掌握各类装饰器的使用方法
- 能够使用装饰器实现 AOP 切面编程
- 了解装饰器在框架中的应用

---

### 实战篇

#### 第 10 章：TypeScript 实战与最佳实践
**难度：** ⭐⭐⭐⭐ | **预计时间：** 6-8 小时

| 小节 | 内容 | 难度 |
|------|------|------|
| 10.1 | TypeScript 项目结构 | ⭐⭐ |
| 10.2 | 类型定义文件（.d.ts） | ⭐⭐⭐ |
| 10.3 | 第三方库类型定义 | ⭐⭐⭐ |
| 10.4 | 渐进式迁移策略 | ⭐⭐⭐ |
| 10.5 | React + TypeScript 实践 | ⭐⭐⭐⭐ |
| 10.6 | Vue + TypeScript 实践 | ⭐⭐⭐⭐ |
| 10.7 | Node.js + TypeScript 实践 | ⭐⭐⭐⭐ |
| 10.8 | 测试中的 TypeScript | ⭐⭐⭐ |
| 10.9 | 代码规范与检查 | ⭐⭐⭐ |
| 10.10 | 性能优化技巧 | ⭐⭐⭐⭐ |
| 10.11 | 常见陷阱与解决方案 | ⭐⭐⭐⭐ |
| 10.12 | 实战项目：博客 API | ⭐⭐⭐⭐⭐ |
| 10.13 | 实战项目：前端组件库 | ⭐⭐⭐⭐⭐ |
| 10.14 | 学习资源与进阶 | ⭐⭐⭐ |

**学习目标：**
- 掌握 TypeScript 项目最佳实践
- 学会在主流框架中使用 TypeScript
- 能够进行 JavaScript 到 TypeScript 的迁移
- 完成完整的 TypeScript 实战项目

---

## 学习路径建议

### 入门阶段（1-2 周）
```
第 1 章 → 第 2 章 → 第 3 章
```
**目标：** 掌握基础类型和接口，能够给代码添加类型注解

**建议：**
- 每学一个类型就动手写代码练习
- 尝试将已有的 JavaScript 代码改造为 TypeScript
- 理解编译错误，学会阅读类型信息
- 完成每章的实践练习

---

### 进阶阶段（2-3 周）
```
第 4 章 → 第 5 章 → 第 6 章
```
**目标：** 掌握联合类型、工具类型和泛型，编写可复用的类型安全代码

**建议：**
- 学习使用内置工具类型（Partial、Pick、Omit 等）
- 理解泛型约束的应用场景
- 在项目中尝试使用泛型函数和泛型接口
- 掌握类型守卫技术

---

### 高级阶段（3-4 周）
```
第 7 章 → 第 8 章 → 第 9 章 → 第 10 章
```
**目标：** 掌握高级类型技术，理解类型系统的设计思想

**建议：**
- 深入学习类型编程和条件类型
- 完成类型挑战练习
- 装饰器可以选学，了解原理即可
- 完成实战项目

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

### 基础配置文件

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["node"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
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
    "source.organizeImports": "explicit",
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.preferences.quoteStyle": "single"
}
```

### ESLint 配置

```javascript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
```

### Prettier 配置

```javascript
// .prettierrc
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  parser: 'typescript',
};
```

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
| `symbol` | 唯一标识 | `Symbol('id')` |
| `bigint` | 大整数 | `100n` |

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
| `InstanceType<T>` | 获取实例类型 | `InstanceType<typeof MyClass>` |
| `Record<K, T>` | 键值对类型 | `Record<string, number>` |
| `Awaited<T>` | 解包 Promise | `Awaited<Promise<string>>` |
| `Capitalize<T>` | 首字母大写 | `Capitalize<'hello'>` |

### TS 5.x 新特性
| 特性 | 版本 | 描述 |
|------|------|------|
| `const` 参数 | 5.0 | 泛型参数的常量推断 |
| `satisfies` | 4.9 | 类型验证操作符 |
| 模板字面量改进 | 5.0 | 更好的推断 |
| 自动推断改进 | 5.0 | 更精确的类型推断 |

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

// 7. 使用 satisfies 验证类型
const config = {
  port: 3000,
  host: 'localhost'
} satisfies { port: number; host: string };

// 8. 使用 as const 推断字面量类型
const roles = ['admin', 'user'] as const;
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

// 5. 避免过度工程化
// 类型系统是为代码服务的
```

---

## 学习资源

### 官方文档
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript 中文文档](https://www.typescriptlang.org/zh/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### 在线练习
- [Type Challenges](https://github.com/type-challenges/type-challenges) - 类型编程挑战
- [TypeScript Exercises](https://typescript-exercises.github.io/) - 交互式练习
- [StackBlitz](https://stackblitz.com/) - 在线开发环境

### 社区资源
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Effective TypeScript](https://effectivetypescript.com/)
- [Total TypeScript](https://www.totaltypescript.com/)
- [TypeScript Weekly](https://www.typescriptweekly.com/)

### 视频教程
- [TypeScript 官方教程](https://www.youtube.com/c/TypeScript)
- [Matt Pocock - Total TypeScript](https://www.youtube.com/c/MattPocockUK)

---

## 版本兼容性

本教程基于 TypeScript 5.x 编写。

| 特性 | 最低版本 |
|------|----------|
| 基础类型 | 所有版本 |
| 泛型 | 所有版本 |
| 映射类型 | 2.1+ |
| 条件类型 | 2.8+ |
| infer | 2.8+ |
| 模板字面量类型 | 4.1+ |
| as const | 3.4+ |
| satisfies | 4.9+ |
| const 泛型参数 | 5.0+ |

---

**上一篇：** [← 04-es6+/](../04-es6+/)
**下一篇：** [→ 01-TypeScript 入门与环境配置](./01-TypeScript 入门与环境配置.md)
