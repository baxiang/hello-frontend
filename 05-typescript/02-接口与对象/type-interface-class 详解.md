# TypeScript 中 type、interface、class 通俗理解

> 用生活中的例子理解这三个核心概念

---

## 一、一句话总结

| 概念 | 作用 | 生活比喻 |
|------|------|----------|
| **interface** | 定义对象的**形状/规范** | 房屋的**设计图纸** |
| **type** | 给类型起个**别名** | 给复杂概念起个**简称** |
| **class** | 创建对象的**模板/工厂** | 生产产品的**模具** |

---

## 二、详细讲解

### 1. interface（接口）- 设计图纸

**通俗理解：** interface 就像一份**合同**或**设计图纸**，它规定了对象应该有什么，但不关心具体怎么实现。

```typescript
// 就像一份"用户"的设计图纸
interface User {
    id: number;      // 必须有 id，是数字
    name: string;    // 必须有 name，是字符串
    email?: string;  // email 可选
}

// 任何符合这个图纸的对象都可以
const user1: User = { id: 1, name: '张三', email: 'zhang@example.com' };
const user2: User = { id: 2, name: '李四' };  // email 可选，可以没有

// ❌ 错误：不符合图纸
// const user3: User = { id: 1, name: 123 };  // name 必须是字符串
```

**生活例子：**
```
就像你去买房，开发商给你看户型图：
- 必须有：3 个卧室、2 个卫生间、1 个厨房
- 可选：阳台

至于你买的是 101 房还是 201 房，不重要，只要符合这个户型图就行。
```

**interface 的特点：**
- ✅ 可以**继承**（extends）
- ✅ 可以**合并**（同名的 interface 会自动合并）
- ✅ 可以被 class **实现**（implements）
- ❌ 不能定义联合类型
- ❌ 不能定义基本类型别名

---

### 2. type（类型别名）- 起别名

**通俗理解：** type 就是给复杂的类型定义起个**简单的名字**，方便重复使用。

```typescript
// 给复杂类型起个名字
type UserID = string | number;  // 用户 ID 可以是字符串或数字
type Status = 'pending' | 'success' | 'error';  // 状态只能是这三个值
type Point = [number, number];  // 坐标点是两个数字的元组

// 使用
const id1: UserID = 123;
const id2: UserID = 'abc-456';

const status1: Status = 'pending';
const status2: Status = 'success';
// const status3: Status = 'failed';  // ❌ 错误：不在这三个值中

const position: Point = [100, 200];
```

**type 的强大之处：**
```typescript
// 1. 可以定义联合类型
type Result = Success | Error;

// 2. 可以定义交叉类型
type Employee = Person & { employeeId: number };

// 3. 可以使用泛型
type Container<T> = { value: T };

// 4. 可以定义映射类型
type ReadonlyUser = Readonly<User>;
```

**生活例子：**
```
就像菜单上的"套餐 A"：
- 套餐 A = 汉堡 + 薯条 + 可乐

你说"我要套餐 A"，服务员就知道你要什么了。
type 就是给这个组合起了个名字叫"套餐 A"。
```

---

### 3. class（类）- 生产模具

**通俗理解：** class 是一个**工厂/模具**，它可以生产出具有相同特征和行为的对象。

```typescript
// 定义一个"人"的模具
class Person {
    // 属性
    name: string;
    age: number;

    // 构造函数 - 生产时的初始化
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // 方法 - 生产出来的对象能做什么
    sayHello() {
        console.log(`你好，我是${this.name}`);
    }
}

// 用模具生产对象
const person1 = new Person('张三', 25);
const person2 = new Person('李四', 30);

person1.sayHello();  // 你好，我是张三
person2.sayHello();  // 你好，我是李四
```

**生活例子：**
```
就像月饼模具：
- 模具定义了月饼的形状、花纹
- 用模具可以压出很多个月饼
- 每个月饼都有相同的形状，但可以有不同的馅料

class 就是模具，new 就是用模具生产月饼的过程。
```

**class 的特点：**
- ✅ 可以**继承**（extends）
- ✅ 可以有**构造函数**
- ✅ 可以有**方法和属性**
- ✅ 支持**访问修饰符**（public、private、protected）
- ❌ 不能声明合并

---

## 三、三者的区别和选择

### 核心区别

```typescript
// ✅ interface 能做，type 也能做（定义对象）
interface User1 {
    name: string;
    age: number;
}

type User2 = {
    name: string;
    age: number;
};

// ✅ type 能做，interface 不能做
type ID = string | number;  // 联合类型
type Point = [number, number];  // 元组
type Maybe<T> = T | null;  // 泛型别名

// ✅ interface 能做，type 不能做
interface Box {
    size: number;
}
interface Box {
    color: string;
}
// 两个 Box 自动合并为 { size: number; color: string; }

// ✅ class 能做，其他两个不能做
class Person {
    constructor(public name: string) {}
    sayHello() {
        console.log(`Hello, ${this.name}`);
    }
}
```

### 选择建议（重要！）

