package com.ssafy.kang.play.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.kang.play.model.PlayRecordForHadoop;
import com.ssafy.kang.play.model.PlayRequestDto;
import com.ssafy.kang.play.model.ScoreRequestDto;
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

	@Override
	public void addPlayRecord(PlayRequestDto playRequestDto) throws Exception {
		sqlSession.getMapper(PlayMapper.class).insertPlayRecord(playRequestDto);
	}

	@Override
	public void addScoreRecord(ScoreRequestDto scoreRequestDto) throws Exception {
		sqlSession.getMapper(PlayMapper.class).insertScoreRecord(scoreRequestDto);
	}

	@Override
	public int findExperienceScore(int childIdx) throws Exception {
		return sqlSession.getMapper(PlayMapper.class).selectExperienceScore(childIdx);
	}

	@Override
	public void modifyExperienceScore(int param1, int param2) throws Exception {
		sqlSession.getMapper(PlayMapper.class).updateExperienceScore(param1, param2);
	}

	@Override
	public List<PlayRecordForHadoop> findplayRecordForHadoop() throws Exception {
		return sqlSession.getMapper(PlayMapper.class).selectPlayRecordForHadoop();
	}

}
