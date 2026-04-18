# TypeScript 实战指南

> 项目结构、路径别名、JS 迁移

---

## L1 理解层

**最简示例：**

```json
// tsconfig.json - 路径别名
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"] } } }
```

```typescript
// 导入
import { Button } from '@/components/Button';
import { formatDate } from '@/utils/date';
```

---

## L2 实践层

### JS → TS 迁移步骤

1. 改扩展名 `.js` → `.ts`
2. 开启 `allowJs: true`（渐进迁移）
3. 逐文件添加类型
4. 开启 `strict: true`

### 最佳实践

| 实践 | 说明 |
|------|------|
| 开启 strict | `strict: true` |
| 避免 any | 用 unknown 替代 |
| 标注函数签名 | 参数和返回值都标注 |
| 用 interface 定义对象 | 可扩展性好 |

---

## 学习资源

- [TypeScript 迁移指南](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html) ⭐ 官方权威
