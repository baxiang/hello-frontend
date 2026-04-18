# type、interface、class 详解

> 三者的区别和使用场景

---

## L1 理解层

**最简示例（1-3行）：**

```typescript
interface IUser { name: string }
type TUser = { name: string }
class User { constructor(public name: string) {} }
```

**详细示例：**

```typescript
// interface — 对象契约
interface IUser { name: string; greet(): string }

// type — 类型别名
type TUser = { name: string } | { id: number };
type ID = string | number;
type Callback = (data: string) => void;

// class — 实例工厂
class User {
    constructor(public name: string) {}
    greet() { return `Hi, ${this.name}`; }
}
```

---

## L2 实践层

### 对比表

| 特性 | interface | type | class |
|------|-----------|------|-------|
| 定义对象形状 | ✅ | ✅ | ✅ |
| 联合类型 | ❌ | ✅ | ❌ |
| 声明合并 | ✅ | ❌ | ❌ |
| 实现/实例化 | ❌ | ❌ | ✅ |
| 继承 | extends | & | extends |

### 选择指南

| 场景 | 推荐 | 原因 |
|------|------|------|
| 定义对象结构 | interface | 可扩展 |
| 联合/交叉类型 | type | interface 不支持 |
| 创建实例 | class | 有构造函数和方法 |

---

## 学习资源

- [TypeScript 手册](https://www.typescriptlang.org/docs/handbook/intro.html) ⭐ 官方权威
