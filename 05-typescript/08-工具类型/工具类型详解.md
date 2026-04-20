# 工具类型详解 ⭐⭐

> 从"每次都要手写 Partial、Pick"的烦恼出发，理解 TypeScript 内置工具类型

---

## 学习目标

学完本节，你能：
- 掌握所有内置工具类型的使用
- 理解工具类型的实现原理
- 能够自定义工具类型
- 根据场景选择合适的工具类型

---

## 生活化比喻

**工具类型就像"瑞士军刀"**：

```
Partial = 把必填变成选填：
┌─────────────────────────────┐
│  原本：姓名必填、电话必填    │
│  Partial 后：都可以不填      │
└─────────────────────────────┘

Pick = 挑出需要的字段：
┌─────────────────────────────┐
│  从完整表格中只挑"姓名"和"邮箱" │
└─────────────────────────────┘

Omit = 排除不需要的字段：
┌─────────────────────────────┐
│  从完整表格中去掉"密码"列    │
└─────────────────────────────┘

Record = 创建字典：
┌─────────────────────────────┐
│  键是角色，值是权限列表      │
│  { admin: ['read','write'], user: ['read'] } │
└─────────────────────────────┘
```

---

## 第一步：看看问题

假设你有一个 User 接口：

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}
```

现在你需要写一个"更新用户"的函数。用户可能只更新名字，或者只更新邮箱。

```typescript
// 这样写太严格了——必须传所有字段
function updateUser(id: number, data: User) { }

// 这样写太麻烦了——每次都要手写
function updateUser(id: number, data: {
    id?: number;
    name?: string;
    email?: string;
    age?: number;
}) { }
```

**有没有更简单的方法？**

---

## 第二步：Partial — 所有属性变可选

`Partial<T>` 让 T 的所有属性变成可选的：

```typescript
function updateUser(id: number, data: Partial<User>) {
    // data 的类型是：
    // { id?: number; name?: string; email?: string; age?: number }
}

updateUser(1, { name: '新名字' });           // ✅ 只传 name
updateUser(1, { email: 'new@example.com' }); // ✅ 只传 email
```

---

## 第三步：试试基础工具类型

### Pick — 挑选属性

`Pick<T, K>` 从 T 中挑选出 K 指定的属性：

```typescript
type UserBasicInfo = Pick<User, 'name' | 'email'>;
// 等同于：{ name: string; email: string }

function sendEmail(user: UserBasicInfo) { }
```

### Omit — 排除属性

`Omit<T, K>` 从 T 中排除 K 指定的属性：

```typescript
type UserPublic = Omit<User, 'email' | 'age'>;
// 等同于：{ id: number; name: string }

function getPublicProfile(id: number): UserPublic { }
```

### Record — 创建键值映射

`Record<K, V>` 创建一个键是 K、值是 V 的对象类型：

```typescript
type Role = 'admin' | 'user' | 'guest';
type Permissions = string[];

const rolePermissions: Record<Role, Permissions> = {
    admin: ['read', 'write', 'delete'],
    user: ['read', 'write'],
    guest: ['read']
};
```

### Readonly — 所有属性变只读

`Readonly<T>` 让 T 的所有属性变成只读：

```typescript
const config: Readonly<User> = {
    id: 1,
    name: '张三',
    email: 'zhang@example.com',
    age: 25
};

config.name = '新名字';  // ❌ 报错：只读属性不能修改
```

---

### 动手试试

在 VSCode 中创建一个 `utilities.ts` 文件，输入以下代码：

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

type UserUpdate = Partial<User>;
type UserBasic = Pick<User, 'name' | 'email'>;
type UserPublic = Omit<User, 'email' | 'age'>;

// 悬停在类型上，看看 TypeScript 推断的结果
```

编译运行：`npx tsc utilities.ts && node utilities.js`

---

## 第四步：ReturnType 和 Parameters

### ReturnType — 获取函数返回值类型

```typescript
function getUser() {
    return { id: 1, name: '张三' };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string }
```

### Parameters — 获取函数参数类型

```typescript
function greet(name: string, age: number) {
    return `Hello, ${name}`;
}

type GreetParams = Parameters<typeof greet>;
// [name: string, age: number]
```

---

## 第五步：Exclude 和 Extract

### Exclude — 从联合类型中排除

