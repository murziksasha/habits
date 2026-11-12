import { describe, expect, it } from "vitest";
import {
  hasOpenDialog,
  isTypingTarget,
  optionIndexFromKey,
} from "./answer-keys";

describe("optionIndexFromKey", () => {
  it("maps Digit1 and Numpad1 to 0", () => {
    expect(optionIndexFromKey({ code: "Digit1" })).toBe(0);
    expect(optionIndexFromKey({ code: "Numpad1" })).toBe(0);
  });

  it("maps Numpad4 with key: ArrowLeft to 3 (Num Lock off)", () => {
    expect(optionIndexFromKey({ code: "Numpad4", key: "ArrowLeft" })).toBe(3);
  });

  it("maps top row and numpad 1–9 to 0–8", () => {
    expect(optionIndexFromKey({ code: "Digit2" })).toBe(1);
    expect(optionIndexFromKey({ code: "Digit9" })).toBe(8);
    expect(optionIndexFromKey({ code: "Numpad8", key: "ArrowUp" })).toBe(7);
    expect(optionIndexFromKey({ code: "Numpad9", key: "PageUp" })).toBe(8);
  });

  it("ignores Shift and Ctrl (returns null)", () => {
    expect(optionIndexFromKey({ code: "Digit1", shiftKey: true })).toBeNull();
    expect(optionIndexFromKey({ code: "Digit1", ctrlKey: true })).toBeNull();
    expect(optionIndexFromKey({ code: "Numpad1", shiftKey: true })).toBeNull();
    expect(optionIndexFromKey({ code: "Numpad1", ctrlKey: true })).toBeNull();
    expect(optionIndexFromKey({ code: "Digit1", altKey: true })).toBeNull();
    expect(optionIndexFromKey({ code: "Digit1", metaKey: true })).toBeNull();
  });

  it("returns null for 0, letters, and other non-option keys", () => {
    expect(optionIndexFromKey({ code: "Digit0" })).toBeNull();
    expect(optionIndexFromKey({ code: "Numpad0", key: "Insert" })).toBeNull();
    expect(optionIndexFromKey({ code: "KeyA", key: "a" })).toBeNull();
    expect(optionIndexFromKey({ code: "KeyZ", key: "z" })).toBeNull();
    expect(optionIndexFromKey({ code: "Enter", key: "Enter" })).toBeNull();
    expect(optionIndexFromKey({ code: "Space", key: " " })).toBeNull();
  });

  it("falls back to e.key 1–9 when code is empty", () => {
    expect(optionIndexFromKey({ code: "", key: "1" })).toBe(0);
    expect(optionIndexFromKey({ code: "", key: "5" })).toBe(4);
    expect(optionIndexFromKey({ key: "9" })).toBe(8);
    expect(optionIndexFromKey({ code: "", key: "0" })).toBeNull();
    expect(optionIndexFromKey({ code: "", key: "a" })).toBeNull();
    expect(optionIndexFromKey({})).toBeNull();
  });
});

describe("isTypingTarget", () => {
  it("returns true for input, textarea, and select", () => {
    expect(isTypingTarget({ tagName: "INPUT" } as unknown as EventTarget)).toBe(true);
    expect(isTypingTarget({ tagName: "TEXTAREA" } as unknown as EventTarget)).toBe(true);
    expect(isTypingTarget({ tagName: "SELECT" } as unknown as EventTarget)).toBe(true);
    expect(isTypingTarget({ tagName: "input" } as unknown as EventTarget)).toBe(true);
  });

  it("returns true for contenteditable", () => {
    expect(
      isTypingTarget({
        tagName: "DIV",
        isContentEditable: true,
      } as unknown as EventTarget),
    ).toBe(true);
    expect(
      isTypingTarget({
        tagName: "DIV",
        isContentEditable: false,
        getAttribute: (attr: string) => (attr === "contenteditable" ? "true" : null),
      } as unknown as EventTarget),
    ).toBe(true);
  });

  it("returns false for non-typing targets and null", () => {
    expect(isTypingTarget(null)).toBe(false);
    expect(isTypingTarget({ tagName: "BUTTON" } as unknown as EventTarget)).toBe(false);
    expect(isTypingTarget({ tagName: "DIV" } as unknown as EventTarget)).toBe(false);
    expect(isTypingTarget({ tagName: "A" } as unknown as EventTarget)).toBe(false);
  });
});

describe("hasOpenDialog", () => {
  it("detects role=dialog", () => {
    const mockDocWithDialog = {
      querySelector: (sel: string) => (sel === '[role="dialog"]' ? {} : null),
    } as unknown as Document;
    expect(hasOpenDialog(mockDocWithDialog)).toBe(true);

    const mockDocWithoutDialog = {
      querySelector: () => null,
    } as unknown as Document;
    expect(hasOpenDialog(mockDocWithoutDialog)).toBe(false);
  });
});

