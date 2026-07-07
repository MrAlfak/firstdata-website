"use client";

import OfflineWatcher from "./OfflineWatcher";
import ChunkErrorHandler from "./ChunkErrorHandler";

export default function SystemWatchers() {
  return (
    <>
      <OfflineWatcher />
      <ChunkErrorHandler />
    </>
  );
}
