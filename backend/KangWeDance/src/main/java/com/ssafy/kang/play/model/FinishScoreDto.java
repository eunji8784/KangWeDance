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
public class FinishScoreDto {
	int score;// 점수
	int playMode; // 플레이모드
	int level; // 레벨
	int experienceScore;// 경험치
	boolean isCompensated; // 보상여부
}
