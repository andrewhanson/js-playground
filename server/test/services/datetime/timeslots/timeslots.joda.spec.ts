import { expect } from 'chai'
import { set } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { DateTime, Interval } from 'luxon';
import { dstData, menuScheduleData } from './scenarios';

import {  Instant, ZonedDateTime, ZoneId, nativeJs,ChronoUnit } from '@js-joda/core';

const timeSlotFitsInMenuScheduleJoda = (
  timeSlot: any,
  menuSchedule: any,
  facilityTimeZone: string,
) => {
  const timeSlotInTimeZone = {
    //start: ZonedDateTime.ofInstant(Instant.from(nativeJs(timeSlot.start)), ZoneId.of(facilityTimeZone)),
    start: ZonedDateTime.from(nativeJs(timeSlot.start)).withZoneSameInstant(ZoneId.of(facilityTimeZone)),
    end: ZonedDateTime.ofInstant(Instant.from(nativeJs(timeSlot.end)), ZoneId.of(facilityTimeZone)),
  };

  const menuScheduleInTimeZone = {
    start: ZonedDateTime.ofInstant(Instant.from(nativeJs(menuSchedule.start)), ZoneId.of(facilityTimeZone)),
    end: ZonedDateTime.ofInstant(Instant.from(nativeJs(menuSchedule.end)), ZoneId.of(facilityTimeZone)),
  };

  const isScheduledOnDay = menuSchedule.repeatOnDays.includes(
    timeSlotInTimeZone.start.dayOfWeek().value() - 1,
  );

  if (!isScheduledOnDay) {
    return false;
  }

  const menuScheduleStartByTimeSlot = timeSlotInTimeZone.start.withHour(menuScheduleInTimeZone.start.hour()).withMinute(menuScheduleInTimeZone.start.minute()).truncatedTo(ChronoUnit.MINUTES)

  const menuScheduleEndByTimeSlot = timeSlotInTimeZone.end.withHour(menuScheduleInTimeZone.end.hour()).withMinute(menuScheduleInTimeZone.end.minute()).truncatedTo(ChronoUnit.MINUTES)

  const isScheduledInTimeSlot =
    (timeSlotInTimeZone.start.isAfter(menuScheduleStartByTimeSlot) ||  timeSlotInTimeZone.start.equals(menuScheduleStartByTimeSlot) )&&
    (timeSlotInTimeZone.start.isBefore(menuScheduleEndByTimeSlot)  || timeSlotInTimeZone.start.equals(menuScheduleEndByTimeSlot));

  return isScheduledInTimeSlot;
};

const timeSlotFitsInMenuSchedule = (
  timeSlot: any,
  menuSchedule: any,
  facilityTimeZone: string,
) => {
  //return timeSlotFitsInMenuScheduleJoda(timeSlot, menuSchedule, facilityTimeZone)
  return timeSlotFitsInMenuScheduleLuxon(timeSlot, menuSchedule, facilityTimeZone)

  const timeSlotInTimeZone = {
    start: utcToZonedTime(timeSlot.start, facilityTimeZone),
    end: utcToZonedTime(timeSlot.end, facilityTimeZone),
  };

  const menuScheduleInTimeZone = {
    start: utcToZonedTime(menuSchedule.start, facilityTimeZone),
    end: utcToZonedTime(menuSchedule.end, facilityTimeZone),
  };

  const isScheduledOnDay = menuSchedule.repeatOnDays.includes(
    timeSlotInTimeZone.start.getDay(),
  );

  if (!isScheduledOnDay) {
    return false;
  }

  const menuScheduleStartByTimeSlot = set(timeSlotInTimeZone.start, {
    hours: menuScheduleInTimeZone.start.getHours(),
    minutes: menuScheduleInTimeZone.start.getMinutes(),
    seconds: 0,
    milliseconds: 0,
  });

  const menuScheduleEndByTimeSlot = set(timeSlotInTimeZone.end, {
    hours: menuScheduleInTimeZone.end.getHours(),
    minutes: menuScheduleInTimeZone.end.getMinutes(),
    seconds: 0,
    milliseconds: 0,
  });

  const isScheduledInTimeSlot =
    timeSlotInTimeZone.start.getTime() >= menuScheduleStartByTimeSlot.getTime() &&
    timeSlotInTimeZone.start.getTime() <= menuScheduleEndByTimeSlot.getTime();

  return isScheduledInTimeSlot;
};

/**
 * 
 * @param timeSlot 
 * @param menuSchedule 
 * @param facilityTimeZone 
 * @returns 
 */
 const timeSlotFitsInMenuScheduleLuxon = (
  timeSlot: any,
  menuSchedule: any,
  facilityTimeZone: string,
) => {
  const slotStart = DateTime.fromMillis(timeSlot.start.getTime(), { zone: facilityTimeZone});
  const slotEnd = DateTime.fromMillis(timeSlot.end.getTime(), { zone: facilityTimeZone});
    const menuScheduleStart = DateTime.fromMillis(menuSchedule.start.getTime(), { zone: facilityTimeZone}).set({year: slotStart.year, month: slotStart.month, day: slotStart.day})
  const menuScheduleEnd = DateTime.fromMillis(menuSchedule.end.getTime(), { zone: facilityTimeZone}).set({year: slotEnd.year, month: slotEnd.month, day: slotEnd.day})

  //Is timeslot on schedule day of the week
  if(! menuSchedule.repeatOnDays.includes(slotStart.weekday - 1)) {
    return false;
  }

  //Is timeslot in schedule time range
  //return Interval.fromDateTimes(menuScheduleStart, menuScheduleEnd).contains(slotStart);
  return slotStart >= menuScheduleStart && slotStart <= menuScheduleEnd;
};

describe('Joda TimeSlot Test', () => {

  describe('Test DST transitions', () => {  
    
    dstData.scenarios.forEach((scenario) => {
      it(scenario.title, () => {
        expect(
          timeSlotFitsInMenuSchedule(
            scenario.timeSlot,
            dstData.schedule,
            dstData.timezone,
          ),
        ).equal(scenario.result);
      });
    });
  })

  describe('Test if time slots fits in menuSchedule', () => {   

    menuScheduleData.scenarios.forEach((scenario) => {
      it(scenario.title, () => {
        expect(
          timeSlotFitsInMenuSchedule(
            scenario.timeSlot,
            menuScheduleData.schedule,
            menuScheduleData.timezone,
          ),
        ).equal(scenario.result);
      });
    });
  });
})
