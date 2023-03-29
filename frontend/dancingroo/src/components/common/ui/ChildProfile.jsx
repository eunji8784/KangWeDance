import React, {useEffect, useState
  // , useRef
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//logo
import plusprofile from "../../../assets/images/plusprofile.png"
import kangkang from "../../../assets/images/kangkang.png"
// 
import { useDispatch, useSelector } from "react-redux";
import { childSelect, getChildState } from "../../../store/userSlice";
import useApi from "../../../hooks/auth/useApi";

const Wrapper = styled.div`
    display: ${({display})=>display? 'none':'flex'};
    align-items: center;
    justify-content: flex-end;
    min-height:6rem;
`
const ProfileImg = styled.img`
    margin:1rem 0.3rem;
    background-color:#FFB0B6;
    width:3.5rem;
    height:3.5rem;
    border-radius:100%;
    border: 4px solid transparent;
    outline: none;
    box-sizing: border-box;
    :hover{
      ${({ active }) =>
      active=="false" &&
      ` 
      transform: scale(1.2);
      transition: all 0.3s ease-in-out;
      border: 3px solid #F05475;
      cursor: pointer;
      `
      }
    }
    ${({ active }) =>
      active==="true" &&
       `
        transform: scale(1.2);
        border-color: #F05475;
      `}
`

function ChildProfile(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const selectedIdx = useSelector(state=>state.userState.select)
    const children = useSelector(state=>state.userState.children)
    const {data, isLoading, error, fetchApi} = useApi()
    const [profileImg, setProfileImg] = useState([kangkang, plusprofile, plusprofile])
    const [active, setActive] = useState([true, false, false]); 
    
    // 데이터 있으면 프사 띄우고, 더미차일드면 플러스이미지 띄우기
    useEffect(()=>{
      const profileState = children.map((child)=>{
        if (child.childIdx===null){
          return plusprofile
        } else {
          return child.profileImageUrl?? kangkang
        }
      })
      setProfileImg(profileState)
    },[children])
    // 프로필 클릭하면 선택됐다는 CSS효과 옮겨주기
    useEffect(()=>{
      setActive((prevActive)=>
      prevActive.map((active, idx)=>idx===selectedIdx? true : false)
      );
    },[selectedIdx])
    // 아이 정보 불러오기
    useEffect(()=>{
      fetchApi("GET", '/children', onGetChildStateSuccess)
    }, [])
    const onGetChildStateSuccess = (json)=>{
      dispatch(getChildState(json.data))
    }
    const handleClick = (childIdx) => {
        dispatch(childSelect(childIdx))
        if (profileImg[childIdx] === plusprofile) navigate('/users/')
    };
    return (
        <Wrapper>
          {/* bool값은 html에서 유효하지 않기 떄문에 string으로 바꿔서 보내줌 */}
          <ProfileImg active={active[0].toString()} onClick={()=>handleClick(0)} src={profileImg[0]}/>
          <ProfileImg active={active[1].toString()} onClick={()=>handleClick(1)} src={profileImg[1]}/>
          {children[1]?.childIdx &&
          <ProfileImg active={active[2].toString()} onClick={()=>handleClick(2)} src={profileImg[2]}/>
          }
        </Wrapper>
    );
}

export default ChildProfile;
