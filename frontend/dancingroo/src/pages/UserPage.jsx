import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//componment
import RegisterChild from "../components/common/form/RegisterChild";
import AccountInfo from "../components/users/AccountInfo";
import ChildProfile from "../components/common/ui/ChildProfile";
// api
import useApi from "../hooks/auth/useApi";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';
import { logout } from "../store/userSlice";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
`;
export const Wrapper2 = styled.div`
    width: 45rem;
    display: flex;
    justify-content: space-between;
    /* margin-bottom: 1rem; */
    &>div{
        width:40%;
    }
`;
const Title = styled.div`
    display: flex;
    font-size: 2rem;
    font-weight: 800;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
`;
const Deleted = styled.div`
    /* width: 50rem; */
    display: flex;
    justify-content: end;
    color: #9e9d9d;
    font-size: 1rem;
    font-weight: 600;
    margin-top: 1.5rem;
    position:absolute;
    bottom:3rem;
    right:1rem;
    cursor: pointer;
`;
const Line = styled.div`
    width: 80vw;
    border: solid 1px #F05475;
    margin-bottom: 2rem;
`;

function UserPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [, , removeCookie] = useCookies('accessToken');
    const withdrawAccount = useApi()

    const withdrawAccountHandler = ()=>{
        if (window.confirm('정말로 계정탈퇴하시겠습니까?')){
            const onSuccess = ()=>{
                removeCookie('accessToken', { path: '/' })
                dispatch(logout())
                navigate('/')
            }
            withdrawAccount.fetchApi('DELETE', '/parents', onSuccess)
        }
    }
    return (
        <Wrapper>
            <Title>회원 정보</Title>
            <Wrapper2>
                <AccountInfo/>
                <div><ChildProfile/></div>
            </Wrapper2>
            <Line/>
            <RegisterChild userPage={true}/>
            <Deleted onClick={withdrawAccountHandler}>회원 탈퇴하기</Deleted>
        </Wrapper>
    );
}

export default UserPage;
