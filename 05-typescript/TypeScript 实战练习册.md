# TypeScript 实战练习册

> 通过实际练习巩固 TypeScript 知识，从易到难循序渐进

---

## 使用说明

1. **独立完成** - 先尝试自己完成，不要看答案
2. **对比答案** - 完成后对比参考答案
3. **理解原理** - 理解为什么要这样写
4. **举一反三** - 尝试修改和扩展

---

## 练习 1：基础类型练习 ⭐

### 题目 1.1：定义用户类型

```typescript
// 要求：
// 1. 定义一个 User 类型，包含以下属性：
//    - id: 数字
//    - name: 字符串
//    - email: 字符串
//    - age: 数字（可选）
//    - isActive: 布尔值，默认为 true

// 你的代码：


// 测试
const user1: User = {
    id: 1,
    name: '张三',
    email: 'zhang@example.com',
    age: 25,
    isActive: true
};

const user2: User = {
    id: 2,
    name: '李四',
    email: 'li@example.com'
    // age 可选，可以不写
};
```

### 参考答案

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    isActive: boolean;
}
```

---

### 题目 1.2：函数类型定义

```typescript
// 要求：
// 1. 定义一个 greet 函数，接收 name 参数（字符串），返回字符串
// 2. 定义一个 add 函数，接收两个 number 参数，返回 number
// 3. 定义一个 isAdult 函数，接收 age 参数（number），返回 boolean

// 你的代码：


// 测试
greet('张三');  // '你好，张三'
add(1, 2);      // 3
isAdult(17);    // false
isAdult(18);    // true
```

### 参考答案

```typescript
function greet(name: string): string {
    return `你好，${name}`;
}

function add(a: number, b: number): number {
    return a + b;
}

function isAdult(age: number): boolean {
    return age >= 18;
}
```

---

## 练习 2：接口练习 ⭐⭐

### 题目 2.1：商品接口

```typescript
// 要求：
// 1. 定义 Product 接口，包含：
//    - id: 数字
//    - name: 字符串
//    - price: 数字
//    - stock: 数字（库存）
//    - description: 字符串（可选）
//    - tags: 字符串数组

// 你的代码：


// 测试
const product: Product = {
    id: 1,
    name: 'iPhone 15',
    price: 7999,
    stock: 100,
    tags: ['手机', '苹果', '5G']
};
```

### 参考答案

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description?: string;
    tags: string[];
}
```

---

### 题目 2.2：接口继承

```typescript
// 要求：
// 1. 定义 BaseEntity 接口，包含：
//    - id: number
//    - createdAt: Date
//    - updatedAt: Date
// 2. 定义 User 接口，继承 BaseEntity，添加：
//    - name: string
//    - email: string

// 你的代码：


// 测试
const user: User = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '张三',
    email: 'zhang@example.com'
};
```

### 参考答案

```typescript
interface BaseEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

interface User extends BaseEntity {
    name: string;
    email: string;
}
```

---

## 练习 3：类型别名和联合类型 ⭐⭐

### 题目 3.1：状态类型

```typescript
// 要求：
// 1. 定义 Status 类型，只能是 'pending' | 'loading' | 'success' | 'error'
// 2. 定义 handleStatus 函数，根据状态返回不同中文

// 你的代码：


// 测试
handleStatus('pending');   // '等待中'
handleStatus('loading');   // '加载中'
handleStatus('success');   // '成功'
handleStatus('error');     // '错误'
```

### 参考答案

```typescript
type Status = 'pending' | 'loading' | 'success' | 'error';

function handleStatus(status: Status): string {
    switch (status) {
        case 'pending':
            return '等待中';
        case 'loading':
            return '加载中';
        case 'success':
            return '成功';
        case 'error':
            return '错误';
        default:
            const _exhaustive: never = status;
            return _exhaustive;
    }
}
```

---

### 题目 3.2：可辨识联合

```typescript
// 要求：
// 1. 定义 Circle 接口：kind 为 'circle'，radius 为 number
// 2. 定义 Square 接口：kind 为 'square'，side 为 number
// 3. 定义 Shape 联合类型
// 4. 定义 getArea 函数，计算面积

// 你的代码：


// 测试
const circle: Shape = { kind: 'circle', radius: 10 };
const square: Shape = { kind: 'square', side: 5 };

getArea(circle);  // 314.159...
getArea(square);  // 25
```

### 参考答案

```typescript
interface Circle {
    kind: 'circle';
    radius: number;
}

interface Square {
    kind: 'square';
    side: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;
        case 'square':
            return shape.side ** 2;
        default:
            const _exhaustive: never = shape;
            return _exhaustive;
    }
}
```

---

