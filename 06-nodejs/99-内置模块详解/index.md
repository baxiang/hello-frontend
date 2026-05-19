# Node.js 内置模块详解

> 全面介绍 Node.js 自带的核心内置模块

## 什么是内置模块？

```
┌─────────────────────────────────────────────────────────────┐
│  内置模块 = Node.js 安装时自带的模块                         │
│                                                             │
│  特点：                                                     │
│  - 无需安装，直接 require 即可使用                          │
│  - 用 C++ 编写，性能高                                      │
│  - 稳定可靠，版本兼容性好                                   │
│                                                             │
│  就像：                                                     │
│  - 手机的系统应用：出厂自带                                 │
│  - 汽车的标配：空调、音响                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 模块一览

| 模块 | 用途 | 章节 |
|------|------|------|
| http / https | 创建 Web 服务器 | [01-http 模块](./01-http-https-模块.md) |
| fs | 文件系统操作 | [02-fs-文件模块.md](./02-fs-文件模块.md) |
| path | 路径处理 | [03-path-路径模块.md](./03-path-路径模块.md) |
| events | 事件处理 | [04-events-事件模块.md](./04-events-事件模块.md) |
| stream | 流处理 | [05-stream-流模块.md](./05-stream-流模块.md) |
| buffer | 二进制数据 | [06-buffer-缓冲模块.md](./06-buffer-缓冲模块.md) |
| crypto | 加密解密 | [07-crypto-加密模块.md](./07-crypto-加密模块.md) |
| util | 工具函数 | [08-util-工具模块.md](./08-util-工具模块.md) |
| os | 操作系统 | [09-os-系统模块.md](./09-os-系统模块.md) |
| querystring | URL 查询字符串 | [10-querystring-查询字符串模块.md](./10-querystring-查询字符串模块.md) |
| url | URL 解析 | [11-url-URL模块.md](./11-url-URL模块.md) |
| net | 网络 TCP | [12-net-网络模块.md](./12-net-网络模块.md) |
| dns | DNS 域名解析 | [13-dns-域名模块.md](./13-dns-域名模块.md) |
| zlib | 数据压缩 | [14-zlib-压缩模块.md](./14-zlib-压缩模块.md) |
| cluster | 多进程 | [15-cluster-集群模块.md](./15-cluster-集群模块.md) |
| child_process | 子进程 | [16-child_process-子进程模块.md](./16-child_process-子进程模块.md) |
| readline | 逐行读取 | [17-readline-逐行读取模块.md](./17-readline-逐行读取模块.md) |
| timers | 定时器 | [18-timers-定时器模块.md](./18-timers-定时器模块.md) |
| console | 控制台 | [19-console-控制台模块.md](./19-console-控制台模块.md) |
| global | 全局对象 | [20-global-全局对象.md](./20-global-全局对象.md) |

## 如何使用

```javascript
// 加载内置模块
const http = require('http');
const fs = require('fs');
const path = require('path');
const events = require('events');
const os = require('os');

// 使用模块功能
// ...
```

## 学习建议

```
┌─────────────────────────────────────────────────────────────┐
│  学习路径：                                                  │
│                                                             │
│  第一阶段（必备）：                                          │
│  1. http - 创建 Web 服务                                   │
│  2. fs   - 文件操作                                         │
│  3. path - 路径处理                                         │
│  4. events - 事件机制                                       │
│                                                             │
│  第二阶段（进阶）：                                          │
│  5. stream - 流处理                                         │
│  6. buffer - 二进制                                         │
│  7. crypto - 加密                                           │
│  8. util   - 工具                                          │
│                                                             │
│  第三阶段（高级）：                                          │
│  9. cluster - 多进程                                        │
│  10. child_process - 子进程                                │
│  11. net/dns - 网络                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

**下一章：** [→ 01-http 模块](./01-http-https-模块.md)