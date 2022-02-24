import assert, { AssertionError } from 'assert'
import {Clock } from '../../../src/services/datetime/clock'
import { DateTime } from 'luxon'

describe('Clock Test', function(){

  describe('TimeZone', function(){
    const clock = new Clock('America/New_York')
    const local = clock.local()
    const expected = 'America/New_York'

    it('local', function(){
      assert.equal(local.zoneName, expected)
    })

    
    it('localInZone', function(){
      const local = clock.localInZone('America/New_York')
      assert.equal(local.zoneName, expected)
    })
  })

  describe('constructor', function(){

    it('defaults to system', function(){
      const clock = new Clock();
      const tz = DateTime.local().zoneName

      assert.equal(clock.timeZone, tz, 'Default to system timezone')
      assert.equal(clock.now().toISO(), (new Date()).toISOString(), 'Default to system time')
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
      
      assert.equal(l.toISO(), system.toISOString(), 'same ISO')
      assert.equal(now.year, system.getUTCFullYear(), 'same year')
      assert.equal(now.month, system.getUTCMonth() + 1, 'same month')
      assert.equal(now.day, system.getUTCDate(), 'same day')
      assert.equal(now.hour, system.getUTCHours(), 'same hour')
      assert.equal(now.minute, system.getUTCMinutes(), 'same minute')
      assert.equal(now.second, system.getUTCSeconds(), 'same second')
    })

    it('matches current instant', function(){
      const instant = DateTime.fromISO('2020-04-09T12:00:00Z')
      clock.setInstant(instant)

      assert.equal(instant.toISO(), clock.now().toISO(), 'same ISO')
    })

    it('matches supplied timezone and instant', function(){
      const clock = new Clock('America/New_York', '2020-04-09T12:00:00Z')

      assert.equal(clock.now().toISO(), '2020-04-09T12:00:00.000Z', 'now is same ISO')
      assert.equal(clock.local().toISO(), '2020-04-09T08:00:00.000-04:00', 'local is same ISO')
    })

    it('and local are same tick', function(){
      assert.equal(clock.now().toMillis, clock.local().toMillis, 'now and local are same tick')
    })

  })
})