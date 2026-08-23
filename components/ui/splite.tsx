"use client";

import { Component, Suspense, lazy, type ReactNode } from "react";
import type { Application } from "@splinetool/runtime";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
  /** Called once the Spline Application is ready (variables, objects, events). */
  onLoad?: (spline: Application) => void;
}

function SplineFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
      <span className="loader" aria-hidden />
    </div>
  );
}

function SplineUnavailable() {
  return (
    <div
      className="h-full w-full bg-gradient-to-br from-neutral-900 via-blue-950/40 to-black"
      aria-hidden
    />
  );
}

type BoundaryState = { failed: boolean };

class SplineErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  BoundaryState
> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.warn("[SplineScene] failed to load; degrading gracefully", error.message);
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

/** Lazy Spline viewer — filename keeps the common “splite” typo from the demo kit. */
export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <SplineErrorBoundary fallback={<SplineUnavailable />}>
      <Suspense fallback={<SplineFallback />}>
        <Spline scene={scene} className={className} onLoad={onLoad} />
      </Suspense>
    </SplineErrorBoundary>
  );
}
