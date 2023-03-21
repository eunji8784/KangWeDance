import React from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//componment
import RegisterChild from "../components/common/form/RegisterChild";
import AccountInfo from "../components/users/AccountInfo";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
`;

const Wrapper2 = styled.div`
    width: 45rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    &>div{
        width:40%;
    }
`;

const Title = styled.div`
    display: flex;
    font-size: 2rem;
    font-weight: 800;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
`;

const Deleted = styled.div`
    width: 50rem;
    display: flex;
    justify-content: end;
    color: #9e9d9d;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;
`;

const Line = styled.div`
    width: 80vw;
    border: solid 1px #e5e5e5;
    margin-bottom: 2rem;
`;

function UserPage(props) {
    // const navigate = useNavigate();
    return (
        <Wrapper>
            <Title>회원 정보</Title>
            <Wrapper2>
                <AccountInfo/>
                <div>애들타이틀</div>
            </Wrapper2>
            <Line/>
            <RegisterChild/>
            <Deleted>회원 탈퇴하기</Deleted>
        </Wrapper>
    );
}

export default UserPage;
