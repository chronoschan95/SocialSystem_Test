#!/bin/bash

# 停止所有相关进程
pkill -f social
pkill -f "node.*react-scripts start"

# 清理目录
rm -rf target/
rm -rf frontend/node_modules/
rm -f frontend/*.log

echo "Cleanup completed" 