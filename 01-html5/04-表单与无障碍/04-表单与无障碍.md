# HTML 表单与无障碍 ⭐⭐

> 表单验证、ARIA 属性、无障碍访问

---

## 学习目标

- 掌握 HTML5 表单验证
- 理解无障碍访问（a11y）基础
- 学会使用 ARIA 属性

---

## L1 理解层：会用

### HTML5 表单验证

**最简示例（1-3行）：**

```html
<input type="email" required minlength="5" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
```

**详细示例：**

```html
<form novalidate>
  <!-- 必填 -->
  <label for="name">姓名：</label>
  <input type="text" id="name" required minlength="2" maxlength="50">

  <!-- 邮箱验证 -->
  <label for="email">邮箱：</label>
  <input type="email" id="email" required placeholder="example@mail.com">

  <!-- 数字范围 -->
  <label for="age">年龄：</label>
  <input type="number" id="age" min="0" max="150">

  <!-- 正则验证 -->
  <label for="phone">手机：</label>
  <input type="tel" id="phone" pattern="^1[3-9]\d{9}$" placeholder="11位手机号">

  <!-- 自定义验证 -->
  <label for="password">密码：</label>
  <input type="password" id="password" required minlength="8">
  <span id="password-error" role="alert"></span>

  <button type="submit">提交</button>
</form>

<script>
  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    const pwd = document.getElementById('password')
    if (pwd.value.length < 8) {
      pwd.setCustomValidity('密码至少 8 位')
      document.getElementById('password-error').textContent = pwd.validationMessage
    }
  })
</script>
```

---

### 无障碍基础

**最简示例：**

```html
<!-- 语义化标签 -->
<nav aria-label="主导航">
  <button aria-expanded="false" aria-controls="menu">菜单</button>
  <ul id="menu" role="menu">
    <li role="menuitem"><a href="/">首页</a></li>
  </ul>
</nav>

<!-- 图片描述 -->
<img src="chart.png" alt="2026 年 Q1 销售增长图表">
```

**详细示例：**

```html
<!-- 表单无障碍 -->
<form>
  <fieldset>
    <legend>联系信息</legend>

    <div class="form-group">
      <label for="email">邮箱 <span aria-hidden="true">*</span></label>
      <input type="email" id="email" required
             aria-describedby="email-help"
             aria-invalid="false">
      <span id="email-help" class="help-text">请输入常用邮箱</span>
    </div>
  </fieldset>
</form>

<!-- 跳过导航 -->
<a href="#main-content" class="skip-link">跳到主要内容</a>

<!-- 模态框 -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">确认操作</h2>
  <p>确定要删除吗？</p>
  <button aria-label="确认删除">确定</button>
  <button aria-label="取消操作">取消</button>
</div>
```

---

## L2 实践层：用好

### 表单类型速查

| 类型 | 用途 | 验证 |
|------|------|------|
| `email` | 邮箱 | 自动验证格式 |
| `tel` | 电话 | 配合 pattern |
| `number` | 数字 | min/max/step |
| `url` | 网址 | 自动验证格式 |
| `date` | 日期 | 日期选择器 |
| `file` | 文件 | accept 限制类型 |

### ARIA 属性速查

| 属性 | 用途 | 示例 |
|------|------|------|
| `aria-label` | 无障碍标签 | `aria-label="关闭"` |
| `aria-labelledby` | 引用标签元素 | `aria-labelledby="title-id"` |
| `aria-describedby` | 引用描述文本 | `aria-describedby="help-text"` |
| `aria-expanded` | 展开/折叠状态 | `aria-expanded="true"` |
| `aria-hidden` | 隐藏元素 | `aria-hidden="true"` |
| `role` | 角色定义 | `role="dialog"` |

### 反模式

```html
<!-- ❌ 错误：用 div 当按钮 -->
<div onclick="submit()">提交</div>

<!-- ✅ 正确：用 button -->
<button type="button" onclick="submit()">提交</button>

<!-- ❌ 错误：图片没有 alt -->
<img src="logo.png">

<!-- ✅ 正确：添加描述 -->
<img src="logo.png" alt="公司 Logo">

<!-- ❌ 错误：颜色作为唯一信息传递方式 -->
<span style="color: red">必填字段</span>

<!-- ✅ 正确：用文字 + 颜色 -->
<span>必填字段 <span aria-hidden="true">*</span></span>
```

---

## L3 专家层：深入

### 无障碍测试工具

| 工具 | 用途 |
|------|------|
| Lighthouse | 自动化审计 |
| axe DevTools | 浏览器插件检测 |
| VoiceOver | macOS 屏幕阅读器 |
| NVDA | Windows 屏幕阅读器 |

### 知识关联

```
表单与无障碍关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  表单验证   │────→│  语义化标签 │────→│  ARIA 属性  │
│  HTML5/     │     │  nav/       │     │  label/     │
│  自定义验证 │     │  main/      │     │  role/      │
│             │     │  article    │     │  aria-*     │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## 学习资源

- [MDN 表单](https://developer.mozilla.org/zh-CN/docs/Learn/Forms) ⭐ 官方权威
- [WAI-ARIA 无障碍指南](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM 对比度检查器](https://webaim.org/resources/contrastchecker/)
