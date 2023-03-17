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
public class PhotosDto {
	int photoIdx;
	int parentIdx;

	String photoImageUrl; // 사진 경로
	String createDate;// 날짜
	String photoName;// 사진파일명

}
