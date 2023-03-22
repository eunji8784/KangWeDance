package com.ssafy.kang.play.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.kang.common.ErrorCode;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.play.model.SongListDto;
import com.ssafy.kang.play.model.SongMotionDto;
import com.ssafy.kang.play.model.service.PlayService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/play")
@RestController
@RequiredArgsConstructor
public class PlayController {

	@Autowired
	PlayService playService;

//	| orderList() | 목록 조회 유형의 서비스 |
//	| orderDetails() | 단 건 상세 조회 유형의 controller 메서드 |
//	| orderSave() | 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드 |
//	| orderAdd() | 등록만 하는 유형의 controller 메서드 |
//	| orderModify() | 수정만 하는 유형의 controller 메서드 |
//	| orderRemove() | 삭제만 하는 유형의 controller 메서드 |

	@GetMapping("/list")
	public ApiResponse<?> playList() throws Exception {

		try {
			List<SongListDto> songList = playService.findSongList();
			
			List<SongMotionDto> SongMotionList;
			
			for (int i = 0; i < songList.size(); i++) {
				int songIdx = songList.get(i).getSongIdx();
				SongMotionList = playService.findSongMotionList(songIdx);
				songList.get(i).setSongMotionList(SongMotionList);
			}
			
			return ApiResponse.success(SuccessCode.READ_PLAY_LIST, songList);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}

	}

}
