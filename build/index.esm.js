import React, { useRef, useReducer, useLayoutEffect, useEffect, useState } from 'react';
import { instanceOf, number, object, objectOf, bool, string, func, oneOf, node } from 'prop-types';
import { getDate, isToday, format, isSameMonth, getYear, startOfMonth, subMonths, addMonths, startOfWeek, endOfWeek, addWeeks, endOfMonth, differenceInCalendarWeeks, differenceInCalendarMonths, isAfter, isBefore, eachDayOfInterval, lightFormat, startOfDay, set, differenceInDays, isSameDay, isValid, parse } from 'date-fns';

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

const defaultModifiersClassNames = {
  today: '-today',
  outside: '-outside',
  wide: '-wide',
  disabled: '-disabled',
  selected: '-selected',
  selectedStart: '-selected-start',
  selectedMiddle: '-selected-middle',
  selectedEnd: '-selected-end'
};
function CalendarDay(_ref) {
  let {
    date,
    height,
    locale,
    modifiers: receivedModifiers = {},
    modifiersClassNames: receivedModifiersClassNames,
    onClick = () => {},
    onHover = () => {}
  } = _ref;
  const dayOfMonth = getDate(date);
  const dayClassNames = {};
  const modifiers = _objectSpread2({
    today: isToday(date)
  }, receivedModifiers);
  const modifiersClassNames = _objectSpread2(_objectSpread2({}, defaultModifiersClassNames), receivedModifiersClassNames);
  Object.keys(modifiers).forEach(name => {
    dayClassNames[modifiersClassNames[name]] = modifiers[name];
  });
  const handleClick = event => {
    onClick(date);
    event.preventDefault();
  };
  const handleMouseEnter = () => {
    onHover(date);
  };
  const handleMouseLeave = () => {
    onHover(null);
  };
  return /*#__PURE__*/React.createElement("span", {
    className: classnames('nice-dates-day', dayClassNames),
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchEnd: handleClick,
    style: {
      height
    }
  }, dayOfMonth === 1 && /*#__PURE__*/React.createElement("span", {
    className: "nice-dates-day_month"
  }, format(date, 'LLL', {
    locale
  })), /*#__PURE__*/React.createElement("span", {
    className: "nice-dates-day_date"
  }, dayOfMonth));
}
CalendarDay.propTypes = {
  date: instanceOf(Date).isRequired,
  height: number.isRequired,
  locale: object.isRequired,
  modifiers: objectOf(bool),
  modifiersClassNames: objectOf(string),
  onHover: func,
  onClick: func
};

function CalendarNavigation(_ref) {
  let {
    locale,
    month,
    minimumDate,
    maximumDate,
    onMonthChange
  } = _ref;
  const handlePrevious = event => {
    onMonthChange(startOfMonth(subMonths(month, 1)));
    event.preventDefault();
  };
  const handleNext = event => {
    onMonthChange(startOfMonth(addMonths(month, 1)));
    event.preventDefault();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates-navigation"
  }, /*#__PURE__*/React.createElement("a", {
    className: classnames('nice-dates-navigation_previous', {
      '-disabled': isSameMonth(month, minimumDate)
    }),
    onClick: handlePrevious,
    onTouchEnd: handlePrevious
  }), /*#__PURE__*/React.createElement("span", {
    className: "nice-dates-navigation_current"
  }, format(month, getYear(month) === getYear(new Date()) ? 'LLLL' : 'LLLL yyyy', {
    locale
  })), /*#__PURE__*/React.createElement("a", {
    className: classnames('nice-dates-navigation_next', {
      '-disabled': isSameMonth(month, maximumDate)
    }),
    onClick: handleNext,
    onTouchEnd: handleNext
  }));
}
CalendarNavigation.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  onMonthChange: func.isRequired
};

const START_DATE = 'startDate';
const END_DATE = 'endDate';
const ORIGIN_BOTTOM = 'bottom';
const ORIGIN_TOP = 'top';

