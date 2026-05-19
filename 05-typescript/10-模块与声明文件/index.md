# 模块与声明文件 ⭐

> ES Modules、声明文件、@types、全局声明

---

## 学习目标

- 掌握模块导出导入语法
- 学会编写声明文件（.d.ts）
- 了解 @types 包的使用
- 掌握全局类型声明

---

## 生活化比喻

**模块和声明文件就像"快递和说明书"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  快递与说明书                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│    模块导出 = 寄快递                                  │
│    ─────────────                                     │
│    export 就是把东西打包寄出去                        │
│    其他文件 import 就是收到快递并拆包                │
│                                                      │
│    默认导出 = 寄一个大箱子                            │
│    ─────────────                                     │
│    只能寄一个大件，收件人直接拿                      │
│    export default class Calculator                   │
│                                                      │
│    命名导出 = 寄多个小包裹                            │
│    ─────────────                                     │
│    每个东西独立打包，收件人按需领取                  │
│    export function add, export const PI              │
│                                                      │
│    声明文件 = 产品说明书                              │
│    ─────────────                                     │
│    .d.ts 文件不包含实际代码，只告诉 TypeScript       │
│    "这个东西有什么功能、参数是什么类型"              │
│    就像说明书不生产产品，只描述产品                 │
│                                                      │
│    @types = 第三方说明书                              │
│    ─────────────                                     │
│    别人帮你写好的说明书                              │
│    npm install -D @types/lodash                     │
│                                                      │
│    全局声明 = 贴在墙上的公告                          │
│    ─────────────                                     │
│    整个项目都能看到的声明                            │
│    declare global { interface Window { ... } }       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 模块导出导入

**最简示例（1-3行）：**

```typescript
export function add(a: number, b: number): number { return a + b; }
import { add } from './math';
```

**详细示例：**

```typescript
// math.ts — 导出
export const PI = 3.14159;

export function add(a: number, b: number): number {
    return a + b;
}

export interface Point {
    x: number;
    y: number;
}

// 默认导出 — 每个文件只能有一个
export default class Calculator {
    add(a: number, b: number) { return a + b; }
}

// main.ts — 导入
import Calculator, { add, PI, Point } from './math';

// 别名导入 — 避免命名冲突
import { add as sum } from './math';

// 命名空间导入 — 导入全部
import * as Math from './math';
Math.add(1, 2);
```

---

### 声明文件

```typescript
// types/my-lib.d.ts — 为没有类型的库声明
declare module 'my-lib' {
    export function greet(name: string): string;
    export interface Config {
        timeout?: number;
        retries?: number;
    }
}

// 全局声明 — 扩展 Window
declare global {
    interface Window {
        myAppConfig: { theme: string };
    }
}

// 使用
import { greet } from 'my-lib';
window.myAppConfig.theme;
```

---

## L2 实践层：用好

### @types 包

```bash
# 安装第三方类型声明
npm install -D @types/lodash @types/node @types/react
```

```typescript
// 安装后直接使用，无需额外配置
import _ from 'lodash';
_.debounce(fn, 300);  // 有完整的类型提示
```

### 模块类型对比

| 方案 | 导出 | 导入 | 适用 |
|------|------|------|------|
| 命名导出 | `export function fn()` | `import { fn } from './m'` | 多个导出项 |
| 默认导出 | `export default class C` | `import C from './m'` | 单一主功能 |
| 混合导出 | `export default C; export const X` | `import C, { X } from './m'` | 主+辅功能 |
| 重新导出 | `export * from './m'` | 链式传递 | 模块聚合 |

### 反模式

```typescript
// ❌ 错误：用 export = （CommonJS 风格，ESM 不兼容）
export = { add, sub };

// ✅ 正确：用 ES Module 风格
export { add, sub };
```

```typescript
// ❌ 错误：声明文件包含实现代码
// types/utils.d.ts
export function add(a: number, b: number) {
    return a + b;  // ❌ 声明文件不应有实现
}

// ✅ 正确：只声明类型
export function add(a: number, b: number): number;
```

### 声明文件组织

```
types/
├── index.d.ts         ← 入口（导出所有）
├── models.d.ts        ← 数据模型
├── api.d.ts           ← API 类型
└── global.d.ts        ← 全局声明
```

---

## L3 专家层：深入

### 声明合并

```typescript
// 扩展第三方库类型
declare module 'express' {
    interface Request {
        user?: { id: number; role: string };
    }
}

// 使用
app.get('/profile', (req, res) => {
    const userId = req.user?.id;  // ✅ 有类型提示
});
```

### 模块解析原理

```
TypeScript 模块解析流程：

import { x } from './module'
    ↓
1. 查找 ./module.ts
2. 查找 ./module.tsx
3. 查找 ./module.d.ts
4. 查找 ./module/index.ts
5. 查找 node_modules/module/package.json (types 字段)
6. 查找 node_modules/@types/module/index.d.ts
```

### 性能考量

| 操作 | 性能影响 | 说明 |
|------|---------|------|
| 大型 @types 包 | 中等 | 类型检查时间增加 |
| 声明文件过多 | 低 | TypeScript 会缓存 |
| 全局声明污染 | 高 | 影响 IDE 响应速度 |

### 知识关联

```
模块知识关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  导出导入   │────→│  声明文件   │────→│  类型声明   │
│  export/    │     │  .d.ts/     │     │  @types/    │
│  import     │     │  declare    │     │  global     │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **ES Module** | ES6 标准模块系统 | `export` / `import` |
| **声明文件** | 只提供类型信息的 .d.ts 文件 | `types/index.d.ts` |
| **@types** | 社区维护的类型声明包 | `@types/lodash` |
| **declare** | 声明外部存在的变量/模块 | `declare module 'x'` |
| **全局声明** | 全局可用的类型声明 | `declare global` |

---

## 实践练习

```typescript
// 练习 1：为自定义库编写声明文件
// types/my-utils.d.ts
declare module 'my-utils' {
    export function formatDate(date: Date, format?: string): string;
    export function debounce<T extends (...args: any[]) => any>(
        fn: T,
        delay: number
    ): T;
    export interface HttpClient {
        get<T>(url: string): Promise<T>;
        post<T>(url: string, body: unknown): Promise<T>;
    }
}

// 练习 2：扩展全局 Window
declare global {
    interface Window {
        __APP_VERSION__: string;
        __DEBUG__: boolean;
    }
}

// 练习 3：重新导出聚合模块
// src/index.ts
export * from './utils';
export * from './api';
export { default as Config } from './config';
```

---

## 常见问题

### Q1：声明文件（.d.ts）和普通 .ts 文件有什么区别？

**声明文件只包含类型信息，编译后不生成 .js 文件。普通 .ts 文件包含实现代码，编译后生成 .js。**

### Q2：什么时候需要自己写声明文件？

**当使用的第三方库没有内置类型声明，且 @types 下也没有时，需要自己写。**

### Q3：declare 和 export 有什么区别？

**declare 声明外部存在的东西（不产生代码），export 导出当前模块的内容：**

```typescript
// declare — 告诉 TS 外部有这个
declare const jQuery: (selector: string) => any;

// export — 导出当前模块的内容
export function myFunc() { }
```

---

## 学习资源

- [TypeScript 模块](https://www.typescriptlang.org/docs/handbook/modules.html) ⭐ 官方权威
- [TypeScript 声明文件](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
