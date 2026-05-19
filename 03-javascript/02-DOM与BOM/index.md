# JavaScript DOM 与 BOM ⭐⭐

> DOM 树操作、BOM 对象、事件处理、存储 API

---

## 学习目标

- 掌握 DOM 元素的查询、创建、修改和删除
- 理解事件冒泡、捕获和事件委托
- 掌握 BOM 核心对象（window、location、navigator、history）
- 学会使用 localStorage 和 sessionStorage

---

## 生活化比喻

**DOM 与 BOM 就像"房子的结构和物业"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  房子与物业                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│    DOM = 房子的内部结构                              │
│    ─────────────                                     │
│    墙壁、门窗、家具 → HTML 元素                     │
│    装修、搬家具 → 修改 DOM                          │
│    装感应灯 → 事件监听                              │
│                                                      │
│    BOM = 物业管理                                   │
│    ─────────────                                     │
│    window = 整个房子（全局对象）                    │
│    location = 房子的地址（URL）                    │
│    history = 你走过的路线记录                       │
│    navigator = 房子的基本信息（浏览器信息）          │
│    localStorage = 储物间（持久化存储）               │
│    sessionStorage = 临时抽屉（关闭就清空）          │
│                                                      │
│    事件 = 房子的智能系统                              │
│    ─────────────                                     │
│    门铃响了（click）→ 去开门                         │
│    有人进出（scroll）→ 开灯                          │
│    窗户开了（resize）→ 关空调                       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### DOM 查询与修改

**最简示例（1-3行）：**

```javascript
const el = document.querySelector('#myId');
el.textContent = '新内容';
el.classList.add('active');
```

**详细示例：**

```javascript
// 查询元素
const header = document.querySelector('#header');         // 单个
const items = document.querySelectorAll('.item');         // 多个
const firstInput = document.querySelector('form input');  // 组合选择器

// 修改内容
el.textContent = '纯文本';           // 安全
el.innerHTML = '<strong>HTML</strong>';  // 可解析标签

// 修改属性
el.setAttribute('href', '/new');
el.getAttribute('href');
el.removeAttribute('href');

// class 操作
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('active');
el.classList.contains('active');  // true/false

// 样式操作
el.style.color = 'red';
el.style.cssText = 'width:100px;height:200px;';  // 批量设置
```

---

### DOM 节点操作

**最简示例：**

```javascript
const div = document.createElement('div');
div.textContent = '新元素';
document.body.appendChild(div);
```

**详细示例：**

```javascript
// 创建元素
const card = document.createElement('article');
card.className = 'card';
card.innerHTML = `
    <h3 class="card-title">标题</h3>
    <p class="card-body">内容</p>
    <button class="card-btn">删除</button>
`;

// 插入
document.body.appendChild(card);               // 末尾
parent.insertBefore(card, parent.firstChild);  // 开头
parent.append(card);                           // 末尾（可多个）
card.before(newEl);                            // 前面
card.after(newEl);                             // 后面

// 删除
card.remove();

// 遍历子元素
parent.children.forEach(child => console.log(child));
parent.querySelectorAll('.child').forEach(el => { });
```

---

### 事件处理

**最简示例：**

```javascript
btn.addEventListener('click', () => console.log('点击了'));
form.addEventListener('submit', (e) => { e.preventDefault(); handleSubmit(); });
```

**详细示例：**

```javascript
// 基本事件
const btn = document.querySelector('#btn');
btn.addEventListener('click', (e) => {
    console.log('点击了', e.target);
});

// 常用事件
input.addEventListener('input', (e) => console.log(e.target.value));
form.addEventListener('submit', (e) => { e.preventDefault(); });
window.addEventListener('scroll', () => { });
window.addEventListener('resize', () => { });

// 事件对象
el.addEventListener('click', (e) => {
    e.target;              // 实际点击的元素
    e.currentTarget;       // 绑定事件的元素
    e.preventDefault();    // 阻止默认行为
    e.stopPropagation();   // 阻止冒泡
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

### BOM 核心对象

**最简示例：**

```javascript
window.innerWidth;           // 视口宽度
location.href = '/new';      // 跳转
localStorage.setItem('k', 'v');
history.back();
```

**详细示例：**

```javascript
// window — 全局对象
window.innerWidth;           // 视口宽度
window.innerHeight;          // 视口高度
window.scrollX;              // 水平滚动距离
window.scrollY;              // 垂直滚动距离
window.scrollTo(0, 500);     // 滚动到位置
window.open('https://...');  // 打开新窗口
window.close();              // 关闭窗口

// location — URL 信息
location.href;               // 完整 URL
location.origin;             // 协议+域名+端口
location.pathname;           // 路径
location.search;             // 查询参数 ?key=value
location.hash;               // 锚点 #section
location.assign('/new');     // 跳转
location.replace('/new');    // 跳转（不留历史记录）
location.reload();           // 刷新

// navigator — 浏览器信息
navigator.userAgent;         // 用户代理
navigator.language;          // 语言 zh-CN
navigator.onLine;            // 是否在线
navigator.clipboard.writeText('复制内容');  // 剪贴板

// history — 历史记录
history.back();              // 后退
history.forward();           // 前进
history.go(-1);              // 后退一步
history.pushState({}, '', '/new');    // 添加记录（不刷新）
history.replaceState({}, '', '/new'); // 替换记录（不刷新）
```

---

## L2 实践层：用好

### 存储 API

```javascript
// localStorage — 持久化存储（关闭浏览器不丢失）
localStorage.setItem('user', JSON.stringify({ name: '张三' }));
const user = JSON.parse(localStorage.getItem('user'));
localStorage.removeItem('user');
localStorage.clear();

