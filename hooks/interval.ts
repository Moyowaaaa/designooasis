import { useEffect, useRef, useState, useCallback } from "react";

function useCustomInterval(callback: () => void, duration: number) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const paused = useRef<boolean>(true);

  const step = useCallback(() => {
    if (paused.current) return;

    setCurrentTime((prevTime) => {
      const newTime = prevTime + 100;
      if (newTime >= duration) {
        callback();
        return 0;
      }
      return newTime;
    });

    timerId.current = setTimeout(step, 100);
  }, [callback, duration]);

  const play = useCallback(() => {
    if (paused.current) {
      paused.current = false;
      step();
    }
  }, [step]);

  const pause = useCallback(() => {
    if (timerId.current) clearTimeout(timerId.current);
    paused.current = true;
  }, []);

  const stop = useCallback(() => {
    if (timerId.current) clearTimeout(timerId.current);
    paused.current = true;
    setCurrentTime(0);
  }, []);

  useEffect(() => {
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  return { play, pause, stop, currentTime };
}

export default useCustomInterval;
