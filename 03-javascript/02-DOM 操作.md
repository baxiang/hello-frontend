# JavaScript DOM 操作

## 学习目标
- 理解 DOM 树的结构
- 掌握元素选择和遍历方法
- 学会修改元素内容和属性
- 精通事件处理机制
- 能够操作表单和动画

---

## 2.1 DOM 基础

### DOM 树结构

```
document
└── <html>
    ├── <head>
    │   ├── <title>
    │   └── <meta>
    └── <body>
        ├── <div>
        │   ├── <h1>
        │   └── <p>
        └── <footer>
```

### document 对象

```javascript
// document 是 DOM 的入口点
document.documentElement    // <html> 元素
document.head               // <head> 元素
document.body               // <body> 元素
document.doctype            // <!DOCTYPE html>
document.characterSet       // 'UTF-8'
document.URL                // 完整 URL
document.domain             // 域名
document.title              // 页面标题（可读写）
document.cookie             // Cookie
document.referrer           // 来源页面
```

---

## 2.2 元素选择

### 获取单个元素

```javascript
// 通过 ID 选择
const element = document.getElementById('myId');

// 通过 CSS 选择器（返回第一个匹配的元素）
const element = document.querySelector('.myClass');
const element = document.querySelector('#myId');
const element = document.querySelector('div.container');
const element = document.querySelector('input[type="text"]');
```

### 获取多个元素

```javascript
// 通过类名
const elements = document.getElementsByClassName('myClass');
// HTMLCollection，类似数组但不是真正的数组

// 通过标签名
const elements = document.getElementsByTagName('div');
const allImages = document.getElementsByTagName('img');

// 通过 CSS 选择器（返回所有匹配的元素）
const elements = document.querySelectorAll('.myClass');
// NodeList，可以使用 forEach

// 转换为数组
const arr = Array.from(elements);
const arr = [...elements];
```

### 选择器语法

```javascript
// 基本选择器
document.querySelector('*')           // 所有元素
document.querySelector('p')           // 标签选择器
document.querySelector('.class')      // 类选择器
document.querySelector('#id')         // ID 选择器

// 组合选择器
document.querySelector('div.container')      // 后代
document.querySelector('ul > li')            // 直接子元素
document.querySelector('h1 + p')             // 相邻兄弟
document.querySelector('h1 ~ p')             // 所有兄弟

// 属性选择器
document.querySelector('[data-id]')          // 有属性
document.querySelector('[data-id="123"]')    // 属性值匹配
document.querySelector('[class^="btn-"]')    // 开头匹配
document.querySelector('[class$="-primary"]') // 结尾匹配
document.querySelector('[class*="btn"]')     // 包含匹配

// 伪类选择器
document.querySelector('li:first-child')
document.querySelector('li:last-child')
document.querySelector('li:nth-child(2n)')
document.querySelector('a:hover')
document.querySelector('input:checked')
document.querySelector('p:not(.highlight)')
```

---

## 2.3 元素遍历

### 父子关系遍历

```javascript
const parent = document.querySelector('.container');

// 获取父元素
parent.parentNode;
parent.parentElement;  // 更常用，确保返回的是元素

// 获取所有子节点（包括文本节点）
parent.childNodes;

// 获取所有子元素（只返回元素节点）
parent.children;

// 获取第一个/最后一个子节点
parent.firstChild;
parent.lastChild;

// 获取第一个/最后一个子元素
parent.firstElementChild;
parent.lastElementChild;
```

### 兄弟关系遍历

```javascript
const element = document.querySelector('#target');

// 获取前一个/后一个兄弟节点
element.previousSibling;
element.nextSibling;

// 获取前一个/后一个兄弟元素
element.previousElementSibling;
element.nextElementSibling;
```

### 遍历示例

```javascript
// 遍历所有子元素
const container = document.querySelector('.container');
for (const child of container.children) {
    console.log(child);
}

// 查找特定元素
const list = document.querySelector('#myList');
const firstItem = list.firstElementChild;
const lastItem = list.lastElementChild;
const secondItem = list.children[1];

// 向上查找匹配的元素
element.closest('.container');  // 查找最近的祖先元素
```

---

## 2.4 内容操作

### 文本内容

