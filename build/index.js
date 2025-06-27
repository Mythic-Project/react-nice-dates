'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var propTypes = require('prop-types');
var dateFns = require('date-fns');

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
  const dayOfMonth = dateFns.getDate(date);
  const dayClassNames = {};
  const modifiers = _objectSpread2({
    today: dateFns.isToday(date)
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
  return /*#__PURE__*/React__default.createElement("span", {
    className: classnames('nice-dates-day', dayClassNames),
    onClick: handleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onTouchEnd: handleClick,
    style: {
      height
    }
  }, dayOfMonth === 1 && /*#__PURE__*/React__default.createElement("span", {
    className: "nice-dates-day_month"
  }, dateFns.format(date, 'LLL', {
    locale
  })), /*#__PURE__*/React__default.createElement("span", {
    className: "nice-dates-day_date"
  }, dayOfMonth));
}
CalendarDay.propTypes = {
  date: propTypes.instanceOf(Date).isRequired,
  height: propTypes.number.isRequired,
  locale: propTypes.object.isRequired,
  modifiers: propTypes.objectOf(propTypes.bool),
  modifiersClassNames: propTypes.objectOf(propTypes.string),
  onHover: propTypes.func,
  onClick: propTypes.func
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
    onMonthChange(dateFns.startOfMonth(dateFns.subMonths(month, 1)));
    event.preventDefault();
  };
  const handleNext = event => {
    onMonthChange(dateFns.startOfMonth(dateFns.addMonths(month, 1)));
    event.preventDefault();
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: "nice-dates-navigation"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: classnames('nice-dates-navigation_previous', {
      '-disabled': dateFns.isSameMonth(month, minimumDate)
    }),
    onClick: handlePrevious,
    onTouchEnd: handlePrevious
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "nice-dates-navigation_current"
  }, dateFns.format(month, dateFns.getYear(month) === dateFns.getYear(new Date()) ? 'LLLL' : 'LLLL yyyy', {
    locale
  })), /*#__PURE__*/React__default.createElement("a", {
    className: classnames('nice-dates-navigation_next', {
      '-disabled': dateFns.isSameMonth(month, maximumDate)
    }),
    onClick: handleNext,
    onTouchEnd: handleNext
  }));
}
CalendarNavigation.propTypes = {
  locale: propTypes.object.isRequired,
  month: propTypes.instanceOf(Date).isRequired,
  minimumDate: propTypes.instanceOf(Date),
  maximumDate: propTypes.instanceOf(Date),
  onMonthChange: propTypes.func.isRequired
};

const START_DATE = 'startDate';
const END_DATE = 'endDate';
const ORIGIN_BOTTOM = 'bottom';
const ORIGIN_TOP = 'top';

