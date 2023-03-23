import React from "react"
import styled from "styled-components"
import greatImg from "../../assets/images/great.png"
import goodImg from "../../assets/images/good.png"
import cheerupImg from "../../assets/images/cheerup.png"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  img {
  width: 25%;
  margin-top: 1rem;
  height: auto;
  }
  .popup {
    animation: pop-up 1s;
    @keyframes pop-up {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.4);
      }
      60% {
        transform: scale(1.1);
      }
      70% {
        transform: scale(1.2);
      }
      80% {
        transform: scale(1);
      }
      90% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`
function Feedback({showGreat, showGood, showCheerUp}) {
  return (
    <Wrapper>
      {showGreat && <img className="popup" src={greatImg} alt="great"/>}
      {showGood && <img className="popup" src={goodImg} alt="good"/>}
      {showCheerUp && <img className="popup" src={cheerupImg} alt="cheerup"/>}
    </Wrapper>
  )
}

export default Feedback
