package com.ssafy.kang.children.model.serivce;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.kang.children.model.BodyRecordDto;
import com.ssafy.kang.children.model.ChildrenDto;
import com.ssafy.kang.children.model.mapper.ChildrenMapper;
import com.ssafy.kang.util.AmazonS3ResourceStorage;
import com.ssafy.kang.util.FileDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChildrenSerivceImpl implements ChildrenSerivce {

	private final AmazonS3ResourceStorage amazonS3ResourceStorage;

	@Autowired
	private ChildrenMapper childrenMapper;
	@Override
	public void addChildren(ChildrenDto childrenDto) throws Exception {
		childrenMapper.insertChildren(childrenDto);
		childrenMapper.insertChildrenBody(childrenDto);
	}
	@Override
	public void removeChildren(int childIdx) throws Exception {
		childrenMapper.deleteChildren(childIdx);
		
	}
	@Override
	public void modifyChildren(ChildrenDto childrenDto) throws Exception {
		childrenMapper.updateChildren(childrenDto);
		
	}
	@Override
	public void addChildrenBody(BodyRecordDto bodyRecordDto) throws Exception {
		childrenMapper.insertChildrenBody(bodyRecordDto);
	}
	@Override
	public List<ChildrenDto> findChildren(int parentIdx) throws Exception {
		return childrenMapper.selectChildren(parentIdx);
	}
	@Override
	public String findProfileUrl(MultipartFile file) throws Exception {
		FileDto fileDto = FileDto.multipartOf(file);
		return amazonS3ResourceStorage.getUrl(fileDto.getPath(), file);
	}



}
