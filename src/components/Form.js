import React, { useState } from "react";
import Button from "../components/Button";
import useInput from "../useHooks/useInput";
import Download from "./Download";
import Input from "./Input";
import Formstyled from "../styles/Form";
import Error from "./Error";
import useOpen from "../useHooks/useOpen";
import Message from "./Message";

const Form = () => {
  const [nameInput, resetName] = useInput("");
  const [usernameInput, resetUsername] = useInput("");
  const [filenameInput, resetFilename] = useInput("");
  const [download, setDownload] = useState("file");

  const { open, onOpen, onClose } = useOpen(false);

  const [status, setStatus] = useState("idle");
  const [blob, setBlob] = useState(null);

  const disabled =
    !nameInput.value.replace(/\s/g, "") ||
    !usernameInput.value.replace(/\s/g, "");

  const reset = React.useCallback(() => {
    resetName();
    resetUsername();
    resetFilename();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSubmit = event => {
    event.preventDefault();
    const { value: name } = nameInput;
    const { value: username } = usernameInput;
    const { value: file } = filenameInput;
    setDownload(file.replace(/\s/g, ""));
    setBlob(
      new Blob([JSON.stringify({ name, username }, null, 2)], {
        type: "text/plain",
      })
    );
    setStatus("resolved");
  };
  React.useEffect(() => {
    reset();
  }, [status, reset]);
  return (
    <>
      <Error>
        Fill in both first and last name fields, and clicking 'submit' generates
        a download button to the text file with the created content. The
        filename field is optional.
      </Error>
      <Formstyled onSubmit={handleSubmit}>
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
      {open && (
        <Message onClose={onClose} ms={1000}>
          Content is ready to be downloaded!
        </Message>
      )}
      {status === "resolved" && (
        <Download url={blob} onOpen={onOpen} download={download} />
      )}
    </>
  );
};

export default Form;
