import React from "react";
import InputStyled from "../styles/Input";

const Input = ({ htmlFor, ...rest }) => {
  return (
    <>
      <label id={htmlFor}>{htmlFor}</label>
      <InputStyled id={htmlFor} {...rest} />
    </>
  );
};

export default Input;
