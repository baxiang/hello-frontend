# buffer 缓冲模块

> 处理二进制数据

## 什么是 buffer？

```
┌─────────────────────────────────────────────────────────────┐
│  buffer = 二进制数据容器                                     │
│                                                             │
│  就像：                                                     │
│  - 集装箱：装各种货物                                       │
│  - 仓库：临时存储物品                                       │
│  - 碗：装食物的容器                                         │
│                                                             │
│  用途：                                                     │
│  - 处理二进制数据                                           │
│  - 读取文件（尤其是图片、音频等）                           │
│  - 网络传输                                                 │
│  - 加密解密                                                 │
│                                                             │
│  特点：                                                     │
│  - 固定大小                                                 │
│  - 分配在堆外内存                                           │
│  - 效率高                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 6.1 创建 Buffer

### 方式一：alloc

```javascript
// 创建指定大小的 Buffer
const buf1 = Buffer.alloc(10);  // 10 字节，初始值为 0
console.log(buf1);  // <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建并填充
const buf2 = Buffer.alloc(10, 1);  // 填充 1
console.log(buf2);  // <Buffer 01 01 01 01 01 01 01 01 01 01>
```

### 方式二：from

```javascript
// 从字符串创建
const buf1 = Buffer.from('Hello');
console.log(buf1);  // <Buffer 48 65 6c 6c 6f>
console.log(buf1.toString());  // Hello

// 从数组创建
const buf2 = Buffer.from([72, 101, 108, 108, 111]);
console.log(buf2.toString());  // Hello

// 从另一个 Buffer 创建
const buf3 = Buffer.from(buf1);
```

---

## 6.2 Buffer 操作

### 写入数据

```javascript
const buf = Buffer.alloc(10);

// 写入字符串
buf.write('Hello', 0);  // 从偏移量 0 开始
console.log(buf.toString());  // Hello

// 写入指定位置
buf.write('World', 5, 5);  // 从偏移量 5 开始，写入 5 个字符
console.log(buf.toString());  // HelloWorld
```

### 读取数据

```javascript
const buf = Buffer.from('Hello World');

// 读取字节
console.log(buf[0]);  // 72 (H 的 ASCII)

// 读取字符串
console.log(buf.toString('utf-8', 0, 5));  // Hello

// 转为数组
const arr = Array.from(buf);
// 或
const arr2 = [...buf];
```

### 转换编码

```javascript
const buf = Buffer.from('你好');

// UTF-8
console.log(buf.toString('utf-8'));

// Base64
console.log(buf.toString('base64'));

// Hex
console.log(buf.toString('hex'));

// 从 Base64 还原
const buf2 = Buffer.from('5L2g5aW9', 'base64');
console.log(buf2.toString());
```

---

## 6.3 Buffer 常用方法

### length

```javascript
const buf = Buffer.from('Hello');
console.log(buf.length);  // 5
```

### slice

```javascript
const buf = Buffer.from('Hello World');

// 截取
const sub = buf.slice(0, 5);
console.log(sub.toString());  // Hello
```

### copy

```javascript
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.alloc(10);

// 复制
buf1.copy(buf2, 0, 0, 5);  // 从 buf2 的 0 位置开始，复制 buf1 的 0-5
console.log(buf2.toString());  // Hello
```

### concat

```javascript
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from(' World');

// 合并
const buf3 = Buffer.concat([buf1, buf2]);
console.log(buf3.toString());  // Hello World
```

### indexOf

```javascript
const buf = Buffer.from('Hello World');

// 查找
console.log(buf.indexOf('World'));  // 6
console.log(buf.indexOf('l'));      // 2
console.log(buf.indexOf('x'));      // -1 (没找到)
```

---

## 6.4 实际应用

### 处理文件二进制

```javascript
const fs = require('fs');

// 读取图片
const imageBuffer = fs.readFileSync('photo.png');
console.log('图片大小:', imageBuffer.length, 'bytes');

// 读取并转为 Base64
const base64 = imageBuffer.toString('base64');
console.log('Base64:', base64);

// 写入
fs.writeFileSync('photo_copy.png', imageBuffer);
```

### 处理网络数据

```javascript
const http = require('http');

http.get('http://example.com/api', (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
        chunks.push(chunk);
    });

    res.on('end', () => {
        // 合并 Buffer
        const buffer = Buffer.concat(chunks);
        console.log('数据:', buffer.toString());
    });
});
```

---

## 6.5 常见问答

### Q1: Buffer 和字符串区别？

```javascript
// 字符串：Unicode 编码，适合文本处理
const str = '你好';
console.log(str.length);  // 2

// Buffer：二进制，适合底层数据
const buf = Buffer.from('你好');
console.log(buf.length);  // 6 (UTF-8 每个汉字 3 字节)
```

### Q2: 为什么用 Buffer？

```javascript
// 网络传输和文件操作需要二进制
// Buffer 提供了高效的二进制处理

// 不用 Buffer：
// 读取 1GB 文件 → 内存占用 1GB

// 用 Buffer：
// 读取 1GB 文件 → 分块处理，内存占用小
```

---

## 6.6 学习资源

- [Node.js buffer 官方文档](https://nodejs.org/api/buffer.html)

---

**上一章：** [← stream 流模块](./05-stream-流模块.md)  
**下一章：** [→ crypto 加密模块](./07-crypto-加密模块.md)