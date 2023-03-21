package com.ssafy.kang.parents.model.service;

import java.io.IOException;
import java.util.Map;

import com.ssafy.kang.parents.model.ParentsDto;

public interface ParentsService {
	public Map<String, String> getToken(String code) throws Exception;
	public Map<String, String> getUserInfo(String access_token) throws IOException;
	public Map<String, String> getNaverUserInfo(String token) throws Exception;
	public Map<String, String> getNaverToken(String code) throws Exception;
	public int findExperience(int idx) throws Exception;
	void modifyNickname(ParentsDto parentsDto) throws Exception;
	void removeUser(int idx) throws Exception;
	ParentsDto findSocial(String socailUid) throws Exception;
	public int addUser(ParentsDto dto)throws Exception;
	public void modifyUser(ParentsDto dto)throws Exception;
	public int findChildren(int parentIdx)throws Exception;
	public void modifyAccessToken(ParentsDto dto)throws Exception;
	public ParentsDto findUser(int userIdx)throws Exception;
	public void kakaoLogout(String accessToken)throws Exception;
	
	
	
	
}
