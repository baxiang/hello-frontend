# CSS3 动画与过渡 ⭐⭐

> transition、animation、transform 变换效果

---

## 学习目标

- 掌握 transition 过渡的基本用法
- 理解 animation 动画的核心概念
- 学会 keyframes 关键帧的定义
- 了解性能优化的最佳实践

---

## 生活化比喻

**CSS 动画就像"灯光渐变效果"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                    灯光效果                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│    transition = 灯光渐变                             │
│    ───────────────                                  │
│    开灯时亮度逐渐增加                                │
│    - 从暗到亮，平滑过渡                              │
│    - 用户触发（开灯按钮）                            │
│    - 只有始末两个状态                                │
│                                                      │
│    animation = 灯光表演                              │
│    ───────────────                                  │
│    灯光按预设程序变化                                │
│    - 自动播放，无需触发                              │
│    - 可循环播放                                      │
│    - 多个关键帧（暗→亮→闪烁→暗）                     │
│                                                      │
│    transform = 灯光位置                              │
│    ───────────────                                  │
│    灯光的位置和形态变化                              │
│    - 移动位置、改变大小、旋转角度                    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 3.1 transition 过渡

**语法结构图：**

```
过渡结构：

transition: 属性 时长 时序函数 延迟时间;
             │      │      │         │
             │      │      │         └─ 延迟多久开始
             │      │      └─ 速度曲线（ease/linear）
             │      └─ 动画持续时间（0.3s）
             └─ 哪个属性变化（all/具体属性）

时序函数：
ease        → 慢-快-慢（默认）
linear      → 匀速
ease-in     → 慢-快
ease-out    → 快-慢
ease-in-out → 慢-快-慢
```

**最简示例：**

```css
.box {
    transition: all 0.3s ease;
}
```

**详细示例：**

```css
.box {
    /* 单个属性 */
    transition: transform 0.3s ease;

    /* 多个属性 */
    transition:
        transform 0.3s ease,
        opacity 0.2s linear;

    /* 分拆写法 */
    transition-property: transform;
    transition-duration: 0.3s;
    transition-timing-function: ease;
}

/* 配合状态变化 */
.box:hover {
    transform: scale(1.1);
    opacity: 0.8;
}
```

---

### 3.2 animation 动画

**语法结构图：**

```
动画结构：

@keyframes 动画名 {
    from { 状态1 }          ← 起始状态
    to { 状态2 }            ← 结束状态
}

或：

@keyframes 动画名 {
    0% { 状态1 }
    50% { 状态2 }
    100% { 状态3 }
}

使用动画：
animation: 名称 时长 时序 延迟 次数 方向 填充;
```

**最简示例：**

```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.box {
    animation: fadeIn 0.5s ease;
}
```

**详细示例：**

```css
/* 定义关键帧 */
@keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
    100% { transform: translateY(0); }
}

/* 使用动画 */
.box {
    animation: bounce 1s ease-in-out infinite;
}

/* 暂停动画 */
.box:hover {
    animation-play-state: paused;
}
```

---

### 3.3 transform 变换

**语法结构图：**

```
变换类型：

2D 变换                         3D 变换
────────                        ───────
translate(x, y) → 平移          translateZ(z)
scale(x, y) → 缩放              rotateX(deg)
rotate(deg) → 旋转              rotateY(deg)
skew(deg) → 倾斜                perspective

变换原点：
transform-origin: center center;  /* 默认 */
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
.move {
    transform: translateX(50px);
    transform: translateY(50px);
}

/* 缩放 */
.zoom {
    transform: scale(1.5);
    transform: scale(-1, 1);  /* 水平翻转 */
}

/* 旋转 */
.turn {
    transform: rotate(45deg);
}

/* 组合变换 */
.complex {
    transform: translateX(100px) scale(1.5) rotate(45deg);
}
```

---

## L2 实践层：用好

### 最佳实践

| 实践 | 原因 | 示例 |
|------|------|------|
| transform 做动画 | 不触发重排，性能好 | `transform: translateY(10px)` |
| will-change 提示 | 浏览器提前优化 | `will-change: transform` |
| 避免动画太多属性 | 性能下降 | 只动画 transform/opacity |
| prefers-reduced-motion | 无障碍友好 | 响应用户偏好 |

### 反模式：不要这样做

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
    transform: translateY(100px);
}
```

```css
/* ❌ 错误：忽略无障碍 */
.box {
    animation: pulse 1s infinite;
}

/* ✅ 正确：响应用户偏好 */
@media (prefers-reduced-motion: reduce) {
    .box {
        animation: none;
    }
}
```

### 适用场景

| 场景 | 推荐做法 | 原因 |
|------|---------|------|
| 悬停效果 | transition | 简单、状态驱动 |
| 加载动画 | animation | 自动播放、可循环 |
| 移动/缩放 | transform | 性能最好 |

---

## L3 专家层：深入

### transition vs animation

```
对比判断：

