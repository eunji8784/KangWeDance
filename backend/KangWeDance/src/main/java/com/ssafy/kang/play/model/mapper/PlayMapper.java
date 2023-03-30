package com.ssafy.kang.play.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.kang.play.model.PlayRecordForHadoop;
import com.ssafy.kang.play.model.PlayRequestDto;
import com.ssafy.kang.play.model.ScoreRequestDto;
import com.ssafy.kang.play.model.SongListDto;
import com.ssafy.kang.play.model.SongMotionDto;
import com.ssafy.kang.play.model.StatisticsDto;

@Mapper
public interface PlayMapper {

//	| selectOrder() | 조회 유형의 mapper 메서드 |
//	| insertOrder() | 등록 유형의 mapper 메서드 |
//	| updateOrder() | 변경 유형의 mapper 메서드 |
//	| deleteOrder() | 삭제 유형의 mapper 메서드 |

	public List<SongListDto> selectSongList() throws SQLException;

	public List<SongMotionDto> selectSongMotionList(int songIdx) throws SQLException;

	public void insertPlayRecord(PlayRequestDto playRequestDto) throws SQLException;

	public void insertScoreRecord(ScoreRequestDto scoreRequestDto) throws SQLException;

	public int selectExperienceScore(int childIdx) throws SQLException;

	public void updateExperienceScore(int param1, int param2) throws SQLException;

	public List<PlayRecordForHadoop> selectPlayRecordForHadoop() throws SQLException;

	public List<Integer> selectChildren(int parentIdx) throws SQLException;

	public String selectTag(int childIdx) throws SQLException;

	public SongListDto selectSongByTag(String[] tagList) throws SQLException;

	public SongListDto selectSongListByMotionTagIdx(int motionTypeIdx) throws SQLException;

	public List<String> selectMotionTag(int songIdx) throws SQLException;

	public void inserTagForHadoop(StatisticsDto statisticsDto) throws SQLException;

}
