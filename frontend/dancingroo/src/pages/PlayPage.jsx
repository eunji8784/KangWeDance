import React, {useEffect} from "react";
import styled from "styled-components";
import useApi from "../hooks/auth/useApi";
import DanceSection from "../components/play/DanceSection";
import GameSection from "../components/play/GameSection";
// 동찬 추가
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-bottom: 5rem;
`;

function PlayPage({handleWatchingPage}) {
    // 동찬 추가
    const navigate = useNavigate()
    const firstChild = useSelector(state=>state.userState.children[0].childIdx)
    
    const {data:playData, isLoading, error, fetchApi:playListApi} = useApi()
    // const {recommendedData, recommendedIsLoading, recommendedError, recommendedApi} = useApi('/play/recommendation')

    // // 동찬 추가) 아이 조회해서 등록된 아이가 0명이면, join페이지로 보내기
    // useEffect(()=>{
    //     if (firstChild && firstChild===null){
    //         navigate('/users/join')
    //     } 
    // },[firstChild])
    
    useEffect(()=>{
        handleWatchingPage('play')
        playListApi('GET', '/play')
    },[])
    return (
        <Wrapper>
            <DanceSection danceData={playData?.data.filter((e)=>e.playMode===0)} />
            <GameSection gameData={playData?.data.filter((e)=>e.playMode!==0)} />
        </Wrapper>
    );
}

export default PlayPage;