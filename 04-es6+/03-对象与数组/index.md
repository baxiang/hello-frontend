# Map、Set 与 WeakMap ⭐

> ES6 新增的集合数据结构

---

## 学习目标

- 掌握 Map（任意类型键的字典）和 Set（自动去重的集合）
- 理解 Map vs Object 的选择
- 理解 WeakMap/WeakSet 的弱引用特性和应用场景

---

## 生活化比喻

**集合类型就像"不同种类的储物系统"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  储物系统                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    Object = 固定格子储物柜                            │
│    ─────────────────                                 │
│    每个格子只能贴文字标签                            │
│    不能贴图片标签（键只能是字符串/Symbol）           │
│                                                      │
│    Map = 万能储物柜                                   │
│    ─────────────                                     │
│    任何物品都能当标签：文字、图片、甚至另一个储物柜   │
│    按放入顺序排列                                     │
│                                                      │
│    Set = 自动去重的收纳盒                             │
│    ─────────────                                     │
│    相同的东西放进去，只会保留一个                    │
│    适合收藏不重复的物品                               │
│                                                      │
│    WeakMap = 幽灵储物柜                              │
│    ─────────────                                     │
│    钥匙必须是物品（对象）                             │
│    当钥匙被扔掉，柜子里的东西也自动消失              │
│    不影响垃圾回收                                     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### Map

**语法结构图：**

```
Map 操作：

const map = new Map();
map.set(key, value)    → 添加/更新
map.get(key)           → 获取值
map.has(key)           → 是否存在
map.delete(key)        → 删除
map.size               → 大小
map.clear()            → 清空

遍历:
for (const [k, v] of map) { }
map.forEach((v, k) => { })
[...map.keys()]
[...map.values()]
[...map.entries()]
```

**最简示例（1-3行）：**

```javascript
const map = new Map([['name', '张三'], ['age', 25]]);
map.get('name');  // '张三'
```

**详细示例：**

```javascript
// 创建与操作
const map = new Map()
    .set('name', '张三')
    .set('age', 25)
    .set('city', '北京');

map.get('name');     // '张三'
map.has('age');      // true
map.delete('city');
map.size;            // 2

// 键可以是任意类型
const key = { id: 1 };
map.set(key, 'value');
map.get(key);        // 'value'

// 遍历
for (const [k, v] of map) console.log(k, v);

// 与 Object 互转
const obj = Object.fromEntries(map);
const map2 = new Map(Object.entries(obj));
```

---

### Set

**最简示例：**

```javascript
const set = new Set([1, 2, 2, 3]);
set.size;     // 3
[...set];     // [1, 2, 3]
```

**详细示例：**

```javascript
// 创建与操作
const set = new Set();
set.add(1).add(2).add(2);  // 链式调用，重复值被忽略
set.has(2);     // true
set.delete(2);
set.size;       // 1

// 数组去重
const unique = [...new Set([1, 2, 2, 3, 3])];  // [1, 2, 3]

// 遍历
for (const item of set) console.log(item);
set.forEach(item => console.log(item));

// 集合运算
const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);

const union = new Set([...a, ...b]);                           // 并集: {1,2,3,4,5}
const intersection = new Set([...a].filter(x => b.has(x)));    // 交集: {3}
const difference = new Set([...a].filter(x => !b.has(x)));     // 差集: {1,2}
```

---

### WeakMap / WeakSet

**最简示例：**

```javascript
const wm = new WeakMap();
const obj = {};
wm.set(obj, 'value');
wm.get(obj);  // 'value'
```

**详细示例：**

```javascript
// WeakMap — 键必须是对象，不影响垃圾回收
const privateData = new WeakMap();

class User {
    constructor(name) {
        privateData.set(this, { name });
    }
    getName() { return privateData.get(this).name; }
}

// WeakSet — 只能存对象
const observed = new WeakSet();
const el = { id: 1 };
observed.add(el);
observed.has(el);  // true
```

---

## L2 实践层：用好

### Map vs Object 选择

| 场景 | 推荐 | 原因 |
|------|------|------|
| 键需要是对象/函数 | Map | Object 键只能是字符串/Symbol |
| 需要保持插入顺序 | Map | 有序遍历 |
| 频繁增删 | Map | 性能更好 |
| 需要 JSON 序列化 | Object | Map 不能直接 JSON.stringify |
| 简单固定结构 | Object | 点运算符访问更方便 |

### 反模式：不要这样做

```javascript
// ❌ 错误：用 Object 存储动态键值对（键可能是 'toString' 等原型方法名）
const obj = {};
obj['toString'] = 'value';  // 覆盖了原型方法

// ✅ 正确：用 Map
const map = new Map();
map.set('toString', 'value');  // 安全
```

```javascript
// ❌ 错误：用数组 indexOf 去重对象
const users = [{ id: 1 }, { id: 1 }];
const unique = [...new Set(users)];  // 不行，对象引用不同

// ✅ 正确：用 Map 按 id 去重
const unique = [...new Map(users.map(u => [u.id, u])).values()];
```

### 适用场景

