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
public class StatisticsDto {
	int arm;
	int leg;
	int flexibility;
	int body;
	int aerobic;
	int senseOfBalance; // 균형 감각
	int height; // 키크기
	int playTime; // 초단위
	int childIdx;
	int parentIdx;
}
