package com.ssafy.kang.children.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ChildrenDto {
	String familyname;
	int childIdx; // 아이 고유 번호
	int parentIdx;
	boolean gender;// 성별 - 0: 남자/ 1: 여자
	double weight; // 몸무게
	double height; // 키
	double bmi;
	String profileImageUrl; // 사진 URL
	String nickname; // 닉네임
	String birthDate; // 생년월일
	boolean bodyRecordFlag;
}
