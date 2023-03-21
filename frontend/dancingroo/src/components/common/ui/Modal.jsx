import React
// ,{useEffect, useState} 
from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {Wrapper, Header, Main, Article, Section, H1, H2,
  //  P, 
  Footer} from "./Semantics";

export const ModalWrapper = styled(Wrapper)`
    display:${({isModalOpen})=>isModalOpen? "flex":"none"};
    border:1px solid transparent;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    border-radius:10px;
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0;
    margin:auto;
    width: 70%;
    height: 85%;
    background-color: white;
    z-index: 2;
    letter-spacing:0.2rem;
    
`;

// ModalParent.jsx 확인

function Modal(props) {
  // [1]. <<모달을 관리할 상위 컴포넌트에서 갖고 있을 state와 함수 (복붙해서 쓰시면 됩니다.)>>
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const handleIsModalOpen = ()=>{
  //     setIsModalOpen((prev)=>!prev)
  // }
  // [2]. props로 handleIsModalOpen함수와, isModalOpen이라고 작성한 state를 넘겨준 뒤 언팩해서 사용합니다.
  const {handleIsModalOpen, isOpen} = props

  // 아래는 시맨틱 태그를 활용해 컴포넌트를 작성하는 예시입니다.
  return (
      <ModalWrapper isModalOpen={isOpen}>
          <Header>
              <H1>모달 헤더</H1>
          </Header>
          <Main>
              <H2>메인은 여기</H2>
              <Section>
                <h3>섹션</h3>
                <Article>
                  <h4>아티클 1</h4>
                </Article>
                <Article>
                  <h4>아티클 2</h4>
                </Article>
              </Section>
          </Main>
          <Footer>
            <H2>푸터는 여기</H2>
            <button onClick={()=>handleIsModalOpen()}>모달 닫기</button>
          </Footer>
      </ModalWrapper>
  );
}

export default Modal;