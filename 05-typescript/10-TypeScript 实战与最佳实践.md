# TypeScript 实战与最佳实践

> 掌握 TypeScript 项目最佳实践，学会在主流框架中使用 TypeScript

## 本章学习目标

- 掌握 TypeScript 项目最佳实践
- 学会在 React/Vue/Node.js 中使用 TypeScript
- 能够进行 JavaScript 到 TypeScript 的迁移
- 完成完整的 TypeScript 实战项目

---

## 10.1 TypeScript 项目结构

### 推荐目录结构

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

### 类型定义文件

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

---

## 10.2 类型定义文件（.d.ts）

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

declare module 'lodash-es' {
    export function debounce<T extends (...args: any[]) => any>(
        func: T,
        wait?: number
    ): T;
}
```

### 第三方库类型声明

```typescript
// types/library.d.ts
declare module 'some-library' {
    export interface Options {
        debug?: boolean;
        timeout?: number;
    }

    export function init(options?: Options): void;
    export function destroy(): void;
}
```

---

## 10.3 React + TypeScript 实践

### 组件 Props 类型

```typescript
import React, { FC, ReactNode } from 'react';

// 函数组件 Props
interface ButtonProps {
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    children: ReactNode;
    className?: string;
}

// 方式 1：FC 泛型
const Button: FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    onClick,
    children
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size}`}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? '加载中...' : children}
        </button>
    );
};

// 方式 2：函数类型（推荐，不需要 children 类型）
function Button2({ children, onClick }: ButtonProps) {
    return <button onClick={onClick}>{children}</button>;
}
```

### 事件处理器类型

```typescript
import React, { ChangeEvent, FormEvent, MouseEvent } from 'react';

interface FormProps {
    onSubmit: (data: FormData) => void;
    onChange?: (field: string, value: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit, onChange }) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 处理提交
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.name, e.target.value);
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="username" onChange={handleChange} />
            <button onClick={handleClick}>提交</button>
        </form>
    );
};
```

### Hooks 类型

```typescript
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// useState
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

// useRef
const inputRef = useRef<HTMLInputElement>(null);
const renderCount = useRef<number>(0);

// useMemo
const filteredList = useMemo(() => {
    return list.filter(item => item.active);
}, [list]);

// useCallback
const handleClick = useCallback(() => {
    console.log('clicked');
}, []);

// 自定义 Hooks
function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value: T) => {
        setStoredValue(value);
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    return [storedValue, setValue];
}
```

---

## 10.4 Vue + TypeScript 实践

### Composition API

```typescript
import { ref, computed, watch, defineComponent, PropType } from 'vue';

interface User {
    id: number;
    name: string;
    email: string;
}

export default defineComponent({
    name: 'UserProfile',
    props: {
        userId: {
            type: Number as PropType<number>,
            required: true
        }
    },
    setup(props) {
        // ref 类型
        const user = ref<User | null>(null);
        const loading = ref(false);

        // computed 类型
        const userName = computed<string>(() => {
            return user.value?.name || '匿名用户';
        });

        // 函数类型
        const fetchUser = async () => {
            loading.value = true;
            try {
                // API 调用
                // user.value = await api.getUser(props.userId);
            } finally {
                loading.value = false;
            }
        };

        // watch 类型
        watch(
            () => props.userId,
            (newId) => {
                fetchUser();
            }
        );

        // 生命周期
        onMounted(() => {
            fetchUser();
        });

        return {
            user,
            loading,
            userName,
            fetchUser
        };
    }
});
```

### 定义组件 Props

```typescript
import { defineComponent, PropType } from 'vue';

interface Article {
    id: number;
    title: string;
    content: string;
}

export default defineComponent({
    props: {
        article: {
            type: Object as PropType<Article>,
            required: true
        },
        tags: {
            type: Array as PropType<string[]>,
            default: () => []
        },
        showComments: {
            type: Boolean,
            default: true
        }
    },
    emits: {
        update: (article: Article) => true,
        delete: (id: number) => true
    },
    setup(props, { emit }) {
        const handleDelete = () => {
            emit('delete', props.article.id);
        };

        return {
            handleDelete
        };
    }
});
```

---

## 10.5 Node.js + TypeScript 实践

### Express + TypeScript

```typescript
import express, { Request, Response, NextFunction } from 'express';

interface UserRequest extends Request {
    user?: {
        id: number;
        role: string;
    };
}

const app = express();

// 中间件类型
const authMiddleware = (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    // 验证用户
    req.user = { id: 1, role: 'admin' };
    next();
};

// 路由处理器
app.get('/users', authMiddleware, (req: UserRequest, res: Response) => {
    res.json({ users: [] });
});

app.post('/users', (req: Request, res: Response) => {
    const { name, email } = req.body;
    res.json({ id: 1, name, email });
});

// 错误处理中间件
const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);
    res.status(500).json({ error: err.message });
};

app.use(errorHandler);
```

