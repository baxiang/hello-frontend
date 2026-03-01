# TypeScript 基础

## 学习目标
- 理解 TypeScript 的类型系统
- 掌握接口和类型别名的使用
- 学会使用泛型编程
- 理解高级类型特性

---

## 6.1 基础类型

### 基本类型

```typescript
// 布尔值
let isDone: boolean = false;

// 数字
let count: number = 10;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// 字符串
let name: string = "张三";
let age: number = 25;
let greeting: string = `你好，我叫${name}，今年${age}岁`;

// 数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];  // 泛型语法

// 元组
let tuple: [string, number] = ["张三", 25];
let [name, age] = tuple;

// 枚举
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Green;

enum Status {
    Pending = "pending",
    Success = "success",
    Error = "error"
}

// any - 任意类型
let notSure: any = 4;
notSure = "string";
notSure = false;

// unknown - 未知类型（类型安全的 any）
let value: unknown;
value = 42;
value = "hello";

if (typeof value === "number") {
    let num: number = value;  // OK
}

// void - 空值
function warnUser(): void {
    console.log("警告");
}

// null 和 undefined
let u: undefined = undefined;
let n: null = null;

// never - 永不存在的值
function error(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}

// object - 对象类型
declare function create(o: object): void;
create({ prop: 0 });  // OK
```

---

## 6.2 类型推断和断言

### 类型推断

```typescript
// 自动推断
let x = 3;  // number
let y = "hello";  // string

// 函数返回值推断
function add(a: number, b: number) {
    return a + b;  // 推断为 number
}

// 最佳共同类型
let arr = [1, null, "hello"];  // (number | null | string)[]

// 上下文归类
window.onmousedown = function(event) {
    console.log(event.button);  // 推断为 MouseEvent
};
```

### 类型断言

```typescript
// 语法 1：as 语法
let someValue: unknown = "hello";
let strLength: number = (someValue as string).length;

// 语法 2：尖括号语法
let strLength2: number = (<string>someValue).length;

// DOM 元素断言
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const input = document.querySelector("input") as HTMLInputElement;

// 非空断言
let value: string | null = null;
let length: number = value!.length;  // 告诉 TS value 不为 null

// 常量断言
const obj = { x: 1, y: 2 } as const;
// obj.x 的类型是 1，而不是 number
```

---

## 6.3 接口

### 基础用法

```typescript
interface User {
    id: number;
    name: string;
    email?: string;  // 可选属性
    readonly createdAt: Date;  // 只读属性
}

const user: User = {
    id: 1,
    name: "张三",
    createdAt: new Date()
};

// user.createdAt = new Date();  // 错误，只读

// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = (src, sub) => {
    return src.includes(sub);
};

// 数组类型
interface StringArray {
    [index: number]: string;
}

const arr: StringArray = ["a", "b", "c"];

// 键映射
interface NumberMap {
    [key: string]: number;
}

const map: NumberMap = {
    a: 1,
    b: 2
};
```

### 接口继承

```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

const square: Square = {
    color: "red",
    sideLength: 10
};

// 多重继承
interface PenStroke {
    penWidth: number;
}

interface FilledSquare extends Square, PenStroke {
    filled: boolean;
}
```

---

## 6.4 类型别名

### 基础用法

```typescript
// 基础类型别名
type ID = string | number;
type Point = {
    x: number;
    y: number;
};

// 联合类型
type Status = "pending" | "success" | "error";
type Result<T> = { data: T } | { error: string };

// 交叉类型
type A = { a: string };
type B = { b: number };
type C = A & B;  // { a: string } & { b: number }

// 使用
const point: Point = { x: 1, y: 2 };
const status: Status = "pending";
const result: Result<string> = { data: "hello" };
```

### 映射类型

```typescript
// Partial - 所有属性可选
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; createdAt?: Date }

// Required - 所有属性必填
type RequiredUser = Required<User>;

// Readonly - 所有属性只读
type ReadonlyUser = Readonly<User>;

// Pick - 选取部分属性
type UserBase = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit -  omit 部分属性
type UserWithoutId = Omit<User, "id">;
// { name: string; email?: string; createdAt: Date }

// Record - 构建对象类型
type UserMap = Record<number, User>;
// { [key: number]: User }

// Exclude - 从联合类型排除
type A = "a" | "b" | "c";
type B = Exclude<A, "a">;  // "b" | "c"

// Extract - 从联合类型提取
type C = Extract<A, "a" | "b">;  // "a" | "b"

// NonNullable - 排除 null 和 undefined
type D = NonNullable<string | number | null | undefined>;
// string | number
```

