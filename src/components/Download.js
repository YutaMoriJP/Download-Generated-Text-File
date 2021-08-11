import { useEffect, useReducer } from "react";
import Link from "../styles/Link";

const layzLoad = state => state;

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

/**
 *
 * @param {string | object} url - it can either be a blob object that can be converted to an object URL with URL.createObjectURL, or the URL of the resource that needs to be downloaded
 * @param {string} download - the desired file name. If nothing is passed, then the default value 'file' will be used
 * @param {function} onOpen - state setter function that updates the open state to true, which opens up a notification message like 'Ready to download'
 * onOpen is called after object URL is created in useEffect
 * @returns {element} download UI is rendered by <Download/>
 */

const Download = ({ url = "", download = "file.txt", onOpen }) => {
  console.log("donwload renders");
  const [{ status, error, href }, dispatch] = useReducer(
    reducer,
    {
      status: "idle",
      error: null,
      href: "",
    },
    layzLoad
  );
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
          dispatch({ type: "pending" });
          const res = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type":
                "application/json, image/*, text/*, charset=utf-8",
              Authorization: "basic",
            },
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
      {status === "pending" && <p>loading...</p>}
      {status === "rejected" && (
        <p>{error.message || "Something went wrong"}</p>
      )}
      {status === "resolved" && (
        <Link
          href={href}
          download={download || "file"}
          onClick={handleClick}
          className="theme"
        >
          Download - {download || "file"}
        </Link>
      )}
    </>
  );
};

export default Download;