```javascript
const element = document.querySelector('#target');

// innerText - 获取/设置可见文本（会触发重排）
element.innerText = '新文本';
console.log(element.innerText);

// textContent - 获取/设置所有文本（包括隐藏）
element.textContent = '新文本';
console.log(element.textContent);

// innerHTML - 获取/设置 HTML 内容
element.innerHTML = '<strong>加粗</strong> 文本';
console.log(element.innerHTML);

// 安全地插入 HTML（推荐）
function setHTML(element, html) {
    element.innerHTML = '';
    const template = document.createElement('template');
    template.innerHTML = html;
    element.appendChild(template.content);
}
```

### 插入内容

```javascript
const parent = document.querySelector('#list');
const newItem = document.createElement('li');
newItem.textContent = '新项';

// 在末尾添加
parent.appendChild(newItem);

// 在指定位置插入
const refChild = parent.children[2];
parent.insertBefore(newItem, refChild);

// 替换节点
parent.replaceChild(newItem, refChild);

// 删除节点
parent.removeChild(refChild);

// 在现代浏览器中
newItem.remove();  // 删除自身
parent.replaceChildren(newItem, refChild);
```

### insertAdjacent 方法

```javascript
element.insertAdjacentHTML(position, text);
element.insertAdjacentText(position, text);
element.insertAdjacentElement(position, element);

// position 值：
// 'beforebegin' - 元素前面
// 'afterbegin'  - 元素内第一个子元素前
// 'beforeend'   - 元素内最后一个子元素后
// 'afterend'    - 元素后面

// 示例
element.insertAdjacentHTML('beforebegin', '<p>之前</p>');
element.insertAdjacentHTML('afterbegin', '<p>内部第一个</p>');
element.insertAdjacentHTML('beforeend', '<p>内部最后一个</p>');
element.insertAdjacentHTML('afterend', '<p>之后</p>');
```

---

## 2.5 属性和类操作

### 属性操作

```javascript
const img = document.querySelector('img');

// 获取/设置属性
img.getAttribute('src');
img.setAttribute('src', 'new-image.jpg');
img.removeAttribute('alt');
img.hasAttribute('alt');

// 直接访问常用属性
img.src = 'image.jpg';
img.alt = '描述';
img.width = 300;
img.height = 200;

// data-* 属性
const div = document.querySelector('[data-id]');
div.dataset.id = '123';
div.dataset.userId = '456';
console.log(div.dataset.id);  // '123'
```

### 类名操作

```javascript
const element = document.querySelector('.box');

// 添加类
element.classList.add('active');
element.classList.add('class1', 'class2');

// 移除类
element.classList.remove('active');

// 切换类
element.classList.toggle('active');
element.classList.toggle('active', condition);  // 根据条件

// 检查是否包含类
element.classList.contains('active');

// 替换类
element.classList.replace('old-class', 'new-class');

// 获取所有类
element.classList;  // DOMTokenList
[...element.classList];  // 转换为数组

// 旧方法（不推荐）
element.className = 'box active';  // 设置所有类
```

### 样式操作

```javascript
const element = document.querySelector('.box');

// 读取内联样式
element.style.color;
element.style.backgroundColor;

// 设置内联样式
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.width = '100px';
element.style.transform = 'rotate(45deg)';

// 设置多个样式
Object.assign(element.style, {
    color: 'white',
    background: 'black',
    padding: '20px'
});

// 读取计算后的样式（只读）
const computedStyle = getComputedStyle(element);
computedStyle.color;
computedStyle.marginTop;
computedStyle.getPropertyValue('--custom-var');
```

---

## 2.6 事件处理

### 事件监听

```javascript
const button = document.querySelector('button');

// 添加事件监听器（推荐）
button.addEventListener('click', handleClick);

function handleClick(event) {
    console.log('按钮被点击了');
}

// 移除事件监听器
button.removeEventListener('click', handleClick);

// 一次性监听
button.addEventListener('click', handleClick, { once: true });

// 捕获阶段监听
button.addEventListener('click', handleClick, { capture: true });

// 旧方法（不推荐）
button.onclick = handleClick;
button.onclick = null;  // 移除
```

### 事件对象

