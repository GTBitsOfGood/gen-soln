import { useState, useEffect, useRef, useCallback } from "react";

const ERROR_TIMEOUT = 1e4; // 10 seconds, doesn't time the user to allow or deny the request but times the getCurrentPosition function itself
const usePosition = (disabled: boolean) => {
  const [position, setPosition] = useState<Position>();
  const [error, setError] = useState<string>();
  const watchID = useRef<number | null>(null);

  const clearWatchCallback = () => {
    if (watchID.current != null) {
      navigator.geolocation.clearWatch(watchID.current);
    }
    watchID.current = null;
  };

  // We don't really want to watch changes to the user's position, so clear the watch whenever you can.
  // We would have preferred to use navigator.geolocation.getCurrentPosition() instead, however it doesn't offer a way to clean-up
  // callbacks in the useEffect and thus can trigger state updates on component unmount.
  const onChange = useCallback((position: Position) => {
    setPosition(position);
    clearWatchCallback();
  }, []);

  const onError = useCallback((error: PositionError) => {
    setError(error.message);
    clearWatchCallback();
  }, []);

  useEffect(() => {
    if (!disabled && watchID.current == null) {
      if (!navigator || !navigator.geolocation) {
        setError("Geolocation is not supported");
        return;
      }

      watchID.current = navigator.geolocation.watchPosition(onChange, onError, {
        timeout: ERROR_TIMEOUT
      });

      return clearWatchCallback;
    }
  }, [disabled, onChange, onError]);

  return { position, hasError: error != null };
};

export default usePosition;
