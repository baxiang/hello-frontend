# CSS3 布局相关 ⭐⭐

> Flexbox、Grid、定位与变换

---

## 学习目标

- 掌握 Flexbox 弹性布局的核心用法
- 理解 Grid 网格布局的强大功能
- 学会 position 定位的各种场景
- 了解 transform 变换的应用

---

## 生活化比喻

**CSS 布局就像"家具摆放"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                    家具摆放                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│    Flexbox = 弹性摆放                                │
│    ─────────────────                                │
│    家具自动调整位置和大小                             │
│    - 沙发自动排成一行                                │
│    - 大沙发占更多空间                                │
│    - 挤满了自动换行                                  │
│                                                      │
│    Grid = 网格规划                                   │
│    ───────────────                                  │
│    房间划分为网格格子                                 │
│    - 每个格子放特定家具                              │
│    - 大家具可以占多个格子                            │
│    - 精确控制每个位置                                │
│                                                      │
│    Position = 特殊位置                               │
│    ───────────────                                  │
│    家具摆放在特殊位置                                 │
│    - 画框固定在墙上                                  │
│    - 落地灯随房间移动                                │
│    - 吊灯固定在天花板                                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 2.1 Flexbox 弹性布局

**语法结构图：**

```
Flexbox 结构：

容器属性：                          项目属性：
──────────                          ──────────
display: flex                       flex-grow: 放大比例
flex-direction: 方向                flex-shrink: 缩小比例
flex-wrap: 换行                     flex-basis: 基础大小
justify-content: 主轴对齐           flex: 简写
align-items: 交叉轴对齐             align-self: 单个项目对齐
align-content: 多行对齐             order: 排序

主轴方向：
row        → 水平（默认）
column     → 垂直
row-reverse → 水平反向
column-reverse → 垂直反向
```

**最简示例：**

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

**详细示例：**

```css
/* 容器属性 */
.container {
    display: flex;

    /* 主轴方向 */
    flex-direction: row;            /* 默认，水平 */
    flex-direction: column;         /* 垂直 */

    /* 换行 */
    flex-wrap: nowrap;    /* 默认，不换行 */
    flex-wrap: wrap;      /* 换行 */

    /* 主轴对齐 */
    justify-content: flex-start;     /* 起点 */
    justify-content: center;         /* 居中 */
    justify-content: flex-end;       /* 终点 */
    justify-content: space-between;  /* 两端对齐 */
    justify-content: space-around;   /* 平均分布 */

    /* 交叉轴对齐 */
    align-items: stretch;   /* 默认，拉伸 */
    align-items: center;    /* 居中 */
    align-items: flex-start;/* 起点 */
}

/* 项目属性 */
.item {
    /* 放大缩小 */
    flex-grow: 0;      /* 默认不放大 */
    flex-shrink: 1;    /* 默认缩小 */
    flex-basis: auto;  /* 默认自动 */

    /* 简写 */
    flex: 1;           /* 等价于 1 1 0% */

    /* 单独对齐 */
    align-self: center;
}
```

---

### 2.2 Grid 网格布局

**语法结构图：**

```
Grid 结构：

容器属性：                          项目属性：
──────────                          ──────────
display: grid                       grid-column: 列位置
grid-template-columns: 列定义       grid-row: 行位置
grid-template-rows: 行定义          grid-area: 区域命名
grid-template-areas: 区域命名       justify-self: 水平对齐
gap: 间隙                           align-self: 垂直对齐

列定义方式：
grid-template-columns: 200px 200px 200px;  /* 固定宽度 */
grid-template-columns: repeat(3, 1fr);      /* 等分 */
grid-template-columns: 1fr 2fr 1fr;         /* 比例 */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 自适应 */
```

**最简示例：**

