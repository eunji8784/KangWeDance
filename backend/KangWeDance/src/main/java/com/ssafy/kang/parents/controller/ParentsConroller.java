package com.ssafy.kang.parents.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.parents.model.service.ParentsService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/parents")
@RestController
public class ParentsConroller {
	@Autowired
	ParentsService parentsService;
	@GetMapping("/social/kakao")
	public ApiResponse<?> userAdd(@RequestParam String code){

		Map<String, String> token;
		Map<String, String> userIO;
		try {
			token = parentsService.getToken(code);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
}
