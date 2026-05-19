# 装饰器详解 ⭐

> 从"怎么给类自动加功能"的疑问出发，理解装饰器

---

## 学习目标

学完本节，你能：
- 理解装饰器的工作原理
- 掌握类装饰器、方法装饰器、属性装饰器
- 学会装饰器工厂的使用
- 了解装饰器在框架中的应用

---

## 生活化比喻

**装饰器就像"给代码穿衣服"**：

```
类 = 一个人：
┌─────────────────────────────┐
│  这个人本身有名字、年龄      │
│  class User { }             │
└─────────────────────────────┘

装饰器 = 衣服/配件：
┌─────────────────────────────┐
│  @sealed → 穿上密封外套     │
│  @log → 戴上记录仪          │
│  @cache → 背上缓存背包      │
│  人的本质没变，但增加了功能  │
└─────────────────────────────┘
```

---

## 第一步：看看问题

假设你有一个类，你想给它加上日志功能——每次创建实例时打印日志。

```typescript
class UserService {
    constructor() {
        console.log('UserService 被创建了');
    }
}
```

如果有很多类都需要这个功能，你得在每个类里写同样的代码。

**有没有更简洁的方法？**

---

## 第二步：装饰器怎么解决？

装饰器的做法是——**用一个函数包裹类，给它加上额外功能**：

```typescript
function logClass(constructor: Function) {
    console.log(`${constructor.name} 被创建了`);
}

@logClass
class UserService { }

// 输出：UserService 被创建了
```

`@logClass` 就是一个装饰器。它的意思是："用 `logClass` 函数处理这个类。"

---

## 第三步：试试类装饰器

类装饰器接收一个参数：构造函数。

```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class User {
    constructor(public name: string) {}
}
```

`Object.seal` 让类不能被扩展（不能添加新属性）。

### 单例装饰器

```typescript
function singleton<T extends { new (...args: any[]): {} }>(constructor: T) {
    let instance: any;
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);
            if (!instance) instance = this;
            return instance;
        }
    };
}

@singleton
class Config {
    constructor(public theme: string) {}
}

const c1 = new Config('dark');
const c2 = new Config('light');
console.log(c1 === c2);  // true（同一个实例）
```

---

## 第四步：方法装饰器

方法装饰器可以拦截方法的调用：

```typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`调用 ${key}，参数:`, args);
        const result = original.apply(this, args);
        console.log(`调用 ${key}，结果:`, result);
        return result;
    };
}

class Calculator {
    @log
    add(a: number, b: number) { return a + b; }
}

const calc = new Calculator();
calc.add(1, 2);
// 输出: 调用 add，参数: [1, 2]
// 输出: 调用 add，结果: 3
```

方法装饰器接收三个参数：
- `target`：类的原型
- `key`：方法名
- `descriptor`：方法描述符（包含原方法）

---

## 第五步：装饰器工厂 — 带参数的装饰器

有时候你想让装饰器接收参数。比如，你想控制日志的级别。

装饰器工厂就是**返回装饰器的函数**：

```typescript
function debounce(delay: number) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        let timer: any;
        descriptor.value = function(...args: any[]) {
            clearTimeout(timer);
            timer = setTimeout(() => original.apply(this, args), delay);
        };
    };
}

class SearchService {
    @debounce(300)
    search(query: string) {
        console.log('搜索:', query);
    }
}
```

`debounce(300)` 返回一个装饰器函数，这个装饰器再应用到 `search` 方法上。

---

## 第六步：属性装饰器

属性装饰器可以修改属性的行为：

```typescript
function readonly(target: any, key: string) {
    Object.defineProperty(target, key, { writable: false });
}

class User {
    @readonly
    id: number = Date.now();
}

const user = new User();
user.id = 123;  // ❌ 不能修改只读属性
```

---

## 第七步：装饰器执行顺序

当多个装饰器应用到同一个目标时，执行顺序是**从下到上**：

```typescript
@DecoratorA
@DecoratorB
class User {}

// 执行顺序：DecoratorB 先执行，然后 DecoratorA
```

---

## 装饰器类型速查

| 类型 | 参数 | 用途 |
|------|------|------|
| 类装饰器 | `constructor` | 修改类 |
| 方法装饰器 | `target, key, descriptor` | 修改方法行为 |
| 属性装饰器 | `target, key` | 修改属性定义 |
| 参数装饰器 | `target, key, index` | 标记参数 |

---

## 装饰器在框架中的应用

### Angular

Angular 大量使用装饰器：

```typescript
@Component({
    selector: 'app-root',
    template: '<h1>Hello</h1>'
})
export class AppComponent { }
```

### NestJS

NestJS 用装饰器定义路由：

```typescript
@Controller('users')
export class UserController {
    @Get()
    findAll() { }

    @Post()
    create(@Body() dto: CreateUserDto) { }
}
```

---

## 总结：速查表

| 装饰器 | 参数 | 示例 |
|--------|------|------|
| 类装饰器 | `constructor: Function` | `@sealed class User {}` |
| 方法装饰器 | `target, key, descriptor` | `@log method() {}` |
| 属性装饰器 | `target, key` | `@readonly id: number` |
| 装饰器工厂 | 返回装饰器的函数 | `@debounce(300)` |

---

## 实践练习

在 VSCode 中创建 `decorators.ts`，注意需要在 `tsconfig.json` 中开启 `"experimentalDecorators": true`：

### 练习 1：实现计时装饰器

```typescript
// 写一个 @timer 装饰器，记录方法执行时间

function timer(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
        const start = Date.now();
        const result = original.apply(this, args);
        console.log(`${key} 执行了 ${Date.now() - start}ms`);
        return result;
    };
}
```

### 练习 2：实现缓存装饰器

```typescript
// 写一个 @cache 装饰器，缓存方法返回值

function cache(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    const cache = new Map<string, any>();
    descriptor.value = function(...args: any[]) {
        const cacheKey = JSON.stringify(args);
        if (cache.has(cacheKey)) return cache.get(cacheKey);
        const result = original.apply(this, args);
        cache.set(cacheKey, result);
        return result;
    };
}
```

---

## 常见问题

### Q：装饰器和自定义 Hook 选哪个？

**React 项目优先用自定义 Hook（更简洁），类组件用装饰器。**

### Q：装饰器会影响性能吗？

**装饰器只在类定义时执行一次，运行时开销很小。但过多的装饰器会增加启动时间。**

---

## 学习资源

- [TypeScript 装饰器](https://www.typescriptlang.org/docs/handbook/decorators.html) ⭐ 官方文档
- [TC39 装饰器提案](https://github.com/tc39/proposal-decorators)
