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
public class SongMotionDto {
	int danceIndex;
	int startTime;
	int endTime;
	Double accuracy;
	int countDelay;
	int countStandard;
}
