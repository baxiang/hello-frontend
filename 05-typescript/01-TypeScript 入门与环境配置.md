# TypeScript 入门与环境配置

> TypeScript 学习的第一步：了解 TypeScript 是什么、为什么使用它，并搭建完整的开发环境

## 本章学习目标

- ✅ 理解 TypeScript 的核心概念和优势
- ✅ 掌握 TypeScript 的安装和配置方法
- ✅ 学会编写和编译第一个 TypeScript 程序
- ✅ 理解 tsconfig.json 的配置选项
- ✅ 搭建完整的 TypeScript 开发环境

---

## 1.1 TypeScript 简介

### 1.1.1 什么是 TypeScript？

**TypeScript** 是由微软开发并于 2012 年开源的编程语言，它是 **JavaScript 的超集**，添加了可选的静态类型系统。

```
┌─────────────────────────────────────────────────────────────┐
│                    TypeScript = JavaScript + 类型系统       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  JavaScript：                                               │
│  - 脚本语言，用于网页交互                                   │
│  - 动态类型，变量类型可以随时变化                           │
│  - 编译时不做类型检查，错误在运行时发现                     │
│                                                             │
│  TypeScript：                                               │
│  - JavaScript 的超集（超集 = 包含更多功能）                  │
│  - 添加了静态类型系统                                       │
│  - 编译时做类型检查，提前发现错误                           │
│  - 最终编译为纯 JavaScript                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.1.2 为什么需要 TypeScript？

让我用一个生活中的例子来解释：

```
┌─────────────────────────────────────────────────────────────┐
│  生活中的比喻：                                             │
│                                                             │
│  JavaScript 就像没有规则的厨房：                            │
│  - 任何人都可以随便放材料                                   │
│  - 可能会做出奇怪的食物                                     │
│  - 只有端上桌才发现问题                                     │
│                                                             │
│  TypeScript 就像有严格配方的厨房：                          │
│  - 规定了每道菜需要什么材料                                  │
│  - 材料不对？立即发现                                       │
│  - 做出来的菜质量有保证                                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.1.3 TypeScript 的核心特性

| 特性 | 说明 | 比喻 |
|------|------|------|
| **静态类型** | 在编译时进行类型检查 | 配方检查材料 |
| **类型推断** | 自动推断变量类型 | 经验丰富的大厨 |
| **现代语法** | 支持最新 ECMAScript 特性 | 现代化的厨房设备 |
| **工具支持** | IDE 智能提示和补全 | 智能厨房助手 |
| **渐进式采用** | 可以逐步迁移现有代码 | 慢慢改进配方 |

---

## 1.2 JavaScript 的痛点

### 1.2.1 运行时错误

```javascript
// 问题 1：类型错误只在运行时发现
function add(a, b) {
    return a + b;
}

add(1, '2');  // 结果是 "12"（字符串拼接），可能不是你想要的！
add(1, 2);    // 结果是 3

// 问题 2：访问不存在的属性
const user = { name: '张三' };
console.log(user.age);      // undefined，没有错误提示
console.log(user.setName()); // TypeError: user.setName is not a function

// 问题 3：参数个数不对
function greet(name) {
    return `Hello, ${name}!`;
}

greet();              // "Hello, undefined!"
greet('Tom', 'Jerry'); // 只取第一个参数
```

### 1.2.2 代码维护困难

```javascript
// 没有类型提示，IDE 无法帮助
function processUser(user) {
    // user 有什么属性？不知道！
    // 只能靠记忆或查看其他地方
    return user.name.toUpperCase();  // 如果 user 是 undefined 怎么办？
}

// 团队协作时，接口不清晰
function createUser(data) {
    // data 到底是什么格式？
    // 需要看文档或问别人
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        // 漏了某个字段？运行时才知道
    };
}
```

### 1.2.3 重构风险高

```javascript
// 改一个函数，可能影响其他地方
function calculate(a, b) {
    return a + b;
}

// 有人改成这样，你不知道：
function calculate(a, b, operation) {
    if (operation === 'add') return a + b;
    if (operation === 'sub') return a - b;
    return a + b;
}

// 调用方没有更新，就会出问题
const result = calculate(1, 2);  // 现在返回 3，但语义变了
```

---

## 1.3 TypeScript 的解决方案

### 1.3.1 编译时类型检查

```typescript
// TypeScript 会在编译时发现这些错误

// 错误 1：类型不匹配
let age: number = 25;
age = 'twenty-five';  // ❌ 编译错误！

// 错误 2：参数类型不对
function add(a: number, b: number): number {
    return a + b;
}
add(1, '2');  // ❌ 编译错误！

// 错误 3：访问不存在的属性
interface User {
    name: string;
    age: number;
}

const user: User = { name: '张三' };
console.log(user.email);  // ❌ 编译错误！

// 错误 4：调用不存在的方法
user.setName();  // ❌ 编译错误！
```

