# JavaScript DOM 操作

> 用生活中的例子理解 DOM 操作，让网页"动"起来

## 本章学习目标

- 理解 DOM 树的结构
- 掌握元素选择和遍历方法
- 学会修改元素内容和属性
- 精通事件处理机制
- 能够操作表单和创建动画

---

## 2.1 DOM 基础 - 什么是 DOM？

### 什么是 DOM？

**DOM（Document Object Model）文档对象模型**，简单说就是**网页的"骨架图"**。

```
生活例子：
想象你家的族谱：
- 祖先 → 父母 → 子女 → 孙子

DOM 树也一样：
- document（根）→ html → body → div → p → 文字
```

### DOM 树结构

```
document (文档)
└── <html> (根元素)
    ├── <head> (头部)
    │   ├── <title>页面标题</title>
    │   └── <meta charset="UTF-8">
    └── <body> (身体)
        ├── <div>
        │   ├── <h1>大标题</h1>
        │   └── <p>段落内容</p>
        └── <footer>页脚</footer>
```

**每个节点都是树的一部分，可以访问和修改。**

### document 对象 - DOM 的入口

```javascript
// document 就像"管家"，管理整个网页

// 获取重要元素
document.documentElement    // <html> 元素
document.head               // <head> 元素
document.body               // <body> 元素（最常用）

// 获取页面信息
document.title              // 页面标题（可修改）
document.URL                // 完整网址
document.domain             // 域名
document.cookie             // Cookie

// 修改标题
document.title = '新标题';  // 浏览器标签页标题会变化
```

---

## 2.2 元素选择 - 找到要操作的元素

### 为什么要选择元素？

**就像你要修改房间里的东西，得先找到它。**

```
生活例子：
- 你想换灯泡 → 先找到灯
- 你想画画 → 先找到画布
- 你想改网页 → 先找到元素
```

### 获取单个元素

```javascript
// 1. 通过 ID 选择（最精确）
// HTML: <div id="myDiv">内容</div>
const div = document.getElementById('myDiv');

// 2. 通过 CSS 选择器（最常用）
// HTML: <p class="text">内容</p>
const p = document.querySelector('.text');
const div2 = document.querySelector('#myDiv');
const first = document.querySelector('div');  // 第一个 div

// 3. 通过 name 属性（表单常用）
// HTML: <input name="username">
const input = document.getElementsByName('username')[0];
```

### 获取多个元素

```javascript
// 1. 通过 CSS 选择器（推荐）
// HTML: <ul><li>1</li><li>2</li><li>3</li></ul>
const items = document.querySelectorAll('li');
// 返回 NodeList，可以用 forEach
items.forEach(item => console.log(item));

// 2. 通过标签名
const divs = document.getElementsByTagName('div');
// 返回 HTMLCollection（类似数组）

// 3. 通过类名
const elements = document.getElementsByClassName('my-class');
```

### 选择器速查

```javascript
// CSS 选择器语法
document.querySelector('p')           // 标签选择器
document.querySelector('.class')      // 类选择器
document.querySelector('#id')         // ID 选择器
document.querySelector('[data-x]')    // 属性选择器
document.querySelector('div p')       // 后代选择器
document.querySelector('div > p')     // 子元素选择器
document.querySelector('div + p')     // 相邻兄弟
document.querySelector('div ~ p')     // 所有兄弟
document.querySelector('p:first-child')   // 第一个
document.querySelector('p:last-child')    // 最后一个
document.querySelector('p:nth-child(2)')  // 第 n 个
```

---

## 2.3 元素遍历 - 在 DOM 树中移动

### 父子兄弟关系

```
想象家族关系：
        爷爷 (parentNode)
         |
    ┌────┴────┐
    父 (this)  叔叔 (nextSibling)
    |
    子 (childNodes)
```

### 节点关系属性

```javascript
// HTML: <div><p id="target"><span>内容</span></p></div>
const target = document.getElementById('target');

// 父节点
target.parentNode       // <div>
target.parentElement    // <div>（更常用，确保是元素）

// 子节点
target.childNodes       // 所有子节点（包括文本、空格）
target.children         // 只包含元素子节点
target.firstElementChild // 第一个元素子节点
target.lastElementChild  // 最后一个元素子节点

// 兄弟节点
target.previousSibling     // 前一个节点
target.previousElementSibling  // 前一个元素兄弟
target.nextSibling           // 后一个节点
target.nextElementSibling    // 后一个元素兄弟
```

### 实际应用