## 练习 4：泛型练习 ⭐⭐⭐

### 题目 4.1：泛型函数

```typescript
// 要求：
// 1. 定义 identity 函数，接收什么类型返回什么类型
// 2. 定义 firstElement 函数，返回数组第一个元素

// 你的代码：


// 测试
identity(42);           // 42
identity('hello');      // 'hello'

firstElement([1, 2, 3]);    // 1
firstElement(['a', 'b']);   // 'a'
```

### 参考答案

```typescript
function identity<T>(arg: T): T {
    return arg;
}

function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}
```

---

### 题目 4.2：泛型接口

```typescript
// 要求：
// 1. 定义 Box 泛型接口，包含 value 属性
// 2. 定义 APIResponse 泛型接口，包含 code、message、data

// 你的代码：


// 测试
const stringBox: Box<string> = { value: 'hello' };
const numberBox: Box<number> = { value: 42 };

const userRes: APIResponse<User> = {
    code: 200,
    message: 'success',
    data: { id: 1, name: '张三' }
};
```

### 参考答案

```typescript
interface Box<T> {
    value: T;
}

interface APIResponse<T> {
    code: number;
    message: string;
    data: T;
}
```

---

### 题目 4.3：泛型约束

```typescript
// 要求：
// 1. 定义 logLength 函数，接收有 length 属性的参数，返回 length
// 2. 定义 getProperty 函数，安全获取对象的属性

// 你的代码：


// 测试
logLength('hello');         // 5
logLength([1, 2, 3]);       // 3
logLength({ length: 10 });  // 10

const user = { id: 1, name: '张三' };
getProperty(user, 'name');  // '张三'
getProperty(user, 'id');    // 1
```

### 参考答案

```typescript
function logLength<T extends { length: number }>(arg: T): number {
    return arg.length;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
```

---

## 练习 5：类型守卫练习 ⭐⭐⭐

### 题目 5.1：自定义类型守卫

```typescript
// 要求：
// 1. 定义 isString 类型守卫函数
// 2. 定义 isNumber 类型守卫函数
// 3. 定义 isObject 类型守卫函数
// 4. 定义 process 函数，根据类型输出不同结果

// 你的代码：


// 测试
process('hello');   // 'HELLO'
process(42);        // '42.00'
process({ name: '张三' });  // '对象：name'
process(null);      // '空值'
```

### 参考答案

```typescript
function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !isNaN(value);
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function process(value: unknown): string {
    if (isString(value)) {
        return value.toUpperCase();
    } else if (isNumber(value)) {
        return value.toFixed(2);
    } else if (isObject(value)) {
        const keys = Object.keys(value);
        return `对象：${keys[0]}`;
    } else {
        return '空值';
    }
}
```

---

## 练习 6：工具类型练习 ⭐⭐⭐

### 题目 6.1：实现工具类型

```typescript
// 要求：不查看内置实现，自己实现以下工具类型

// 1. MyPartial - 所有属性可选
type MyPartial<T> = {
    // 你的代码
};

// 2. MyPick - 选取指定属性
type MyPick<T, K extends keyof T> = {
    // 你的代码
};

// 3. MyOmit - 排除指定属性
type MyOmit<T, K extends keyof any> = {
    // 你的代码
};

// 4. MyReadonly - 所有属性只读
type MyReadonly<T> = {
    // 你的代码
};


// 测试
interface User {
    id: number;
    name: string;
    email: string;
}

type PartialUser = MyPartial<User>;
// { id?: number; name?: string; email?: string; }

type UserBasic = MyPick<User, 'id' | 'name'>;
// { id: number; name: string; }

type UserSafe = MyOmit<User, 'email'>;
// { id: number; name: string; }

type ReadonlyUser = MyReadonly<User>;
// { readonly id: number; readonly name: string; readonly email: string; }
```

### 参考答案

```typescript
type MyPartial<T> = {
    [P in keyof T]?: T[P];
};

type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

type MyOmit<T, K extends keyof any> = {
    [P in Exclude<keyof T, K>]: T[P];
};

type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

---

## 练习 7：实战项目 ⭐⭐⭐⭐

### 题目 7.1：待办事项管理

```typescript
// 要求：
// 1. 定义 Todo 接口
// 2. 定义 TodoManager 类
// 3. 实现添加、删除、切换状态、列表功能

interface Todo {
    // 你的代码
}

class TodoManager {
    // 你的代码
}


// 测试
const manager = new TodoManager();

manager.add('学习 TypeScript', 'high');
manager.add('完成练习', 'medium');
manager.add('复习 ES6', 'low');

manager.toggle(1);
manager.remove(2);

