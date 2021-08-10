import { useEffect, useReducer } from "react";
import Link from "../styles/Link";

const reducer = (state, action) => {
  switch (action.type) {
    case "pending":
      return { ...state, status: "pending" };
    case "resolved":
      return { ...state, status: "resolved", href: action.payload.href };
    case "rejected":
      return { ...state, status: "rejected", error: action.payload.error };
    default:
      throw new Error("invalid case");
  }
};

const Download = ({ url = "", download = "file", onOpen }) => {
  const [{ status, error, href }, dispatch] = useReducer(reducer, {
    status: "idle",
    error: null,
    href: "",
  });
  const handleClick = () => {
    setTimeout(() => {
      URL.revokeObjectURL(href);
    }, 500);
  };

  useEffect(() => {
    let didCancel = false;
    if (!url) return;
    let controller = new AbortController();
    const signal = controller.signal;
    const downloadAsync = async () => {
      try {
        if (typeof url === "object") {
          const href = URL.createObjectURL(url);
          if (!didCancel) {
            dispatch({ type: "resolved", payload: { href } });
          }
        } else {
          const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json, image/*, text/*" },
            mode: "cors",
            cache: "default",
          });
          if (!res.ok && !didCancel) {
            dispatch({
              type: "rejected",
              payload: {
                error: {
                  message: `An error occured. Status code is ${res.status}`,
                },
              },
            });
            return;
          }
          const blob = await res.blob();
          const href = URL.createObjectURL(blob);
          if (!didCancel) {
            dispatch({ type: "resolved", payload: { href } });
          }
        }
        onOpen();
      } catch (error) {
        if (didCancel || signal.sborted) {
          return;
        }
        if (!didCancel) {
          dispatch({ type: "rejected", payload: { error } });
        }
      }
    };
    downloadAsync();
    return () => {
      didCancel = true;
      controller.abort();
    };
  }, [url, onOpen]);

  return (
    <>
      {status === "pending" && <p>pending...</p>}
      {status === "rejected" && (
        <p>{error.message || "Something went wrong"}</p>
      )}
      {status === "resolved" && (
        <Link href={href} download={download || "file"} onClick={handleClick}>
          DOWNLOAD - {download || "file"}.txt
        </Link>
      )}
    </>
  );
};

export default Download;
