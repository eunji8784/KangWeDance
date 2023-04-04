import React from "react";
import styled from "styled-components";
import { ModalBtn } from "../status/HealthData";
import {ModalWrapper} from "../common/ui/Modal"

import modalImage from "../../assets/images/direcModal.png"

const DirectionModalWrapper = styled(ModalWrapper)`
  justify-content: space-evenly;
  width: 60%;
  min-width: 36rem;
  height: 40%;
  background-image:url(${modalImage});
  background-size: cover;
  border: solid 0.05rem #595959;
  .ok {
    font-size: 1.2rem;
    font-weight: 600;
    font-family: 'GmarketSansMedium';
    background-color: #45e33c;
    box-shadow: 0px 3px 10px rgba(240, 235, 84, 0.3);
    &:hover{
        box-shadow: 0px 3px 15px rgba(89, 255, 0, 0.6);
    }
  }
`; 

const DirectionInfo = styled.div`
  width: 80%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
`

const Text = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: 'GmarketSansMedium';
  margin-top: 0.8rem;
`

function DirectionModal({handleIsModalOpen, isOpen, directionMessage}) {
  const DirectionMessage = () => {
    const messages = directionMessage.split(':').filter(message=>message)
    return messages.map(message=> <Text key={message}>{ `${message}` }</Text>)
  }
  return (
      <DirectionModalWrapper isModalOpen={isOpen}>
          <DirectionInfo>
            <DirectionMessage/>
          </DirectionInfo>
          <ModalBtn className="ok" onClick={()=>handleIsModalOpen()}>Go!</ModalBtn>
      </DirectionModalWrapper>
  );
}

export default DirectionModal;