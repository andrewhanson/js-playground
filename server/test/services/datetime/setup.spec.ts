import assert from 'assert'
import { DateTime } from 'luxon'

describe("DateTime Setup", function(){
  it('luxon uses custom default tz', function(){
    var dt = DateTime.now()

    assert.equal('UTC', dt.zoneName)
  })
})