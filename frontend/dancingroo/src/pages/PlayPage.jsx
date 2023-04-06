import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import useApi from "../hooks/auth/useApi";
import DanceSection from "../components/play/DanceSection";
import GameSection from "../components/play/GameSection";
import FooterBar from "../components/common/nav/FooterBar";
import Rocket from "../components/common/effects/Rocket";
import { setRecommendation } from "../store/stageSlice";

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
    /* eslint-disable */
    const dispatch = useDispatch();
    
    const playList = useApi()
    const recommendation = useApi()
    
    useEffect(()=>{
        const onSuccess = (json) => {
            dispatch(setRecommendation(json.data))
        }
        handleWatchingPage('play')
        playList.fetchApi('GET', '/play')
        recommendation.fetchApi('GET', '/play/recommendation', onSuccess)
    },[])
    return (
        <Wrapper>
            <DanceSection danceData={playList.data?.data.filter((e)=>e.playMode===0)} />
            <GameSection gameData={playList.data?.data.filter((e)=>e.playMode!==0)} />
            <FooterBar />
            <Rocket/>
        </Wrapper>
    );
}

export default PlayPage;