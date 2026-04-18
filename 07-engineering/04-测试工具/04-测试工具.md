# 测试工具 ⭐⭐

> Vitest 单元测试、组件测试

---

## 学习目标

- 掌握 Vitest 配置和基础测试编写
- 学会使用 mock 和异步测试
- 了解组件测试方法

---

## 生活化比喻

**测试就像"产品出厂前的质量检查"**：

```
比喻对应：

┌──────────────────────────────────────────────────────┐
│                  产品质检                             │
├──────────────────────────────────────────────────────┤
│                                                      │
│    单元测试 = 零件检查                               │
│    ─────────────                                     │
│    检查每个零件（函数）是否合格                      │
│    add(1, 2) 应该返回 3                             │
│                                                      │
│    组件测试 = 组装检查                                │
│    ─────────────                                     │
│    检查组装好的产品（组件）是否正常工作              │
│    点击按钮后数字是否增加                            │
│                                                      │
│    Mock = 模拟零件                                   │
│    ─────────────                                     │
│    检查汽车时不需要真的发动机                        │
│    用一个模拟器代替                                  │
│    测试 API 时不需要真的服务器                       │
│                                                      │
│    覆盖率 = 检查覆盖率                                │
│    ─────────────                                     │
│    检查了多少个零件 / 总零件数                       │
│    100% 覆盖率 = 所有零件都检查过                    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## L1 理解层：会用

**最简示例：**

```javascript
import { describe, it, expect } from 'vitest'
import { add } from './math'

describe('数学函数', () => {
    it('应该返回两数之和', () => {
        expect(add(1, 2)).toBe(3)
    })
})
```

**详细示例：**

```javascript
// utils/math.js
export function add(a, b) { return a + b }
export function subtract(a, b) { return a - b }

// utils/math.test.js
import { describe, it, expect } from 'vitest'
import { add, subtract } from './math'

describe('数学函数', () => {
    it('add 返回两数之和', () => {
        expect(add(1, 2)).toBe(3)
        expect(add(-1, 1)).toBe(0)
    })

    it('subtract 返回两数之差', () => {
        expect(subtract(5, 3)).toBe(2)
    })
})

// 异步测试
it('获取用户数据', async () => {
    const user = await fetchUser(1)
    expect(user).toHaveProperty('name')
})
```

---

## L2 实践层：用好

### 常用断言速查

| 断言 | 用途 | 示例 |
|------|------|------|
| `toBe` | 严格相等 | `expect(1).toBe(1)` |
| `toEqual` | 深度相等 | `expect({a:1}).toEqual({a:1})` |
| `toBeTruthy` | 为真值 | `expect('hi').toBeTruthy()` |
| `toBeNull` | 为 null | `expect(null).toBeNull()` |
| `toContain` | 包含元素 | `expect([1,2]).toContain(1)` |
| `toThrow` | 抛出错误 | `expect(fn).toThrow()` |

### 反模式：不要这样做

```javascript
// ❌ 错误：测试不覆盖边界情况
it('add 返回和', () => { expect(add(1, 2)).toBe(3) })

// ✅ 正确：覆盖多种情况
it('add 返回和', () => {
    expect(add(1, 2)).toBe(3)
    expect(add(-1, 1)).toBe(0)
    expect(add(0, 0)).toBe(0)
})
```

### 适用场景

| 场景 | 推荐方案 | 原因 |
|------|---------|------|
| 纯函数测试 | 单元测试 | 无副作用，易测试 |
| 组件渲染 | 组件测试 | 验证 DOM 输出 |
| API 调用 | Mock + 异步测试 | 不依赖真实服务 |
| 事件处理 | 触发事件 + 验证状态 | 模拟用户操作 |

---

## L3 专家层：深入

### Mock 技术

```javascript
// Mock 模块
import { vi } from 'vitest'

vi.mock('./api', () => ({
    fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: '张三' }))
}))

// Mock 定时器
vi.useFakeTimers()
vi.advanceTimersByTime(1000)  // 快进 1 秒
vi.useRealTimers()
```

### 组件测试（Vue）

```javascript
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter 组件', () => {
    it('渲染初始值', () => {
        const wrapper = mount(Counter, { props: { initial: 5 } })
        expect(wrapper.text()).toContain('5')
    })

    it('点击增加', async () => {
        const wrapper = mount(Counter)
        await wrapper.find('button').trigger('click')
        expect(wrapper.text()).toContain('1')
    })
})
```

### 知识关联

```
测试关联：

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  单元测试   │────→│  组件测试   │────→│  E2E 测试   │
│  纯函数/    │     │  渲染/      │     │  用户流程   │
│  工具函数   │     │  事件/      │     │  Playwright │
└─────────────┘     │  Mock       │     └─────────────┘
                    └─────────────┘
```

---

## 术语定义

| 术语 | 定义 | 示例 |
|------|------|------|
| **单元测试** | 测试单个函数或模块的功能 | `expect(add(1,2)).toBe(3)` |
| **组件测试** | 测试组件的渲染和交互 | `mount(Counter)` |
| **Mock** | 模拟外部依赖 | `vi.fn(() => {})` |
| **覆盖率** | 被测试代码占总代码的百分比 | `vitest --coverage` |
| **断言** | 验证代码行为是否符合预期 | `expect(x).toBe(1)` |

---

## 实践练习

```javascript
// 练习：完整的工具函数测试
import { describe, it, expect, vi } from 'vitest'

// 测试对象
const utils = {
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    isEmpty: (arr) => arr.length === 0,
    delay: (ms) => new Promise(r => setTimeout(r, ms))
}

describe('工具函数', () => {
    it('capitalize 首字母大写', () => {
        expect(utils.capitalize('hello')).toBe('Hello')
        expect(utils.capitalize('')).toBe('')
    })

    it('isEmpty 判断空数组', () => {
        expect(utils.isEmpty([])).toBe(true)
        expect(utils.isEmpty([1])).toBe(false)
    })

    it('delay 延迟执行', async () => {
        vi.useFakeTimers()
        const promise = utils.delay(1000)
        vi.advanceTimersByTime(1000)
        await promise
        vi.useRealTimers()
    })
})
```

---

## 常见问题

### Q1：单元测试写多少才够？

**核心逻辑和业务逻辑 100% 覆盖，UI 渲染和第三方库不测。优先测容易出错的代码。**

### Q2：Mock 和真实 API 测试用哪个？

**单元测试用 Mock（快、稳定），集成测试用真实 API（验证真实行为）。**

---

## 学习资源

- [Vitest 官方文档](https://vitest.dev/) ⭐ 官方权威
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Testing Library](https://testing-library.com/)
