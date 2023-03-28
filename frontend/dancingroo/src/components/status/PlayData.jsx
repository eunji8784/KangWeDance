import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ModalBtn } from "./HealthData";
import PlayCalendar from "../common/ui/PlayCalendar";
import useApi from "../../hooks/auth/useApi";

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
  const selected = useSelector(state=>state.userState.select)
  const selectedChild = useSelector(state=>state.userState.children[selected||0]) 
  const [selectedDay, setSelectedDay] = useState()
  const [playRecord, setPlayRecord] = useState([]);
  
  const handleSelectedDay = (date)=>{
    setSelectedDay(date)
  }

  const palyRecoApi = useApi()

  //선택한 날짜에 따라 데이터 불러오가
  useEffect(()=>{
    var dateStr = ""
    if(selectedDay){
      var words = selectedDay.split(' ');
      const year = words[0].slice(0, 4);
      const month = ('0' + words[1].slice(0, -1)).slice(-2);
      const day = ('0' + words[2].slice(0, -1)).slice(-2);
      dateStr = `${year}-${month}-${day}`;
    } else {
      const date = new Date();
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      dateStr = `${year}-${month}-${day}`;
    }

    palyRecoApi.fetchApi('GET', `/status/play-record/${dateStr}`)

  },[selectedDay])

  //선택 날짜 데이터 중 현재 아이에 맞는 것만 넣기
  useEffect(()=>{
    // console.log(palyRecoApi.data.data.length)
    if (palyRecoApi.data) {
      var arr = [];
      for (var i = 0; i < palyRecoApi.data.data.length; i++) {
            if(selectedChild.childIdx === palyRecoApi.data.data[i].childIdx){
                arr.push(palyRecoApi.data.data[i]);
            }
      }
      setPlayRecord(arr) 
    }
  }, [palyRecoApi.data, selectedChild.childIdx])


    return (
        <Wrapper>
            <section className="section header">
                <h3>{selectedChild.nickname}<span>(이)는</span> 이번 달 총 OO<span>회</span> 운동했어요</h3>
                <ModalBtn onClick={()=>handleIsModalOpen()}>오늘의 정보 입력</ModalBtn>
            </section>
            <section className="section main">
                <article className="status-box left">
                    <h3>{selectedChild.nickname} 운동 달력</h3>
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
                          {
                            playRecord.map((play, index) => {
                            return  <tr key={index}>
                                <td>{play.recordDate.substr(12,18)}</td>
                                <td>{play.title}</td>
                                <td>{play.score}</td>
                                <td>{play.burnedCalories}</td>
                              </tr>
                            })
                          }
                        </tbody>
                    </Table>
                </article>
            </section>
        </Wrapper>
    );
}

export default PlayData;
