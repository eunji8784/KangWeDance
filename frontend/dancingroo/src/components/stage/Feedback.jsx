import React from "react"
import styled from "styled-components"
import greatGif from "../../assets/images/Great.gif"
import goodGif from "../../assets/images/Good.gif"
import cheerupGif from "../../assets/images/CheerUp.gif"
import readyGoGif from "../../assets/images/ReadyGo.gif"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  z-index:99;
  .popup {
    width: 40%;
    margin-top: -6rem;
    height: auto;
  }
  .readygo {
    position: absolute;
    width: 50%;
  }
`
function Feedback({showGreat, showGood, showCheerUp, showReadyGo}) {
  return (
    <Wrapper>
      {showGreat && <img className="popup" src={greatGif} alt="great"/>}
      {showGood && <img className="popup" src={goodGif} alt="good"/>}
      {showCheerUp && <img className="popup" src={cheerupGif} alt="cheerup"/>}
      {showReadyGo && <img className="readygo" src={readyGoGif} alt="readygo"/>
      }
    </Wrapper>
  )
}

export default Feedback
