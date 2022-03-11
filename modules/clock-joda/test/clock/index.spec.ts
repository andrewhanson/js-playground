import { expect }from 'chai'
import {Clock } from '../../src/clock'
import { Instant, ZonedDateTime, ZoneId, ChronoUnit, DateTimeFormatter} from '@js-joda/core'
import { DateTime } from 'luxon'

describe('Clock Test', function(){
  const ISO_INSTANT_FULL = DateTimeFormatter.ofPattern('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'')
  describe('TimeZone', function(){
    const clock = new Clock('America/New_York')
    const local = clock.local()
    const expected = 'America/New_York'

    it('local', function(){
      expect(local.zone().id() , expected)
    })

    
    it('localInZone', function(){
      const local = clock.localInZone('America/New_York')
      expect(local.zone().id()).is.equal(expected)
    })
  })

  describe('constructor', function(){

    it('defaults to system', function(){
      const clock = new Clock();
      const tz = ZonedDateTime.now().zone().id()
      const now = new Date()
      now.setMilliseconds(0)

      expect(clock.timeZone.id()).is.equal(tz, 'Default to system timezone')
      expect(clock.now().truncatedTo(ChronoUnit.SECONDS).toEpochMilli()).is.equal(now.getTime(), `Default to system time`)
    })
  })

  describe('now', function(){
    const clock = new Clock('America/New_York')
    const now = clock.now()
    const system = new Date()

    it('matches system time', function(){
      const millis = 0
      const l = now.truncatedTo(ChronoUnit.SECONDS).atZone(ZoneId.UTC)
      system.setMilliseconds(millis)
      
      expect(l.year()).is.equal( system.getUTCFullYear(), 'same year')
      expect(l.month().value()).is.equal( system.getUTCMonth() + 1, 'same month')
      expect(l.dayOfMonth()).is.equal( system.getUTCDate(), 'same day')
      expect(l.hour()).is.equal( system.getUTCHours(), 'same hour')
      expect(l.minute()).is.equal( system.getUTCMinutes(), 'same minute')
      expect(l.second()).is.equal( system.getUTCSeconds(), 'same second')
    })

    it('matches current instant', function(){
      const instant = Instant.parse('2020-04-09T12:00:00Z')
      clock.setInstant(instant)

      expect(instant.toString()).is.equal( clock.now().toString(), 'same ISO')
    })

    it('matches supplied timezone and instant', function(){
      const clock = new Clock('America/New_York', '2020-04-09T12:00:00Z')

      expect(clock.now().toString()).is.equal( '2020-04-09T12:00:00Z', 'now is same ISO')
      expect(clock.local().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME)).is.equal( '2020-04-09T08:00:00-04:00', 'local is same ISO')
    })

    it('and local are same tick', function(){
      expect(clock.now().toEpochMilli()).is.equal( clock.local().toEpochSecond() * 1000, 'now and local are same tick')
    })

  })
})