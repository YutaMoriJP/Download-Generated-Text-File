import React from "react";
import Text from "../styles/Error";
const Error = ({ children, ...rest }) => {
  return <Text {...rest}>{children}</Text>;
};

export default Error;
