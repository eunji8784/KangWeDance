package com.ssafy.kang.photos.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.kang.photos.model.FramesDto;
import com.ssafy.kang.photos.model.PhotosDto;
import com.ssafy.kang.photos.model.mapper.PhotosMapper;
import com.ssafy.kang.util.AmazonS3ResourceStorage;
import com.ssafy.kang.util.FileDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PhotosServiceImpl implements PhotosService {

	private final AmazonS3ResourceStorage amazonS3ResourceStorage;

	@Autowired
	private SqlSession sqlSession;

	@Override
	public void addUpdate(MultipartFile multipartFile) throws Exception {
		FileDto fileDto = FileDto.multipartOf(multipartFile);
		System.out.println(fileDto.getPath());
		String url = amazonS3ResourceStorage.getUrl(fileDto.getPath(), multipartFile);

		PhotosDto photosDto = new PhotosDto();
		photosDto.setPhotoName(fileDto.getName());
		photosDto.setPhotoImageUrl(url);

		sqlSession.getMapper(PhotosMapper.class).insertPhoto(photosDto);

		// FileDto(id=45b870da-f5b2-487f-8bb9-f917082e2e07, name=아이피주소.png, format=png,
		// path=images/45b870da-f5b2-487f-8bb9-f917082e2e07.png, width=null,
		// height=null, bytes=103400, createdAt=2023-03-15T13:19:53.861483100,
		// status=null)

	}

	@Override
	public List<PhotosDto> findPhotos(int parentIdx, int pageNum) throws Exception {
		return sqlSession.getMapper(PhotosMapper.class).selectPhotos(parentIdx, pageNum);
	}

	@Override
	public List<FramesDto> findFrames(int level) throws Exception {
		return sqlSession.getMapper(PhotosMapper.class).selectFrames(level);
	}

	@Override
	public boolean removePhoto(int photoIdx) throws Exception {
		return sqlSession.getMapper(PhotosMapper.class).deletePhoto(photoIdx);
	}

	@Override
	public int findPhotosCount(int parentIdx) throws Exception {
		return sqlSession.getMapper(PhotosMapper.class).selectPhotosCount(parentIdx);
	}

	@Override
	public int findPramesCount(int level) throws Exception {
		// TODO Auto-generated method stub
		return sqlSession.getMapper(PhotosMapper.class).selectPramesCount(level);
	}

	@Override
	public int findLevel(int parentIdx) throws Exception {
		return sqlSession.getMapper(PhotosMapper.class).selectLevel(parentIdx);
	}

	@Override
	public List<FramesDto> findStickers() throws Exception {
		return sqlSession.getMapper(PhotosMapper.class).selectStickers();
	}

}