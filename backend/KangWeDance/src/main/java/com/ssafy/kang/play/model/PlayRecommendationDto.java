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
public class PlayRecommendationDto {
	int childIdx;
	SongListDto recommendationSong;
}
