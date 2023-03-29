import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Wrapper, Main, Header, Footer, Section, Article } from "../components/common/ui/Semantics";
import { useSelector, useDispatch } from "react-redux";
import { FormLabel,FormInput } from "../components/common/form/RegisterChild";
import RegisterChild from "../components/common/form/RegisterChild";
import { intoJoinPage } from "../store/userSlice";
const ModHeader = styled(Header)`
    margin-top:1rem;
    padding-bottom:0.5rem;
    flex-direction:column;
    .우리집{
        /* border:1px solid red; */
        /* margin-left:14.9rem; */
        align-self:flex-start;
    }
    .우리집인풋{
        align-self:flex-start;
        margin-left:5rem;
        width:15rem;
    }
    .house{
        flex-direction:column;
        width:90%;
        margin-bottom:0.5rem;
    }
    width:90%;
    border-bottom: 2px solid #F05475;
`

function Registration(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const familyname = useSelector(state=>state.userState.familyname)
    const addChild = useSelector(state=>state.userState.addChild)
    const [familynameState, setFamilynameState] = useState(familyname)

    useEffect(()=>{
        dispatch(intoJoinPage(true))
        return ()=>dispatch(intoJoinPage(false))
    },[])
    const handleInputChange = (e)=>{    
        setFamilynameState(()=>e.target.value)
    }
    return (
        <Wrapper>
            <ModHeader>
                <h1>아이 프로필 등록하기</h1>
                <div className="house">
                    <FormLabel className="우리집" htmlFor="familyname">우리 집</FormLabel>
                    <FormInput className="우리집인풋" defaultValue={familyname} type="text" name="familyname" id="familyname" placeholder=" 캥거루합창단" onChange={handleInputChange}/>
                </div>
            </ModHeader>
            <RegisterChild/>
        </Wrapper>
    );
}

export default Registration;
