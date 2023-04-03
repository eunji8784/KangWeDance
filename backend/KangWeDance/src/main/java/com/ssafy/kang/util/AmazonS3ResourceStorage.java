package com.ssafy.kang.util;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;

@Component
@ConditionalOnProperty(prefix = "cloud.aws.s3", name = "bucket")
@RequiredArgsConstructor
public class AmazonS3ResourceStorage {
	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3Client amazonS3Client;

	public void store(String fullPath, MultipartFile multipartFile) {
		System.out.println(fullPath);
		File file = new File(MultipartUtil.getLocalHomeDirectory(), fullPath);
		try {
			multipartFile.transferTo(file);
			amazonS3Client.putObject(
					new PutObjectRequest(bucket, fullPath, file).withCannedAcl(CannedAccessControlList.PublicRead));
		} catch (Exception e) {
			throw new RuntimeException();
		} finally {
			if (file.exists()) {
				file.delete();
			}
		}
	}

	public String getUrl(String fullPath, MultipartFile multipartFile) {
		File file = new File(MultipartUtil.getLocalHomeDirectory(), fullPath);
		try {
			multipartFile.transferTo(file);
			amazonS3Client.putObject(
					new PutObjectRequest(bucket, fullPath, file).withCannedAcl(CannedAccessControlList.PublicRead));
			String makeurl = amazonS3Client.getUrl(bucket, fullPath).toString();
			makeurl = "https://d3qb4vbeyp8phu.cloudfront.net/" + makeurl.substring(52, makeurl.length());
			return makeurl;
		} catch (Exception e) {
			throw new RuntimeException();
		} finally {
			if (file.exists()) {
				file.delete();
			}
		}
	}
}