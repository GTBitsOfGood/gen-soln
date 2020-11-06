import { useState, useEffect } from "react";

const ERROR_TIMEOUT = 1e4; // 10 seconds, doesn't time the user to allow or deny the request but times the getCurrentPosition function itself
export const usePosition = (disabled: boolean) => {
  const [position, setPosition] = useState<Position>();
  const [error, setError] = useState<string>();

  const onChange = (position: Position) => {
    setPosition(position);
  };

  const onError = (error: PositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!disabled) {
      if (!navigator || !navigator.geolocation) {
        setError("Geolocation is not supported");
        return;
      }

      navigator.geolocation.getCurrentPosition(onChange, onError, {
        timeout: ERROR_TIMEOUT
      });
    }
  }, [disabled]);

  return { position, hasError: error != null };
};
