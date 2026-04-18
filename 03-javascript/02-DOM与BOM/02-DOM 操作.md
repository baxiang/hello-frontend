# JavaScript DOM 操作 ⭐⭐

> DOM 树、元素选择与遍历、事件处理、表单操作

---

## 学习目标

- 理解 DOM 树结构和 document 对象
- 掌握元素选择方法（getElementById、querySelector、querySelectorAll）
- 学会修改元素内容、属性和样式
- 精通事件处理机制（addEventListener、事件冒泡与捕获）
- 掌握 DOM 节点的创建、插入和删除

---

## 生活化比喻

**DOM 操作就像"装修房子"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  装修房子                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    DOM 树 = 房子的结构图                              │
│    ─────────────                                     │
│    根是地基(document) → 框架(html) → 房间(body)      │
│    每个元素都是房子的一部分                           │
│                                                      │
│    选择元素 = 找到要装修的位置                        │
│    ─────────────                                     │
│    querySelector('#客厅') → 找到客厅                  │
│    querySelectorAll('.灯') → 找到所有的灯            │
│                                                      │
│    修改内容 = 换家具/刷漆                            │
│    ─────────────                                     │
│    element.textContent = '新内容' → 换家具           │
│    element.style.color = 'red' → 刷漆               │
│                                                      │
│    创建/删除元素 = 加盖/拆除房间                      │
│    ─────────────                                     │
│    document.createElement('div') → 造新房间           │
│    parent.appendChild(child) → 安装到房子里           │
│    element.remove() → 拆除                            │
│                                                      │
│    事件监听 = 安装感应器                              │
│    ─────────────                                     │
│    点击按钮 → 灯亮                                    │
│    鼠标悬停 → 警报响                                  │
│    输入文字 → 实时搜索                                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### DOM 基础

**语法结构图：**

```
DOM 树结构：

document (文档根)
└── <html>
    ├── <head>
    │   ├── <title>标题</title>
    │   └── <meta charset="UTF-8">
    └── <body>
        ├── <h1>大标题</h1>
        ├── <p>段落</p>
        └── <div>
            └── <span>文字</span>

入口：
document.body        → <body> 元素
document.head        → <head> 元素
document.title       → 页面标题（可读可写）
```

**最简示例（1-3行）：**

```javascript
document.title = '新标题';
document.body.style.background = '#f5f5f5';
```

**详细示例：**

```javascript
// document 对象
console.log(document.URL);       // 当前网址
console.log.document.domain);    // 域名

// 常用快捷入口
const body = document.body;
const head = document.head;
const html = document.documentElement;
```

---

### 元素选择

**语法结构图：**

```
选择元素：

单个元素（返回第一个匹配的）:
  document.getElementById('id')       → 通过 ID
  document.querySelector('.class')    → CSS 选择器（推荐）

多个元素（返回所有匹配的）:
  document.querySelectorAll('.class') → CSS 选择器（推荐，返回 NodeList）
  document.getElementsByTagName('div') → 通过标签名
  document.getElementsByClassName('c') → 通过类名

推荐：优先用 querySelector / querySelectorAll
```

**最简示例：**

```javascript
const el = document.querySelector('#myId');
const all = document.querySelectorAll('.item');
```

**详细示例：**

```javascript
// 单个元素
const header = document.querySelector('#header');
const firstBtn = document.querySelector('.btn');
const firstDiv = document.querySelector('div');

// 多个元素 — NodeList（可用 forEach）
const items = document.querySelectorAll('.item');
items.forEach((item, index) => console.log(index, item));

// 在指定元素内选择
const container = document.querySelector('#container');
const btns = container.querySelectorAll('.btn');

// CSS 选择器组合
document.querySelector('ul li:first-child');
document.querySelectorAll('[data-role="admin"]');
```

---

### 修改内容和属性

**最简示例：**

```javascript
el.textContent = '新文字';
el.innerHTML = '<strong>HTML</strong>';
el.setAttribute('href', '/new');
```

**详细示例：**

```javascript
const el = document.querySelector('#box');

// 内容
el.textContent = '纯文本';           // 安全，自动转义
el.innerHTML = '<em>HTML</em>';     // 可解析 HTML（注意 XSS）

// 属性
el.setAttribute('href', '/new');
el.getAttribute('href');            // '/new'
el.removeAttribute('href');

// 简写属性（常用）
el.id = 'newId';
el.className = 'newClass';
el.src = '/image.jpg';

// classList（推荐）
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('active');
el.classList.contains('active');    // true/false
```

---

### 事件处理

**语法结构图：**

