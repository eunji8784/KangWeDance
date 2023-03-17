package com.ssafy.kang.status.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ssafy.kang.play.model.PlayRecordDto;
import com.ssafy.kang.status.model.FoodsDto;

@Mapper
public interface StatusMapper {

//	| selectOrder() | 조회 유형의 mapper 메서드 |
//	| insertOrder() | 등록 유형의 mapper 메서드 |
//	| updateOrder() | 변경 유형의 mapper 메서드 |
//	| deleteOrder() | 삭제 유형의 mapper 메서드 |

	public List<PlayRecordDto> selectPlayRecord(int childIdx) throws SQLException;

	public List<FoodsDto> selectFoodList(String ktoE) throws SQLException;

	public String temps(int i) throws Exception;

	public void tumpu(@Param("k") String k, @Param("i") String i) throws Exception;
}
