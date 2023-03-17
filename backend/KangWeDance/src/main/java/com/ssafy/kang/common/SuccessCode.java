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
	//회원
	READ_EXPERIENCE(SUCCESS, "회원 경험치 조회 성공"), UPDATE_NICKNAME(SUCCESS, "회원 닉네임 변경 성공"),
	DELETE_USER(SUCCESS, "회원 삭제 성공"),LOGOUT(SUCCESS,"로그아웃 성공"),
	LOGIN(SUCCESS,"로그인 성공"),GO_JOIN(SUCCESS,"회원 가입"),
	//사진
	CREATE_PHOTO(SUCCESS, "사진 등록 성공"), READ_PHOTO_LIST(SUCCESS, "사진 리스트 조회 성공"),
	READ_PRAME_LIST(SUCCESS, "스티커 및 프레임 조회 성공"), CREATE_KAKAO(SUCCESS, "카카오톡 공유하기 성공"),
	DELETE_PHOTO(SUCCESS, "사진 삭제하기 성공"),

	// status
	READ_PLAYRECORD_LIST(SUCCESS, "운동 기록 조회 성공"), READ_FOOD_LIST(SUCCESS, "음식 검색 성공");

	private final StatusCode statusCode;
	private final String message;

	public int getStatus() {
		return statusCode.getStatus();
	}

}
