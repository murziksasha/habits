"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

/**
 * Chessboard is heavy (react-chessboard + assets). Load only on play/lesson paths.
 */
export const Chessboard = dynamic(
  () => import("react-chessboard").then((m) => m.Chessboard),
  {
    ssr: false,
    loading: () => (
      <div className="grid aspect-square w-full max-w-md place-items-center rounded-2xl border-2 border-slate-200 bg-slate-50 text-sm font-bold text-ink-muted dark:border-slate-700 dark:bg-slate-900">
        Loading board…
      </div>
    ),
  },
);

export type ChessboardProps = ComponentProps<typeof Chessboard>;
