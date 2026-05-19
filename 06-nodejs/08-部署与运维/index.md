# 部署与运维 ⭐⭐

> 从"怎么让别人访问我的 API"出发，理解部署流程

---

## 学习目标

学完本节，你能：
- 用 PM2 管理 Node.js 进程
- 用 Docker 容器化部署
- 配置 Nginx 反向代理
- 理解 CI/CD 基本概念

---

## 生活化比喻

**部署就像"把餐厅从厨房搬到商业街"**：

```
本地开发 = 自家厨房：
┌─────────────────────────────┐
│  自己试吃，自己调试         │
│  node index.js              │
└─────────────────────────────┘

PM2 = 餐厅经理：
┌─────────────────────────────┐
│  保证餐厅一直营业           │
│  崩溃了自动重启             │
│  多开几个分店（集群）       │
└─────────────────────────────┘

Docker = 标准化厨房：
┌─────────────────────────────┐
│  在任何地方都能复刻的厨房    │
│  环境一致，不会出现          │
│  "在我电脑上能跑"的问题     │
└─────────────────────────────┘

Nginx = 前台迎宾：
┌─────────────────────────────┐
│  接待顾客，分配到不同餐厅    │
│  处理 HTTPS、静态文件       │
└─────────────────────────────┘
```

---

## 第一步：看看问题

你的 API 在本地开发好了，现在想让其他人也能访问。

直接运行 `node index.js` 有问题：
- 关闭终端，服务就停了
- 崩溃了不会自动重启
- 只能用单核 CPU

---

## 第二步：PM2 — 进程管理

PM2 是 Node.js 的进程管理器：

```bash
npm install -g pm2
```

### 基本使用

```bash
# 启动应用
pm2 start src/index.js --name my-api

# 查看状态
pm2 list

# 查看日志
pm2 logs my-api

# 重启
pm2 restart my-api

# 停止
pm2 stop my-api
```

### 集群模式（多进程）

```bash
# 用所有 CPU 核心
pm2 start src/index.js -i max --name my-api
```

### 配置文件

```javascript
// ecosystem.config.js
module.exports = {
    apps: [{
        name: 'my-api',
        script: 'src/index.js',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
            NODE_ENV: 'production',
            PORT: 3000
        }
    }]
};
```

启动：`pm2 start ecosystem.config.js`

---

## 第三步：Docker — 容器化

Docker 保证"在任何地方都能跑"：

```dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
```

### 构建和运行

```bash
# 构建镜像
docker build -t my-api .

# 运行容器
docker run -p 3000:3000 --env-file .env my-api
```

### Docker Compose（多服务）

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=mongodb://mongo:27017/myapp
    depends_on:
      - mongo
  mongo:
    image: mongo:7
    volumes:
      - mongo-data:/data/db
volumes:
  mongo-data:
```

启动：`docker-compose up -d`

---

## 第四步：Nginx — 反向代理

Nginx 放在 Node.js 前面，处理 HTTPS、静态文件、负载均衡：

```nginx
# /etc/nginx/sites-available/my-api
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

启用：
```bash
sudo ln -s /etc/nginx/sites-available/my-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 第五步：环境变量管理

生产环境的环境变量配置：

```bash
# 方式 1：.env 文件
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=生产环境的密钥
PORT=3000

# 方式 2：系统环境变量
export DATABASE_URL=mongodb://...
export JWT_SECRET=...

# 方式 3：PM2 配置
# ecosystem.config.js
env_production: {
    NODE_ENV: 'production',
    DATABASE_URL: 'mongodb://...',
    JWT_SECRET: '...'
}
```

**记住：永远不要把密钥提交到 Git。**

---

## 第六步：监控和日志

### PM2 监控

```bash
# 安装监控
pm2 install pm2-logrotate

# 查看监控
pm2 monit
```

### 日志管理

```bash
# 查看日志
pm2 logs my-api

# 日志轮转（防止日志文件太大）
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

## 第七步：完整部署流程

```bash
# 1. 拉取代码
git pull origin main

# 2. 安装依赖
npm ci --production

# 3. 重启服务
pm2 restart my-api

# 4. 检查状态
pm2 status
pm2 logs my-api
```

### 自动化部署（CI/CD）

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: deploy
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /app/my-api
            git pull
            npm ci --production
            pm2 restart my-api
```

---

## 总结：部署速查表

| 工具 | 用途 | 命令 |
|------|------|------|
| PM2 | 进程管理 | `pm2 start index.js` |
| Docker | 容器化 | `docker build -t app .` |
| Nginx | 反向代理 | `sudo nginx -t` |
| GitHub Actions | CI/CD | 推送自动部署 |

**记住：**
- 生产环境用 PM2 集群模式
- 用 Docker 保证环境一致
- 密钥用环境变量，不要硬编码

---

## 学习资源

- [PM2 官方文档](https://pm2.keymetrics.io/)
- [Docker 官方文档](https://docs.docker.com/)
- [Nginx 官方文档](https://nginx.org/en/docs/)
