# Map、Set 与 WeakMap

> 从零开始理解 ES6 的四种集合数据结构

## 学习目标

- ✅ 掌握 Map 数据结构的使用
- ✅ 掌握 Set 数据结构的使用
- ✅ 理解 WeakMap 和 WeakSet 的特性
- ✅ 能够选择合适的集合类型

---

## 5.0 为什么要学新的数据结构？

### 5.0.1 故事背景

在 ES6 之前，JavaScript 已经有一些数据结构：

```
┌─────────────────────────────────────────────────────────────┐
│  ES6 之前的数据结构                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  数组（Array）：有序的值列表                                 │
│  → 索引是数字（0, 1, 2...）                                 │
│  → 用途：有序数据集合                                        │
│                                                             │
│  对象（Object）：键值对                                      │
│  → 键是字符串（或 Symbol）                                  │
│  → 用途：结构化数据                                          │
│                                                             │
│  问题：                                                      │
│  1. 对象的键只能是字符串，不方便                             │
│  2. 数组无法自动去重                                        │
│  3. 对象没有 size 属性，遍历不灵活                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.0.2 ES6 新增的数据结构

```
┌─────────────────────────────────────────────────────────────┐
│                    ES6 新增的集合类型                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Map：字典                                                  │
│  → 键可以是任意类型                                          │
│  → 有序（保持插入顺序）                                      │
│  → 适合键值对集合                                            │
│                                                             │
│  Set：集合                                                  │
│  → 自动去重                                                 │
│  → 适合存储不重复的值                                         │
│                                                             │
│  WeakMap：弱引用的字典                                       │
│  → 键必须是对象                                              │
│  → 不影响垃圾回收                                            │
│  → 适合私有数据                                              │
│                                                             │
│  WeakSet：弱引用的集合                                       │
│  → 只能存对象                                                │
│  → 不影响垃圾回收                                            │
│  → 适合存储对象集合                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.0.3 本章学习路径

```
第一步：理解 Map（键可以是任意类型的字典）
    ↓
第二步：理解 Set（自动去重的集合）
    ↓
第三步：对比 Map vs Object（什么时候用哪个）
    ↓
第四步：理解 WeakMap/WeakSet（弱引用）
    ↓
第五步：掌握实际应用场景
```

---

## 5.1 Map 详解

> Map = 键值对集合，键可以是任意类型

### 5.1.1 基础语法

```javascript
// 创建 Map
const map = new Map();

// 添加键值对
map.set('name', '张三');
map.set('age', 25);

// 获取值
console.log(map.get('name'));  // '张三'
console.log(map.get('age'));   // 25

// 检查键是否存在
console.log(map.has('name'));  // true
console.log(map.has('gender')); // false

// 删除键值对
map.delete('age');
console.log(map.has('age'));   // false

// 获取大小
console.log(map.size);  // 1

// 清空所有
map.clear();
console.log(map.size);  // 0
```

### 5.1.2 链式调用

```javascript
// Map 方法返回 Map 实例，可以链式调用
const map = new Map()
    .set('name', '张三')
    .set('age', 25)
    .set('city', '北京')
    .set('email', 'zhang@example.com');

console.log(map.size);  // 4
```

### 5.1.3 初始化方式

**从数组创建：**

```javascript
// 数组的每个元素是 [key, value] 对
const map = new Map([
    ['name', '张三'],
    ['age', 25],
    ['city', '北京']
]);

console.log(map.get('name'));  // '张三'
```

**从对象转换：**

```javascript
const obj = { name: '张三', age: 25 };

// Object.entries() 将对象转换为键值对数组
const map = new Map(Object.entries(obj));

console.log(map.get('name'));  // '张三'
console.log(map.get('age'));   // 25
```

**转换回对象：**

```javascript
const map = new Map([['name', '张三'], ['age', 25]]);

// Object.fromEntries() 将键值对数组转换为对象
const obj = Object.fromEntries(map);

console.log(obj);  // { name: '张三', age: 25 }
```

