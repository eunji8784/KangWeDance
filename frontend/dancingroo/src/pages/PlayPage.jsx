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

    padding-bottom: 5rem;
`;

function PlayPage({handleWatchingPage}) {
    const navigate = useNavigate()
    
    const {data:playData, isLoading, error, fetchApi:playListApi} = useApi()
    const {data:recommendedData, recommendedIsLoading, recommendedError, fetchApi:recommendedApi} = useApi()
    
    useEffect(()=>{
        handleWatchingPage('play')
        playListApi('GET', '/play')
        recommendedApi('GET', '/play/recommendation')
    },[])

    return (
        <Wrapper>
            <RecommendSection recommendData={recommendedData?.data}/>      
            <DanceSection danceData={playData?.data.filter((e)=>e.playMode===0)} />
            <GameSection gameData={playData?.data.filter((e)=>e.playMode!==0)} />
        </Wrapper>
    );
}

export default PlayPage;