┌──────────────────────────────────────────────────────┐
│  问题：需要什么类型的动画？                           │
│                                                      │
│  ├─ 状态变化触发（hover、focus）                      │
│  │   └─ YES → transition                            │
│                                                      │
│  ├─ 自动播放、循环                                   │
│  │   └─ YES → animation                             │
│                                                      │
│  ├─ 只需要始末两个状态                               │
│  │   └─ YES → transition                            │
│                                                      │
│  ├─ 需要多个中间状态                                 │
│  │   └─ YES → animation                             │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 动画性能原理

```
渲染性能对比：

重排（Reflow）: 改变几何属性 → 重新计算布局 → 性能差
重绘（Repaint）: 改变视觉属性 → 只更新外观 → 性能中等
合成（Composite）: transform/opacity → 只在合成层处理 → 性能最好
```

### 性能优化技巧

```css
/* 提示浏览器优化 */
.animated {
    will-change: transform, opacity;
}

/* GPU 加速 */
.gpu {
    transform: translateZ(0);
    backface-visibility: hidden;
}

/* 响应用户偏好 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms;
        transition-duration: 0.01ms;
    }
}
```

---

## 知识关联图

```
动画知识关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  transition │────→│  animation  │────→│  性能优化   │
│  状态过渡   │     │  关键帧动画 │     │  最佳实践   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       ↓                   ↓
┌─────────────┐     ┌─────────────┐
│  transform  │     │  交互效果   │
│  变换效果   │     │  悬停动画   │
└─────────────┘     └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **transition** | 过渡效果，状态变化时的平滑动画 | `transition: all 0.3s` |
| **animation** | 动画效果，可自动播放、循环 | `animation: spin 1s infinite` |
| **keyframes** | 关键帧，定义动画的多个状态 | `@keyframes bounce { ... }` |
| **transform** | 变换效果，移动/缩放/旋转 | `transform: scale(1.5)` |
| **timing-function** | 时序函数，控制动画速度曲线 | `ease, linear` |
| **will-change** | 性能提示 | `will-change: transform` |

---

## 实践练习

### 练习：加载动画组件

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS 动画练习</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, sans-serif;
            background: #1a1a2e;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 60px;
        }

        /* 练习 1：弹跳加载动画 */
        .loader-bounce {
            display: flex;
            gap: 8px;
        }

        .loader-bounce span {
            width: 12px;
            height: 12px;
            background: #e94560;
            border-radius: 50%;
            animation: bounce 1.4s ease-in-out infinite;
        }

        .loader-bounce span:nth-child(2) { animation-delay: 0.2s; }
        .loader-bounce span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }

        /* 练习 2：旋转加载动画 */
        .loader-spin {
            width: 48px;
            height: 48px;
            border: 4px solid rgba(233, 69, 96, 0.2);
            border-top-color: #e94560;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* 练习 3：悬停卡片动画 */
        .card {
            width: 200px;
            height: 120px;
            background: #16213e;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #e94560;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(233, 69, 96, 0.3);
        }

        /* 练习 4：脉冲按钮 */
        .btn-pulse {
            padding: 14px 32px;
            background: #e94560;
            color: #fff;
            border: none;
            border-radius: 30px;
            font-size: 16px;
            cursor: pointer;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(233, 69, 96, 0.4); }
            50% { box-shadow: 0 0 0 12px rgba(233, 69, 96, 0); }
        }
    </style>
</head>
<body>
    <!-- 弹跳加载 -->
    <div class="loader-bounce">
        <span></span><span></span><span></span>
    </div>

    <!-- 旋转加载 -->
    <div class="loader-spin"></div>

    <!-- 悬停卡片 -->
    <div class="card">悬停看我</div>

    <!-- 脉冲按钮 -->
    <button class="btn-pulse">点击按钮</button>
</body>
</html>
```

---

## 常见问题

### Q1：transition 和 animation 有什么区别？

| 对比 | transition | animation |
|------|-----------|-----------|
| 触发方式 | 状态变化（hover） | 自动播放 |
| 循环播放 | 不支持 | 支持 |
| 关键帧 | 只有始末状态 | 多关键帧 |

### Q2：为什么推荐用 transform 做动画？

| 属性 | 渲染影响 | 性能 |
|------|---------|------|
| width/height/top/left | 重排 | 差 |
| transform/opacity | 合成 | 好 |

### Q3：如何暂停动画？

```css
.paused {
    animation-play-state: paused;
}
```

---

## 学习资源

- [MDN CSS 动画](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Howto/CSS_animations) ⭐ 官方权威
- [Animate.css](https://animate.style/) - 现成的动画库
- [Animista](https://animista.net/) - 在线生成动画

---