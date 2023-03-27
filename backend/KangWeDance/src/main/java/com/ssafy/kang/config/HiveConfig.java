package com.ssafy.kang.config;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.IOException;
import javax.sql.DataSource;
import org.apache.commons.dbcp.BasicDataSource;
/*
 * 코드 변경을 최대한 줄이기 위해 디토닉에서 제작한 것과 최대한 똑같이 제작함.
 * Hive에 연동하기 위한 SqlProvider를 만들기 위한 설정 클래스.
 */
@Configuration
public class HiveConfig {
	
	@Value("${hive.connectionURL}")
	private String hiveJdbcUrl;
	@Value("${hive.username}")
	private String hiveJdbcUsername;
	@Value("${hive.password}")
	private String hiveJdbcPassword;
	
	public DataSource getHiveDataSource() throws IOException{
		
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setUrl(hiveJdbcUrl);
		dataSource.setDriverClassName("org.apache.hive.jdbc.HiveDriver");
		dataSource.setUsername(hiveJdbcUsername);
		dataSource.setPassword(hiveJdbcPassword);
		
		return dataSource;
	}
	@Bean(name ="jdbcHiveTemplate")
	public JdbcTemplate getJDBCTemplate() throws IOException{
		return new JdbcTemplate(getHiveDataSource());
	}
}