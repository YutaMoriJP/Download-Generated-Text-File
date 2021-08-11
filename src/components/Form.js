import React, { useState } from "react";
import Button from "../components/Button";
import useInput from "../useHooks/useInput";
import Download from "./Download";
import Input from "./Input";
import Formstyled from "../styles/Form";
import Describe from "./Describe";
import useOpen from "../useHooks/useOpen";
import Message from "./Message";
import Link from "../styles/Link";
import usePrevious from "../useHooks/usePreviousRender";
import compareBlob from "../util/compareBlob";

const Form = () => {
  //local state from either custom or build in hooks
  const [nameInput, resetName] = useInput("");
  const [usernameInput, resetUsername] = useInput("");
  const [filenameInput, resetFilename] = useInput("");
  const [download, setDownload] = useState("file.txt");
  const { open, onOpen, onClose } = useOpen(false);
  const [status, setStatus] = useState("idle");
  const [blob, setBlob] = useState(null);
  const [oldFileName, setOldFileName] = useState("");
  //deps value update for previousFilename
  //returns the previous value of argument - it's a ref and not a state
  const previousBlob = usePrevious(blob);
  const previousFileName = usePrevious(oldFileName);

  const disabled =
    !nameInput.value.replace(/\s/g, "") ||
    !usernameInput.value.replace(/\s/g, "");

  //utility function that resets input fields
  const reset = React.useCallback(() => {
    resetName();
    resetUsername();
    resetFilename();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //event handler function
  const handleSubmit = async event => {
    //listens to a form submit, so event.prevenDefault() blocks a page refresh
    event.preventDefault();
    //extract value from input.value
    const { value: name } = nameInput;
    const { value: username } = usernameInput;
    let { value: file } = filenameInput;

    //a new blob object is created
    const newBlob = new Blob([JSON.stringify({ name, username }, null, 2)], {
      type: "text/plain",
    });

    //adds property extension to old and new file names
    file = file.includes("txt") ? file : !file ? "file.txt" : file + ".txt";
    //this optimizes the component and prevents unnecessary renders
    const isSameBlob = await compareBlob(newBlob, previousBlob);

    if (isSameBlob && file === previousFileName) {
      //if neither blob's content has NOT changed, no state updates are required"
      return;
    }

    //state updates
    //setDownload sets the file name
    setDownload(file.replace(/\s/g, ""));
    setBlob(newBlob);
    //updates status to resolved, which renders <Download/>
    setStatus("resolved");
    setOldFileName(file);
  };

  //effect
  React.useEffect(() => {
    //after status updates (to resolved), reset is triggered
    reset();
  }, [status, reset, blob]);
  return (
    <>
      <Describe>
        Fill in both first and last name fields, and clicking 'submit' generates
        a download button to the text file with the created content. The content
        will be in JSON format. The file name field is optional.
        <Link
          github
          href="https://github.com/YutaMoriJP/Download-Generated-Text-File"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </Link>
      </Describe>

      <Formstyled onSubmit={handleSubmit} className="theme">
        <Input
          htmlFor="FIRST NAME"
          placeholder="*Enter first name"
          {...nameInput}
        />
        <Input
          htmlFor="LAST NAME"
          placeholder="*Enter last name"
          {...usernameInput}
        />
        <Input
          htmlFor="FILENAME"
          placeholder="Enter file name"
          {...filenameInput}
        />
        <Button className="basic" type="submit" disabled={disabled}>
          CREATE FILE
        </Button>
      </Formstyled>
      {status === "resolved" && (
        <Download url={blob} onOpen={onOpen} download={download} />
      )}
      {open && (
        <Message onClose={onClose} ms={1000}>
          Content is ready to be downloaded!
        </Message>
      )}
    </>
  );
};

export default Form;