```javascript
// 场景：点击列表项，高亮显示
const list = document.querySelector('ul');
list.addEventListener('click', (e) => {
    // 找到点击的 li
    const li = e.target.closest('li');
    
    // 移除其他 li 的高亮
    li.parentElement.children.forEach(item => {
        item.classList.remove('active');
    });
    
    // 添加当前 li 高亮
    li.classList.add('active');
});
```

---

## 2.4 修改元素内容 - 让内容变化

### 修改文本内容

```javascript
// HTML: <p id="text">原文本</p>
const p = document.getElementById('text');

// 1. textContent - 获取/设置纯文本
p.textContent = '新文本';
console.log(p.textContent);  // '新文本'

// 2. innerText - 类似，但受 CSS 影响
p.innerText = '可见文本';

// 区别：
// textContent 获取所有文本（包括隐藏的）
// innerText 只获取可见文本
```

### 修改 HTML 内容

```javascript
// HTML: <div id="box"><p>原有内容</p></div>
const box = document.getElementById('box');

// innerHTML - 获取/设置 HTML
console.log(box.innerHTML);  // '<p>原有内容</p>'
box.innerHTML = '<p>新内容</p><span>额外内容</span>';

// ⚠️ 注意：innerHTML 有 XSS 风险
// 不要直接插入用户输入的内容
```

### 实际例子

```javascript
// 场景：实时更新用户信息
const userInfo = {
    name: '张三',
    age: 25,
    email: 'zhang@example.com'
};

// 更新页面
document.getElementById('name').textContent = userInfo.name;
document.getElementById('age').textContent = userInfo.age + '岁';
document.getElementById('email').textContent = userInfo.email;

// 或者批量更新
const info = {
    name: document.getElementById('name'),
    age: document.getElementById('age'),
    email: document.getElementById('email')
};

info.name.textContent = userInfo.name;
info.age.textContent = userInfo.age + '岁';
info.email.textContent = userInfo.email;
```

---

## 2.5 修改元素属性 - 改变元素特性

### 获取和设置属性

```javascript
// HTML: <img id="logo" src="old.png" alt="Logo">
const img = document.getElementById('logo');

// 1. 直接访问属性
console.log(img.src);    // 完整 URL
console.log(img.alt);    // 'Logo'
console.log(img.width);  // 图片宽度

// 设置属性
img.src = 'new.png';
img.alt = '新 Logo';
img.width = 200;

// 2. getAttribute / setAttribute（通用方法）
console.log(img.getAttribute('src'));  // 'old.png'
img.setAttribute('src', 'new.png');
img.setAttribute('data-id', '123');  // 自定义属性

// 3. hasAttribute / removeAttribute
img.hasAttribute('alt');      // true
img.removeAttribute('alt');   // 删除 alt 属性
```

### class 操作

```javascript
// HTML: <div class="box active">内容</div>
const div = document.querySelector('div');

// className - 获取/设置整个类名
console.log(div.className);  // 'box active'
div.className = 'new-class';  // 替换所有类

// classList - 操作单个类（推荐）
div.classList.add('highlight');     // 添加类
div.classList.remove('active');     // 移除类
div.classList.toggle('hidden');     // 切换类
div.classList.contains('box');      // 是否包含某个类

// 链式调用
div.classList.add('a', 'b', 'c');
```

### 样式操作

```javascript
// HTML: <div id="box" style="color: red;">内容</div>
const box = document.getElementById('box');

// 1. style - 操作内联样式
box.style.color = 'blue';
box.style.fontSize = '20px';
box.style.marginTop = '10px';

// 注意：CSS 属性名要转驼峰
// background-color → backgroundColor
// font-size → fontSize

// 2. getComputedStyle - 获取最终样式
const style = getComputedStyle(box);
console.log(style.color);        // 最终颜色
console.log(style.marginTop);    // 最终上边距
```

---

## 2.6 创建和删除元素 - 动态修改 DOM

### 创建元素

```javascript
// 1. 创建元素
const div = document.createElement('div');
div.className = 'card';
div.textContent = '卡片内容';

// 2. 添加到页面
document.body.appendChild(div);  // 添加到 body 末尾

// 3. 插入到指定位置
const container = document.querySelector('.container');
const firstChild = container.firstChild;
container.insertBefore(div, firstChild);  // 插入到第一个子元素前
```

### 删除元素

```javascript
// HTML: <ul><li id="toDelete">删除我</li></ul>
const li = document.getElementById('toDelete');

// 方法 1：父节点删除
li.parentNode.removeChild(li);

// 方法 2：自己删除自己（现代浏览器）
li.remove();
```

### 实际例子：动态列表

