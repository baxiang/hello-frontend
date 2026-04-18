# path 路径模块

> 处理和转换文件路径

---

## L1 理解层

**最简示例（1-3行）：**

```javascript
const path = require('path');
path.join('/a', 'b', 'c');      // '/a/b/c'
path.extname('file.txt');       // '.txt'
```

**详细示例：**

```javascript
const path = require('path');

path.join('/users', 'docs', 'file.txt');     // '/users/docs/file.txt'
path.resolve('file.txt');                     // 绝对路径
path.parse('/a/b/file.txt');                  // { root, dir, base, ext, name }
path.basename('/a/b/file.txt');               // 'file.txt'
path.dirname('/a/b/file.txt');                // '/a/b'
path.extname('/a/b/file.txt');                // '.txt'
```

---

## L2 实践层

### 常用方法速查

| 方法 | 用途 | 示例 |
|------|------|------|
| `join` | 拼接路径 | `path.join(__dirname, 'src')` |
| `resolve` | 解析为绝对路径 | `path.resolve('./file')` |
| `basename` | 获取文件名 | `path.basename('/a/b.txt')` → `'b.txt'` |
| `dirname` | 获取目录 | `path.dirname('/a/b.txt')` → `'/a'` |
| `extname` | 获取扩展名 | `path.extname('a.txt')` → `'.txt'` |

---

## 学习资源

- [Node.js path 文档](https://nodejs.org/api/path.html) ⭐ 官方权威
