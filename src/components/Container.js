import React from "react";
import Wrapper from "../styles/Container";
import Global from "../styles/Globals";

const Container = ({ children, ...rest }) => {
  return (
    <Wrapper id="main-container" {...rest}>
      {children}
    </Wrapper>
  );
};

export { Global };
export default Container;
