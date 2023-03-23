package com.ssafy.kang.play.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.kang.play.model.SongListDto;
import com.ssafy.kang.play.model.SongMotionDto;

@Service
public interface PlayService {
//	| findOrder() | 조회 유형의 service 메서드 |
//	| addOrder() | 등록 유형의 service 메서드 |
//	| modifyOrder() | 변경 유형의 service 메서드 |
//	| removeOrder() | 삭제 유형의 service 메서드 |
//	| saveOrder() | 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드 |

	public List<SongListDto> findSongList() throws Exception;

	public List<SongMotionDto> findSongMotionList(int songIdx) throws Exception;

}
