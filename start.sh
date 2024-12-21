#!/bin/bash

# 使脚本在出错时停止执行
set -e

# 定义颜色
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的信息
info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

# 检查必要的工具
check_requirements() {
    info "检查必要的工具..."
    
    if ! command -v node >/dev/null 2>&1; then
        echo "需要安装 Node.js"
        exit 1
    fi
    
    if ! command -v mvn >/dev/null 2>&1; then
        echo "需要安装 Maven"
        exit 1
    fi
    
    if ! command -v mysql >/dev/null 2>&1; then
        echo "需要安装 MySQL"
        exit 1
    fi
}

# 检查MySQL服务状态
check_mysql() {
    info "检查 MySQL 服务状态..."
    if ! mysqladmin ping -h localhost --silent; then
        echo "MySQL 服务未运行，正在启动..."
        brew services start mysql
        sleep 5
    fi
}

# 创建数据库（如果不存在）
setup_database() {
    info "设置数据库..."
    mysql -u chronos -p"root" -e "CREATE DATABASE IF NOT EXISTS social_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    success "数据库设置完成"
}

# 启动后端
start_backend() {
    info "启动后端服务..."
    cd backend
    mvn spring-boot:run &
    cd ..
    success "后端服务启动中..."
}

# 启动前端
start_frontend() {
    info "启动前端服务..."
    cd frontend
    # 如果node_modules不存在，安装依赖
    if [ ! -d "node_modules" ]; then
        info "安装前端依赖..."
        npm install
    fi
    npm run serve &
    cd ..
    success "前端服务启动中..."
}

# 主函数
main() {
    info "开始启动社交系统..."
    
    check_requirements
    check_mysql
    setup_database
    start_backend
    start_frontend
    
    success "所有服务启动完成！"
    echo "前端访问地址: http://localhost:3000"
    echo "后端API地址: http://localhost:8080/api"
    
    # 等待用户输入以关闭服务
    echo "按 Ctrl+C 停止所有服务"
    wait
}

# 清理函数
cleanup() {
    echo "正在关闭服务..."
    pkill -f "spring-boot:run" || true
    pkill -f "node" || true
    exit 0
}

# 注册清理函数
trap cleanup SIGINT SIGTERM

# 执行主函数
main 