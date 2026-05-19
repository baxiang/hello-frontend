# Todo 应用项目 ⭐⭐

> TypeScript + 最佳实践 + 模块化

---

## 项目目标

- 验证 TypeScript 类型定义能力
- 验证模块化代码组织
- 验证最佳实践应用

---

## 项目结构

```
todo-app/
├── src/
│   ├── types/
│   │   └── todo.ts         ← 类型定义
│   ├── store/
│   │   └── todoStore.ts    ← 状态管理
│   ├── components/
│   │   ├── TodoForm.ts     ← 表单组件
│   │   ├── TodoList.ts     ← 列表组件
│   │   └── TodoItem.ts     ← 单项组件
│   ├── utils/
│   │   └── storage.ts      ← 本地存储
│   └── main.ts             ← 入口
├── index.html
├── tsconfig.json
└── package.json
```

---

## L2 实现：TypeScript 版本

### 类型定义

```typescript
// src/types/todo.ts
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoState {
    todos: Todo[];
    filter: FilterType;
}
```

---

### 本地存储工具

```typescript
// src/utils/storage.ts
const STORAGE_KEY = 'todos-app-data';

export const storage = {
    save(data: unknown): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },

    load<T>(fallback: T): T {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : fallback;
    },

    clear(): void {
        localStorage.removeItem(STORAGE_KEY);
    }
};
```

---

### 状态管理

```typescript
// src/store/todoStore.ts
import { Todo, TodoState, FilterType } from '../types/todo';
import { storage } from '../utils/storage';

class TodoStore {
    private state: TodoState;
    private listeners: Array<() => void> = [];

    constructor() {
        this.state = storage.load<TodoState>({
            todos: [],
            filter: 'all'
        });
        // 恢复 Date 对象
        this.state.todos = this.state.todos.map(t => ({
            ...t,
            createdAt: new Date(t.createdAt)
        }));
    }

    // 获取状态
    getState(): Readonly<TodoState> {
        return { ...this.state, todos: [...this.state.todos] };
    }

    // 添加 Todo
    addTodo(text: string): void {
        const todo: Todo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            createdAt: new Date()
        };
        this.state.todos.unshift(todo);
        this.persist();
        this.notify();
    }

    // 切换完成状态
    toggleTodo(id: number): void {
        const todo = this.state.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.persist();
            this.notify();
        }
    }

    // 删除 Todo
    deleteTodo(id: number): void {
        this.state.todos = this.state.todos.filter(t => t.id !== id);
        this.persist();
        this.notify();
    }

    // 设置过滤
    setFilter(filter: FilterType): void {
        this.state.filter = filter;
        this.notify();
    }

    // 获取过滤后的列表
    getFilteredTodos(): ReadonlyArray<Readonly<Todo>> {
        const { todos, filter } = this.state;
        switch (filter) {
            case 'active': return todos.filter(t => !t.completed);
            case 'completed': return todos.filter(t => t.completed);
            default: return todos;
        }
    }

    // 清除已完成
    clearCompleted(): void {
        this.state.todos = this.state.todos.filter(t => !t.completed);
        this.persist();
        this.notify();
    }

    // 订阅
    subscribe(listener: () => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    // 持久化
    private persist(): void {
        storage.save(this.state);
    }

    // 通知
    private notify(): void {
        this.listeners.forEach(fn => fn());
    }
}

export const todoStore = new TodoStore();
```

---

### 组件实现

```typescript
// src/components/TodoForm.ts
import { todoStore } from '../store/todoStore';

export class TodoForm {
    private element: HTMLFormElement;
    private input: HTMLInputElement;

    constructor(container: HTMLElement) {
        this.element = document.createElement('form');
        this.element.className = 'todo-form';
        this.element.innerHTML = `
            <input type="text" placeholder="添加新任务..." required />
            <button type="submit">添加</button>
        `;

        this.input = this.element.querySelector('input')!;

        this.element.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = this.input.value.trim();
            if (text) {
                todoStore.addTodo(text);
                this.input.value = '';
            }
        });

        container.appendChild(this.element);
    }
}
```

