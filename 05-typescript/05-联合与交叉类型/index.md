# 联合类型与交叉类型 ⭐⭐

> 从"要么这样要么那样"和"既要这样又要那样"出发，理解联合与交叉

---

## 学习目标

学完本节，你能：
- 理解联合类型（`|`）和交叉类型（`&`）的区别
- 掌握可辨识联合模式
- 学会使用字面量联合类型
- 能够编写类型安全的状态处理

---

## 生活化比喻

**联合类型就像"多选一"，交叉类型就像"全都要"**：

```
联合类型 | = 会员卡三选一：
┌─────────────────────────────┐
│  银卡 或 金卡 或 钻石卡     │
│  你只能拥有一种              │
│  type Card = Silver | Gold | Diamond │
└─────────────────────────────┘

交叉类型 & = VIP 超级会员：
┌─────────────────────────────┐
│  银卡权益 + 金卡权益 + 钻石卡权益 │
│  你拥有所有卡的权益          │
│  type SuperVIP = Silver & Gold & Diamond │
└─────────────────────────────┘
```

---

## 第一步：看看 JavaScript 的问题

先来看一个场景：你写了一个函数，可以接收字符串或数字作为 ID。

```javascript
function getUser(id) {
    // 如果 id 是字符串，按名字查
    // 如果 id 是数字，按 ID 查
    return fetch(`/api/users/${id}`);
}

getUser('张三');  // ✅ 按名字查
getUser(1);       // ✅ 按 ID 查
getUser(true);    // ⚠️ 传了布尔值，函数没处理
```

**发现问题了吗？**

JavaScript 无法限制 `id` 只能是字符串或数字。任何人都可以传任何值。

---

## 第二步：联合类型怎么解决？

联合类型用 `|` 表示"要么这样，要么那样"：

```typescript
function getUser(id: string | number) {
    return fetch(`/api/users/${id}`);
}

getUser('张三');  // ✅ 可以
getUser(1);       // ✅ 可以
getUser(true);    // ❌ 报错：类型"boolean"不能赋给类型"string | number"
```

`string | number` 的意思是："id 可以是字符串，也可以是数字。"

---

## 第三步：试试联合类型

### 基础联合

```typescript
type ID = string | number;

function formatId(id: ID): string {
    return String(id);
}
```

### 字面量联合

比类型更有用的是**具体的值**作为类型：

```typescript
type Status = 'pending' | 'success' | 'error';

function getStatusText(status: Status): string {
    switch (status) {
        case 'pending': return '等待中';
        case 'success': return '成功';
        case 'error': return '失败';
    }
}

getStatusText('pending');  // ✅
getStatusText('unknown');  // ❌ 报错：不在允许的值中
```

字面量联合最常见的用途是**限制取值范围**。

---

### 动手试试

在 VSCode 中创建一个 `unions.ts` 文件，输入以下代码：

```typescript
type Role = 'admin' | 'user' | 'guest';

function checkPermission(role: Role): string {
    if (role === 'admin') return '全部权限';
    if (role === 'user') return '基本权限';
    return '只读权限';
}

// 试试传不同的值，看看哪些会报错
// checkPermission('superadmin');  ← 报错：不在允许的值中
```

编译运行：`npx tsc unions.ts && node unions.js`

---

## 第四步：交叉类型 — "全都要"

交叉类型用 `&` 表示"既要这样，又要那样"：

```typescript
interface HasId {
    id: number;
}

interface HasName {
    name: string;
}

// 交叉类型 = 两个接口的所有属性都要有
type User = HasId & HasName;
// 等同于：{ id: number; name: string }

const user: User = {
    id: 1,
    name: '张三'
};
```

交叉类型最常见的用途是**组合多个接口**。

---

## 第五步：联合类型的属性访问

联合类型有一个重要规则：**只能访问所有类型都有的属性**。

```typescript
interface Dog {
    name: string;
    bark(): void;
}

interface Cat {
    name: string;
    meow(): void;
}

type Pet = Dog | Cat;

function getPetName(pet: Pet): string {
    return pet.name;  // ✅ name 是共有属性
}

function makeSound(pet: Pet) {
    pet.bark();  // ❌ 报错：Cat 没有 bark 方法
    pet.meow();  // ❌ 报错：Dog 没有 meow 方法
}
```

**怎么解决？** 用类型守卫先判断：

```typescript
function makeSound(pet: Pet) {
    if ('bark' in pet) {
        pet.bark();  // ✅ TypeScript 知道这是 Dog
    } else {
        pet.meow();  // ✅ TypeScript 知道这是 Cat
    }
}
```

