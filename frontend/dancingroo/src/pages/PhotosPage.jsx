import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

function PhotosPage(props) {
    const [section, setSection] = useState('gallery')
    const [imge, setImge] = useState('')
    const [frameImage, setFrameImage] = useState('')
    const [stickerImage, setStickerImage] = useState('')

    const [photoList, setPhotoList] = useState([])
    const [frameList, setFrameList] = useState([])
    const [stickerList, setStickerList] = useState([])

    const photos = useApi()
    const framestickers = useApi()

    const [stickerNum, setStickerNum] = useState(0)
    const {handleWatchingPage} = props

    useEffect(()=>{
        handleWatchingPage('photos')
        photos.fetchApi('GET', `/photos?pageNum=1`)
        framestickers.fetchApi('GET', `/photos/frames`)
    },[])

    //포토 리스트
    useEffect(()=>{
        if (photos.data) {
            setPhotoList(photos.data?.data.photoList)
        }
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

    const handleImge = (imgeUrl)=>{
        console.log(imgeUrl)
        setImge(imgeUrl)
    }
    
    const handleFrame = (imgeUrl)=>{
        setFrameImage(imgeUrl)
    }

    const handleSticker = (imgeUrl)=>{
        setStickerImage(imgeUrl)
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
            <RightArea stickerNum={stickerNum} stickerImage={stickerImage} frameImage={frameImage} imge={imge}/>
        </PhotosSection>
    );
}

export default PhotosPage;
