package com.ssafy.kang.children.model.serivce;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.kang.children.model.BodyRecordDto;
import com.ssafy.kang.children.model.ChildrenDto;
import com.ssafy.kang.children.model.mapper.ChildrenMapper;

@Service
public class ChildrenSerivceImpl implements ChildrenSerivce {

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
		// TODO Auto-generated method stub
		
	}
	@Override
	public List<ChildrenDto> findChildren(int parentIdx) throws Exception {
		return childrenMapper.selectChildren(parentIdx);
	}



}
