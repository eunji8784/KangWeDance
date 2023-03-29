import React,{useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HealthData from "../components/status/HealthData";
import InputModal from "../components/status/InputModal";
import PlayData from "../components/status/PlayData";
import StatusBar from "../components/status/StatusBar";

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
