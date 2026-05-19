# HTML5 表单详解 ⭐⭐

> 表单元素、输入类型、验证与无障碍设计

---

## 学习目标

- 掌握表单的基本结构和常用控件
- 理解 HTML5 新增的输入类型
- 学会表单验证和无障碍设计
- 能实现一个完整的注册表单

---

## 生活化比喻

**表单就像"填写的申请表"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                    申请表                            │
├──────────────────────────────────────────────────────┤
│                                                      │
│    <form>                →    整张表格               │
│    │                                                │
│    ├─ <label>            →    标题栏（姓名、电话）    │
│    ├─ <input>            →    填写格子               │
│    │   - type="text"     →    普通格子               │
│    │   - type="email"    →    邮箱格子（有格式要求）  │
│    │   - type="password" →    隐藏格子（看不到内容）  │
│    │                                                │
│    ├─ <select>           →    下拉选择框             │
│    ├─ <checkbox>         →    复选框（勾选同意）     │
│    ├─ <radio>            →    单选框（男/女）        │
│    │                                                │
│    └─ <button>           →    提交按钮               │
│                                                      │
│    提交 → 表格数据发送给服务器处理                    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

### 2.1 表单基本结构

**语法结构图：**

```
表单结构：

<form action="提交地址" method="提交方式">
    │                │               │
    │                │               └─ GET（参数在URL）
    │                │                  POST（参数在请求体）
    │                └─ 服务器处理地址
    │
    ├─ <label>           ← 标签（说明文字）
    │     └─ for="id"    ← 关联输入框
    │
    ├─ <input>           ← 输入框
    │     ├─ type        ← 输入类型
    │     ├─ name        ← 字段名（提交给服务器）
    │     ├─ id          ← 唯一标识（label关联）
    │     └─ value       ← 默认值
    │
    └─ <button>          ← 提交按钮
         └─ type="submit" ← 提交表单
</form>
```

**最简示例（1-3行）：**

```html
<form>
    <input type="text" name="username">
    <button type="submit">提交</button>
</form>
```

**详细示例：**

```html
<form action="/api/register" method="POST">
    <label for="username">用户名：</label>
    <input type="text" id="username" name="username" required>

    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email" required>

    <button type="submit">注册</button>
</form>
```

---

### 2.2 输入类型

**语法结构图：**

```
输入类型一览：

文本类                          数值类                         选择类
────────                        ───────                        ───────
type="text"     → 普通文本      type="number"  → 数字          type="checkbox" → 多选
type="password" → 密码（隐藏）  type="range"   → 滑块          type="radio"    → 单选
type="email"    → 邮箱（验证）                                type="file"     → 文件
type="tel"      → 电话
type="url"      → 网址          时间类                         其他
type="search"   → 搜索          ───────                        ───────
                               type="date"    → 日期          type="color" → 颜色
                               type="time"    → 时间          type="hidden" → 隐藏
                               type="month"   → 年月
                               type="week"    → 周
                               type="datetime-local" → 日期时间
```

**最简示例：**

```html
<!-- 文本 -->
<input type="text" name="name">
<input type="email" name="email">
<input type="password" name="pwd">

<!-- 数值 -->
<input type="number" name="age" min="0" max="100">

<!-- 选择 -->
<input type="checkbox" name="agree">
<input type="radio" name="gender" value="male">
```

**详细示例：**

```html
<!-- 文本输入 -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username"
       placeholder="请输入用户名" required>

<label for="email">邮箱：</label>
<input type="email" id="email" name="email"
       placeholder="example@mail.com" required>

<label for="password">密码：</label>
<input type="password" id="password" name="password"
       minlength="8" required>

<!-- 数值输入 -->
<label for="age">年龄：</label>
<input type="number" id="age" name="age"
       min="0" max="120" step="1">

<label for="volume">音量：</label>
<input type="range" id="volume" name="volume"
       min="0" max="100" value="50">

<!-- 时间输入 -->
<label for="birthday">生日：</label>
<input type="date" id="birthday" name="birthday">

<!-- 复选框 -->
<input type="checkbox" id="agree" name="agree" value="yes">
<label for="agree">同意用户协议</label>

<!-- 单选框 -->
<input type="radio" id="male" name="gender" value="male">
<label for="male">男</label>
<input type="radio" id="female" name="gender" value="female">
<label for="female">女</label>

<!-- 文件上传 -->
<label for="avatar">头像：</label>
<input type="file" id="avatar" name="avatar" accept="image/*">

<!-- 颜色选择 -->
<label for="color">颜色：</label>
<input type="color" id="color" name="color" value="#ff0000">
```

---

### 2.3 验证属性

**语法结构图：**

```
验证属性：

<input
    required            ← 必填（不能为空）
    minlength="3"       ← 最小长度
    maxlength="20"      ← 最大长度
    min="0"             ← 最小值（数值）
    max="100"           ← 最大值（数值）
    pattern="正则"      ← 格式验证
    title="提示文字"    ← 验证失败提示
>
```

