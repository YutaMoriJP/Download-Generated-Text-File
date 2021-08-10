import styled, { css } from "styled-components";

const Button = styled.button`
  padding: 15px 20px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 0.5s ease-in-out;
  color: inherit;
  font-weight: 900;

  :active {
    transform: scale(0.9);
  }
  ${props =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
  ${props =>
    props.corner &&
    css`
      position: absolute;
      right: 6px;
      top: 2px;
      font-size: 18px;
    `}
`;

export default Button;
