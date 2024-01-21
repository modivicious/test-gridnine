import { ASCENDING, DESCENDING, DURATION } from '../constants';

export const toHoursAndMinutes = (totalMinutes: number): string => {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours > 0 ? `${hours} ч ` : ''} ${minutes > 0 ? ` ${minutes} мин` : ''}`;
};

export const getSortFunctionByName = (sortName: string) => {
  switch (sortName) {
    case ASCENDING:
      return (a, b) => a.price - b.price;
    case DESCENDING:
      return (a, b) => b.price - a.price;
    case DURATION:
      return (a, b) => a.totalTravelDuration - b.totalTravelDuration;
  }
};
