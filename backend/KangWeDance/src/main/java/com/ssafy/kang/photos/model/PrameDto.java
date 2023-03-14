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
public class PrameDto {
	String prameURL;// 이미지 URL
	boolean prameFlag; // 스티커-0/ 프레임 -1

}
