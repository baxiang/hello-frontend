# stream 流模块

> 高效处理大量数据

---

## L1 理解层

**最简示例（1-3行）：**

```javascript
const fs = require('fs');
const readStream = fs.createReadStream('large.txt', 'utf-8');
readStream.on('data', chunk => console.log(chunk));
```

**详细示例：**

```javascript
const fs = require('fs');

// 读取流
const readStream = fs.createReadStream('input.txt', 'utf-8');
readStream.on('data', chunk => console.log('收到:', chunk));
readStream.on('end', () => console.log('读取完成'));
readStream.on('error', err => console.error(err));

// 写入流
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('line 1\n');
writeStream.write('line 2\n');
writeStream.end();
writeStream.on('finish', () => console.log('写入完成'));

// pipe — 连接读写流
const rs = fs.createReadStream('input.txt');
const ws = fs.createWriteStream('output.txt');
rs.pipe(ws);  // 读取 → 写入
```

---

## L2 实践层

### 流的类型

| 类型 | 说明 | 示例 |
|------|------|------|
| Readable | 可读流 | `fs.createReadStream` |
| Writable | 可写流 | `fs.createWriteStream` |
| Duplex | 双向流 | `net.Socket` |
| Transform | 转换流 | `zlib.createGzip` |

---

## 学习资源

- [Node.js stream 文档](https://nodejs.org/api/stream.html) ⭐ 官方权威
