"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/locale-context";

export interface PopoverLayerProps {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  label?: string;
  id?: string;
  children: React.ReactNode;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function PopoverLayer({
  open,
  anchorRef,
  onClose,
  label,
  id,
  children,
}: PopoverLayerProps) {
  const { t } = useLocale();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const prevPathname = useRef(pathname);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute position anchored to anchor element
  useIsomorphicLayoutEffect(() => {
    if (!open || !anchorRef.current) {
      setCoords(null);
      return;
    }

    const updatePosition = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const width = Math.min(320, Math.max(0, viewportWidth - 16));
      let left = rect.right - width;
      if (left + width > viewportWidth - 8) {
        left = viewportWidth - 8 - width;
      }
      if (left < 8) {
        left = 8;
      }
      const top = rect.bottom + 8;
      setCoords({ top, left, width });
    };

    updatePosition();
  }, [open, anchorRef]);

  // Route change closes the panel
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      if (open) {
        onClose();
      }
    }
  }, [pathname, open, onClose]);

  // Window scroll or resize closes the panel (list scroll does not)
  // Escape key closes and returns focus
  useEffect(() => {
    if (!open) return;

    const handleScroll = (e: Event) => {
      if (
        e.target &&
        panelRef.current &&
        panelRef.current.contains(e.target as Node)
      ) {
        return;
      }
      onClose();
    };

    const handleResize = () => {
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        anchorRef.current?.focus();
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, anchorRef]);

  // Focus moves into the panel on open and back to the bell on close
  useEffect(() => {
    if (open && coords && panelRef.current) {
      panelRef.current.focus();
    }
  }, [open, coords]);

  useEffect(() => {
    if (prevOpenRef.current && !open) {
      anchorRef.current?.focus();
    }
    prevOpenRef.current = open;
  }, [open, anchorRef]);

  if (!mounted || !open || !coords) return null;

  return createPortal(
    <>
      <button
        type="button"
        aria-label={t.common.close}
        className="fixed inset-0 z-50 cursor-default bg-transparent"
        onPointerDown={(e) => {
          e.preventDefault();
          onClose();
        }}
        onClick={(e) => {
          e.preventDefault();
          onClose();
        }}
      />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className="fixed z-50 outline-none"
        style={{
          top: `${coords.top}px`,
          left: `${coords.left}px`,
          width: `${coords.width}px`,
        }}
      >
        {children}
      </div>
    </>,
    document.body
  );
}

