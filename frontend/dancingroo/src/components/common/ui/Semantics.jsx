import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  *{
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PinkButton = styled.button`
  height: 2rem;
  /* width: 4rem; */
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: #F05475;
  border: none;
  border-radius: 0.5rem;
  padding: 0 1em;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
`;


export const Header = styled.header`
  width:100%;
`;

export const Main = styled.main`
  border:1px solid red;
  flex-direction:column;
  width:80%;
  height:80%;
`;

export const Article = styled.article`
  border:1px solid green;
  width:60%;
  height:80%;
`;

export const Section = styled.section`
  border:1px solid blue;
  width:80%;
  height:80%;
`;

export const H1 = styled.h1`
  font-size: 2rem;
`;

export const H2 = styled.h2`
  font-size: 1.5rem;
`;

export const P = styled.p`
  font-size: 1.3rem;
  font-weight:bold;
  letter-spacing:0.5rem;
`;

export const Footer = styled.footer`
  width:100%;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

export default {
  Wrapper,
  PinkButton,
  Header,
  Main,
  Article,
  Section,
  H1,
  H2,
  P,
  Footer
};
