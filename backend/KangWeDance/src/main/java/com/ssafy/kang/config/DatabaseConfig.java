package com.ssafy.kang.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "com.ssafy.kang.*.model.mapper")
public class DatabaseConfig {
}
