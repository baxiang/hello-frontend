# Map、Set 与 WeakMap

## 学习目标
- 掌握 Map 数据结构的使用
- 掌握 Set 数据结构的使用
- 理解 WeakMap 和 WeakSet 的特性
- 能够选择合适的集合类型

---

## 5.1 Map 数据结构

### 基础用法

```javascript
// 创建 Map
const map = new Map();

// 添加元素
map.set('name', '张三');
map.set('age', 25);

// 链式调用
map.set('city', '北京').set('email', 'zhang@example.com');

// 获取元素
console.log(map.get('name'));  // '张三'
console.log(map.get('age'));   // 25

// 检查元素
console.log(map.has('name'));  // true
console.log(map.has('gender')); // false

// 删除元素
map.delete('age');

// 获取大小
console.log(map.size);  // 3

// 清空
map.clear();
```

### 初始化方式

```javascript
// 从数组创建
const map = new Map([
    ['name', '张三'],
    ['age', 25],
    ['city', '北京']
]);

// 从对象转换
const obj = { name: '张三', age: 25 };
const map = new Map(Object.entries(obj));

// 转换回对象
const obj = Object.fromEntries(map);
```

### 遍历方法

```javascript
const map = new Map([
    ['name', '张三'],
    ['age', 25]
]);

// for...of 遍历
for (const [key, value] of map) {
    console.log(key, value);
}

// forEach 遍历
map.forEach((value, key) => {
    console.log(key, value);
}

// 获取所有键/值
console.log([...map.keys()]);    // ['name', 'age']
console.log([...map.values()]);  // ['张三', 25]
console.log([...map.entries()]); // [['name', '张三'], ['age', 25]]
```

### Map vs Object

```javascript
// Map 的优势
// 1. 键可以是任意类型
const map = new Map();
map.set({}, 'object as key');
map.set([], 'array as key');
map.set(() => {}, 'function as key');

// 2. 有序
const map = new Map([[3, '三'], [1, '一'], [2, '二']]);
console.log([...map.keys()]);  // [3, 1, 2]（保持插入顺序）

// 3. 更好的性能
// Map 在频繁增删键值对时性能更好

// 4. 易于获取大小
console.log(map.size);  // 直接获取
console.log(Object.keys(obj).length);  // 对象需要间接获取
```

---

## 5.2 Set 数据结构

### 基础用法

```javascript
// 创建 Set
const set = new Set();

// 添加元素
set.add(1);
set.add(2);
set.add(2);  // 重复，会被忽略

// 初始化
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set.size);  // 3

// 检查元素
console.log(set.has(2));  // true
console.log(set.has(4));  // false

// 删除元素
set.delete(2);

// 清空
set.clear();
```

### Set 运算

```javascript
const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);

// 并集
const union = new Set([...a, ...b]);
console.log(union);  // Set(5) {1, 2, 3, 4, 5}

// 交集
const intersection = new Set([...a].filter(x => b.has(x)));
console.log(intersection);  // Set(1) {3}

// 差集 (a 有但 b 没有)
const difference = new Set([...a].filter(x => !b.has(x)));
console.log(difference);  // Set(2) {1, 2}

// 对称差集
const symmetricDiff = new Set([
    ...[...a].filter(x => !b.has(x)),
    ...[...b].filter(x => !a.has(x))
]);
console.log(symmetricDiff);  // Set(4) {1, 2, 4, 5}
```

### 数组去重

```javascript
// 简单去重
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];
console.log(unique);  // [1, 2, 3]

// 对象数组去重（根据某个属性）
const users = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 1, name: '张三' }
];

const uniqueUsers = [
    ...new Map(users.map(user => [user.id, user])).values()
];
console.log(uniqueUsers);  // [{id:1}, {id:2}]
```

---

## 5.3 WeakMap 和 WeakSet

### WeakMap

```javascript
// 创建 WeakMap
const weakMap = new WeakMap();

// 键必须是对象
const obj = { name: '对象' };
weakMap.set(obj, 'associated value');

// 获取值
console.log(weakMap.get(obj));  // 'associated value'

// 检查
console.log(weakMap.has(obj));  // true

// 删除
weakMap.delete(obj);

// 注意：WeakMap 不能遍历
// 没有 size 属性
// 没有 clear 方法
// 没有 forEach 方法
```