```javascript
element.addEventListener('click', (event) => {
    // 事件基本信息
    event.type;           // 'click'
    event.target;         // 触发事件的元素
    event.currentTarget;  // 绑定监听器的元素

    // 鼠标事件
    event.clientX;        // 相对于视口的 X 坐标
    event.clientY;        // 相对于视口的 Y 坐标
    event.pageX;          // 相对于文档的 X 坐标
    event.pageY;          // 相对于文档的 Y 坐标
    event.button;         // 按下的按钮（0: 左键，1: 中键，2: 右键）
    event.buttons;        // 按下的按钮状态
    event.altKey;         // Alt 键是否按下
    event.ctrlKey;        // Ctrl 键是否按下
    event.shiftKey;       // Shift 键是否按下
    event.metaKey;        // Meta 键是否按下

    // 键盘事件
    event.key;            // 按键名（'Enter', 'a', 'Escape'）
    event.code;           // 物理按键代码（'KeyA', 'Enter'）
    event.keyCode;        // 键码（已废弃）

    // 阻止默认行为
    event.preventDefault();

    // 阻止事件冒泡
    event.stopPropagation();

    // 阻止事件冒泡和捕获
    event.stopImmediatePropagation();
});
```

### 事件委托

```javascript
// 不推荐：给每个子元素添加监听器
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', handleClick);
});

// 推荐：事件委托
document.querySelector('.list').addEventListener('click', (event) => {
    const item = event.target.closest('.item');
    if (item && list.contains(item)) {
        handleClick(item);
    }
});

function handleClick(item) {
    console.log('点击了:', item.textContent);
}
```

### 常见事件类型

```javascript
// 鼠标事件
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mousedown', handler);
element.addEventListener('mouseup', handler);
element.addEventListener('mousemove', handler);
element.addEventListener('mouseenter', handler);  // 不冒泡
element.addEventListener('mouseleave', handler);  // 不冒泡
element.addEventListener('mouseover', handler);
element.addEventListener('mouseout', handler);
element.addEventListener('contextmenu', handler);  // 右键菜单

// 键盘事件
element.addEventListener('keydown', handler);
element.addEventListener('keyup', handler);
element.addEventListener('keypress', handler);  // 已废弃

// 表单事件
input.addEventListener('input', handler);
input.addEventListener('change', handler);
input.addEventListener('focus', handler);
input.addEventListener('blur', handler);
form.addEventListener('submit', handler);
form.addEventListener('reset', handler);

// 文档/窗口事件
window.addEventListener('load', handler);
window.addEventListener('DOMContentLoaded', handler);
window.addEventListener('resize', handler);
window.addEventListener('scroll', handler);
window.addEventListener('beforeunload', handler);
window.addEventListener('hashchange', handler);

// 触摸事件（移动端）
element.addEventListener('touchstart', handler);
element.addEventListener('touchmove', handler);
element.addEventListener('touchend', handler);
```

---

## 2.7 创建和修改元素

### 创建元素

```javascript
// 创建元素
const div = document.createElement('div');
const span = document.createElement('span');

// 创建文本节点
const text = document.createTextNode('Hello World');

// 创建文档片段
const fragment = document.createDocumentFragment();
for (let i = 0; i < 10; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}
document.querySelector('ul').appendChild(fragment);  // 只触发一次重排
```

### 批量操作示例

```javascript
function createList(items) {
    const ul = document.createElement('ul');
    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        fragment.appendChild(li);
    });

    ul.appendChild(fragment);
    return ul;
}

// 使用
const list = createList(['苹果', '香蕉', '橙子']);
document.body.appendChild(list);
```

---

## 2.8 表单操作

### 获取表单值

```javascript
const form = document.querySelector('#myForm');

// 获取表单元素
const input = form.querySelector('input[name="username"]');
const email = form.email;  // 通过 name 属性

// 获取值
input.value;
input.value = '新值';

// 复选框/单选按钮
checkbox.checked;
checkbox.checked = true;
radio.checked;

// 获取选中的选项
const select = form.querySelector('select');
select.value;  // 选中的值
select.selectedIndex;  // 选中的索引
select.options[select.selectedIndex].text;  // 选中的文本

// 获取所有选中的多选框
const selected = [...select.selectedOptions].map(opt => opt.value);
```

### 表单验证

```javascript
const form = document.querySelector('#myForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // 检查表单有效性
    if (!form.checkValidity()) {
        form.reportValidity();  // 显示验证消息
        return;
    }

    // 手动验证
    const email = form.email;
    if (!email.validity.valid) {
        console.log(email.validationMessage);
    }

    // 提交表单
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
});
```

### FormData 使用