### 5.1.4 遍历方法

```javascript
const map = new Map([
    ['name', '张三'],
    ['age', 25],
    ['city', '北京']
]);

// 1. for...of 遍历
for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}
// name: 张三
// age: 25
// city: 北京

// 2. forEach 遍历
map.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

// 3. 获取键、值、键值对
console.log([...map.keys()]);    // ['name', 'age', 'city']
console.log([...map.values()]);  // ['张三', 25, '北京']
console.log([...map.entries()]); // [['name', '张三'], ['age', 25], ['city', '北京']]
```

---

## 5.2 Map vs Object

> 什么时候用 Map，什么时候用 Object？

### 5.2.1 对比表

| 特性 | Map | Object |
|------|-----|--------|
| **键的类型** | 任意类型 | 字符串/Symbol |
| **键的有序性** | ✅ 有序（插入顺序） | ✅ 有序（ES6+） |
| **大小获取** | map.size | Object.keys(obj).length |
| **迭代** | for...of, forEach | for...in, Object.keys |
| **性能** | 频繁增删更好 | 频繁增删较差 |
| **原型** | 无原型链 | 有原型链（可能冲突） |
| **JSON** | 不能直接序列化 | 可以直接序列化 |

### 5.2.2 Map 的优势

**优势 1：键可以是任意类型**

```javascript
// Object：键只能是字符串
const obj = {};
obj[{}] = 'value';  // 键被转换为 '[object Object]'
console.log(obj['[object Object]']);  // 'value'

// Map：键可以是任意类型
const map = new Map();
const key = { id: 1 };
map.set(key, 'value');
console.log(map.get(key));  // 'value'
```

**优势 2：保持插入顺序**

```javascript
// Map 保持插入顺序
const map = new Map();
map.set('z', 'Z');
map.set('a', 'A');
map.set('m', 'M');

console.log([...map.keys()]);  // ['z', 'a', 'm']

// Object 在 ES6+ 也保持顺序，但不如 Map 可靠
```

**优势 3：没有原型链问题**

```javascript
// Object 可能有原型链上的属性
const obj = { name: '张三' };
console.log(obj.toString);  // 函数（来自原型）

// Map 没有这个问题
const map = new Map();
map.set('toString', 'value');
console.log(map.get('toString'));  // 'value'
```

### 5.2.3 什么时候用 Object？

```javascript
// 适合用 Object 的场景：
// 1. 键值对数量固定
// 2. 键是字符串
// 3. 需要 JSON 序列化
// 4. 需要使用点运算符访问

const config = {
    theme: 'dark',
    language: 'zh-CN',
    version: '1.0.0'
};
```

---

## 5.3 Set 详解

> Set = 不重复值的集合

### 5.3.1 基础语法

```javascript
// 创建 Set
const set = new Set();

// 添加元素
set.add(1);
set.add(2);
set.add(2);  // 重复，会被忽略！

console.log(set.size);  // 2

// 检查元素
console.log(set.has(2));  // true
console.log(set.has(3));  // false

// 删除元素
set.delete(2);
console.log(set.has(2));  // false

// 清空
set.clear();
console.log(set.size);  // 0
```

### 5.3.2 初始化

```javascript
// 从数组创建（自动去重）
const set = new Set([1, 2, 2, 3, 3, 3]);
console.log(set.size);  // 3
console.log([...set]);  // [1, 2, 3]
```

### 5.3.3 遍历

```javascript
const set = new Set([1, 2, 3]);

// for...of
for (const item of set) {
    console.log(item);  // 1, 2, 3
}

// forEach
set.forEach(item => {
    console.log(item);
});
```

### 5.3.4 Set 运算

