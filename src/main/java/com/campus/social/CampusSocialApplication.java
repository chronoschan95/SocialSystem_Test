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
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.Scanner;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.List;
import java.util.ArrayList;
import java.sql.SQLException;
import java.nio.file.Files;
import java.util.Properties;
import java.io.FileOutputStream;
import java.io.FileInputStream;

@SpringBootApplication
@ComponentScan(basePackages = "com.campus.social")
@EntityScan("com.campus.social")
public class CampusSocialApplication {
    private static final String FRONTEND_URL = "http://localhost:3000";
    private static final int FRONTEND_PORT = 3000;
    private static final int BACKEND_PORT = 8080;
    private static Process frontendProcess;
    private static final Scanner scanner = new Scanner(System.in);
    
    // Maven环境变量
    private static final String MAVEN_HOME = System.getenv("MAVEN_HOME");
    private static final String M2_HOME = System.getenv("M2_HOME");
    
    // MySQL配置
    private static String mysqlHost = "localhost";
    private static String mysqlPort = "3306";
    private static String mysqlUsername;
    private static String mysqlPassword;
    private static String mysqlDatabase = "campus_platform";
    
    public static void main(String[] args) {
        try {
            System.out.println("=== 校园社交平台启动器初始化中 ===");
            loadConfiguration();
            configureMySQLConnection();
            showMenu();
        } finally {
            cleanup();
            scanner.close();
        }
    }

    private static void configureMySQLConnection() {
        while (true) {
            System.out.println("\n=== MySQL 配置 ===");
            System.out.println("当前配置:");
            System.out.println("主机: " + mysqlHost);
            System.out.println("端口: " + mysqlPort);
            System.out.println("数据库: " + mysqlDatabase);
            
            System.out.print("\n是否修改配置？(y/n): ");
            if (scanner.nextLine().toLowerCase().startsWith("y")) {
                System.out.print("请输入MySQL主机地址 (默认" + mysqlHost + "): ");
                String input = scanner.nextLine().trim();
                if (!input.isEmpty()) mysqlHost = input;

                System.out.print("请输入MySQL端口 (默认" + mysqlPort + "): ");
                input = scanner.nextLine().trim();
                if (!input.isEmpty()) mysqlPort = input;

                System.out.print("请输入MySQL用户名: ");
                mysqlUsername = scanner.nextLine();
                
                System.out.print("请输入MySQL密码: ");
                mysqlPassword = scanner.nextLine();
                
                saveConfiguration();
            }

            if (testMySQLConnection()) {
                updateApplicationConfig();
                saveConfiguration();
                break;
            } else {
                System.out.print("是否重试？(y/n): ");
                if (!scanner.nextLine().toLowerCase().startsWith("y")) {
                    System.exit(1);
                }
            }
        }
    }

    private static boolean testMySQLConnection() {
        String url = String.format("jdbc:mysql://%s:%s/", mysqlHost, mysqlPort);
        try {
            // 先测试基础连接
            try (Connection conn = DriverManager.getConnection(url, mysqlUsername, mysqlPassword)) {
                System.out.println("MySQL基础连接成功！");
                
                // 测试数据库是否存在
                String dbUrl = url + mysqlDatabase;
                try (Connection dbConn = DriverManager.getConnection(dbUrl, mysqlUsername, mysqlPassword)) {
                    System.out.println("数据库连接成功！");
                    return true;
                } catch (SQLException e) {
                    // 数据库不存在，尝试创建
                    if (e.getErrorCode() == 1049) {
                        System.out.println("数据库不存在，将自动创建...");
                        try (Statement stmt = conn.createStatement()) {
                            stmt.execute("CREATE DATABASE IF NOT EXISTS " + mysqlDatabase);
                            System.out.println("数据库创建成功！");
                            return true;
                        }
                    }
                    throw e;
                }
            }
        } catch (SQLException e) {
            System.err.println("MySQL连接失败: " + e.getMessage());
            System.out.println("\n可能的原因：");
            System.out.println("1. MySQL服务未启动");
            System.out.println("2. 用户名或密码错误");
            System.out.println("3. 主机或端口配置错误");
            System.out.println("4. 防火墙阻止连接");
            return false;
        }
    }

