// 회원가입-정보 등록
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Wrapper, Main, Article, Section, Footer, PinkButton} from "../../common/ui/Semantics";
import kangkang from "../../../assets/images/kangkang.png"
import useApi from "../../../hooks/auth/useApi";
import { getChildState, patchChildState, childSelect } from "../../../store/userSlice";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
import useValidation from "../../../hooks/auth/useValidation";
import Swal from "sweetalert2";

const ModWrapper = styled(Wrapper)`
    width: 100vw;
    overflow: hidden;
    display:flex;
    flex-direction:column;
    align-items:center;
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
    justify-content:space-around;
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
    span{
        color:red;
        font-weight:normal;
        margin-top:0.2rem;
        height:2rem;
        cursor: pointer;
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
    background-color: ${props=>props.color==="true"? "#FFD731":"#ffffff"};
    border: solid 1px #e5e5e5;
    border-radius: 0.5rem;
    padding: 0 1em;
    margin-left: 1rem;
    margin-right: 1rem;
    cursor: pointer;
`;
const ProfileImage = styled.img`
    height:5rem;
    width:5rem;
    border-radius:50%;
`;
const MyButton = styled(PinkButton)`
    width:6.2rem;
    height:2.5rem;
    letter-spacing:0.2rem;
    font-size:0.9rem;
`
function RegisterChild({userPage}) {
    /* eslint-disable */
    const selectedIdx = useSelector(state=>state.userState.select)
    const {nickname, weight, height, gender, profileImageUrl, childIdx, birthDate} = useSelector(state=>state.userState.children[selectedIdx||0]) // 디폴트는 첫째
    const firstChildIdx = useSelector(state=>state.userState.children[0].childIdx)
    const secondChildIdx = useSelector(state=>state.userState.children[1]?.childIdx)
    const addChild = useSelector(state=>state.userState.addChild)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const isValid = useValidation()
    const addNewChild = useApi()
    const patchChild = useApi()
    const deleteChild = useApi()
    const [btnColor, setBtnColor] = useState(gender)
    const fileInput = useRef(null);
    // 유효성검사 에러관리 state
    const [nameValidError, setNameValidError] = useState(false)
    const [weightValidError, setWeightValidError] = useState(false)
    const [heightValidError, setHeightValidError] = useState(false)
    const [dateValidError, setDateValidError] = useState(false)

    const onProfileUpdateSuccess = (json)=>{
        Swal.fire({               
            width: 400,
            iconColor: '#F05475 ',
            text: '아이 프로필 등록이 완료되었습니다.', 
            confirmButtonColor: '#F05475 ',
            confirmButtonText: '확인',
          });
        dispatch(childSelect(0))
        navigate('/play')
    }
    const handleUploadImg=async(e)=>{
        const url = "https://kangwedance.site/dev/children/profile";
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post(url, formData);
            if (response.data.status!==200) throw new Error(`HTTP error: ${response.data.status}`)
            dispatch(patchChildState({selectedIdx, name:"profileImageUrl", value:response.data.data}))
          } catch (error) {
            console.error(error);
          }
    }
    const deleteProfileHandler =()=>{
        fileInput.current.value = ''
        dispatch(patchChildState({selectedIdx, name:"profileImageUrl", value: null}))
    }
    const uploadImg=()=>{
        fileInput.current.click()
    }
    const handleDeleteChild = ()=>{
        Swal.fire({
            text: "아이 프로필 삭제하시겠습니까?",
            width: 360,
            showCancelButton: true,
            iconColor: '#F05475 ',
            confirmButtonColor: '#F05475 ',
            confirmButtonText: "삭제",
            cancelButtonText: "취소"
        }).then(function(e){
            if(e.isConfirmed === true) {
                const onSuccess = ()=>{
                    Swal.fire({             
                        width: 360,
                        iconColor: '#F05475 ',
                        text: '아이 프로필이 삭제되었습니다.', 
                        confirmButtonColor: '#F05475 ',
                        confirmButtonText: '확인',
                    });
                    if (childIdx===firstChildIdx&&!secondChildIdx){ // 아이가 0명일 때
                        dispatch(getChildState([{}]))
                        navigate('/users/join')
                    } else {
                        dispatch(childSelect(0))
                        navigate('/play')
                    } 
                }
                deleteChild.fetchApi('DELETE', `/children?childIdx=${childIdx}`, onSuccess)
               
            }
        })
    }

    const SumbitChild = ()=>{
        const body = {
            nickname,
            birthDate,
            gender,
            weight,
            height,
            profileImageUrl:profileImageUrl,
        }
        const patchBody = {
            nickname,
            birthDate,
            gender,
            profileImageUrl:profileImageUrl,
            childIdx,
        }
        
        const validCheck = isValid.validate({nickname, height, weight, birthDate});

        if (addChild) {
            if (validCheck.nicknameCheck && validCheck.heightCheck && validCheck.weightCheck && validCheck.birthDateCheck) {
                addNewChild.fetchApi('POST', '/children', body, onProfileUpdateSuccess);
            } else {
                setNameValidError(!validCheck.nicknameCheck);
                setHeightValidError(!validCheck.heightCheck);
                setWeightValidError(!validCheck.weightCheck);
                setDateValidError(!validCheck.birthDateCheck);
            }
        } else {
            if (validCheck.nicknameCheck) {
                patchChild.fetchApi('PATCH', '/children', patchBody, onProfileUpdateSuccess);
            } else {
                setNameValidError(!validCheck.nicknameCheck);
            }
        }
    }
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        if (name==="gender"){
            if(value==="남자아이"){
                value=false
                setBtnColor(value)
            } else {
                value=true
                setBtnColor(value)
            }
        }
        if(name==="weight"||name==="height") value = Number(value) 
        dispatch(patchChildState({selectedIdx,name,value}));
    };
    return (
        <ModWrapper>
            <ModMain>
                <ModSection>
                    <Article>
                        <FormLabel htmlFor="nickname"> 닉네임1</FormLabel>
                        {nameValidError?
                            <span onClick={()=>setNameValidError(false)}>{isValid.errors.nickname}</span>
                        :
                            <FormInput value={nickname||''} type="text" name="nickname" id="nickname" placeholder=" 닉네임" onChange={handleInputChange}/>
                        }
                    </Article>
                    <Article>
                        <FormLabel htmlFor="gender"> 성별</FormLabel>
                        <div>
                            <FormInputButton type="button" color={gender? "false":"true"} value="남자아이" name="gender" onClick={handleInputChange}/>
                            <FormInputButton type="button" color={gender? "true":"false"}  value="여자아이" name="gender" onClick={handleInputChange}/>
                        </div>
                    </Article>
                    <Article>
                        <FormLabel htmlFor="birthDate"> 생년월일</FormLabel>
                        {dateValidError?
                            <span onClick={()=>setDateValidError(false)}>{isValid.errors.birthDate}</span>
                            :
                            <FormInput value={birthDate||''} type="date" name="birthDate" id="birthDate" placeholder=" 닉네임" onChange={handleInputChange}/>
                        }
                    </Article>
                </ModSection>
                <ModSection>
                    <Article>
                        <FormLabel> 사진</FormLabel>
                        <div className="profile-container">
                        <ProfileImage src={profileImageUrl||kangkang}/>
                            <FormInputButton className="white-black-line-btn" color="white" type="button" value="수정" onClick={()=>uploadImg()}/>
                            <input ref={fileInput} type="file" style={{ display: "none" }} onChange={(e) => {handleUploadImg(e)}}
                            />
                            <FormInputButton className="white-black-line-btn" color="white" type="button" value="삭제" onClick={deleteProfileHandler}/>
                        </div>
                    </Article>
                    <Article>
                        <div className="kids-state">
                            <FormLabel htmlFor="height">키</FormLabel>
                            {heightValidError?
                                <span onClick={()=>setHeightValidError(false)}>{isValid.errors.height}</span>
                            :
                                <FormInput value={height||''} type="text" name="height" id="height" placeholder=" cm" onChange={handleInputChange} disabled={!addChild}/>
                            }
                        </div>
                    </Article>
                    <Article>
                        <div className="kids-state">
                            <FormLabel htmlFor="weight"> 체중</FormLabel>
                            {weightValidError?
                                <span onClick={()=>setWeightValidError(false)}>{isValid.errors.weight}</span>
                            :
                                <FormInput value={weight||''} type="text" name="weight" id="weight" placeholder=" kg" onChange={handleInputChange} disabled={!addChild}/>
                            }
                        </div>
                    </Article>
                </ModSection>
            </ModMain>
            <Footer>
                <MyButton onClick={()=>SumbitChild()}>{!addChild? '수정하기' : '등록하기'}</MyButton>
                <MyButton style={{display: !addChild? 'flex':'none'}} onClick={()=>handleDeleteChild()}>삭제하기</MyButton>
            </Footer>
        </ModWrapper>
    )
}

export default RegisterChild;