```typescript
type Status = 'pending' | 'success' | 'error';

type WithoutError = Exclude<Status, 'error'>;
// 'pending' | 'success'
```

### Extract — 从联合类型中提取

```typescript
type Status = 'pending' | 'success' | 'error';

type OnlySuccess = Extract<Status, 'success' | 'error'>;
// 'success' | 'error'
```

---

## 第六步：工具类型的实现原理

这些工具类型是怎么实现的？看看源码：

```typescript
// Partial 实现
type MyPartial<T> = { [K in keyof T]?: T[K] };

// Required 实现
type MyRequired<T> = { [K in keyof T]-?: T[K] };

// Readonly 实现
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

// Pick 实现
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };

// Omit 实现
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

看到 `[K in keyof T]` 了吗？这就是**映射类型**——遍历对象的所有键，为每个键生成新属性。

---

## 第七步：什么时候用哪个？

| 场景 | 推荐方案 | 示例 |
|------|---------|------|
| 更新表单 | `Partial<T>` | `Partial<User>` |
| 公开接口 | `Omit<T, K>` | `Omit<User, 'password'>` |
| 创建接口 | `Pick<T, K>` | `Pick<User, 'name'>` |
| 字典/映射 | `Record<K, V>` | `Record<string, number>` |
| 提取函数返回 | `ReturnType<T>` | `ReturnType<typeof fn>` |
| 排除类型 | `Exclude<T, U>` | `Exclude<'a' \| 'b', 'a'>` |

---

## 总结：速查表

| 工具类型 | 说明 | 示例 |
|----------|------|------|
| `Partial<T>` | 所有属性可选 | `{ name?: string }` |
| `Required<T>` | 所有属性必填 | `{ name: string }` |
| `Readonly<T>` | 所有属性只读 | `{ readonly name: string }` |
| `Pick<T, K>` | 挑选属性 | `Pick<User, 'name'>` |
| `Omit<T, K>` | 排除属性 | `Omit<User, 'password'>` |
| `Record<K, V>` | 键值映射 | `Record<string, number>` |
| `ReturnType<T>` | 函数返回值 | `ReturnType<() => string>` |
| `Parameters<T>` | 函数参数 | `Parameters<(x: number) => void>` |
| `Exclude<T, U>` | 从 T 排除 U | `Exclude<'a' \| 'b', 'a'>` |
| `Extract<T, U>` | 从 T 提取 U | `Extract<'a' \| 'b', 'a'>` |

---

## 实践练习

在 VSCode 中创建对应的 .ts 文件，编译运行验证：

### 练习 1：实现 DeepPartial

```typescript
// 写一个 DeepPartial 类型，让所有层级的属性都变成可选
// 提示：用条件类型 + 映射类型

type DeepPartial<T> = T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

type Config = { database: { host: string; port: number } };
type PartialConfig = DeepPartial<Config>;
// { database?: { host?: string; port?: number } }
```

### 练习 2：实现 NonNullable

```typescript
// 写一个 NonNullable 类型，排除 null 和 undefined

type MyNonNullable<T> = T extends null | undefined ? never : T;

type Result = MyNonNullable<string | null | undefined>;
// string
```

### 练习 3：函数类型安全的 event emitter

```typescript
// 定义事件映射
type EventMap = {
    'user:login': { userId: number };
    'user:logout': { userId: number };
};

// 实现类型安全的 on 和 emit
class TypedEmitter {
    on<K extends keyof EventMap>(event: K, listener: (data: EventMap[K]) => void) { }
    emit<K extends keyof EventMap>(event: K, data: EventMap[K]) { }
}
```

---

## 常见问题

### Q：Partial 和 Omit 有什么区别？

**Partial 让所有属性可选，Omit 排除指定属性：**

```typescript
type A = Partial<User>;   // { id?: number; name?: string; ... }
type B = Omit<User, 'id'>; // { name: string; email: string; age: number }
```

### Q：什么时候用 Pick，什么时候用 Omit？

**属性少时用 Pick，属性多时用 Omit：**

```typescript
// 只取 1-2 个属性 → Pick
type UserName = Pick<User, 'name'>;

// 排除 1-2 个属性 → Omit
type UserPublic = Omit<User, 'password' | 'token'>;
```

---

## 学习资源

- [TypeScript 工具类型](https://www.typescriptlang.org/docs/handbook/utility-types.html) ⭐ 官方文档
- [TypeScript 映射类型](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)

