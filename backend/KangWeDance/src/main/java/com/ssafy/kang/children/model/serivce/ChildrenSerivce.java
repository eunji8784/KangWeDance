package com.ssafy.kang.children.model.serivce;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.kang.children.model.BodyRecordDto;
import com.ssafy.kang.children.model.ChildrenDto;

@Service
public interface ChildrenSerivce {
	void addChildren(ChildrenDto childrenDto)throws Exception;

	void removeChildren(int childIdx) throws Exception;

	void modifyChildren(ChildrenDto childrenDto) throws Exception;

	void addChildrenBody(BodyRecordDto bodyRecordDto) throws Exception;

	List<ChildrenDto> findChildren(int accesstoken)throws Exception;

	String findProfileUrl(MultipartFile file)throws Exception;

	String findChildrenBodyRecord(BodyRecordDto bodyRecordDto) throws Exception;

	void modifyChildrenBody(BodyRecordDto bodyRecordDto) throws Exception;

}
