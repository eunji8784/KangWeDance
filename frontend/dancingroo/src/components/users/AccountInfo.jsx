import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {FaEdit} from 'react-icons/fa';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
`;

const Experience = styled.div`
    /* height: 0%;
    width: ; */
    /* font-weight: ${props=>props.color}; */
`;

function AccountInfo(props) {
    const navigate = useNavigate();
    const [experience, setExperience] = useState(10);
    return (
        <Wrapper>
            <Title>유경이네 <FaEdit size={18} color="#F05475"/></Title>
            {/* <Experience gauge={experience}/> */}
        </Wrapper>
    );
}

export default AccountInfo;
