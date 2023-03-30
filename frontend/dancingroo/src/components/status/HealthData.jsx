import React
, { useState }// , { useState } 
from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useApi from "../../hooks/auth/useApi"
import MotionChart from "./chart/MotionChart";
import BodyChart from "./chart/BodyChart";
import { PinkButton } from "../common/ui/Semantics";
import { tagColors } from "../../utils/tagColors";

const Wrapper = styled.div`
    display: flex;
    box-sizing: border-box;
    width:100%;  
    height: auto; 
    overflow-y: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    *{
      box-sizing: border-box;
    }
    // [1] Wrapper 자식인 section선택자
    &>section{
      display:flex;
      align-items:center;
      width:95%;
      height: fit-content;
      //[1-1] section 중 header라는 class를 가진 태그선택자
      &.header{
        justify-content:flex-start;
        span{
          font-size:1.1rem;
        }
      }
      // [1-2] section 중 main이라는 class를 가진 태그선택자
      &.main{
      justify-content:space-between;
      height:auto;
      margin-bottom:3rem;
      }
      // [1-3] section 자식의 모든 article태그선택자
      &>article{
        border-radius:10px;
        background-color:#FEECF0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        height:100%;
        padding-bottom:3%;
        // [1-3-1] 그 내부의 left라는 클래스 선택자
        &.left{
          width:55%;
        }
        // [1-3-2] 그 내부의 right라는 클래스 선택자
        &.right{
          width:40%;
          .info-box{
            display:flex;
            background-color:white;
            border-radius:10px;
            flex-direction:column;
            justify-content:center;
            height:18rem;
            &>h2{
              font-size:1.5rem;
              letter-spacing:-0.1rem;
            }
            .info-content{
              height:45%;
              margin-left:1rem;
              font-size:0.8rem;
              /* border:1px solid black; */
            }
          }
        }
        // [1-3-3] 그 내부의 graph-box라는 클래스 선택자
        .graph-box{
          width:100%;
          height:10rem;
          background-color:white;
          border-radius:5px;
        }
        .graph-header{
          &>h6{
            font-size:0.7rem;
            display:inline-block;
            width:11rem;
            text-align:end;
            margin-right:0.8rem;
            span{
              color:red;
              font-size:0.9rem;
            }
            letter-spacing:0.1rem;
          }
          display:flex;
          flex-direction:row;
          align-items:center;
          justify-content:space-between;
        }
      }
      .status-box>h3,h5,h4{
        padding-left:0.8rem;
      }
      .right{
        .chart-container{
          height:20rem;
          background-color:white;
          border-radius:5px;
        }
        /* justify-content:center;
        align-items:center; */

      }
    }
`;
// [2] 모달열기위한버튼은 따로 컴포로 제작후 export해서 PlayData페이지에도 활용
export const ModalBtn = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    background-color: #F05475;
    width:8.5rem;
    height:2.5rem;
    color:white;
    font-weight:bold;
    border-radius:15px;
    letter-spacing:0.1rem;
    margin:1.5rem 1rem;
    font-size:0.9rem;
    cursor: pointer;
    border: none;
    outline: none;
    box-shadow: 0px 3px 10px rgba(240, 84, 117, 0.3);
    transition: box-shadow 0.3s ease-in-out;
    &:hover{
        box-shadow: 0px 3px 15px rgba(240, 84, 117, 0.6);
    }
`
const ModBtn = styled(PinkButton)`
  cursor: default;
  background-color:${props=>props.color};