```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

**详细示例：**

```css
/* 容器属性 */
.grid {
    display: grid;

    /* 定义列 */
    grid-template-columns: 200px 200px 200px;
    grid-template-columns: repeat(3, 1fr);  /* 3 等分 */
    grid-template-columns: 1fr 2fr 1fr;     /* 1:2:1 比例 */

    /* 定义行 */
    grid-template-rows: 100px auto;

    /* 定义区域 */
    grid-template-areas:
        "header header header"
        "sidebar main aside"
        "footer footer footer";

    /* 间隙 */
    gap: 20px;
}

/* 项目属性 */
.item {
    /* 起始位置 */
    grid-column: 1 / 3;    /* 跨 2 列 */
    grid-row: 1 / 2;       /* 跨 1 行 */
    grid-column: span 2;   /* 跨 2 列 */

    /* 区域命名 */
    grid-area: header;

    /* 自对齐 */
    justify-self: center;
    align-self: center;
}

/* 区域命名布局 */
.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

---

### 2.3 Position 定位

**语法结构图：**

```
定位类型：

position: static    → 静态（默认）
position: relative  → 相对定位（相对自身原位置）
position: absolute  → 绝对定位（相对最近的非 static 祖先）
position: fixed     → 固定定位（相对视口）
position: sticky    → 病性定位（滚动后固定）

偏移属性：
top, right, bottom, left

层叠顺序：
z-index: 数字（越大越在上层）
```

**最简示例：**

```css
.relative { position: relative; top: 20px; }
.absolute { position: absolute; top: 0; right: 0; }
.fixed { position: fixed; top: 0; left: 0; }
```

**详细示例：**

```css
/* 静态定位（默认） */
.static {
    position: static;
}

/* 相对定位 */
.relative {
    position: relative;
    top: 20px;
    left: 30px;
}

/* 绝对定位 */
.parent {
    position: relative;  /* 创建定位参考 */
}
.absolute {
    position: absolute;
    top: 0;
    right: 0;
}

/* 固定定位 */
.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
}

/* 病性定位 */
.sticky-nav {
    position: sticky;
    top: 0;
    background: #fff;
}

/* 层叠 */
.layer-1 { z-index: 1; }
.layer-2 { z-index: 10; }
```

---

### 2.4 Transform 变换

**语法结构图：**

```
变换类型：

2D 变换：                           3D 变换：
────────                            ───────
translate(x, y) → 平移              translateZ(z)
scale(x, y) → 缩放                  rotateX(deg)
rotate(deg) → 旋转                  rotateY(deg)
skew(deg) → 倾斜                    rotateZ(deg)

变换原点：
transform-origin: center center;  /* 默认中心 */
transform-origin: top left;       /* 左上角 */
```

**最简示例：**

```css
.translate { transform: translate(50px, 100px); }
.scale { transform: scale(1.5); }
.rotate { transform: rotate(45deg); }
```

**详细示例：**

```css
/* 平移 */
.translate {
    transform: translate(50px, 100px);
    transform: translateX(50px);
    transform: translateY(50px);
}

/* 缩放 */
.scale {
    transform: scale(1.5);      /* 放大 1.5 倍 */
    transform: scale(0.5);      /* 缩小 */
    transform: scaleX(2);       /* X 轴放大 */
    transform: scale(-1, 1);    /* 水平翻转 */
}

/* 旋转 */
.rotate {
    transform: rotate(45deg);   /* 顺时针 */
    transform: rotate(-45deg);  /* 逆时针 */
}

/* 倾斜 */
.skew {
    transform: skew(30deg, 20deg);
}

/* 多重变换 */
.complex {
    transform: translateX(100px) scale(1.5) rotate(45deg);
}

/* 变换原点 */
.box {
    transform-origin: center center;  /* 默认 */
    transform-origin: top left;
    transform-origin: 50% 50%;
}
```

---

## L2 实践层：用好

### 最佳实践

