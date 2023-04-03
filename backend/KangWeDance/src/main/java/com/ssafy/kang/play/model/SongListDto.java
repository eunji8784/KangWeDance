package com.ssafy.kang.play.model;

import java.util.List;

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
public class SongListDto {
	int songIdx;
	int playMode; // 0: 댄스모드 / 1:카운트모드 / 2:타임모드 / 3: 레이싱모드
	String explain;
	String title; // 노래 제목
	String thumbnailUrl; // 썸네일 이미지
	String videoUrl; // 동영상 URL
	String previewMusicUrl; // 미리듣기 URL
	String tag; // 해시태그
	int difficulty;// 난이도
	int calorieConsumption; // 칼로리 소모량
	List<SongMotionDto> songMotionList;
}
