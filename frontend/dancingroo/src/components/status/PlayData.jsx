import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PlayCalendar from "../common/ui/PlayCalendar";
import { ModalBtn } from "./HealthData";

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
        padding-left:1rem;
        padding-right:1rem;
        // [1-3-1] 그 내부의 left라는 클래스 선택자
        &.left{
          width:48%;
        }
        // [1-3-2] 그 내부의 right라는 클래스 선택자
        &.right{
          width:48%;
        }
        // [1-3-3] 그 내부의 graph-box라는 클래스 선택자
        .calendar-box{
          display:flex;
          /* border:1px solid black; */
          flex-wrap: wrap;
          justify-content:center;
        }
      }
    }
`;
const Table = styled.table`
  text-align:center;
  border-collapse: collapse;
  width: 100%;
  th, td {
    padding: 0.5rem;
  }
  thead{
    border-bottom:3px solid black;
  }
`;

function PlayData({handleIsModalOpen, username}) {
    const [selectedDay, setSelectedDay] = useState()
    const handleSelectedDay = (date)=>{
        setSelectedDay(date)
    }
    return (
        <Wrapper>
            <section className="section header">
                <h3>{username}(이)는 이번 달 총 OO회 운동했어요</h3>
                <ModalBtn onClick={()=>handleIsModalOpen()}>오늘의 정보 입력</ModalBtn>
            </section>
            <section className="section main">
                <article className="status-box left">
                    <h3>OO이 운동 달력</h3>
                    <div className="calendar-box">
                        <PlayCalendar handleSelectedDay={handleSelectedDay}/>
                    </div>
                </article>
                <article className="status-box right">
                    <h3>{selectedDay}</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>플레이 시간</th>
                                <th>타이틀</th>
                                <th>점수</th>
                                <th>소모 칼로리</th>
                            </tr>
                        </thead>
                        <tbody>
                    {/* 여기서 tr을 map돌리면 될듯 */}
                            <tr>
                                <td>17:5</td>
                                <td>상어송</td>
                                <td>90</td>
                                <td>1030kcal</td>
                            </tr>
                            <tr>
                                <td>17:25</td>
                                <td>균형잡기</td>
                                <td>98</td>
                                <td>800kcal</td>
                            </tr>
                        </tbody>
                    </Table>
                </article>
            </section>
        </Wrapper>
    );
}

export default PlayData;
