import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  > * {
    margin: var(--size);
  }
`;

export default Form;
