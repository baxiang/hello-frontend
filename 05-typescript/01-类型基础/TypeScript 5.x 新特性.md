# TypeScript 5.x 新特性

> satisfies、const 类型参数、装饰器更新

---

## L1 理解层

**最简示例（1-3行）：**

```typescript
const config = { port: 3000 } satisfies Record<string, number>;
function fn<const T>(x: T) { }
```

**详细示例：**

```typescript
// satisfies — 验证类型但保留推断
type Theme = { primary: string; secondary: string };
const colors = { primary: '#ff0000', secondary: '#00ff00' } satisfies Theme;
// colors.primary 类型是 '#ff0000'（不是 string）

// const 类型参数
function makeConst<const T>(value: T): T { return value; }
const arr = makeConst([1, 2, 3]);  // readonly [1, 2, 3]

// 装饰器（ES2022）
function logged(target: any, key: string, desc: PropertyDescriptor) {
    const original = desc.value;
    desc.value = function(...args: any[]) {
        console.log(`Calling ${key}`);
        return original.apply(this, args);
    };
}
```

---

## L2 实践层

### as vs satisfies

| 特性 | as | satisfies |
|------|-----|-----------|
| 类型改变 | ✅ 改变为目标类型 | ❌ 保留推断类型 |
| 安全检查 | ❌ 可以绕过 | ✅ 必须满足类型 |

### 反模式

```typescript
// ❌ 错误：用 as 绕过检查
const x = { foo: 1 } as { foo: string };

// ✅ 正确：用 satisfies 验证
const x = { foo: 1 } satisfies { foo: number };
```

---

## 学习资源

- [TypeScript 5.0 发布说明](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/) ⭐ 官方权威
