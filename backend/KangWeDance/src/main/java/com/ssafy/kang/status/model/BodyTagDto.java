package com.ssafy.kang.status.model;

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
public class BodyTagDto {
	int childIdx;
	int 팔;
	int 다리;
	int 몸통;
	int 유연성;
	int 균형감각;
	int 유산소;
	int 키성장;
	int 총_플레이시간;

}
