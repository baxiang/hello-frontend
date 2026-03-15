# path 路径模块

> 处理文件路径的模块

## 什么是 path 模块？

```
┌─────────────────────────────────────────────────────────────┐
│  path = 路径处理工具                                         │
│                                                             │
│  就像：                                                     │
│  - 导航仪：帮你规划路线                                      │
│  - 地址簿：记录各种地址                                      │
│  - 地图：告诉你怎么走                                        │
│                                                             │
│  主要功能：                                                  │
│  - 拼接路径                                                 │
│  - 解析路径                                                 │
│  - 获取文件名/扩展名                                         │
│  - 路径规范化                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 3.1 路径拼接

### path.join()

```javascript
const path = require('path');

// 拼接路径（自动处理分隔符）
const result = path.join('/users', 'zhangsan', 'project', 'file.txt');
console.log(result);
// Linux/Mac: /users/zhangsan/project/file.txt
// Windows: \users\zhangsan\project\file.txt

// 常用场景
path.join(__dirname, 'config.json');  // 配置文件路径
path.join(__dirname, '..', 'logs');   // 上级目录的 logs
```

### path.resolve()

```javascript
const path = require('path');

// 解析为绝对路径
path.resolve('file.txt');
// /Users/zhangsan/project/file.txt

path.resolve('/etc', 'passwd');
// /etc/passwd（绝对路径直接返回）

path.resolve('/users', '/etc', 'passwd');
// /etc/passwd（遇到绝对路径就停止）

// 常用场景
path.resolve('./config.json');  // 转为绝对路径
```

### join vs resolve

```javascript
const path = require('path');

// join：简单拼接，不改变绝对/相对性质
path.join('/users', 'zhangsan');   // /users/zhangsan
path.join('users', 'zhangsan');    // users/zhangsan

// resolve：转绝对路径，以当前目录为基准
path.resolve('/users', 'zhangsan');  // /users/zhangsan
path.resolve('users', 'zhangsan');    // /当前目录/users/zhangsan
```

---

## 3.2 解析路径

### path.parse()

```javascript
const path = require('path');

// 解析路径各部分
const parsed = path.parse('/users/zhangsan/project/file.txt');

console.log(parsed);
// {
//   root: '/',           // 根目录
//   dir: '/users/zhangsan/project',  // 目录
//   base: 'file.txt',   // 文件名（含扩展名）
//   ext: '.txt',        // 扩展名
//   name: 'file'        // 文件名（不含扩展名）
// }
```

### path.format()

```javascript
const path = require('path');

// 从对象生成路径（parse 的反向操作）
const result = path.format({
    dir: '/users/zhangsan/project',
    name: 'file',
    ext: '.txt'
});
console.log(result);  // /users/zhangsan/project/file.txt
```

---

## 3.3 提取路径部分

### path.basename()

```javascript
const path = require('path');

// 获取文件名
path.basename('/users/zhangsan/file.txt');
// file.txt

// 去掉扩展名
path.basename('/users/zhangsan/file.txt', '.txt');
// file
```

### path.dirname()

```javascript
const path = require('path');

// 获取目录部分
path.dirname('/users/zhangsan/project/file.txt');
// /users/zhangsan/project
```

### path.extname()

```javascript
const path = require('path');

// 获取扩展名
path.extname('/users/zhangsan/file.txt');
// .txt

path.extname('/users/zhangsan/file.tar.gz');
// .gz（只返回最后一个）

path.extname('file');  // 空字符串
path.extname('.gitignore');  // 空字符串（隐藏文件）
```

---

## 3.4 路径操作

### path.normalize()

```javascript
const path = require('path');

// 规范化路径（处理 .. 和 .）
path.normalize('/users/zhangsan/../li/project/file.txt');
// /users/li/project/file.txt

path.normalize('/users//zhangsan//project/./file.txt');
// /users/zhangsan/project/file.txt
```

### path.isAbsolute()

```javascript
const path = require('path');

// 判断是否为绝对路径
path.isAbsolute('/users/zhangsan');  // true
path.isAbsolute('users/zhangsan');   // false
path.isAbsolute('./file.txt');       // false
```

### path.relative()

```javascript
const path = require('path');

// 获取相对路径
path.relative('/users/zhangsan', '/users/zhangsan/project/file.txt');
// project/file.txt

path.relative('/users/zhangsan/project', '/users/zhangsan/docs');
// ../docs
```

---

## 3.5 跨平台路径分隔符

### path.sep

```javascript
const path = require('path');

// 路径分隔符
console.log(path.sep);
// Linux/Mac: /
// Windows: \

// 使用示例
const parts = 'users/zhangsan/file.txt'.split(path.sep);
// Linux: ['users', 'zhangsan', 'file.txt']
// Windows: ['users\\zhangsan\\file.txt']
```

### path.delimiter

```javascript
const path = require('path');

// 路径分隔符（环境变量）
console.log(path.delimiter);
// Linux/Mac: :
// Windows: ;
```

---

## 3.6 实际应用

### 处理 __dirname

```javascript
const path = require('path');

// 获取当前文件所在目录
console.log(__dirname);  // /users/zhangsan/project/src

// 获取当前文件路径
console.log(__filename);  // /users/zhangsan/project/src/index.js

// 常用路径拼接
path.join(__dirname, 'config.json');
path.resolve(__dirname, '../logs');
path.join(__dirname, '..', '..', 'config.json');
```

### 处理文件路径

```javascript
const path = require('path');

function getFileInfo(filePath) {
    const parsed = path.parse(filePath);

    return {
        directory: parsed.dir,
        filename: parsed.name,
        extension: parsed.ext,
        fullname: parsed.base,
        absolutePath: path.resolve(filePath)
    };
}

console.log(getFileInfo('/users/zhangsan/docs/report.pdf'));
// {
//   directory: '/users/zhangsan/docs',
//   filename: 'report',
//   extension: '.pdf',
//   fullname: 'report.pdf',
//   absolutePath: '/users/zhangsan/docs/report.pdf'
// }
```

---

## 3.7 常见问答

### Q1: Windows 和 Mac 路径兼容？

```javascript
const path = require('path');

// path.join 自动处理分隔符
path.join('users', 'zhangsan', 'file.txt');
// 在任何系统都能正常工作

// 但比较路径时要注意
// 建议先 normalize
path.normalize('users\\zhangsan') === path.normalize('users/zhangsan');
```

### Q2: __dirname 和 process.cwd() 区别？

```javascript
// __dirname：当前文件所在目录
// /users/zhangsan/project/src/utils.js

// process.cwd()：当前工作目录（运行 node 的位置）
// /users/zhangsan/project
```

---

## 3.8 学习资源

- [Node.js path 官方文档](https://nodejs.org/api/path.html)

---

**上一章：** [← fs 文件模块](./02-fs-文件模块.md)  
**下一章：** [→ events 事件模块](./04-events-事件模块.md)