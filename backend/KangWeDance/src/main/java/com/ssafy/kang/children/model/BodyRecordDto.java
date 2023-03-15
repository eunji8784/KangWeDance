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
public class BodyRecordDto {
	int weight; // 몸무게
	int bmi; // BMI
	int height; // 키
	int todayCalories; // 오늘 칼로리 소모량
	int recommendedCalorie; // 권장 칼로리량
	int excessCalories; // 초과 칼로리

	String recordDate; // 기록 날짜

}
