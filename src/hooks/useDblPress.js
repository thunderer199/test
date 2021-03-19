import { useEffect, useRef, useCallback } from "react";

const TIMEOUT = 300;
export default function useDblPress(ref, onDblPress) {
  const wasClicked = useRef(false);
  const dblHandler = useCallback(() => {
    onDblPress?.();
  }, [onDblPress]);

  const dblTap = useCallback(() => {
    if (wasClicked.current) {
      dblHandler();
      return;
    }
    wasClicked.current = true;

    // TODO: clear on destroy
    setTimeout(() => {
      wasClicked.current = false;
    }, TIMEOUT);
  }, [dblHandler]);

  useEffect(() => {
    const el = ref.current;
    el.addEventListener("dblclick", dblHandler);
    el.addEventListener("touchend", dblTap);

    return () => {
      el.removeEventListener("dblclick", dblHandler);
      el.removeEventListener("touchend", dblTap);
    };
  }, [ref, onDblPress, dblHandler, dblTap]);
}
