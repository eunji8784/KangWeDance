package com.ssafy.kang.photos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.ssafy.kang.common.ErrorCode;
import com.ssafy.kang.common.SuccessCode;
import com.ssafy.kang.common.dto.ApiResponse;
import com.ssafy.kang.photos.model.PhotosDto;
import com.ssafy.kang.photos.model.PramesDto;
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

//	| orderList() | 목록 조회 유형의 서비스 |
//	| orderDetails() | 단 건 상세 조회 유형의 controller 메서드 |
//	| orderSave() | 등록/수정/삭제 가 동시에 일어나는 유형의 controller 메서드 |
//	| orderAdd() | 등록만 하는 유형의 controller 메서드 |
//	| orderModify() | 수정만 하는 유형의 controller 메서드 |
//	| orderRemove() | 삭제만 하는 유형의 controller 메서드 |

	@PostMapping
	public ApiResponse<?> photosAdd(@RequestPart("file") MultipartFile file) throws Exception {
		try {
			photosService.addUpdate(file);
			return ApiResponse.success(SuccessCode.CREATE_PHOTO);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@GetMapping
	public ApiResponse<?> photosDetails() throws Exception {
		try {
			// 임시값 -> 토큰 구현전까지만 이렇게 사용
			int parentIdx = 0;
			List<PhotosDto> photosDto = photosService.findPhotos(parentIdx);
			return ApiResponse.success(SuccessCode.READ_PHOTO_LIST, photosDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@GetMapping("/prames")
	public ApiResponse<?> pramesDetails() throws Exception {
		try {
			// 임시값 -> 토큰 구현전까지만 이렇게 사용
			int parentIdx = 0;
			List<PramesDto> pramesDto = photosService.findPrames(parentIdx);
			return ApiResponse.success(SuccessCode.READ_PRAME_LIST, pramesDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
	}

	@DeleteMapping("/{photoIdx}")
	public ApiResponse<?> photoRemove(@PathVariable("photoIdx") int photoIdx) throws Exception {
		try {
			// 임시값 -> 토큰 구현전까지만 이렇게 사용

			photosService.removePhoto(photoIdx);
			return ApiResponse.success(SuccessCode.DELETE_PHOTO);
		} catch (Exception e) {
			e.printStackTrace();
			return ApiResponse.error(ErrorCode.INTERNAL_SERVER_EXCEPTION);
		}
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