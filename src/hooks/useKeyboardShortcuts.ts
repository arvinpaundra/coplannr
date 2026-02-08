import { useEffect, useState } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = (
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
) => {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Check for Escape key to close overlay
      if (e.key === 'Escape') {
        if (showOverlay) {
          setShowOverlay(false);
        }
        return;
      }

      // Check for ? key to show overlay (Shift + /)
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          setShowOverlay((prev) => !prev);
          return;
        }
      }

      // Check each shortcut
      for (const shortcut of shortcuts) {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl
          ? e.ctrlKey || e.metaKey
          : !e.ctrlKey && !e.metaKey;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey;

        if (keyMatch && ctrlMatch && shiftMatch) {
          e.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled, showOverlay]);

  return { showOverlay, setShowOverlay };
};
