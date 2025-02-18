import { 
  format as dateFnsFormat,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isThisWeek,
  isBefore,
  parseISO,
  addDays,
  isWithinInterval
} from 'date-fns';

export const format = (date, formatStr) => {
  try {
    return dateFnsFormat(date, formatStr);
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
};

export {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isThisWeek,
  isBefore,
  parseISO,
  addDays,
  isWithinInterval
}; 