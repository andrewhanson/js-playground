import assert from 'assert'
import { DateTime } from 'luxon'
import { ChronoUnit, Instant, LocalDateTime, ZonedDateTime, Duration, ZoneId } from '@js-joda/core'

const scenarios = [
  {
    title: 'Standard Slots',
    start: '2022-02-14T06:00',
    end: '2022-02-15T02:00',
    slotLength: 30, // in minutes
    numberOfSlots: 40,
    tz: "America/New_York"
  },
  {
    title: 'DST Timezone Enter (New York',
    start: '2022-03-12T10:00',
    end: '2022-03-13T06:00',
    slotLength: 30, // in minutes
    numberOfSlots: 38,
    tz: "America/New_York"
  },
  {
    title: 'DST Timezone Leave (Chicago)',
    start: '2022-11-05T10:00',
    end: '2022-11-06T06:00',
    slotLength: 30, // in minutes
    numberOfSlots: 42,
    tz: "America/Chicago"
  },
  {
    title: 'Non DST Timezone (Phoenix)',
    start: '2022-11-05T10:00',
    end: '2022-11-06T06:00',
    slotLength: 30, // in minutes
    numberOfSlots: 40,
    tz: "America/Phoenix"
  },
  {
    title: 'Non DST Timezone (Reykjavik)',
    start: '2022-10-29T10:00',
    end: '2022-10-30T06:00',
    slotLength: 30, // in minutes
    numberOfSlots: 40,
    tz: "Atlantic/Reykjavik"
  },
  {
    title: 'DST Timezone (Prague)',
    start: '2022-10-29T10:00',
    end: '2022-10-30T06:00',
    slotLength: 30, // in minutes
    numberOfSlots: 42,
    tz: "Europe/Prague"
  }
]

describe('DateTime time slots', function(){  
  const tz = "America/New_York"

  describe('luxon', function(){
    scenarios.forEach((s)=> {
      it(s.title, function(){

        const start = DateTime.fromISO(s.start, { zone: s.tz})
        const end = DateTime.fromISO(s.end, { zone: s.tz})
        const diffInMinutes = end.diff(start, 'minutes').as('minutes')

        const numberSlots = Math.ceil(diffInMinutes / 30)

        assert.equal(numberSlots, s.numberOfSlots)

        const slots: Array<any> = []

        for(let i = 0; i < numberSlots; i++){
          var slotStart = start.plus({ minutes: i * s.slotLength})
          var slotEnd = slotStart.plus({ minutes: s.slotLength - 1}).endOf('minute')

          slots.push({
            "start": slotStart.toISO(),
            "end": slotEnd.toISO(),
            "startUtc": slotStart.toUTC().toISO(),
            "endUtc": slotEnd.toUTC().toISO()
          })
        }

        assert.equal(slots.length, s.numberOfSlots)

      })
    })
  })

  describe('js-joda', function(){
    var endOfMinute = {
      adjustInto: function(t) {
        return t.withSecond(59)
      }
    };

    scenarios.forEach((s)=> {
      it(s.title, function(){
        const zone = ZoneId.of(s.tz)
        const start = LocalDateTime.parse(s.start).atZone(zone)
        const end = LocalDateTime.parse(s.end).atZone(zone)
        const diffInMinutes = start.until(end, ChronoUnit.MINUTES)
        
        const numberSlots = Math.ceil(diffInMinutes / 30)
        assert.equal(numberSlots, s.numberOfSlots)

        const slots: Array<any> = []

        for(let i = 0; i < numberSlots; i++){
           
           var slotStart = start.plusMinutes(i * s.slotLength)
           var slotEnd = slotStart.plusMinutes(s.slotLength - 1).with(endOfMinute)

           slots.push({
             "start": slotStart.toString(),
             "end": slotEnd.toString(),
             "startUtc": slotStart.toInstant().toString(),
             "endUtc": slotEnd.toInstant().toString()
           })
        }

        assert.equal(slots.length, s.numberOfSlots)

      })
    })
  })

})