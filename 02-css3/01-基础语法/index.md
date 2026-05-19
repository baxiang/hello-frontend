# CSS3 基础语法 ⭐

> 选择器、盒模型、文本与背景样式

---

## 学习目标

- 理解 CSS 的基本语法和引入方式
- 掌握选择器的用法和优先级计算
- 理解盒模型的核心概念
- 学会常用的文本和背景样式

---

## 生活化比喻

**CSS 语法就像"装修设计图纸"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                    装修设计图纸                       │
├──────────────────────────────────────────────────────┤
│                                                      │
│    选择器 { 属性: 值; }                               │
│    ───────   ────  ──                                │
│      │        │    │                                 │
│      ↓        ↓    ↓                                 │
│   选择房间   设置   具体数值                          │
│   (哪个元素) 效果   (颜色、大小)                      │
│                                                      │
│    例如：                                            │
│    .card {                                           │
│        color: red;      → 墙面颜色：红色             │
│        width: 300px;    → 房间宽度：300px            │
│        padding: 20px;   → 墙壁厚度：20px             │
│    }                                                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 1.1 CSS 语法基础

**语法结构图：**

```
CSS 语法结构：

选择器 {
    属性名: 属性值;
    属性名: 属性值;
}
│        │      │
│        │      └─ 具体值（red、16px、center）
│        └─ 要设置的样式（color、font-size）
└─ 要美化哪个元素（标签、类、ID）

示例：
h1 {                    ← 选择器：所有 h1 标题
    color: #333;        ← 属性：文字颜色
    font-size: 24px;    ← 属性：字体大小
}
```

**最简示例（1-3行）：**

```css
h1 { color: red; }
p { font-size: 16px; }
.box { background: blue; }
```

**详细示例：**

```css
/* 选择器 { 属性：值； } */
h1 {
    color: #333;
    font-size: 24px;
    text-align: center;
}

.card {
    width: 300px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
}
```

---

### 1.2 CSS 引入方式

**语法结构图：**

```
三种引入方式：

方式 1：外部样式表（推荐）────────────────────────────
<link rel="stylesheet" href="style.css">
│                       │
│                       └─ CSS 文件路径
└─ 关联样式表

方式 2：内部样式表────────────────────────────────────
<head>
    <style>
        p { color: blue; }
    </style>
</head>

方式 3：行内样式（不推荐）────────────────────────────
<p style="color: red; font-size: 16px;">内容</p>
│               │
│               └─ 直接写在元素上
└─ style 属性
```

**最简示例：**

```html
<!-- 外部样式表（推荐） -->
<link rel="stylesheet" href="style.css">

<!-- 内部样式表 -->
<style>
    p { color: blue; }
</style>
```

**详细示例：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <!-- 方式 1：外部样式表（推荐） -->
    <link rel="stylesheet" href="style.css">

    <!-- 方式 2：内部样式表 -->
    <style>
        body {
            font-family: sans-serif;
            background: #f5f5f5;
        }
        h1 {
            color: #333;
            text-align: center;
        }
    </style>
</head>
<body>
    <!-- 方式 3：行内样式（不推荐） -->
    <p style="color: red; font-size: 16px;">这段文字是红色的</p>
</body>
</html>
```

---

### 1.3 选择器详解

**语法结构图：**

```
选择器类型：

基础选择器                    关系选择器                    伪类选择器
──────────                    ──────────                    ──────────
*        → 通配符              div p   → 后代（所有子孙）    :hover  → 悬停
元素     → div, p, span        div > p → 子元素（直接子）    :focus  → 获取焦点
.class   → 类选择器            h1 + p  → 相邻兄弟            :first-child → 第一个
#id      → ID 选择器           h1 ~ p  → 后面所有兄弟        :nth-child(n) → 第n个

优先级（从低到高）：
* < 元素 < 类 < ID < 行内 < !important
0,0,0,0  0,0,0,1  0,0,1,0  0,1,0,0  1,0,0,0  最高
```

**最简示例：**

```css
/* 基础选择器 */
* { margin: 0; }              /* 通配符 */
p { color: blue; }            /* 元素选择器 */
.title { font-size: 20px; }   /* 类选择器 */
#header { background: #fff; } /* ID 选择器 */
```

**详细示例：**

```css
/* 基础选择器 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

h1, h2, h3 {
    font-family: 'Microsoft YaHei', sans-serif;
}

.btn {
    padding: 10px 20px;
    border-radius: 4px;
}

#header {
    height: 60px;
    background: #fff;
}

/* 关系选择器 */
/* 后代选择器（所有子孙） */
div p { color: red; }

