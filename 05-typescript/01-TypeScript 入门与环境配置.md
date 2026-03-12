# TypeScript 入门与环境配置

> TypeScript 学习的第一步：了解 TypeScript 是什么、为什么使用它，并搭建完整的开发环境

## 本章学习目标

- 理解 TypeScript 的核心概念和优势
- 掌握 TypeScript 的安装和配置方法
- 学会编写和编译第一个 TypeScript 程序
- 理解 tsconfig.json 的配置选项
- 搭建完整的 TypeScript 开发环境（VS Code + ESLint + Prettier）

---

## 1.1 TypeScript 简介

### 什么是 TypeScript

**TypeScript** 是由微软开发并于 2012 年开源的编程语言，它是 **JavaScript 的超集**，添加了可选的静态类型系统。

```
TypeScript = JavaScript + 类型系统 + 新特性
```

### TypeScript 的核心特性

| 特性 | 说明 |
|------|------|
| **静态类型** | 在编译时进行类型检查，提前发现错误 |
| **类型推断** | 自动推断变量和函数的类型 |
| **现代语法** | 支持最新的 ECMAScript 特性 |
| **工具支持** | 优秀的 IDE 支持和代码补全 |
| **渐进式采用** | 可以逐步将 JavaScript 代码迁移到 TypeScript |

### TypeScript 的设计哲学

> TypeScript 的核心目标是**发现代码中的错误**，而不是阻止你写代码。

```typescript
// TypeScript 会在编译时发现这些错误
let age: number = 25;
age = 'twenty-five';  // ❌ 编译错误：类型不匹配

function add(a: number, b: number): number {
    return a + b;
}

add(1, '2');  // ❌ 编译错误：参数类型不匹配
```

---

## 1.2 为什么使用 TypeScript

### JavaScript 的痛点

```javascript
// JavaScript - 运行时错误
function add(a, b) {
    return a + b;
}

add(1, '2');  // "12" - 可能不是你想要的结果

const user = { name: '张三' };
user.age;  // undefined - 没有错误提示
user.setName();  // TypeError: user.setName is not a function
```

### TypeScript 的优势

```typescript
// TypeScript - 编译时错误
function add(a: number, b: number): number {
    return a + b;
}

add(1, '2');  // ❌ 编译错误：类型 'string' 不能赋值给类型 'number'

interface User {
    name: string;
    age?: number;
}

const user: User = { name: '张三' };
user.age;  // number | undefined - 明确的类型提示
user.setName();  // ❌ 编译错误：属性 'setName' 不存在
```

### 使用 TypeScript 的好处

| 好处 | 说明 |
|------|------|
| **提前发现错误** | 在编译时发现类型错误，减少运行时 bug |
| **更好的 IDE 支持** | 智能提示、自动补全、重构工具 |
| **代码即文档** | 类型注解本身就是最好的文档 |
| **易于重构** | 修改代码时，编译器会告诉你哪里需要更新 |
| **团队协作** | 类型定义作为契约，减少沟通成本 |

---

## 1.3 JavaScript 与 TypeScript 的关系

### TypeScript 是 JavaScript 的超集

```
┌─────────────────────────┐
│      TypeScript         │
│  ┌─────────────────┐    │
│  │   JavaScript    │    │
│  └─────────────────┘    │
└─────────────────────────┘
```

**所有有效的 JavaScript 代码都是有效的 TypeScript 代码。**

```typescript
// 这段 JavaScript 代码可以直接作为 TypeScript 运行
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('World'));
```

### TypeScript 的额外特性

```typescript
// 1. 类型注解
let name: string = 'TypeScript';

// 2. 接口
interface Person {
    name: string;
    age: number;
}

// 3. 泛型
function identity<T>(arg: T): T {
    return arg;
}

// 4. 枚举
enum Color {
    Red,
    Green,
    Blue
}

// 5. 元组
let tuple: [string, number] = ['hello', 42];
```

### TypeScript 编译为 JavaScript

```typescript
// TypeScript 源码 (input.ts)
interface User {
    name: string;
    age: number;
}

function greet(user: User): string {
    return `Hello, ${user.name}!`;
}

const user: User = { name: '张三', age: 25 };
console.log(greet(user));
```

```javascript
// 编译后的 JavaScript (output.js)
function greet(user) {
    return `Hello, ${user.name}!`;
}

const user = { name: '张三', age: 25 };
console.log(greet(user));
```

**类型信息在编译时被移除，运行时代码与手写 JavaScript 性能相同。**

