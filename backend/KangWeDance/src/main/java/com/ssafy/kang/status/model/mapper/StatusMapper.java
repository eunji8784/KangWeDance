package com.ssafy.kang.status.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.kang.play.model.PlayRecordDto;
import com.ssafy.kang.status.model.BodyTagDto;
import com.ssafy.kang.status.model.FoodsDto;

@Mapper
public interface StatusMapper {

//	| selectOrder() | 조회 유형의 mapper 메서드 |
//	| insertOrder() | 등록 유형의 mapper 메서드 |
//	| updateOrder() | 변경 유형의 mapper 메서드 |
//	| deleteOrder() | 삭제 유형의 mapper 메서드 |

	public List<PlayRecordDto> selectPlayRecord(@Param("date") String date) throws SQLException;

	public List<FoodsDto> selectFoodList(@Param("word") String word) throws SQLException;

	public List<PlayRecordDto> selectMonthlyRecord(@Param("childIdx") int childIdx, @Param("month") int month);

	public List<BodyTagDto> selectBodyTagRecord(int parentIdx) throws SQLException;

// 일회성 코드 : 검색을 위해 영어 <->한국어
//	public String temps(int i) throws Exception;
//
//	public void tumpu(@Param("k") String k, @Param("i") String i) throws Exception;
}
