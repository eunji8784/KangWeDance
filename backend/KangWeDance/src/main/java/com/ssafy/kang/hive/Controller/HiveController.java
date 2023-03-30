package com.ssafy.kang.hive.Controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.kang.children.model.BodyRecordForHadoop;
import com.ssafy.kang.children.model.mapper.ChildrenMapper;
import com.ssafy.kang.common.ErrorCode;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.play.model.PlayRecordForHadoop;
import com.ssafy.kang.play.model.StatisticsDto;
import com.ssafy.kang.play.model.mapper.PlayMapper;
import com.ssafy.kang.play.model.service.PlayService;
import com.ssafy.kang.util.JwtUtil;

@RestController
@RequestMapping("/hive")
public class HiveController {
	@Autowired
	private SqlSession sqlSession;

	@Autowired
	@Qualifier("jdbcHiveTemplate")
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private ChildrenMapper childrenMapper;
	private JwtUtil jwtService = new JwtUtil();

	@Autowired
	PlayService playService;

	@GetMapping("/tag-list")
	public ApiResponse<?> showDatabases(@RequestHeader("accesstoken") String accesstoken) {
		List<Map<String, Object>> row = null;
		int parentIdx = jwtService.getUserIdx(accesstoken);

		row = jdbcTemplate.queryForList(
				"select child_idx, sum(play_time) `총시간` , sum(arm) `팔` , sum(leg) `다리` , sum(flexibility) `유연성` , sum(body) `몸통` , sum(aerobic) `유산소` , sum(height) `키크기` , sum(balance) `균형감각` from statisticrecord where parent_idx="
						+ parentIdx + " group by child_idx");
		System.out.println("하둡에서 아이 정보 제공 성공!");
		return ApiResponse.success(SuccessCode.READ_BODY_TAG, row);
	}

	@GetMapping("/body_record")
	public ApiResponse<?> bodyRecord() {
		// RDB에서 바디 레코드 가져오는 코드
		List<BodyRecordForHadoop> bodyRecordDto = null;
		try {
			bodyRecordDto = childrenMapper.selectBodyRecordForHadoop();
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}

		int childIdx;
		double weight; // 몸무게
		double bmi; // BMI
		double height; // 키
		double todayCalories; // 오늘 칼로리 소모량
		int bodyRecordIdx; // 권장 칼로리량
		String recordDate; // 기록 날짜

		childIdx = bodyRecordDto.get(0).getChildIdx();
		weight = bodyRecordDto.get(0).getWeight();
		height = bodyRecordDto.get(0).getHeight();
		todayCalories = bodyRecordDto.get(0).getTodayCalrories();
		bodyRecordIdx = (int) bodyRecordDto.get(0).getBodyRecordIdx();
		recordDate = bodyRecordDto.get(0).getRecordDate();
		bmi = bodyRecordDto.get(0).getBmi();

		// 하둡에 insert하는 코드
		int result = jdbcTemplate.update("insert into table bodyRecord values (" + bodyRecordIdx + "," + childIdx + ","
				+ weight + "," + height + "," + bmi + "," + todayCalories + ",'" + recordDate + "')");

		return ApiResponse.success(SuccessCode.CREATE_BODYRECORD);
	}

	// playRecord insert API
	@GetMapping("/play_record")
	public ApiResponse<?> playRecord() throws Exception {

		// 김민식이 바꿀 코드 -> db까지 안가고 바로 하둡으로 다이렉트 저장
		List<PlayRecordForHadoop> playRecordDto = playService.findplayRecordForHadoop();

		String recordDate;
		int playrecordIdx;
		int childIdx;
		int songIdx;
		int playMode;

		int result = 0;

		for (int i = 0; i < playRecordDto.size(); i++) {
			recordDate = playRecordDto.get(i).getRecordDate();
			playrecordIdx = playRecordDto.get(i).getPlayrecordIdx();
			childIdx = playRecordDto.get(i).getChildIdx();
			songIdx = playRecordDto.get(i).getSongIdx();
			playMode = playRecordDto.get(i).getPlayMode();

			// System.out.println(playrecordIdx);
			result = jdbcTemplate.update("insert into table playRecord values (" + playrecordIdx + "," + childIdx + ","
					+ songIdx + "," + playMode + ",'" + recordDate + "')");
		}
		return ApiResponse.success(SuccessCode.CREATE_PLAYRECORD);
	}

	@Async
	public void hashPashing(int songIdx, int childIdx, int parentIdx) throws Exception {
		List<String> hashTag = playService.findMotionTag(songIdx);

		StatisticsDto statisticsDto = new StatisticsDto();

		// System.out.println(month + "" + day);

		for (int i = 0; i < hashTag.size(); i++) {
			String list = hashTag.get(i).substring(1);
			List<String> tmp = Arrays.asList(list.split("#"));

			for (String s : tmp) {
				// System.out.println(s);
				if (s.equals("팔")) {
					statisticsDto.setArm(statisticsDto.getArm() + 1);
				} else if (s.equals("다리")) {
					statisticsDto.setLeg(statisticsDto.getLeg() + 1);
				}

				else if (s.equals("유연성")) {
					statisticsDto.setFlexibility(statisticsDto.getFlexibility() + 1);
				}

				else if (s.equals("유산소")) {
					statisticsDto.setAerobic(statisticsDto.getAerobic() + 1);
				}

				else if (s.equals("몸통")) {
					statisticsDto.setBody(statisticsDto.getBody() + 1);
				}

				else if (s.equals("균형감각")) {
					statisticsDto.setSenseOfBalance(statisticsDto.getSenseOfBalance() + 1);
				}

				else if (s.equals("키크기")) {
					statisticsDto.setHeight(statisticsDto.getHeight() + 1);
				}
			}

		}
		statisticsDto.setPlayTime(80);
		// System.out.println(statisticsDto);

		// 하둡에 저장 -> 시연때는 잠시 빠이빠이(주석처리)
//		jdbcTemplate.update("insert into table statisticRecord partition(child_idx=" + childIdx + ",parent_idx="
//				+ parentIdx + ") values (" + 80 + "," + statisticsDto.getArm() + "," + statisticsDto.getLeg() + ","
//				+ statisticsDto.getFlexibility() + "," + statisticsDto.getBody() + "," + statisticsDto.getAerobic()
//				+ "," + statisticsDto.getHeight() + "," + statisticsDto.getSenseOfBalance() + ")");
//
//		System.out.println("하둡에 저장 완료! ");

		/////////////////////// 시연용 코드 /////////////////////////////
		statisticsDto.setChildIdx(childIdx);
		statisticsDto.setParentIdx(parentIdx);
		sqlSession.getMapper(PlayMapper.class).inserTagForHadoop(statisticsDto);
		System.out.println("시연용 저장 완료 ");
	}

}
// insert into table bodyRecord values (1, 1, 30, 140, 22.3, 0, '2023-03-24');