```
事件监听：

element.addEventListener('事件名', 回调函数);

常用事件：
click       → 点击
input       → 输入内容变化
submit      → 表单提交
keydown     → 键盘按下
mouseover   → 鼠标移入
scroll      → 滚动

事件对象：
element.addEventListener('click', (e) => {
    e.target        → 实际点击的元素
    e.currentTarget → 绑定事件的元素
    e.preventDefault()  → 阻止默认行为
    e.stopPropagation() → 阻止冒泡
});
```

**最简示例：**

```javascript
btn.addEventListener('click', () => console.log('点击了'));
input.addEventListener('input', (e) => console.log(e.target.value));
```

**详细示例：**

```javascript
// 基本事件
const btn = document.querySelector('#btn');
btn.addEventListener('click', (e) => {
    console.log('按钮被点击', e.target);
});

// 阻止默认行为
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();  // 阻止表单提交
    // 自定义处理
});

// 事件委托（推荐）
document.querySelector('#list').addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (item) console.log('点击了:', item.textContent);
});

// 移除事件
const handler = () => console.log('clicked');
btn.addEventListener('click', handler);
btn.removeEventListener('click', handler);
```

---

## L2 实践层：用好

### 元素操作速查

| 操作 | 方法 | 示例 |
|------|------|------|
| 创建元素 | `document.createElement('div')` | 动态生成 DOM |
| 插入末尾 | `parent.appendChild(child)` | 添加子元素 |
| 插入指定位置 | `parent.insertBefore(new, ref)` | 在参考元素前插入 |
| 删除元素 | `element.remove()` | 移除自身 |
| 替换元素 | `parent.replaceChild(new, old)` | 替换子元素 |
| 修改样式 | `el.style.property = value` | 直接设置行内样式 |
| 读取样式 | `getComputedStyle(el).property` | 读取最终样式 |

### 反模式：不要这样做

```javascript
// ❌ 错误：用 innerHTML 插入用户输入（XSS 风险）
el.innerHTML = userInput;

// ✅ 正确：用 textContent
el.textContent = userInput;
```

```javascript
// ❌ 错误：在循环中直接操作 DOM（性能差）
for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    document.body.appendChild(div);  // 100 次重排
}

// ✅ 正确：用 DocumentFragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const div = document.createElement('div');
    fragment.appendChild(div);
}
document.body.appendChild(fragment);  // 1 次重排
```

```javascript
// ❌ 错误：给每个子元素单独绑定事件
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', handleClick);
});

// ✅ 正确：事件委托
document.querySelector('#list').addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (item) handleClick(e);
});
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 选择单个元素 | `querySelector` | 支持任意 CSS 选择器 |
| 选择多个元素 | `querySelectorAll` | 返回 NodeList，可用 forEach |
| 修改文字 | `textContent` | 安全，自动转义 |
| 修改 HTML | `innerHTML` | 可解析标签，注意 XSS |
| 切换样式 | `classList.toggle()` | 语义清晰 |
| 动态创建 | `createElement` + `appendChild` | 标准 API |
| 批量插入 | `DocumentFragment` | 减少重排次数 |
| 列表事件 | 事件委托 | 性能好，自动处理新增元素 |

---

## L3 专家层：深入

### 事件流原理

```
事件传播三阶段：

        捕获阶段          目标阶段         冒泡阶段
        ↓                                ↑
      document                          ↑
        ↓                               ↑
        html                           ↑
        ↓                              ↑
        body                          ↑
        ↓                             ↑
      parent                         ↑
        ↓                            ↑
      target ←─────────────────────┘
        （实际点击的元素）

1. 捕获阶段：从 document 向下到 target
2. 目标阶段：在 target 上触发
3. 冒泡阶段：从 target 向上回到 document

默认监听在冒泡阶段：
  el.addEventListener('click', handler);

捕获阶段监听：
  el.addEventListener('click', handler, true);
```

```javascript
// 阻止冒泡
child.addEventListener('click', (e) => {
    e.stopPropagation();  // 不会触发 parent 的 click
});

// 阻止默认行为
a.addEventListener('click', (e) => {
    e.preventDefault();  // 不跳转
});
```

### 性能考量

| 操作 | 性能影响 | 说明 |
|------|---------|------|
| `querySelector` | 低 | 现代引擎高度优化 |
| `getElementById` | 极低 | 最快（直接用哈希表） |
| `innerHTML` 写入 | 中等 | 需要解析 HTML |
| `textContent` 写入 | 低 | 直接设置文本 |
| 修改 style | 中等 | 可能触发重排/重绘 |
| `appendChild` | 中等 | 每次调用触发重排 |
| `DocumentFragment` | 低 | 批量插入，一次重排 |
| 事件委托 | 极低 | 只绑定一个监听器 |

### 重排（Reflow）vs 重绘（Repaint）

```
渲染管线：

DOM 变更 → 重排（重新计算布局）→ 重绘（重新绘制）→ 合成

