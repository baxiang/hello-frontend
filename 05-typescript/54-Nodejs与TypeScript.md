# Node.js + TypeScript

> 本章时长：1小时 | 难度：⭐⭐⭐⭐

---

## 本章目标

- 掌握 Express 类型定义
- 学会创建中间件类型
- 理解数据库类型

---

## 21.1 Express 类型

### Request 和 Response

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// GET 请求
app.get('/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.json({ id, name: 'Tom' });
});

// POST 请求
app.post('/users', (req: Request, res: Response) => {
    const { name, email } = req.body;
    res.status(201).json({ id: 1, name, email });
});
```

### 完整示例

```typescript
import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

// 用户列表
app.get('/users', (req: Request, res: Response) => {
    const users = [
        { id: 1, name: 'Tom' },
        { id: 2, name: 'Jerry' }
    ];
    res.json(users);
});

// 获取单个用户
app.get('/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    res.json({ id, name: 'Tom' });
});

// 创建用户
app.post('/users', (req: Request, res: Response) => {
    const { name, email } = req.body;
    res.status(201).json({ id: Date.now(), name, email });
});

// 错误处理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

---

## 21.2 中间件类型

### 自定义中间件类型

```typescript
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
    user?: {
        id: number;
        name: string;
        role: string;
    };
}

export const authMiddleware = (
    req: AuthRequest, 
    res: Response, 
    next: NextFunction
) => {
    const token = req.headers.authorization;
    
    if (token) {
        // 验证 token
        req.user = { id: 1, name: 'Tom', role: 'admin' };
    }
    
    next();
};

// 使用
app.get('/profile', authMiddleware, (req: AuthRequest, res: Response) => {
    res.json(req.user);
});
```

---

## 21.3 路由类型

### 完整示例

```typescript
import express, { Request, Response } from 'express';

interface User {
    id: number;
    name: string;
    email: string;
}

const users: User[] = [];

const app = express();
app.use(express.json());

// 获取所有用户
app.get('/api/users', (req: Request, res: Response) => {
    res.json(users);
});

// 获取单个用户
app.get('/api/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
});

// 创建用户
app.post('/api/users', (req: Request, res: Response) => {
    const { name, email } = req.body;
    
    const newUser: User = {
        id: Date.now(),
        name,
        email
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// 更新用户
app.put('/api/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
});

// 删除用户
app.delete('/api/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users.splice(index, 1);
    res.status(204).send();
});

app.listen(3000);
```

---

## 本章小结

| 概念 | 说明 |
|------|------|
| Request | 请求对象 |
| Response | 响应对象 |
| NextFunction | 下一个中间件 |
| 中间件类型 | 自定义请求类型 |

---

## 第五阶段总结

恭喜完成第五阶段！学完本章后，你已经：

- ✅ 掌握项目结构和最佳实践
- ✅ 能在 React 中使用 TypeScript
- ✅ 能在 Vue 中使用 TypeScript
- ✅ 能开发 Node.js API

---

## 全部学习完成！

现在你已经完成了 TypeScript 从入门到实战的全部学习路径。

---

## 下一章

[→ 返回新学习大纲](./新学习大纲-零基础到进阶.md)

---

## 练习答案

### 完整 API 示例

```typescript
// 参见 21.3 节的完整代码示例
```