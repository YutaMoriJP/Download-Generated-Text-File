import React from "react";
import Wrapper from "../styles/Button";

const Button = ({ children, ...rest }) => {
  return <Wrapper {...rest}>{children}</Wrapper>;
};

export default Button;