| 实践 | 原因 | 示例 |
|------|------|------|
| Flexbox 用于一维布局 | 简单、弹性 | 导航栏、卡片列表 |
| Grid 用于二维布局 | 强大、精确 | 整体页面布局 |
| flex: 1 实现等分 | 自动分配空间 | `.item { flex: 1; }` |
| position: relative 创建定位参考 | 子元素 absolute 需要 | `.parent { position: relative; }` |
| transform 不触发重排 | 性能更好 | 避免用 top/left 做动画 |

### 反模式：不要这样做

```css
/* ❌ 错误：滥用 Flexbox 做复杂二维布局 */
.container {
    display: flex;
    flex-direction: column;
}
.row {
    display: flex;
}
/* 问题：嵌套复杂，不如用 Grid */

/* ✅ 正确：用 Grid */
.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
```

```css
/* ❌ 错误：absolute 无定位参考 */
.child {
    position: absolute;
    top: 0;
}
/* 问题：相对 body 定位，不符合预期 */

/* ✅ 正确：父元素设置 relative */
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 0;
}
```

```css
/* ❌ 错误：用 top/left 做动画 */
.box {
    transition: top 0.3s;
}
/* 问题：触发重排，性能差 */

/* ✅ 正确：用 transform */
.box {
    transition: transform 0.3s;
}
.box:hover {
    transform: translateY(10px);
}
```

### 适用场景

| 场景 | 推荐做法 | 原因 |
|------|---------|------|
| 导航栏 | Flexbox | 一行排列，简单 |
| 卡片网格 | Grid | 多行多列，精确控制 |
| 页面整体布局 | Grid | 复杂结构一目了然 |
| 弹窗居中 | Flexbox + absolute | 居中简单 |
| 角标 | absolute | 相对父元素定位 |

---

## L3 专家层：深入

### Flexbox vs Grid 选择

```
布局选择判断：

┌──────────────────────────────────────────────────────┐
│                                                      │
│  问题：需要什么类型的布局？                           │
│                                                      │
│  ├─ 一维布局（行 或 列）                              │
│  │   └─ YES → Flexbox                               │
│  │                                                   │
│  ├─ 二维布局（行 和 列）                              │
│  │   └─ YES → Grid                                  │
│  │                                                   │
│  ├─ 内容驱动（项目大小决定布局）                      │
│  │   └─ YES → Flexbox                               │
│  │                                                   │
│  ├─ 布局驱动（先规划格子再放内容）                    │
│  │   └─ YES → Grid                                  │
│  │                                                   │
└──────────────────────────────────────────────────────┘
```

### 居中方案对比

```
居中方案：

┌──────────────────────────────────────────────────────┐
│                                                      │
│  方案 1：Flexbox（推荐）                              │
│  ───────────────                                     │
│  .parent {                                           │
│      display: flex;                                  │
│      justify-content: center;                        │
│      align-items: center;                            │
│  }                                                   │
│                                                      │
│  方案 2：Grid（最简洁）                               │
│  ───────────────                                     │
│  .parent {                                           │
│      display: grid;                                  │
│      place-items: center;                            │
│  }                                                   │
│                                                      │
│  方案 3：绝对定位                                     │
│  ───────────────                                     │
│  .parent { position: relative; }                     │
│  .child {                                            │
│      position: absolute;                             │
│      top: 50%; left: 50%;                           │
│      transform: translate(-50%, -50%);               │
│  }                                                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 层叠上下文

```
层叠上下文创建条件：

┌──────────────────────────────────────────────────────┐
│                                                      │
│  以下属性会创建新的层叠上下文：                        │
│                                                      │
│  ├─ position: absolute/relative + z-index 非 auto   │
│  ├─ position: fixed/sticky                          │
│  ├─ opacity < 1                                     │
│  ├─ transform 非 none                               │
│  ├─ filter 非 none                                  │
│  ├─ isolation: isolate                              │
│  └─ will-change                                     │
│                                                      │
│  子元素的 z-index 只在父级上下文内有效                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 知识关联图