const rowsBetweenDates = (startDate, endDate, locale) => differenceInCalendarWeeks(endDate, startDate, {
  locale
}) + 1;
const rowsInMonth = (date, locale) => rowsBetweenDates(startOfMonth(date), endOfMonth(date), locale);
const getStartDate = (date, locale) => startOfWeek(startOfMonth(date), {
  locale
});
const getEndDate = (date, locale) => endOfWeek(addWeeks(endOfMonth(date), 6 - rowsInMonth(date, locale)), {
  locale
});
const createInitialState = (currentMonth, locale) => {
  return {
    startDate: getStartDate(currentMonth, locale),
    endDate: getEndDate(currentMonth, locale),
    cellHeight: 0,
    isWide: false,
    lastCurrentMonth: currentMonth,
    locale,
    offset: 0,
    origin: ORIGIN_TOP,
    transition: false
  };
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'setStartDate':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        startDate: action.value
      });
    case 'setEndDate':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        endDate: action.value
      });
    case 'setRange':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        startDate: action.startDate,
        endDate: action.endDate
      });
    case 'setCellHeight':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        cellHeight: action.value
      });
    case 'setIsWide':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isWide: action.value
      });
    case 'reset':
      return _objectSpread2(_objectSpread2({}, createInitialState(action.currentMonth, state.locale)), {}, {
        cellHeight: state.cellHeight,
        isWide: state.isWide
      });
    case 'transitionToCurrentMonth':
      {
        const {
          currentMonth
        } = action;
        const {
          lastCurrentMonth,
          startDate,
          endDate,
          cellHeight
        } = state;
        const newState = _objectSpread2(_objectSpread2({}, state), {}, {
          lastCurrentMonth: currentMonth,
          transition: true
        });
        if (isAfter(currentMonth, lastCurrentMonth)) {
          const offset = -(rowsBetweenDates(startDate, currentMonth, state.locale) - 1) * cellHeight;
          return _objectSpread2(_objectSpread2({}, newState), {}, {
            endDate: getEndDate(currentMonth, state.locale),
            offset,
            origin: ORIGIN_TOP
          });
        } else if (isBefore(currentMonth, lastCurrentMonth)) {
          const gridHeight = cellHeight * 6;
          const offset = rowsBetweenDates(currentMonth, endDate, state.locale) * cellHeight - gridHeight;
          return _objectSpread2(_objectSpread2({}, newState), {}, {
            startDate: getStartDate(currentMonth, state.locale),
            offset,
            origin: ORIGIN_BOTTOM
          });
        }
        return state;
      }
    default:
      throw new Error("Unknown ".concat(action.type, " action type"));
  }
};
function useGrid(_ref) {
  let {
    locale,
    month: currentMonth,
    onMonthChange,
    transitionDuration,
    touchDragEnabled
  } = _ref;
  const timeoutRef = useRef();
  const containerElementRef = useRef();
  const initialDragPositionRef = useRef(0);
  const [state, dispatch] = useReducer(reducer, createInitialState(currentMonth, locale));
  const {
    startDate,
    endDate,
    cellHeight,
    lastCurrentMonth,
    offset,
    origin,
    transition,
    isWide
  } = state;
  useLayoutEffect(() => {
    const notDragging = !initialDragPositionRef.current;
    if (!isSameMonth(lastCurrentMonth, currentMonth) && notDragging) {
      const containerElement = containerElementRef.current;
      containerElement.classList.add('-transition');
      clearTimeout(timeoutRef.current);
      if (Math.abs(differenceInCalendarMonths(currentMonth, lastCurrentMonth)) <= 3) {
        dispatch({
          type: 'transitionToCurrentMonth',
          currentMonth
        });
        timeoutRef.current = setTimeout(() => {
          dispatch({
            type: 'reset',
            currentMonth
          });
        }, transitionDuration);
      } else {
        dispatch({
          type: 'reset',
          currentMonth
        });
      }
    }
  }, [currentMonth]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (!touchDragEnabled) {
      return;
    }
    const containerElement = containerElementRef.current;
    const gridHeight = cellHeight * 6;
    const halfGridHeight = gridHeight / 2;
    if (containerElement) {
      const handleDragStart = event => {
        clearTimeout(timeoutRef.current);
        const computedOffset = Number(window.getComputedStyle(containerElement).transform.match(/([-+]?[\d.]+)/g)[5]);
        let currentMonthPosition = 0;
        if (!initialDragPositionRef.current) {
          const newStartDate = getStartDate(subMonths(currentMonth, 1), locale);
          currentMonthPosition = (rowsBetweenDates(newStartDate, currentMonth, locale) - 1) * cellHeight;
          dispatch({
            type: 'setRange',
            startDate: newStartDate,
            endDate: getEndDate(addMonths(currentMonth, 1), locale)
          });
        }
        containerElement.style.transform = "translate3d(0, ".concat(computedOffset || -currentMonthPosition, "px, 0)");
        containerElement.classList.remove('-transition');
        containerElement.classList.add('-moving');
        initialDragPositionRef.current = event.touches[0].clientY + (-computedOffset || currentMonthPosition);
      };
      const handleDrag = event => {
        const initialDragPosition = initialDragPositionRef.current;
        const dragOffset = event.touches[0].clientY - initialDragPosition;
        const previousMonth = subMonths(currentMonth, 1);
        const previousMonthPosition = (rowsBetweenDates(startDate, previousMonth, locale) - 1) * cellHeight;
        const currentMonthPosition = (rowsBetweenDates(startDate, currentMonth, locale) - 1) * cellHeight;
        const nextMonth = addMonths(currentMonth, 1);
        const nextMonthPosition = (rowsBetweenDates(startDate, nextMonth, locale) - 1) * cellHeight;
        if (dragOffset < 0) {
          if (Math.abs(dragOffset) > currentMonthPosition && isBefore(endDate, addMonths(currentMonth, 2))) {
            dispatch({
              type: 'setEndDate',
              value: getEndDate(nextMonth, locale)
            });
          }
        } else if (dragOffset > 0) {
          const newStartDate = getStartDate(previousMonth, locale);
          const newCurrentMonthPosition = (rowsBetweenDates(newStartDate, currentMonth, locale) - 1) * cellHeight;
          initialDragPositionRef.current += newCurrentMonthPosition;
          dispatch({
            type: 'setStartDate',
            value: newStartDate
          });
        }
        const shouldChangeToNextMonth = Math.abs(dragOffset) > nextMonthPosition - halfGridHeight;
        const shouldChangeToPreviousMonth = Math.abs(dragOffset) > previousMonthPosition - halfGridHeight && Math.abs(dragOffset) < currentMonthPosition - halfGridHeight;
        if (shouldChangeToNextMonth) {
          onMonthChange(nextMonth);
        } else if (shouldChangeToPreviousMonth) {
          onMonthChange(previousMonth);
        }
        containerElement.style.transform = "translate3d(0, ".concat(dragOffset, "px, 0)");
        event.preventDefault();
      };
      const handleDragEnd = event => {
        const currentMonthPosition = (rowsBetweenDates(startDate, currentMonth, locale) - 1) * cellHeight;
        containerElement.style.transform = "translate3d(0, ".concat(-currentMonthPosition, "px, 0)");
        containerElement.classList.add('-transition');
        containerElement.classList.remove('-moving');
        timeoutRef.current = setTimeout(() => {
          initialDragPositionRef.current = 0;
          containerElement.style.transform = 'translate3d(0, 0, 0)';
          containerElement.classList.remove('-transition');
          dispatch({
            type: 'reset',
            currentMonth: currentMonth
          });
        }, transitionDuration);
        if (Math.abs(initialDragPositionRef.current - currentMonthPosition - event.changedTouches[0].clientY) > 10) {
          event.preventDefault();
          event.stopPropagation();
        }
      };
      containerElement.addEventListener('touchstart', handleDragStart, {
        passive: true
      });
      containerElement.addEventListener('touchmove', handleDrag, {
        passive: true
      });
      containerElement.addEventListener('touchend', handleDragEnd, {
        passive: true
      });
      return () => {
        containerElement.removeEventListener('touchstart', handleDragStart, {
          passive: true
        });
        containerElement.removeEventListener('touchmove', handleDrag, {
          passive: true
        });
        containerElement.removeEventListener('touchend', handleDragEnd, {
          passive: true
        });
      };
    }
  });
  useEffect(() => {
    const handleResize = () => {
      const containerElement = containerElementRef.current;
      const containerWidth = containerElement.offsetWidth;
      const cellWidth = containerWidth / 7;
      let newCellHeight = 1;
      let wide = false;
      if (cellWidth > 60) {
        newCellHeight += Math.round(cellWidth * 0.75);
        wide = true;
      } else {
        newCellHeight += Math.round(cellWidth);
      }
      dispatch({
        type: 'setIsWide',
        value: wide
      });
      dispatch({
        type: 'setCellHeight',
        value: newCellHeight
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return {
    startDate,
    endDate,
    cellHeight,
    containerElementRef,
    offset,
    origin,
    transition,
    isWide
  };
}

const computeModifiers = (modifiers, date) => {
  const computedModifiers = {};
  Object.keys(modifiers).map(key => {
    computedModifiers[key] = modifiers[key](date);
  });
  return computedModifiers;
};
function CalendarGrid(_ref) {
  let {
    locale,
    month,
    modifiers = {},
    modifiersClassNames,
    onMonthChange,
    onDayHover,
    onDayClick,
    transitionDuration = 500,
    touchDragEnabled = true
  } = _ref;
  const grid = useGrid({
    locale,
    month: startOfMonth(month),
    onMonthChange,
    transitionDuration,
    touchDragEnabled
  });
  const {
    startDate,
    endDate,
    cellHeight,
    containerElementRef,
    isWide,
    offset,
    origin,
    transition
  } = grid;
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate
  }).map(date => {
    return /*#__PURE__*/React.createElement(CalendarDay, {
      date: date,
      height: cellHeight,
      key: lightFormat(date, 'yyyy-MM-dd'),
      locale: locale,
      modifiers: _objectSpread2(_objectSpread2({}, computeModifiers(modifiers, date)), {}, {
        outside: !isSameMonth(date, month),
        wide: isWide
      }),
      modifiersClassNames: modifiersClassNames,
      onHover: onDayHover,
      onClick: onDayClick
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates-grid",
    style: {
      height: cellHeight * 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: classnames('nice-dates-grid_container', {
      '-moving': offset,
      '-origin-bottom': origin === ORIGIN_BOTTOM,
      '-origin-top': origin === ORIGIN_TOP,
      '-transition': transition
    }),
    ref: containerElementRef,
    style: {
      transform: "translate3d(0, ".concat(offset, "px, 0)"),
      transitionDuration: "".concat(transitionDuration, "ms")
    }
  }, days));
}
CalendarGrid.propTypes = {
  locale: object.isRequired,
  month: instanceOf(Date).isRequired,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  onMonthChange: func.isRequired,
  onDayHover: func,
  onDayClick: func,
  transitionDuration: number,
  touchDragEnabled: bool
};

function CalendarWeekHeader(_ref) {
  let {
    locale,
    weekdayFormat = 'eee'
  } = _ref;
  const today = new Date();
  const weekDays = eachDayOfInterval({
    start: startOfWeek(today, {
      locale
    }),
    end: endOfWeek(today, {
      locale
    })
  }).map(date => format(date, weekdayFormat, {
    locale
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates-week-header"
  }, weekDays.map(day => /*#__PURE__*/React.createElement("span", {
    key: day,
    className: "nice-dates-week-header_day"
  }, day)));
}
CalendarWeekHeader.propTypes = {
  locale: object.isRequired,
  weekdayFormat: string
};

const isSelectable = (date, _ref) => {
  let {
    minimumDate,
    maximumDate
  } = _ref;
  return !isBefore(date, startOfDay(minimumDate)) && !isAfter(date, maximumDate);
};
const mergeModifiers = (baseModifiers, newModifiers) => {
  const modifiers = _objectSpread2({}, baseModifiers);
  if (!newModifiers) {
    return baseModifiers;
  }
  Object.keys(newModifiers).forEach(name => {
    modifiers[name] = baseModifiers[name] ? date => baseModifiers[name](date) || newModifiers[name](date) : newModifiers[name];
  });
  return modifiers;
};
const setTime = (date, dateWithTime) => set(date, {
  hours: dateWithTime.getHours(),
  minutes: dateWithTime.getMinutes(),
  seconds: dateWithTime.getSeconds()
});
const isRangeLengthValid = (_ref2, _ref3) => {
  let {
    startDate,
    endDate
  } = _ref2;
  let {
    minimumLength,
    maximumLength
  } = _ref3;
  return differenceInDays(startOfDay(endDate), startOfDay(startDate)) >= minimumLength && (!maximumLength || differenceInDays(startOfDay(endDate), startOfDay(startDate)) <= maximumLength);
};

function useControllableState(value, onChange, intitialValue) {
  const [state, setState] = useState(intitialValue);
  return onChange ? [value, onChange] : [state, setState];
}

function Calendar(_ref) {
  let {
    locale,
    month: receivedMonth,
    modifiers: receivedModifiers,
    modifiersClassNames,
    minimumDate,
    maximumDate,
    onMonthChange,
    onDayHover,
    onDayClick,
    weekdayFormat,
    touchDragEnabled
  } = _ref;
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, startOfMonth(new Date()));
  const modifiers = mergeModifiers({
    disabled: date => !isSelectable(date, {
      minimumDate,
      maximumDate
    })
  }, receivedModifiers);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CalendarNavigation, {
    locale: locale,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    month: month,
    onMonthChange: setMonth
  }), /*#__PURE__*/React.createElement(CalendarWeekHeader, {
    locale: locale,
    weekdayFormat: weekdayFormat
  }), /*#__PURE__*/React.createElement(CalendarGrid, {
    locale: locale,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    month: month,
    onMonthChange: setMonth,
    onDayHover: onDayHover,
    onDayClick: onDayClick,
    touchDragEnabled: touchDragEnabled
  }));
}
Calendar.propTypes = {
  locale: object.isRequired,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  month: instanceOf(Date),
  onMonthChange: func,
  onDayHover: func,
  onDayClick: func,
  weekdayFormat: string,
  touchDragEnabled: bool
};

function DatePickerCalendar(_ref) {
  let {
    locale,
    date: selectedDate,
    month: receivedMonth,
    onDateChange,
    onMonthChange,
    minimumDate,
    maximumDate,
    modifiers: receivedModifiers,
    modifiersClassNames,
    weekdayFormat,
    touchDragEnabled
  } = _ref;
  const isSelected = date => isSameDay(date, selectedDate) && isSelectable(date, {
    minimumDate,
    maximumDate
  });
  const modifiers = mergeModifiers({
    selected: isSelected,
    disabled: isSelected
  }, receivedModifiers);
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, startOfMonth(selectedDate || new Date()));
  const handleDateChange = date => {
    onDateChange(selectedDate ? setTime(date, selectedDate) : date);
  };
  return /*#__PURE__*/React.createElement(Calendar, {
    locale: locale,
    month: month,
    onMonthChange: setMonth,
    onDayClick: handleDateChange,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    weekdayFormat: weekdayFormat,
    touchDragEnabled: touchDragEnabled
  });
}
DatePickerCalendar.propTypes = {
  locale: object.isRequired,
  date: instanceOf(Date),
  month: instanceOf(Date),
  onDateChange: func,
  onMonthChange: func,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
};

function DateRangePickerCalendar(_ref) {
  let {
    locale,
    startDate,
    endDate,
    focus,
    month: receivedMonth,
    onStartDateChange = () => {},
    onEndDateChange = () => {},
    onFocusChange = () => {},
    onMonthChange,
    minimumDate,
    maximumDate,
    minimumLength = 0,
    maximumLength = null,
    modifiers: receivedModifiers,
    modifiersClassNames,
    weekdayFormat,
    touchDragEnabled
  } = _ref;
  const [hoveredDate, setHoveredDate] = useState();
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, startOfMonth(startDate || endDate || new Date()));
  const displayedStartDate = focus === START_DATE && !startDate && endDate && hoveredDate && !isSameDay(hoveredDate, endDate) ? hoveredDate : startOfDay(startDate);
  const displayedEndDate = focus === END_DATE && !endDate && startDate && hoveredDate && !isSameDay(hoveredDate, startDate) ? hoveredDate : startOfDay(endDate);
  const isStartDate = date => isSameDay(date, displayedStartDate) && isBefore(date, displayedEndDate);
  const isMiddleDate = date => isAfter(date, displayedStartDate) && isBefore(date, displayedEndDate);
  const isEndDate = date => isSameDay(date, displayedEndDate) && isAfter(date, displayedStartDate);
  const modifiers = mergeModifiers({
    selected: date => isSelectable(date, {
      minimumDate,
      maximumDate
    }) && (isStartDate(date) || isMiddleDate(date) || isEndDate(date) || isSameDay(date, startDate) || isSameDay(date, endDate)),
    selectedStart: isStartDate,
    selectedMiddle: isMiddleDate,
    selectedEnd: isEndDate,
    disabled: date => focus === START_DATE && endDate && (differenceInDays(startOfDay(endDate), date) < minimumLength && (!startDate || !isAfter(date, startOfDay(endDate))) || !startDate && maximumLength && differenceInDays(startOfDay(endDate), date) > maximumLength) || focus === END_DATE && startDate && (differenceInDays(date, startOfDay(startDate)) < minimumLength && (!endDate || !isBefore(date, startOfDay(startDate))) || !endDate && maximumLength && differenceInDays(date, startOfDay(startDate)) > maximumLength)
  }, receivedModifiers);
  const handleSelectDate = date => {
    if (focus === START_DATE) {
      const invalidEndDate = endDate && !isRangeLengthValid({
        startDate: date,
        endDate
      }, {
        minimumLength,
        maximumLength
      });
      if (invalidEndDate) {
        onEndDateChange(null);
      }
      onStartDateChange(startDate ? setTime(date, startDate) : date);
      onFocusChange(END_DATE);
    } else if (focus === END_DATE) {
      const invalidStartDate = startDate && !isRangeLengthValid({
        startDate,
        endDate: date
      }, {
        minimumLength,
        maximumLength
      });
      if (invalidStartDate) {
        onStartDateChange(null);
      }
      onEndDateChange(endDate ? setTime(date, endDate) : date);
      onFocusChange(invalidStartDate || !startDate ? START_DATE : null);
    }
  };
  return /*#__PURE__*/React.createElement(Calendar, {
    locale: locale,
    month: month,
    onMonthChange: setMonth,
    onDayHover: setHoveredDate,
    onDayClick: handleSelectDate,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    weekdayFormat: weekdayFormat,
    touchDragEnabled: touchDragEnabled
  });
}
DateRangePickerCalendar.propTypes = {
  locale: object.isRequired,
  startDate: instanceOf(Date),
  endDate: instanceOf(Date),
  focus: oneOf([START_DATE, END_DATE]),
  month: instanceOf(Date),
  onStartDateChange: func,
  onEndDateChange: func,
  onFocusChange: func,
  onMonthChange: func,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  minimumLength: number,
  maximumLength: number,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
};

