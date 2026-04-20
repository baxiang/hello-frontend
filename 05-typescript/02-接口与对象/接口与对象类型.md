# 接口与对象类型 ⭐⭐

> 从 JavaScript 对象的混乱出发，理解 TypeScript 的 interface

---

## 学习目标

学完本节，你能：
- 理解为什么需要 interface
- 写出基本的接口定义
- 掌握可选属性、只读属性、索引签名
- 理解 interface 和 type 的区别

---

## 生活化比喻

**接口就像"合同模板"**：

```
没有合同（JavaScript）：
┌─────────────────────────────┐
│  甲方：张三                 │
│  乙方：李四                 │
│  （其他随便写，没有约束）   │
└─────────────────────────────┘

有合同（TypeScript）：
┌─────────────────────────────┐
│  甲方：必须填姓名、电话     │
│  乙方：必须填姓名           │
│  传真：选填                 │
│  合同编号：填了就不能改     │
└─────────────────────────────┘
```

---

## 第一步：看看 JavaScript 对象的问题

先来看一段 JavaScript 代码：

```javascript
function createUser(name, age, email) {
    return { name, age, email };
}

const user = createUser('张三', 25, 'zhang@example.com');
console.log(user.nmae);  // undefined ⚠️ 拼写错了，但 JS 不报错！
```

如果你拼错了属性名，JavaScript 不会提醒你。更麻烦的是，任何人都可以随便往对象里加属性：

```javascript
user.foo = 'bar';  // ✅ 可以，没有任何限制
user.age = '不是数字';  // ✅ 也可以，类型乱了
```

**发现问题了吗？**

JavaScript 对象太自由了——属性名可以拼错、类型可以乱改、想加什么属性就加什么。在大型项目里，这种自由就是 bug 的温床。

---

## 第二步：TypeScript 怎么解决？

TypeScript 的做法是给对象定义一个**模板**——告诉编译器这个对象应该有哪些属性、每个属性是什么类型：

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

function createUser(name: string, age: number, email: string): User {
    return { id: Date.now(), name, email };
}

const user = createUser('张三', 25, 'zhang@example.com');
console.log(user.nmae);  // ❌ 报错：属性"nmae"不存在，你是不是想写"name"？
```

现在，如果你拼错了属性名，TypeScript 会立刻告诉你。

这个模板就是 **interface（接口）**。

---

## 第三步：试试 interface

interface 的基本语法很简单：

```typescript
interface 接口名 {
    属性名: 类型;
    属性名: 类型;
}
```

让我们从最简单的开始：

### 定义一个用户接口

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}
```

现在你可以用这个接口来约束对象：

```typescript
const user: User = {
    id: 1,
    name: '张三',
    email: 'zhang@example.com'
};

// 缺少属性会报错
const incomplete: User = { id: 1, name: '张三' };
// ❌ 报错：属性"email"在类型"User"中是必需的

// 多了属性也会报错
const extra: User = { id: 1, name: '张三', email: 'zhang@example.com', foo: 'bar' };
// ❌ 报错：对象字面量只能指定已知属性
```

### 用接口定义函数参数

```typescript
function greet(user: User): string {
    return `你好，${user.name}`;
}

greet({ id: 1, name: '张三', email: 'zhang@example.com' });  // ✅
greet({ name: '张三' });  // ❌ 缺少 id 和 email
```

---

### 动手试试

在 VSCode 中创建一个 `interfaces.ts` 文件，输入以下代码：

```typescript
interface Product {
    id: number;
    name: string;
    price: number;
}

const product: Product = {
    id: 1,
    name: 'MacBook Pro',
    price: 14999
};

// 试试删除一个属性，或者拼错属性名
// const bad: Product = { id: 1, name: 'Mac' };  ← 缺少 price 会报错
```

编译运行：`npx tsc interfaces.ts && node interfaces.js`

---

## 第四步：可选属性和只读属性

### 可选属性

有些属性不是必须的。比如用户的"年龄"，可以填也可以不填。

用 `?` 标记可选属性：

```typescript
interface User {
    id: number;
    name: string;
    age?: number;  // 可选属性
}

const user1: User = { id: 1, name: '张三', age: 25 };  // ✅ 有 age
const user2: User = { id: 2, name: '李四' };            // ✅ 没有 age 也可以
```

### 只读属性

有些属性一旦设定就不能改。比如用户的"ID"。

用 `readonly` 标记只读属性：

```typescript
interface User {
    readonly id: number;  // 只读
    name: string;
}

const user: User = { id: 1, name: '张三' };
user.name = '新名字';  // ✅ 可以改
user.id = 2;           // ❌ 报错：无法为只读属性赋值
```

---

## 第五步：索引签名 — 动态键

有时候你不知道对象会有哪些属性。比如一个配置对象，用户可以随便加键值对。

这时候用**索引签名**：

