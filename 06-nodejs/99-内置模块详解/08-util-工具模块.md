# util 工具模块

> 实用工具函数

---

## L1 理解层

**最简示例（1-3行）：**

```javascript
const util = require('util');
util.format('Hello %s', '张三');           // 'Hello 张三'
const readFile = util.promisify(fs.readFile);
```

**详细示例：**

```javascript
const util = require('util');
const fs = require('fs');

// 格式化字符串
util.format('%s: %d', 'Age', 25);  // 'Age: 25'

// 回调转 Promise
const readFile = util.promisify(fs.readFile);
const data = await readFile('file.txt', 'utf-8');

// 检查类型
util.types.isDate(new Date());       // true
util.types.isMap(new Map());         // true

// 检查错误
util.types.isNativeError(new Error());  // true
```

---

## 学习资源

- [Node.js util 文档](https://nodejs.org/api/util.html) ⭐ 官方权威