### 1.3.2 智能代码提示

```typescript
// IDE 知道 user 的类型，会提供完整的提示
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;  // 可选属性
}

const user: User = {
    id: 1,
    name: '张三',
    email: 'zhang@example.com'
};

// 输入 user. 时，IDE 会提示：
// - id (number)
// - name (string)
// - email (string)
// - age (number | undefined)
```

### 1.3.3 代码即文档

```typescript
// 类型注解本身就是最好的文档

// 之前：需要看文档或源码
function createUser(data) { }

// 现在：类型就是文档
interface UserInput {
    name: string;
    email: string;
    age?: number;  // 可选
    role: 'admin' | 'user' | 'guest';  // 限定值
}

function createUser(data: UserInput): User {
    // 返回值类型也清晰
    return {
        id: generateId(),
        ...data,
        createdAt: new Date()
    };
}
```

---

## 1.4 JavaScript 与 TypeScript 的关系

### 1.4.1 TypeScript 是 JavaScript 的超集

```
┌─────────────────────────────────────────────────────────────┐
│                    TypeScript 包含的内容                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐     │
│  │                   TypeScript                        │     │
│  │  ┌───────────────────────────────────────────┐    │     │
│  │  │              JavaScript                    │    │     │
│  │  │  - 所有语法                                │    │     │
│  │  │  - 所有内置对象                            │    │     │
│  │  │  - 所有特性                                │    │     │
│  │  └───────────────────────────────────────────┘    │     │
│  │                                                     │     │
│  │  + 类型系统                                        │     │
│  │  + 接口                                            │     │
│  │  + 泛型                                           │     │
│  │  + 装饰器                                         │     │
│  │  + 命名空间                                       │     │
│  │  + 模块解析                                       │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**这意味着：**
- 所有有效的 JavaScript 代码都是有效的 TypeScript 代码
- 你可以将现有的 JavaScript 项目逐步迁移到 TypeScript

### 1.4.2 代码转换过程

```typescript
// TypeScript 源码 (.ts 文件)
interface User {
    name: string;
    age: number;
}

function greet(user: User): string {
    return `Hello, ${user.name}! You are ${user.age} years old.`;
}

const user: User = { name: '张三', age: 25 };
console.log(greet(user));
```

```javascript
// 编译后的 JavaScript (.js 文件)
// 类型信息被移除，代码与手写 JavaScript 相同

function greet(user) {
    return "Hello, " + user.name + "! You are " + user.age + " years old.";
}

var user = { name: '张三', age: 25 };
console.log(greet(user));
```

**重要：**
- TypeScript 只在编译时检查类型
- 编译后的 JavaScript 代码没有任何类型信息
- 运行时的性能和纯 JavaScript 相同

---

## 1.5 安装 TypeScript

### 1.5.1 环境要求

```bash
# Node.js 要求
# - 推荐 Node.js 18.x 或更高版本
# - 最低支持 Node.js 16.x

# 查看版本
node --version  # v18.x.x 或更高
npm --version    # v9.x.x 或更高
```

### 1.5.2 安装方式

**方式一：全局安装（适合学习）**

```bash
# 使用 npm
npm install -g typescript

# 使用 yarn
yarn global add typescript

# 使用 pnpm
pnpm add -g typescript

# 验证安装
tsc --version
# 输出类似：Version 5.3.3
```

**方式二：项目本地安装（推荐）**

```bash
# 初始化项目
npm init -y

# 安装 TypeScript
npm install -D typescript

# 验证安装
npx tsc --version
```

### 1.5.3 第一个 TypeScript 程序

**步骤 1：创建项目**

```bash
mkdir my-ts-project
cd my-ts-project
npm init -y
npm install -D typescript
```

**步骤 2：创建 TypeScript 文件**

```typescript
// 创建 src 目录和 index.ts 文件
mkdir src
touch src/index.ts
```

```typescript
// src/index.ts
// 定义接口
interface User {
    name: string;
    age: number;
}

// 创建函数，添加类型注解
function greet(user: User): string {
    return `Hello, ${user.name}! You are ${user.age} years old.`;
}

// 使用函数
const user: User = {
    name: '张三',
    age: 25
};

console.log(greet(user));
```

**步骤 3：编译 TypeScript**

```bash
# 编译
npx tsc src/index.ts

# 或者监听文件变化（开发时）
npx tsc --watch src/index.ts
```

**步骤 4：运行结果**

```bash
# 编译后生成 src/index.js
node src/index.js
# 输出：Hello, 张三! You are 25 years old.
```

---

## 1.6 tsconfig.json 配置

### 1.6.1 什么是 tsconfig.json？

```
┌─────────────────────────────────────────────────────────────┐
│  tsconfig.json = TypeScript 编译器的"配置文件"             │
│                                                             │
│  作用：                                                     │
│  - 指定哪些文件需要编译                                     │
│  - 输出到哪个目录                                           │
│  - 使用什么编译选项                                         │
│  - 包含哪些库类型定义                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.6.2 创建 tsconfig.json