```typescript
interface Config {
    [key: string]: string | number | boolean;
}

const config: Config = {
    theme: 'dark',
    fontSize: 16,
    showSidebar: true,
    // 可以加任意多的键值对
    customKey: 'anything'
};
```

索引签名最常见的使用场景是**字典**：

```typescript
interface Translation {
    [key: string]: string;
}

const zh: Translation = {
    hello: '你好',
    bye: '再见',
    thanks: '谢谢'
};
```

---

## 第六步：接口继承 — 在旧模板上加新属性

如果你有一个基础的用户接口，想创建一个"管理员"接口，管理员有用户的所有属性，外加一个"权限"属性。

不用重新写一遍，用 **extends** 继承就行：

```typescript
// 基础用户接口
interface User {
    id: number;
    name: string;
    email: string;
}

// 管理员继承用户
interface Admin extends User {
    permissions: string[];  // 新增属性
}

const admin: Admin = {
    id: 1,
    name: '张三',
    email: 'zhang@example.com',
    permissions: ['read', 'write', 'delete']
};
```

**多继承**也是可以的：

```typescript
interface HasId { id: number }
interface HasTimestamps { createdAt: Date; updatedAt: Date }

interface Post extends HasId, HasTimestamps {
    title: string;
    content: string;
}

// Post 现在有三个接口的所有属性
const post: Post = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '标题',
    content: '内容'
};
```

---

## 第七步：interface vs type — 选哪个？

TypeScript 还有另一种定义对象类型的方式叫 `type`：

```typescript
// 用 interface
interface User {
    name: string;
    age: number;
}

// 用 type
type User = {
    name: string;
    age: number;
};
```

两种方式在定义对象时几乎一样。但它们有**关键区别**：

### interface 能做，type 做不了

**声明合并** — 同名的 interface 会自动合并：

```typescript
interface User {
    id: number;
    name: string;
}

// 后面又定义了一个 User
interface User {
    email: string;
}

// TypeScript 自动合并成：
// interface User { id: number; name: string; email: string }
```

这个特性可以用来**扩展第三方库的类型**。

### type 能做，interface 做不了

**联合类型** — type 可以用 `|`：

```typescript
type Status = 'pending' | 'success' | 'error';  // ✅ interface 做不到
```

**交叉类型** — type 可以用 `&`：

```typescript
type Admin = User & { permissions: string[] };  // ✅ interface 用 extends
```

### 选择建议

| 场景 | 推荐 | 原因 |
|------|------|------|
| 定义对象形状 | **interface** | 可扩展、声明合并 |
| 联合类型 | **type** | interface 不支持 |
| 函数类型 | 两者均可 | type 更简洁 |
| 扩展第三方类型 | **interface** | 声明合并 |

**记住：优先用 interface，需要联合/交叉类型时用 type。**

---

## 总结：接口速查表

| 语法 | 含义 | 示例 |
|------|------|------|
| `interface User { }` | 定义接口 | `interface User { name: string }` |
| `属性?: 类型` | 可选属性 | `age?: number` |
| `readonly 属性` | 只读属性 | `readonly id: number` |
| `[key: string]: T` | 索引签名 | `[key: string]: string` |
| `extends` | 继承 | `interface Admin extends User` |

---

## 实践练习

在 VSCode 中创建对应的 .ts 文件，编译运行验证：

### 练习 1：定义电商订单类型

```typescript
// 定义一个 Order 接口，包含：
// - id: 只读字符串
// - items: 订单项数组（每个订单项有 productId、quantity、price）
// - total: 数字
// - status: 只能是 'pending'、'paid'、'shipped'、'delivered' 之一
// - createdAt: Date
```

### 练习 2：索引签名 — 配置对象

```typescript
// 定义一个 AppConfig 接口，允许任意字符串键
// 但必须有 appName、version、debug 三个固定属性
```

### 练习 3：接口继承 — 权限系统

```typescript
// 定义 BaseUser（id、name）
// 定义 Admin 继承 BaseUser，外加 permissions: string[]
// 定义 Guest 继承 BaseUser，外加 expiresAt: Date
```

---

## 常见问题

### Q：interface 和 type 到底选哪个？

**优先用 interface，需要联合/交叉类型时用 type：**

```typescript
// 对象 → interface
interface User { name: string }

// 联合 → type
type Status = 'pending' | 'success' | 'error';
```

### Q：什么时候用索引签名？

**当对象有动态键时，比如字典、配置对象：**

```typescript
interface Translation {
    [key: string]: string;
}
const zh: Translation = { hello: '你好', bye: '再见' };
```

### Q：interface 在编译后还存在吗？

**不存在。interface 只是编译时的类型检查工具，编译后的 JavaScript 里没有任何痕迹：**

```typescript
// TypeScript
interface User { id: number; name: string }
function greet(user: User) { }

// 编译后 JavaScript
function greet(user) { }
// interface 消失了
```

---

## 学习资源

- [TypeScript 接口](https://www.typescriptlang.org/docs/handbook/2/objects.html) ⭐ 官方文档

