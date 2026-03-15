# stream 流模块

> 处理大规模数据的模块

## 什么是 stream？

```
┌─────────────────────────────────────────────────────────────┐
│  stream = 数据流处理                                         │
│                                                             │
│  就像：                                                     │
│  - 水管：水流源源不断                                       │
│  - 传送带：物品一个接一个                                   │
│  - 视频播放：边下边播                                       │
│  - 呼吸：空气持续流入流出                                   │
│                                                             │
│  特点：                                                     │
│  - 不用一次性加载全部数据                                   │
│  - 边读边处理                                              │
│  - 内存占用小                                              │
│  - 适合大文件                                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5.1 流的概念

### 为什么需要流？

```javascript
// 不用流：一次性读取（内存压力大）
const fs = require('fs');
const data = fs.readFileSync('big-file.txt');  // 1GB 文件？
// 内存：1GB+

// 用流：分块读取（内存友好）
const fs = require('fs');
const stream = fs.createReadStream('big-file.txt');
// 内存：只有几 KB
```

### 流的类型

```
┌─────────────────────────────────────────────────────────────┐
│                    流的四种类型                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Readable（可读流）：                                        │
│  - 从数据源读取数据                                         │
│  - 例如：fs.createReadStream(), process.stdin               │
│                                                             │
│  Writable（可写流）：                                       │
│  - 向目标写入数据                                           │
│  - 例如：fs.createWriteStream(), process.stdout            │
│                                                             │
│  Duplex（双工流）：                                         │
│  - 既可读又可写                                             │
│  - 例如：net.Socket                                         │
│                                                             │
│  Transform（转换流）：                                     │
│  - 读取数据，转换后输出                                      │
│  - 例如：zlib.createGzip()                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5.2 读取流 (Readable)

### 从文件读取

```javascript
const fs = require('fs');

// 创建读取流
const readStream = fs.createReadStream('file.txt', {
    encoding: 'utf-8',     // 编码
    highWaterMark: 64 * 1024  // 64KB 一块
});

// 监听数据事件
readStream.on('data', (chunk) => {
    console.log('收到数据:', chunk.length, 'bytes');
});

// 监听结束事件
readStream.on('end', () => {
    console.log('读取完成');
});

// 监听错误事件
readStream.on('error', (err) => {
    console.error('错误:', err);
});
```

### 使用 pipe

```javascript
const fs = require('fs');

// 读取文件，复制到另一个文件
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('复制完成');
});
```

---

## 5.3 写入流 (Writable)

### 写入文件

```javascript
const fs = require('fs');

// 创建写入流
const writeStream = fs.createWriteStream('output.txt', {
    flags: 'a'  // 'w' 覆盖, 'a' 追加
});

// 写入数据
writeStream.write('第一行\n');
writeStream.write('第二行\n');

// 标记写入结束
writeStream.end('最后一行\n');

// 监听完成
writeStream.on('finish', () => {
    console.log('写入完成');
});

// 监听错误
writeStream.on('error', (err) => {
    console.error('错误:', err);
});
```

---

## 5.4 双工流和转换流

### Duplex 双工流

```javascript
const { Duplex } = require('stream');

const duplex = new Duplex({
    read(size) {
        // 读取时调用
        this.push('来自可读端的数据');
        this.push(null);  // 表示没有更多数据
    },
    write(chunk, encoding, callback) {
        // 写入时调用
        console.log('写入数据:', chunk.toString());
        callback();
    }
});

// 作为可读流使用
duplex.on('data', (chunk) => {
    console.log('读取:', chunk.toString());
});

// 作为可写流使用
duplex.write('写入数据到双工流');
```

### Transform 转换流

```javascript
const { Transform } = require('stream');

// 创建转换流：大写转换
const upperCase = new Transform({
    transform(chunk, encoding, callback) {
        const upper = chunk.toString().toUpperCase();
        callback(null, upper);
    }
});

// 使用
process.stdin.pipe(upperCase).pipe(process.stdout);
// 输入 hello → 输出 HELLO
```

---

## 5.5 实用示例

### 文件复制

```javascript
const fs = require('fs');

// 方式 1：pipe
function copyFilePipe(src, dest) {
    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(dest);

    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
        readStream.on('error', reject);
    });
}

// 方式 2：事件
function copyFileEvent(src, dest) {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(src);
        const writeStream = fs.createWriteStream(dest);

        readStream.on('data', (chunk) => {
            if (!writeStream.write(chunk)) {
                readStream.pause();
            }
        });

        writeStream.on('drain', () => {
            readStream.resume();
        });

        readStream.on('end', () => {
            writeStream.end();
            resolve();
        });

        readStream.on('error', reject);
        writeStream.on('error', reject);
    });
}

// 使用
copyFilePipe('big-file.txt', 'copy.txt')
    .then(() => console.log('复制完成'));
```

### 压缩文件

```javascript
const fs = require('fs');
const zlib = require('zlib');

// 压缩
fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('input.txt.gz'));

// 解压
fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('output.txt'));
```

### HTTP 文件下载

```javascript
const http = require('http');
const fs = require('fs');

http.get('http://example.com/file.zip', (res) => {
    const writeStream = fs.createWriteStream('file.zip');
    res.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('下载完成');
    });
});
```

---

## 5.6 backpressure 背压处理

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('big.txt');
const writeStream = fs.createWriteStream('copy.txt');

readStream.on('data', (chunk) => {
    // 写入返回 false 表示缓冲区满了
    const canContinue = writeStream.write(chunk);

    if (!canContinue) {
        // 暂停读取，等缓冲区清空
        readStream.pause();

        // 缓冲区清空后继续
        writeStream.on('drain', () => {
            readStream.resume();
        });
    }
});
```

---

## 5.7 常见问答

### Q1: pipe 和事件哪个好？

```javascript
// pipe：简单， 自动处理背压
readStream.pipe(writeStream);

// 事件：灵活， 需要手动处理
readStream.on('data', (chunk) => {
    writeStream.write(chunk);
});
```

### Q2: 什么时候用流？

```javascript
// 适合用流：
// - 大文件处理（视频、图片等）
// - 网络数据传输
// - 日志处理
// - 数据转换

// 不需要用流：
// - 小文件（几 KB）
// - 需要随机访问（seek）
```

---

## 5.8 学习资源

- [Node.js stream 官方文档](https://nodejs.org/api/stream.html)

---

**上一章：** [← events 事件模块](./04-events-事件模块.md)  
**下一章：** [→ buffer 缓冲模块](./06-buffer-缓冲模块.md)