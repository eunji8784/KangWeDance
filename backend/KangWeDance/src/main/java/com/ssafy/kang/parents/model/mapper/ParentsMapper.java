package com.ssafy.kang.parents.model.mapper;

import org.apache.ibatis.annotations.Mapper;
import com.ssafy.kang.parents.model.ParentsDto;

@Mapper
public interface ParentsMapper {
	int selectExperience(int idx) throws Exception;
	void updateNickname(ParentsDto parentsDto)throws Exception;
	void deleteUser(int idx) throws Exception;
}
