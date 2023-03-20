package com.ssafy.kang.children.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.kang.children.model.BodyRecordDto;
import com.ssafy.kang.children.model.ChildrenDto;
import com.ssafy.kang.children.model.serivce.ChildrenSerivce;
import com.ssafy.kang.common.ErrorCode;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/children")
@RestController
public class ChildrenConroller {
	@Autowired
	private ChildrenSerivce childrenSerivce;
	
	@GetMapping
	public ApiResponse<?> childrenList(@RequestParam int accesstoken){
		try {
			return ApiResponse.success(SuccessCode.READ_CHILDREN ,childrenSerivce.findChildren(accesstoken)) ;
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
		
		
	}
	@PostMapping
	public ApiResponse<?> childrenAdd(@RequestParam int accesstoken, @RequestBody ChildrenDto childrenDto ){
		childrenDto.setParentIdx(accesstoken);
		childrenDto.setProfileImageUrl("https://kangwedance.s3.ap-northeast-2.amazonaws.com/%EA%B8%B0%EB%B3%B8+%ED%94%84%EB%A1%9C%ED%95%84+%EC%9D%B4%EB%AF%B8%EC%A7%80.png");
		childrenDto.setTodayCalrories(0);
		childrenDto.setBmi(Math.round((childrenDto.getWeight()/(Math.pow(childrenDto.getHeight()/100,2)))*10)/10.0);
		try {
			childrenSerivce.addChildren(childrenDto);
			return ApiResponse.success(SuccessCode.CREATE_CHILDREN);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	@DeleteMapping
	public ApiResponse<?> childrenRemove(@RequestParam int accesstioken,@RequestParam int childIdx){
		try {
			childrenSerivce.removeChildren(childIdx);
			return ApiResponse.success(SuccessCode.DELETE_CHILDREN);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	@PatchMapping
	public ApiResponse<?> childrenModify(@RequestParam int accesstoken, @RequestBody ChildrenDto childrenDto ){
		try {
			childrenSerivce.modifyChildren(childrenDto);
			return ApiResponse.success(SuccessCode.UPDATE_CHILDREN);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
	@PatchMapping("/body-update")
	public ApiResponse<?> childrenBodyAdd(@RequestParam int accesstoken, @RequestBody BodyRecordDto bodyRecordDto ){
		bodyRecordDto.setBmi(Math.round((bodyRecordDto.getWeight()/(Math.pow(bodyRecordDto.getHeight()/100,2)))*10)/10.0);
		try {
			childrenSerivce.addChildrenBody(bodyRecordDto);
			return ApiResponse.success(SuccessCode.CREATE_BODY_CHILDREN);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
}
