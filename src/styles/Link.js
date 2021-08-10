import styled, { css } from "styled-components";

const Link = styled.a`
  text-decoration: 0;
  padding: 5px;
  :hover {
    text-decoration: underline;
  }
  ${props =>
    props.github &&
    css`
      font-weight: 900;
      ::after {
        content: "✨";
      }
    `}
  ${props =>
    props.download &&
    css`
      ::after {
        content: " 💾";
      }
    `};
`;

export default Link;
