package com.ssafy.kang.parents.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class ParentsDto {
	int parentIdx;
	String socialPlatform;
	String socailUid;
	String familyname;
	int experienceScore;
	boolean deletedFlag;
	String accessToken;
}
