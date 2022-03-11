import { expect } from 'chai'
import { set } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { dstData, menuScheduleData } from './scenarios';

const timeSlotFitsInMenuSchedule = (
  timeSlot: any,
  menuSchedule: any,
  facilityTimeZone: string,
) => {
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


describe('Date-Fns TimeSlot Test', () => {

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