```javascript
const form = document.querySelector('#myForm');
const formData = new FormData(form);

// 获取数据
formData.get('username');
formData.getAll('hobby');  // 获取所有同名值

// 设置/添加数据
formData.set('token', 'abc123');
formData.append('tags', 'tag1');
formData.append('tags', 'tag2');

// 遍历
for (let [key, value] of formData) {
    console.log(key, value);
}

// 转换为对象
const data = Object.fromEntries(formData);

// 发送 AJAX
fetch('/api/submit', {
    method: 'POST',
    body: formData
});
```

---

## 2.9 动画和滚动

### 滚动操作

```javascript
// 获取滚动位置
window.scrollX;  // 水平滚动距离
window.scrollY;  // 垂直滚动距离
document.documentElement.scrollTop;  // 兼容性更好

// 获取可视区域尺寸
window.innerWidth;
window.innerHeight;
document.documentElement.clientWidth;

// 滚动到指定位置
window.scrollTo(100, 200);
window.scrollTo({
    top: 100,
    left: 0,
    behavior: 'smooth'  // 平滑滚动
});

// 相对滚动
window.scrollBy(0, 100);
window.scrollBy({
    top: 100,
    behavior: 'smooth'
});

// 滚动到元素
element.scrollIntoView();
element.scrollIntoView({ behavior: 'smooth', block: 'center' });

// 元素的滚动
const container = document.querySelector('.scrollable');
container.scrollTop = 100;
container.scrollLeft = 50;
```

### 滚动事件

```javascript
// 防抖滚动处理
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function handleScroll() {
    const scrollTop = window.scrollY;
    console.log('滚动位置:', scrollTop);
}

// 滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 回到顶部按钮显示/隐藏
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
```

### CSS 动画控制

```javascript
// 监听动画事件
element.addEventListener('animationend', () => {
    console.log('动画结束');
});

element.addEventListener('transitionend', (event) => {
    console.log('过渡结束:', event.propertyName);
});

// 添加动画类
function animate(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', () => {
        element.classList.remove(animationClass);
    }, { once: true });
}

// 使用
animate(element, 'fade-out');
```

---

## 2.10 实践练习

### 练习 1：模态框组件

```javascript
class Modal {
    constructor(options = {}) {
        this.title = options.title || '提示';
        this.content = options.content || '';
        this.onConfirm = options.onConfirm || (() => {});
        this.onCancel = options.onCancel || (() => {});

        this.create();
    }

    create() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        this.overlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${this.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">${this.content}</div>
                <div class="modal-footer">
                    <button class="btn btn-cancel">取消</button>
                    <button class="btn btn-confirm">确认</button>
                </div>
            </div>
        `;

        // 绑定事件
        this.overlay.querySelector('.modal-close')
            .addEventListener('click', () => this.close());
        this.overlay.querySelector('.btn-cancel')
            .addEventListener('click', () => {
                this.onCancel();
                this.close();
            });
        this.overlay.querySelector('.btn-confirm')
            .addEventListener('click', () => {
                this.onConfirm();
                this.close();
            });
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        document.body.appendChild(this.overlay);
    }

    close() {
        this.overlay.remove();
    }

    static alert(content, title = '提示') {
        return new Modal({ content, title });
    }

    static confirm(content, options = {}) {
        return new Modal({
            content,
            title: options.title || '确认',
            onConfirm: options.onConfirm,
            onCancel: options.onCancel
        });
    }
}

// 样式
const style = document.createElement('style');
style.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .modal {
        background: #fff;
        border-radius: 12px;
        min-width: 400px;
        max-width: 90%;
        animation: modalIn 0.3s ease;
    }
    @keyframes modalIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #eee;
    }
    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #999;
    }
    .modal-body {
        padding: 20px;
    }
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 20px;
        border-top: 1px solid #eee;
    }
    .btn {
        padding: 8px 20px;
        border-radius: 6px;
        cursor: pointer;
        border: none;
        font-size: 14px;
    }
    .btn-cancel {
        background: #f0f0f0;
        color: #666;
    }
    .btn-confirm {
        background: #007bff;
        color: #fff;
    }
`;
document.head.appendChild(style);

// 使用示例
Modal.confirm('确定要删除吗？', {
    onConfirm: () => console.log('已删除'),
    onCancel: () => console.log('已取消')
});
```

### 练习 2：选项卡组件

