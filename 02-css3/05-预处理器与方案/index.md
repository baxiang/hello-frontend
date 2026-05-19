# CSS 预处理器与现代方案 ⭐⭐

> Sass、Tailwind、CSS Modules、CSS-in-JS

---

## 学习目标

- 掌握 Sass 的基本用法
- 学会 Tailwind CSS 快速开发
- 理解 CSS Modules 和 CSS-in-JS

---

## L1 理解层：会用

### Sass 基础

**最简示例（1-3行）：**

```scss
$primary: #3b82f6;
.btn { background: $primary; &:hover { background: darken($primary, 10%); } }
```

**详细示例：**

```scss
// 变量
$primary: #3b82f6;
$spacing: 1rem;
$breakpoint: 768px;

// 嵌套
.card {
  padding: $spacing;
  border-radius: 8px;

  &__title {
    font-size: 1.25rem;
    color: $primary;
  }

  &--featured {
    border: 2px solid $primary;
  }

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

// Mixin
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  @include flex-center;
}

// 继承
%btn-base {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  @extend %btn-base;
  background: $primary;
  color: white;
}

// 函数
@function rem($px) {
  @return $px / 16 * 1rem;
}

.card { padding: rem(16); }
```

---

### Tailwind CSS

**最简示例（1-3行）：**

```html
<div class="p-4 bg-white rounded-lg shadow-md">内容</div>
```

**详细示例：**

```html
<!-- 响应式 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4 bg-white rounded shadow hover:shadow-lg transition">
    <h3 class="text-lg font-semibold text-gray-800">卡片标题</h3>
    <p class="text-gray-600 mt-2">卡片内容</p>
  </div>
</div>

<!-- 状态变体 -->
<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 disabled:opacity-50">
  按钮
</button>

<!-- 自定义配置（tailwind.config.js） -->
module.exports = {
  theme: {
    extend: {
      colors: { primary: '#3b82f6' },
      spacing: { '72': '18rem' }
    }
  }
}
```

---

### CSS Modules

```css
/* Button.module.css */
.button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.primary {
  composes: button;
  background: #3b82f6;
  color: white;
}
```

```tsx
// React 中使用
import styles from './Button.module.css'
function Button() {
  return <button className={styles.primary}>点击</button>
}
```

---

## L2 实践层：用好

### 方案对比

| 方案 | 优点 | 适用场景 |
|------|------|---------|
| Sass | 功能强大，生态成熟 | 传统项目、复杂样式 |
| Tailwind | 快速开发，一致性好 | 新项目、原型开发 |
| CSS Modules | 作用域隔离 | React/Vue 组件 |
| CSS-in-JS | 动态样式，主题切换 | 复杂交互组件 |

### 反模式

```scss
// ❌ 错误：过度嵌套（超过 3 层）
.page {
  .header {
    .nav {
      .menu {
        .item {  /* 太深了！ */ }
      }
    }
  }
}

// ✅ 正确：扁平化
.page { }
.page-header { }
.page-nav { }
.nav-menu { }
.menu-item { }
```

---

## 学习资源

- [Sass 官方文档](https://sass-lang.com/) ⭐ 官方权威
- [Tailwind CSS](https://tailwindcss.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
