import styled, { css } from "styled-components";

const Link = styled.a`
  text-decoration: 0;
  padding: 5px;
  font-weight: 500;
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
      border-radius: 5px;
      padding: 10px;
      :active {
        transform: scale(0.9);
      }
      ::after {
        content: " 💾";
      }
    `};
`;

export default Link;