触发重排的操作（高开销）：
- 修改几何属性（width, height, margin, padding）
- 修改字体大小
- 添加/删除 DOM 节点

只触发重绘的操作（中等开销）：
- 修改颜色、背景
- 修改 visibility

不触发重排/重绘的操作（低开销）：
- transform
- opacity
```

```javascript
// ❌ 错误：批量修改样式时逐个设置
el.style.width = '100px';   // 重排
el.style.height = '200px';  // 重排
el.style.margin = '10px';   // 重排

// ✅ 正确：一次性设置（用 class 或 cssText）
el.className = 'new-style';  // 一次重排
// 或
el.style.cssText = 'width:100px;height:200px;margin:10px;';
```

### 知识关联

```
DOM 操作关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  DOM 树     │────→│  元素选择   │────→│  内容修改   │
│  结构理解   │     │  querySelector│   │  textContent│
│             │     │             │     │  classList  │
└─────────────┘     └─────────────┘     └─────────────┘
                                              │
                                 ┌────────────┼────────────┐
                                 ↓            ↓            ↓
                           ┌──────────┐ ┌──────────┐ ┌──────────┐
                           │ 节点操作 │ │ 事件处理 │ │ 性能优化 │
                           │ 创建/    │ │ 冒泡/    │ │ 重排/    │
                           │ 插入/删除│ │ 委托     │ │ 重绘     │
                           └──────────┘ └──────────┘ └──────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **DOM** | 文档对象模型，网页的结构化表示 | `document.querySelector('h1')` |
| **节点** | DOM 树中的每个部分（元素、文本、注释等） | `<div>` 是元素节点 |
| **元素** | HTML 标签对应的 DOM 节点 | `document.body` |
| **querySelector** | 通过 CSS 选择器查找第一个匹配元素 | `document.querySelector('.btn')` |
| **querySelectorAll** | 通过 CSS 选择器查找所有匹配元素 | `document.querySelectorAll('li')` |
| **事件监听** | 注册函数在特定用户行为时执行 | `el.addEventListener('click', fn)` |
| **事件冒泡** | 事件从目标元素向上传播到根 | 点击子元素也会触发父元素的 click |
| **事件委托** | 在父元素上监听，通过 e.target 判断来源 | 减少监听器数量 |
| **重排（Reflow）** | 浏览器重新计算元素位置和大小 | 修改 width/height 触发 |
| **重绘（Repaint）** | 浏览器重新绘制元素外观 | 修改 color/background 触发 |
| **DocumentFragment** | 轻量级文档容器，批量插入时减少重排 | `fragment.appendChild(el)` |
| **textContent** | 元素的纯文本内容（安全） | `el.textContent = 'text'` |

---

## 实践练习

### 练习：Todo 列表 DOM 操作

```javascript
// HTML: <input id="input"><button id="add">添加</button><ul id="list"></ul>

const input = document.querySelector('#input');
const addBtn = document.querySelector('#add');
const list = document.querySelector('#list');

// 添加任务
function addTodo(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span class="text">${text}</span>
        <button class="delete">删除</button>
    `;
    list.appendChild(li);
}

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) { addTodo(text); input.value = ''; }
});

// 事件委托：处理删除和切换完成
list.addEventListener('click', (e) => {
    // 删除
    if (e.target.matches('.delete')) {
        e.target.closest('.todo-item').remove();
    }
    // 切换完成
    if (e.target.matches('.text')) {
        e.target.closest('.todo-item').classList.toggle('completed');
    }
});
```

---

## 常见问题

### Q1：querySelector 和 getElementById 有什么区别？

```javascript
// getElementById — 只能用 ID，最快
const el = document.getElementById('myId');

// querySelector — 支持任意 CSS 选择器，稍慢但灵活
const el = document.querySelector('#myId');
const el = document.querySelector('.my-class');
const el = document.querySelector('div > p:first-child');
```
**日常开发推荐用 querySelector，性能差异可忽略。**

### Q2：innerHTML 和 textContent 有什么区别？

```javascript
el.innerHTML = '<strong>粗体</strong>';  // 解析 HTML，显示粗体
el.textContent = '<strong>粗体</strong>'; // 纯文本，显示标签原文
```
**插入用户输入时一定用 textContent，防止 XSS 攻击。**

### Q3：什么是事件委托？为什么推荐用？

```javascript
// ❌ 给每个按钮单独绑定
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', handleClick);
});

// ✅ 在父元素上委托
document.querySelector('#container').addEventListener('click', (e) => {
    if (e.target.matches('.btn')) handleClick(e);
});
```
**优点：只需一个监听器、自动处理动态新增的元素、内存占用更少。**

---

## 学习资源

- [MDN - DOM 操作](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents) ⭐ 官方权威
- [MDN - 事件](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events)
- [JavaScript.info - DOM](https://zh.javascript.info/document)
