# TypeScript 实战练习册

> 通过练习巩固 TypeScript 知识

---

## 练习 1：基础类型

```typescript
// 定义 User 类型
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
    isActive: boolean;
}

const user1: User = { id: 1, name: '张三', email: 'zhang@example.com', age: 25, isActive: true };
```

## 练习 2：泛型

```typescript
// 实现 first 函数
function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

first([1, 2, 3]);    // number
first(['a', 'b']);   // string
```

## 练习 3：工具类型

```typescript
// 实现 Partial
type MyPartial<T> = { [K in keyof T]?: T[K] };

// 实现 Pick
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
```

## 练习 4：类型守卫

```typescript
interface Fish { swim(): void }
interface Bird { fly(): void }

function isFish(animal: Fish | Bird): animal is Fish {
    return 'swim' in animal;
}
```

## 练习 5：条件类型

```typescript
// 实现 NonNullable
type MyNonNullable<T> = T extends null | undefined ? never : T;

// 实现 ReturnType
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

---

## 学习资源

- [TypeScript Exercises](https://typescript-exercises.github.io/)
