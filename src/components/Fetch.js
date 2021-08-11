import React from "react";
import Button from "./Button";
import Download from "./Download";
import useOpen from "../useHooks/useOpen";
import Message from "./Message";
import Describe from "./Describe";
import Box from "../styles/BoxColumn";

const Fetch = () => {
  const [url, setUrl] = React.useState("");
  const { open, onOpen, onClose } = useOpen(false);

  const handleClick = () =>
    setUrl("https://jsonplaceholder.typicode.com/users/1");
  return (
    <>
      <Describe style={{ paddingTop: "45px " }}>
        You also have the option to download a user profile from the
        jsonplaceholder API. The Download component handles generated content
        from either user inputs or served data from an API.
      </Describe>
      <Box>
        <Button className="basic" onClick={handleClick}>
          Request data from jsonplaceholder
        </Button>
        {url && (
          <Download url={url} onOpen={onOpen} download="jsonplaceholder.txt" />
        )}
      </Box>

      {open && (
        <Message onClose={onClose} ms={1500}>
          Fetched content is ready to be downloaded
        </Message>
      )}
    </>
  );
};

export default Fetch;