### NestJS 示例

```typescript
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

interface CreateUserDto {
    name: string;
    email: string;
}

@ApiTags('用户')
@Controller('users')
export class UsersController {
    @Get()
    @ApiOperation({ summary: '获取用户列表' })
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}
```

---

## 10.6 渐进式迁移策略

### 步骤一：基础配置

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "strict": false,
    "noImplicitAny": false
  }
}
```

### 步骤二：逐步迁移

```javascript
// 1. 重命名 .js 为 .ts
// app.js -> app.ts

// 2. 添加基础类型
function greet(name) {  // JavaScript
    return `Hello, ${name}!`;
}

function greet(name: string): string {  // TypeScript
    return `Hello, ${name}!`;
}

// 3. 使用 JSDoc 过渡
/**
 * @param {string} name
 * @returns {string}
 */
function greet(name) {
    return `Hello, ${name}!`;
}
```

### 步骤三：启用严格模式

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

---

## 10.7 常见陷阱与解决方案

### 陷阱 1：过度使用 any

```typescript
// ❌ 不推荐
function processData(data: any): any {
    return data;
}

// ✅ 推荐
function processData<T>(data: T): T {
    return data;
}
```

### 陷阱 2：类型断言滥用

```typescript
// ❌ 不推荐
const name = value as string;

// ✅ 推荐
if (typeof value === 'string') {
    const name = value;
}
```

### 陷阱 3：忽略编译错误

```typescript
// ❌ 不推荐
// @ts-ignore
const result = someFunction();

// ✅ 推荐
// 理解错误原因，正确修复
```

### 陷阱 4：过度工程化

```typescript
// ❌ 过度复杂
type ComplexType<T, U, V, W, X> = {
    a: T extends U ? V : W;
    b: X extends any ? never : T;
};

// ✅ 简洁明了
interface User {
    id: number;
    name: string;
}
```

---

## 10.8 实战项目：博客 API

### 类型定义

```typescript
// src/types/index.ts
export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: Date;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
    author?: User;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: number;
    postId: number;
    authorId: number;
    content: string;
    createdAt: Date;
}

export interface APIResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}
```

### API 实现

```typescript
// src/api/posts.ts
import { Post, PaginatedResponse } from '../types';

class PostsAPI {
    private baseURL = '/api';

    async getPosts(
        page = 1,
        pageSize = 10
    ): Promise<PaginatedResponse<Post>> {
        const response = await fetch(
            `${this.baseURL}/posts?page=${page}&pageSize=${pageSize}`
        );
        return response.json();
    }

    async getPost(id: number): Promise<Post> {
        const response = await fetch(`${this.baseURL}/posts/${id}`);
        return response.json();
    }

    async createPost(data: {
        title: string;
        content: string;
    }): Promise<Post> {
        const response = await fetch(`${this.baseURL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async updatePost(
        id: number,
        data: Partial<Pick<Post, 'title' | 'content'>>
    ): Promise<Post> {
        const response = await fetch(`${this.baseURL}/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }

    async deletePost(id: number): Promise<void> {
        await fetch(`${this.baseURL}/posts/${id}`, {
            method: 'DELETE'
        });
    }
}

export const postsAPI = new PostsAPI();
```

---

## 10.9 学习资源

### 官方文档
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [React + TypeScript](https://react-typescript-cheatsheet.netlify.app/)
- [Vue + TypeScript](https://vuejs.org/guide/typescript-overview.html)

### 最佳实践
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Effective TypeScript](https://effectivetypescript.com/)

### 实战项目
- [TypeScript Node Starter](https://github.com/Microsoft/TypeScript-Node-Starter)
- [React TypeScript Boilerplate](https://github.com/react-boilerplate/react-boilerplate)

---

**上一章：** [← 09-装饰器](./09-装饰器.md)

**恭喜！你已经完成了整个 TypeScript 学习路线！** 🎉

---

## 总结

通过本教程的学习，你应该已经掌握了：

1. **基础类型** - boolean、number、string、array、tuple、enum 等
2. **接口与对象** - 接口定义、继承、实现
3. **类型别名** - 联合类型、交叉类型、映射类型
4. **泛型编程** - 泛型函数、接口、类
5. **类型守卫** - typeof、instanceof、in、类型谓词
6. **高级类型** - 条件类型、infer、递归类型
7. **工具类型** - Partial、Pick、Omit 等内置工具
8. **装饰器** - 类装饰器、方法装饰器、属性装饰器
9. **实战应用** - React、Vue、Node.js 中的 TypeScript

继续实践，不断提升你的 TypeScript 技能！
