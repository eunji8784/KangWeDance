package com.ssafy.kang.parents.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.kang.common.ErrorCode;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.parents.model.ParentsDto;
import com.ssafy.kang.parents.model.service.ParentsService;
import com.ssafy.kang.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/parents")
@RestController
public class ParentsConroller {
	@Autowired
	ParentsService parentsService;
	private final JwtUtil jwtUtil;
	public ParentsConroller() {
		this.jwtUtil = new JwtUtil();
	}
	@GetMapping("/social/kakao")
	public ApiResponse<?> kakaoUserAdd(@RequestParam String code){

		Map<String, String> token;
		Map<String, String> userIO;
		ParentsDto dto = new ParentsDto();
		try {
			token = parentsService.getToken(code);
			userIO = parentsService.getUserInfo(token.get("accesstoken"));
			dto.setSocailUid(userIO.get("id"));
			dto.setSocailUid("Kakao");
			dto.setNickname(userIO.get("nickname"));
			//dto = parentsService.findSocial(dto.getSocailUid());
			
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	@PatchMapping("nickname")
	public ApiResponse<?> nicknameModify(@RequestParam int accesstoken, @RequestBody String nickname){
		
		try {
			parentsService.modifyNickname(ParentsDto.builder().parentIdx(accesstoken).nickname(nickname).build());
			return ApiResponse.success(SuccessCode.UPDATE_NICKNAME);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
		
	}
	@GetMapping("/experience-score")
	public ApiResponse<?> experienceDetails(@RequestParam int accesstoken){//추후 엑세스 토큰으로 대체
		try {
			return ApiResponse.success(SuccessCode.READ_EXPERIENCE,parentsService.findExperience(accesstoken));
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	@DeleteMapping
	public ApiResponse<?> userRemove(@RequestParam int accesstoken){
		try {
			parentsService.removeUser(accesstoken);
			return ApiResponse.success(SuccessCode.DELETE_USER);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
}