| 场景 | 推荐方案 | 示例 |
|------|---------|------|
| 对象缓存 | WeakMap | DOM 元素关联数据 |
| 数组去重 | Set | `[...new Set(arr)]` |
| 配置字典 | Map | 键为任意类型的映射 |
| 权限集合 | Set | `roles.has('admin')` |
| 私有数据 | WeakMap | Class 内部状态管理 |

---

## L3 专家层：深入

### 弱引用原理

```
强引用 vs 弱引用：

强引用（Map）:
  const obj = {};
  map.set(obj, 'value');
  // 即使 obj 其他地方不再使用，也不会被垃圾回收
  // Map 持有对 obj 的强引用

弱引用（WeakMap）:
  const obj = {};
  wm.set(obj, 'value');
  // 当 obj 其他地方不再使用时，会被垃圾回收
  // WeakMap 中的键值对也会自动消失
  // 不会阻止垃圾回收
```

### 性能考量

| 操作 | Map | Object |
|------|-----|--------|
| 查找 | O(1) | O(1)（可能被原型链影响） |
| 插入 | O(1) | O(1) |
| 删除 | O(1) | O(1) |
| 遍历 | 快（直接迭代） | 需要 Object.keys() |
| 内存 | 稍多 | 少 |

### 知识关联

```
集合类型关联：

┌─────────────┐     ┌─────────────┐
│   Object    │────→│    Map      │
│  字符串键   │     │  任意类型键 │
└─────────────┘     └─────────────┘
                           │
                           ↓
                    ┌─────────────┐
                    │   WeakMap   │
                    │  弱引用键   │
                    └─────────────┘

┌─────────────┐     ┌─────────────┐
│   Array     │────→│    Set      │
│  有序可重复 │     │  无序不重复 │
└─────────────┘     └─────────────┘
                           │
                           ↓
                    ┌─────────────┐
                    │   WeakSet   │
                    │  弱引用对象 │
                    └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **Map** | 键值对集合，键可以是任意类型 | `new Map([['key', value]])` |
| **Set** | 不重复值的集合 | `new Set([1, 2, 3])` |
| **WeakMap** | 键为对象的弱引用 Map，不影响垃圾回收 | `new WeakMap()` |
| **WeakSet** | 只能存对象的弱引用 Set | `new WeakSet()` |
| **弱引用** | 不影响垃圾回收的引用 | 对象无其他引用时自动回收 |

---

## 实践练习

### 练习：LRU 缓存 + 对象去重

```javascript
// 练习 1：用 Map 实现简单 LRU 缓存
class LRUCache {
    #map = new Map();
    #capacity;

    constructor(capacity) { this.#capacity = capacity; }

    get(key) {
        if (!this.#map.has(key)) return undefined;
        const value = this.#map.get(key);
        this.#map.delete(key);
        this.#map.set(key, value);  // 移到末尾（最近使用）
        return value;
    }

    put(key, value) {
        if (this.#map.has(key)) this.#map.delete(key);
        this.#map.set(key, value);
        if (this.#map.size > this.#capacity) {
            this.#map.delete(this.#map.keys().next().value);  // 删除最久未使用
        }
    }
}

const cache = new LRUCache(2);
cache.put('a', 1);
cache.put('b', 2);
cache.put('c', 3);  // 淘汰 'a'
console.log(cache.get('a'));  // undefined

// 练习 2：集合运算工具
const SetOps = {
    union: (a, b) => new Set([...a, ...b]),
    intersection: (a, b) => new Set([...a].filter(x => b.has(x))),
    difference: (a, b) => new Set([...a].filter(x => !b.has(x))),
    isSubset: (a, b) => [...a].every(x => b.has(x))
};

const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);
console.log([...SetOps.union(a, b)]);           // [1, 2, 3, 4, 5]
console.log([...SetOps.intersection(a, b)]);    // [3]
```

---

## 常见问题

### Q1：Map 和 Object 哪个更好？

**根据场景选择：**

```javascript
// 用 Map：键是对象、需要顺序、频繁增删
const config = new Map().set(userObj, { role: 'admin' });

// 用 Object：简单固定结构、需要 JSON 序列化
const data = { name: '张三', age: 25 };
JSON.stringify(data);  // ✅
```

### Q2：WeakMap 有什么实际用途？

**两个经典场景：**

```javascript
// 1. DOM 元素关联数据（元素删除后自动清理）
const elementData = new WeakMap();
elementData.set(domElement, { handler: onClick });

// 2. 类私有数据（ES2022 前）
const _data = new WeakMap();
class User {
    constructor(name) { _data.set(this, { name }); }
    getName() { return _data.get(this).name; }
}
```

### Q3：Set 去重对象数组为什么不行？

**Set 比较的是引用，不是值：**

```javascript
const arr = [{ id: 1 }, { id: 1 }];
[...new Set(arr)];  // 两个对象都在（引用不同）

// 正确做法：用 Map 按 id 去重
[...new Map(arr.map(item => [item.id, item])).values()];
```

---

## 学习资源

- [MDN - Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) ⭐ 官方权威
- [MDN - Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN - WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [JavaScript.info - Map 和 Set](https://zh.javascript.info/map-set)