---

## 第六步：可辨识联合 — 类型安全的状态机

可辨识联合是联合类型最强大的用法。核心思想是：**用一个共同字段区分不同的类型**。

```typescript
interface Circle {
    kind: 'circle';
    radius: number;
}

interface Square {
    kind: 'square';
    side: number;
}

interface Triangle {
    kind: 'triangle';
    base: number;
    height: number;
}

type Shape = Circle | Square | Triangle;
```

`kind` 字段就是"辨识字段"。通过它，TypeScript 可以精确知道当前是哪个类型：

```typescript
function area(shape: Shape): number {
    switch (shape.kind) {
        case 'circle':
            return Math.PI * shape.radius ** 2;  // ✅ shape 是 Circle
        case 'square':
            return shape.side ** 2;               // ✅ shape 是 Square
        case 'triangle':
            return (shape.base * shape.height) / 2;  // ✅ shape 是 Triangle
    }
}
```

### 穷尽检查

可辨识联合最强大的地方是**穷尽检查**——确保所有情况都被处理了：

```typescript
function area(shape: Shape): number {
    switch (shape.kind) {
        case 'circle': return Math.PI * shape.radius ** 2;
        case 'square': return shape.side ** 2;
        // 如果漏了 triangle，下面会报错
        default:
            const _exhaustive: never = shape;
            return _exhaustive;
    }
}
```

如果你新增了一个形状但忘记处理，TypeScript 会报错。

---

## 第七步：联合 vs 交叉 — 对比总结

| 操作符 | 含义 | 记忆 | 示例 |
|--------|------|------|------|
| `\|` | 联合（或） | "你是 A **或** B" | `string \| number` |
| `&` | 交叉（且） | "你是 A **且** B" | `{ id } & { name }` |

**关键区别：**

```typescript
// 联合 — 满足任一即可
type A = { name: string } | { age: number };
const a: A = { name: '张三' };  // ✅ 有 name 就行

// 交叉 — 必须满足所有
type B = { name: string } & { age: number };
const b: B = { name: '张三', age: 25 };  // ✅ name 和 age 都要有
```

---

## 总结：速查表

| 语法 | 含义 | 示例 |
|------|------|------|
| `A \| B` | 联合（或） | `string \| number` |
| `A & B` | 交叉（且） | `{ id } & { name }` |
| 字面量联合 | 限制取值范围 | `'a' \| 'b' \| 'c'` |
| 可辨识联合 | 用共同字段区分 | `{ kind: 'a' } \| { kind: 'b' }` |
| 穷尽检查 | 确保所有分支处理 | `const _: never = value` |

---

## 实践练习

在 VSCode 中创建对应的 .ts 文件，编译运行验证：

### 练习 1：API 响应类型

```typescript
// 定义一个 API 响应类型，要么成功要么失败
// 成功时有 data，失败时有 error

interface SuccessResponse<T> {
    ok: true;
    data: T;
}

interface ErrorResponse {
    ok: false;
    error: string;
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// 写一个函数处理响应
function handleResponse<T>(response: ApiResponse<T>): T {
    // 补全
}
```

### 练习 2：状态机

```typescript
// 定义一个请求状态的联合类型
// 包含：idle、loading、success（有 data）、error（有 message）
// 写一个函数根据状态返回不同的 UI 文字
```

### 练习 3：交叉类型组合

```typescript
// 定义 Timestamps（createdAt、updatedAt）
// 定义 SoftDelete（deletedAt?: Date）
// 用交叉类型组合成 BaseModel
// 然后让 User 继承 BaseModel
```

---

## 常见问题

### Q：联合类型和交叉类型有什么区别？

**联合是"或"（满足任一），交叉是"且"（满足所有）：**

```typescript
type A = { name: string } | { age: number };  // 有 name 或 age 就行
type B = { name: string } & { age: number };  // name 和 age 都要有
```

### Q：为什么联合类型只能访问共有属性？

**因为 TypeScript 不知道当前值具体是哪种类型，只能保证所有类型都有的属性是安全的。**

### Q：可辨识联合的"可辨识"是什么意思？

**通过一个共同字段（通常是 `kind` 或 `type`）来区分联合中的具体类型，让 TypeScript 在 switch/if 中自动收窄类型。**

---

## 学习资源

- [TypeScript 联合与交叉](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) ⭐ 官方文档
- [TypeScript 可辨识联合](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)

