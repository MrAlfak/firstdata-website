"use client";

import { useEffect, useRef } from "react";
import { useT } from "@/i18n/LangProvider";

export function useFaRef() {
  const { fa } = useT();
  const faRef = useRef(fa);

  useEffect(() => {
    faRef.current = fa;
  }, [fa]);

  return faRef;
}
