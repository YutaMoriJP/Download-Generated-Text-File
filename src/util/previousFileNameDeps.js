/**
 *
 * @param {any} value - state stored in ref
 * @returns - value is returned if it's not an empty string
 * @description in <Form/> input fields are all reset to an empty string value
 * and this will cause usePrevious to be called and assign the previous file name to an empty string
 * but doing this will lose the purpose of storing the previous value
 * we want to compare the new file to the old file name
 * but if old file name is always an empty string, then the point of usePrevious is lost
 * This utility function checks if value is an empty string if true then a string value with false is returned
 * in usePrevious, the useEffect checks if the value is a string false value
 * if true, then useEffect is returned without re-assigning the ref value
 */
const previousFileNameDeps = value => {
  return value !== "" ? value : "false";
};

export default previousFileNameDeps;
