import { expect }from 'chai'
import {Clock } from '../../src/clock'
import { DateTime } from 'luxon'

describe('Clock Test', function(){

  describe('TimeZone', function(){
    const clock = new Clock('America/New_York')
    const local = clock.local()
    const expected = 'America/New_York'

    it('local', function(){
      expect(local.zoneName, expected)
    })

    
    it('localInZone', function(){
      const local = clock.localInZone('America/New_York')
      expect(local.zoneName).is.equal(expected)
    })
  })

  describe('constructor', function(){

    it('defaults to system', function(){
      const clock = new Clock();
      const tz = DateTime.local().zoneName
      const now = new Date()
      now.setMilliseconds(0)

      expect(clock.timeZone).is.equal(tz, 'Default to system timezone')
      expect(clock.now().startOf('second').toISO()).is.equal(now.toISOString(), `Default to system time`)
    })
  })

  describe('now', function(){
    const clock = new Clock('America/New_York')
    const now = clock.now()
    const system = new Date()

    it('matches system time', function(){
      const millis = 0
      const l = now.set({millisecond: millis})
      system.setMilliseconds(millis)
      
      expect(l.toISO()).is.equal( system.toISOString(), 'same ISO')
      expect(now.year).is.equal( system.getUTCFullYear(), 'same year')
      expect(now.month).is.equal( system.getUTCMonth() + 1, 'same month')
      expect(now.day).is.equal( system.getUTCDate(), 'same day')
      expect(now.hour).is.equal( system.getUTCHours(), 'same hour')
      expect(now.minute).is.equal( system.getUTCMinutes(), 'same minute')
      expect(now.second).is.equal( system.getUTCSeconds(), 'same second')
    })

    it('matches current instant', function(){
      const instant = DateTime.fromISO('2020-04-09T12:00:00Z')
      clock.setInstant(instant)

      expect(instant.toISO()).is.equal( clock.now().toISO(), 'same ISO')
    })

    it('matches supplied timezone and instant', function(){
      const clock = new Clock('America/New_York', '2020-04-09T12:00:00Z')

      expect(clock.now().toISO()).is.equal( '2020-04-09T12:00:00.000Z', 'now is same ISO')
      expect(clock.local().toISO()).is.equal( '2020-04-09T08:00:00.000-04:00', 'local is same ISO')
    })

    it('and local are same tick', function(){
      expect(clock.now().toMillis).is.equal( clock.local().toMillis, 'now and local are same tick')
    })

  })
})