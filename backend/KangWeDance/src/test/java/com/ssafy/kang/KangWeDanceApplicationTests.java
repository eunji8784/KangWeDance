package com.ssafy.kang;

import static org.junit.jupiter.api.Assertions.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;

import com.ssafy.kang.children.controller.ChildrenConroller;
import com.ssafy.kang.children.model.ChildrenDto;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.parents.controller.ParentsConroller;
import com.ssafy.kang.parents.model.ParentsDto;
import com.ssafy.kang.util.JwtUtil;

@SpringBootTest
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class KangWeDanceApplicationTests {

	String accessToken = "eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjgwNDk4MjA1Nzc4LCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODA1ODQ2MDUsInN1YiI6ImFjY2Vzcy10b2tlbiIsInVzZXJpZHgiOjI0fQ.PlfL6bsT5CMgMUbQPqdRplcqyOaOaIuW6vPVFXVBLdQ";

	@Autowired
	ParentsConroller parentsConroller;
	@Autowired
	ChildrenConroller childrenConroller;

	@Test
	void Join() throws Exception {
		JwtUtil jwtUtil = new JwtUtil();
		ParentsDto pd = new ParentsDto();
		pd.setFamilyname("ssafy123");
		assertEquals(parentsConroller.nicknameModify(accessToken, pd).getMessage(),
				SuccessCode.UPDATE_NICKNAME.getMessage());
		System.out.println(SuccessCode.UPDATE_NICKNAME.getMessage());
		assertEquals(parentsConroller.experienceDetails(accessToken).getMessage(),
				SuccessCode.READ_EXPERIENCE.getMessage());
		System.out.println(SuccessCode.READ_EXPERIENCE.getMessage());

//		String path = this.getClass().getResource("/ss.png").getPath();
//		MockMultipartFile file = new MockMultipartFile("ss", "ss.png", "image/png",
//				new FileInputStream(path));
		
		//MultipartUtil의 getLocalHomeDirectory에서 return겂 변경 업로드시 리눅스로 되어있음 로컬은 user.home으로 설정
//		ApiResponse temp = childrenConroller.profileUrlDetails(file);
//		assertEquals(temp.getMessage(),SuccessCode.READ_PROFILEURL.getMessage());
//		System.out.println(SuccessCode.READ_PROFILEURL.getMessage());
//		ChildrenDto childrenDto = new ChildrenDto();
//		childrenDto.setBirthDate("1997-10-07");
//		childrenDto.setNickname("아기");
//		childrenDto.setGender(false);
//		childrenDto.setHeight(111);
//		childrenDto.setWeight(11);
//		//childrenDto.setProfileImageUrl(temp.getData().toString());
//		assertEquals(childrenConroller.childrenAdd(accessToken, childrenDto).getMessage(), SuccessCode.CREATE_CHILDREN.getMessage());
//		System.out.println(SuccessCode.CREATE_CHILDREN.getMessage());
		
	}

}
