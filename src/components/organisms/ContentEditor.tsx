import type { HTMLAttributes } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

export interface ContentEditorProps
  extends Omit<HTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  showToolbar?: boolean;
  showCharCount?: boolean;
}

export const ContentEditor = ({
  className,
  value,
  onChange,
  maxLength = 280,
  placeholder = 'Type your update here... Use @ to mention or # for tags.',
  showToolbar = true,
  showCharCount = true,
  ...props
}: ContentEditorProps) => {
  const isOverLimit = value.length > maxLength;

  return (
    <div
      className={cn(
        'bg-white border-2 border-black p-6 shadow-hard relative',
        className
      )}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-64 border-0 outline-none resize-none font-mono text-sm leading-relaxed p-2 -ml-2 bg-transparent"
        placeholder={placeholder}
        maxLength={maxLength * 2} // Allow typing beyond limit for UX
        {...props}
      />

      {(showToolbar || showCharCount) && (
        <div className="flex justify-between items-center pt-4 border-t-2 border-neutral-100 mt-2">
          {showToolbar && (
            <div className="flex gap-2 text-neutral-400">
              <button className="hover:text-black">
                <Icon icon="solar:smile-circle-linear" className="text-xl" />
              </button>
              <button className="hover:text-black">
                <Icon icon="solar:hashtag-square-linear" className="text-xl" />
              </button>
              <button className="hover:text-black">
                <Icon icon="solar:map-point-linear" className="text-xl" />
              </button>
            </div>
          )}
          {showCharCount && (
            <div className="font-mono text-xs">
              <span
                className={cn(
                  'font-bold',
                  isOverLimit ? 'text-brand-red' : 'text-green-600'
                )}
              >
                {value.length}
              </span>
              <span className="text-neutral-400">/{maxLength}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
