package com.ssafy.kang.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class KakaoUtil {
	public String getToken(String apiUrl, String clientId, String redirectUri, String code) {
		HttpURLConnection con = connect(apiUrl);
		

		try{
			// POST 요청을 위해 기본값이 false인 setDoOutput을 true로
			con.setRequestMethod("POST");
			con.setDoOutput(true);

			// POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
			BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(con.getOutputStream()));
			StringBuilder sb = new StringBuilder();
			sb.append("grant_type=authorization_code");
			sb.append("&client_id="+clientId); // TODO REST_API_KEY 입력

			sb.append("&redirect_uri="+redirectUri); // TODO 인가코드 받은 redirect_uri 입력
			sb.append("&code=" + code);
			bw.write(sb.toString());
			bw.flush();
			bw.close();
			int responseCode = con.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
				return readBody(con.getInputStream());
			} else { // 에러 발생
				return readBody(con.getErrorStream());
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}

	public String getInfo(String apiUrl, String access_token) {
		HttpURLConnection con = connect(apiUrl);
		try {
			con.setRequestProperty("Authorization", "Bearer " + access_token);
			con.setRequestMethod("GET");

			int responseCode = con.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
				return readBody(con.getInputStream());
			} else { // 에러 발생
				return readBody(con.getErrorStream());
			}
		} catch (IOException e) {
			throw new RuntimeException("API 요청과 응답 실패", e);
		} finally {
			con.disconnect();
		}
	}

	public HttpURLConnection connect(String apiUrl) {
		try {
			URL url = new URL(apiUrl);
			return (HttpURLConnection) url.openConnection();
		} catch (MalformedURLException e) {
			throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
		} catch (IOException e) {
			throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
		}
	}

	public String readBody(InputStream body) {
		String line = "";
		String result = "";

		try (BufferedReader br = new BufferedReader(new InputStreamReader(body))){
			while ((line = br.readLine()) != null) {
				result += line;
			}

			return result;
		} catch (IOException e) {
			throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
		}
	}
}
