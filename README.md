# 风之岚科技静态站点

本项目是无构建步骤的纯静态站点，不依赖 React、Vite、Node.js 包或服务端运行时。

## 文件结构

```text
.
├── index.html          # 首页
├── 404.html            # 静态托管错误页
└── assets/
    ├── styles.css      # 页面样式
    ├── main.js         # 原生 JavaScript 交互
    ├── logo.png
    ├── favicon.png
    └── og-image.png
```

## 本地预览

直接运行：

```bash
python3 -m http.server 8000
```

也可以使用 npm 命令（无需执行 `npm install`）：

```bash
npm run dev
```

然后访问 <http://localhost:8000/>。

如端口被占用，可改用其他端口：

```bash
python3 -m http.server 8081
```

## 部署

将仓库根目录作为静态网站目录直接发布，无需执行构建命令。部署前可运行：

```bash
npm run check
```