```javascript
// 场景：待办事项列表
const todoList = document.querySelector('#todo-list');
const todoInput = document.querySelector('#todo-input');

// 添加待办
function addTodo(text) {
    // 创建 li
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.textContent = text;
    
    // 创建删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除';
    deleteBtn.onclick = () => li.remove();
    
    // 组装
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    
    // 清空输入
    todoInput.value = '';
}

// 监听回车键
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInput.value.trim()) {
        addTodo(todoInput.value);
    }
});
```

---

## 2.7 事件基础 - 响应用户操作

### 什么是事件？

**事件就是"发生的事情"**，比如点击、滚动、按键等。

```
生活例子：
- 门铃响了（事件）→ 你去开门（响应）
- 手机震动（事件）→ 你看手机（响应）
- 用户点击（事件）→ 执行函数（响应）
```

### 事件监听

```javascript
// HTML: <button id="btn">点击</button>
const btn = document.getElementById('btn');

// 方法 1：直接赋值（不推荐，只能绑定一个）
btn.onclick = () => {
    console.log('点击了');
};

// 方法 2：addEventListener（推荐）
btn.addEventListener('click', () => {
    console.log('点击了');
});

// 可以绑定多个
btn.addEventListener('click', () => {
    console.log('另一个监听器');
});

// 移除监听器
function handler() {
    console.log('点击');
}
btn.addEventListener('click', handler);
btn.removeEventListener('click', handler);
```

### 常见事件类型

```javascript
// 鼠标事件
element.addEventListener('click', handler);      // 点击
element.addEventListener('dblclick', handler);   // 双击
element.addEventListener('mousedown', handler);  // 按下
element.addEventListener('mouseup', handler);    // 松开
element.addEventListener('mousemove', handler);  // 移动
element.addEventListener('mouseenter', handler); // 进入
element.addEventListener('mouseleave', handler); // 离开

// 键盘事件
element.addEventListener('keydown', handler);    // 按下
element.addEventListener('keyup', handler);      // 松开
element.addEventListener('keypress', handler);   // 按下（字符键）

// 表单事件
input.addEventListener('input', handler);        // 输入
input.addEventListener('change', handler);       // 改变
form.addEventListener('submit', handler);        // 提交
form.addEventListener('reset', handler);         // 重置

// 窗口事件
window.addEventListener('load', handler);        // 加载完成
window.addEventListener('resize', handler);      // 调整大小
window.addEventListener('scroll', handler);      // 滚动
```

---

## 2.8 事件对象 - 获取事件详情

### 事件对象是什么？

**当事件发生时，浏览器会创建一个包含事件信息的对象。**

```javascript
btn.addEventListener('click', (event) => {
    // event 就是事件对象
    console.log(event);
});
```

### 常用属性

```javascript
element.addEventListener('click', (e) => {
    // 鼠标位置
    e.clientX;  // 相对于视口的 X 坐标
    e.clientY;  // 相对于视口的 Y 坐标
    e.pageX;    // 相对于页面的 X 坐标
    e.pageY;    // 相对于页面的 Y 坐标
    
    // 目标元素
    e.target;        // 触发事件的元素
    e.currentTarget; // 绑定监听器的元素
    
    // 阻止默认行为
    e.preventDefault();
    
    // 阻止冒泡
    e.stopPropagation();
});

// 键盘事件
document.addEventListener('keydown', (e) => {
    e.key;      // 按键名称 'Enter', 'a', 'F1'
    e.code;     // 按键代码 'Enter', 'KeyA', 'F1'
    e.keyCode;  // 按键码 13, 65（已废弃）
    
    // 修饰键
    e.shiftKey;  // 是否按下 Shift
    e.ctrlKey;   // 是否按下 Ctrl
    e.altKey;    // 是否按下 Alt
    e.metaKey;   // 是否按下 Meta
});
```

### 实际应用

```javascript
// 场景：右键菜单
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();  // 阻止默认右键菜单
    
    // 显示自定义菜单
    const menu = document.querySelector('.custom-menu');
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    menu.classList.add('show');
});

// 点击其他地方关闭菜单
document.addEventListener('click', () => {
    document.querySelector('.custom-menu').classList.remove('show');
});
```

---

## 2.9 事件冒泡和捕获 - 事件传播机制

### 什么是事件冒泡？

**事件从内向外传播，就像水泡从底部冒到顶部。**

```
HTML 结构：
<div id="outer">
    <button id="inner">点击</button>
</div>

// 点击按钮，事件传播顺序：
button → div → body → html → document
   ↑
  先触发
```

### 冒泡示例

