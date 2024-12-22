package com.campus.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleError(HttpServletRequest request) {
        // 获取错误状态码
        Integer statusCode = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        String errorMessage = (String) request.getAttribute(RequestDispatcher.ERROR_MESSAGE);
        String path = (String) request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);

        // 创建错误响应对象
        ErrorResponse errorResponse = new ErrorResponse(
                statusCode != null ? statusCode : 500,
                errorMessage != null ? errorMessage : "发生未知错误",
                path != null ? path : request.getRequestURI()
        );

        return ResponseEntity
                .status(errorResponse.getStatus())
                .body(errorResponse);
    }

    // 错误响应的数据结构
    private static class ErrorResponse {
        private final int status;
        private final String message;
        private final String path;
        private final long timestamp;

        public ErrorResponse(int status, String message, String path) {
            this.status = status;
            this.message = message;
            this.path = path;
            this.timestamp = System.currentTimeMillis();
        }

        // Getter方法
        public int getStatus() { return status; }
        public String getMessage() { return message; }
        public String getPath() { return path; }
        public long getTimestamp() { return timestamp; }
    }
}