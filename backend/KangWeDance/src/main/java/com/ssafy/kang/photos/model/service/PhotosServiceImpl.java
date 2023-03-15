package com.ssafy.kang.photos.model.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.kang.util.AmazonS3ResourceStorage;
import com.ssafy.kang.util.FileDto;

@Service
@RequiredArgsConstructor
public class PhotosServiceImpl implements PhotosService{

    private final AmazonS3ResourceStorage amazonS3ResourceStorage;
	
	@Override
	public void photoUpdate(MultipartFile multipartFile) throws Exception{
		 FileDto fileDto = FileDto.multipartOf(multipartFile);
	     amazonS3ResourceStorage.store(fileDto.getPath(), multipartFile);
	}

	

}
