import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useApi from "../hooks/auth/useApi";
import DanceSection from "../components/play/DanceSection";
import GameSection from "../components/play/GameSection";
import DescribeSection from "../components/play/DescribeSection";
import Rocket from "../components/common/effects/Rocket";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position:relative;
    hr {
        width: 100%;
        border-bottom: solid 0.5rem #ffcfd3;
        margin-top: 5rem;
    }
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
            {/* <RecommendSection recommendData={recommendation.data?.data}/> */}
            <DescribeSection/>
            <DanceSection danceData={playList.data?.data.filter((e)=>e.playMode===0)} />
            <div className="hr" />
            <GameSection gameData={playList.data?.data.filter((e)=>e.playMode!==0)} />
            <Rocket/>
        </Wrapper>
    );
}

export default PlayPage;