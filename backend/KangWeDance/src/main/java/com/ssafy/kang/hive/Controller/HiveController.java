package com.ssafy.kang.hive.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;

@RestController
@RequestMapping("/hive")
public class HiveController {
	@Autowired
	@Qualifier("jdbcHiveTemplate")
	private JdbcTemplate jdbcTemplate;

	@GetMapping("/databases")
	public ApiResponse<?> showDatabases() {
		List<Map<String, Object>> row = null;
		System.out.println(1);
		row = jdbcTemplate.queryForList("show databases");
		return ApiResponse.success(SuccessCode.CREATE_BODY_CHILDREN, row);
	}
}