` 
function HealthData(props) {
    const {handleIsModalOpen} = props;
    // const navigate = useNavigate();
    const selected = useSelector(state=>state.userState.select)
    const selectedChild = useSelector(state=>state.userState.children[selected||0]) 
    const getTagData = useApi()
    const getBodyChanges = useApi()
    const [heightChanges, setHeightChanges] = useState([])
    const [weightChanges, setWeightChanges] = useState([])
    const [bmiChanges, setBmiChanges] = useState([])
    const [tagData, setTagData] = useState([])
    const [sortedTagList, setSortedTagList] = useState()

    useEffect(()=>{
      const onBodyResSuccess= (response)=>{
        const bodyRecords = response.data[selected].bodyRecord
        const tempBmi = []
        const tempHeight = []
        const tempWeight = []
        for (const record of bodyRecords) {
          const { weight, height, bmi, recordDate } = record;
          tempBmi.push({ x: recordDate, y: Number(bmi) });
          tempHeight.push({ x: recordDate, y: Number(height) });
          tempWeight.push({ x: recordDate, y: Number(weight) });
        }
        setBmiChanges([{ id: selectedChild.nickname||"첫째", data: tempBmi, hidden:true }]);
        setHeightChanges([{ id: selectedChild.nickname||"첫째", data: tempHeight, hidden:true }]);
        setWeightChanges([{ id: selectedChild.nickname||"첫째", data: tempWeight, hidden:true }]);
      } 
      getBodyChanges.fetchApi('GET', '/status/body-changes', onBodyResSuccess)
      const onTagResSuccess = (response)=>{
        const data = response.data[selected]
        const sortedData = [...Object.entries(data)].filter(ele=>ele[0]!=='childIdx' && ele[0]!=='총_플레이시간').sort((a,b)=>a[1]-b[1])
        setSortedTagList(sortedData)
        const tempState = []
        for (const ele in data){
          if (ele==="childIdx" || ele==="총_플레이시간") continue;
          const tempObj = {}
          tempObj["tag"] = ele
          tempObj["누적횟수"] = data[ele]
          tempState.push(tempObj)

        }
        setTagData(tempState)
      }
      getTagData.fetchApi('GET', '/status/tag-list', onTagResSuccess)
    },[selected])
    return (
        <Wrapper>
          <section className="section header">
            <h3>{selectedChild.nickname}<span>(이)는</span> {selectedChild.height}cm {selectedChild.weight}kg<span>이에요</span></h3>
            <ModalBtn onClick={()=>handleIsModalOpen()}>오늘의 정보 입력</ModalBtn>
          </section>
          <section className="section main">
            <article className="status-box left">
              <h3>신체 변화 기록</h3>
              <div className="graph-header">
                <h4>BMI</h4>
                <h6>현재 BMI는, <span>{"위험"}</span>수치에요</h6>
              </div>
              <div className="graph-box">
                <BodyChart data={bmiChanges} color={'set1'}/>
              </div>
              <div className="graph-header">
                <h4>체중(kg)</h4>
                <h6>또래 기준,  상위 <span>{11}</span>%에요</h6>
              </div>
              <div className="graph-box">
                <BodyChart data={weightChanges} color={'category10'}/>
              </div>
              <div className="graph-header">
                <h4>키(cm)</h4>
                <h6>또래 기준, 상위 <span>{11}</span>%에요</h6>
              </div>
              <div className="graph-box">
                <BodyChart data={heightChanges} color={'accent'}/>
              </div>
            </article>
            <article className="status-box right">
              <h3>플레이 리포트</h3>
              <div className="info-box">
                <div className="info-content">
                  <h3>이런 동작을 제일 잘해요!</h3>
                  {sortedTagList &&
                  <>
                  <ModBtn color={tagColors[sortedTagList[sortedTagList.length-1][0]]}>{sortedTagList[sortedTagList.length-1][0]}</ModBtn>
                  <ModBtn color={tagColors[sortedTagList[sortedTagList.length-2][0]]}>{sortedTagList[sortedTagList.length-2][0]}</ModBtn>
                  <ModBtn color={tagColors[sortedTagList[sortedTagList.length-3][0]]}>{sortedTagList[sortedTagList.length-3][0]}</ModBtn>
                  </>
                  }
                </div>
                <div className="info-content">
                  <h3>이런 동작은 연습이 필요해요!</h3>
                  {sortedTagList && 
                  <>
                  <ModBtn color={tagColors[sortedTagList[0][0]]}>{sortedTagList[0][0]}</ModBtn>
                  <ModBtn color={tagColors[sortedTagList[1][0]]}>{sortedTagList[1][0]}</ModBtn>
                  </>
                  }
                </div>
              </div>
              <h3>{selectedChild.nickname}(이) 동작 태그 분석</h3>
              <div className="chart-container">
                <MotionChart data={tagData}/>
              </div>
            </article>
          </section>
        </Wrapper>
    );
}

export default HealthData;
