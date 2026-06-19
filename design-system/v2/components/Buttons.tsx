"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type LuckyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function LuckyButton({ children, className = "", ...props }: LuckyButtonProps) {
  return (
    <button type="button" className={`lc-btn-lucky ${className}`} {...props}>
      {children}
    </button>
  );
}

export function WhisperButton({ children, className = "", ...props }: LuckyButtonProps) {
  return (
    <button type="button" className={`lc-btn-whisper ${className}`} {...props}>
      {children}
    </button>
  );
}
