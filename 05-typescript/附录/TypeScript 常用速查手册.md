# TypeScript 常用速查手册

> 快速查找 TypeScript 语法和类型定义，适合日常开发参考

---

## 一、基础类型速查

### 基本类型

```typescript
// 字符串
let str: string = 'hello';

// 数字
let num: number = 42;

// 布尔
let bool: boolean = true;

// 空值
let nothing: void = undefined;

// 永不发生
let never: never;

// 任意类型（不推荐）
let anyValue: any = 'anything';

// 未知类型（安全）
let unknownValue: unknown = 'something';
```

### 数组和元组

```typescript
// 数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<string> = ['a', 'b', 'c'];

// 只读数组
let readonlyArr: readonly number[] = [1, 2, 3];

// 元组（固定长度和类型）
let tuple: [string, number] = ['张三', 25];

// 可选元组
let optionalTuple: [string, number?] = ['张三'];
```

### 特殊类型

```typescript
// 字面量类型
type Direction = 'up' | 'down' | 'left' | 'right';

// 联合类型
type ID = string | number;

// 交叉类型
type Employee = Person & { employeeId: number };

// 映射类型
type ReadonlyUser = Readonly<User>;
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
```

---

## 二、接口和类型别名

### 定义对象

```typescript
// 方式 1：interface
interface User {
    id: number;
    name: string;
    email?: string;  // 可选
    readonly createdAt: Date;  // 只读
}

// 方式 2：type
type User = {
    id: number;
    name: string;
    email?: string;
    readonly createdAt: Date;
};
```

### 函数类型

```typescript
// 接口方式
interface GreetFunc {
    (name: string, greeting?: string): string;
}

// type 方式
type GreetFunc = (name: string, greeting?: string) => string;

// 实现
const greet: GreetFunc = (name, greeting = '你好') => {
    return `${greeting}, ${name}`;
};
```

### 索引签名

```typescript
// 任意字符串键，值为 string 或 number
interface Dict {
    [key: string]: string | number;
}

const dict: Dict = {
    name: '张三',
    age: 25,
    city: '北京'
};
```

---

## 三、泛型速查

### 泛型函数

```typescript
// 基础泛型
function identity<T>(arg: T): T {
    return arg;
}

identity<string>('hello');
identity(42);  // 类型推断

// 多泛型参数
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}
```

### 泛型接口

```typescript
interface Box<T> {
    value: T;
}

const stringBox: Box<string> = { value: 'hello' };
const numberBox: Box<number> = { value: 42 };
```

### 泛型约束

```typescript
// 约束 T 必须有 length 属性
function logLength<T extends { length: number }>(arg: T): number {
    return arg.length;
}

logLength('hello');  // 5
logLength([1, 2, 3]);  // 3
// logLength(42);  // ❌ 错误
```

### keyof 约束

```typescript
// 约束 K 必须是 T 的键
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user = { id: 1, name: '张三', email: 'zhang@example.com' };
getProperty(user, 'name');  // '张三'
```

---

## 四、工具类型速查

### 类型变换

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

// Partial - 所有属性可选
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }

// Required - 所有属性必填
type RequiredUser = Required<PartialUser>;
// { id: number; name: string; email: string; }

// Readonly - 所有属性只读
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; readonly email: string; }
```

### 属性选择

```typescript
// Pick - 选取指定属性
type UserBasic = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }

// Omit - 排除指定属性
type UserSafe = Omit<User, 'email'>;
// { id: number; name: string; }
```

### 类型排除

```typescript
// Exclude - 排除类型
type T0 = Exclude<'a' | 'b' | 'c', 'a'>;  // 'b' | 'c'

// Extract - 提取类型
type T1 = Extract<'a' | 'b' | 'c', 'a' | 'b'>;  // 'a' | 'b'

// NonNullable - 排除 null/undefined
type T2 = NonNullable<string | null | undefined>;  // string
```

### 函数相关

```typescript
// Parameters - 获取参数类型
type T0 = Parameters<(a: string, b: number) => void>;
// [string, number]

// ReturnType - 获取返回类型
type T1 = ReturnType<() => { id: number }>;
// { id: number; }

// InstanceType - 获取实例类型
class Person {}
type T2 = InstanceType<typeof Person>;
// Person
```

### Record 类型

```typescript
// 定义键值对
type RolePermissions = Record<'admin' | 'user', string[]>;

const permissions: RolePermissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read']
};
```

---

## 五、类型守卫速查

### typeof 守卫

```typescript
function process(value: string | number) {
    if (typeof value === 'string') {
        // value: string
        return value.toUpperCase();
    } else {
        // value: number
        return value.toFixed(2);
    }
}
```

### instanceof 守卫

```typescript
class Dog {
    bark() { console.log('汪汪'); }
}

class Cat {
    meow() { console.log('喵喵'); }
}

function makeSound(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}
```

### in 守卫

```typescript
interface User { name: string; email: string; }
interface Product { title: string; price: number; }

function describe(value: User | Product) {
    if ('name' in value) {
        // value: User
        return `用户：${value.name}`;
    } else {
        // value: Product
        return `商品：${value.title}`;
    }
}
```

### 类型谓词

```typescript
// 自定义类型守卫
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function process(value: unknown) {
    if (isString(value)) {
        // value: string
        console.log(value.toUpperCase());
    }
}
```

---

## 六、实用代码片段

### API 响应类型

```typescript
interface APIResponse<T> {
    code: number;
    message: string;
    data: T;
}

