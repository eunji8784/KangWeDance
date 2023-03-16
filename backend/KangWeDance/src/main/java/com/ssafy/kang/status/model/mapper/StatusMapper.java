package com.ssafy.kang.status.model.mapper;

import java.sql.SQLException;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.kang.play.model.PlayRecordDto;

@Mapper
public interface StatusMapper {

//	| selectOrder() | 조회 유형의 mapper 메서드 |
//	| insertOrder() | 등록 유형의 mapper 메서드 |
//	| updateOrder() | 변경 유형의 mapper 메서드 |
//	| deleteOrder() | 삭제 유형의 mapper 메서드 |

	public List<PlayRecordDto> selectPlayRecord(int childIdx) throws SQLException;
}