---

## 1.4 安装 TypeScript

### 方式一：全局安装（推荐用于学习）

```bash
# 使用 npm 全局安装
npm install -g typescript

# 使用 yarn 全局安装
yarn global add typescript

# 使用 pnpm 全局安装
pnpm add -g typescript

# 查看版本
tsc --version
# 输出：Version 5.x.x
```

### 方式二：项目安装（推荐用于生产）

```bash
# 创建项目目录
mkdir my-ts-project
cd my-ts-project

# 初始化 package.json
npm init -y

# 安装 TypeScript 为开发依赖
npm install --save-dev typescript

# 查看版本
npx tsc --version
```

### 方式三：使用在线 Playground

无需安装，直接在浏览器中体验 TypeScript：

- [TypeScript Playground](https://www.typescriptlang.org/play/)
- [StackBlitz](https://stackblitz.com/)
- [CodeSandbox](https://codesandbox.io/)

---

## 1.5 第一个 TypeScript 程序

### 创建 TypeScript 文件

创建 `hello.ts` 文件：

```typescript
// hello.ts
function greet(name: string): string {
    return `Hello, ${name}!`;
}

const message = greet('TypeScript');
console.log(message);
```

### 编译 TypeScript

```bash
# 编译单个文件
tsc hello.ts

# 生成 hello.js 文件
```

### 运行编译后的代码

```bash
# 使用 Node.js 运行
node hello.js

# 输出：Hello, TypeScript!
```

### 使用 ts-node 直接运行（开发推荐）

```bash
# 安装 ts-node
npm install -g ts-node

# 直接运行 TypeScript 文件
ts-node hello.ts

# 输出：Hello, TypeScript!
```

---

## 1.6 tsconfig.json 详解

### 什么是 tsconfig.json

`tsconfig.json` 是 TypeScript 项目的配置文件，定义了编译选项和包含的文件。

### 创建配置文件

```bash
# 自动生成基础配置
tsc --init
```

### 完整配置示例

```json
{
  "compilerOptions": {
    /* 语言和环境 */
    "target": "ES2022",                          // 编译后的 JavaScript 版本
    "lib": ["ES2022", "DOM", "DOM.Iterable"],   // 包含的 API 定义
    "moduleDetection": "force",                  // 模块检测方式
    "jsx": "react-jsx",                          // JSX 支持

    /* 模块系统 */
    "module": "ESNext",                          // 使用的模块系统
    "moduleResolution": "node",                  // 模块解析策略
    "baseUrl": ".",                              // 基础路径
    "paths": {                                   // 路径映射
      "@/*": ["src/*"]
    },
    "resolveJsonModule": true,                   // 允许导入 JSON

    /* 类型检查 */
    "strict": true,                              // 启用所有严格类型检查
    "noImplicitAny": true,                       // 禁止隐式 any
    "strictNullChecks": true,                    // 严格的 null 检查
    "strictFunctionTypes": true,                 // 严格的函数类型检查
    "strictBindCallApply": true,                 // 严格的 bind/call/apply
    "strictPropertyInitialization": true,        // 严格的属性初始化检查
    "noImplicitThis": true,                      // 禁止隐式 this
    "useUnknownInCatchVariables": true,          // catch 变量为 unknown
    "alwaysStrict": true,                        // 总是使用严格模式
    "noUnusedLocals": true,                      // 检查未使用的局部变量
    "noUnusedParameters": true,                  // 检查未使用的参数
    "exactOptionalPropertyTypes": true,          // 精确的可选属性类型
    "noImplicitReturns": true,                   // 检查隐式返回
    "noFallthroughCasesInSwitch": true,          // 检查 switch 穿透
    "noUncheckedIndexedAccess": true,            // 未检查的索引访问
    "noImplicitOverride": true,                  // 检查隐式重写
    "noPropertyAccessFromIndexSignature": true,  // 禁止索引签名的属性访问

    /* 互操作性 */
    "esModuleInterop": true,                     // ES 模块互操作
    "forceConsistentCasingInFileNames": true,    // 强制文件名大小写一致
    "isolatedModules": true,                     // 隔离模块
    "allowSyntheticDefaultImports": true,        // 允许默认导入

    /* 输出 */
    "outDir": "./dist",                          // 输出目录
    "rootDir": "./src",                          // 源文件目录
    "declaration": true,                         // 生成声明文件
    "declarationMap": true,                      // 生成声明文件映射
    "sourceMap": true,                           // 生成 source map
    "removeComments": false,                     // 移除注释

    /* 其他 */
    "skipLibCheck": true,                        // 跳过库的类型检查
    "types": ["node"]                            // 包含的类型定义
  },
  "include": ["src/**/*"],                       // 包含的文件
  "exclude": ["node_modules", "dist", "**/*.test.ts"]  // 排除的文件
}
```

### 最小可用配置

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
```

---

## 1.7 严格模式配置

### 什么是严格模式

TypeScript 的 `strict` 选项启用一组严格的类型检查规则，帮助你编写更安全的代码。

### strict 包含的选项

```json
{
  "compilerOptions": {
    "strict": true  // 等价于启用以下所有选项
  }
}
```

| 选项 | 说明 | 示例 |
|------|------|------|
| `noImplicitAny` | 禁止隐式 any | `let x;` ❌ |
| `strictNullChecks` | 严格的 null 检查 | `string` 不包含 `null` |
| `strictFunctionTypes` | 严格的函数类型检查 | 参数类型必须匹配 |
| `strictBindCallApply` | 严格的 bind/call/apply | 检查参数类型 |
| `strictPropertyInitialization` | 严格的属性初始化 | 类属性必须初始化 |
| `noImplicitThis` | 禁止隐式 this | `this` 必须有类型 |
| `useUnknownInCatchVariables` | catch 变量为 unknown | `catch (e: unknown)` |
| `alwaysStrict` | 总是使用严格模式 | 添加 `"use strict"` |

### 严格模式示例

```typescript
// noImplicitAny
function add(a, b) {  // ❌ 错误：隐式 any
    return a + b;
}

function add(a: number, b: number): number {  // ✅ 正确
    return a + b;
}

// strictNullChecks
let name: string = null;  // ❌ 错误
let name: string | null = null;  // ✅ 正确

// strictPropertyInitialization
class Person {
    name: string;  // ❌ 错误：属性未初始化
}

class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
```

### 渐进式启用严格模式

如果项目较大，可以逐步启用严格选项：

```json
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": true,
    "strictNullChecks": true,
    // 其他选项逐步启用
  }
}
```

---

## 1.8 编译选项详解

### 常用编译选项

| 选项 | 说明 | 推荐值 |
|------|------|--------|
| `target` | 编译目标 | `ES2022` |
| `module` | 模块系统 | `ESNext` |
| `lib` | 库文件 | `["ES2022", "DOM"]` |
| `outDir` | 输出目录 | `./dist` |
| `rootDir` | 源文件目录 | `./src` |
| `declaration` | 生成声明文件 | `true` |
| `sourceMap` | 生成 source map | `true` |

### 模块系统选项

```json
{
  "compilerOptions": {
    "module": "ESNext",        // ES Modules
    "module": "CommonJS",      // Node.js
    "module": "AMD",           // RequireJS
    "module": "UMD",           // 通用模块
    "module": "ES2020"         // ES2020 模块
  }
}
```

### JSX 选项

```json
{
  "compilerOptions": {
    "jsx": "preserve",      // 保留 JSX，交给其他工具处理
    "jsx": "react",         // 生成 React.createElement
    "jsx": "react-jsx",     // React 17+ 的新 JSX 转换
    "jsx": "react-native"   // React Native
  }
}
```

### 路径映射

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

使用示例：

```typescript
// 代替 ../../../components/Button
import { Button } from '@components/Button';

// 代替 ../../utils/format
import { format } from '@utils/format';
```

---

## 1.9 类型检查与类型推断

### 显式类型注解

```typescript
// 变量类型注解
let name: string = 'TypeScript';
let age: number = 5;
let isActive: boolean = true;

// 函数参数和返回类型
function greet(name: string): string {
    return `Hello, ${name}!`;
}

// 数组类型
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['Alice', 'Bob'];

// 对象类型
interface User {
    name: string;
    age: number;
}

const user: User = { name: '张三', age: 25 };
```

### 类型推断

TypeScript 可以自动推断变量和函数的类型：

```typescript
// 变量推断
let name = 'TypeScript';  // 推断为 string
let age = 5;              // 推断为 number
let isActive = true;      // 推断为 boolean

// 函数返回类型推断
function add(a: number, b: number) {
    return a + b;  // 推断返回类型为 number
}

// 最佳共同类型推断
let arr = [1, null, 'hello'];  // 推断为 (number | null | string)[]

// 上下文归类推断
window.onmousedown = function(event) {
    // event 推断为 MouseEvent
    console.log(event.button);
};
```

### 类型断言

当你比 TypeScript 更了解类型时，可以使用类型断言：

```typescript
// as 语法（推荐）
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

// 尖括号语法（与 JSX 冲突）
const canvas = <HTMLCanvasElement>document.getElementById('myCanvas');

// 非空断言
let value: string | null = null;
let length: number = value!.length;  // 告诉 TS value 不为 null

// 常量断言
const obj = { x: 1, y: 2 } as const;
// obj.x 的类型是字面量类型 1，而不是 number
```

---

## 1.10 使用 tsc 编译项目

### 编译单个文件

```bash
# 编译单个文件
tsc hello.ts

# 指定输出文件
tsc hello.ts --outFile hello.compiled.js

# 监听模式（自动重新编译）
tsc hello.ts --watch
```

### 编译整个项目

```bash
# 编译 tsconfig.json 配置的项目
tsc

# 监听模式
tsc --watch

# 只检查类型，不生成文件
tsc --noEmit
```

### 编译选项优先级

```
命令行选项 > tsconfig.json > 默认值
```

```bash
# 命令行选项覆盖配置文件
tsc --target ES2020 --outDir ./build
```

### 增量编译

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.tsbuildinfo"
  }
}
```

```bash
# 启用增量编译后，只编译变化的文件
tsc --build
```

---

## 1.11 集成 VS Code

### 推荐插件

| 插件 | 说明 |
|------|------|
| **ESLint** | 代码检查 |
| **Prettier** | 代码格式化 |
| **TypeScript Hero** | 导入管理 |
| **Error Lens** | 错误提示增强 |
| **Path Intellisense** | 路径补全 |

### VS Code 配置

创建 `.vscode/settings.json`：

```json
{
  // TypeScript 配置
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.preferences.quoteStyle": "single",
  "typescript.updateImportsOnFileMove.enabled": "always",

  // 格式化配置
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,

  // 保存时操作
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit",
    "source.fixAll.eslint": "explicit"
  },

  // 文件关联
  "files.associations": {
    "*.ts": "typescript"
  },

  // 排除文件
  "files.exclude": {
    "**/*.js.map": true,
    "**/*.d.ts": true
  }
}
```

### 快捷键配置

创建 `.vscode/keybindings.json`：

```json
[
  {
    "key": "cmd+shift+f",
    "command": "editor.action.formatDocument"
  },
  {
    "key": "cmd+shift+o",
    "command": "editor.action.organizeImports"
  },
  {
    "key": "cmd+`",
    "command": "workbench.action.terminal.toggleTerminal"
  }
]
```

---

## 1.12 集成 ESLint + Prettier

### 安装依赖

```bash
# 安装 ESLint 和相关插件
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 安装 Prettier 和相关插件
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### ESLint 配置

