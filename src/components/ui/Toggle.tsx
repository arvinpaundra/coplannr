import { forwardRef } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  accentColor?: 'red' | 'neon';
}

export const Toggle = forwardRef<HTMLLabelElement, ToggleProps>(
  (
    { checked, onChange, label, disabled = false, accentColor = 'neon' },
    ref
  ) => {
    const bgColor = accentColor === 'neon' ? 'bg-brand-neon' : 'bg-brand-red';

    return (
      <div className="flex items-center justify-between">
        {label && <span className="text-sm font-medium">{label}</span>}
        <label
          ref={ref}
          className={`relative inline-block w-14 h-7 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => !disabled && onChange(e.target.checked)}
            disabled={disabled}
            className="opacity-0 w-0 h-0"
          />
          <span
            className={`absolute inset-0 border-2 border-black bg-white transition-colors duration-200 ${
              checked ? bgColor : ''
            }`}
          >
            <span
              className={`absolute h-4 w-4 left-0.75 bottom-1 bg-black transition-transform duration-200 ${
                checked ? 'translate-x-7' : ''
              }`}
            />
          </span>
        </label>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';
