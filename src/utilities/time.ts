import {
  differenceInHours,
  formatDistanceToNow,
  formatRelative,
} from 'date-fns';

export const formatTimestamp = (time: string) => {
  // Return distance as "10 minutes ago" if time is less than work day

  if (differenceInHours(new Date(time), new Date()) < 8) {
    return formatDistanceToNow(new Date(time));
  }
  return formatRelative(new Date(time), new Date());
};
