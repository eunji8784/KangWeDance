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

	// photos
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
