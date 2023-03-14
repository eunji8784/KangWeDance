package com.ssafy.kang.common;

import static com.ssafy.kang.common.StatusCode.SUCCESS;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum SuccessCode {

	/*
	 * 등록/생성: CREATE, 조회: READ, 수정: UPDATE, 삭제/취소: DELETE
	 */

	READ_CHECK_NICKNAME(SUCCESS, "유저 닉네임 중복 여부 확인 성공"), READ_CHECK_USER(SUCCESS, "회원 정보 조회 성공"),;

	private final StatusCode statusCode;
	private final String message;

	public int getStatus() {
		return statusCode.getStatus();
	}

}