```javascript
const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);

// 并集：合并两个集合
const union = new Set([...a, ...b]);
console.log([...union]);  // [1, 2, 3, 4, 5]

// 交集：两个集合都有的元素
const intersection = new Set([...a].filter(x => b.has(x)));
console.log([...intersection]);  // [3]

// 差集：a 有但 b 没有
const difference = new Set([...a].filter(x => !b.has(x)));
console.log([...difference]);  // [1, 2]

// 对称差集：只在其中一个集合中出现的元素
const symmetricDiff = new Set([
    ...[...a].filter(x => !b.has(x)),
    ...[...b].filter(x => !a.has(x))
]);
console.log([...symmetricDiff]);  // [1, 2, 4, 5]
```

### 5.3.5 实际应用：数组去重

```javascript
// 简单数组去重
const arr = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = [...new Set(arr)];
console.log(unique);  // [1, 2, 3, 4, 5]

// 对象数组去重（根据某个属性）
const users = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 1, name: '张三' }
];

// 使用 Map 按 id 去重
const uniqueUsers = [...new Map(users.map(u => [u.id, u])).values()];
console.log(uniqueUsers);  // [{ id: 1, name: '张三' }, { id: 2, name: '李四' }]
```

---

## 5.4 WeakMap 详解

> WeakMap = 键为对象且不影响垃圾回收的 Map

### 5.4.1 什么是弱引用？

```
┌─────────────────────────────────────────────────────────────┐
│  弱引用 vs 强引用                                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  强引用（普通引用）：                                        │
│  const obj = {};                                           │
│  const map = new Map();                                    │
│  map.set(obj, 'value');                                    │
│  → 即使没有其他地方使用 obj，obj 也不会被回收               │
│                                                             │
│  弱引用：                                                   │
│  const obj = {};                                           │
│  const weakMap = new WeakMap();                            │
│  weakMap.set(obj, 'value');                                │
│  → 如果没有其他地方使用 obj，obj 会被回收                   │
│  → 弱Map 中对应的键值对也会自动消失                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.4.2 基础语法

```javascript
// 创建 WeakMap
const weakMap = new WeakMap();

// 键必须是对象
const obj = { name: '测试对象' };
weakMap.set(obj, '关联的值');

console.log(weakMap.get(obj));  // '关联的值'
console.log(weakMap.has(obj));   // true

// 删除
weakMap.delete(obj);
console.log(weakMap.has(obj));  // false
```

### 5.4.3 WeakMap 的限制

```javascript
// WeakMap 不能遍历
// 没有 size 属性
// 没有 forEach 方法
// 没有 clear 方法
// 没有 keys(), values(), entries() 方法

const weakMap = new WeakMap();
const obj = {};
weakMap.set(obj, 'value');

// 这些都不行：
// console.log(weakMap.size);  // 报错
// for (const [key, value] of weakMap) {}  // 报错
// weakMap.forEach(...)  // 报错
```

### 5.4.4 实际应用：私有属性

```javascript
// 使用 WeakMap 实现类的私有属性
const privateData = new WeakMap();

class Person {
    constructor(name, age) {
        // 将实例作为键，私有数据作为值
        privateData.set(this, { name, age });
    }

    getName() {
        return privateData.get(this).name;
    }

    getAge() {
        return privateData.get(this).age;
    }

    setAge(age) {
        privateData.get(this).age = age;
    }
}

const person = new Person('张三', 25);
console.log(person.getName());  // '张三'
console.log(person.getAge());   // 25

// 无法直接从外部访问私有数据
// person.name  // undefined
// privateData.get(person)  // 在外部无法访问（除非有引用）
```

---

## 5.5 WeakSet 详解

> WeakSet = 只能存储对象且不影响垃圾回收的 Set

### 5.5.1 基础语法

```javascript
// 创建 WeakSet
const weakSet = new WeakSet();

// 添加对象（只能是对象）
const obj1 = { id: 1 };
const obj2 = { id: 2 };

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1));  // true
console.log(weakSet.has(obj2));  // true

// 删除
weakSet.delete(obj1);
console.log(weakSet.has(obj1));  // false
```

### 5.5.2 限制

```javascript
// WeakSet 只能存储对象
// weakSet.add(1);  // 报错：Invalid value used in weak set

