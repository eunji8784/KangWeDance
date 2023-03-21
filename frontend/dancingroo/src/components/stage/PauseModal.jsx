import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Header, Main, Article, Section, H1, H2, Footer} from "../common/ui/Semantics";
import { ModalBtn } from "../status/HealthData";
import {ModalWrapper} from "../common/ui/Modal"

const PauseModalWrapper = styled(ModalWrapper)`
  .gray {
    background-color: #FFD732;
    box-shadow: 0px 3px 10px rgba(240, 235, 84, 0.3);
    &:hover{
        box-shadow: 0px 3px 15px rgba(237, 240, 84, 0.6);
    }
  }
`; 
const ModMain = styled(Main)`
  border:1px solid red;
  flex-direction:column;
  width:80%;
  height:80%;
`
const ModSection = styled(Section)`
  border:1px solid blue;
  width:80%;
  height:80%;
`
const ModArticle = styled(Article)`
  border:1px solid green;
  width:60%;
  height:80%;
`

function PauseModal(props) {
  const {handleIsModalOpen, isOpen} = props
  const navigate = useNavigate();
  return (
      <PauseModalWrapper isModalOpen={isOpen}>
          <Header>
              <H1>그만하시겠습니까?</H1>
          </Header>
          <ModMain>
              <H2>메인은 여기</H2>
              <ModSection>
                <h3>섹션</h3>
                <ModArticle>
                  <h4>아티클 1</h4>
                </ModArticle>
                <ModArticle>
                  <h4>아티클 2</h4>
                </ModArticle>
              </ModSection>
          </ModMain>
          <Footer>
            <ModalBtn className="gray" onClick={()=>handleIsModalOpen()}>계속하기</ModalBtn>
            <ModalBtn onClick={()=>navigate('/play')}>그만하기</ModalBtn>
          </Footer>
      </PauseModalWrapper>
  );
}

export default PauseModal;