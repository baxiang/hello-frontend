# TypeScript 常用速查手册

> 快速查找 TypeScript 语法和类型定义

---

## 基础类型

```typescript
let str: string = 'hello';
let num: number = 42;
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let tuple: [string, number] = ['age', 25];
```

## 接口与类型别名

```typescript
interface User { id: number; name: string; email?: string }
type Status = 'pending' | 'success' | 'error';
type Point = { x: number; y: number };
```

## 函数

```typescript
function add(a: number, b: number): number { return a + b; }
type Fn = (a: number, b: number) => number;
const mul: Fn = (a, b) => a * b;
```

## 泛型

```typescript
function first<T>(arr: T[]): T | undefined { return arr[0]; }
interface Repository<T> { find(id: number): T | undefined }
```

## 工具类型

```typescript
Partial<User>     // 所有属性可选
Required<User>    // 所有属性必填
Readonly<User>    // 所有属性只读
Pick<User, 'id'>  // 挑选属性
Omit<User, 'id'>  // 排除属性
Record<string, T> // 键值映射
ReturnType<Fn>    // 函数返回值
```

## 高级类型

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
type EventName<T extends string> = `on${Capitalize<T>}`;
```

## 类

```typescript
class User {
    constructor(public id: number, public name: string) {}
    greet() { return `Hi, ${this.name}`; }
}
abstract class Shape { abstract area(): number }
```

## 模块

```typescript
export { User };
import { User } from './user';
import DefaultExport from './module';
```

---

## 学习资源

- [TypeScript 官方手册](https://www.typescriptlang.org/docs/handbook/intro.html) ⭐ 官方权威