// WeakSet 不能遍历
// 没有 size 属性
// 没有 forEach 方法
```

### 5.5.3 实际应用：追踪对象

```javascript
// 使用 WeakSet 追踪被观察的对象
const observed = new WeakSet();

class Observer {
    observe(target) {
        observed.add(target);
        console.log('开始观察对象');
    }

    isObserved(target) {
        return observed.has(target);
    }

    stopObserving(target) {
        observed.delete(target);
    }
}

const observer = new Observer();
const element = { id: 'myElement' };

observer.observe(element);
console.log(observer.isObserved(element));  // true

// 当 element 不再被其他地方引用时，会被自动回收
// observed 中也会自动删除
```

---

## 5.6 实践练习

### 练习 1：Map 使用

```javascript
// 1.1 创建并操作 Map
const scoreMap = new Map();
scoreMap.set('语文', 90);
scoreMap.set('数学', 85);
scoreMap.set('英语', 95);

console.log(scoreMap.get('数学'));  // 85
console.log(scoreMap.has('物理'));  // false

// 1.2 遍历 Map
scoreMap.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

// 1.3 Map 与 Object 互转
const obj = { name: '张三', age: 25 };
const map = new Map(Object.entries(obj));
const backToObj = Object.fromEntries(map);
console.log(backToObj);  // { name: '张三', age: 25 }
```

### 练习 2：Set 使用

```javascript
// 2.1 数组去重
const arr = [1, 2, 2, 3, 3, 3, 4, 5, 5];
const unique = [...new Set(arr)];
console.log(unique);  // [1, 2, 3, 4, 5]

// 2.2 Set 运算
const set1 = new Set([1, 2, 3, 4]);
const set2 = new Set([3, 4, 5, 6]);

// 并集
const union = new Set([...set1, ...set2]);
console.log([...union]);  // [1, 2, 3, 4, 5, 6]

// 交集
const intersection = new Set([...set1].filter(x => set2.has(x)));
console.log([...intersection]);  // [3, 4]
```

### 练习 3：WeakMap 私有属性

```javascript
// 使用 WeakMap 实现私有属性
const _data = new WeakMap();

class User {
    constructor(name, email) {
        _data.set(this, { name, email });
    }

    getInfo() {
        const data = _data.get(this);
        return `${data.name} (${data.email})`;
    }
}

const user = new User('张三', 'zhang@example.com');
console.log(user.getInfo());  // 张三 (zhang@example.com)
```

---

## 5.7 常见问答

### Q1: Map 和 Object 哪个更好？

**答：** 根据场景选择。

```javascript
// 用 Map：
// - 键需要是对象、函数等非字符串类型
// - 需要频繁增删键值对
// - 需要保持插入顺序
// - 需要获取集合大小

// 用 Object：
// - 键是字符串
// - 需要 JSON 序列化
// - 数据结构简单固定
```

### Q2: Set 和数组有什么区别？

**答：** Set 自动去重。

```javascript
// 数组
const arr = [1, 2, 2, 3];
console.log(arr);  // [1, 2, 2, 3]

// Set 自动去重
const set = new Set([1, 2, 2, 3]);
console.log([...set]);  // [1, 2, 3]
```

### Q3: WeakMap 有什么实际用途？

**答：** 主要用于私有数据和 DOM 关联。

```javascript
// 1. 私有数据
const privateProps = new WeakMap();

// 2. DOM 关联数据（当 DOM 被移除时自动清理）
const elementData = new WeakMap();
```

---

## 5.8 学习资源

### 官方文档

- [MDN - Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN - Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN - WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

### 推荐教程

- [ES6 入门教程 - 阮一峰](https://es6.ruanyifeng.com/#docs/set-map)
- [JavaScript.info - Map 和 Set](https://zh.javascript.info/map-set)

---

**上一章：** [← 04-模板字符串-Symbol](./04-模板字符串-Symbol.md)  
**下一章：** [→ 06-数组与对象新方法](./06-数组与对象新方法.md)