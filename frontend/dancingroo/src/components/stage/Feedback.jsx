import React from "react"
import styled from "styled-components"
import readyImg from "../../assets/images/ready.png"
import goImg from "../../assets/images/go.png"
import greatGif from "../../assets/images/Great.gif"
import goodGif from "../../assets/images/Good.gif"
import cheerupGif from "../../assets/images/CheerUp.gif"

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
    /* animation: pop-up 1s;
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
    } */
  }
  .ready {
    position: absolute;
    margin-top: 4rem;
    width: 35%;
    animation: ready-animation 2s ease-in-out forwards;
  }

  @keyframes ready-animation {
    0% {
      opacity: 0.5;
      transform: translateY(-30%);
    }
    30% {
      opacity: 1;
      transform: translateY(0%)
    }
    80% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.1);
    }
  }
  .go {
    position: absolute;
    margin-top: 3.5rem;
    width: 40%;
    animation: go-animation 1s ease-in-out both;
    animation-delay: 2s;
  }
  @keyframes go-animation {
    0% {
      opacity: 0;
      transform: scale(1.5);
    }
    20% {
      opacity: 1;
      transform: scale(1);
    }
    40% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }
 
`
function Feedback({showGreat, showGood, showCheerUp, showReadyGo}) {
  return (
    <Wrapper>
      {showGreat && <img className="popup" src={greatGif} alt="great"/>}
      {showGood && <img className="popup" src={goodGif} alt="good"/>}
      {showCheerUp && <img className="popup" src={cheerupGif} alt="cheerup"/>}
      {showReadyGo && 
        <>
          <img className="ready" src={readyImg} alt="ready"/>
          <img className="go" src={goImg} alt="go"/>
        </>
      }
    </Wrapper>
  )
}

export default Feedback
