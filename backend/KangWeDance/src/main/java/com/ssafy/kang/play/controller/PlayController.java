package com.ssafy.kang.play.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.kang.common.ErrorCode;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.play.model.PlayRecommendationDto;
import com.ssafy.kang.play.model.PlayRequestDto;
import com.ssafy.kang.play.model.PlayResultResponseDto;
import com.ssafy.kang.play.model.SongListDto;
import com.ssafy.kang.play.model.SongMotionDto;
import com.ssafy.kang.play.model.service.PlayService;
import com.ssafy.kang.util.JwtUtil;
import com.ssafy.kang.util.LevelUtil;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/play")
@RestController
@RequiredArgsConstructor
public class PlayController {

	@Autowired
	PlayService playService;

	private final LevelUtil levelUtil;

	private final JwtUtil jwtUtil;

	public PlayController() {
		this.jwtUtil = new JwtUtil();
		this.levelUtil = new LevelUtil();
	}

//	| orderList() | 목록 조회 유형의 서비스 |
//	| orderDetails() | 단 건 상세 조회 유형의 controller 메서드 |
//	| orderSave() | 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드 |
//	| orderAdd() | 등록만 하는 유형의 controller 메서드 |
//	| orderModify() | 수정만 하는 유형의 controller 메서드 |
//	| orderRemove() | 삭제만 하는 유형의 controller 메서드 |

	@GetMapping
	public ApiResponse<?> playList(@RequestHeader("accesstoken") String accesstoken) throws Exception {
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

	@PostMapping
	public ApiResponse<?> playResultSave(@RequestHeader("accesstoken") String accesstoken,
			@RequestBody PlayRequestDto playRequestDto) {
		try {
			// 게임 기록 등록
			playService.addPlayRecord(playRequestDto);

			// 동작별 점수 기록 등록

			int scoreTotal = 0; // 총점
			int experienceScoreTotal = 0; // 경험치에 더할 총점
			int songMotionTotal = playRequestDto.getScoreRecordList().size(); // 모션 총 개수

			for (int i = 0; i < playRequestDto.getScoreRecordList().size(); i++) {
				// 점수 계산
				int count = playRequestDto.getScoreRecordList().get(i).getCount();
				int countStandard = playRequestDto.getScoreRecordList().get(i).getCountStandard();

				int score = Math.min(count, countStandard) / countStandard;
				int experienceScore = score * playRequestDto.getScoreRecordList().get(i).getTime();

				// 동작별 점수를 계산해서 Dto에 세팅한다.
				playRequestDto.getScoreRecordList().get(i).setScore(experienceScore);

				// 동작별 점수 기록을 등록한다.
				playService.addScoreRecord(playRequestDto.getScoreRecordList().get(i));

				// 한 게임에 대한 총점을 구한다.
				scoreTotal += score;
				// 경험치에 더할 총점을 구한다.
				experienceScoreTotal += experienceScore;
			}

			int childIdx = playRequestDto.getChildIdx();
			// 현재 경험치 조회
			int experienceScore = playService.findExperienceScore(childIdx);
			// 경험치에 총점을 더한다.
			experienceScore += experienceScoreTotal;
			// 경험치를 업데이트한다.
			playService.modifyExperienceScore(experienceScore, childIdx);

			// 총점을 백점 만점으로 환산한다.
			scoreTotal = Math.round(scoreTotal * (100 / songMotionTotal));

			PlayResultResponseDto playResultResponseDto = new PlayResultResponseDto(experienceScore, scoreTotal,
					levelUtil.getLevel(experienceScore));

			return ApiResponse.success(SuccessCode.CREATE_PLAY_RESULT, playResultResponseDto);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@GetMapping("/recommendation")
	public ApiResponse<?> playRecommendationList(@RequestHeader("accesstoken") String accesstoken) throws Exception {
		try {
			int parentIdx = jwtUtil.getUserIdx(accesstoken);

			// 아이 리스트 가져오기
			List<Integer> childList = playService.findChildren(parentIdx);
			// 아이 별 추천 플레이 목록
			List<PlayRecommendationDto> recommendationList = new ArrayList<>();
			// 아이 별 추천 플레이 조회
			for (int i = 0; i < childList.size(); i++) {
				PlayRecommendationDto playRecommendationDto = new PlayRecommendationDto();
				playRecommendationDto.setChildIdx(childList.get(i));
				SongListDto songList = playService.findPlayRecommendation(childList.get(i));
				playRecommendationDto.setRecommendationSong(songList);
				recommendationList.add(playRecommendationDto);
			}

			return ApiResponse.success(SuccessCode.READ_PLAY_RECOMMENDATION, recommendationList);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

}
