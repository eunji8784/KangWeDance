package com.ssafy.kang.status.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.kang.children.model.BodyRecordDto;
import com.ssafy.kang.play.model.PlayRecordDto;
import com.ssafy.kang.status.model.BodyTagDto;
import com.ssafy.kang.status.model.FoodsDto;
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
	public List<BodyRecordDto> findRecordList(int childIdx)  throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectBodyRecordList(childIdx);
	}

	@Override
	public List<BodyTagDto> findBodyTagRecord(int parentIdx) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectBodyTagRecord(parentIdx);
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
