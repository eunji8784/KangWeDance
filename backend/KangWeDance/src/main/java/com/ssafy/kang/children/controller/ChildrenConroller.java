package com.ssafy.kang.children.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.kang.children.model.BodyRecordDto;
import com.ssafy.kang.children.model.ChildrenDto;
import com.ssafy.kang.children.model.serivce.ChildrenSerivce;
import com.ssafy.kang.common.ErrorCode;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.util.JwtUtil;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/children")
@RestController
public class ChildrenConroller {
	@Autowired
	private ChildrenSerivce childrenSerivce;
	private final JwtUtil jwtUtil;

	public ChildrenConroller() {
		this.jwtUtil = new JwtUtil();
	}

	@PostMapping("/profile")
	public ApiResponse<?> profileUrlDetails(@RequestPart("file") MultipartFile file) {
		try {
			return ApiResponse.success(SuccessCode.READ_PROFILEURL, childrenSerivce.findProfileUrl(file));
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}

	}

	@GetMapping
	public ApiResponse<?> childrenList(@RequestHeader("accesstoken") String accesstoken) {
		try {
			return ApiResponse.success(SuccessCode.READ_CHILDREN,
					childrenSerivce.findChildren(jwtUtil.getUserIdx(accesstoken)));
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}

	}

	@PostMapping
	public ApiResponse<?> childrenAdd(@RequestHeader("accesstoken") String accesstoken,
			@RequestBody ChildrenDto childrenDto) {
		childrenDto.setParentIdx(jwtUtil.getUserIdx(accesstoken));
		childrenDto.setTodayCalrories(0);
		childrenDto.setBmi(
				Math.round((childrenDto.getWeight() / (Math.pow(childrenDto.getHeight() / 100, 2))) * 10.0) / 10.0);
		try {
			childrenSerivce.addChildren(childrenDto);
			return ApiResponse.success(SuccessCode.CREATE_CHILDREN);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@DeleteMapping
	public ApiResponse<?> childrenRemove(@RequestHeader("accesstoken") String accesstioken,
			@RequestParam int childIdx) {
		try {
			childrenSerivce.removeChildren(childIdx);
			return ApiResponse.success(SuccessCode.DELETE_CHILDREN);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@PatchMapping
	public ApiResponse<?> childrenModify(@RequestHeader("accesstoken") String accesstoken,
			@RequestBody ChildrenDto childrenDto) {
		try {
			childrenSerivce.modifyChildren(childrenDto);
			return ApiResponse.success(SuccessCode.UPDATE_CHILDREN);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@PostMapping("/body-update")
	public ApiResponse<?> childrenBodyAdd(@RequestHeader("accesstoken") String accesstoken,
			@RequestBody BodyRecordDto bodyRecordDto) {
		bodyRecordDto.setBmi(
				Math.round((bodyRecordDto.getWeight() / (Math.pow(bodyRecordDto.getHeight() / 100, 2))) * 10.0) / 10.0);
		try {
			String alreadyAdd = childrenSerivce.findChildrenBodyRecord(bodyRecordDto);
			if (alreadyAdd == null) {
				childrenSerivce.addChildrenBody(bodyRecordDto);
			} else {
				childrenSerivce.modifyChildrenBody(bodyRecordDto);
			}
			return ApiResponse.success(SuccessCode.CREATE_BODY_CHILDREN);
		} catch (Exception e) {
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}
}
