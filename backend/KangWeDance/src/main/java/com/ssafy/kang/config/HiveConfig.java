//package com.ssafy.kang.config;
//
//
//import javax.sql.DataSource;
//
//import org.apache.commons.dbcp2.BasicDataSource;
//import org.apache.ibatis.session.AutoMappingBehavior;
//import org.apache.ibatis.session.ExecutorType;
//import org.apache.ibatis.session.SqlSessionFactory;
//import org.mybatis.spring.SqlSessionFactoryBean;
//import org.mybatis.spring.SqlSessionTemplate;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
//import org.springframework.jdbc.datasource.DataSourceTransactionManager;
//import org.springframework.transaction.annotation.EnableTransactionManagement;
//
///*
// * 코드 변경을 최대한 줄이기 위해 디토닉에서 제작한 것과 최대한 똑같이 제작함.
// * Hive에 연동하기 위한 SqlProvider를 만들기 위한 설정 클래스.
// */
//@Configuration
//@EnableTransactionManagement
//public class HiveConfig {
//	
//	@Value("${hive.driver.classname}")
//	private String hiveDriverClassName ;
//	@Value("${hive.connection.url}")
//	private String hiveJdbcUrl;
//	@Value("${hive.connection.username}")
//	private String hiveJdbcUsername;
//	@Value("${hive.connection.password}")
//	private String hiveJdbcPassword;
//	
//
//	@Bean
//	@Qualifier("hiveDataSource")
//	public DataSource hiveDataSource() {
//		
//		BasicDataSource dataSource = new BasicDataSource();
//		
//		dataSource.setDriverClassName(hiveDriverClassName);
//		dataSource.setUrl(hiveJdbcUrl);
//		dataSource.setUsername(hiveJdbcUsername);
//		dataSource.setPassword(hiveJdbcPassword);
//		dataSource.setMinIdle(10);
//
//		return dataSource;
//	}
//	
//	@Bean
//	@Qualifier("hiveDataSourceTransactionManager")
//	public DataSourceTransactionManager hiveDataSourceTransactionManager(@Qualifier("hiveDataSource") DataSource hiveDataSource) {
//		return new DataSourceTransactionManager(hiveDataSource);
//	}
//
//	@Bean
//	@Qualifier("hiveSqlSessionFactory")
//	public SqlSessionFactory hiveSqlSessionFactory(@Qualifier("hiveDataSource") DataSource hiveDataSource) throws Exception {
//		SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
//		bean.setDataSource(hiveDataSource);
//		bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapper/hive.xml"));
//		// *Configuration annotation과 겹쳐서 이렇게 작성
//		org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();
//		
//		configuration.setCacheEnabled(true);
//		configuration.setUseGeneratedKeys(false);
//		configuration.setDefaultExecutorType(ExecutorType.SIMPLE);
//		configuration.setLazyLoadingEnabled(false);
//		configuration.setAggressiveLazyLoading(true);
//		configuration.setUseColumnLabel(true);
//		configuration.setAutoMappingBehavior(AutoMappingBehavior.PARTIAL);
//		configuration.setMultipleResultSetsEnabled(true);
//		configuration.setSafeRowBoundsEnabled(true);
//		configuration.setMapUnderscoreToCamelCase(false);
//		
//		bean.setConfiguration(configuration);
//		
//		return bean.getObject();
//	}
//
//	@Bean
//	@Qualifier("hiveSqlSession")
//	public SqlSessionTemplate hiveSqlSession(@Qualifier("hiveSqlSessionFactory") SqlSessionFactory hiveSqlSessionFactory) {
//		return new SqlSessionTemplate(hiveSqlSessionFactory);
//	}
//
//}