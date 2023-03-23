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
public class PlayRequestDto {
	int childIdx;
	int songIdx;
	int playMode;
	List<ScoreRequestDto> scoreRecordList;
}
