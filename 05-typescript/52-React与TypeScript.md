# React + TypeScript

> 本章时长：1.5小时 | 难度：⭐⭐⭐⭐

---

## 本章目标

- 掌握 React 组件类型定义
- 学会处理事件类型
- 理解 Hook 的类型

---

## 19.1 组件类型定义

### 函数组件

```typescript
import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
    text, 
    onClick, 
    disabled = false,
    className = '' 
}) => {
    return (
        <button 
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
```

### 使用泛型组件

```typescript
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{renderItem(item)}</li>
            ))}
        </ul>
    );
}

// 使用
<List 
    items={['a', 'b', 'c']} 
    renderItem={(item) => <span>{item}</span>}
/>
```

---

## 19.2 事件处理类型

### 常见事件类型

```typescript
// 点击事件
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
};

// 输入事件
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
};

// 表单提交
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
};

// 焦点事件
const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e.target);
};
```

### 完整示例

```typescript
interface FormProps {
    onSubmit: (data: { name: string; email: string }) => void;
}

function Form({ onSubmit }: FormProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSubmit({
            name: formData.get('name') as string,
            email: formData.get('email') as string
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" />
            <input name="email" placeholder="Email" />
            <button type="submit">Submit</button>
        </form>
    );
}
```

---

## 19.3 useState 泛型

### 基本用法

```typescript
// 简单类型
const [count, setCount] = useState<number>(0);

// 对象类型
const [user, setUser] = useState<User | null>(null);

// 数组类型
const [items, setItems] = useState<string[]>([]);
```

### 完整示例

```typescript
import { useState } from 'react';

interface User {
    id: number;
    name: string;
}

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const addUser = () => {
        const newUser: User = {
            id: Date.now(),
            name: `User ${users.length + 1}`
        };
        setUsers([...users, newUser]);
    };

    return (
        <div>
            <button onClick={addUser}>Add User</button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
```

---

## 19.4 useRef 类型

```typescript
// DOM 元素引用
const inputRef = useRef<HTMLInputElement>(null);

// 定时器引用
const timerRef = useRef<number | null>(null);

// 使用
const focusInput = () => {
    inputRef.current?.focus();
};

const startTimer = () => {
    timerRef.current = window.setInterval(() => {
        console.log('tick');
    }, 1000);
};
```

---

## 19.5 实践练习

### 练习：用户列表组件

```typescript
import React, { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface UserListProps {
    initialUsers?: User[];
}

const UserList: React.FC<UserListProps> = ({ initialUsers = [] }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const addUser = () => {
        if (!newName || !newEmail) return;
        
        const user: User = {
            id: Date.now(),
            name: newName,
            email: newEmail
        };
        
        setUsers([...users, user]);
        setNewName('');
        setNewEmail('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addUser();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Name"
                />
                <input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Email"
                />
                <button type="submit">Add</button>
            </form>
            
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
```

---

## 本章小结

| 概念 | 说明 |
|------|------|
| FC | 函数组件类型 |
| Props | 组件属性类型 |
| MouseEvent | 点击事件类型 |
| ChangeEvent | 输入事件类型 |
| useState<T> | 状态泛型 |
| useRef<T> | Ref 泛型 |

---

## 下一章

[→ 53-Vue与TypeScript.md](./53-Vue与TypeScript.md)

---

## 练习答案

```typescript
const UserList: React.FC<UserListProps> = ({ initialUsers = [] }) => {
    // 实现...
};
```