import React, { useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import moment from 'moment'; 
import 'react-calendar/dist/Calendar.css';
import '../../assets/css/calendar.css'

function PlayCalendar({handleSelectedDay, palyDay}) {
  const [value, onChange] = useState(new Date());

  useEffect(()=>{
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = value.toLocaleDateString('ko-KR', options); 
    handleSelectedDay(formattedDate)
  }, [value, handleSelectedDay])
  
  return (
    <>
      <ReactCalendar
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format("DD")}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        navigationLabel={null}
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        value={value}
        className="calendar"
        tileContent={({ date, view }) => {
          if (palyDay.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            return (
              <>
                <div>
                  <div className="dot"></div>
                </div>
              </>
            );
          }
        }}
      />
    </>
  );
}

export default PlayCalendar;
