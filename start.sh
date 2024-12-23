#!/bin/bash

echo "Starting Campus Social Platform..."

# 检查并停止已运行的进程
echo "Checking for running processes..."
pkill -f social
pkill -f "node.*react-scripts start"

# 等待进程完全停止
sleep 2

# 强制删除target目录（如果存在）
if [ -d "target" ]; then
    echo "Cleaning target directory..."
    rm -rf target
fi

# 清理本地依赖缓存
echo "Cleaning local Maven dependencies..."
mvn dependency:purge-local-repository

# 检查前端依赖
echo "Checking frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
cd ..

# 清理并重新构建（带详细日志）
echo "Building project..."
mvn clean package -DskipTests -X > build.log 2>&1

# 检查构建是否成功
if [ $? -eq 0 ]; then
    echo "Checking build log..."
    tail -n 50 build.log
    
    # 检查 JAR 文件是否存在
    if [ ! -f "target/social-0.0.1-SNAPSHOT.jar" ]; then
        echo "Error: JAR file not found!"
        exit 1
    fi

    # 检查 JAR 文件内容
    echo "Checking JAR content..."
    jar tvf target/social-0.0.1-SNAPSHOT.jar | grep META-INF/spring

    echo "Build successful, starting application..."
    # 使用 nohup 后台运行前端服务
    cd frontend
    nohup npm start > frontend.log 2>&1 &
    cd ..
    
    # 等待前端服务启动
    sleep 5
    
    # 启动后端服务，同时输出到文件和控制台
    echo "Starting backend service..."
    java -jar target/social-0.0.1-SNAPSHOT.jar --debug 2>&1 | tee backend.log
else
    echo "Build failed, checking error log..."
    tail -n 50 build.log
    exit 1
fi 