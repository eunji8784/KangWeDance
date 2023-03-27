package com.ssafy.kang.status.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.kang.play.model.PlayRecordDto;
import com.ssafy.kang.status.model.FoodsDto;

@Service
public interface StatusService {
//	| findOrder() | 조회 유형의 service 메서드 |
//	| addOrder() | 등록 유형의 service 메서드 |
//	| modifyOrder() | 변경 유형의 service 메서드 |
//	| removeOrder() | 삭제 유형의 service 메서드 |
//	| saveOrder() | 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드 |

	// 아이별 운동 기록 조회
	public List<PlayRecordDto> findplayRecord(String date) throws Exception;

	public List<FoodsDto> findFoodList(String word) throws Exception;

	// 일회성 코드 : 검색을 위해 영어 <->한국어
	// public String temps(int i) throws Exception;
	// public void tumpu(String k, String i) throws Exception;
	// 신체 변화 기록 조회

	// 음식 검색 ->분산처리 후
}
