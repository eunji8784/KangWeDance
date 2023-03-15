package com.ssafy.kang.photos.model.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface PhotosService {
	public void photoUpdate(MultipartFile multipartFile) throws Exception;
}
