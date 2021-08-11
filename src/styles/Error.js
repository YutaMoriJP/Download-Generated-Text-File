import styled from "styled-components";

const Error = styled.p`
  font-size: 14px;
  max-width: 500px;
  width: 80%;
  margin: auto;
  padding: var(--size);
  ::before {
    content: "📖 ";
  }
`;

export default Error;
