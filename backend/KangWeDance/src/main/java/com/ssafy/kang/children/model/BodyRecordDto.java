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
	int childIdx;
	double weight; // 몸무게
	double bmi; // BMI
	double height; // 키
	double todayCalrories; // 오늘 칼로리 소모량
	double recommendedCalorie; // 권장 칼로리량
	double excessCalories; // 초과 칼로리
	String recordDate; // 기록 날짜

}