```javascript
// HTML: <div id="outer"><button id="inner">点击</button></div>

document.getElementById('inner').addEventListener('click', () => {
    console.log('按钮');
});

document.getElementById('outer').addEventListener('click', () => {
    console.log('外层 div');
});

document.body.addEventListener('click', () => {
    console.log('body');
});

// 点击按钮后输出：
// 按钮 → 外层 div → body
```

### 阻止冒泡

```javascript
// 阻止事件继续传播
button.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('按钮');
    // 外层的监听器不会触发
});
```

### 事件捕获

```javascript
// 第三个参数设为 true，启用捕获
// 事件从外向内传播
document.getElementById('outer').addEventListener('click', () => {
    console.log('外层 div（捕获）');
}, true);

// 点击按钮后输出：
// 外层 div（捕获）→ 按钮
```

---

## 2.10 事件委托 - 高效的事件处理

### 什么是事件委托？

**利用事件冒泡，把子元素的事件委托给父元素处理。**

```
生活例子：
- 老师（父元素）管理全班学生（子元素）
- 不用给每个学生单独安排老师
- 学生有问题都找老师
```

### 事件委托示例

```javascript
// HTML: <ul id="list">
//          <li data-id="1">项目 1</li>
//          <li data-id="2">项目 2</li>
//          <li data-id="3">项目 3</li>
//       </ul>

// ❌ 不推荐：给每个 li 绑定事件
document.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
        console.log(li.dataset.id);
    });
});

// ✅ 推荐：委托给 ul
document.getElementById('list').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (li) {
        console.log(li.dataset.id);
    }
});
```

### 事件委托的好处

```javascript
// 1. 减少内存占用
// 不用给每个子元素绑定监听器

// 2. 动态添加的元素也有效
const list = document.getElementById('list');

// 添加新项目
const newLi = document.createElement('li');
newLi.textContent = '新项目';
list.appendChild(newLi);
// 点击新项目也能触发（因为委托给 ul 了）

// 3. 方便管理
// 只需要绑定/解绑一次
```

---

## 2.11 表单操作 - 处理用户输入

### 获取表单值

```javascript
// HTML: 
// <form id="form">
//     <input type="text" name="username" id="username">
//     <input type="email" name="email" id="email">
//     <input type="password" name="password" id="password">
//     <textarea name="bio" id="bio"></textarea>
//     <select name="city" id="city">
//         <option value="bj">北京</option>
//         <option value="sh">上海</option>
//     </select>
//     <button type="submit">提交</button>
// </form>

const form = document.getElementById('form');

// 获取单个值
const username = document.getElementById('username').value;
const email = document.getElementById('email').value;

// 通过 name 获取
const bio = form.elements['bio'].value;
const city = form.elements['city'].value;
```

### 表单验证

```javascript
form.addEventListener('submit', (e) => {
    e.preventDefault();  // 阻止提交
    
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    
    // 验证
    if (!username) {
        alert('用户名不能为空');
        form.username.focus();
        return;
    }
    
    if (!email.includes('@')) {
        alert('邮箱格式不正确');
        form.email.focus();
        return;
    }
    
    if (password.length < 6) {
        alert('密码至少 6 位');
        form.password.focus();
        return;
    }
    
    // 验证通过，提交表单
    form.submit();
});
```

### 实时验证

```javascript
// 输入时实时验证
form.username.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    const feedback = document.getElementById('username-feedback');
    
    if (value.length < 3) {
        feedback.textContent = '用户名至少 3 个字符';
        feedback.className = 'error';
    } else {
        feedback.textContent = '✓ 可用';
        feedback.className = 'success';
    }
});

// 失去焦点时验证
form.email.addEventListener('blur', (e) => {
    const value = e.target.value;
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    
    if (!isValid) {
        e.target.classList.add('invalid');
    } else {
        e.target.classList.remove('invalid');
    }
});
```

---

## 2.12 DOM 动画 - 让页面动起来

### CSS 过渡动画

```javascript
// HTML: <button id="btn">悬停</button>
// CSS: 
// #btn {
//     transition: all 0.3s ease;
//     background: blue;
// }
// #btn:hover {
//     background: red;
// }

const btn = document.getElementById('btn');

// 用 JS 触发动画
btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.1)';
});

btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
});
```

### 动画事件

```javascript
// CSS:
// .fade {
//     animation: fadeIn 0.5s;
// }

element.addEventListener('animationend', () => {
    console.log('动画结束');
});

element.addEventListener('animationstart', () => {
    console.log('动画开始');
});

element.addEventListener('animationiteration', () => {
    console.log('动画迭代');
});
```

### 使用 requestAnimationFrame