---

## 6.5 泛型

### 基础用法

```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

identity<string>("hello");
identity<number>(42);
identity("hello");  // 类型推断

// 泛型接口
interface GenericIdentity<T> {
    (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

const num = new GenericNumber<number>();
num.zeroValue = 0;
num.add = (x, y) => x + y;

// 多类型参数
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const result = merge({ a: 1 }, { b: 2 });
// { a: number } & { b: number }
```

### 泛型约束

```typescript
// extends 约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

loggingIdentity("hello");  // OK
loggingIdentity([1, 2, 3]);  // OK
// loggingIdentity(42);  // 错误

// 使用类型参数作为约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const obj = { a: 1, b: 2, c: 3 };
getProperty(obj, "a");  // OK
// getProperty(obj, "d");  // 错误

// 在泛型约束中使用类型参数
function clone<T extends object>(source: T): T {
    return { ...source };
}
```

### 泛型工具类型

```typescript
// 返回类型
type ReturnType<T extends (...args: any[]) => any> =
    T extends (...args: any[]) => infer R ? R : any;

// 参数类型
type Parameters<T extends (...args: any[]) => any> =
    T extends (...args: infer P) => any ? P : never;

// 使用示例
type Fn = (a: number, b: string) => boolean;
type R = ReturnType<Fn>;  // boolean
type P = Parameters<Fn>;  // [number, string]

// 构造函数参数
type ConstructorParameters<T extends new (...args: any) => any> =
    T extends new (...args: infer P) => any ? P : never;

// 实例类型
type InstanceType<T extends new (...args: any) => any> =
    T extends new (...args: any) => infer R ? R : any;
```

---

## 6.6 类型守卫

```typescript
// typeof 守卫
function padLeft(value: string, padding: string | number): string {
    if (typeof padding === "number") {
        return " ".repeat(padding) + value;
    }
    return padding + value;
}

// instanceof 守卫
class Animal {
    move() {}
}
class Dog extends Animal {
    bark() {}
}

function doSomething(animal: Animal) {
    if (animal instanceof Dog) {
        animal.bark();  // 类型 narrowed 为 Dog
    }
}

// in 守卫
interface A {
    a: string;
}
interface B {
    b: string;
}

function print(a: A | B) {
    if ("a" in a) {
        console.log(a.a);
    } else {
        console.log(a.b);
    }
}

// 类型谓词
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function concat(arr: (string | number)[]): string[] {
    return arr.filter(isString);  // string[]
}

// 可辨识联合
interface Square {
    kind: "square";
    size: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}

type Shape = Square | Circle;

function area(shape: Shape): number {
    switch (shape.kind) {
        case "square":
            return shape.size * shape.size;
        case "circle":
            return Math.PI * shape.radius ** 2;
    }
}
```

---

## 6.7 高级类型

### 条件类型

```typescript
// 基础语法
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// 分布式条件类型
type ToArray<T> = T extends any ? T[] : never;

type C = ToArray<string | number>;  // string[] | number[]

// infer 关键字
type ElementType<T> = T extends (infer E)[] ? E : T;

type D = ElementType<number[]>;  // number

// 提取函数返回类型
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

### 模板字面量类型

```typescript
// 字符串操作
type Greeting = `Hello, ${string}`;
type Name = "Alice" | "Bob" | "Charlie";
type G = `Hello, ${Name}`;  // "Hello, Alice" | "Hello, Bob" | "Hello, Charlie"

// 键映射
type Keys = "name" | "age" | "email";
type Obj = {
    [K in Keys]: string;
};

// 修饰符
type ReadonlyObj = {
    readonly [K in Keys]: string;
};

type PartialObj = {
    [K in Keys]?: string;
};

// 键重映射
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
    name: string;
    age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number }
```

---

## 6.8 装饰器

```typescript
// 类装饰器
function sealed(constructor: Function) {
    Object.seal(constructor);
}

@sealed
class MyClass {}

// 方法装饰器
function enumerable(value: boolean) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.enumerable = value;
    };
}

class Greeter {
    @enumerable(false)
    greet() {
        return "Hello";
    }
}