    private static void updateApplicationConfig() {
        try {
            File ymlFile = new File("src/main/resources/application.yml");
            List<String> lines = Files.readAllLines(ymlFile.toPath());
            List<String> newLines = new ArrayList<>();
            
            boolean inDatasource = false;
            for (String line : lines) {
                if (line.trim().startsWith("datasource:")) {
                    inDatasource = true;
                }
                
                if (inDatasource) {
                    if (line.trim().startsWith("url:")) {
                        String newUrl = String.format("    url: jdbc:mysql://%s:%s/%s?createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=Asia/Shanghai",
                            mysqlHost, mysqlPort, mysqlDatabase);
                        newLines.add(newUrl);
                        continue;
                    }
                    if (line.trim().startsWith("username:")) {
                        newLines.add("    username: " + mysqlUsername);
                        continue;
                    }
                    if (line.trim().startsWith("password:")) {
                        newLines.add("    password: " + mysqlPassword);
                        continue;
                    }
                }
                newLines.add(line);
            }
            
            Files.write(ymlFile.toPath(), newLines);
            System.out.println("配置文件更新成功！");
        } catch (IOException e) {
            System.err.println("更新配置文件失败: " + e.getMessage());
        }
    }

    private static void showMenu() {
        while (true) {
            try {
                System.out.println("\n=== 校园社交平台启动器 ===");
                System.out.println("1. 检查服务状态");
                System.out.println("2. 启动所有服务(清理缓存)");
                System.out.println("3. 快速启动所有服务(不清理缓存)");
                System.out.println("4. 单独启动前端服务");
                System.out.println("5. 单独启动后端服务");
                System.out.println("6. 关闭前端服务");
                System.out.println("7. 关闭后端服务");
                System.out.println("8. 重新配置MySQL");
                System.out.println("9. 退出程序");
                System.out.print("请选择操作 (1-9): ");

                String input = scanner.nextLine().trim();
                int choice;
                try {
                    choice = Integer.parseInt(input);
                } catch (NumberFormatException e) {
                    System.out.println("请输入有效的数字！");
                    continue;
                }

                switch (choice) {
                    case 1 -> checkServices();
                    case 2 -> startAllServices(true);
                    case 3 -> startAllServices(false);
                    case 4 -> startFrontendOnly();
                    case 5 -> startBackendOnly();
                    case 6 -> killProcess(FRONTEND_PORT);
                    case 7 -> killProcess(BACKEND_PORT);
                    case 8 -> configureMySQLConnection();
                    case 9 -> {
                        cleanup();
                        System.exit(0);
                    }
                    default -> System.out.println("无效的选择，请重试");
                }
            } catch (Exception e) {
                System.err.println("发生错误: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }

    private static void startAllServices(boolean cleanCache) {
        if (cleanCache) {
            System.out.println("正在清理并重新构建项目...");
            try {
                String mvnPath = getMavenExecutablePath();
                
                // 清理
                ProcessBuilder mvnClean = new ProcessBuilder(mvnPath, "clean");
                mvnClean.inheritIO();
                Process cleanProcess = mvnClean.start();
                cleanProcess.waitFor();

                // 重新构建
                ProcessBuilder mvnPackage = new ProcessBuilder(mvnPath, "package", "-DskipTests");
                mvnPackage.inheritIO();
                Process packageProcess = mvnPackage.start();
                packageProcess.waitFor();

                if (packageProcess.exitValue() != 0) {
                    System.err.println("构建失败，请检查错误信息");
                    return;
                }
            } catch (Exception e) {
                System.err.println("构建过程出错: " + e.getMessage());
                return;
            }
        }

        startServices();
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

    private static void startFrontendOnly() {
        if (!isPortInUse(FRONTEND_PORT)) {
            CompletableFuture.runAsync(() -> {
                try {
                    startFrontend();
                    System.out.println("正在启动前端服务，请稍候...");
                    TimeUnit.SECONDS.sleep(5);
                    if (isPortInUse(FRONTEND_PORT)) {
                        System.out.println("前端服务启动成功！");
                        openBrowser();
                        System.out.println("\n请继续选择操作...");
                    }
                } catch (Exception e) {
                    System.err.println("前端服务启动失败: " + e.getMessage());
                }
            });
        } else {
            System.out.println("前端服务已在运行中");
        }
        // 不再等待，直接返回菜单
    }

    private static void startBackendOnly() {
        if (!testMySQLConnection()) {
            System.out.println("MySQL连接失败，是否重新配置？(y/n)");
            if (scanner.nextLine().toLowerCase().startsWith("y")) {
                configureMySQLConnection();
            } else {
                return;
            }
        }

        if (!isPortInUse(BACKEND_PORT)) {
            CompletableFuture.runAsync(() -> {
                try {
                    System.setProperty("spring.config.location", "classpath:/application.yml");
                    SpringApplication.run(CampusSocialApplication.class);
                    System.out.println("后端服务启动成功！");
                    // 添加延迟，等待服务完全启动
                    TimeUnit.SECONDS.sleep(2);
                    System.out.println("\n请继续选择操作...");
                } catch (Exception e) {
                    System.err.println("后端服务启动失败: " + e.getMessage());
                    e.printStackTrace();
                }
            });
        } else {
            System.out.println("后端服务已在运行中");
        }
        // 不再等待，直接返回菜单
    }

    private static void startServices() {
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
            if (isPortInUse(FRONTEND_PORT)) {
                openBrowser();
            }
        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
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
        System.out.print("确认要关闭端口 " + port + " 的服务吗？(y/n): ");
        if (!scanner.nextLine().toLowerCase().startsWith("y")) {
            System.out.println("操作已取消");
            return;
        }
        
        try {
            String os = System.getProperty("os.name").toLowerCase();
            ProcessBuilder processBuilder = new ProcessBuilder();
            if (os.contains("win")) {
                processBuilder.command("cmd", "/c", "for /f \"tokens=5\" %a in ('netstat -aon ^| find \"" + port + "\"') do taskkill /f /pid %a");
            } else {
                processBuilder.command("sh", "-c", "lsof -ti:" + port + " | xargs kill -9");
            }
            Process process = processBuilder.start();
            process.waitFor(5, TimeUnit.SECONDS);
            
            // 验证服务是否已关闭
            if (!isPortInUse(port)) {
                System.out.println("服务已成功关闭");
            } else {
                System.out.println("服务关闭失败，请手动关闭");
            }
        } catch (Exception e) {
            System.err.println("关闭服务时发生错误: " + e.getMessage());
        }
    }

    private static void cleanup() {
        // 不再自动关闭服务
        System.out.println("程序退出，服务将继续运行...");
        System.out.println("如需关闭服务，请使用菜单中的关闭选项");
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

    private static String getMavenExecutablePath() {
        String os = System.getProperty("os.name").toLowerCase();
        String mvnCommand = os.contains("win") ? "mvn.cmd" : "mvn";
        
        // 按优先级查找 Maven
        List<String> mavenPaths = new ArrayList<>();
        String mavenHome = System.getenv("MAVEN_HOME");
        String m2Home = System.getenv("M2_HOME");
        
        if (mavenHome != null) mavenPaths.add(mavenHome + "/bin/" + mvnCommand);
        if (m2Home != null) mavenPaths.add(m2Home + "/bin/" + mvnCommand);
        mavenPaths.add("mvn"); // 如果 Maven 在系统 PATH 中
        
        for (String path : mavenPaths) {
            if (new File(path).exists()) {
                return path;
            }
        }
        
        throw new RuntimeException("找不到Maven，请确保已安装Maven并设置环境变量");
    }

    private static void saveConfiguration() {
        Properties props = new Properties();
        props.setProperty("mysql.host", mysqlHost);
        props.setProperty("mysql.port", mysqlPort);
        props.setProperty("mysql.username", mysqlUsername);
        props.setProperty("mysql.password", mysqlPassword);
        props.setProperty("mysql.database", mysqlDatabase);
        
        try (FileOutputStream out = new FileOutputStream("config.properties")) {
            props.store(out, "Campus Social Platform Configuration");
            System.out.println("配置已保存");
        } catch (IOException e) {
            System.err.println("保存配置文件失败: " + e.getMessage());
        }
    }

    private static void loadConfiguration() {
        Properties props = new Properties();
        File configFile = new File("config.properties");
        
        if (configFile.exists()) {
            try (FileInputStream in = new FileInputStream(configFile)) {
                props.load(in);
                mysqlHost = props.getProperty("mysql.host", mysqlHost);
                mysqlPort = props.getProperty("mysql.port", mysqlPort);
                mysqlUsername = props.getProperty("mysql.username", mysqlUsername);
                mysqlPassword = props.getProperty("mysql.password", mysqlPassword);
                mysqlDatabase = props.getProperty("mysql.database", mysqlDatabase);
                System.out.println("已加载上次保存的配置");
            } catch (IOException e) {
                System.err.println("加载配置文件失败: " + e.getMessage());
            }
        }
    }
}