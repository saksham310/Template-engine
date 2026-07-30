"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

export default function CurrentYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(subscribe, getYear, () => fallback);
  return <>{year}</>;
}
