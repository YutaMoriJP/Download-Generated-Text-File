import { useState, useCallback } from "react";

const useOpen = (initialState = false) => {
  const [open, setOpen] = useState(initialState);
  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  return { open, onOpen, onClose };
};

export default useOpen;