```bash
# 自动生成
npx tsc --init
```

### 1.6.3 常用配置项

```json
{
    // 编译选项
    "compilerOptions": {
        // 编译目标 JavaScript 版本
        "target": "ES2020",
        
        // 模块系统
        "module": "commonjs",
        
        // 输出目录
        "outDir": "./dist",
        
        // 严格模式（强烈建议开启！）
        "strict": true,
        
        // 严格空值检查
        "strictNullChecks": true,
        
        // 允许合成默认导入
        "esModuleInterop": true,
        
        // 跳过 lib 检查
        "skipLibCheck": true,
        
        // 强制文件名一致
        "forceConsistentCasingInFileNames": true
    },
    
    // 包含的文件
    "include": [
        "src/**/*"
    ],
    
    // 排除的文件
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

### 1.6.4 重要编译选项说明

| 选项 | 说明 | 推荐值 |
|------|------|--------|
| target | 编译目标 JS 版本 | ES2020 |
| strict | 严格模式 | true |
| module | 模块系统 | commonjs |
| outDir | 输出目录 | ./dist |
| rootDir | 源码目录 | ./src |
| esModuleInterop | 允许默认导入 | true |
| skipLibCheck | 跳过库检查 | true |

---

## 1.7 开发环境搭建

### 1.7.1 VS Code 配置

```json
// .vscode/settings.json
{
    // TypeScript 版本
    "typescript.tsdk": "node_modules/typescript/lib",
    
    // 保存时格式化
    "editor.formatOnSave": true,
    
    // 保存时修复
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.organizeImports": true
    },
    
    // 默认格式化工具
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### 1.7.2 ESLint 配置

```bash
# 安装 ESLint
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# .eslintrc.js
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'warn'
    }
};
```

### 1.7.3 Prettier 配置

```json
// .prettierrc
{
    "semi": true,
    "singleQuote": true,
    "tabWidth": 4,
    "trailingComma": "none"
}
```

---

## 1.8 实践练习

### 练习 1：创建第一个 TypeScript 程序

```bash
# 1. 创建项目目录
mkdir hello-ts
cd hello-ts
npm init -y
npm install -D typescript

# 2. 创建 tsconfig.json
npx tsc --init

# 3. 修改 tsconfig.json
# 确保 strict: true

# 4. 创建 src/index.ts
mkdir src
touch src/index.ts
```

```typescript
// src/index.ts
// 练习类型注解

// 1. 基础类型
let name: string = '张三';
let age: number = 25;
let isStudent: boolean = true;

// 2. 数组
let hobbies: string[] = ['coding', 'reading'];

// 3. 对象
interface Person {
    name: string;
    age: number;
}

const person: Person = {
    name: name,
    age: age
};

// 4. 函数
function greet(p: Person): string {
    return `你好，${p.name}！你 ${p.age} 岁了。`;
}

console.log(greet(person));
```

```bash
# 5. 编译并运行
npx tsc
node dist/index.js
```

### 练习 2：体验类型检查

```typescript
// 尝试修改下面的代码，观察 TypeScript 的错误提示

// 1. 类型不匹配
let num: number = 'hello';  // ❌

// 2. 参数类型不对
function add(a: number, b: number): number {
    return a + b;
}
add(1, '2');  // ❌

// 3. 访问不存在的属性
interface User {
    name: string;
}
const user: User = { name: '张三' };
console.log(user.age);  // ❌
```

---

## 1.9 常见问答

### Q1: TypeScript 和 JavaScript 哪个好？

**答：** 没有绝对的好坏，只有适用场景。

```javascript
// 小项目、快速原型：JavaScript 更灵活
// 大型项目、团队协作：TypeScript 更安全
```

### Q2: TypeScript 难学吗？

**答：** 不难，TypeScript 就是带类型的 JavaScript。

```
学习曲线：
- 基础类型：5 分钟
- 接口和类型：30 分钟
- 泛型：1 小时
- 高级类型：需要更多实践
```

### Q3: 一定要用 TypeScript 吗？

**答：** 不一定，但推荐使用。

```typescript
// 新项目：强烈建议使用 TypeScript
// 现有项目：可以逐步迁移
// 学习：推荐学习，对理解 JavaScript 有帮助
```

---

## 1.10 学习资源

### 官方文档

- [TypeScript 官网](https://www.typescriptlang.org/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play/)

### 推荐教程

- [TypeScript 入门教程 - 阮一峰](https://es6.ruanyifeng.com/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

---

**上一章：** [← JavaScript 核心语法](../04-es6+/)  
**下一章：** [→ 02-基础类型详解](./02-基础类型详解.md)