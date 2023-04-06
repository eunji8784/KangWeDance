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
public class BodyRecordForHadoop {
	int childIdx;
	double bodyRecordIdx;
	double bmi; // BMI
	double height; // 키
	double weight;
	double todayCalrories;
	String recordDate; // 기록 날짜
}
