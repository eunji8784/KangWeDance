package com.ssafy.kang.parents.model.service;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.ssafy.kang.parents.model.ParentsDto;
import com.ssafy.kang.parents.model.mapper.ParentsMapper;
import com.ssafy.kang.util.KakaoUtil;
import com.ssafy.kang.util.NaverUtil;

@Service
public class ParentsServiceImpl implements ParentsService {
	@Autowired
	private ParentsMapper parentsMapper;
	private final NaverUtil naverUtil;
	private final KakaoUtil kakaoUtil;
	public ParentsServiceImpl() {
		this.naverUtil = new NaverUtil();
		this.kakaoUtil = new KakaoUtil();
	}
	@Override
	public Map<String, String> getToken(String code) throws Exception {
		String reqURL = "https://kauth.kakao.com/oauth/token";
		String clientId = "eb3617506bc76ea56b625f99f56e42dd";
		String redirectUri = "http://localhost:3000/users/oauth2-kakao";
		Map<String, String> rt = new HashMap<>();
		try {
			String result = kakaoUtil.getToken(reqURL, clientId, redirectUri, code);
			Gson gson = new Gson();
			Map<String, Object> map = gson.fromJson(result, Map.class);
			rt.put("access_token", (String) map.get("access_token"));
			rt.put("refresh_token", (String) map.get("refresh_token"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rt;
	}

	@Override
	public Map<String, String> getNaverToken(String code) throws Exception {
		String NAVER_CLIENT_ID = "GBp5LyAN_0Wl9eQyjVmb";
		String NAVER_CLIENT_SECRET = "wGkyPOs6Y7";
		String reqURL = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id="+NAVER_CLIENT_ID+"&client_secret="+NAVER_CLIENT_SECRET+"&code="+code;
		Map<String, String> rt = new HashMap<>();
		try {
			URL url = new URL(reqURL);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			// 결과 코드가 200이라면 성공
			int responseCode = conn.getResponseCode();
			String result = naverUtil.readBody(conn.getInputStream());
			Gson gson = new Gson();
			Map<String, Object> map = gson.fromJson(result, Map.class);
			rt.put("access_token", (String) map.get("access_token"));
			rt.put("refresh_token", (String) map.get("refresh_token"));

		} catch (IOException e) {
			e.printStackTrace();
		}
		return rt;
	}
	@Override
	public Map<String, String> getUserInfo(String access_token) throws IOException {
		String host = "https://kapi.kakao.com/v2/user/me";
		Map<String, String> result = new HashMap<>();
		try {
			String res = kakaoUtil.getInfo(host, access_token);
			Gson gson = new Gson();
			Map<String, Object> obj = gson.fromJson(res, Map.class);
			System.out.println(res);
			Map<String, Object> kakao_account = gson.fromJson(obj.get("kakao_account").toString(), Map.class);
			Map<String, Object> properties = gson.fromJson(obj.get("properties").toString(), Map.class);

			result.put("id", obj.get("id")+"");
			result.put("nickname", properties.get("nickname").toString());

		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}
	
	@Override
	public Map<String, String> getNaverUserInfo(String token) throws Exception{
		String header = "Bearer " + token; 
        String apiURL = "https://openapi.naver.com/v1/nid/me";
        Map<String, String> result = new HashMap<>();
        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("Authorization", header);
        String responseBody = naverUtil.getInfo(apiURL,requestHeaders);
		Gson gson = new Gson();
        Map<String, Object> obj = gson.fromJson(responseBody, Map.class);
        Map<String, Object> naver_account = gson.fromJson(obj.get("response").toString(), Map.class);
		result.put("id", naver_account.get("id").toString());
		result.put("nickname", naver_account.get("nickname").toString());

        return result;
	}
	@Override
	public int findExperience(int idx) throws Exception {
		return parentsMapper.selectExperience(idx);
	}
	@Override
	public void modifyNickname(ParentsDto parentsDto) throws Exception {
		parentsMapper.updateNickname(parentsDto);
	}
	@Override
	public void removeUser(int idx) throws Exception {
		parentsMapper.deleteUser(idx);
	}
	@Override
	public ParentsDto findSocial(String socailUid) throws Exception {
		return parentsMapper.selectSocial(socailUid);
	}
	@Override
	public int addUser(ParentsDto dto) throws Exception {
		parentsMapper.insertUser(dto);
		return dto.getParentIdx();
	}
	@Override
	public void modifyUser(ParentsDto dto) throws Exception {
		// TODO Auto-generated method stub
		parentsMapper.updateUser(dto);
	}

	

}