**最简示例：**

```html
<input type="text" name="name" required>
<input type="text" name="name" minlength="3">
<input type="email" name="email" required>
```

**详细示例：**

```html
<!-- 必填验证 -->
<input type="text" name="username" required>

<!-- 长度验证 -->
<input type="text" name="username" minlength="3" maxlength="20">

<!-- 范围验证 -->
<input type="number" name="age" min="18" max="100">

<!-- 正则验证 -->
<input type="text" name="phone"
       pattern="^1[3-9]\d{9}$"
       title="请输入正确的手机号">
```

---

### 2.4 下拉选择

**语法结构图：**

```
下拉选择结构：

<select name="字段名">              ← 下拉框
    ├─ <optgroup label="分组名">   ← 可选：分组
    │    ├─ <option value="值1">选项1</option>
    │    └─ <option value="值2">选项2</option>
    │
    └─ <option value="值">选项</option>
         └─ selected               ← 默认选中
</select>
```

**最简示例：**

```html
<select name="city">
    <option value="bj">北京</option>
    <option value="sh">上海</option>
</select>
```

**详细示例：**

```html
<!-- 基础下拉 -->
<label for="city">城市：</label>
<select id="city" name="city">
    <option value="">请选择</option>
    <option value="bj">北京</option>
    <option value="sh" selected>上海</option>
    <option value="gz">广州</option>
</select>

<!-- 分组下拉 -->
<select name="product">
    <optgroup label="水果">
        <option value="apple">苹果</option>
        <option value="banana">香蕉</option>
    </optgroup>
    <optgroup label="蔬菜">
        <option value="tomato">西红柿</option>
    </optgroup>
</select>
```

---

## L2 实践层：用好

### 最佳实践

| 实践 | 原因 | 示例 |
|------|------|------|
| label 必须关联 | 无障碍访问、点击区域更大 | `<label for="email">` |
| name 属性必须写 | 服务器接收数据需要 | `name="username"` |
| required 用在必填项 | 浏览器自动验证 | `required` |
| autocomplete 正确设置 | 浏览器自动填充更友好 | `autocomplete="email"` |
| type 选择正确类型 | 移动端键盘适配、自动验证 | `type="email"` |

### 反模式：不要这样做

```html
<!-- ❌ 错误：无 label -->
<input type="text" name="username">
<!-- 问题：无障碍访问失败，点击区域小 -->

<!-- ✅ 正确：有 label -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username">
```

```html
<!-- ❌ 错误：无 name -->
<input type="text" id="username">
<!-- 问题：服务器无法接收这个字段的值 -->

<!-- ✅ 正确：有 name -->
<input type="text" id="username" name="username">
```

```html
<!-- ❌ 错误：type 不正确 -->
<input type="text" name="email">
<!-- 问题：无格式验证，移动端键盘不友好 -->

<!-- ✅ 正确：type 正确 -->
<input type="email" name="email">
<!-- 优点：自动验证格式，移动端显示邮箱键盘 -->
```

```html
<!-- ❌ 错误：GET 提交敏感数据 -->
<form method="GET">
    <input type="password" name="password">
</form>
<!-- 问题：密码出现在 URL 中，不安全 -->

<!-- ✅ 正确：POST 提交敏感数据 -->
<form method="POST">
    <input type="password" name="password">
</form>
```

### 适用场景

| 场景 | 推荐做法 | 原因 |
|------|---------|------|
| 登录表单 | POST + type="email/password" | 安全性、格式验证 |
| 搜索框 | GET + type="search" | 可收藏、搜索键盘 |
| 注册表单 | POST + 验证属性 | 安全性、数据校验 |
| 文件上传 | POST + enctype="multipart/form-data" | 必须此编码 |
| 简单筛选 | GET + select | 可收藏链接 |

---

## L3 专家层：深入

### 浏览器如何处理表单

```
表单提交流程：

┌──────────────────────────────────────────────────────┐
│  步骤 1：用户填写表单                                 │
│  ───────────────────                                 │
│  浏览器实时验证（required、pattern、type）            │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  步骤 2：点击提交按钮                                  │
│  ───────────────────                                 │
│  浏览器检查所有验证属性                                │
│  - 有错误：阻止提交，显示错误提示                      │
│  - 无错误：继续提交                                   │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  步骤 3：构建请求数据                                  │
│  ───────────────────                                 │
│  GET：数据拼接到 URL（?name=value&...）               │
│  POST：数据放入请求体                                 │
└──────────────────────────────────────────────────────┘
          ↓
┌──────────────────────────────────────────────────────┐
│  步骤 4：发送请求到服务器                              │
│  ───────────────────                                 │
│  action 地址 + method 方式                           │
└──────────────────────────────────────────────────────┘
```

