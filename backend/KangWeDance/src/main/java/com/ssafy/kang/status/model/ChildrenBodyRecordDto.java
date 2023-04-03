package com.ssafy.kang.status.model;

import java.util.List;

import com.ssafy.kang.children.model.BodyRecordDto;

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
public class ChildrenBodyRecordDto {
	int childIdx;// 아이 고유 번호
	int standardWeight; // 평균 체중 대비 체중 퍼센트
	int standardHeight;

	List<BodyRecordDto> bodyRecord; // 몸 기록 리스트
}
