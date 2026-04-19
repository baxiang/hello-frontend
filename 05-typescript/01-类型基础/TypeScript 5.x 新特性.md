# TypeScript 5.x 新特性

> satisfies、const 类型参数、装饰器更新

---

## 学习目标

- 掌握 satisfies 操作符
- 理解 const 类型参数的使用
- 了解装饰器的标准化

---

## L1 理解层：会用

### satisfies 操作符

**最简示例（1-3行）：**

```typescript
const config = { port: 3000, host: 'localhost' } satisfies Record<string, number | string>;
```

**详细示例：**

```typescript
// satisfies vs as 的区别

// as — 改变类型
const colors1 = ['red', 'green'] as string[];
// colors1[0] 的类型是 string（失去了字面量信息）

// satisfies — 验证类型但保留推断
const colors2 = ['red', 'green'] satisfies string[];
// colors2[0] 的类型是 'red'（保留了字面量信息）

// 实际应用场景
type Theme = {
    primary: string;
    secondary: string;
    accent?: string;
};

const theme = {
    primary: '#3b82f6',
    secondary: '#6366f1',
    accent: '#8b5cf6'
} satisfies Theme;

// 如果少写属性，会报错
// const bad = { primary: '#3b82f6' } satisfies Theme;  // ❌ 缺少 secondary

// 如果多写属性，也会报错
// const bad = { primary: '#3b82f6', secondary: '#6366f1', extra: 'xxx' } satisfies Theme;  // ❌
```

---

### const 类型参数

```typescript
// 函数推断字面量类型
function createConst<const T>(value: T): T {
    return value;
}

const arr = createConst([1, 2, 3]);
// arr 的类型是 readonly [1, 2, 3]

const obj = createConst({ name: 'Tom', age: 25 });
// obj 的类型是 { readonly name: 'Tom'; readonly age: 25 }

// 对比：不用 const 参数
function createNormal<T>(value: T): T {
    return value;
}

const normalArr = createNormal([1, 2, 3]);
// normalArr 的类型是 number[]（失去了字面量信息）
```

---

## L2 实践层：用好

### as vs satisfies 对比

| 特性 | as | satisfies |
|------|-----|-----------|
| 类型改变 | ✅ 改变为目标类型 | ❌ 保留推断类型 |
| 安全检查 | ❌ 可以绕过 | ✅ 必须满足类型 |
| 字面量保留 | ❌ 丢失 | ✅ 保留 |

### 反模式

```typescript
// ❌ 错误：用 as 绕过检查
const x = { foo: 1 } as { foo: string };

// ✅ 正确：用 satisfies 验证
const x = { foo: 1 } satisfies { foo: number };
```

### 适用场景

| 场景 | 推荐方案 | 示例 |
|------|---------|------|
| 配置对象验证 | `satisfies` | `config satisfies Config` |
| 保留字面量类型 | `satisfies` | `colors satisfies string[]` |
| DOM 类型转换 | `as` | `el as HTMLInputElement` |
| JSON 解析 | `as` | `JSON.parse(str) as User` |

---

## L3 专家层：深入

### 装饰器标准化

```typescript
// TypeScript 5.0+ 支持标准装饰器（Stage 3）
// 不再需要 experimentalDecorators

function logged(target: Function, context: ClassDecoratorContext) {
    console.log(`创建类: ${context.name}`);
}

@logged
class UserService { }

// 方法装饰器
function memo(target: Function, context: ClassMethodDecoratorContext) {
    const cache = new Map<string, any>();
    return function(this: any, ...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = target.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

class Calculator {
    @memo
    expensiveCalc(n: number): number {
        console.log('计算中...');
        return n * 2;
    }
}
```

### 知识关联

```
5.x 新特性关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  satisfies  │────→│  const 参数 │────→│  标准装饰器 │
│  类型验证/  │     │  字面量/    │     │  不再需要   │
│  保留推断   │     │  只读       │     │  experimental│
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **satisfies** | 验证类型但保留推断的操作符 | `obj satisfies Type` |
| **const 类型参数** | 函数参数推断为字面量类型 | `function fn<const T>(x: T)` |
| **标准装饰器** | TC39 Stage 3 装饰器规范 | `@logged class User {}` |

---

## 实践练习

```typescript
// 练习 1：satisfies 验证路由配置
const routes = {
    home: { path: '/', component: 'Home' },
    about: { path: '/about', component: 'About' }
} satisfies Record<string, { path: string; component: string }>;

// 练习 2：const 参数实现 immutable
function immutable<const T>(obj: T): Readonly<T> {
    return Object.freeze(obj);
}

const config = immutable({ port: 3000, debug: true });
// config.port = 4000;  // ❌ 编译错误
```

---

## 学习资源

- [TypeScript 5.0 发布说明](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/) ⭐ 官方权威