/* 子元素选择器（直接子元素） */
div > p { color: blue; }

/* 相邻兄弟选择器（紧接其后） */
h1 + p { font-size: 18px; }

/* 通用兄弟选择器（所有后面兄弟） */
h1 ~ p { color: #666; }

/* 伪类选择器 */
/* 链接状态 */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* 结构伪类 */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f9f9f9; }
li:nth-child(2n) { background: #fff; }

/* 表单伪类 */
input:focus { border-color: #007bff; }
input:disabled { background: #eee; }

/* 伪元素 */
p::before { content: "► "; }
p::after { content: " ◄"; }
p::first-line { font-weight: bold; }
```

---

### 1.4 盒模型

**语法结构图：**

```
盒模型组成：

┌─────────────────────────────────────┐
│           Margin（外边距）            │  ← 与其他元素的距离
│  ┌───────────────────────────────┐  │
│  │      Border（边框）            │  │  ← 元素的边界线
│  │  ┌─────────────────────────┐  │  │
│  │  │    Padding（内边距）     │  │  │  ← 内容与边框的距离
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │   Content（内容）  │  │  │  │  ← 元素的实际内容
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘

两种盒模型：
- content-box（标准）：width = 内容宽度
- border-box（推荐）：width = 内容 + padding + border
```

**最简示例：**

```css
.box {
    width: 300px;
    padding: 20px;
    border: 1px solid #333;
    margin: 10px;
}
```

**详细示例：**

```css
/* 盒模型属性 */
.box {
    /* 尺寸 */
    width: 300px;
    height: 200px;

    /* 内边距 */
    padding: 10px;              /* 上下左右 */
    padding: 10px 20px;         /* 上下 左右 */
    padding: 10px 20px 30px;    /* 上 左右 下 */
    padding: 10px 20px 30px 40px; /* 上 右 下 左 */

    /* 边框 */
    border: 1px solid #333;     /* 简写 */
    border-width: 1px;
    border-style: solid;        /* solid, dashed, dotted */
    border-color: #333;
    border-radius: 8px;         /* 圆角 */

    /* 外边距 */
    margin: 10px;
    margin: 10px auto;          /* 上下 10px，左右居中 */
}

/* 推荐全局设置 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;  /* 推荐！ */
}

/* 标准盒模型 vs IE 盒模型 */
/* 标准盒模型 */
.box-standard {
    width: 300px;
    box-sizing: content-box; /* width = content */
    padding: 20px;
    /* 实际宽度 = 300 + 20*2 = 340px */
}

/* IE 盒模型（推荐） */
.box-ie {
    width: 300px;
    box-sizing: border-box;  /* width = content + padding + border */
    padding: 20px;
    /* 实际宽度 = 300px */
}
```

---

### 1.5 文本样式

**语法结构图：**

```
文本属性分类：

字体属性                       文本属性                       溢出处理
──────────                     ──────────                     ───────
font-family → 字体             color      → 颜色              white-space: nowrap
font-size   → 大小             text-align → 对齐              overflow: hidden
font-weight → 粗细             line-height→ 行高              text-overflow: ellipsis
font-style  → 样式             text-indent→ 缩进
                              text-decoration→ 蹭饰
                              text-transform→ 转换
```

**最简示例：**

```css
.text {
    color: #333;
    font-size: 16px;
    text-align: center;
}
```

**详细示例：**

```css
.text {
    /* 字体属性 */
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;          /* normal=400, bold=700 */
    font-style: normal;
    line-height: 1.5;          /* 推荐无单位 */

    /* 文本属性 */
    color: #333;
    text-align: left;          /* left, center, right, justify */
    text-indent: 2em;          /* 首行缩进 */
    text-decoration: none;     /* none, underline, line-through */
    text-transform: uppercase; /* uppercase, lowercase, capitalize */

    /* 文字阴影 */
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

/* 文本溢出处理 */
/* 单行省略 */
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 多行省略 */
.multi-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

---

### 1.6 背景样式

**语法结构图：**

```
背景属性：

background-color → 背景颜色
background-image → 背景图片
background-repeat → 重复方式（repeat, no-repeat, repeat-x, repeat-y）
background-position → 位置（center, top left, 50% 50%）
background-size → 尺寸（cover, contain, 100% auto）
background-attachment → 附着（scroll, fixed）

渐变背景：
linear-gradient() → 线性渐变
radial-gradient() → 径向渐变
```

**最简示例：**

```css
.box {
    background: #f5f5f5;
}

.gradient {
    background: linear-gradient(to right, red, blue);
}
```

**详细示例：**

```css
.box {
    /* 背景颜色 */
    background-color: #f5f5f5;

    /* 背景图片 */
    background-image: url('image.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;     /* 覆盖整个容器 */

    /* 简写 */
    background: #fff url('bg.jpg') no-repeat center/cover;
}

/* 渐变背景 */
/* 线性渐变 */
.linear {
    background: linear-gradient(to right, #ff0000, #00ff00);
    background: linear-gradient(90deg, red, blue);
}

/* 径向渐变 */
.radial {
    background: radial-gradient(circle, red, blue);
}

/* 条纹背景 */
.stripe {
    background: repeating-linear-gradient(
        45deg,
        #606dbc,
        #606dbc 10px,
        #465298 10px,
        #465298 20px
    );
}
```

---

## L2 实践层：用好

### 最佳实践

| 实践 | 原因 | 示例 |
|------|------|------|
| 使用外部样式表 | 可复用、易维护 | `<link href="style.css">` |
| box-sizing: border-box | 简化尺寸计算 | `* { box-sizing: border-box; }` |
| 类选择器优先 | 灵活、可复用 | `.btn { ... }` |
| 语义化命名 | 易读易理解 | `.card-title { }` |
| 避免过度嵌套 | 性能、可维护 | 不要 `.container .box .item .text` |

### 反模式：不要这样做

```css
/* ❌ 错误：使用行内样式 */
<p style="color: red; font-size: 16px;">
/* 问题：难以维护、无法复用 */

/* ✅ 正确：使用类选择器 */
.text-red { color: red; font-size: 16px; }
<p class="text-red">
```

```css
/* ❌ 错误：使用 ID 选择器样式 */
#title { color: red; }
/* 问题：只能用一次、优先级太高 */

/* ✅ 正确：使用类选择器 */
.title { color: red; }
```

```css
/* ❌ 错误：选择器嵌套过深 */
.container .box .item .text .link { color: red; }
/* 问题：性能差、难以维护 */

/* ✅ 正确：简化选择器 */
.link { color: red; }
/* 或 */
.item-link { color: red; }
```

```css
/* ❌ 错误：过度使用 !important */
.box { color: red !important; }
/* 问题：优先级混乱、难以覆盖 */

/* ✅ 正确：正常优先级 */
.box { color: red; }
```

### 适用场景

| 场景 | 推荐做法 | 原因 |
|------|---------|------|
| 全局样式 | 通配符选择器 | 重置默认样式 |
| 组件样式 | 类选择器 | 可复用 |
| 唯一元素 | ID 选择器 | 页面唯一（如 #header） |
| 状态变化 | 伪类选择器 | hover、focus 等 |

---

## L3 专家层：深入

### 优先级计算

```
优先级计算规则：

选择器                     计算           结果
─────────────────────────────────────────────
*                          0,0,0,0        0
div                        0,0,0,1        1
.class                     0,0,1,0        10
#id                        0,1,0,0        100
style="..."                1,0,0,0        1000

组合选择器：
div p                      0,0,0,2        2
.class p                   0,0,1,1        11
#id .class                 0,1,1,0        110
div#id .class p            0,1,1,2        112

比较规则：从左到右比较，数字越大优先级越高
```

### 浏览器如何处理 CSS

```
CSS 处理流程：

┌──────────────────────────────────────────────────────┐
│  步骤 1：解析 CSS                                     │
│  ───────────                                         │
│  浏览器读取 CSS 文件，解析选择器和属性                 │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  步骤 2：构建 CSSOM 树                                │
│  ───────────                                         │
│  选择器 → 匹配元素 → 计算优先级 → 确定最终样式         │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  步骤 3：与 DOM 合成渲染树                            │
│  ───────────                                         │
│  DOM 树 + CSSOM 树 → 渲染树（包含样式信息）            │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  步骤 4：布局和绘制                                   │
│  ───────────                                         │
│  计算元素位置 → 绘制到屏幕                            │
└──────────────────────────────────────────────────────┘
```

### 设计动机

**为什么 CSS 使用选择器语法？**

| 设计选择 | 原因 | 影响 |
|----------|------|------|
| 选择器语法 | 批量应用样式 | 一个规则美化多个元素 |
| 层叠机制 | 多样式来源可合并 | 用户、作者、浏览器样式共存 |
| 优先级规则 | 解决冲突 | 明确哪个样式生效 |
| 外部样式表 | 分离结构和样式 | HTML 和 CSS 可独立维护 |

---

## 知识关联图

```
CSS 基础知识关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   选择器    │────→│   盒模型    │────→│   布局      │
│   匹配元素  │     │   空间计算  │     │   Flex/Grid │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ↓                   ↓
┌─────────────┐     ┌─────────────┐
│   文本      │     │   背景      │
│   样式      │     │   效果      │
└─────────────┘     └─────────────┘

关联说明：
- 选择器 → 盒模型：选择元素后设置空间大小
- 盒模型 → 布局：理解盒模型才能掌握布局
- 文本/背景：基础的视觉样式设置
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **选择器** | 用于选中 HTML 元素的模式 | `h1`, `.card`, `#header` |
| **属性** | 要设置的样式类型 | `color`, `width`, `margin` |
| **值** | 属性的具体设置值 | `red`, `300px`, `center` |
| **盒模型** | 元素的空间组成（content + padding + border + margin） | 元素的实际占用空间 |
| **content-box** | 标准盒模型，width = 内容宽度 | `box-sizing: content-box` |
| **border-box** | IE 盒模型，width = 内容 + padding + border | `box-sizing: border-box` |
| **优先级** | 样式冲突时的生效顺序规则 | ID > 类 > 元素 |
| **层叠** | 多个样式来源合并的机制 | 外部 + 内部 + 行内样式共存 |
| **伪类** | 元素特殊状态的样式 | `:hover`, `:focus`, `:first-child` |
| **伪元素** | 元素的虚拟部分的样式 | `::before`, `::after` |
| **后代选择器** | 选择所有子孙元素 | `div p` |
| **子元素选择器** | 选择直接子元素 | `div > p` |

---

## 实践练习

### 练习：卡片组件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>卡片组件</title>
    <style>
        /* 全局设置 */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, sans-serif;
            background: #f5f5f5;
            padding: 40px;
        }

        /* 卡片样式 */
        .card {
            width: 300px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .card-image {
            width: 100%;
            height: 150px;
            background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .card-body {
            padding: 20px;
        }

        .card-title {
            color: #333;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .card-text {
            color: #666;
            font-size: 14px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <article class="card">
        <div class="card-image"></div>
        <div class="card-body">
            <h2 class="card-title">卡片标题</h2>
            <p class="card-text">这是卡片的内容描述，使用 CSS 基础样式实现美观的卡片组件。</p>
        </div>
    </article>
</body>
</html>
```

---

## 常见问题

### Q1：em 和 rem 有什么区别？

**原因：** 相对的基准不同。

| 对比 | em | rem |
|------|-----|------|
| 相对对象 | 父元素字体大小 | 根元素（html）字体大小 |
| 计算 | 可能嵌套累积 | 固定基准，不累积 |

```css
html { font-size: 16px; }
.parent { font-size: 20px; }
.child {
    font-size: 1.5em;   /* 20px * 1.5 = 30px */
    font-size: 1.5rem;  /* 16px * 1.5 = 24px */
}
```

### Q2：为什么推荐 box-sizing: border-box？

**原因：** 简化尺寸计算。

| 对比 | content-box | border-box |
|------|-------------|------------|
| width 含义 | 仅内容 | 内容 + padding + border |
| 计算 | 需要手动计算实际宽度 | 设置 width 即最终宽度 |

```css
/* content-box 需要计算 */
.box {
    width: 300px;
    padding: 20px;
    border: 1px;
    /* 实际宽度 = 300 + 40 + 2 = 342px */
}

/* border-box 简化 */
.box {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 1px;
    /* 实际宽度 = 300px */
}
```

### Q3：如何解决外边距合并？

**原因：** 垂直方向相邻的外边距会合并。

**解决：**

```css
/* 方法 1：使用 padding/border 分隔 */
.parent { padding-top: 1px; }

/* 方法 2：创建 BFC */
.parent { overflow: hidden; }
/* 或 */
.parent { display: flow-root; }
```

### Q4：display: none 和 visibility: hidden 有什么区别？

| 属性 | 显示 | 占位 | 事件 |
|------|------|------|------|
| `display: none` | 不显示 | 不占位 | 不触发 |
| `visibility: hidden` | 不显示 | 占位 | 不触发 |
| `opacity: 0` | 不显示 | 占位 | 可触发 |

---

## 学习资源

- [MDN CSS 基础](https://developer.mozilla.org/zh-CN/docs/Learn/CSS) ⭐ 官方权威
- [CSS 选择器参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors)
- [CSS 盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model)
- [Web.dev CSS](https://web.dev/learn/css/)

---