```javascript
class Tabs {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        this.activeTab = options.activeTab || 0;
        this.onChange = options.onChange || (() => {});

        this.init();
    }

    init() {
        const tabList = this.container.querySelector('.tab-list');
        const panels = this.container.querySelectorAll('.tab-panel');

        const tabs = tabList.querySelectorAll('.tab-item');
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                this.activate(index);
            });
        });

        this.tabs = tabs;
        this.panels = panels;
        this.activate(this.activeTab);
    }

    activate(index) {
        if (index < 0 || index >= this.tabs.length) return;

        this.tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
        });

        this.panels.forEach((panel, i) => {
            panel.classList.toggle('active', i === index);
        });

        this.activeTab = index;
        this.onChange(index);
    }
}

// 样式
const tabsStyle = document.createElement('style');
tabsStyle.textContent = `
    .tabs .tab-list {
        display: flex;
        border-bottom: 2px solid #eee;
    }
    .tab-item {
        padding: 12px 24px;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        transition: all 0.3s;
    }
    .tab-item:hover {
        color: #007bff;
    }
    .tab-item.active {
        color: #007bff;
        border-bottom-color: #007bff;
    }
    .tab-panel {
        display: none;
        padding: 20px;
    }
    .tab-panel.active {
        display: block;
        animation: fadeIn 0.3s;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(tabsStyle);

// HTML 结构
document.body.innerHTML += `
    <div class="tabs" id="myTabs">
        <div class="tab-list">
            <div class="tab-item">选项卡 1</div>
            <div class="tab-item">选项卡 2</div>
            <div class="tab-item">选项卡 3</div>
        </div>
        <div class="tab-panel active">内容 1</div>
        <div class="tab-panel">内容 2</div>
        <div class="tab-panel">内容 3</div>
    </div>
`;

// 初始化
new Tabs('#myTabs', {
    onChange: (index) => console.log('切换到:', index)
});
```

### 练习 3：图片懒加载

```javascript
class LazyLoad {
    constructor(options = {}) {
        this.selector = options.selector || '[data-src]';
        this.root = options.root || null;
        this.rootMargin = options.rootMargin || '50px';
        this.threshold = options.threshold || 0;
        this.loadedClass = options.loadedClass || 'loaded';

        this.init();
    }

    init() {
        // 使用 Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: this.root,
            rootMargin: this.rootMargin,
            threshold: this.threshold
        });

        document.querySelectorAll(this.selector).forEach(img => {
            observer.observe(img);
        });
    }

    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.classList.add(this.loadedClass);
            img.removeAttribute('data-src');
            img.dispatchEvent(new CustomEvent('lazyloaded'));
        };
        tempImg.src = src;
    }

    static init(options) {
        return new LazyLoad(options);
    }
}

// 使用示例
LazyLoad.init({
    selector: 'img[data-src]',
    rootMargin: '100px',
    loadedClass: 'fadeIn'
});

// HTML
// <img data-src="image.jpg" src="placeholder.jpg" alt="图片">
```

---

## 2.11 常见问题

### Q1: innerHTML 和 innerText 有什么区别？

| 属性 | innerHTML | innerText | textContent |
|------|-----------|-----------|-------------|
| 解析 HTML | 是 | 否 | 否 |
| 触发重排 | 是 | 是 | 否 |
| 获取隐藏文本 | 否 | 否 | 是 |
| XSS 风险 | 有 | 无 | 无 |

### Q2: 事件冒泡和捕获有什么区别？

```javascript
// 冒泡（默认）：从内向外触发
element.addEventListener('click', handler);  // 等价于 { bubbles: true }

// 捕获：从外向内触发
element.addEventListener('click', handler, { capture: true });

// 阻止冒泡
element.addEventListener('click', (e) => {
    e.stopPropagation();
});
```

### Q3: 如何高效添加大量 DOM 元素？

```javascript
// 不推荐：每次循环都触发重排
for (let i = 0; i < 1000; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    list.appendChild(li);
}

// 推荐：使用文档片段
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const li = document.createElement('li');
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}
list.appendChild(fragment);  // 只触发一次重排
```

### Q4: 如何阻止表单重复提交？

```javascript
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn.disabled) return;

    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';

    try {
        await submitForm(form);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '提交';
    }
});
```

---

## 2.12 学习资源

- [MDN DOM 指南](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
- [DOM 事件详解](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events)
- [Intersection Observer API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)

---

**上一步：** [← 01-核心语法.md](./01-核心语法.md)
**下一步：** [→ 03-异步编程.md](./03-异步编程.md)
