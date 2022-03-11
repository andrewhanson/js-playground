import assert from 'assert'
import { DateTime } from 'luxon'
import { addDays, addMinutes, daysToWeeks } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

import { ChronoField, Instant, LocalDateTime, ZonedDateTime, ZoneId } from '@js-joda/core'
require("@js-joda/timezone");

describe ( 'DateTime Manipulation', function(){
  
  const DAY_IN_MINUTES = 23 * 60 + 59;
  const tz = 'America/New_York'
  const days = 1

  describe('addMinutes', function(){
    describe('DST Boundary - Start', function(){
      /**
       * date-fns creates new JS Date objects with differ
       */
      xit('date-fns', function(){
        const dayStart  =  new Date('2022-03-13T00:00:00.000-05:00')
        
        const startInUtc = zonedTimeToUtc(dayStart, tz);
        const endInUtc = addMinutes(startInUtc, DAY_IN_MINUTES )
        const endInTz = utcToZonedTime(endInUtc, tz)

        assert.equal(startInUtc.getHours(), 0, `${startInUtc} startInUtc : ${dayStart} dayStart`)
        assert.equal(endInTz.getHours(), 11)
        assert.equal(endInTz.getMinutes(), 59)
      })
    })
  })

  describe ( 'addDays - standard', function(){
    const startUtc  = '2022-01-12T17:00:00.000Z'
    const expected = `2022-01-13T12:00:00`

    it('date-fns', function(){
      const local = new Date(startUtc)
      const result = addDays(local, days)

      assert.equal(result.getHours(), local.getHours())
      assert.equal(result.getMinutes(), local.getMinutes())

      // assert.equal(result, e)
    })

    it('luxon', function(){
      const date = DateTime.fromISO(startUtc)
      const local = date.setZone(tz)
      const result = local.plus({ days: days})
      const e = DateTime.fromISO(expected, { zone: tz})

      assert.ok(result.equals(e))
    })

    it('js-joda', function(){
      const local = ZonedDateTime.parse(startUtc).withZoneSameInstant(ZoneId.of(tz))
      const result = local.plusDays(days)
      const e = LocalDateTime.parse(expected).atZone(ZoneId.of(tz))

      assert.ok(result.equals(e))
    })

  })

  describe ( 'addDays - DST Boundary Start', function(){
    const startUtc  = '2022-03-12T10:00:00Z'
    const expected = `2022-03-13T05:00:00`

    it('date-fns', function(){
      const local = new Date(startUtc)
      const result = addDays(local, days)

      assert.equal(result.getHours(), local.getHours())
      assert.equal(result.getMinutes(), local.getMinutes())
    })

    it('luxon', function(){
      const date = DateTime.fromISO(startUtc)
      const local = date.setZone(tz)
      const result = local.plus({ days: days})
      const e = DateTime.fromISO(expected, { zone: tz})

      assert.equal(local.hour, result.hour)
      assert.equal(local.minute, result.minute)
      assert.ok(result.equals(e))
    })

    it('js-joda', function(){
      const local = ZonedDateTime.parse(startUtc).withZoneSameInstant(ZoneId.of(tz))
      const result = local.plusDays(days)
      const e = LocalDateTime.parse(expected).atZone(ZoneId.of(tz))

      assert.equal(local.hour, result.hour)
      assert.equal(local.minute, result.minute)
      assert.ok(result.equals(e))
    })

  })

  describe('addHours - DST Boundary', function(){
    const startUtc  = '2022-03-12T23:00:00'
    const expected = `2022-03-14T00:00:00`
    const hours = 24

    it('luxon', function(){
      const local = DateTime.fromISO(startUtc, {zone: tz})
      const result = local.plus({hours: hours})
      const e = DateTime.fromISO(expected, {zone: tz})

      assert.ok(result.isInDST)
      assert.equal(local.offset, result.offset - 60)
      assert.ok(result.equals(e), 'Result date should equal expected date')
    })
  })

  describe('ticks', function(){
     
    it('date-fns utcToZoneTime does not roundtrip', function(){
      var dt = new Date();
      var local = utcToZonedTime(dt, tz)

      // date-fns picks a new point on the global timeline when changing timezone. 
      // Serializing to ISO will provide the wrong instant
      assert.notEqual(local.getTime(), dt.getTime())
      assert.notEqual(local.toISOString(), dt.toISOString())
    })

    it('luxon', function(){
      var dt = DateTime.now()
      var local = dt.setZone(tz)

      assert.equal(local.toMillis(), dt.toMillis())
    })

    it('js-joda', function(){
      var dt = Instant.now()
      var local = ZonedDateTime.ofInstant(dt, ZoneId.of(tz))

      assert.equal(local.toInstant().toEpochMilli(), dt.toEpochMilli())

    })
  })
})