创建 `.eslintrc.js`：

```javascript
module.exports = {
  // 解析器
  parser: '@typescript-eslint/parser',
  
  // 解析器选项
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  // 插件
  plugins: ['@typescript-eslint', 'prettier'],

  // 继承配置
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],

  // 环境
  env: {
    browser: true,
    node: true,
    es2022: true
  },

  // 规则
  rules: {
    // Prettier 集成
    'prettier/prettier': 'error',

    // TypeScript 规则
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'warn',

    // 通用规则
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error'
  },

  // 忽略文件
  ignorePatterns: ['node_modules/', 'dist/', '*.js']
};
```

### Prettier 配置

创建 `.prettierrc`：

```javascript
module.exports = {
  semi: true,              // 使用分号
  singleQuote: true,       // 使用单引号
  tabWidth: 2,             // 缩进 2 空格
  trailingComma: 'es5',    // ES5 兼容的尾随逗号
  printWidth: 100,         // 每行最大字符数
  parser: 'typescript',    // 解析器
  endOfLine: 'lf',         // 换行符
  bracketSpacing: true,    // 对象空格
  arrowParens: 'always',   // 箭头函数括号
  proseWrap: 'preserve'    // Markdown 换行
};
```

### 创建 `.prettierignore`

```
node_modules
dist
build
coverage
*.min.js
```

