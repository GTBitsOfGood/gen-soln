import { useState, useEffect } from "react";

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

      navigator.geolocation.getCurrentPosition(onChange, onError);
    }
  }, [disabled]);

  return { position, error };
};