console.log(manager.list());
console.log(manager.list({ completed: false }));
console.log(manager.list({ sortBy: 'priority' }));
```

### 参考答案

```typescript
type Priority = 'high' | 'medium' | 'low';

interface Todo {
    id: number;
    text: string;
    priority: Priority;
    completed: boolean;
    createdAt: Date;
}

class TodoManager {
    private todos: Todo[] = [];
    private nextId = 1;

    add(text: string, priority: Priority = 'medium'): Todo {
        const todo: Todo = {
            id: this.nextId++,
            text,
            priority,
            completed: false,
            createdAt: new Date()
        };
        this.todos.push(todo);
        return todo;
    }

    remove(id: number): Todo | null {
        const index = this.todos.findIndex(t => t.id === id);
        if (index === -1) return null;
        return this.todos.splice(index, 1)[0];
    }

    toggle(id: number): Todo | null {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return null;
        todo.completed = !todo.completed;
        return todo;
    }

    list(options?: {
        completed?: boolean;
        priority?: Priority;
        sortBy?: 'priority' | 'date';
    }): Todo[] {
        let result = [...this.todos];

        if (options?.completed !== undefined) {
            result = result.filter(t => t.completed === options.completed);
        }

        if (options?.priority) {
            result = result.filter(t => t.priority === options.priority);
        }

        if (options?.sortBy === 'priority') {
            const order = { high: 0, medium: 1, low: 2 };
            result.sort((a, b) => order[a.priority] - order[b.priority]);
        } else if (options?.sortBy === 'date') {
            result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }

        return result;
    }
}
```

---

## 练习 8：综合挑战 ⭐⭐⭐⭐⭐

### 题目 8.1：API 客户端

```typescript
// 要求：
// 1. 定义泛型 APIResponse 接口
// 2. 定义泛型 APIClient 类
// 3. 实现 get、post、put、delete 方法

// 你的代码：


// 测试
interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
}

const api = new APIClient('https://api.example.com');

// 类型安全的请求
api.get<User[]>('/users');
api.get<User>('/users/1');
api.post<Post>('/posts', { title: '标题', content: '内容' });
api.put<User>('/users/1', { name: '新名字' });
api.delete('/posts/1');
```

### 参考答案

```typescript
interface APIResponse<T> {
    code: number;
    message: string;
    data: T;
}

interface RequestConfig extends RequestInit {
    baseURL?: string;
    timeout?: number;
}

class APIClient {
    private baseURL: string;
    private defaultConfig: RequestConfig;

    constructor(baseURL: string, config: RequestConfig = {}) {
        this.baseURL = baseURL;
        this.defaultConfig = {
            timeout: 10000,
            headers: { 'Content-Type': 'application/json' },
            ...config
        };
    }

    private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        const mergedConfig = { ...this.defaultConfig, ...config };

        const response = await fetch(url, mergedConfig);
        const result: APIResponse<T> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message);
        }

        return result.data;
    }

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request<T>(endpoint + query, { method: 'GET' });
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}
```

---

## 进阶练习

### 挑战 1：实现 DeepPartial

```typescript
// 要求：实现深度 Partial，递归处理嵌套对象

type DeepPartial<T> = {
    // 你的代码
};


// 测试
interface User {
    id: number;
    profile: {
        name: string;
        address: {
            city: string;
            street: string;
        };
    };
}

type UpdateUserInput = DeepPartial<User>;
// {
//     id?: number;
//     profile?: {
//         name?: string;
//         address?: {
//             city?: string;
//             street?: string;
//         };
//     };
// }
```

### 参考答案

```typescript
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

---

### 挑战 2：实现 ReadonlyArrayKeys

```typescript
// 要求：将数组类型的键变为只读

type ReadonlyArrayKeys<T> = {
    // 你的代码
};


// 测试
interface Config {
    name: string;
    tags: string[];
    items: number[];
}

type ReadonlyConfig = ReadonlyArrayKeys<Config>;
// {
//     name: string;
//     readonly tags: readonly string[];
//     readonly items: readonly number[];
// }
```

### 参考答案

```typescript
type ReadonlyArrayKeys<T> = {
    readonly [K in keyof T]: T[K] extends any[] ? readonly T[K][number][] : T[K];
};
```

---

## 学习建议

1. **每天练习** - 每天完成 1-2 个练习
2. **理解原理** - 不要死记硬背
3. **实际应用** - 将所学应用到项目中
4. **查阅文档** - 遇到问题先查官方文档
5. **总结笔记** - 记录学习心得和易错点

---

**答案不是唯一的** - 可能有多种解法，关键是理解原理
**遇到困难很正常** - 多思考、多尝试、多查阅

祝你学习进步！🎉
