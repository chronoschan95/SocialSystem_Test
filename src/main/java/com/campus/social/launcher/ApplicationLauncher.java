package com.campus.social.launcher;

import org.springframework.boot.SpringApplication;
import com.campus.social.Application;
import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class ApplicationLauncher {

    private static final String FRONTEND_URL = "http://localhost:3000";
    private static Process frontendProcess;

    public static void main(String[] args) {
        // 异步启动前端和后端
        CompletableFuture<Void> frontendFuture = CompletableFuture.runAsync(() -> startFrontend());
        CompletableFuture<Void> backendFuture = CompletableFuture.runAsync(() -> startBackend(args));

        CompletableFuture.allOf(frontendFuture, backendFuture)
            .thenRun(() -> {
                try {
                    // 等待服务启动
                    TimeUnit.SECONDS.sleep(3);
                    // 打开浏览器
                    openBrowser();
                } catch (Exception e) {
                    System.err.println("Error opening browser: " + e.getMessage());
                }
            })
            .join();

        // 添加关闭钩子
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("Shutting down servers...");
            if (frontendProcess != null) {
                frontendProcess.destroy();
            }
        }));
    }

    private static void startFrontend() {
        try {
            String frontendPath = new File("frontend").getAbsolutePath();
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.directory(new File(frontendPath));

            // 根据操作系统设置命令
            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                processBuilder.command("cmd", "/c", "npm", "start");
            } else {
                processBuilder.command("sh", "-c", "npm start");
            }

            // 重定向输出到日志文件
            File logFile = new File(frontendPath, "frontend.log");
            processBuilder.redirectOutput(logFile);
            processBuilder.redirectError(logFile);
            
            // 启动前端进程
            frontendProcess = processBuilder.start();
            System.out.println("Frontend server started successfully!");
            
        } catch (IOException e) {
            System.err.println("Failed to start frontend server: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void startBackend(String[] args) {
        try {
            SpringApplication app = new SpringApplication(Application.class);
            app.run(args);
            System.out.println("Backend server started successfully!");
        } catch (Exception e) {
            System.err.println("Failed to start backend server: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void openBrowser() {
        try {
            if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                Desktop.getDesktop().browse(new URI(FRONTEND_URL));
            } else {
                String os = System.getProperty("os.name").toLowerCase();
                ProcessBuilder pb;
                
                if (os.contains("win")) {
                    pb = new ProcessBuilder("cmd", "/c", "start", FRONTEND_URL);
                } else if (os.contains("mac")) {
                    pb = new ProcessBuilder("open", FRONTEND_URL);
                } else if (os.contains("nix") || os.contains("nux")) {
                    pb = new ProcessBuilder("xdg-open", FRONTEND_URL);
                } else {
                    throw new UnsupportedOperationException("Unsupported operating system");
                }
                
                pb.start();
            }
        } catch (Exception e) {
            System.err.println("Error opening browser: " + e.getMessage());
        }
    }
} 