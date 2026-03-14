# tsconfig.json 基础配置

> 本章时长：45分钟 | 难度：⭐⭐

---

## 本章目标

- 理解 tsconfig.json 的作用
- 掌握常用编译选项
- 配置一个完整的 TypeScript 项目

---

## 3.1 什么是 tsconfig.json

### 配置文件作用

`tsconfig.json` 是 TypeScript 项目的配置文件，告诉编译器：
- 如何编译代码
- 编译到哪个 JavaScript 版本
- 哪些文件需要编译
- 启用哪些检查

### 创建配置文件

```bash
# 在项目根目录运行
npx tsc --init

# 或者手动创建 tsconfig.json
```

### 基础配置示例

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "strict": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

---

## 3.2 常用编译选项

### target - 编译目标

指定编译后的 JavaScript 版本：

```json
{
    "target": "ES2022"  // ES2022, ES2020, ES2017, ES6 等
}
```

| target | 说明 | 浏览器支持 |
|--------|------|-----------|
| ES2022 | 最新 | 现代浏览器 |
| ES2020 | ES2020 | 较新浏览器 |
| ES2017 | ES2017 | 大部分浏览器 |
| ES6 | ES2015 | IE11 不支持 |

### module - 模块系统（重点详解）

#### 什么是模块系统？

```
模块系统 = 代码组织方式 = 如何导入和导出代码
```

在编程中，我们需要把代码分成多个文件，这就涉及到：
- 如何导出：A 文件的代码给 B 文件用
- 如何导入：B 文件要使用 A 文件的代码

不同的环境（浏览器、Node.js）有不同的方式，这就是"模块系统"。

#### 为什么需要不同的模块系统？

```
场景：你在不同环境写代码

浏览器环境：
- 没有文件系统
- 需要下载模块
- 只能用 <script> 标签

Node.js 环境：
- 有文件系统
- 可以 require() 模块
- 可以读取文件

所以需要不同的模块系统来适配不同环境
```

#### 三种主要模块系统详解

##### 1. CommonJS（Node.js 后端）

```
最常用：Node.js 后端项目
文件后缀：.js
```

```typescript
// 导出
// math.ts
function add(a: number, b: number): number {
    return a + b;
}

module.exports = { add };

// 导入
// main.ts
const { add } = require('./math');
console.log(add(1, 2));  // 3
```

编译后的 JavaScript：

```javascript
// 编译后
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function add(a, b) {
    return a + b;
}
exports.add = add;
```

**特点：**
- 使用 `require()` 导入
- 使用 `module.exports` 导出
- 同步加载
- Node.js 默认支持

**适用场景：**
- Node.js 后端项目
- 服务端代码

##### 2. ES Modules（现代前端）

```
最常用：现代前端项目（配合 Vite、Webpack）
文件后缀：.js 或 .mjs
```

```typescript
// 导出
// math.ts
export function add(a: number, b: number): number {
    return a + b;
}

export const name = 'math';

// 导入
// main.ts
import { add, name } from './math';
console.log(add(1, 2));  // 3
```

编译后的 JavaScript：

```javascript
// 编译后（ESNext）
import { add } from './math.js';
console.log(add(1, 2));

// 编译后（CommonJS 兼容）
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = function(a, b) { return a + b; };
```

**特点：**
- 使用 `import` 导入
- 使用 `export` 导出
- 异步加载
- 现代浏览器支持
- Tree-shaking（摇树优化）

**适用场景：**
- 现代前端项目（Vue、React）
- 需要构建工具的项目

##### 3. UMD（通用模块）

```
兼容：既可以在浏览器用，又可以在 Node.js 用
文件后缀：.umd.js
```

```typescript
// 编译后
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? 
        factory(exports) :
    typeof define === 'function' && define.amd ? 
        define(['exports'], factory) :
    (global = global || self, factory(global.math = {}));
}(this, function (exports) { 
    'use strict';
    exports.add = function(a, b) { return a + b; };
}));
```

