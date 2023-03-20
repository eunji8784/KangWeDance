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
`

const SideSection = styled(Wrapper)`
    width: 30%;
`

function PhotosPage(props) {
    const navigate = useNavigate();
    const [section, setSection] = useState('gallery')
    const {handleWatchingPage} = props

    useEffect(()=>{
        handleWatchingPage('photos')
    },[])

    const handleSection = (mode)=>{
        setSection(mode)
    }

    return (
        <PhotosSection>
            <SideBar handleSection={handleSection}/>
            <SideSection>
                {section==='gallery' && <Gallery/>}
                {section==='frame' && <Frame/>}
                {section==='sticker' && <Sticker/>}
            </SideSection>
            <Deco/>
        </PhotosSection>
    );
}

export default PhotosPage;