```
布局知识关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   盒模型    │────→│   Flexbox   │────→│   组件      │
│   空间计算  │     │   一维布局  │     │   布局      │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ↓                   ↓
┌─────────────┐     ┌─────────────┐
│   Grid      │     │   Position  │
│   二维布局  │     │   特殊定位  │
└─────────────┘     └─────────────┘

关联说明：
- 盒模型 → Flexbox/Grid：理解空间才能布局
- Flexbox → 组件：组件内部常用 Flexbox
- Grid → 页面：整体页面布局用 Grid
- Position → 特殊场景：弹窗、角标等
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **Flexbox** | 弹性盒子布局，一维布局方案 | `display: flex` |
| **主轴** | Flexbox 的主要方向轴 | `flex-direction: row` 时主轴是水平 |
| **交叉轴** | Flexbox 的次要方向轴 | 与主轴垂直的轴 |
| **Grid** | 网格布局，二维布局方案 | `display: grid` |
| **fr** | Grid 的弹性单位，表示比例 | `grid-template-columns: 1fr 2fr` |
| **grid-area** | Grid 区域命名 | `grid-area: header` |
| **position** | 定位方式 | `static, relative, absolute, fixed, sticky` |
| **z-index** | 层叠顺序 | `z-index: 10` |
| **transform** | 变换效果 | `translate, scale, rotate` |
| **层叠上下文** | z-index 的作用范围 | 子元素只在父级上下文内有效 |

---

## 实践练习

### 练习：导航栏布局

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>导航栏布局</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, sans-serif;
        }

        /* 导航栏：Flexbox 布局 */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            background: #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .logo {
            font-size: 20px;
            font-weight: 700;
            color: #007bff;
        }

        .nav-links {
            display: flex;
            gap: 32px;
            list-style: none;
        }

        .nav-links a {
            text-decoration: none;
            color: #333;
        }

        .nav-links a:hover {
            color: #007bff;
        }

        .nav-actions {
            display: flex;
            gap: 16px;
        }

        .btn {
            padding: 8px 20px;
            border-radius: 6px;
            text-decoration: none;
        }

        .btn-primary {
            background: #007bff;
            color: #fff;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="#" class="logo">Brand</a>
        <ul class="nav-links">
            <li><a href="#">首页</a></li>
            <li><a href="#">产品</a></li>
            <li><a href="#">关于</a></li>
        </ul>
        <div class="nav-actions">
            <a href="#" class="btn btn-primary">登录</a>
        </div>
    </nav>
</body>
</html>
```

---

## 常见问题

### Q1：Flexbox 和 Grid 如何选择？

**原因：** 布局维度不同。

| 对比 | Flexbox | Grid |
|------|---------|------|
| 维度 | 一维（行或列） | 二维（行和列） |
| 适用 | 组件内部 | 整体页面 |
| 控制 | 内容驱动 | 布局驱动 |

**判断：** 一维用 Flexbox，二维用 Grid。

### Q2：如何实现水平垂直居中？

**原因：** 多种方案可选。

```css
/* 方案 1：Flexbox（最常用） */
.parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 方案 2：Grid（最简洁） */
.parent {
    display: grid;
    place-items: center;
}
```

### Q3：position: absolute 相对谁定位？

**原因：** 相对最近的非 static 祖先。

**解决：**
```css
/* 父元素必须设置定位 */
.parent {
    position: relative;  /* 创建定位参考 */
}
.child {
    position: absolute;
    top: 0;  /* 相对 parent 定位 */
}
```

### Q4：为什么推荐用 transform 做动画？

**原因：** 性能更好。

| 方式 | 性能 | 原因 |
|------|------|------|
| top/left | 差 | 触发重排 |
| transform | 好 | 只触发重绘 |

---

## 学习资源

- [MDN Flexbox 指南](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Flexbox) ⭐ 官方权威
- [MDN Grid 指南](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Grids)
- [Flexbox Froggy](https://flexboxfroggy.com/) - 游戏学 Flexbox
- [Grid Garden](https://cssgridgarden.com/) - 游戏学 Grid

---