// sessionStorage — 会话存储（关闭标签页丢失）
sessionStorage.setItem('temp', 'data');
sessionStorage.getItem('temp');

// 存储大小限制：一般 5MB
```

### 反模式：不要这样做

```javascript
// ❌ 错误：用 innerHTML 插入用户输入（XSS 风险）
el.innerHTML = userInput;

// ✅ 正确：用 textContent
el.textContent = userInput;
```

```javascript
// ❌ 错误：在循环中逐个操作 DOM（100 次重排）
for (let i = 0; i < 100; i++) {
    document.body.appendChild(document.createElement('div'));
}

// ✅ 正确：用 DocumentFragment（1 次重排）
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    fragment.appendChild(document.createElement('div'));
}
document.body.appendChild(fragment);
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

### DOM vs BOM 操作速查

| 对象 | 用途 | 常用 API |
|------|------|---------|
| `document` | DOM 操作 | querySelector, createElement |
| `window` | 浏览器窗口 | innerWidth, scrollTo, open |
| `location` | URL 管理 | href, assign, reload |
| `navigator` | 浏览器信息 | userAgent, clipboard |
| `history` | 路由历史 | pushState, back, go |
| `localStorage` | 持久存储 | setItem, getItem, removeItem |
| `sessionStorage` | 会话存储 | setItem, getItem, clear |

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
// ❌ 错误：逐个修改样式（多次重排）
el.style.width = '100px';
el.style.height = '200px';
el.style.margin = '10px';

// ✅ 正确：一次性设置
el.className = 'new-style';  // 一次重排
el.style.cssText = 'width:100px;height:200px;margin:10px;';
```

### 性能考量

| 操作 | 性能影响 | 说明 |
|------|---------|------|
| `getElementById` | 极低 | 哈希表直接查找 |
| `querySelector` | 低 | 现代引擎高度优化 |
| 批量 DOM 操作 | 高 | 用 DocumentFragment 优化 |
| 事件委托 | 极低 | 只绑定一个监听器 |
| `localStorage` | 低 | 同步 API，大数据会阻塞 |

### 知识关联

```
DOM 与 BOM 关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  DOM 操作   │────→│  事件处理   │────→│  BOM 对象   │
│  查询/      │     │  冒泡/      │     │  location/  │
│  创建/      │     │  委托/      │     │  history/   │
│  修改       │     │  性能       │     │  storage    │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **DOM** | 文档对象模型，网页的结构化表示 | `document.querySelector('h1')` |
| **BOM** | 浏览器对象模型，浏览器窗口相关 API | `window.location` |
| **事件冒泡** | 事件从目标元素向上传播到根 | 点击子元素也会触发父元素的 click |
| **事件委托** | 在父元素上监听，通过 e.target 判断来源 | 减少监听器数量 |
| **重排** | 浏览器重新计算元素位置和大小 | 修改 width/height 触发 |
| **重绘** | 浏览器重新绘制元素外观 | 修改 color/background 触发 |
| **localStorage** | 持久化键值存储（5MB） | `localStorage.setItem('k', 'v')` |
| **sessionStorage** | 会话级键值存储 | `sessionStorage.getItem('k')` |

---

## 实践练习

### 练习：完整 Todo 列表

```javascript
// HTML: <input id="input"><button id="add">添加</button><ul id="list"></ul>

const input = document.querySelector('#input');
const addBtn = document.querySelector('#add');
const list = document.querySelector('#list');

// 从 localStorage 加载
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
todos.forEach(t => addTodo(t.text, t.done));

// 添加任务
function addTodo(text, done = false) {
    const li = document.createElement('li');
    li.className = `todo-item ${done ? 'done' : ''}`;
    li.innerHTML = `
        <input type="checkbox" ${done ? 'checked' : ''}>
        <span class="text">${escapeHtml(text)}</span>
        <button class="delete">×</button>
    `;
    list.appendChild(li);

    todos.push({ text, done });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) { addTodo(text); input.value = ''; }
});

// 事件委托
list.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const idx = [...list.children].indexOf(li);

    if (e.target.matches('.delete')) {
        li.remove();
        todos.splice(idx, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    if (e.target.matches('[type="checkbox"]')) {
        li.classList.toggle('done');
        todos[idx].done = !todos[idx].done;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
```

---

## 常见问题

### Q1：querySelector 和 getElementById 有什么区别？

**getElementById 只能用 ID 但最快；querySelector 支持任意 CSS 选择器，日常开发推荐用 querySelector。**

### Q2：innerHTML 和 textContent 有什么区别？

```javascript
el.innerHTML = '<strong>粗体</strong>';  // 解析 HTML
el.textContent = '<strong>粗体</strong>'; // 纯文本
```
**插入用户输入时一定用 textContent，防止 XSS 攻击。**

### Q3：localStorage 和 sessionStorage 有什么区别？

| 特性 | localStorage | sessionStorage |
|------|-------------|----------------|
| 持久化 | ✅ 关闭浏览器不丢失 | ❌ 关闭标签页丢失 |
| 大小 | 5MB | 5MB |
| 跨标签页 | ✅ 共享 | ❌ 独立 |

### Q4：什么是事件委托？为什么推荐用？

**在父元素上绑定一个事件监听器，通过 e.target 判断实际点击的子元素。优点：只需一个监听器、自动处理动态新增的元素、内存占用更少。**

---

## 学习资源

- [MDN - DOM 操作](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents) ⭐ 官方权威
- [MDN - BOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)
- [JavaScript.info - DOM](https://zh.javascript.info/document)
