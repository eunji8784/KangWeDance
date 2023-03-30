import React from "react";
import styled from "styled-components";
import { H1, Footer } from "../common/ui/Semantics";
import { ModalBtn } from "../status/HealthData";
import {ModalWrapper} from "../common/ui/Modal"

const DirectionModalWrapper = styled(ModalWrapper)`
  justify-content: space-evenly;
  width: 60%;
  height: 60%;
  .ok {
    background-color: #84F02A;
    box-shadow: 0px 3px 10px rgba(240, 235, 84, 0.3);
    &:hover{
        box-shadow: 0px 3px 15px rgba(237, 240, 84, 0.6);
    }
  }
`; 

const DirectionInfo = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  text-align: center;
  word-break: keep-all;
  font-weight: 400;
`

function DirectionModal({handleIsModalOpen, isOpen, directionMessage}) {
  
  return (
      <DirectionModalWrapper isModalOpen={isOpen}>
          <DirectionInfo>
            <H1>
              {directionMessage || "양 팔을 좌우로 쭉 뻗어요~!"}
            </H1>
          </DirectionInfo>
          <Footer>
            <ModalBtn className="ok" onClick={()=>handleIsModalOpen()}>알겠습니다</ModalBtn>
          </Footer>
      </DirectionModalWrapper>
  );
}

export default DirectionModal;