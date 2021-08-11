import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Article = styled.article`
  background: ${props => props.bgColor || "#087f5b"};
  color: white;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 10px;
  display: flex;
  justify-content: center;
`;
//go to App.js to see how the Message component is used
/**
 * @param {function}onClose - state setter function that updates open state to false and unmounts this message component
 * @param {number}ms - controls when the callback passed to setTimeout is actually invoked, which means it controls how long the message is displayed before getting unmounted
 * @param {string} role - used for accessibly to communicate an error happened
 * @param {element | string} children - used to render some kind of message, can be as simple as a message or even a component
 * @param {string | element} - the message that is rendered
 */
const Message = ({ onClose, ms = 0, children, ...rest }) => {
  console.log(typeof children);
  const timerRef = React.useRef();
  React.useEffect(() => {
    timerRef.current = setTimeout(() => {
      onClose();
    }, ms);
    return () => {
      onClose();
      clearTimeout(timerRef.current);
    };
  }, [onClose, ms]);
  return <Article {...rest}>{children}</Article>;
};
Message.propTypes = {
  role: PropTypes.string,
  ms: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
};

export default Message;
