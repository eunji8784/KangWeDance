package com.ssafy.kang.status.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.kang.children.model.BodyRecordDto;
import com.ssafy.kang.common.ErrorCode;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.play.model.PlayRecordDto;
import com.ssafy.kang.status.model.BodyTagDto;
import com.ssafy.kang.play.model.service.PlayService;
import com.ssafy.kang.status.model.ChildrenBodyRecordDto;
import com.ssafy.kang.status.model.FoodsDto;
import com.ssafy.kang.status.model.service.StatusService;
import com.ssafy.kang.util.JwtUtil;
import com.ssafy.kang.util.UnicodeKorean;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/status")
@RestController
@RequiredArgsConstructor
public class StatusController {
//	| orderList() | 목록 조회 유형의 서비스 |
//	| orderDetails() | 단 건 상세 조회 유형의 controller 메서드 |
//	| orderSave() | 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드 |
//	| orderAdd() | 등록만 하는 유형의 controller 메서드 |
//	| orderModify() | 수정만 하는 유형의 controller 메서드 |
//	| orderRemove() | 삭제만 하는 유형의 controller 메서드 |
	@Autowired
	StatusService statusService;
	@Autowired
	PlayService playService;
	UnicodeKorean unicodeKorean = new UnicodeKorean();

	private final JwtUtil jwtUtil;

	public StatusController() {
		this.jwtUtil = new JwtUtil();
	}

	@GetMapping("/play-record/{date}")
	public ApiResponse<?> playRecordDetails(@PathVariable("date") String date,
			@RequestHeader("accesstoken") String accesstoken) throws Exception {
		try {
			List<PlayRecordDto> playRecordDto = statusService.findplayRecord(date);
			
			return ApiResponse.success(SuccessCode.READ_PLAYRECORD_LIST, playRecordDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@GetMapping("/search-food/{word}")
	public ApiResponse<?> searchHash(@PathVariable("word") String word,
			@RequestHeader("accesstoken") String accesstoken) {

		try {

			// 한국어로 검색 시 -> 영어로 변경하기 위한 호출
			List<FoodsDto> foodListDto = statusService.findFoodList(unicodeKorean.KtoE(word));
			return ApiResponse.success(SuccessCode.READ_FOOD_LIST, foodListDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@GetMapping("/month-play-record")
	public ApiResponse<?> searchMonthRecord(@RequestHeader("accesstoken") String accesstoken,
			@RequestParam int childIdx, @RequestParam int month) {
		try {
			List<PlayRecordDto> monthly = statusService.findMonthlyRecord(childIdx, month);
			return ApiResponse.success(SuccessCode.READ_MONTHLY_RECORD, monthly);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@GetMapping("/body-changes")
	public ApiResponse<?> bodyRecordList(@RequestHeader("accesstoken") String accesstoken) {
		try {
			int parentIdx = jwtUtil.getUserIdx(accesstoken);
			
			// 아이 리스트 가져오기
			List<Integer> childList = playService.findChildren(parentIdx);
			List<ChildrenBodyRecordDto> BodyRecordList = new ArrayList<>();
			for (int i = 0; i < childList.size(); i++) {
				int childIdx = childList.get(i);
				ChildrenBodyRecordDto childrenBodyRecord = new ChildrenBodyRecordDto();
				childrenBodyRecord.setChildIdx(childIdx);
				List<BodyRecordDto> bodyRecord = statusService.findRecordList(childIdx);
				childrenBodyRecord.setBodyRecord(bodyRecord);
				// 체중 백분율 계산
				childrenBodyRecord.setStandardWeight(statusService.findWeightPercentile(childIdx));
				// 신장 백분율 계산
				childrenBodyRecord.setStandardHeight(statusService.findHeightPercentile(childIdx));
				BodyRecordList.add(childrenBodyRecord);
			}
			return ApiResponse.success(SuccessCode.READ_BODY_RECORD_LIST, BodyRecordList);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 시연용 코드
	@GetMapping("/tag-list")
	public ApiResponse<?> showDatabases(@RequestHeader("accesstoken") String accesstoken) throws Exception {
		try {
			int parentIdx = jwtUtil.getUserIdx(accesstoken);
			List<BodyTagDto> bodyTag = statusService.findBodyTagRecord(parentIdx);

			return ApiResponse.success(SuccessCode.READ_BODY_TAG, bodyTag);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	// 검색을 위해 korean ->english 변환 API
//	@GetMapping
//	public ApiResponse<?> temp() {
//
//		try {
//			for (int i = 15912; i <= 85469; i++) {
//				String t = statusService.temps(i);
//				if (t.length() >= 30)
//					continue;
//				statusService.tumpu(unicodeKorean.KtoE(t), i + "");
//
//			} // 500여개는 글자길이가 너무 길어서 패스함
//			return ApiResponse.success(SuccessCode.CREATE_KAKAO);
//		} catch (Exception e) {
//			// TODO: handle exception
//			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
//		}
//	}
}
