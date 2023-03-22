import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../components/common/ui/Semantics";

import SideBar from "../components/photos/SideBar";
import FrameList from "../components/photos/FrameList";
import PhotoList from "../components/photos/PhotoList";
import StickerList from "../components/photos/StickerList";
import RightArea from "../components/photos/RightArea";

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
`

function PhotosPage(props) {
    const navigate = useNavigate();
    const [section, setSection] = useState('gallery')
    const [imge, setImge] = useState('')
    const [frameImage, setFrameImage] = useState('')
    const {handleWatchingPage} = props

    useEffect(()=>{
        handleWatchingPage('photos')
    },[])

    const handleSection = (mode)=>{
        setSection(mode)
    }

    const handleImge = (imgeUrl)=>{
        setImge(imgeUrl)
    }
    
    const handleFrame = (imgeUrl)=>{
        setFrameImage(imgeUrl)
    }

    return (
        <PhotosSection>
            <SideBar handleSection={handleSection}/>
            <SideSection>
                {section==='gallery' && <PhotoList handleImge={handleImge}/>}
                {section==='frame' && <FrameList handleFrame={handleFrame}/>}
                {section==='sticker' && <StickerList/>}
            </SideSection>
            <RightArea frameImage={frameImage} imge={imge}/>
        </PhotosSection>
    );
}

export default PhotosPage;
