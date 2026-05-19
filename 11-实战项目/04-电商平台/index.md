# 电商平台项目 ⭐⭐⭐

> React/Vue + Node.js + MongoDB + Stripe

---

## 项目目标

- 验证全栈开发能力
- 验证状态管理和性能优化
- 验证支付集成和部署

---

## 项目结构

```
shop/
├── client/                    ← 前端（React + TypeScript）
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/             ← Zustand 状态管理
│   │   └── main.tsx
│   └── package.json
├── server/                    ← 后端（Node.js + Express）
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/            ← Mongoose 模型
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.ts
│   └── package.json
└── docker-compose.yml
```

---

## L3 实现：全栈电商

### 后端：数据模型

```typescript
// server/src/models/Product.ts
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true })

export const Product = mongoose.model('Product', productSchema)
```

```typescript
// server/src/models/Order.ts
import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered'],
        default: 'pending'
    },
    paymentId: String,
    shippingAddress: {
        name: String,
        street: String,
        city: String,
        zip: String
    }
}, { timestamps: true })

export const Order = mongoose.model('Order', orderSchema)
```

---

### 后端：API 路由

```typescript
// server/src/routes/products.ts
import express from 'express'
import { Product } from '../models/Product'

const router = express.Router()

// 获取产品列表（分页、过滤、搜索）
router.get('/', async (req, res) => {
    const { page = 1, limit = 10, category, search, sort } = req.query

    const query: any = {}
    if (category) query.category = category
    if (search) query.name = { $regex: search, $options: 'i' }

    const sortObj: any = {}
    if (sort === 'price-asc') sortObj.price = 1
    else if (sort === 'price-desc') sortObj.price = -1
    else sortObj.createdAt = -1

    const skip = (Number(page) - 1) * Number(limit)
    const [products, total] = await Promise.all([
        Product.find(query).sort(sortObj).skip(skip).limit(Number(limit)),
        Product.countDocuments(query)
    ])

    res.json({
        products,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        total
    })
})

// 获取单个产品
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ error: '产品不存在' })
    res.json(product)
})

export default router
```

```typescript
// server/src/routes/orders.ts
import express from 'express'
import { Order } from '../models/Order'
import { auth } from '../middleware/auth'

const router = express.Router()

// 创建订单
router.post('/', auth, async (req, res) => {
    const { items, shippingAddress } = req.body
    const user = req.user

    // 计算总价
    let total = 0
    for (const item of items) {
        const product = await Product.findById(item.product)
        if (!product) return res.status(404).json({ error: `产品 ${item.product} 不存在` })
        if (product.stock < item.quantity) return res.status(400).json({ error: `${product.name} 库存不足` })
        total += product.price * item.quantity
    }

    const order = await Order.create({
        user: user.id,
        items,
        total,
        shippingAddress
    })

    res.status(201).json(order)
})

// 获取用户订单
router.get('/my', auth, async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
        .populate('items.product', 'name image price')
        .sort({ createdAt: -1 })
    res.json(orders)
})

export default router
```

---

### 前端：状态管理

```typescript
// client/src/store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
}

interface CartStore {
    items: CartItem[]
    addToCart: (product: Omit<CartItem, 'quantity'>) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    total: number
    itemCount: number
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product) => set(state => {
                const existing = state.items.find(item => item.id === product.id)
                if (existing) {
                    return {
                        items: state.items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    }
                }
                return { items: [...state.items, { ...product, quantity: 1 }] }
            }),

            removeFromCart: (id) => set(state => ({
                items: state.items.filter(item => item.id !== id)
            })),

            updateQuantity: (id, quantity) => set(state => ({
                items: state.items.map(item =>
                    item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
                ).filter(item => item.quantity > 0)
            })),

            clearCart: () => set({ items: [] }),

            get total() {
                return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
            },

            get itemCount() {
                return get().items.reduce((sum, item) => sum + item.quantity, 0)
            }
        }),
        { name: 'cart-storage' }
    )
)
```

---

### 前端：购物车组件

```tsx
// client/src/components/Cart.tsx
import { useCartStore } from '../store/cartStore'

export default function Cart() {
    const items = useCartStore(s => s.items)
    const total = useCartStore(s => s.total)
    const updateQuantity = useCartStore(s => s.updateQuantity)
    const removeFromCart = useCartStore(s => s.removeFromCart)

    if (items.length === 0) {
        return <p className="text-center py-8">购物车是空的</p>
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">购物车</h2>
            <div className="space-y-4">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">¥{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 py-1 bg-gray-200 rounded">-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-200 rounded">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500">×</button>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
                <span className="text-xl font-bold">总计：¥{total.toFixed(2)}</span>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    结算
                </button>
            </div>
        </div>
    )
}
```

---

### 前端：产品列表

```tsx
// client/src/pages/Products.tsx
import { useState, useEffect } from 'react'
import { useCartStore } from '../store/cartStore'

interface Product {
    _id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    rating: number
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const addToCart = useCartStore(s => s.addToCart)

    useEffect(() => {
        const fetchProducts = async () => {
            const params = new URLSearchParams({ page: String(page), search })
            const res = await fetch(`/api/products?${params}`)
            const data = await res.json()
            setProducts(data.products)
        }
        fetchProducts()
    }, [page, search])

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex gap-4 mb-6">
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="搜索产品..."
                    className="flex-1 px-4 py-2 border rounded-lg"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xl font-bold text-blue-600">¥{product.price}</span>
                                <button
                                    onClick={() => addToCart({
                                        id: product._id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.image
                                    })}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    加入购物车
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">上一页</button>
                <span className="px-4 py-2">第 {page} 页</span>
                <button onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 bg-gray-200 rounded">下一页</button>
            </div>
        </div>
    )
}
```

---

## 部署

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
  server:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - MONGO_URI=mongodb://mongo:27017/shop
      - JWT_SECRET=your-secret
    depends_on:
      - mongo
  client:
    build: ./client
    ports:
      - "3000:80"
    depends_on:
      - server
volumes:
  mongo-data:
```

---

## 能力检验清单

- [ ] 能设计数据库模型和关联
- [ ] 能实现分页、搜索、过滤 API
- [ ] 能实现购物车状态管理（持久化）
- [ ] 能实现用户认证和授权
- [ ] 能集成支付系统
- [ ] 能使用 Docker 部署完整应用

---

## 扩展挑战

1. **集成 Stripe 支付**
2. **添加订单管理后台**
3. **添加商品评价系统**
4. **添加商品推荐算法**
