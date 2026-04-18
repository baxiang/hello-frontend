# buffer 缓冲模块

> 处理二进制数据

---

## L1 理解层

**最简示例（1-3行）：**

```javascript
const buf = Buffer.from('Hello');
buf.toString();           // 'Hello'
buf[0];                   // 72
```

**详细示例：**

```javascript
// 创建
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.alloc(10);        // 分配 10 字节
const buf3 = Buffer.from([1, 2, 3]);  // 从数组

// 读写
buf1.toString('utf-8');    // 'Hello'
buf1.toString('hex');      // '48656c6c6f'
buf1.toString('base64');   // 'SGVsbG8='

// 拼接
Buffer.concat([buf1, buf2]).toString();

// 比较
Buffer.compare(buf1, buf2);  // -1, 0, 1
```

---

## 学习资源

- [Node.js buffer 文档](https://nodejs.org/api/buffer.html) ⭐ 官方权威
