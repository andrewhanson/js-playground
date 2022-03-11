import { expect } from 'chai'
import { DateTime } from 'luxon'
import {scenarios} from './scenarios'

describe ( 'Luxon', function () {
describe('DateTime time slots', function(){  
  const tz = "America/New_York"

  describe('luxon', function(){
    scenarios.forEach((s)=> {
      it(s.title, function(){

        const start = DateTime.fromISO(s.start, { zone: s.tz})
        const end = DateTime.fromISO(s.end, { zone: s.tz})
        const diffInMinutes = end.diff(start, 'minutes').as('minutes')

        const numberSlots = Math.ceil(diffInMinutes / 30)

        expect(numberSlots).is.equal(s.numberOfSlots)

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

        expect(slots.length).is.equal(s.numberOfSlots)

      })
    })
  })

})
})