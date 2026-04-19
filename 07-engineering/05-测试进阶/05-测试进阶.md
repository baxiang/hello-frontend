# 测试进阶 ⭐⭐

> Jest、React Testing Library、Playwright E2E

---

## 学习目标

- 掌握单元测试和集成测试
- 学会 React 组件测试
- 了解 E2E 测试（Playwright）

---

## L1 理解层：会用

### Jest 单元测试

**最简示例（1-3行）：**

```typescript
import { add } from './math'
test('add 返回两数之和', () => { expect(add(1, 2)).toBe(3) })
```

**详细示例：**

```typescript
// math.test.ts
import { describe, it, expect, vi } from 'vitest'
import { add, subtract, divide } from './math'

describe('数学函数', () => {
  it('add 返回两数之和', () => {
    expect(add(1, 2)).toBe(3)
    expect(add(-1, 1)).toBe(0)
  })

  it('divide 抛出除零错误', () => {
    expect(() => divide(1, 0)).toThrow('不能除以零')
  })
})

// Mock 测试
vi.mock('./api', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ id: 1, name: '张三' }))
}))

it('获取用户', async () => {
  const { fetchUser } = await import('./api')
  const user = await fetchUser(1)
  expect(user).toEqual({ id: 1, name: '张三' })
})
```

---

### 组件测试

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

test('渲染按钮文本', () => {
  render(<Button>点击我</Button>)
  expect(screen.getByText('点击我')).toBeInTheDocument()
})

test('点击触发回调', () => {
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>点击</Button>)
  fireEvent.click(screen.getByText('点击'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})

// 异步测试
test('加载状态', async () => {
  render(<AsyncComponent />)
  expect(screen.getByText('加载中...')).toBeInTheDocument()
  expect(await screen.findByText('加载完成')).toBeInTheDocument()
})
```

---

## L2 实践层：用好

### 测试策略

| 类型 | 工具 | 用途 |
|------|------|------|
| 单元测试 | Vitest/Jest | 纯函数、工具函数 |
| 组件测试 | Testing Library | React/Vue 组件 |
| E2E 测试 | Playwright | 完整用户流程 |

### Playwright E2E

```typescript
// tests/e2e/todo.spec.ts
import { test, expect } from '@playwright/test'

test('添加和删除 Todo', async ({ page }) => {
  await page.goto('http://localhost:3000')

  // 添加 Todo
  await page.fill('input', '学习 Playwright')
  await page.click('button:has-text("添加")')
  await expect(page.locator('li')).toContainText('学习 Playwright')

  // 删除 Todo
  await page.click('button:has-text("删除")')
  await expect(page.locator('li')).toHaveCount(0)
})

test('路由导航', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.click('text=关于')
  await expect(page).toHaveURL(/.*about/)
})
```

### 反模式

```typescript
// ❌ 错误：测试实现细节
expect(component.state.count).toBe(3)

// ✅ 正确：测试用户可见行为
expect(screen.getByText('3')).toBeInTheDocument()
```

---

## 学习资源

- [Vitest](https://vitest.dev/) ⭐ 推荐
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