const Popover = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    open
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: classnames('nice-dates-popover', {
      '-open': open
    }),
    ref: ref
  }, children);
});
Popover.displayName = 'Popover';
Popover.propTypes = {
  children: node,
  open: bool
};

function useDateInput(_ref) {
  let {
    date: selectedDate,
    format: receivedFormatString,
    locale,
    minimumDate,
    maximumDate,
    onDateChange,
    validate
  } = _ref;
  const formatString = receivedFormatString || locale.formatLong.date({
    width: 'short'
  });
  const formatDate = date => format(date, formatString, {
    locale
  });
  const parseDate = dateString => parse(dateString, formatString, selectedDate || new Date());
  const isValidAndSelectable = date => isValid(date) && isSelectable(date, {
    minimumDate,
    maximumDate
  }) && (!validate || validate(date));
  const [value, setValue] = useState(isValidAndSelectable(selectedDate) ? formatDate(selectedDate) : '');
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };
  const handleChange = event => {
    const newValue = event.target.value;
    const parsedDate = parseDate(newValue);
    setValue(newValue);
    if (isValidAndSelectable(parsedDate)) {
      onDateChange(parsedDate);
    }
  };
  const handleBlur = () => {
    if (value) {
      const parsedDate = parseDate(value);
      if (isValidAndSelectable(parsedDate)) {
        setValue(formatDate(parsedDate));
      } else if (isValidAndSelectable(selectedDate)) {
        setValue(formatDate(selectedDate));
      } else {
        setValue('');
      }
    } else if (selectedDate) {
      onDateChange(null);
    }
    setFocused(false);
  };
  useEffect(() => {
    if (!focused) {
      setValue(isValidAndSelectable(selectedDate) ? formatDate(selectedDate) : '');
    }
  }, [selectedDate, focused]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    onFocus: handleFocus,
    onChange: handleChange,
    onBlur: handleBlur,
    placeholder: formatString.toLowerCase(),
    type: 'text',
    value
  };
}

function useDetectTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const handleTouch = () => {
      setIsTouch(true);
      removeListener();
    };
    const removeListener = () => {
      document.removeEventListener('touchstart', handleTouch, {
        passive: true
      });
    };
    document.addEventListener('touchstart', handleTouch, {
      passive: true
    });
    return removeListener;
  }, []);
  return isTouch;
}

function useOutsideClickHandler(callback) {
  const refA = useRef();
  const refB = useRef();
  const refC = useRef();
  useEffect(() => {
    const handleOutsideClick = event => {
      if ((!refA.current || refA.current.contains && !refA.current.contains(event.target)) && (!refB.current || refB.current.contains && !refB.current.contains(event.target)) && (!refC.current || refC.current.contains && !refC.current.contains(event.target))) {
        callback();
      }
    };
    document.addEventListener('click', handleOutsideClick, {
      passive: true
    });
    return () => {
      document.removeEventListener('click', handleOutsideClick, {
        passive: true
      });
    };
  }, [callback]);
  return [refA, refB, refC];
}

function DatePicker(_ref) {
  let {
    children,
    locale,
    date,
    onDateChange = () => {},
    format,
    minimumDate,
    maximumDate,
    modifiers,
    modifiersClassNames,
    weekdayFormat,
    touchDragEnabled
  } = _ref;
  const [month, setMonth] = useState(date || new Date());
  const [focused, setFocused] = useState(false);
  const isTouch = useDetectTouch();
  const [inputRef, popoverRef] = useOutsideClickHandler(() => {
    if (focused) {
      setFocused(false);
    }
  });
  const inputProps = useDateInput({
    date,
    format,
    locale,
    minimumDate,
    maximumDate,
    onDateChange: date => {
      onDateChange(date);
      date && setMonth(date);
    }
  });
  const handleDateChange = date => {
    onDateChange(date);
    setFocused(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates"
  }, children({
    inputProps: _objectSpread2(_objectSpread2({}, inputProps), {}, {
      ref: inputRef,
      onFocus: () => {
        inputProps.onFocus();
        setFocused(true);
        if (isTouch) {
          inputRef.current.blur();
        }
      },
      readOnly: isTouch
    }),
    focused
  }), /*#__PURE__*/React.createElement(Popover, {
    open: focused,
    ref: popoverRef
  }, /*#__PURE__*/React.createElement(DatePickerCalendar, {
    locale: locale,
    date: date,
    month: month,
    onDateChange: handleDateChange,
    onMonthChange: setMonth,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    weekdayFormat: weekdayFormat,
    touchDragEnabled: touchDragEnabled
  })));
}
DatePicker.propTypes = {
  children: func.isRequired,
  locale: object.isRequired,
  date: instanceOf(Date),
  onDateChange: func,
  format: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
};