### WeakMap 的应用

```javascript
// 1. 私有属性
const privateData = new WeakMap();

class Person {
    constructor(name, salary) {
        privateData.set(this, { name, salary });
    }

    getSalary() {
        return privateData.get(this).salary;
    }

    setSalary(salary) {
        privateData.get(this).salary = salary;
    }
}

const person = new Person('张三', 10000);
console.log(person.getSalary());  // 10000
// person.salary 无法直接访问

// 2. DOM 关联数据
const elementData = new WeakMap();
const element = document.querySelector('#myElement');
elementData.set(element, { clickCount: 0 });

// 当 element 被移除时，关联数据会自动被 GC 回收
```

### WeakSet

```javascript
// 创建 WeakSet
const weakSet = new WeakSet();

// 添加对象
const obj = {};
weakSet.add(obj);

// 检查
console.log(weakSet.has(obj));  // true

// 删除
weakSet.delete(obj);

// 注意：只能存储对象
// weakSet.add(1);  // 报错
// 不能遍历
```

### WeakSet 的应用

```javascript
// 标记对象是否被处理过
const processed = new WeakSet();

function processData(obj) {
    if (processed.has(obj)) {
        console.log('已处理过');
        return;
    }
    // 处理逻辑
    processed.add(obj);
}

// 当 obj 被销毁时，WeakSet 中的引用也会自动清除
```

---

## 5.4 实践练习

### 练习 1：LRU 缓存

```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        // 移动到最新位置
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        // 超出容量，删除最旧的
        if (this.cache.size >= this.capacity) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, value);
    }
}

// 使用
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));  // 1
cache.put(3, 3);  // 删除 key 2
console.log(cache.get(2));  // -1
```

### 练习 2：词频统计

```javascript
function countWords(text) {
    const words = text.toLowerCase().split(/\s+/);
    const freq = new Map();

    for (const word of words) {
        freq.set(word, (freq.get(word) || 0) + 1);
    }

    return freq;
}

// 使用
const text = 'hello world hello javascript';
const freq = countWords(text);

// 按频率排序
const sorted = [...freq.entries()]
    .sort((a, b) => b[1] - a[1]);

console.log(sorted);
// [['hello', 2], ['world', 1], ['javascript', 1]]
```

### 练习 3：依赖注入

```javascript
// 使用 WeakMap 存储依赖
const dependencies = new WeakMap();

class Injector {
    constructor() {
        this.services = new Map();
    }

    register(name, service) {
        this.services.set(name, service);
    }

    resolve(Class) {
        const deps = dependencies.get(Class) || [];
        const instances = deps.map(name => this.services.get(name));
        return new Class(...instances);
    }
}

// 定义依赖
class Logger {}
class Database {}

class UserService {
    constructor(logger, db) {
        this.logger = logger;
        this.db = db;
    }
}
dependencies.set(UserService, ['logger', 'database']);

// 使用
const injector = new Injector();
injector.register('logger', new Logger());
injector.register('database', new Database());

const userService = injector.resolve(UserService);
```

---

## 5.5 常见问答

### Q1: Map 和 Object 应该如何选择？

| 场景 | 推荐 |
|------|------|
| 键是字符串 | Object |
| 键是其他类型 | Map |
| 需要频繁增删 | Map |
| 需要序列化 | Object |
| 需要顺序遍历 | Map |

### Q2: WeakMap 有什么特殊用途？

**答：** 主要用于关联数据而不影响 GC，适合：
- 私有属性
- DOM 关联数据
- 缓存（自动清理）
- 元数据

### Q3: Set 和数组应该如何选择？

| 场景 | 推荐 |
|------|------|
| 需要唯一值 | Set |
| 需要索引访问 | 数组 |
| 集合运算 | Set |
| 需要序列化 | 数组 |

### Q4: 如何清空 Map/Set？

```javascript
// Map
map.clear();

// Set
set.clear();

// WeakMap/WeakSet 没有 clear 方法
```

---

## 5.6 学习资源

- [MDN - Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN - Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN - WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [ES6 入门教程 - Map/Set](https://es6.ruanyifeng.com/#docs/set-map)

---

**上一章：** [← 04-模板字符串-Symbol](./04-模板字符串-Symbol.md)
**下一章：** [→ 06-数组与对象新方法](./06-数组与对象新方法.md)
