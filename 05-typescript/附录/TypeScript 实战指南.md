# TypeScript 实战指南

> TypeScript 项目最佳实践与实战技巧

---

## 本章目标

- 掌握 TypeScript 项目结构
- 学会配置路径别名
- 了解最佳实践
- 能够进行 JavaScript 到 TypeScript 的迁移

---

## 1. 推荐项目结构

```
my-project/
├── src/
│   ├── components/      # 组件
│   ├── hooks/          # 自定义 Hooks
│   ├── utils/          # 工具函数
│   ├── types/          # 类型定义
│   ├── api/            # API 调用
│   ├── store/          # 状态管理
│   ├── pages/          # 页面
│   └── index.ts        # 入口文件
├── tests/              # 测试文件
├── types/              # 全局类型定义
├── .eslintrc.js        # ESLint 配置
├── .prettierrc         # Prettier 配置
├── tsconfig.json       # TypeScript 配置
└── package.json
```

---

## 2. 路径别名配置

### tsconfig.json

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"],
            "@components/*": ["src/components/*"],
            "@utils/*": ["src/utils/*"],
            "@api/*": ["src/api/*"],
            "@types/*": ["src/types/*"]
        }
    }
}
```

### 使用别名

```typescript
// 之前
import { UserCard } from '../../components/UserCard';
import { formatDate } from '../utils/formatDate';

// 之后
import { UserCard } from '@/components/UserCard';
import { formatDate } from '@/utils/formatDate';
```

---

## 3. 类型定义文件

### 类型定义目录

```typescript
// src/types/index.ts
export interface User {
    id: number;
    name: string;
    email: string;
}

export interface APIResponse<T> {
    code: number;
    message: string;
    data: T;
}

export type Status = 'pending' | 'loading' | 'success' | 'error';
```

### 全局类型声明

```typescript
// types/global.d.ts
declare global {
    interface Window {
        __INITIAL_STATE__?: any;
    }

    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            API_URL: string;
        }
    }
}

export {};
```

### 模块声明

```typescript
// types/modules.d.ts
declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}
```

---

## 4. 最佳实践

### ✅ 推荐做法

```typescript
// 1. 使用 strict 模式
// tsconfig.json: "strict": true

// 2. 优先使用 interface 定义对象
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

// 6. 使用工具类型避免重复
type UserUpdate = Partial<User>;
type UserPreview = Pick<User, 'id' | 'name'>;
```

### ❌ 避免的做法

```typescript
// 1. 滥用 any
function bad(data: any) {  // ❌
    return data;
}

// 2. 忽略类型错误
// @ts-ignore  // ❌
someCode();

// 3. 类型断言过度使用
const value = data as any as string;  // ❌

// 4. 不使用严格模式
// "strict": false  // ❌
```

---

## 5. JavaScript 到 TypeScript 迁移

### 迁移步骤

```
1. 添加 tsconfig.json
2. 将 .js 文件重命名为 .ts
3. 修复类型错误
4. 逐步添加类型注解
5. 开启 strict 模式
```

### 渐进式迁移

```typescript
// 第一步：允许隐式 any
// tsconfig.json: "noImplicitAny": false

// 第二步：添加类型
function add(a: number, b: number): number {
    return a + b;
}

// 第三步：开启严格模式
// tsconfig.json: "strict": true
```

---

## 6. 常见问题解决

### 问题 1：第三方库没有类型

```typescript
// 创建 types/xxx.d.ts
declare module 'some-library' {
    export function doSomething(input: string): number;
}
```

### 问题 2：类型导入优化

```typescript
// 使用 type 关键字明确类型导入
import type { User } from './types';

// 或使用隔离的 type-only 导入
import { type User, type Status } from './types';
```

### 问题 3：循环依赖

```typescript
// 使用接口避免循环依赖
// a.ts
import type { B } from './b';

export interface A {
    b?: B;
}

// b.ts
import type { A } from './a';

export interface B {
    a?: A;
}
```

---

## 本章小结

| 实践 | 说明 |
|------|------|
| 项目结构 | 分离类型、组件、工具函数 |
| 路径别名 | 使用 @/ 简化导入 |
| 类型定义 | 集中管理，便于复用 |
| strict 模式 | 始终开启 |
| 避免 any | 使用 unknown 替代 |
| 工具类型 | 善用 Partial、Pick 等 |

---

**上一篇：** [← 模块与声明文件](../10-模块与声明文件/)
**下一篇：** [→ 框架集成指南](./框架集成指南.md)