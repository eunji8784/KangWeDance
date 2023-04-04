import React, {useState} from "react";
import styled, { css } from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import { editFamilyname } from "../../store/userSlice";
import useApi from "../../hooks/auth/useApi";
import { useEffect } from "react";
import { levelDesign } from "../../utils/commonInfo";
import useValidation from "../../hooks/auth/useValidation";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    .exp-wrapper{
        display:flex;
        align-items:center;
        justify-content:space-between;
        width:13rem;
        margin:-1rem;
        color:#F05475;
        font-weight:bold;
    }
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
    span{
        display: block;
        margin-top: 0.5rem;
        color: red;
        font-size: 1.3rem;
        font-weight: normal;
        cursor: pointer;
        height:2.2rem;
    }
`;

const InputStyle = css`
    outline:none;
    border:1px solid transparent;
    height:2rem;
    margin-bottom:0.5rem;
    left:0;
`

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
    height: 1.3rem;
    top:0.2rem;
    border: 0.1rem solid #F05475;
    border-radius: 1rem;
    display:flex;
    flex-direction:column;
    position:relative;
    span{
        position:absolute;
        top:-1.2rem;
        left:0.3rem;
        font-size:0.8rem;
    }
`;

const ExperiencePercentage = styled.div`
    width:${props=>props.gauge}%;
    height: 1.3rem;
    background-color: #F05475;
    border-radius: 0.5rem;
`;

function AccountInfo() {
    /* eslint-disable */
    const dispatch = useDispatch()
    const familyname = useSelector(state=>state.userState.familyname)
    const [experiencePercentage, setExperiencePercentage] = useState(10);
    const patchFamilyname = useApi()
    const getExp = useApi()
    const isValid = useValidation()
    const [ValidError, setValidError] = useState(false)
    const [expForDisplay, setExpForDisplay] = useState(null)

    useEffect(()=>{
        if (isValid.errors.familyname){
            setValidError(true)
        }
    },[isValid.errors.familyname])

    // 경험치 조회 요청
    useEffect(()=>{
        const onSuccess = (json)=>{
            const {level, experience} = json.data
            const neededExp = levelDesign[level+1]
            let percentExp = (experience/neededExp).toFixed(2)*100
            setExpForDisplay([experience, neededExp, level])
            setExperiencePercentage(percentExp)
        }
        getExp.fetchApi('GET', '/parents/experience-score', onSuccess) // [1]. 콜백을 3번째로 넣어도 body로 안가고 콜백함수로 판단함.
    },[])

    // 가족닉네임 변경 요청
    const editFamilynameHandler = (e)=>{
        if (e.key!=="Enter") return

        if (window.confirm('가족닉네임 변경할까요?')){
            if (isValid.validate({familyname}).familynameCheck) {

                patchFamilyname.fetchApi('PATCH', '/parents/nickname', {familyname})
            } else {
                setValidError(true)
            }
        }
    }

    const handleInputChange = (e) => {
        dispatch(editFamilyname(e.target.value)); 
    };

    return (
        <Wrapper>
            <Title>
                {ValidError?
                <span css={InputStyle} onClick={()=>setValidError(false)}>{isValid.errors.familyname}</span>
                :
                <Input
                type="text"
                name="familyname"
                id="familyname"
                value={familyname||''}
                onChange={handleInputChange}
                width={familyname?.length+1 || 5}
                maxLength={15}
                onKeyPress={editFamilynameHandler}
                placeholder={'가족 닉네임'}
                />
                }
            </Title>
            <div className="exp-wrapper">
                <p>교감Level {expForDisplay && expForDisplay[2]}</p>
                <Experience>
                    <ExperiencePercentage gauge={experiencePercentage < 10? 10 : experiencePercentage}/>
                    <span>{expForDisplay && `${expForDisplay[0]} / ${expForDisplay[1] || 'Max'}`}</span>
                </Experience>
            </div>
        </Wrapper>
    );
}

export default AccountInfo;
