package com.ssafy.kang.play.model;

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
public class PlayRecordDto {
	int score; // 점수
	int burnedCalories; // 소모 칼로리
	String title; // 노래 제목
	String recordDate; // 기록 날짜 (시간까지)

}
