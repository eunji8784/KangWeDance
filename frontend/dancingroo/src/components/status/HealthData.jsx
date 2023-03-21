import React
// , { useState } 
from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
        }
        // [1-3-3] 그 내부의 graph-box라는 클래스 선택자
        .graph-box{
          width:100%;
          height:8rem;
          background-color:white;
          border-radius:5px;
        }
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

function HealthData(props) {
    const {handleIsModalOpen} = props;
    // const navigate = useNavigate();
    
    return (
        <Wrapper>
          <section className="section header">
            <h3>{props.username}(이)는 {props.cm}cm {props.kg}kg이에요</h3>
            <ModalBtn onClick={()=>handleIsModalOpen()}>오늘의 정보 입력</ModalBtn>
          </section>
          <section className="section main">
            <article className="status-box left">
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
            </article>
            <article className="status-box right">
              <h3>뾰롱</h3>
              <h5>나이, 키 기반 체중 상위 {'OO'}%</h5>
              <div className="graph-box"></div>
              <h5>오늘 먹은 칼로리 <span>{'OOOO'}kcal</span></h5>
              <div className="graph-box"></div>
              <h5>식단 기반,</h5>
              <h4>4주 뒤 예측 몸무게 <span>{'OO'}KG</span></h4>
              <div className="graph-box"></div>
            </article>
          </section>
        </Wrapper>
    );
}

export default HealthData;