const rowsBetweenDates = (startDate, endDate, locale) => dateFns.differenceInCalendarWeeks(endDate, startDate, {
  locale
}) + 1;
const rowsInMonth = (date, locale) => rowsBetweenDates(dateFns.startOfMonth(date), dateFns.endOfMonth(date), locale);
const getStartDate = (date, locale) => dateFns.startOfWeek(dateFns.startOfMonth(date), {
  locale
});
const getEndDate = (date, locale) => dateFns.endOfWeek(dateFns.addWeeks(dateFns.endOfMonth(date), 6 - rowsInMonth(date, locale)), {
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
        if (dateFns.isAfter(currentMonth, lastCurrentMonth)) {
          const offset = -(rowsBetweenDates(startDate, currentMonth, state.locale) - 1) * cellHeight;
          return _objectSpread2(_objectSpread2({}, newState), {}, {
            endDate: getEndDate(currentMonth, state.locale),
            offset,
            origin: ORIGIN_TOP
          });
        } else if (dateFns.isBefore(currentMonth, lastCurrentMonth)) {
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
  const timeoutRef = React.useRef();
  const containerElementRef = React.useRef();
  const initialDragPositionRef = React.useRef(0);
  const [state, dispatch] = React.useReducer(reducer, createInitialState(currentMonth, locale));
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
  React.useLayoutEffect(() => {
    const notDragging = !initialDragPositionRef.current;
    if (!dateFns.isSameMonth(lastCurrentMonth, currentMonth) && notDragging) {
      const containerElement = containerElementRef.current;
      containerElement.classList.add('-transition');
      clearTimeout(timeoutRef.current);
      if (Math.abs(dateFns.differenceInCalendarMonths(currentMonth, lastCurrentMonth)) <= 3) {
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

  React.useLayoutEffect(() => {
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
          const newStartDate = getStartDate(dateFns.subMonths(currentMonth, 1), locale);
          currentMonthPosition = (rowsBetweenDates(newStartDate, currentMonth, locale) - 1) * cellHeight;
          dispatch({
            type: 'setRange',
            startDate: newStartDate,
            endDate: getEndDate(dateFns.addMonths(currentMonth, 1), locale)
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
        const previousMonth = dateFns.subMonths(currentMonth, 1);
        const previousMonthPosition = (rowsBetweenDates(startDate, previousMonth, locale) - 1) * cellHeight;
        const currentMonthPosition = (rowsBetweenDates(startDate, currentMonth, locale) - 1) * cellHeight;
        const nextMonth = dateFns.addMonths(currentMonth, 1);
        const nextMonthPosition = (rowsBetweenDates(startDate, nextMonth, locale) - 1) * cellHeight;
        if (dragOffset < 0) {
          if (Math.abs(dragOffset) > currentMonthPosition && dateFns.isBefore(endDate, dateFns.addMonths(currentMonth, 2))) {
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
  React.useEffect(() => {
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
    month: dateFns.startOfMonth(month),
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
  const days = dateFns.eachDayOfInterval({
    start: startDate,
    end: endDate
  }).map(date => {
    return /*#__PURE__*/React__default.createElement(CalendarDay, {
      date: date,
      height: cellHeight,
      key: dateFns.lightFormat(date, 'yyyy-MM-dd'),
      locale: locale,
      modifiers: _objectSpread2(_objectSpread2({}, computeModifiers(modifiers, date)), {}, {
        outside: !dateFns.isSameMonth(date, month),
        wide: isWide
      }),
      modifiersClassNames: modifiersClassNames,
      onHover: onDayHover,
      onClick: onDayClick
    });
  });
  return /*#__PURE__*/React__default.createElement("div", {
    className: "nice-dates-grid",
    style: {
      height: cellHeight * 6
    }
  }, /*#__PURE__*/React__default.createElement("div", {
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
  locale: propTypes.object.isRequired,
  month: propTypes.instanceOf(Date).isRequired,
  modifiers: propTypes.objectOf(propTypes.func),
  modifiersClassNames: propTypes.objectOf(propTypes.string),
  onMonthChange: propTypes.func.isRequired,
  onDayHover: propTypes.func,
  onDayClick: propTypes.func,
  transitionDuration: propTypes.number,
  touchDragEnabled: propTypes.bool
};

function CalendarWeekHeader(_ref) {
  let {
    locale,
    weekdayFormat = 'eee'
  } = _ref;
  const today = new Date();
  const weekDays = dateFns.eachDayOfInterval({
    start: dateFns.startOfWeek(today, {
      locale
    }),
    end: dateFns.endOfWeek(today, {
      locale
    })
  }).map(date => dateFns.format(date, weekdayFormat, {
    locale
  }));
  return /*#__PURE__*/React__default.createElement("div", {
    className: "nice-dates-week-header"
  }, weekDays.map(day => /*#__PURE__*/React__default.createElement("span", {
    key: day,
    className: "nice-dates-week-header_day"
  }, day)));
}
CalendarWeekHeader.propTypes = {
  locale: propTypes.object.isRequired,
  weekdayFormat: propTypes.string
};

const isSelectable = (date, _ref) => {
  let {
    minimumDate,
    maximumDate
  } = _ref;
  return !dateFns.isBefore(date, dateFns.startOfDay(minimumDate)) && !dateFns.isAfter(date, maximumDate);
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
const setTime = (date, dateWithTime) => dateFns.set(date, {
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
  return dateFns.differenceInDays(dateFns.startOfDay(endDate), dateFns.startOfDay(startDate)) >= minimumLength && (!maximumLength || dateFns.differenceInDays(dateFns.startOfDay(endDate), dateFns.startOfDay(startDate)) <= maximumLength);
};

function useControllableState(value, onChange, intitialValue) {
  const [state, setState] = React.useState(intitialValue);
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
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, dateFns.startOfMonth(new Date()));
  const modifiers = mergeModifiers({
    disabled: date => !isSelectable(date, {
      minimumDate,
      maximumDate
    })
  }, receivedModifiers);
  return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(CalendarNavigation, {
    locale: locale,
    minimumDate: minimumDate,
    maximumDate: maximumDate,
    month: month,
    onMonthChange: setMonth
  }), /*#__PURE__*/React__default.createElement(CalendarWeekHeader, {
    locale: locale,
    weekdayFormat: weekdayFormat
  }), /*#__PURE__*/React__default.createElement(CalendarGrid, {
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
  locale: propTypes.object.isRequired,
  minimumDate: propTypes.instanceOf(Date),
  maximumDate: propTypes.instanceOf(Date),
  modifiers: propTypes.objectOf(propTypes.func),
  modifiersClassNames: propTypes.objectOf(propTypes.string),
  month: propTypes.instanceOf(Date),
  onMonthChange: propTypes.func,
  onDayHover: propTypes.func,
  onDayClick: propTypes.func,
  weekdayFormat: propTypes.string,
  touchDragEnabled: propTypes.bool
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
  const isSelected = date => dateFns.isSameDay(date, selectedDate) && isSelectable(date, {
    minimumDate,
    maximumDate
  });
  const modifiers = mergeModifiers({
    selected: isSelected,
    disabled: isSelected
  }, receivedModifiers);
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, dateFns.startOfMonth(selectedDate || new Date()));
  const handleDateChange = date => {
    onDateChange(selectedDate ? setTime(date, selectedDate) : date);
  };
  return /*#__PURE__*/React__default.createElement(Calendar, {
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
  locale: propTypes.object.isRequired,
  date: propTypes.instanceOf(Date),
  month: propTypes.instanceOf(Date),
  onDateChange: propTypes.func,
  onMonthChange: propTypes.func,
  minimumDate: propTypes.instanceOf(Date),
  maximumDate: propTypes.instanceOf(Date),
  modifiers: propTypes.objectOf(propTypes.func),
  modifiersClassNames: propTypes.objectOf(propTypes.string),
  weekdayFormat: propTypes.string,
  touchDragEnabled: propTypes.bool
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
  const [hoveredDate, setHoveredDate] = React.useState();
  const [month, setMonth] = useControllableState(receivedMonth, onMonthChange, dateFns.startOfMonth(startDate || endDate || new Date()));
  const displayedStartDate = focus === START_DATE && !startDate && endDate && hoveredDate && !dateFns.isSameDay(hoveredDate, endDate) ? hoveredDate : dateFns.startOfDay(startDate);
  const displayedEndDate = focus === END_DATE && !endDate && startDate && hoveredDate && !dateFns.isSameDay(hoveredDate, startDate) ? hoveredDate : dateFns.startOfDay(endDate);
  const isStartDate = date => dateFns.isSameDay(date, displayedStartDate) && dateFns.isBefore(date, displayedEndDate);
  const isMiddleDate = date => dateFns.isAfter(date, displayedStartDate) && dateFns.isBefore(date, displayedEndDate);
  const isEndDate = date => dateFns.isSameDay(date, displayedEndDate) && dateFns.isAfter(date, displayedStartDate);
  const modifiers = mergeModifiers({
    selected: date => isSelectable(date, {
      minimumDate,
      maximumDate
    }) && (isStartDate(date) || isMiddleDate(date) || isEndDate(date) || dateFns.isSameDay(date, startDate) || dateFns.isSameDay(date, endDate)),
    selectedStart: isStartDate,
    selectedMiddle: isMiddleDate,
    selectedEnd: isEndDate,
    disabled: date => focus === START_DATE && endDate && (dateFns.differenceInDays(dateFns.startOfDay(endDate), date) < minimumLength && (!startDate || !dateFns.isAfter(date, dateFns.startOfDay(endDate))) || !startDate && maximumLength && dateFns.differenceInDays(dateFns.startOfDay(endDate), date) > maximumLength) || focus === END_DATE && startDate && (dateFns.differenceInDays(date, dateFns.startOfDay(startDate)) < minimumLength && (!endDate || !dateFns.isBefore(date, dateFns.startOfDay(startDate))) || !endDate && maximumLength && dateFns.differenceInDays(date, dateFns.startOfDay(startDate)) > maximumLength)
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
  return /*#__PURE__*/React__default.createElement(Calendar, {
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
  locale: propTypes.object.isRequired,
  startDate: propTypes.instanceOf(Date),
  endDate: propTypes.instanceOf(Date),
  focus: propTypes.oneOf([START_DATE, END_DATE]),
  month: propTypes.instanceOf(Date),
  onStartDateChange: propTypes.func,
  onEndDateChange: propTypes.func,
  onFocusChange: propTypes.func,
  onMonthChange: propTypes.func,
  minimumDate: propTypes.instanceOf(Date),
  maximumDate: propTypes.instanceOf(Date),
  minimumLength: propTypes.number,
  maximumLength: propTypes.number,
  modifiers: propTypes.objectOf(propTypes.func),
  modifiersClassNames: propTypes.objectOf(propTypes.string),
  weekdayFormat: propTypes.string,
  touchDragEnabled: propTypes.bool
};

const Popover = /*#__PURE__*/React__default.forwardRef((_ref, ref) => {
  let {
    children,
    open
  } = _ref;
  return /*#__PURE__*/React__default.createElement("div", {
    className: classnames('nice-dates-popover', {
      '-open': open
    }),
    ref: ref
  }, children);
});
Popover.displayName = 'Popover';
Popover.propTypes = {
  children: propTypes.node,
  open: propTypes.bool
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
  const formatDate = date => dateFns.format(date, formatString, {
    locale
  });
  const parseDate = dateString => dateFns.parse(dateString, formatString, selectedDate || new Date());
  const isValidAndSelectable = date => dateFns.isValid(date) && isSelectable(date, {
    minimumDate,
    maximumDate
  }) && (!validate || validate(date));
  const [value, setValue] = React.useState(isValidAndSelectable(selectedDate) ? formatDate(selectedDate) : '');
  const [focused, setFocused] = React.useState(false);
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
  React.useEffect(() => {
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
  const [isTouch, setIsTouch] = React.useState(false);
  React.useEffect(() => {
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
  const refA = React.useRef();
  const refB = React.useRef();
  const refC = React.useRef();
  React.useEffect(() => {
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
  const [month, setMonth] = React.useState(date || new Date());
  const [focused, setFocused] = React.useState(false);
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
  return /*#__PURE__*/React__default.createElement("div", {
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
  }), /*#__PURE__*/React__default.createElement(Popover, {
    open: focused,
    ref: popoverRef
  }, /*#__PURE__*/React__default.createElement(DatePickerCalendar, {
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
  children: propTypes.func.isRequired,
  locale: propTypes.object.isRequired,
  date: propTypes.instanceOf(Date),
  onDateChange: propTypes.func,
  format: propTypes.string,
  minimumDate: propTypes.instanceOf(Date),
  maximumDate: propTypes.instanceOf(Date),
  modifiers: propTypes.objectOf(propTypes.func),
  modifiersClassNames: propTypes.objectOf(propTypes.string),
  weekdayFormat: propTypes.string,
  touchDragEnabled: propTypes.bool
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
  const [focus, setFocus] = React.useState();
  const [month, setMonth] = React.useState(startDate || endDate || new Date());
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
  return /*#__PURE__*/React__default.createElement("div", {
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
  }), /*#__PURE__*/React__default.createElement(Popover, {
    open: !!focus,
    ref: popoverRef
  }, /*#__PURE__*/React__default.createElement(DateRangePickerCalendar, {
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
  children: propTypes.func.isRequired,
  locale: propTypes.object.isRequired,
  startDate: propTypes.instanceOf(Date),
  endDate: propTypes.instanceOf(Date),
  onStartDateChange: propTypes.func,
  onEndDateChange: propTypes.func,
  format: propTypes.string,
  minimumDate: propTypes.instanceOf(Date),
  maximumDate: propTypes.instanceOf(Date),
  minimumLength: propTypes.number,
  maximumLength: propTypes.number,
  modifiers: propTypes.objectOf(propTypes.func),
  modifiersClassNames: propTypes.objectOf(propTypes.string),
  weekdayFormat: propTypes.string,
  touchDragEnabled: propTypes.bool
};

exports.Calendar = Calendar;
exports.CalendarDay = CalendarDay;
exports.CalendarGrid = CalendarGrid;
exports.CalendarNavigation = CalendarNavigation;
exports.CalendarWeekHeader = CalendarWeekHeader;
exports.DatePicker = DatePicker;
exports.DatePickerCalendar = DatePickerCalendar;
exports.DateRangePicker = DateRangePicker;
exports.DateRangePickerCalendar = DateRangePickerCalendar;
exports.END_DATE = END_DATE;
exports.Popover = Popover;
exports.START_DATE = START_DATE;
exports.useDateInput = useDateInput;
