import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HealthData from "../components/status/HealthData";
import InputModal from "../components/status/InputModal";
import PlayData from "../components/status/PlayData";
import StatusBar from "../components/status/StatusBar";

import useApi from "../hooks/auth/useApi";
import { getChildState } from "../store/userSlice";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function StatusPage(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {handleWatchingPage} = props
    const [section, setSection] = useState('health')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const getChild = useApi()

    // 모달 열리고 닫힐 때마다 아이 조회요청하기
    useEffect(()=>{
        const onGetChildStateSuccess = (json)=>{
            dispatch(getChildState(json.data))
          }
        getChild.fetchApi('GET', '/children', onGetChildStateSuccess)
    },[isModalOpen])
    
    useEffect(()=>{
        handleWatchingPage('status')
    })

    const handleSection = (mode)=>{
        setSection(mode)
    }
    const handleIsModalOpen = ()=>{
        setIsModalOpen((prev)=>!prev)
    }
    return (
        <Wrapper>
            <StatusBar handleSection={handleSection}/>
            {section==='health'?
            <HealthData handleIsModalOpen={handleIsModalOpen}/>
            :
            <PlayData handleIsModalOpen={handleIsModalOpen}/>
            }
            <InputModal isOpen={isModalOpen} handleIsModalOpen={handleIsModalOpen}/>
        </Wrapper>
    );
}

export default StatusPage;
