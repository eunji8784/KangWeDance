import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HealthData from "../components/status/HealthData";
import InputModal from "../components/status/InputModal";
import PlayData from "../components/status/PlayData";
import StatusBar from "../components/status/StatusBar";

import useApi from "../hooks/auth/useApi";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function StatusPage(props) {
    const navigate = useNavigate();
    const {handleWatchingPage} = props
    const [section, setSection] = useState('health')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [playRecord, setPlayRecord] = useState([]);
    const handleSection = (mode)=>{
        setSection(mode)
    }

    const handleIsModalOpen = ()=>{
        setIsModalOpen((prev)=>!prev)
    }
    const palyReco = useApi()

    useEffect(()=>{
        handleWatchingPage('status')
        // palyReco.fetchApi('GET', `/status/play-record`)
    },[])

    useEffect(()=>{
        if(palyReco.data){
            setPlayRecord(palyReco.data)
        }
        console.log(palyReco.data)
    }, [palyReco.data])

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
