package com.ssafy.kang;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.parents.controller.ParentsConroller;
import com.ssafy.kang.parents.model.ParentsDto;
import com.ssafy.kang.util.JwtUtil;

@SpringBootTest
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class KangWeDanceApplicationTests {

	String accessToken = "eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjgwNDk4MjA1Nzc4LCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODA1ODQ2MDUsInN1YiI6ImFjY2Vzcy10b2tlbiIsInVzZXJpZHgiOjI0fQ.PlfL6bsT5CMgMUbQPqdRplcqyOaOaIuW6vPVFXVBLdQ";
	
	@Autowired
	ParentsConroller parentsConroller;
	@Test
	void Join() {
		JwtUtil jwtUtil = new JwtUtil();
		ParentsDto pd = new ParentsDto();
		pd.setFamilyname("ssafy123");	
		assertEquals(parentsConroller.nicknameModify(accessToken,pd).getMessage(),SuccessCode.UPDATE_NICKNAME.getMessage());
	}

}
