import { useState } from "react";

const useInput = ({ initial = "" }) => {
  const [value, setState] = useState(initial);
  const onChange = event => setState(event.target.value);
  return [{ value, onChange }, () => setState(initial)];
};

export default useInput;
