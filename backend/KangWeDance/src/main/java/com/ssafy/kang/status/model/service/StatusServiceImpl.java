package com.ssafy.kang.status.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.kang.children.model.BodyRecordDto;
import com.ssafy.kang.play.model.PlayRecordDto;
import com.ssafy.kang.status.model.BodyTagDto;
import com.ssafy.kang.status.model.FoodsDto;
import com.ssafy.kang.status.model.PercentileDto;
import com.ssafy.kang.status.model.mapper.StatusMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatusServiceImpl implements StatusService {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<PlayRecordDto> findplayRecord(String date) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectPlayRecord(date);

	}

	@Override
	public List<FoodsDto> findFoodList(String word) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectFoodList(word);
	}

	@Override
	public List<PlayRecordDto> findMonthlyRecord(int childIdx, int month) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectMonthlyRecord(childIdx, month);
	}

	@Override
	public List<BodyRecordDto> findRecordList(int childIdx) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectBodyRecordList(childIdx);
	}

	@Override
	public List<BodyTagDto> findBodyTagRecord(int parentIdx) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectBodyTagRecord(parentIdx);
	}

	@Override
	public int findWeightPercentile(int childIdx) throws Exception {
		PercentileDto percentileDto = sqlSession.getMapper(StatusMapper.class).selectWeightPercentile(childIdx);
		int weightPercentile = 0;
		if (percentileDto == null) {
			return weightPercentile;
		}
		int childWeight = percentileDto.getWeight();
		int min = Integer.MAX_VALUE;
		int[] arr1 = { 1, 3, 5, 10, 15, 25, 50, 75, 85, 90, 95, 97, 99 };
		int[] arr2 = { percentileDto.getPercentile_1th(), percentileDto.getPercentile_3th(),
				percentileDto.getPercentile_5th(), percentileDto.getPercentile_10th(),
				percentileDto.getPercentile_15th(), percentileDto.getPercentile_25th(),
				percentileDto.getPercentile_50th(), percentileDto.getPercentile_75th(),
				percentileDto.getPercentile_85th(), percentileDto.getPercentile_90th(),
				percentileDto.getPercentile_95th(), percentileDto.getPercentile_97th(),
				percentileDto.getPercentile_99th() };
		for (int i = 0; i < arr1.length; i++) {
			if (Math.abs(childWeight - arr2[i]) < min) {
				min = Math.abs(childWeight - arr2[i]);
				weightPercentile = arr1[i];
			}
		}
		return 100 - weightPercentile;
	}
	
	@Override
	public int findHeightPercentile(int childIdx) throws Exception {
		PercentileDto percentileDto = sqlSession.getMapper(StatusMapper.class).selectHeightPercentile(childIdx);
		int heightPercentile = 0;
		if (percentileDto == null) {
			return heightPercentile;
		}
		int childHeight = percentileDto.getHeight();
		int min = Integer.MAX_VALUE;
		int[] arr1 = { 1, 3, 5, 10, 15, 25, 50, 75, 85, 90, 95, 97, 99 };
		int[] arr2 = { percentileDto.getPercentile_1th(), percentileDto.getPercentile_3th(),
				percentileDto.getPercentile_5th(), percentileDto.getPercentile_10th(),
				percentileDto.getPercentile_15th(), percentileDto.getPercentile_25th(),
				percentileDto.getPercentile_50th(), percentileDto.getPercentile_75th(),
				percentileDto.getPercentile_85th(), percentileDto.getPercentile_90th(),
				percentileDto.getPercentile_95th(), percentileDto.getPercentile_97th(),
				percentileDto.getPercentile_99th() };
		for (int i = 0; i < arr1.length; i++) {
			if (Math.abs(childHeight - arr2[i]) < min) {
				min = Math.abs(childHeight - arr2[i]);
				heightPercentile = arr1[i];
			}
		}
		return 100 - heightPercentile;
	}

	// 일회성 코드임
	// 검색을 위한 한국어 -> 영어로 변환하는 코드
	// @Override
	// public String temps(int i) throws Exception {
	// return sqlSession.getMapper(StatusMapper.class).temps(i);
	// }
	//
	// @Override
	// public void tumpu(String k, String i) throws Exception {
	// // TODO Auto-generated method stub
	// sqlSession.getMapper(StatusMapper.class).tumpu(k, i);
	// }
}
