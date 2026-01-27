import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/datepicker.css';

interface DateTimePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  showTimeSelect?: boolean;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  timeIntervals?: number;
  dateFormat?: string;
  disabled?: boolean;
  className?: string;
}

export const DateTimePicker = forwardRef<DatePicker, DateTimePickerProps>(
  (
    {
      selected,
      onChange,
      showTimeSelect = true,
      minDate,
      maxDate,
      placeholder = 'Pick a date and time',
      timeIntervals = 15,
      dateFormat = 'MMMM d, yyyy h:mm aa',
      disabled = false,
      className = '',
    },
    ref
  ) => {
    return (
      <DatePicker
        ref={ref}
        selected={selected}
        onChange={onChange}
        showTimeSelect={showTimeSelect}
        timeFormat="HH:mm"
        timeIntervals={timeIntervals}
        dateFormat={dateFormat}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeholder}
        disabled={disabled}
        className={`w-full border border-black p-3 font-mono text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_#ccff00] transition-shadow cursor-pointer ${
          disabled ? 'bg-neutral-100 cursor-not-allowed' : ''
        } ${className}`}
        calendarClassName="brutalist-calendar"
        wrapperClassName="w-full"
      />
    );
  }
);

DateTimePicker.displayName = 'DateTimePicker';
