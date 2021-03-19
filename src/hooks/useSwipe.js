import { useEffect, useRef, useCallback } from "react";

export default function useSwipe(ref, onUp, onDown) {
  const startPos = useRef();

  const onStartHandlerTouch = useCallback((e) => {
    e.preventDefault();

    startPos.current = {
      x: e.targetTouches[0].pageX,
      y: e.targetTouches[0].pageY,
    };
  }, []);

  const onStartHandlerMouse = useCallback((e) => {
    e.preventDefault();

    startPos.current = {
      x: e.pageX,
      y: e.pageY,
    };
  }, []);
  const onEndHandler = useCallback((coords) => {
    if (coords) {
      // do not detect small swipe
      if (Math.abs(startPos.current.y - coords.pageY) < 10) {
        return;
      }

      if (startPos.current.y > coords.pageY) {
        onUp?.();
      } else {
        onDown?.();
      }
    }
  }, [onDown, onUp]);
  const onEndHandlerTouch = useCallback((e) => {
    onEndHandler(e.changedTouches?.[0] ?? null);
  }, [onEndHandler]);
  const onEndHandlerMouse = useCallback((e) => {
    onEndHandler({ pageX: e.pageX, pageY: e.pageY });
  }, [onEndHandler]);
  useEffect(() => {
    const el = ref.current;
    el.addEventListener("touchstart", onStartHandlerTouch);
    el.addEventListener("touchend", onEndHandlerTouch);
    el.addEventListener("mousedown", onStartHandlerMouse);
    el.addEventListener("mouseup", onEndHandlerMouse);

    return () => {
      el.removeEventListener("touchstart", onStartHandlerTouch);
      el.removeEventListener("touchend", onEndHandler);
      el.removeEventListener("mousedown", onStartHandlerMouse);
      el.removeEventListener("mouseup", onEndHandlerMouse);
    };
  }, [onEndHandler, onEndHandlerMouse, onEndHandlerTouch, onStartHandlerMouse, onStartHandlerTouch, ref]);
}
