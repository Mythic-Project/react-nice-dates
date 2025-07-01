import React$1, { ChangeEvent, ReactNode } from 'react';
import { Locale } from 'date-fns';

interface CalendarDayProps {
    date: Date;
    height: number;
    locale: Locale;
    modifiers?: Record<string, boolean>;
    modifiersClassNames?: Record<string, string>;
    onClick?: (date: Date) => void;
    onHover?: (date: Date | null) => void;
}
declare function CalendarDay({ date, height, locale, modifiers: receivedModifiers, modifiersClassNames: receivedModifiersClassNames, onClick, onHover }: CalendarDayProps): React$1.JSX.Element;

interface CalendarNavigationProps {
    locale: Locale;
    month: Date;
    minimumDate?: Date | null;
    maximumDate?: Date | null;
    onMonthChange: (month: Date) => void;
}
declare function CalendarNavigation({ locale, month, minimumDate, maximumDate, onMonthChange }: CalendarNavigationProps): React.JSX.Element;

interface InputProps {
    ref: React.RefObject<HTMLInputElement>;
    placeholder: string;
    type: string;
    value: string;
    onBlur: () => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
    readOnly?: boolean;
}
type DefaultModifiers = 'disabled' | 'selected' | 'today';
type ModifierMatcher = (date: Date) => boolean;
type Modifiers = {
    [key in DefaultModifiers | string]: ModifierMatcher;
};
type ModifiersClassNames = {
    [key in DefaultModifiers | string]: string;
};
interface CommonProps {
    locale: Locale;
    minimumDate?: Date | null;
    maximumDate?: Date | null;
    modifiers?: Modifiers;
    modifiersClassNames?: ModifiersClassNames;
    weekdayFormat?: string;
}
type DateRangeFocus = 'startDate' | 'endDate';
type DateChangeCallBack<TDate extends Date | null = Date | null> = (date: TDate) => void;

interface CalendarGridProps {
    locale: Locale;
    month: Date;
    modifiers?: Modifiers;
    modifiersClassNames?: ModifiersClassNames;
    onMonthChange: (month: Date) => void;
    onDayHover?: (date: Date | null) => void;
    onDayClick?: (date: Date) => void;
    transitionDuration?: number;
    touchDragEnabled?: boolean;
}
declare function CalendarGrid({ locale, month, modifiers, modifiersClassNames, onMonthChange, onDayHover, onDayClick, transitionDuration, touchDragEnabled }: CalendarGridProps): React$1.JSX.Element;

interface CalendarWeekHeaderProps {
    locale: Locale;
    weekdayFormat?: string;
}
declare function CalendarWeekHeader({ locale, weekdayFormat }: CalendarWeekHeaderProps): React$1.JSX.Element;

interface CalendarProps extends CommonProps {
    month?: Date | null;
    onMonthChange?: DateChangeCallBack<Date>;
    onDayHover?: DateChangeCallBack;
    onDayClick?: DateChangeCallBack<Date>;
    touchDragEnabled?: boolean;
}
declare function Calendar({ locale, month: receivedMonth, modifiers: receivedModifiers, modifiersClassNames, minimumDate, maximumDate, onMonthChange, onDayHover, onDayClick, weekdayFormat, touchDragEnabled }: CalendarProps): React$1.JSX.Element;

interface DatePickerCalendarProps extends CommonProps {
    date?: Date | null;
    month?: Date | null;
    onDateChange?: DateChangeCallBack<Date>;
    onMonthChange?: DateChangeCallBack<Date>;
    touchDragEnabled?: boolean;
}
declare function DatePickerCalendar({ locale, date: selectedDate, month: receivedMonth, onDateChange, onMonthChange, minimumDate, maximumDate, modifiers: receivedModifiers, modifiersClassNames, weekdayFormat, touchDragEnabled }: DatePickerCalendarProps): React$1.JSX.Element;

