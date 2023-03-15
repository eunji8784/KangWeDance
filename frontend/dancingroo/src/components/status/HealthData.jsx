import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    border:1px solid black;
    box-sizing: border-box;
    width:100%;  
    height: auto; 
    overflow-y: auto;
    overflow-x:hidden;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    *{
      box-sizing: border-box;
    }
    &>div{
      display:flex;
      align-items:center;
      /* border:1px solid black; */
      width:95%;
      height: fit-content;
    }
    &>div:nth-child(1){
      justify-content:flex-start;
      &>div{
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
      }
    }
    &>div:nth-child(2){
      justify-content:space-between;
      height:auto;
      margin-bottom:3rem;
    }
    .status-box{
      /* height:30rem; */
      border-radius:10px;
      background-color:#FEECF0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
      :nth-child(1){
        width:55%;
      }
      :nth-child(2){
        width:40%;
      }
      .graph-box{
        width:100%;
        height:8rem;
        background-color:white;
        border-radius:5px;
      }
    }
`;

function HealthData(props) {
    const navigate = useNavigate();
    return (
        <Wrapper>
          <div>
            <h3>{props.username}(이)는 {props.cm}cm {props.kg}kg이에요</h3>
            <div>오늘의 정보 입력</div>
          </div>
          <div>
            <div className="status-box">
              <h3>신체 변화 기록</h3>
              <h5>키(cm)</h5>
              <div className="graph-box">
              </div>
              <h5>체중(kg)</h5>
              <div className="graph-box">
              </div>
              <h5>BMI</h5>
              <div className="graph-box">
              </div>
            </div>
            <div className="status-box">
              <h3>뾰롱</h3>
              <h5>나이, 키 기반 체중 상위 {'OO'}%</h5>
              <div className="graph-box"></div>
              <h5>오늘 먹은 칼로리 <span>{'OOOO'}kcal</span></h5>
              <div className="graph-box"></div>
              <h5>식단 기반,</h5>
              <h4>4주 뒤 예측 몸무게 <span>{'OO'}KG</span></h4>
              <div className="graph-box"></div>
            </div>
          </div>
        </Wrapper>
    );
}

export default HealthData;
