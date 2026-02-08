import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export interface Shortcut {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  description: string;
}

export interface ShortcutsOverlayProps extends HTMLAttributes<HTMLDivElement> {
  shortcuts: Shortcut[];
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsOverlay = ({
  className,
  shortcuts,
  isOpen,
  onClose,
  ...props
}: ShortcutsOverlayProps) => {
  if (!isOpen) return null;

  const formatKey = (shortcut: Shortcut) => {
    const parts: string[] = [];
    if (shortcut.ctrl || shortcut.meta) {
      parts.push(navigator.platform.includes('Mac') ? '⌘' : 'Ctrl');
    }
    parts.push(shortcut.key.toUpperCase());
    return parts.join(' + ');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
      {...props}
    >
      <div
        className={cn(
          'bg-white border-hard shadow-[8px_8px_0px_0px_#000] p-8 max-w-2xl w-full mx-4 relative',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button
          variant="secondary"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 p-0 flex items-center justify-center hover:bg-brand-red hover:text-white transition-colors"
          title="Close (Press ESC)"
        >
          <Icon icon="solar:close-circle-bold" className="text-lg" />
        </Button>

        {/* Header */}
        <div className="mb-6 border-b-2 border-black pb-4">
          <h2 className="text-2xl font-bold uppercase tracking-tight">
            Keyboard Shortcuts
          </h2>
          <p className="font-mono text-xs text-neutral-500 mt-1">
            Press{' '}
            <kbd className="px-2 py-1 bg-neutral-100 border border-black text-xs">
              ?
            </kbd>{' '}
            to toggle this overlay
          </p>
        </div>

        {/* Shortcuts list */}
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-black hover:bg-brand-neon transition-colors"
            >
              <span className="font-mono text-sm">{shortcut.description}</span>
              <kbd className="px-3 py-1 bg-black text-white font-mono text-xs border-2 border-black shadow-hard-sm">
                {formatKey(shortcut)}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="mt-6 pt-4 border-t-2 border-black">
          <p className="font-mono text-xs text-neutral-500 text-center">
            Press{' '}
            <kbd className="px-2 py-1 bg-neutral-100 border border-black text-xs">
              ESC
            </kbd>{' '}
            to close
          </p>
        </div>
      </div>
    </div>
  );
};
