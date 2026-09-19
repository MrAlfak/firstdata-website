"use client";

import { useEffect, useState } from "react";

type UseTypewriterOptions = {
  text: string;
  speed?: number;
  startDelay?: number;
};

type UseTypewriterReturn = {
  displayed: string;
  done: boolean;
};

/** Reveal `text` one character at a time after `startDelay`. */
export function useTypewriter({
  text,
  speed = 38,
  startDelay = 600,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [prevText, setPrevText] = useState(text);
  if (text !== prevText) {
    setPrevText(text);
    setDisplayed("");
    setDone(false);
  }

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const delayTimer = setTimeout(() => {
      let index = 0;
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(delayTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}