function DateRangePicker(_ref) {
  let {
    children,
    locale,
    startDate,
    endDate,
    onStartDateChange = () => {},
    onEndDateChange = () => {},
    format,
    minimumDate,
    maximumDate,
    minimumLength = 0,
    maximumLength = null,
    modifiers,
    modifiersClassNames,
    weekdayFormat,
    touchDragEnabled
  } = _ref;
  const [focus, setFocus] = useState();
  const [month, setMonth] = useState(startDate || endDate || new Date());
  const isTouch = useDetectTouch();
  const [startDateInputRef, endDateInputRef, popoverRef] = useOutsideClickHandler(() => {
    setFocus(null);
  });
  const startDateInputProps = useDateInput({
    date: startDate,
    format,
    locale,
    maximumDate,
    minimumDate,
    onDateChange: date => {
      onStartDateChange(date);
      date && setMonth(date);
    },
    validate: date => !endDate || isRangeLengthValid({
      startDate: date,
      endDate
    }, {
      minimumLength,
      maximumLength
    })
  });
  const endDateInputProps = useDateInput({
    date: endDate,
    format,
    locale,
    maximumDate,
    minimumDate,
    onDateChange: date => {
      onEndDateChange(date);
      date && setMonth(date);
    },
    validate: date => !startDate || isRangeLengthValid({
      startDate,
      endDate: date
    }, {
      minimumLength,
      maximumLength
    })
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "nice-dates"
  }, children({
    startDateInputProps: _objectSpread2(_objectSpread2({}, startDateInputProps), {}, {
      onFocus: () => {
        startDateInputProps.onFocus();
        setFocus(START_DATE);
        if (isTouch) {
          startDateInputRef.current.blur();
        }
      },
      ref: startDateInputRef,
      readOnly: isTouch
    }),
    endDateInputProps: _objectSpread2(_objectSpread2({}, endDateInputProps), {}, {
      onFocus: () => {
        endDateInputProps.onFocus();
        setFocus(END_DATE);
        if (isTouch) {
          endDateInputRef.current.blur();
        }
      },
      ref: endDateInputRef,
      readOnly: isTouch
    }),
    focus
  }), /*#__PURE__*/React.createElement(Popover, {
    open: !!focus,
    ref: popoverRef
  }, /*#__PURE__*/React.createElement(DateRangePickerCalendar, {
    locale: locale,
    startDate: startDate,
    endDate: endDate,
    focus: focus,
    month: month,
    onStartDateChange: onStartDateChange,
    onEndDateChange: onEndDateChange,
    onFocusChange: setFocus,
    onMonthChange: setMonth,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    minimumLength: minimumLength,
    maximumLength: maximumLength,
    modifiers: modifiers,
    modifiersClassNames: modifiersClassNames,
    weekdayFormat: weekdayFormat,
    touchDragEnabled: touchDragEnabled
  })));
}
DateRangePicker.propTypes = {
  children: func.isRequired,
  locale: object.isRequired,
  startDate: instanceOf(Date),
  endDate: instanceOf(Date),
  onStartDateChange: func,
  onEndDateChange: func,
  format: string,
  minimumDate: instanceOf(Date),
  maximumDate: instanceOf(Date),
  minimumLength: number,
  maximumLength: number,
  modifiers: objectOf(func),
  modifiersClassNames: objectOf(string),
  weekdayFormat: string,
  touchDragEnabled: bool
};

export { Calendar, CalendarDay, CalendarGrid, CalendarNavigation, CalendarWeekHeader, DatePicker, DatePickerCalendar, DateRangePicker, DateRangePickerCalendar, END_DATE, Popover, START_DATE, useDateInput };
