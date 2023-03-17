// 회원가입-정보 등록
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 1.5rem;
    width: 55rem;
    &>div{
        width:40%;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
`;

const FormInput = styled.input`
    height: 2.1rem;
    width: 80%;
    font-size: 0.8rem;
    background-color: #f8f8f8;
    border: solid 1px #e5e5e5;
    border-radius: 6px;
    padding: 0 1em;
`;

const FormInputButton = styled.input`
    height: 2.1rem;
    width: 6rem;
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

const FormButton = styled.input`
    height: 2.5rem;
    width: 6rem;
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 600;
    background-color:${props=>props.color};
    border-radius: 0.5rem;
    border: 0;
    margin-left: 1rem;
    margin-right: 1rem;
    cursor: pointer;
`;

const ProfileImage = styled.img`
    
`;

function RegisterChild({childIdx}) {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [newChild, setNewChild] = useState(true);
  const [boy, setBoy] = useState(true);
  const [girl, setGirl] = useState(false);
  const [colorboy, setColorBoy] = useState("#FFD731");
  const [colorgirl, setColorGirl] = useState("#ffffff");
  
//닉네임 입력중
  const handleNickname = e => {
    setNickname(e.target.value);
  }

//생년월일 입력중
  const handleBirth = e => {
    setBirth(e.target.value);
  }

  //성별 입력중
    const handleGirl = e => {
        setBoy(false);
        setGirl(true);
        setColorBoy("#ffffff");
        setColorGirl("#FFD731");
    }

    //성별 입력중
    const handleBoy = e => {
        setBoy(true);
        setGirl(false);
        setColorBoy("#FFD731");
        setColorGirl("#ffffff");    
    }

  return (
    <>
        <Wrapper>
            <div>
                <InputWrapper>
                    <FormLabel htmlFor="nickname"> 닉네임</FormLabel>
                    <FormInput defaultValue={nickname} type="text" name="nickname" id="nickname" placeholder=" 닉네임" onChange={handleNickname}/>
                </InputWrapper>
                <InputWrapper>
                    <FormLabel htmlFor="gender"> 성별</FormLabel>
                    <div>
                        <FormInputButton type="button" color={colorboy} defaultValue="남자아이" onClick={handleBoy}/>
                        <FormInputButton type="button" color={colorgirl}  defaultValue="여자아이" onClick={handleGirl}/>
                    </div>
                </InputWrapper>
                <InputWrapper>
                    <FormLabel htmlFor="birth"> 생년월일</FormLabel>
                    <FormInput defaultValue={birth} type="date" name="birth" id="birth" placeholder=" 닉네임" onChange={handleBirth}/>
                </InputWrapper>
            </div>
            <InputWrapper>
                <FormLabel> 사진</FormLabel>
                <ProfileImage/>
                <ButtonWrapper>
                    <FormInputButton className="white-black-line-btn" color="white" type="button" defaultValue="수정"/>
                    {/* <input type="file" ref={fileInput} onChange={handleChange} style={{ display: "none" }} /> */}
                    <FormInputButton className="white-black-line-btn" color="white" type="button" defaultValue="삭제" />
                </ButtonWrapper>
                {newChild ?
                <ButtonWrapper>
                    <InputWrapper>
                        <FormLabel htmlFor="height"> 키</FormLabel>
                        <FormInput defaultValue={height} type="text" name="height" id="height" placeholder=" cm"/>
                    </InputWrapper>
                    <InputWrapper>
                        <FormLabel htmlFor="weight"> 체중</FormLabel>
                        <FormInput defaultValue={weight} type="text" name="weight" id="weight" placeholder=" kg"/>
                    </InputWrapper>
                </ButtonWrapper>
                : null
                }
            </InputWrapper>
        </Wrapper>
        <ButtonWrapper>
            <FormButton color=" #F05475" type="button" defaultValue="수정하기"/>
            <FormButton color=" #f8bbc7" type="button" defaultValue="삭제하기"/>
        </ButtonWrapper>
    </>
  )
}

export default RegisterChild;