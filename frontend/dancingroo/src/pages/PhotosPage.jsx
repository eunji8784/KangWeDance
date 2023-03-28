import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Wrapper } from "../components/common/ui/Semantics";

import SideBar from "../components/photos/SideBar";
import FrameList from "../components/photos/FrameList";
import PhotoList from "../components/photos/PhotoList";
import StickerList from "../components/photos/StickerList";
import RightArea from "../components/photos/RightArea";
import useApi from "../hooks/auth/useApi"

const PhotosSection = styled(Wrapper)`
    flex-direction: row;
    height: 100%;
    width: 100%;
    min-width: 35rem;
    margin-top: 0.2rem;
    border-top: solid 0.1rem #ffeef2;
    border-bottom: solid 0.1rem #ffeef2;
`

const SideSection = styled(Wrapper)`
    width: 16%;
    height: 100%;
    min-width: 14rem;
    justify-content: flex-start;
    border: solid 0.2rem #ffeef2;
    /* overflow: scroll; */
`

function PhotosPage({handleWatchingPage}) {
    const [section, setSection] = useState('gallery')
    const [image, setImage] = useState('https://d3qb4vbeyp8phu.cloudfront.net/photoInit.png')
    const [frameImage, setFrameImage] = useState('')
    const [stickerImage, setStickerImage] = useState('')
    const [stickerNum, setStickerNum] = useState(0)

    const [photoList, setPhotoList] = useState([])
    const [frameList, setFrameList] = useState([])
    
    const [stickerList, setStickerList] = useState([])

    const photos = useApi()
    const framestickers = useApi()

    const selected = useSelector(state=>state.photo.num)

    useEffect(()=>{
        handleWatchingPage('photos')
        framestickers.fetchApi('GET', `/photos/frames`)
    },[])

        //포토 리스트
    useEffect(()=>{
        photos.fetchApi('GET', `/photos?pageNum=1`)
    },[selected])
    
    //포토 리스트
    useEffect(()=>{
        if (photos.data) {
            setPhotoList(photos.data?.data.photoList)
        }
        console.log("삭제되서 다시 포토 리스트 뿌리기")
        console.log(photos.data)
        console.log(photoList)
    },[photos.data])

    //스티커랑 프레임 리스트
    useEffect(()=>{
        if (framestickers.data) {
            setFrameList(framestickers.data?.data.frame)
            setStickerList(framestickers.data?.data.sticker)
        }
    },[framestickers.data])

    const handleSection = (mode)=>{
        setSection(mode)
    }

    const handleImge = (imageUrl)=>{
        setImage(imageUrl)
    }
    
    const handleFrame = (imageUrl)=>{
        setFrameImage(imageUrl)
    }

    const handleSticker = (imageUrl)=>{
        setStickerImage(imageUrl)
        setStickerNum(stickerNum+1)
    }

    return (
        <PhotosSection>
            <SideBar handleSection={handleSection}/>
            <SideSection>
                {section==='gallery' && <PhotoList photoList={photoList} handleImge={handleImge}/>}
                {section==='frame' && <FrameList frameList={frameList} handleFrame={handleFrame}/>}
                {section==='sticker' && <StickerList stickerList={stickerList} handleSticker={handleSticker}/>}
            </SideSection>
            <RightArea stickerNum={stickerNum} stickerImage={stickerImage} frameImage={frameImage} image={image}/>
        </PhotosSection>
    );
}

export default PhotosPage;