```
┌─────────────────────────────────────────┐
│          如何选择？                      │
├─────────────────────────────────────────┤
│ 定义对象结构 → 优先用 interface          │
│                                         │
│ 需要联合类型 → 用 type                   │
│ 需要映射类型 → 用 type                   │
│ 需要声明合并 → 用 interface              │
│                                         │
│ 需要创建对象实例 → 用 class              │
│ 需要继承和多态 → 用 class                │
└─────────────────────────────────────────┘
```

### 实际项目中的使用

```typescript
// 1. 用 interface 定义数据结构
interface User {
    id: number;
    name: string;
    email: string;
}

// 2. 用 type 定义状态和联合类型
type LoadingState = 'loading' | 'success' | 'error';
type Action = 
    | { type: 'fetch' }
    | { type: 'success'; data: User[] }
    | { type: 'error'; message: string };

// 3. 用 class 实现业务逻辑
class UserService {
    private users: User[] = [];

    addUser(user: User) {
        this.users.push(user);
    }

    getUser(id: number): User | undefined {
        return this.users.find(u => u.id === id);
    }
}
```

---

## 四、三者的关系图

```
                    ┌──────────────┐
                    │   TypeScript │
                    │   类型系统    │
                    └──────┬───────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
         ▼                 ▼                 ▼
   ┌──────────┐     ┌──────────┐     ┌──────────┐
   │interface │     │   type   │     │  class   │
   │  设计图纸 │     │  起别名  │     │  生产模具 │
   └────┬─────┘     └────┬─────┘     └────┬─────┘
        │                │                │
        │  extends       │  =             │  new
        │  implements    │  extends       │  extends
        ▼                ▼                ▼
   ┌──────────┐     ┌──────────┐     ┌──────────┐
   │ 对象结构 │     │ 类型别名 │     │ 对象实例 │
   └──────────┘     └──────────┘     └──────────┘
```

---

## 五、实战示例

### 示例 1：电商系统

```typescript
// 1. 用 interface 定义数据结构
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

interface CartItem {
    product: Product;
    quantity: number;
}

// 2. 用 type 定义状态和操作
type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered';

type OrderAction =
    | { type: 'create'; productId: number; quantity: number }
    | { type: 'pay'; orderId: string }
    | { type: 'ship'; orderId: string };

// 3. 用 class 实现业务逻辑
class ShoppingCart {
    private items: CartItem[] = [];

    addProduct(product: Product, quantity: number) {
        const existing = this.items.find(item => item.product.id === product.id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
    }

    getTotal(): number {
        return this.items.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        );
    }
}
```

### 示例 2：React 组件

```typescript
// 1. 用 interface 定义 Props
interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
}

// 2. 用 type 定义状态
type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// 3. 用 class 也可以（但现在更推荐函数组件）
class Button extends React.Component<ButtonProps> {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                disabled={this.props.disabled}
                className={`btn btn-${this.props.variant || 'primary'}`}
            >
                {this.props.label}
            </button>
        );
    }
}

// 函数组件（更常用）
function Button(props: ButtonProps) {
    return (
        <button onClick={props.onClick}>{props.label}</button>
    );
}
```

---

## 六、常见问答

### Q1: interface 和 type 到底选哪个？

**答：** 定义对象结构时，**优先用 interface**，其他情况用 type。

```typescript
// 定义对象 → interface
interface User {
    name: string;
    age: number;
}

// 联合类型 → type
type Status = 'success' | 'error';

// 实在不确定 → 用 interface（可以声明合并）
```

### Q2: class 和 interface 有什么区别？

**答：** 
- interface 只在**编译时**存在，运行时被删除
- class 在**运行时**也存在，可以创建实例

```typescript
// interface 编译后消失
interface User {
    name: string;
}

// class 编译后还在
class Person {
    constructor(public name: string) {}
}

const p = new Person('张三');  // 可以 new
```

### Q3: 什么时候用 class 而不是 interface？

**答：** 当你需要：
- 创建对象实例（用 new）
- 有构造函数逻辑
- 有私有属性/方法
- 需要继承和多态

否则，用 interface 更轻量。

---

## 七、学习建议

```
学习顺序：
1. 先学 interface - 最常用，定义对象结构
2. 再学 type - 理解类型别名和联合类型
3. 最后学 class - 面向对象编程

练习建议：
1. 用 interface 定义你项目中的数据结构
2. 用 type 定义状态、联合类型
3. 尝试用 class 实现一些工具类
```

---

## 八、总结口诀

```
interface 是图纸，规定对象长啥样
type 是起别名，复杂类型简单化
class 是生产模具，new 出对象来干活

定义结构 interface，联合类型用 type
需要实例用 class，优先 interface 不会错
```

---

**相关文档：**
- [01-TypeScript 入门与环境配置.md](./01-TypeScript 入门与环境配置.md)
- [02-基础类型详解.md](./02-基础类型详解.md)
- [03-接口与对象类型.md](./03-接口与对象类型.md)
- [04-类型别名与联合类型.md](./04-类型别名与联合类型.md)
