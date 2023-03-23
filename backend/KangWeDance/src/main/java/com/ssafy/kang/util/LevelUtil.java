package com.ssafy.kang.util;

public class LevelUtil {
	public int getLevel(int parentExperience) {
		if (parentExperience >= 100 && 150 > parentExperience)
			return 2;
		else if (parentExperience >= 150 && parentExperience < 225)
			return 3;
		else if (parentExperience >= 225 && parentExperience < 337)
			return 4;
		else if (parentExperience >= 337 && parentExperience < 506)
			return 5;
		else if (parentExperience >= 506 && parentExperience < 759)
			return 6;
		else if (parentExperience >= 759 && parentExperience < 1138)
			return 7;
		else if (parentExperience >= 1138 && parentExperience < 1707)
			return 8;
		else if (parentExperience >= 1707 && parentExperience < 2560)
			return 9;
		else if (parentExperience >= 2560)
			return 10;
		
		return 1;
	}
}
