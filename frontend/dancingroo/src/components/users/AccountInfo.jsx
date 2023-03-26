import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {FaEdit} from 'react-icons/fa';
import { useSelector,useDispatch } from "react-redux";
import { editFamilyname } from "../../store/userSlice";
import useApi from "../../hooks/auth/useApi";
import { useEffect } from "react";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const Title = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.1rem;
    cursor: pointer;
`;
const Input = styled.input`
  /* display: none;  */
`;
const Experience = styled.div`
    width: 12rem;
    height: 1.5rem;
    border: 0.1rem solid #F05475;
    border-radius: 1rem;
`;
const ExperiencePercentage = styled.div`
    width:${props=>props.gauge}%;
    height: 1.5rem;
    background-color: #F05475;
    border-radius: 0.5rem;
`;

function AccountInfo(props) {
    // const navigate = useNavigate();
    const dispatch = useDispatch()
    const familyname = useSelector(state=>state.userState.familyname)
    const [isEditing, setIsEditing] = useState(false);
    const [newFamilyname, setNewFamilyname] = useState(familyname);
    const [experiencePercentage, setExperiencePercentage] = useState(50);
    const editFamilyname = useApi()
    const getExp = useApi()

    // 경험치 조회 요청
    useEffect(()=>{
        const onSuccess = (json)=>{
            // 응답으로 경험치퍼센티지 계산한 뒤, 인자로 넣기
            setExperiencePercentage('here')
        }
        getExp.fetchApi('GET', '/parents/experience-score', onSuccess) // [1]. 콜백을 3번째로 넣어도 body로 안가고 콜백함수로 판단함.
    },[])

    // 가족닉네임 변경 요청
    const editFamilynameHandler = ()=>{
        const onSuccess = ()=>{
            dispatch(editFamilyname(newFamilyname))
        }
        editFamilyname.fetchApi('PATCH', '/parents/nickname', newFamilyname, onSuccess) // [2]. 4개 인자 모두 사용한 경우
    }
    const handleInputBlur = () => {
        setIsEditing(false); 
    };
    const handleInputChange = (e) => {
        setNewFamilyname(e.target.value); 
    };
    const handleTitleClick = () => {
        setIsEditing(true);
    };
    return (
        <Wrapper>
            <Title>
                {isEditing ?
                <Input
                type="text"
                value={newFamilyname}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoFocus
                onClick={handleTitleClick}
                />
                :
                familyname
                }
                <FaEdit size={18} color="#F05475"
                onClick={editFamilynameHandler}
                />
            </Title>
            <Experience>
                <ExperiencePercentage gauge={experiencePercentage}/>
            </Experience>
        </Wrapper>
    );
}

export default AccountInfo;
