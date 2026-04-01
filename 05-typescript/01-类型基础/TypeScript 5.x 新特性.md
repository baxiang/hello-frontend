# TypeScript 5.x 新特性

> TypeScript 5.x 版本的重要新特性详解

---

## 本章目标

- 掌握 satisfies 操作符
- 掌握 const 类型参数
- 理解 using 关键字
- 掌握 NoInfer 工具类型

---

## 1. satisfies 操作符（TS 4.9+）

### 什么是 satisfies？

```
satisfies = 类型验证 + 保留类型推断

它检查值是否满足类型，但不会改变值的类型
```

### 对比：as vs satisfies

```typescript
type Colors = 'red' | 'green' | 'blue';

// 使用 as - 类型被收窄为 Colors
const colors1 = ['red', 'green'] as Colors[];
// colors1[0] 的类型是 Colors，不是 'red'

// 使用 satisfies - 类型保留字面量
const colors2 = ['red', 'green'] satisfies Colors[];
// colors2[0] 的类型是 'red'，保留了字面量类型！
```

### 实际应用

```typescript
interface RouteConfig {
    path: string;
    component: string;
}

// 使用 satisfies 验证配置，同时保留具体值
const routes = {
    home: { path: '/', component: 'HomePage' },
    about: { path: '/about', component: 'AboutPage' }
} satisfies Record<string, RouteConfig>;

// routes.home.path 的类型是 '/'，不是 string
// 这样可以获得更好的类型提示
```

### 对象配置场景

```typescript
type Color = { r: number; g: number; b: number };

const theme = {
    primary: { r: 255, g: 0, b: 0 },
    secondary: { r: 0, g: 255, b: 0 }
} satisfies Record<string, Color>;

// theme.primary.r 的类型是 255，不是 number
// TypeScript 知道具体的值
```

---

## 2. const 类型参数（TS 5.0+）

### 什么是 const 类型参数？

```
const 类型参数 = 在泛型中保留字面量类型

在泛型参数前添加 const，TypeScript 会推断出最具体的字面量类型
```

### 问题：泛型推断太宽泛

```typescript
function getValues<T extends readonly string[]>(arr: T): T {
    return arr;
}

// 不使用 const，推断为 string[]
const result1 = getValues(['a', 'b', 'c']);
// result1 的类型是 string[]

// 之前需要用 as const
const result2 = getValues(['a', 'b', 'c'] as const);
// result2 的类型是 readonly ['a', 'b', 'c']
```

### 解决：使用 const 类型参数

```typescript
function getValues<const T extends readonly string[]>(arr: T): T {
    return arr;
}

// 自动推断为字面量类型
const result = getValues(['a', 'b', 'c']);
// result 的类型是 readonly ['a', 'b', 'c']

// 不需要手动写 as const 了！
```

### 实际应用

```typescript
// 路由定义
function defineRoutes<const T extends Record<string, string>>(routes: T): T {
    return routes;
}

const routes = defineRoutes({
    home: '/',
    about: '/about',
    contact: '/contact'
});

// routes.home 的类型是 '/'，不是 string
// 可以获得精确的类型提示
```

---

## 3. using 关键字（TS 5.2+）

### 什么是 using？

```
using = 自动资源管理

类似于其他语言的 try-with-resources 或 using 语句
确保资源在使用后被正确释放
```

### 基本用法

```typescript
// 定义可释放资源
class FileHandle implements Disposable {
    constructor(private path: string) {}

    [Symbol.dispose]() {
        console.log(`Closing file: ${this.path}`);
    }

    read() {
        return 'file content';
    }
}

// 使用 using 自动释放
function readFile() {
    using file = new FileHandle('/path/to/file.txt');
    console.log(file.read());
    // 函数结束时自动调用 file[Symbol.dispose]()
}
```

### 对比：手动释放 vs using

```typescript
// 手动释放 - 容易忘记
function oldWay() {
    const file = new FileHandle('/path/to/file.txt');
    try {
        console.log(file.read());
    } finally {
        file[Symbol.dispose]();  // 容易忘记
    }
}

// 使用 using - 自动释放
function newWay() {
    using file = new FileHandle('/path/to/file.txt');
    console.log(file.read());
    // 自动释放，不会忘记
}
```

### 实际应用场景

```typescript
// 数据库连接
class DatabaseConnection implements Disposable {
    constructor(private connectionString: string) {}

    [Symbol.dispose]() {
        console.log('Closing database connection');
    }

    query(sql: string) {
        return [{ id: 1, name: 'Tom' }];
    }
}

function getUsers() {
    using db = new DatabaseConnection('postgresql://...');
    const users = db.query('SELECT * FROM users');
    return users;
    // 自动关闭连接
}
```

### await using（异步资源）

```typescript
class AsyncResource implements AsyncDisposable {
    async [Symbol.asyncDispose]() {
        console.log('Async cleanup');
    }
}

async function example() {
    await using resource = new AsyncResource();
    // 使用资源...
    // 函数结束时自动调用 [Symbol.asyncDispose]()
}
```

---

## 4. NoInfer 工具类型（TS 5.4+）

### 什么是 NoInfer？

```
NoInfer = 阻止类型推断

阻止 TypeScript 对某个类型参数进行推断，强制使用显式类型
```

### 问题：推断太宽松

```typescript
function createBox<T>(value: T, defaultValue: T) {
    return { value, defaultValue };
}

// 问题：T 被推断为 string | number
const box = createBox('hello', 0);
// box.value 的类型是 string | number
// 但我们希望 value 是 string，defaultValue 是 number
```

### 解决：使用 NoInfer

```typescript
function createBox<T>(value: T, defaultValue: NoInfer<T>) {
    return { value, defaultValue };
}

// 现在 T 只从第一个参数推断
const box = createBox<string>('hello', 0);
// box.value 的类型是 string
// defaultValue 必须是 string，否则报错
```

### 实际应用

```typescript
// API 请求函数
function request<T>(
    url: string,
    defaultValue: NoInfer<T>
): Promise<T> {
    return fetch(url)
        .then(res => res.json() as T)
        .catch(() => defaultValue);
}

// 使用
interface User {
    id: number;
    name: string;
}

const user = await request<User>('/api/user', { id: 0, name: '' });
// defaultValue 必须是 User 类型
```

---

## 本章小结

| 特性 | 版本 | 作用 |
|------|------|------|
| satisfies | 4.9 | 类型验证 + 保留推断 |
| const 类型参数 | 5.0 | 泛型中保留字面量 |
| using | 5.2 | 自动资源管理 |
| NoInfer | 5.4 | 阻止类型推断 |

---

## 下一章

[→ TypeScript 实战指南](./TypeScript%20实战指南.md)