```javascript
// 创建流畅动画
const box = document.getElementById('box');
let pos = 0;

function animate() {
    pos++;
    box.style.left = pos + 'px';
    
    if (pos < 500) {
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate);
```

---

## 2.13 实践练习

### 练习 1：图片画廊

```javascript
// 要求：
// 1. 点击缩略图，切换大图
// 2. 添加上一张/下一张按钮
// 3. 支持键盘左右键切换

const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('main-image');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 0;

// 点击缩略图
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentIndex = index;
        updateImage();
    });
});

// 上一张
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateImage();
});

// 下一张
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    updateImage();
});

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});

function updateImage() {
    const src = thumbnails[currentIndex].dataset.full;
    mainImage.src = src;
    
    // 更新激活状态
    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnails[currentIndex].classList.add('active');
}
```

### 练习 2：模态框

```javascript
// 要求：
// 1. 点击按钮打开模态框
// 2. 点击关闭按钮或背景关闭
// 3. 按 ESC 键关闭

const modal = document.getElementById('modal');
const openBtn = document.getElementById('open-modal');
const closeBtn = document.getElementById('close-modal');
const overlay = document.querySelector('.modal-overlay');

// 打开
openBtn.addEventListener('click', () => {
    modal.classList.add('show');
});

// 关闭
function closeModal() {
    modal.classList.remove('show');
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// ESC 关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});
```

### 练习 3：待办事项（完整版）

```javascript
class TodoApp {
    constructor() {
        this.form = document.getElementById('todo-form');
        this.input = document.getElementById('todo-input');
        this.list = document.getElementById('todo-list');
        this.filter = document.getElementById('filter');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.add(this.input.value.trim());
        });
        
        this.list.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (!li) return;
            
            if (e.target.classList.contains('delete')) {
                this.remove(li);
            } else if (e.target.classList.contains('toggle')) {
                this.toggle(li);
            }
        });
        
        this.filter.addEventListener('change', (e) => {
            this.render(e.target.value);
        });
    }
    
    add(text) {
        if (!text) return;
        
        const todo = {
            id: Date.now(),
            text,
            completed: false
        };
        
        const todos = this.getTodos();
        todos.push(todo);
        this.saveTodos(todos);
        this.render();
        this.input.value = '';
    }
    
    remove(li) {
        const id = parseInt(li.dataset.id);
        const todos = this.getTodos().filter(t => t.id !== id);
        this.saveTodos(todos);
        this.render();
    }
    
    toggle(li) {
        const id = parseInt(li.dataset.id);
        const todos = this.getTodos().map(t => 
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        this.saveTodos(todos);
        this.render();
    }
    
    getTodos() {
        return JSON.parse(localStorage.getItem('todos') || '[]');
    }
    
    saveTodos(todos) {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    render(filter = 'all') {
        const todos = this.getTodos();
        let filtered = todos;
        
        if (filter === 'active') {
            filtered = todos.filter(t => !t.completed);
        } else if (filter === 'completed') {
            filtered = todos.filter(t => t.completed);
        }
        
        this.list.innerHTML = filtered.map(todo => `
            <li data-id="${todo.id}" class="${todo.completed ? 'completed' : ''}">
                <span class="toggle">${todo.text}</span>
                <button class="delete">删除</button>
            </li>
        `).join('');
    }
}

// 初始化
new TodoApp();
```

---

## 2.14 常见问答

### Q1: querySelector 和 getElementById 有什么区别？

**答：**
- `getElementById` 只能通过 ID 选择，速度快
- `querySelector` 可以用任何 CSS 选择器，更灵活

```javascript
// 推荐：统一用 querySelector
const el = document.querySelector('#myId');
const el2 = document.querySelector('.myClass');
```

### Q2: innerHTML 和 textContent 有什么区别？

**答：**
- `innerHTML` 解析 HTML，有 XSS 风险
- `textContent` 只处理文本，更安全

```javascript
// 用户输入，用 textContent
div.textContent = userInput;  // ✅ 安全

// 可信内容，用 innerHTML
div.innerHTML = '<strong>加粗</strong>';  // ✅
```

### Q3: 什么是事件委托？有什么好处？

**答：** 把子元素的事件委托给父元素处理。

好处：
- 减少内存占用
- 动态元素也有效
- 方便管理

---

## 2.15 学习资源

- [MDN DOM 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)
- [JavaScript.info DOM](https://zh.javascript.info/dom-nodes)

---

**上一章：** [← 01-核心语法](./01-核心语法.md)
**下一章：** [→ 03-异步编程](./03-异步编程.md)
