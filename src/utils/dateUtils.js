import { format as dateFnsFormat } from 'date-fns/esm';
import { 
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
} from 'date-fns/esm';

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