```typescript
// src/components/TodoItem.ts
import { Todo } from '../types/todo';
import { todoStore } from '../store/todoStore';

export class TodoItem {
    private element: HTMLElement;

    constructor(todo: Todo) {
        this.element = document.createElement('li');
        this.element.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        this.element.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} />
            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
            <span class="todo-date">${this.formatDate(todo.createdAt)}</span>
            <button class="delete-btn" aria-label="删除">×</button>
        `;

        const checkbox = this.element.querySelector('input')!;
        checkbox.addEventListener('change', () => todoStore.toggleTodo(todo.id));

        const deleteBtn = this.element.querySelector('.delete-btn')!;
        deleteBtn.addEventListener('click', () => todoStore.deleteTodo(todo.id));
    }

    getElement(): HTMLElement {
        return this.element;
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    private formatDate(date: Date): string {
        return date.toLocaleDateString('zh-CN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
```

```typescript
// src/components/TodoList.ts
import { FilterType } from '../types/todo';
import { todoStore } from '../store/todoStore';
import { TodoItem } from './TodoItem';

export class TodoList {
    private element: HTMLElement;
    private listElement: HTMLUListElement;
    private filterButtons: HTMLElement;
    private statsElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.element = document.createElement('div');
        this.element.className = 'todo-list';
        this.element.innerHTML = `
            <div class="filters">
                <button data-filter="all" class="active">全部</button>
                <button data-filter="active">待完成</button>
                <button data-filter="completed">已完成</button>
            </div>
            <ul class="todo-items"></ul>
            <div class="todo-stats">
                <span class="count"></span>
                <button class="clear-completed">清除已完成</button>
            </div>
        `;

        this.listElement = this.element.querySelector('.todo-items')!;
        this.filterButtons = this.element.querySelector('.filters')!;
        this.statsElement = this.element.querySelector('.todo-stats')!;

        this.filterButtons.addEventListener('click', (e) => {
            const btn = (e.target as HTMLElement).closest('[data-filter]');
            if (btn) {
                const filter = btn.dataset.filter as FilterType;
                todoStore.setFilter(filter);
                this.updateActiveFilter(filter);
            }
        });

        this.statsElement.querySelector('.clear-completed')!
            .addEventListener('click', () => todoStore.clearCompleted());

        todoStore.subscribe(() => this.render());
        this.render();

        container.appendChild(this.element);
    }

    private render(): void {
        const todos = todoStore.getFilteredTodos();
        const state = todoStore.getState();

        this.listElement.innerHTML = '';
        todos.forEach(todo => {
            const item = new TodoItem(todo);
            this.listElement.appendChild(item.getElement());
        });

        const activeCount = state.todos.filter(t => !t.completed).length;
        this.statsElement.querySelector('.count')!.textContent =
            `${activeCount} 个待完成任务`;

        const clearBtn = this.statsElement.querySelector('.clear-completed')!;
        const completedCount = state.todos.filter(t => t.completed).length;
        (clearBtn as HTMLButtonElement).style.display = completedCount ? '' : 'none';
    }

    private updateActiveFilter(filter: FilterType): void {
        this.filterButtons.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }
}
```

---

### 入口文件

```typescript
// src/main.ts
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

function init() {
    const app = document.getElementById('app')!;

    const header = document.createElement('header');
    header.innerHTML = '<h1>📝 Todo 应用</h1>';
    app.appendChild(header);

    new TodoForm(app);
    new TodoList(app);
}

document.addEventListener('DOMContentLoaded', init);
```

---

### HTML 入口

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo 应用</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="app"></div>
    <script src="dist/main.js"></script>
</body>
</html>
```

---

## CSS 样式

```css
/* css/style.css */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: -apple-system, sans-serif;
    background: #f5f5f5;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 2rem;
}

#app {
    width: 100%;
    max-width: 600px;
}

header h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}

.todo-form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
}

.todo-form input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
}

.todo-form button {
    padding: 0.75rem 1.5rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

.filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.filters button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    border-radius: 20px;
    cursor: pointer;
}

.filters button.active {
    background: #3b82f6;
    color: white;
    border-color: #3b82f6;
}

.todo-items {
    list-style: none;
}

.todo-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    color: #999;
}

.todo-text { flex: 1; }
.todo-date { font-size: 0.75rem; color: #999; }

.delete-btn {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #999;
    cursor: pointer;
}

.delete-btn:hover { color: #ef4444; }

.todo-stats {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    color: #666;
    font-size: 0.875rem;
}

.clear-completed {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    text-decoration: underline;
}
```

---

## 能力检验清单

- [ ] 能定义完整的 TypeScript 类型
- [ ] 能实现模块化代码组织
- [ ] 能使用 class 封装组件逻辑
- [ ] 能实现状态管理和持久化
- [ ] 能防止 XSS 攻击（escapeHtml）
- [ ] 能通过 ESLint 检查无错误

---

## 扩展挑战

1. **添加拖拽排序功能**
2. **添加分类标签**
3. **添加搜索过滤**
4. **添加单元测试（Vitest）**
