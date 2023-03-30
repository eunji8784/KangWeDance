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
	double height; // 키
	double bmi; // BMI
	String recordDate; // 기록 날짜
}
