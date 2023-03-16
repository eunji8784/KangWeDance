package com.ssafy.kang.parents.model.service;

import java.io.IOException;
import java.util.Map;

public interface ParentsService {
	public Map<String, String> getToken(String code) throws Exception;
	public Map<String, String> getUserInfo(String access_token) throws IOException;
	public Map<String, String> getNaverUserInfo(String token) throws Exception;
	public Map<String, String> getNaverToken(String code) throws Exception;
	public int findExperience(int idx) throws Exception;
}
