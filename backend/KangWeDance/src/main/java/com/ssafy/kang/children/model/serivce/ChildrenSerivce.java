package com.ssafy.kang.children.model.serivce;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.kang.children.model.BodyRecordDto;
import com.ssafy.kang.children.model.ChildrenDto;

@Service
public interface ChildrenSerivce {
	void addChildren(ChildrenDto childrenDto)throws Exception;

	void removeChildren(int childIdx) throws Exception;

	void modifyChildren(ChildrenDto childrenDto) throws Exception;

	void addChildrenBody(BodyRecordDto bodyRecordDto) throws Exception;

	List<ChildrenDto> findChildren(int accesstoken)throws Exception;

}
