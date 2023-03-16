package com.ssafy.kang.status.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.kang.play.model.PlayRecordDto;
import com.ssafy.kang.status.model.mapper.StatusMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatusServiceImpl implements StatusService {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<PlayRecordDto> findplayRecord(int childIdx) throws Exception {
		return sqlSession.getMapper(StatusMapper.class).selectPlayRecord(childIdx);

	}
}
