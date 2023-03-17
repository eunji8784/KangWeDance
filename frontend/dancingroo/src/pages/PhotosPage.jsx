import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper } from "../components/common/ui/Semantics";

function PhotosPage(props) {
    const navigate = useNavigate();
    const {handleWatchingPage} = props
    useEffect(()=>{
        handleWatchingPage('photos')
    },[])
    return (
        <Wrapper>
            PhotosPage
        </Wrapper>
    );
}

export default PhotosPage;
