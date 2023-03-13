import React from "react";
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

function AccountInfo(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Title>유경이네 <FaEdit size={18} color="#F05475"/></Title>
            <div>경험치</div>
        </Wrapper>
    );
}

export default AccountInfo;
