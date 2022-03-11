import { expect } from 'chai'
import { DateTime } from 'luxon'

describe ( 'Luxon', function () {
describe ( 'DateTime Manipulation', function(){
  
  const DAY_IN_MINUTES = 23 * 60 + 59;
  const tz = 'America/New_York'
  const days = 1

  describe ( 'addDays - standard', function(){
    const startUtc  = '2022-01-12T17:00:00.000Z'
    const expected = `2022-01-13T12:00:00`

    it('luxon', function(){
      const date = DateTime.fromISO(startUtc)
      const local = date.setZone(tz)
      const result = local.plus({ days: days})
      const e = DateTime.fromISO(expected, { zone: tz})

      expect(result.equals(e)).is.true
    })


  })

  describe ( 'addDays - DST Boundary Start', function(){
    const startUtc  = '2022-03-12T10:00:00Z'
    const expected = `2022-03-13T05:00:00`

    it('luxon', function(){
      const date = DateTime.fromISO(startUtc)
      const local = date.setZone(tz)
      const result = local.plus({ days: days})
      const e = DateTime.fromISO(expected, { zone: tz})

      expect(local.hour).to.equal(result.hour)
      expect(local.minute).to.equal(result.minute)
      expect(result.equals(e)).is.true
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

      expect(result.isInDST).is.true
      expect(local.offset).to.equal(result.offset - 60, 'Result date should equal expected date')
      expect(result.equals(e)).is.true 
    })
  })

  describe('ticks', function(){

    it('luxon', function(){
      var dt = DateTime.now()
      var local = dt.setZone(tz)

      expect(local.toMillis()).to.equal(dt.toMillis())
    })

  })
})
})