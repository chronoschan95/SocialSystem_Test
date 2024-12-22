package com.campus.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 处理静态资源
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true);

        // 处理前端构建文件
        registry.addResourceHandler("/frontend/**")
                .addResourceLocations("classpath:/static/frontend/")
                .resourceChain(true);
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 主页路由
        registry.addViewController("/").setViewName("forward:/index.html");

        // 前端路由支持 - 使用更简单的模式
        registry.addViewController("/app/**").setViewName("forward:/index.html");
        registry.addViewController("/auth/**").setViewName("forward:/index.html");
        registry.addViewController("/news/**").setViewName("forward:/index.html");
        registry.addViewController("/topics/**").setViewName("forward:/index.html");
    }
}