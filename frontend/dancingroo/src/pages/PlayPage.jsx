import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useApi from "../hooks/auth/useApi";
import DanceSection from "../components/play/DanceSection";
import GameSection from "../components/play/GameSection";
import RecommendSection from "../components/play/RecommendSection";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    hr {
        width: 100%;
        height: 2px;
        border: white;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    }

    padding-bottom: 5rem;
`;

function PlayPage({handleWatchingPage}) {
    const navigate = useNavigate()
    
    const playList = useApi()
    const recommendation = useApi()
    
    useEffect(()=>{
        handleWatchingPage('play')
        playList.fetchApi('GET', '/play')
        recommendation.fetchApi('GET', '/play/recommendation')
    },[])

    return (
        <Wrapper>
            <RecommendSection recommendData={recommendation.data?.data}/>
            <hr />
            <DanceSection danceData={playList.data?.data.filter((e)=>e.playMode===0)} />
            <hr />
            <GameSection gameData={playList.data?.data.filter((e)=>e.playMode!==0)} />
        </Wrapper>
    );
}

export default PlayPage;