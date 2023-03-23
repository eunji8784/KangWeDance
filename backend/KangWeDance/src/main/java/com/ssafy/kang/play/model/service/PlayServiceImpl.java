package com.ssafy.kang.play.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.kang.play.model.SongListDto;
import com.ssafy.kang.play.model.SongMotionDto;
import com.ssafy.kang.play.model.mapper.PlayMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlayServiceImpl implements PlayService {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<SongListDto> findSongList() throws Exception {
		return sqlSession.getMapper(PlayMapper.class).selectSongList();
	}

	@Override
	public List<SongMotionDto> findSongMotionList(int songIdx) throws Exception {
		return sqlSession.getMapper(PlayMapper.class).selectSongMotionList(songIdx);
	}
}
