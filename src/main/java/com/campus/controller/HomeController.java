package com.campus.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/api/health")
    public String healthCheck() {
        return "应用程序正常运行中";
    }

    // 添加一个测试端点
    @GetMapping("/api/test")
    public String test() {
        return "API测试端点正常工作";
    }
}