interface DateRangePickerCalendarProps extends CommonProps {
    startDate?: Date | null;
    endDate?: Date | null;
    focus?: DateRangeFocus | null;
    month?: Date | null;
    minimumLength?: number;
    maximumLength?: number;
    onFocusChange?: (focus: DateRangeFocus | null) => void;
    onStartDateChange?: DateChangeCallBack;
    onEndDateChange?: DateChangeCallBack;
    onMonthChange?: DateChangeCallBack;
    touchDragEnabled?: boolean;
}
declare function DateRangePickerCalendar({ locale, startDate, endDate, focus, month: receivedMonth, onStartDateChange, onEndDateChange, onFocusChange, onMonthChange, minimumDate, maximumDate, minimumLength, maximumLength, modifiers: receivedModifiers, modifiersClassNames, weekdayFormat, touchDragEnabled }: DateRangePickerCalendarProps): React$1.JSX.Element;

interface PopoverProps {
    children: ReactNode;
    open: boolean;
}
declare const Popover: React$1.ForwardRefExoticComponent<PopoverProps & React$1.RefAttributes<HTMLDivElement>>;

interface DatePickerChildrenProps {
    inputProps: InputProps;
    focused: boolean;
}
interface DatePickerProps extends CommonProps {
    children: (props: DatePickerChildrenProps) => React$1.ReactNode;
    date?: Date | null;
    onDateChange?: DateChangeCallBack;
    format?: string;
    touchDragEnabled?: boolean;
}
declare function DatePicker({ children, locale, date, onDateChange, format, minimumDate, maximumDate, modifiers, modifiersClassNames, weekdayFormat, touchDragEnabled }: DatePickerProps): React$1.JSX.Element;

interface DateRangePickerChildrenProps {
    startDateInputProps: InputProps;
    endDateInputProps: InputProps;
    focus?: DateRangeFocus | null;
}
interface DateRangePickerProps extends CommonProps {
    children: (props: DateRangePickerChildrenProps) => React$1.ReactNode;
    startDate?: Date | null;
    endDate?: Date | null;
    minimumLength?: number;
    maximumLength?: number;
    onStartDateChange?: DateChangeCallBack;
    onEndDateChange?: DateChangeCallBack;
    format?: string;
    touchDragEnabled?: boolean;
}
declare function DateRangePicker({ children, locale, startDate, endDate, onStartDateChange, onEndDateChange, format, minimumDate, maximumDate, minimumLength, maximumLength, modifiers, modifiersClassNames, weekdayFormat, touchDragEnabled }: DateRangePickerProps): React$1.JSX.Element;

interface UseDateInputProps {
    date?: Date | null;
    format?: string;
    locale: Locale;
    minimumDate?: Date | null;
    maximumDate?: Date | null;
    onDateChange: DateChangeCallBack;
    validate?: (date: Date) => boolean;
}
interface UseDateInputReturn {
    onFocus: () => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    placeholder: string;
    type: 'text';
    value: string;
}
declare function useDateInput({ date: selectedDate, format: receivedFormatString, locale, minimumDate, maximumDate, onDateChange, validate }: UseDateInputProps): UseDateInputReturn;

declare const START_DATE = "startDate";
declare const END_DATE = "endDate";

export { Calendar, CalendarDay, type CalendarDayProps, CalendarGrid, type CalendarGridProps, CalendarNavigation, type CalendarNavigationProps, type CalendarProps, CalendarWeekHeader, type CalendarWeekHeaderProps, type CommonProps, type DateChangeCallBack, DatePicker, DatePickerCalendar, type DatePickerCalendarProps, type DatePickerChildrenProps, type DatePickerProps, type DateRangeFocus, DateRangePicker, DateRangePickerCalendar, type DateRangePickerCalendarProps, type DateRangePickerChildrenProps, type DateRangePickerProps, type DefaultModifiers, END_DATE, type InputProps, type ModifierMatcher, type Modifiers, type ModifiersClassNames, Popover, type PopoverProps, START_DATE, type UseDateInputProps, type UseDateInputReturn, useDateInput };
