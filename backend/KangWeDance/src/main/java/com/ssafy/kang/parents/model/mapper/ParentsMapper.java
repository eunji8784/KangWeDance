package com.ssafy.kang.parents.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.ssafy.kang.parents.model.ParentsDto;

@Mapper
public interface ParentsMapper {
	int selectExperience(int idx) throws Exception;
	void updateNickname(ParentsDto parentsDto)throws Exception;
	void deleteUser(int idx) throws Exception;
	ParentsDto selectSocial(String socailUid)throws Exception;
	int insertUser(ParentsDto dto) throws Exception;
	void updateUser(ParentsDto dto) throws Exception;
	int selectChildren(int parentIdx);
}
