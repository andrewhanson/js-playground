import { expect } from 'chai'
import { DateTime, } from 'luxon';
import { dstData, menuScheduleData } from './scenarios';

 const timeSlotFitsInMenuScheduleLuxon = (
  timeSlot: any,
  menuSchedule: any,
  facilityTimeZone: string,
) => {
  const slotStart = DateTime.fromMillis(timeSlot.start.getTime(), { zone: facilityTimeZone});
  const slotEnd = DateTime.fromMillis(timeSlot.end.getTime(), { zone: facilityTimeZone});
  
  const menuScheduleStart = DateTime.fromMillis(menuSchedule.start.getTime(), { zone: facilityTimeZone}).set({year: slotStart.year, month: slotStart.month, day: slotStart.day})
  const menuScheduleEnd = DateTime.fromMillis(menuSchedule.end.getTime(), { zone: facilityTimeZone}).set({year: slotEnd.year, month: slotEnd.month, day: slotEnd.day})

  
  //Is timeslot on scheduled day of the week
  if(! menuSchedule.repeatOnDays.includes(slotStart.weekday - 1)) {
    return false;
  }

  //does the timeslot start in schedule time range  
  return slotStart >= menuScheduleStart && slotStart <= menuScheduleEnd;
};

describe('Luxon TimeSlot Test', () => {

  describe('Test DST transitions', () => {  
    
    dstData.scenarios.forEach((scenario) => {
      it(scenario.title, () => {
        expect(
          timeSlotFitsInMenuScheduleLuxon(
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
          timeSlotFitsInMenuScheduleLuxon(
            scenario.timeSlot,
            menuScheduleData.schedule,
            menuScheduleData.timezone,
          ),
        ).equal(scenario.result);
      });
    });
  });
})
