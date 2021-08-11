import { useEffect, useRef } from "react";
/**
 *
 * @param {any} val - data can be any type, but if it's an object, it should be ideally memoized
 * @param {any} deps - if deps is undefined, so nothing is passed, then the state value (val) is the deps value
 * but if it's a value or a function, then the custom deps parameter will be the deps value for useEffect
 * @returns value of the previous render. ref updates will not cause a re-render unlike state
 */
const usePrevious = (val, deps, checkFor) => {
  //gives greater control to depsValue
  const depsValues =
    typeof deps === "function" ? deps(val) : deps === undefined ? val : deps;

  const ref = useRef(null);
  useEffect(() => {
    //this is important for the customized deps value, if the depsValue is strictly equal to checkFor
    //then we do NOT want the ref to update
    if (depsValues === checkFor) return;
    ref.current = val;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depsValues, ref]);

  return ref.current;
};

export default usePrevious;
