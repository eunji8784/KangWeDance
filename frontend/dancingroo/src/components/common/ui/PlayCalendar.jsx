import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendar = styled(ReactCalendar)`
  &&&{
    border: 1px solid white;
    border-radius:10px;
    min-width:90%;
  }
`

function PlayCalendar(props) {
  const {handleSelectedDay} = props
  const [date, setDate] = useState(new Date());

  useEffect(()=>{
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('ko-KR', options); 
    handleSelectedDay(formattedDate)
  }, [date])
  
  const onChange = (date) => {
    setDate(date);
  }
  return (
    <>
      <Calendar
        onChange={onChange}
        value={date}
      />
    </>
  );
}

export default PlayCalendar;