**特点：**
- 先判断 CommonJS 环境
- 再判断 AMD 环境
- 最后作为全局变量
- 适合编写库

**适用场景：**
- 需要同时支持浏览器和 Node.js 的库
- 第三方组件库

#### module 配置值

```json
{
    "module": "ESNext"      // 现代前端（推荐）
    // 或
    "module": "CommonJS"     // Node.js 后端
    // 或
    "module": "UMD"          // 通用模块
    // 或
    "module": "AMD"          // 旧版浏览器（很少用）
    // 或
    "module": "System"       // SystemJS（很少用）
}
```

#### 如何选择？

```
┌─────────────────────────────────────────────────────────┐
│                    选择指南                              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  前端项目（Vue、React）                                  │
│  → module: "ESNext"                                    │
│  → 配合 Vite 或 Webpack 使用                            │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Node.js 后端项目                                       │
│  → module: "CommonJS"                                   │
│  → Node.js 原生支持                                     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  需要发布到 npm 的库                                     │
│  → module: "ESNext" + "CommonJS"（双版本）             │
│  → 或使用工具（如 rollup）打包                          │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  旧项目兼容                                              │
│  → module: "AMD" 或 "UMD"                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### module 和 target 的关系

```
target = 编译到哪个 JavaScript 版本
module = 使用什么模块化方式
```

| target | module 常见配置 | 说明 |
|--------|-----------------|------|
| ES2022 | ESNext | 现代语法 + 现代模块 |
| ES2020 | CommonJS | 现代语法 + Node.js 模块 |
| ES6 | ESNext | ES6 语法 + 现代模块 |
| ES5 | CommonJS | ES5 语法 + Node.js 模块 |

**常见组合：**

```json
// 现代前端项目（推荐）
{
    "target": "ES2022",
    "module": "ESNext"
}

// Node.js 后端项目
{
    "target": "ES2020",
    "module": "CommonJS"
}

