// 회원가입-정보 등록
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Wrapper, Header, Main, Article, Section, H1, H2, P, Footer, PinkButton} from "../../common/ui/Semantics";
import kangkang from "../../../assets/images/kangkang.png"
import useApi from "../../../hooks/auth/useApi";
import { login, updateChildState } from "../../../store/userSlice";
import { useDispatch,useSelector } from "react-redux";

const ModWrapper = styled(Wrapper)`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display:flex;
    flex-direction:column;
    position:fixed;
    align-items:center;
    z-index:-1;
    left:0;
    bottom:-5rem;
    h2{
        padding:0;
        margin-bottom:-1rem;
    }
`

const ModMain = styled(Main)`
    flex-direction:row;
    min-width: 20rem;
    height:25rem;
    &{
        border:none;
    }
    padding-bottom:-10rem;
`;
const ModSection = styled(Section)`
    border:none;
    flex-direction:column;
    /* align-items:center; */
    justify-content:space-around;
    /* height:100%; */
    &>${Article}{
       height:6.5rem;
       text-align:start;
       width:80%;
       flex-direction:column; 
       border:none;
       .kids-state{
        flex-direction:column;
        width:100%;
       }
    }
`
export const FormLabel = styled.label`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self:flex-start;
    margin-left:1.5rem;
`;

export const FormInput = styled.input`
    height: 2.1rem;
    min-width: 5rem;
    font-size: 0.8rem;
    background-color: #f8f8f8;
    border: solid 1px #e5e5e5;
    border-radius: 6px;
    padding: 0 1em;
`;

const FormInputButton = styled.input`
    height: 2.1rem;
    width: 5rem;
    font-size: 0.8rem;
    font-weight: 600;
    background-color: ${props=>props.color};
    border: solid 1px #e5e5e5;
    border-radius: 0.5rem;
    padding: 0 1em;
    margin-left: 1rem;
    margin-right: 1rem;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    height:4.5rem;
`;

const MyButton = styled(PinkButton)`
    width:6.2rem;
    height:2.5rem;
    letter-spacing:0.2rem;
    font-size:0.9rem;
`
function RegisterChild({childIdx}) {
    const thisChild = useSelector(state=>state.userState.children[0]) // 디폴트는 첫째
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {data, isLoading, error, post} = useApi('/children')
    const [newChild, setNewChild] = useState(true);
    const [colorboy, setColorBoy] = useState("#FFD731");
    const [colorgirl, setColorGirl] = useState("#ffffff");
    const [kidState, setKidState] = useState(thisChild)
    
    useEffect(()=>{
        if (data) {
            data.success===true? navigate('/play') : console.error('아이 프로필 등록 실패')
          }
    },[data])

    console.log(kidState)
    const SumbitChild = ()=>{
        const body = {
            nickname:kidState["nickname"],
            birthDate:kidState["birthDate"],
            gender:kidState["gender"],
            weight:Number(kidState["weight"]),
            height:Number(kidState["height"]),
            ProfileImageUrl:kidState["profileImageUrl"],
        }
        post(body)
        // 집이름 추가해서 리덕스 태워 보내기
        body["familyname"] = kidState["familyname"]
        dispatch(updateChildState(body))
    }
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (name=="gender"){
            if(value==="남자아이"){
                value=false
                setColorBoy("#FFD731");
                setColorGirl("#ffffff"); 
            } else {
                value=true
                setColorBoy("#ffffff");
                setColorGirl("#FFD731");
            }
        } 
        setKidState((prev) => ({
          ...prev,
          [name]: value,
        }));
    };
    return (
        <ModWrapper>
            <ModMain>
                <ModSection>
                    <Article>
                        <FormLabel htmlFor="nickname"> 닉네임</FormLabel>
                        <FormInput defaultValue={kidState["nickname"]} type="text" name="nickname" id="nickname" placeholder=" 닉네임" onChange={handleInputChange}/>
                    </Article>
                    <Article>
                        <FormLabel htmlFor="gender"> 성별</FormLabel>
                        <div>
                            <FormInputButton type="button" color={colorboy} defaultValue="남자아이" name="gender" onClick={handleInputChange}/>
                            <FormInputButton type="button" color={colorgirl}  defaultValue="여자아이" name="gender" onClick={handleInputChange}/>
                        </div>
                    </Article>
                    <Article>
                        <FormLabel htmlFor="birthDate"> 생년월일</FormLabel>
                        <FormInput defaultValue={kidState["birthDate"]} type="date" name="birthDate" id="birthDate" placeholder=" 닉네임" onChange={handleInputChange}/>
                    </Article>
                </ModSection>
                <ModSection>
                    <Article>
                        <FormLabel> 사진</FormLabel>
                        <div className="profile-container">
                        <ProfileImage src={kangkang}/>
                            <FormInputButton className="white-black-line-btn" color="white" type="button" defaultValue="수정"/>
                            {/* <input type="file" ref={fileInput} onChange={handleChange} style={{ display: "none" }} /> */}
                            <FormInputButton className="white-black-line-btn" color="white" type="button" defaultValue="삭제" />
                        </div>
                    </Article>
                    {newChild ?
                    <>
                    <Article>
                        <div className="kids-state">
                            <FormLabel htmlFor="height">키</FormLabel>
                            <FormInput defaultValue={kidState["height"]} type="text" name="height" id="height" placeholder=" cm" onChange={handleInputChange}/>
                        </div>
                    </Article>
                    <Article>
                        <div className="kids-state">
                            <FormLabel htmlFor="weight"> 체중</FormLabel>
                            <FormInput defaultValue={kidState["weight"]} type="text" name="weight" id="weight" placeholder=" kg" onChange={handleInputChange}/>
                        </div>
                    </Article>
                    </>
                    : null
                    }
                </ModSection>
            </ModMain>
            <Footer>
                <MyButton onClick={()=>SumbitChild()}>등록하기</MyButton>
                <MyButton>삭제하기</MyButton>
            </Footer>
        </ModWrapper>
    )
}

export default RegisterChild;