import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../components/common/ui/Semantics";

import SideBar from "../components/photos/SideBar";
import Frame from "../components/photos/Frame";
import Gallery from "../components/photos/Gallery";
import Sticker from "../components/photos/Sticker";
import Deco from "../components/photos/Deco";

const PhotosSection = styled(Wrapper)`
    flex-direction: row;
    align-items: flex-start;
    height: 100%;
    width: 100%;
    min-width: 50rem;
    margin-top: 0.2rem;
`

const SideSection = styled(Wrapper)`
    width: 30%;
    height: 100%;
    justify-content: flex-start;
    background-color: #ffeef2;
    padding-top: 0.2rem;
`

function PhotosPage(props) {
    const navigate = useNavigate();
    const [section, setSection] = useState('gallery')
    const [imge, setImge] = useState('')
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

    return (
        <PhotosSection>
            <SideBar handleSection={handleSection}/>
            <SideSection>
                {section==='gallery' && <Gallery handleImge={handleImge}/>}
                {section==='frame' && <Frame/>}
                {section==='sticker' && <Sticker/>}
            </SideSection>
            <Deco imge={imge}/>
        </PhotosSection>
    );
}

export default PhotosPage;