// 兼容旧浏览器
{
    "target": "ES5",
    "module": "CommonJS"
}
```

#### 实际配置示例

```json
{
    "compilerOptions": {
        // 现代前端项目
        "target": "ES2022",
        "module": "ESNext",
        
        // Node.js 后端项目
        // "target": "ES2020",
        // "module": "CommonJS",
        
        // 其他选项...
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true
    }
}
```

### strict - 严格模式

**强烈建议开启**：

```json
{
    "strict": true
}
```

开启后，TypeScript 会进行更严格的类型检查：
- 不能赋值 null/undefined 给非空类型
- 函数必须明确返回类型
- 更严格的类型推断

### outDir - 输出目录

```json
{
    "outDir": "./dist"  // 编译输出到 dist 目录
}
```

### rootDir - 源码目录

```json
{
    "rootDir": "./src"  // 源码在 src 目录
}
```

---

## 3.3 完整配置示例

### 项目配置

```json
{
    "compilerOptions": {
        /* 基础选项 */
        "target": "ES2022",
        "module": "ESNext",
        "lib": ["ES2022", "DOM"],
        
        /* 模块解析 */
        "moduleResolution": "node",
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        
        /* 输出选项 */
        "outDir": "./dist",
        "rootDir": "./src",
        "declaration": true,
        "sourceMap": true,
        
        /* 严格模式 */
        "strict": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        
        /* 其他选项 */
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

### 选项说明

| 选项 | 说明 |
|------|------|
| lib | 包含的类型定义文件 |
| moduleResolution | 模块解析方式 |
| baseUrl | 基础路径 |
| paths | 路径别名 |
| declaration | 生成 .d.ts 类型声明文件 |
| sourceMap | 生成 sourcemap |
| noImplicitAny | 禁止隐式 any 类型 |
| strictNullChecks | 严格 null 检查 |
| esModuleInterop | 允许 ES 模块互操作 |
| skipLibCheck | 跳过库检查 |
| resolveJsonModule | 允许导入 JSON |

---

## 3.4 include 和 exclude

### include - 包含的文件

```json
{
    "include": ["src/**/*", "tests/**/*"]
}
```

- `**` 匹配任意目录
- `*` 匹配任意文件

### exclude - 排除的文件

```json
{
    "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

---

## 3.5 路径别名配置

### 配置路径别名

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"],
            "@components/*": ["src/components/*"],
            "@utils/*": ["src/utils/*"]
        }
    }
}
```

### 使用别名

```typescript
// 之前
import { UserCard } from '../../components/UserCard';
import { formatDate } from '../utils/formatDate';

// 之后（使用别名）
import { UserCard } from '@/components/UserCard';
import { formatDate } from '@/utils/formatDate';
```

### 配合 webpack/Vite

```javascript
// webpack.config.js
resolve: {
    alias: {
        '@': path.resolve(__dirname, 'src')
    }
}
```

---

## 3.6 严格模式详解

### 为什么开启 strict

```json
{
    "strict": true
}
```

严格模式开启后，TypeScript 会：

1. **禁止隐式 any**
   ```typescript
   function fn(a) { }  // ❌ 错误：参数隐式 any
   
   function fn(a: any) { }  // ✅
   ```

2. **严格 null 检查**
   ```typescript
   let name: string = null;  // ❌ 错误
   
   let name: string | null = null;  // ✅
   ```

3. **this 类型**
   ```typescript
   function fn() {
       return this;  // ❌ 错误
   }
   ```

### 单独配置严格选项

```json
{
    "compilerOptions": {
        "strict": true,
        // 或者单独配置
        "noImplicitAny": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "strictPropertyInitialization": true,
        "noImplicitThis": true,
        "alwaysStrict": true
    }
}
```

---

## 3.7 实践：配置项目

### 步骤 1：创建项目

```bash
mkdir my-ts-project
cd my-ts-project
npm init -y
npm install --save-dev typescript
```

### 步骤 2：创建目录结构

```
my-ts-project/
├── src/
│   ├── index.ts
│   ├── utils/
│   │   └── format.ts
│   └── types/
│       └── user.ts
├── dist/
├── package.json
└── tsconfig.json
```

### 步骤 3：配置 tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "declaration": true,
        "sourceMap": true,
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "dist"]
}
```

### 步骤 4：编写代码

```typescript
// src/types/user.ts
export interface User {
    id: number;
    name: string;
    email: string;
}

// src/utils/format.ts
export function formatUser(user: User): string {
    return `${user.name} (${user.email})`;
}

// src/index.ts
import { User, formatUser } from './types/user';

const user: User = {
    id: 1,
    name: 'Tom',
    email: 'tom@example.com'
};

console.log(formatUser(user));
```

### 步骤 5：编译运行

```bash
# 编译
npx tsc

# 运行
node dist/index.js

# 输出：Tom (tom@example.com)
```

---

## 常见问题

### 问题 1：编译后文件找不到

检查 `outDir` 和 `rootDir` 配置是否正确。

### 问题 2：模块解析失败

```json
{
    "moduleResolution": "node"
}
```

### 问题 3：类型定义报错

```json
{
    "skipLibCheck": true
}
```

---

## 本章小结

| 配置项 | 说明 | 推荐值 |
|--------|------|--------|
| target | 编译目标 | ES2022 |
| module | 模块系统 | ESNext |
| strict | 严格模式 | true |
| outDir | 输出目录 | ./dist |
| rootDir | 源码目录 | ./src |
| paths | 路径别名 | @/* |

---

## 下一章

[→ 14-类型注解初体验.md](./14-类型注解初体验.md)

---

## 练习

1. 创建一个完整的 tsconfig.json 配置
2. 配置路径别名并使用
3. 尝试关闭 strict 模式，观察区别