### GET vs POST

| 特性 | GET | POST |
|------|-----|------|
| 数据位置 | URL 参数 | 请求体 |
| 可见性 | URL 中可见 | 不可见 |
| 长度限制 | ~2000 字符 | 无限制 |
| 安全性 | 不安全（可收藏） | 相对安全 |
| 可缓存 | 是 | 否 |
| 适用场景 | 查询、搜索 | 提交、登录 |

### 设计动机

**为什么有多种 input type？**

| 设计选择 | 原因 | 影响 |
|----------|------|------|
| type="email" | 自动验证格式 | 减少错误输入 |
| type="number" | 移动端数字键盘 | 输入更方便 |
| type="password" | 隐藏输入内容 | 安全性 |
| required 属性 | 浏览器验证 | 减少服务器负担 |

---

## 知识关联图

```
表单知识关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   HTML      │────→│ JavaScript  │────→│   后端      │
│   表单结构  │     │   表单验证  │     │   数据处理  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ↓                   ↓                   ↓
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   CSS       │     │   FormData  │     │   数据库    │
│   表单样式  │     │   API       │     │   存储      │
└─────────────┘     └─────────────┘     └─────────────┘

关联说明：
- HTML 表单 → JavaScript：动态验证、表单提交控制
- HTML 表单 → 后端：数据提交、用户交互
- CSS → 表单：美化表单外观、提升用户体验
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **form** | 表单容器，用于收集用户输入并提交到服务器 | `<form action="/login">` |
| **action** | 表单提交的目标 URL 地址 | `action="/api/register"` |
| **method** | 表单提交的 HTTP 方法（GET 或 POST） | `method="POST"` |
| **input** | 输入控件，最常用的表单元素 | `<input type="text">` |
| **type** | 输入控件的类型，决定输入行为和验证 | `type="email"` |
| **name** | 字段名称，服务器接收数据时的标识 | `name="username"` |
| **label** | 标签元素，为输入控件提供说明文字 | `<label for="email">` |
| **required** | 必填属性，浏览器自动验证是否为空 | `<input required>` |
| **placeholder** | 占位文本，提示用户输入内容 | `placeholder="请输入邮箱"` |
| **autocomplete** | 自动填充属性，控制浏览器自动完成功能 | `autocomplete="off"` |
| **enctype** | 编码类型，文件上传时必须设置 | `enctype="multipart/form-data"` |
| **GET** | HTTP 方法，数据拼接在 URL 中 | 适合查询、搜索 |
| **POST** | HTTP 方法，数据放在请求体中 | 适合登录、注册 |

---

## 实践练习

### 练习：注册表单

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>用户注册</title>
</head>
<body>
    <form action="/register" method="POST">
        <h2>用户注册</h2>

        <div>
            <label for="username">用户名：</label>
            <input type="text" id="username" name="username"
                   required minlength="3" maxlength="20">
        </div>

        <div>
            <label for="email">邮箱：</label>
            <input type="email" id="email" name="email" required>
        </div>

        <div>
            <label for="password">密码：</label>
            <input type="password" id="password" name="password"
                   required minlength="8">
        </div>

        <div>
            <label>
                <input type="checkbox" name="agree" required>
                同意用户协议
            </label>
        </div>

        <button type="submit">注册</button>
    </form>
</body>
</html>
```

---

## 常见问题

### Q1：GET 和 POST 有什么区别？

**原因：** 数据传输方式不同。

| 对比 | GET | POST |
|------|-----|------|
| 数据位置 | URL 中 | 请求体中 |
| 安全性 | 不安全 | 相对安全 |
| 适用场景 | 查询、搜索 | 提交数据 |

### Q2：为什么 label 必须关联 input？

**原因：** 三大好处。

| 好处 | 说明 |
|------|------|
| 无障碍 | 屏幕阅读器朗读 label |
| 点击区域 | 点击 label 也能聚焦 |
| 移动友好 | 更大的触摸区域 |

### Q3：文件上传为什么要用 POST？

**原因：** GET 无法传输文件数据。

**解决：**
- method="POST"
- enctype="multipart/form-data"

```html
<form method="POST" enctype="multipart/form-data">
    <input type="file" name="avatar">
</form>
```

### Q4：如何禁用浏览器自动验证？

**原因：** 某些场景需要自定义验证。

**解决：**
```html
<form novalidate>
    <!-- 浏览器不再自动验证 -->
</form>
```

---

## 学习资源

- [MDN 表单指南](https://developer.mozilla.org/zh-CN/docs/Learn/Forms) ⭐ 官方权威
- [HTML5 表单验证](https://developer.mozilla.org/zh-CN/docs/Learn/Forms/Form_validation) - 验证详解
- [Web.dev 表单](https://web.dev/learn/forms/) - 最佳实践

---

