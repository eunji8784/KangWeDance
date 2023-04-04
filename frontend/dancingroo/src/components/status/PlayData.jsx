import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ModalBtn } from "./HealthData";
import PlayCalendar from "./PlayCalendar";
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
      min-width:50rem;
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
      max-height: 28rem;
      }
      // [1-3] section 자식의 모든 article태그선택자
      &>article{
        border-radius:10px;
        background-color:#FEECF0;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        height:100%;
        padding-bottom:1%;
        padding-left:1rem;
        padding-right:1rem;
        // [1-3-1] 그 내부의 left라는 클래스 선택자
        &.left{
          width:48%;
        }
        // [1-3-2] 그 내부의 right라는 클래스 선택자
        &.right{
          width:48%;
          overflow-y:scroll;
        }
        // [1-3-3] 그 내부의 graph-box라는 클래스 선택자
        .calendar-box{
          display:flex;
          flex-direction: column;
          justify-content:center;
          align-items: center;
          margin: 0;
          &>span{
            display:flex;
            font-size:0.8rem;
            margin-bottom:1rem;
            margin-top:0.3rem;
          }
        }

        .text-box{
          width: 100%;
          display:flex;
          flex-wrap: wrap;
          justify-content:center;
          align-items: center;
          font-size: 1.1rem;
          margin-top: 0.2rem;
        }

        .text-box-bold{
          width: 100%;
          display:flex;
          flex-wrap: wrap;
          justify-content:center;
          align-items: center;
          font-size: 1.2rem;
          margin-top: 0.1rem;
          color: #F05475;
          font-weight: 600;
        }
      }
    }
`;

const Table = styled.table`
  width: 100%;
  text-align:center;
  border-collapse: collapse;
  border-radius:0.5rem;
  background-color: white;
  th, td {
    padding: 0.5rem;
  }
  thead{
    background-color:#F05475;
    color: white;
  }
  margin-bottom: 1rem;
`;

const NotReco = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
`;

function PlayData({handleIsModalOpen}) {
  /* eslint-disable */
  const selected = useSelector(state=>state.userState.select)
  const selectedChild = useSelector(state=>state.userState.children[selected||0]) 
  const [selectedDay, setSelectedDay] = useState()
  const [selectedMonth, setSelecteMonth] = useState()
  const [selectedCalTotal, setSelectedCalTotal] = useState(0)
  const [playRecord, setPlayRecord] = useState([])
  const [playMonthCnt, setPlayMonthCnt] = useState(0)
  const [playCalTotal, setPlayCalTotal] = useState(0)
  const [palyDay, setPalyDay] = useState([]);
  const [newYear, setNewYear] = useState(false)


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
    if (palyRecoApi.data) {
      var arr = [];
      var cal = 0;
      for (var i = 0; i < palyRecoApi.data.data.length; i++) {
            if(selectedChild.childIdx === palyRecoApi.data.data[i].childIdx){
                arr.push(palyRecoApi.data.data[i]);
                cal = cal + palyRecoApi.data.data[i].burnedCalories
            }
      }
      setSelectedCalTotal(cal)
      setPlayRecord(arr) 
    }
  }, [palyRecoApi.data, selectedChild.childIdx])

  // 달 플레이 기록 불러오가
  const palyTotalRecoApi = useApi()
  useEffect(()=>{
      var month = ""
      const date = new Date();
      const year = date.getFullYear();

      if(selectedDay){
        var words = selectedDay.split(' ');
        const year2 = words[0].slice(0, 4);
        month = words[1].slice(0, -1).slice(-2);
        if(year == year2){
          setNewYear(false);
        }else {
          setNewYear(true);
        }
      } else {
        month = date.getMonth() + 1;
        setNewYear(false);
      }

      setSelecteMonth(month)

      palyTotalRecoApi.fetchApi('GET', `/status/month-play-record?childIdx=${selectedChild.childIdx}&month=${month}`)

  }, [ selectedDay, selectedChild.childIdx])

  //달 플레이 기록 활용하기
  useEffect(()=>{
    if(palyTotalRecoApi.data){
      setPlayMonthCnt(palyTotalRecoApi.data.data.length)
      var arr = [];
      var date = '';
      var cal = 0;
      for (var i = 0; i < palyTotalRecoApi.data.data.length; i++) {
          if(date != palyTotalRecoApi.data.data[i].recordDate.substr(0, 10)){
              arr.push(palyTotalRecoApi.data.data[i].recordDate.substr(0, 10));
              date = palyTotalRecoApi.data.data[i].recordDate.substr(0, 10);
            } 
            cal = cal +  palyTotalRecoApi.data.data[i].burnedCalories  
        }
      setPlayCalTotal(cal)
      setPalyDay(arr) 
    }
  }, [palyTotalRecoApi.data])


    return (
        <Wrapper>
            <section className="section header">
                <h3>{selectedChild.nickname}<span>의 </span> 운동 기록</h3>
                <ModalBtn onClick={()=>handleIsModalOpen()}>오늘의 정보 입력</ModalBtn>
            </section>
            <section className="section main">
                <article className="status-box left">
                    <div className="calendar-box">
                        <PlayCalendar palyDay={palyDay} handleSelectedDay={handleSelectedDay}/>
                        <span> 월 통계를 보고 싶다면, 날짜를 클릭해주세요!</span>
                    </div>
                    {newYear ?
                    null :
                    <>
                      <div className='text-box-bold'>올해 {selectedMonth}월</div>
                      <div className='text-box'>총 플레이 횟수 {playMonthCnt},</div>
                      <div className='text-box'>총 소모 칼로리 {playCalTotal} cal</div>
                    </>
                    }
                </article>
                <article className="status-box right">
                    <h3>{selectedDay}</h3>
                    { playRecord.length ?
                    <>
                      <Table>
                          <thead>
                              <tr>
                                  <th>타이틀</th>
                                  <th>점수</th>
                                  <th>소모 칼로리</th>
                              </tr>
                          </thead>
                          <tbody>
                              {playRecord.map((play, index) => {
                              return  <tr key={index}>
                                  <td>{play.title}</td>
                                  <td>{play.score}</td>
                                  <td>{play.burnedCalories}</td>
                                </tr>
                              })}
                          </tbody>
                      </Table>
                      <span className='text-box'> 일일 소모 칼로리 {selectedCalTotal}(cal)</span>
                    </>
                    :
                    <NotReco> 기록이 없어요! </NotReco>
                    }
                </article>
            </section>
        </Wrapper>
    );
}

export default PlayData;
