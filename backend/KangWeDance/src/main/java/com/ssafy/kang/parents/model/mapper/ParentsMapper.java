package com.ssafy.kang.parents.model.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ParentsMapper {
	int selectExperience(int idx) throws Exception;
}
