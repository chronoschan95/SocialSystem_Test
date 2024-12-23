package com.campus.social;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.net.Socket;
import java.net.URI;
import java.util.Scanner;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@SpringBootApplication
@ComponentScan(basePackages = "com.campus.social")
@EntityScan("com.campus.social")
public class CampusSocialApplication {
    private static final String FRONTEND_URL = "http://localhost:3000";
    private static final int FRONTEND_PORT = 3000;
    private static final int BACKEND_PORT = 8080;
    private static Process frontendProcess;

    public static void main(String[] args) {
        System.out.println("=== 校园社交平台启动器初始化中 ===");
        showMenu();
    }

    private static void showMenu() {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("\n=== 校园社交平台启动器 ===");
            System.out.println("1. 检查服务状态");
            System.out.println("2. 启动所有服务");
            System.out.println("3. 关闭前端服务(3000端口)");
            System.out.println("4. 关闭后端服务(8080端口)");
            System.out.println("5. 退出程序");
            System.out.print("请选择操作 (1-5): ");

            int choice = scanner.nextInt();
            switch (choice) {
                case 1 -> checkServices();
                case 2 -> startAllServices();
                case 3 -> killProcess(FRONTEND_PORT);
                case 4 -> killProcess(BACKEND_PORT);
                case 5 -> {
                    cleanup();
                    System.exit(0);
                }
                default -> System.out.println("无效的选择，请重试");
            }
        }
    }

    private static void startAllServices() {
        boolean frontendRunning = isPortInUse(FRONTEND_PORT);
        boolean backendRunning = isPortInUse(BACKEND_PORT);

        if (!frontendRunning) {
            CompletableFuture.runAsync(() -> startFrontend());
        }
        if (!backendRunning) {
            CompletableFuture.runAsync(() -> {
                try {
                    SpringApplication.run(CampusSocialApplication.class);
                    System.out.println("后端服务启动成功！");
                } catch (Exception e) {
                    System.err.println("后端服务启动失败: " + e.getMessage());
                    e.printStackTrace();
                }
            });
        }

        try {
            TimeUnit.SECONDS.sleep(5);
            openBrowser();
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    private static void checkServices() {
        boolean frontendRunning = isPortInUse(FRONTEND_PORT);
        boolean backendRunning = isPortInUse(BACKEND_PORT);

        System.out.println("\n=== 服务状态 ===");
        System.out.println("前端服务 (3000端口): " + (frontendRunning ? "运行中" : "未运行"));
        System.out.println("后端服务 (8080端口): " + (backendRunning ? "运行中" : "未运行"));
    }

    private static boolean isPortInUse(int port) {
        try (Socket socket = new Socket("localhost", port)) {
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    private static void startFrontend() {
        try {
            String frontendPath = new File("frontend").getAbsolutePath();
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.directory(new File(frontendPath));

            if (System.getProperty("os.name").toLowerCase().contains("windows")) {
                processBuilder.command("cmd", "/c", "npm", "start");
            } else {
                processBuilder.command("sh", "-c", "npm start");
            }

            File logFile = new File(frontendPath, "frontend.log");
            processBuilder.redirectOutput(logFile);
            processBuilder.redirectError(logFile);
            
            frontendProcess = processBuilder.start();
            System.out.println("Frontend server started successfully!");
        } catch (IOException e) {
            System.err.println("Failed to start frontend server: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void killProcess(int port) {
        try {
            String os = System.getProperty("os.name").toLowerCase();
            ProcessBuilder processBuilder = new ProcessBuilder();
            
            if (os.contains("win")) {
                processBuilder.command("cmd", "/c", "for /f \"tokens=5\" %a in ('netstat -aon ^| find \":" + port + "\"') do taskkill /F /PID %a");
            } else {
                processBuilder.command("sh", "-c", "lsof -ti:" + port + " | xargs kill -9");
            }
            
            Process process = processBuilder.start();
            process.waitFor();
            System.out.println("端口 " + port + " 的进程已被终止");
        } catch (Exception e) {
            System.err.println("终止进程失败: " + e.getMessage());
        }
    }

    private static void cleanup() {
        System.out.println("正在清理资源...");
        if (frontendProcess != null) {
            frontendProcess.destroy();
        }
        killProcess(FRONTEND_PORT);
        killProcess(BACKEND_PORT);
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