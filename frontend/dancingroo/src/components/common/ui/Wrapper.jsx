import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: ${props => props.backgroundColor || '#FFFFFF'};
  color: ${props => props.textColor || '#333333'};
  padding: 20px;
  border: 1px solid #CCCCCC;
  max-width: ${props => props.maxWidth || '100%'};  // 반응형 고려해 max-width설정
`;

function Page(props) {
  return (
    <Wrapper
      backgroundColor={props.backgroundColor}
      textColor={props.textColor}
      maxWidth={props.maxWidth}
    >
      {/* Your page content */}
    </Wrapper>
  );
}