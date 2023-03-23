package com.ssafy.kang.photos.model;

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
public class FramesDto {
	int frameIdx;
	int level;
	String frameURL;// 이미지 URL
	int frameFlag; // 스티커-0/ 프레임 -1
	boolean lock;

}
