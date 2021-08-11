import styled from "styled-components";

const Box = styled.article`
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  > * {
    margin: 5px;
    width: 80%;
    max-width: 400px;
  }
`;

export default Box;
