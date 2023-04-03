package com.ssafy.kang.util;

public class GuideMentUtil {
	public String getGuideMent(int songIdx) {
		String ment = "";
		if (songIdx == 3) {
			// 나무 자세
			ment = "두 팔을 하늘로 쭈욱 ~ 오른쪽 다리를 번쩍! 들어봐요!";
		} else if (songIdx == 4) {
			// 스케이트 자세
			ment = "양 팔과 다리를 좌우로 움직이며 슈욱 슈욱 ~ 스케이트를 타봐요!";
		} else if (songIdx == 5) {
			// 기대서 팔굽혀 펴기
			ment = "듬직한 엄마 아빠 등을 짚고 팔굽혀 펴기를 해봐요!";
		} else if (songIdx == 6) {
			// 기지개 자세
			ment = "기분 좋게 기지개를 쭈욱 ~ 켜 봐요!";
		} else if (songIdx == 7) {
			// 날개 자세
			ment = "엄마 아빠가 뒤에서 양 팔을 눌러줘요!";
		}
		return ment;
	}
}
