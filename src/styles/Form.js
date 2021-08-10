import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  width: 80%;
  margin: var(--size) auto;
  max-width: 500px;
  > * {
    margin: var(--size);
  }
`;

export default Form;
