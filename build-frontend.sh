#!/bin/bash

# 输出当前工作目录，帮助我们调试
echo "Current directory: $(pwd)"

# 进入前端源码目录
cd src/main/resources/frontend.src || {
    echo "Error: Could not change to frontend directory"
    exit 1
}

# 确认我们在正确的目录
echo "Building frontend in: $(pwd)"

# 检查 node 和 npm 是否可用
if ! command -v node >/dev/null 2>&1; then
    echo "Error: Node.js is not installed"
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "Error: npm is not installed"
    exit 1
fi

# 安装依赖
echo "Installing dependencies..."
npm install || {
    echo "Error: npm install failed"
    exit 1
}

# 构建项目
echo "Building frontend..."
npm run build || {
    echo "Error: npm build failed"
    exit 1
}

# 确保目标目录存在
mkdir -p ../static/frontend

# 复制构建文件
echo "Copying build files..."
cp -r build/* ../static/frontend/ || {
    echo "Error: Failed to copy build files"
    exit 1
}

echo "Frontend build completed successfully!"