// 使用
type UserListResponse = APIResponse<{
    users: User[];
    total: number;
}>;
```

### 分页类型

```typescript
interface PaginatedResult<T> {
    data: T[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}
```

### 事件类型

```typescript
type EventHandler<T = any> = (event: T) => void;

interface EventMap {
    'user:login': { userId: number; token: string };
    'user:logout': { userId: number };
    'error': { message: string; code: number };
}

class EventBus {
    on<K extends keyof EventMap>(
        event: K,
        handler: EventHandler<EventMap[K]>
    ) {
        // 实现...
    }

    emit<K extends keyof EventMap>(
        event: K,
        data: EventMap[K]
    ) {
        // 实现...
    }
}
```

### 状态管理类型

```typescript
type Action<T extends string, P = void> = P extends void
    ? { type: T }
    : { type: T; payload: P };

type Reducer<S, A> = (state: S, action: A) => S;

// 使用
type UserActions =
    | Action<'LOGIN', { username: string; token: string }>
    | Action<'LOGOUT'>;

interface UserState {
    user: { id: number; name: string } | null;
    token: string | null;
    isAuthenticated: boolean;
}

const userReducer: Reducer<UserState, UserActions> = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { /* ... */ };
        case 'LOGOUT':
            return { /* ... */ };
        default:
            return state;
    }
};
```

---

## 七、React 类型速查

### 组件 Props

```typescript
import React, { FC, ReactNode } from 'react';

interface ButtonProps {
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    onClick?: () => void;
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({
    variant = 'primary',
    children,
    onClick
}) => {
    return <button onClick={onClick}>{children}</button>;
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

// useCallback
const handleClick = useCallback(() => {
    console.log('clicked');
}, []);

// useMemo
const filteredList = useMemo(() => {
    return list.filter(item => item.active);
}, [list]);
```

### 事件处理器类型

```typescript
import React, { ChangeEvent, FormEvent, MouseEvent } from 'react';

function Form() {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        console.log(e.clientX, e.clientY);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} />
            <button onClick={handleClick}>提交</button>
        </form>
    );
}
```

---

## 八、Vue 类型速查

### Composition API

```typescript
import { ref, computed, watch, defineComponent, PropType } from 'vue';

interface User {
    id: number;
    name: string;
}

export default defineComponent({
    props: {
        userId: {
            type: Number as PropType<number>,
            required: true
        }
    },
    setup(props) {
        const user = ref<User | null>(null);
        const loading = ref(false);

        const userName = computed(() => {
            return user.value?.name || '匿名用户';
        });

        watch(() => props.userId, (newId) => {
            // 获取用户
        });

        return {
            user,
            loading,
            userName
        };
    }
});
```

---

## 九、Node.js 类型速查

### Express

```typescript
import express, { Request, Response, NextFunction } from 'express';

interface UserRequest extends Request {
    user?: {
        id: number;
        role: string;
    };
}

const app = express();

app.get('/users', (req: UserRequest, res: Response) => {
    res.json({ users: [] });
});

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(500).json({ error: err.message });
};
```

---

## 十、常见错误速查

### 类型不匹配

```typescript
// ❌ 错误
let age: number = '25';

// ✅ 正确
let age: number = 25;
```

### 缺少属性

```typescript
interface User {
    id: number;
    name: string;
}

// ❌ 错误
const user: User = { id: 1 };

// ✅ 正确
const user: User = { id: 1, name: '张三' };
```

### 类型推断失败

```typescript
// ❌ 可能推断为 any[]
const arr = [];

// ✅ 明确类型
const arr: string[] = [];
```

### 可选链和空值合并

```typescript
// 可选链 - 安全访问
const city = user.address?.city;

// 空值合并 - 提供默认值
const timeout = config.timeout ?? 5000;
```

---

## 十一、TS 5.x 新特性

### satisfies 操作符

```typescript
// 验证类型，同时保留字面量类型
const config = {
    port: 3000,
    host: 'localhost'
} satisfies { port: number; host: string };

// config.port 的类型是 3000（字面量）
```

### const 泛型参数

```typescript
// TS 5.0+
function identity<const T>(value: T): T {
    return value;
}

const result = identity([1, 2, 3]);
// result 的类型是 readonly [1, 2, 3]
```

### 内联 const 类型

```typescript
type Colors = 'red' | 'green' | 'blue';

const config: { colors: Colors[] } = {
    colors: ['red', 'green'] satisfies Colors[]
};
```

---

## 十二、实用工具函数

### 类型守卫函数

```typescript
function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}

function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

function isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
```

### 类型转换函数

```typescript
// 安全的 JSON 解析
function safeJsonParse<T>(str: string): T | null {
    try {
        return JSON.parse(str) as T;
    } catch {
        return null;
    }
}

// 字符串转数字
function toNumber(str: string): number | null {
    const num = Number(str);
    return isNaN(num) ? null : num;
}
```

---

**最后更新：** 2026-03-12
**TypeScript 版本：** 5.x
