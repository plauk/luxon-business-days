import { DateTime } from '../node_modules/luxon/build/es6/luxon.js';
import { getEasterMonthAndDay } from './helpers.js';
import { MONTH, ONE_WEEK } from './constants.js';

export const isNewYearsDay = function(inst) {
  const matchesMonth = inst.month === 1;
  const matchesDay = inst.day === 1;

  return matchesMonth && matchesDay;
};

// third Monday in January
export const isMLKDay = function(inst) {
  if (!getDoMonthsMatch(inst.month, MONTH.january)) {
    return false;
  }

  const mlkDay = getNthTargetDayOfMonth({
    n: 3,
    day: 1,
    month: MONTH.january,
    year: inst.year,
  });

  const matchesMonth = inst.month === mlkDay.month;
  const matchesDay = inst.day === mlkDay.day;

  return matchesMonth && matchesDay;
};

// first Sunday after the Full Moon date, that falls on or after March 21
export const isEasterDay = function(inst) {
  const instanceYear = inst.year;
  const [
    easterMonthForInstanceYear,
    easterDayForInstanceYear,
  ] = getEasterMonthAndDay(instanceYear);
  const easterDay = DateTime.fromObject({
    year: instanceYear,
    month: easterMonthForInstanceYear,
    day: easterDayForInstanceYear,
  });

  const matchesMonth = inst.month === easterDay.month;
  const matchesDay = inst.day === easterDay.day;

  return matchesMonth && matchesDay;
};

// last Monday of May
export const isMemorialDay = function(inst) {
  const DAYS_IN_MAY = 31;

  if (!getDoMonthsMatch(inst.month, MONTH.may)) {
    return false;
  }

  const instanceYear = inst.year;
  const lastDayInMay = DateTime.fromObject({
    year: instanceYear,
    month: MONTH.may,
    day: DAYS_IN_MAY,
  });
  const weekday = lastDayInMay.weekday;
  const memorialDay = lastDayInMay.minus({ days: weekday - 1 });

  const matchesMonth = inst.month === memorialDay.month;
  const matchesDay = inst.day === memorialDay.day;

  return matchesMonth && matchesDay;
};

export const isIndependanceDay = function(inst) {
  const matchesMonth = inst.month === 7;
  const matchesDay = inst.day === 4;

  return matchesMonth && matchesDay;
};

// first Monday in September
export const isLaborDay = function(inst) {
  if (!getDoMonthsMatch(inst.month, MONTH.september)) {
    return false;
  }

  const instanceYear = inst.year;
  const firstDayInSeptember = DateTime.fromObject({
    year: instanceYear,
    month: MONTH.september,
    day: 1,
  });
  const weekday = firstDayInSeptember.weekday;
  const isFirstDayLaborDay = weekday === 1;
  const laborDay = isFirstDayLaborDay
    ? firstDayInSeptember
    : firstDayInSeptember.plus({ days: 8 - weekday });

  const matchesMonth = inst.month === laborDay.month;
  const matchesDay = inst.day === laborDay.day;

  return matchesMonth && matchesDay;
};

// second Monday of October
export const isColumbusDay = function(inst) {
  if (!getDoMonthsMatch(inst.month, MONTH.october)) {
    return false;
  }

  const columbusDay = getNthTargetDayOfMonth({
    n: 2,
    day: 1,
    month: MONTH.october,
    year: inst.year,
  });

  const matchesMonth = inst.month === columbusDay.month;
  const matchesDay = inst.day === columbusDay.day;

  return matchesMonth && matchesDay;
};

// fourth Thursday in November
export const isThanksgivingDay = function(inst) {
  if (!getDoMonthsMatch(inst.month, MONTH.november)) {
    return false;
  }

  const thanksgivingDay = getNthTargetDayOfMonth({
    n: 4,
    day: 4,
    month: MONTH.november,
    year: inst.year,
  });

  const matchesMonth = inst.month === thanksgivingDay.month;
  const matchesDay = inst.day === thanksgivingDay.day;

  return matchesMonth && matchesDay;
};

export const isChristmasDay = function(inst) {
  const matchesMonth = inst.month === 12;
  const matchesDay = inst.day === 25;

  return matchesMonth && matchesDay;
};

function getDoMonthsMatch(instanceMonth, month) {
  return instanceMonth === month;
}

function getNthTargetDayOfMonth({ n, day, month, year }) {
  const firstDayOfMonth = DateTime.fromObject({
    day: 1,
    month,
    year,
  });

  // is target day before or after first day
  const offsetThreshold = firstDayOfMonth.weekday - day;
  let offsetFromTargetDay = null;
  if (offsetThreshold > 0) {
    // get to target day if target is after first day
    offsetFromTargetDay = ONE_WEEK - offsetThreshold;
  } else {
    // reverse threshold to get to target from first day
    offsetFromTargetDay = offsetThreshold * -1;
  }

  const firstOccurenceOfTargetDay = firstDayOfMonth.plus({
    days: offsetFromTargetDay,
  });
  const nthDay = firstOccurenceOfTargetDay.plus({
    days: (n - 1) * ONE_WEEK,
  });

  return nthDay;
}
