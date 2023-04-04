package com.ssafy.kang;

import static org.junit.jupiter.api.Assertions.*;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URL;
import java.util.List;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
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
import com.ssafy.kang.photos.controller.PhotosController;
import com.ssafy.kang.photos.model.PhotosDto;
import com.ssafy.kang.play.controller.PlayController;
import com.ssafy.kang.status.controller.StatusController;
import com.ssafy.kang.util.JwtUtil;

@SpringBootTest
@TestMethodOrder(value = MethodOrderer.OrderAnnotation.class)
class KangWeDanceApplicationTests {

	String accessToken = "eyJ0eXAiOiJKV1QiLCJyZWdEYXRlIjoxNjgwNTExMzg4MDMxLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODE4MDczODgsInN1YiI6ImFjY2Vzcy10b2tlbiIsInVzZXJpZHgiOjI0fQ.6n3ClQEzjrD8P0NvOyKkre7vHSKkdShYOpPLQ36OcNg";

	@Autowired
	ParentsConroller parentsConroller;
	@Autowired
	ChildrenConroller childrenConroller;

	@Autowired
	PhotosController photosController;
	
	@Autowired
	StatusController statusController;
	
	@Autowired
	PlayController playController;
	@Test
	@Order(1)
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

		// MockMultipartFile의 gradleTest Build 오류로 인해 고정값 삽입
//		String path = this.getClass().getResource("/ss.png").getPath();
//		MockMultipartFile file = new MockMultipartFile("ss", "ss.png", "image/png",
//				new FileInputStream(path));

		// MultipartUtil의 getLocalHomeDirectory에서 return겂 변경 업로드시 리눅스로 되어있음 로컬은
		// user.home으로 설정

//		ApiResponse temp = childrenConroller.profileUrlDetails(file);
//		assertEquals(temp.getMessage(),SuccessCode.READ_PROFILEURL.getMessage());
//		System.out.println(SuccessCode.READ_PROFILEURL.getMessage());
		ChildrenDto childrenDto = new ChildrenDto();
		childrenDto.setBirthDate("1997-10-07");
		childrenDto.setNickname("아기");
		childrenDto.setGender(false);
		childrenDto.setHeight(111);
		childrenDto.setWeight(11);
		childrenDto.setProfileImageUrl("https://d3qb4vbeyp8phu.cloudfront.net/기본+프로필+이미지.png");
		assertEquals(childrenConroller.childrenAdd(accessToken, childrenDto).getMessage(),
				SuccessCode.CREATE_CHILDREN.getMessage());
		System.out.println(SuccessCode.CREATE_CHILDREN.getMessage());
	}

	@Test
	@Order(2)
	void childrenProfileApi() throws Exception {
		ApiResponse api = childrenConroller.childrenList(accessToken);
		assertEquals(api.getMessage(), SuccessCode.READ_CHILDREN.getMessage());
		System.out.println(SuccessCode.READ_CHILDREN.getMessage());
		
		List<ChildrenDto> temp = (List<ChildrenDto>) api.getData();
		for (int i = 0; i < temp.size(); i++) {
			ChildrenDto cd = temp.get(i);
			cd.setNickname("기기");
			ApiResponse childrenApi = childrenConroller.childrenModify(accessToken,cd);
			
			assertEquals(childrenApi.getMessage(), SuccessCode.UPDATE_CHILDREN.getMessage());
			System.out.println(SuccessCode.UPDATE_CHILDREN.getMessage()+" 아이 정보 "+cd);
		}
		
		for (int i = 0; i < temp.size(); i++) {
			assertEquals(childrenConroller.childrenRemove(accessToken, temp.get(i).getChildIdx()).getMessage(), SuccessCode.DELETE_CHILDREN.getMessage());
			System.out.println(SuccessCode.DELETE_CHILDREN.getMessage());
		}
	}
	@Test
	@Order(3)
	void PhotoApi() throws Exception{
		assertEquals(photosController.framesDetails(accessToken).getMessage(), SuccessCode.READ_PRAME_LIST.getMessage());
		System.out.println(SuccessCode.READ_PRAME_LIST.getMessage());
		//로컬에서 안되고 서버에서 됌
		//ApiResponse api = photosController.photosDetails(accessToken,1);
		//assertEquals(api.getMessage(),SuccessCode.READ_PHOTO_LIST.getMessage());
	}
	
	@Test
	@Order(4)
	void play()throws Exception{
		assertEquals(statusController.playRecordDetails("2023-03-28", accessToken).getMessage(),SuccessCode.READ_PLAYRECORD_LIST.getMessage());
		System.out.println(SuccessCode.READ_PLAYRECORD_LIST.getMessage());
		assertEquals(statusController.searchMonthRecord(accessToken,89,3).getMessage(),SuccessCode.READ_MONTHLY_RECORD.getMessage());
		System.out.println(SuccessCode.READ_MONTHLY_RECORD.getMessage());
		assertEquals(statusController.bodyRecordList(accessToken).getMessage(),SuccessCode.READ_BODY_RECORD_LIST.getMessage());
		System.out.println(SuccessCode.READ_BODY_RECORD_LIST.getMessage());
		assertEquals(playController.playList(accessToken).getMessage(),SuccessCode.READ_PLAY_LIST.getMessage());
		System.out.println(SuccessCode.READ_PLAY_LIST.getMessage());
		assertEquals(playController.playRecommendationList(accessToken).getMessage(), SuccessCode.READ_PLAY_RECOMMENDATION.getMessage());
		System.out.println(SuccessCode.READ_PLAY_RECOMMENDATION.getMessage());
	}
}
