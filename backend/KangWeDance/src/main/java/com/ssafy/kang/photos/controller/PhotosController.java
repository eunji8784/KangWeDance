package com.ssafy.kang.photos.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.kang.photos.model.service.PhotosService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RequestMapping("/photos")
@RestController
@RequiredArgsConstructor
public class PhotosController {
	@Autowired
	PhotosService photosService;
	private final AmazonS3Client amazonS3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@PostMapping
    public ResponseEntity<?> upload(
            @RequestPart("file")MultipartFile file) {
		try {
			photosService.photoUpdate(file);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return new ResponseEntity<>("gd",HttpStatus.OK);
	      }
}



//try {
//     String fileName=file.getOriginalFilename();
//     String fileUrl= "https://" + bucket + "/test" +fileName;
//     ObjectMetadata metadata= new ObjectMetadata();
//     metadata.setContentType(file.getContentType());
//     metadata.setContentLength(file.getSize());
//     amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);
//     return ResponseEntity.ok(fileUrl);
//  } catch (IOException e) {
//e.printStackTrace();
//     return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//  }