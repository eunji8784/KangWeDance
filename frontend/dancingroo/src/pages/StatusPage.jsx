import React,{useState} from "react";
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
    const navigate = useNavigate();
    const [section, setSection] = useState('Health')

    return (
        <Wrapper>
            <StatusBar/>
            <HealthData/>
            {/* <PlayData/> */}
            <InputModal display={'none'}/>
        </Wrapper>
    );
}

export default StatusPage;
