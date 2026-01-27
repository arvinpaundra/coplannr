import { Icon } from '@iconify/react';

interface NotificationBellProps {
  count?: number;
  onClick?: () => void;
}

export const NotificationBell = ({
  count = 0,
  onClick,
}: NotificationBellProps) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 border border-transparent hover:border-black hover:bg-neutral-100 transition-colors"
    >
      <Icon icon="solar:bell-linear" className="text-xl" />
      {count > 0 && (
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-red border border-white" />
      )}
    </button>
  );
};
