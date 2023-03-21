package com.ssafy.kang.photos.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.kang.photos.model.PhotosDto;
import com.ssafy.kang.photos.model.PramesDto;

@Service
public interface PhotosService {

//	| findOrder() | 조회 유형의 service 메서드 |
//	| addOrder() | 등록 유형의 service 메서드 |
//	| modifyOrder() | 변경 유형의 service 메서드 |
//	| removeOrder() | 삭제 유형의 service 메서드 |
//	| saveOrder() | 등록/수정/삭제 가 동시에 일어나는 유형의 service 메서드 |

	public void addUpdate(MultipartFile multipartFile) throws Exception;

	public List<PhotosDto> findPhotos(int parentIdx, int pageNum) throws Exception;

	public List<PramesDto> findPrames(int parentIdx, int pageNum) throws Exception;

	public boolean removePhoto(int photoIdx) throws Exception;

	public int findPhotosCount(int parentIdx) throws Exception;

	public int findPramesCount(int parentIdx) throws Exception;

}