// 属性装饰器
function logProperty(target: any, propertyKey: string) {
    console.log(`属性 ${propertyKey} 被访问`);
}

class User {
    @logProperty
    name: string;
}

// 参数装饰器
function logParam(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`参数索引：${parameterIndex}`);
}

class Service {
    getData(@logParam id: number) {
        return id;
    }
}
```

---

## 6.9 实践练习

### 练习 1：工具类型

```typescript
// DeepPartial - 深度可选
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
    db: {
        host: string;
        port: number;
    };
    cache: {
        enabled: boolean;
        ttl: number;
    };
}

type PartialConfig = DeepPartial<Config>;
// { db?: { host?: string; port?: number }; cache?: { enabled?: boolean; ttl?: number } }

// DeepReadonly - 深度只读
type DeepReadonly<T> = {
    readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Mutable - 移除只读
type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

// Nullable - 添加 null
type Nullable<T> = T | null;

// NonNullable - 移除 null/undefined（内置）
type Result<T> = NonNullable<T> | null;

// FunctionKeys - 提取函数属性
type FunctionKeys<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

interface Service {
    id: number;
    name: string;
    start: () => void;
    stop: () => void;
}

type ServiceMethods = FunctionKeys<Service>;  // "start" | "stop"
```

### 练习 2：API 响应类型

```typescript
// 通用 API 响应
interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

// 分页响应
interface PaginatedResponse<T> {
    code: number;
    message: string;
    data: {
        items: T[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}

// 使用示例
interface User {
    id: number;
    name: string;
    email: string;
}

type UserResponse = ApiResponse<User>;
type UserListResponse = PaginatedResponse<User>;

// 提取工具
type Data<T> = T extends ApiResponse<infer U> ? U : never;
type UserDataType = Data<UserResponse>;  // User

// 成功响应简化
type SuccessResponse<T> = Omit<ApiResponse<T>, "code" | "message"> & {
    code: 200;
};
```

### 练习 3：类型安全的事件总线

```typescript
type EventMap = {
    login: (user: { id: number; name: string }) => void;
    logout: () => void;
    message: (content: string, timestamp: Date) => void;
};

class EventBus<E extends Record<string, (...args: any[]) => void>> {
    private listeners: Map<keyof E, Set<(...args: any[]) => void>> = new Map();

    on<K extends keyof E>(event: K, callback: E[K]): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);
    }

    off<K extends keyof E>(event: K, callback: E[K]): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.delete(callback);
        }
    }

    emit<K extends keyof E>(event: K, ...args: Parameters<E[K]>): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(cb => cb(...args));
        }
    }
}

// 使用示例
const bus = new EventBus<EventMap>();

bus.on("login", (user) => {
    console.log(`用户 ${user.name} 登录`);
});

bus.on("logout", () => {
    console.log("用户已登出");
});

bus.emit("login", { id: 1, name: "张三" });
```

---

## 6.10 常见问题

### Q1: interface 和 type 有什么区别？

```typescript
// 相同点：都可以定义对象类型
interface User { name: string; }
type UserType = { name: string; }

// interface 可以声明合并
interface User { age: number; }  // 合并到之前的声明

// type 支持联合、映射等
type Status = "pending" | "success";
type PartialUser = Partial<User>;

// 推荐：对象用 interface，联合/映射用 type
```

### Q2: 如何选择合适的泛型约束？

```typescript
// 需要访问属性
function log<T extends { length: number }>(arg: T) {}

// 需要调用方法
function toString<T extends { toString(): string }>(arg: T) {}

// 键访问
function getKey<T, K extends keyof T>(obj: T, key: K) {}
```

### Q3: 如何处理异步类型？

```typescript
// Promise 类型
async function fetchData(): Promise<User> {
    return { id: 1, name: "张三" };
}

// 提取 Promise 内部类型
type User = Awaited<Promise<User>>;  // User

// 并发请求
async function getAll(): Promise<[User, Post[]]> {
    return Promise.all([fetchUser(), fetchPosts()]);
}
```

---

## 6.11 学习资源

- [TypeScript 官方文档](https://www.typescriptlang.org/zh/)
- [TypeScript 入门教程](https://ts.xcatliu.com/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Total TypeScript](https://www.totaltypescript.com/)

---

**上一步：** [← 04-es6+/](../04-es6+/)
**下一步：** [→ 07-Node.js 模块](../06-nodejs/)
