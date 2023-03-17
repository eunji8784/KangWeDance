import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function PlayPage(props) {
    const navigate = useNavigate();
    const {handleWatchingPage} = props
    useEffect(()=>{
        handleWatchingPage('play')
    },[])
    return (
        <Wrapper>
            PlayPage
        </Wrapper>
    );
}

export default PlayPage;
