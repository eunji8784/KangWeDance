import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import Modal from "../common/ui/Modal";
import { editFamilyname } from "../../store/userSlice";
import useApi from "../../hooks/auth/useApi";
import { useEffect } from "react";
import { levelDesign } from "../../utils/levelDesign";

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
    position:relative;
    justify-content:center;
`;
const Input = styled.input`
    outline:none;
    border:1px solid transparent;
    height:2rem;
    font-size:1.5rem;
    font-weight:bold;
    margin-bottom:0.5rem;
    left:0;
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
    const [newFamilyname, setNewFamilyname] = useState(familyname||'');
    const [experiencePercentage, setExperiencePercentage] = useState(30);
    const patchFamilyname = useApi()
    const getExp = useApi()


    // 경험치 조회 요청
    useEffect(()=>{
        const onSuccess = (json)=>{
            const {level, experience} = json.data
            const neededExp = levelDesign[level+1]
            let percentExp = Math.round(experience/neededExp)
            setExperiencePercentage(percentExp)
        }
        getExp.fetchApi('GET', '/parents/experience-score', onSuccess) // [1]. 콜백을 3번째로 넣어도 body로 안가고 콜백함수로 판단함.
    },[])

    // 가족닉네임 변경 요청
    const editFamilynameHandler = (e)=>{
        if (e.key!=="Enter") return

        if (window.confirm('가족닉네임 변경할까요?')){
            const onSuccess = ()=>{
                dispatch(editFamilyname(newFamilyname))
            }
            patchFamilyname.fetchApi('PATCH', '/parents/nickname', {familyname:newFamilyname}, onSuccess) // [2]. 4개 인자 모두 사용한 경우
        }
    }
    const handleInputChange = (e) => {
        setNewFamilyname(e.target.value); 
    };
    return (
        <Wrapper>
            <Title>
                <Input
                type="text"
                value={newFamilyname}
                onChange={handleInputChange}
                width={newFamilyname?.length+1 || 5}
                maxLength={15}
                onKeyPress={editFamilynameHandler}
                placeholder={familyname}
                />
            </Title>
            <Experience>
                <ExperiencePercentage gauge={experiencePercentage}/>
            </Experience>
        </Wrapper>
    );
}

export default AccountInfo;