### package.json 脚本

```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,md}\"",
    "typecheck": "tsc --noEmit",
    "check": "npm run lint && npm run format:check && npm run typecheck"
  }
}
```

---

## 1.13 实践练习：搭建 TS 项目

### 练习目标

搭建一个完整的 TypeScript 项目环境，包含：
- TypeScript 编译配置
- ESLint 代码检查
- Prettier 代码格式化
- VS Code 编辑器配置

### 步骤一：初始化项目

```bash
# 创建项目目录
mkdir my-typescript-project
cd my-typescript-project

# 初始化 package.json
npm init -y

# 安装 TypeScript
npm install --save-dev typescript

# 安装 ESLint 和 Prettier
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier

# 安装类型定义
npm install --save-dev @types/node
```

### 步骤二：创建配置文件

创建 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

创建 `.eslintrc.js`：

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  },
  ignorePatterns: ['node_modules/', 'dist/']
};
```

创建 `.prettierrc`：

```javascript
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100
};
```

### 步骤三：创建项目结构

```
my-typescript-project/
├── src/
│   └── index.ts
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── package.json
└── tsconfig.json
```

创建 `src/index.ts`：

```typescript
// src/index.ts
interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(name: string, email: string): User {
  return {
    id: Date.now(),
    name,
    email
  };
}

