import React,{useState, useEffect} from "react";
import styled from "styled-components";
import HealthData from "../components/status/HealthData";
import InputModal from "../components/status/InputModal";
import PlayData from "../components/status/PlayData";
import StatusBar from "../components/status/StatusBar";
import { useDispatch, useSelector } from "react-redux";
import { patchChildState } from "../store/userSlice";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

function StatusPage({handleWatchingPage}) {
    const select = useSelector(state=>state.userState.select)
    const dispatch = useDispatch()
    const bodyUpdateCheck = useSelector(state=>state.userState.children[select||0].bodyRecordFlag)
    const [section, setSection] = useState('health')
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(()=>{
        if (!bodyUpdateCheck){
            setIsModalOpen(true)
            dispatch(patchChildState({selectedIdx:select, name:"bodyRecordFlag", value:true}))
        }
    },[bodyUpdateCheck])

    useEffect(()=>{
        handleWatchingPage('status')
    })

    const handleSection = (mode)=>{
        setSection(mode)
    }
    const handleIsModalOpen = ()=>{
        setIsModalOpen((prev)=>!prev)
    }
    console.log(select)
    console.log(bodyUpdateCheck)
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