function greet(user: User): string {
  return `Hello, ${user.name}!`;
}

const user = createUser('张三', 'zhangsan@example.com');
console.log(greet(user));
```

### 步骤四：配置 VS Code

创建 `.vscode/settings.json`：

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit",
    "source.fixAll.eslint": "explicit"
  }
}
```

### 步骤五：添加 npm 脚本

更新 `package.json`：

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts",
    "lint:fix": "eslint src --ext .ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "typecheck": "tsc --noEmit"
  }
}
```

### 步骤六：运行项目

```bash
# 编译项目
npm run build

# 运行编译后的代码
npm start

# 开发模式（监听编译）
npm run dev

# 类型检查
npm run typecheck

# 代码检查和格式化
npm run lint:fix
npm run format
```

---

## 1.14 常见问答

### Q1: TypeScript 和 JavaScript 的性能有区别吗？

**答：** 没有区别。TypeScript 编译后生成纯 JavaScript，运行时代码完全相同。

```typescript
// TypeScript
function add(a: number, b: number): number {
    return a + b;
}
```

```javascript
// 编译后的 JavaScript
function add(a, b) {
    return a + b;
}
```

### Q2: 应该全局安装还是项目安装 TypeScript？

**答：** 推荐项目安装。

- **全局安装**：适合学习和个人项目
- **项目安装**：适合团队项目，可以锁定版本

```bash
# 项目安装
npm install --save-dev typescript

# 使用
npx tsc --version
```

### Q3: 如何处理第三方库的类型定义？

**答：** 使用 `@types` 包。

```bash
# 安装类型定义
npm install --save-dev @types/lodash
npm install --save-dev @types/react
npm install --save-dev @types/node
```

如果库自带类型定义（如 axios），则无需额外安装。

### Q4: any 和 unknown 有什么区别？

**答：**

| 特性 | any | unknown |
|------|-----|---------|
| 类型安全 | ❌ | ✅ |
| 直接使用 | ✅ | ❌ |
| 类型检查 | 不需要 | 需要 |
| 推荐度 | 不推荐 | 推荐 |

```typescript
// any 可以直接使用
let anyVal: any = 'hello';
console.log(anyVal.length);  // OK

// unknown 需要检查
let unknownVal: unknown = 'hello';
// console.log(unknownVal.length);  // 错误

if (typeof unknownVal === 'string') {
    console.log(unknownVal.length);  // OK
}
```

### Q5: 如何迁移现有的 JavaScript 项目？

**答：** 渐进式迁移策略：

1. 重命名 `.js` 为 `.ts`
2. 逐步添加类型注解
3. 先启用部分严格选项
4. 最后启用 `strict: true`

```json
{
  "compilerOptions": {
    "allowJs": true,        // 允许 JS 文件
    "checkJs": true,        // 检查 JS 文件
    "strict": false,
    "noImplicitAny": true   // 先启用这个
  }
}
```

---

## 1.15 学习资源

### 官方资源
- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### 工具配置
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Prettier](https://prettier.io/)
- [VS Code TypeScript](https://code.visualstudio.com/docs/typescript/typescript-tutorial)

### 在线课程
- [TypeScript 官方教程](https://www.typescriptlang.org/docs/handbook/)
- [Total TypeScript](https://www.totaltypescript.com/)

---

**上一章：** [← TypeScript 学习路线](./README.md)
**下一章：** [→ 02-基础类型详解](./02-基础类型详解.md)
