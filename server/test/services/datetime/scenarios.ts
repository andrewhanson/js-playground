
export const new_york = [
  {
    instant:  '1998-12-12T01:12:00.000Z',
    local:    '1998-12-11T20:12:00.000-05:00',
    desc: 'Standard - Winter'
  },
  {
    instant:  '2022-03-13T02:00:00.000Z',
    local: '2022-03-12T21:00:00.000-05:00',
    desc: 'DST Start'
  },
  {
    instant:  '2022-06-13T02:00:00.000Z',
    local: '2022-06-12T22:00:00.000-04:00',
    desc: 'Standard - Summer'
  },
  {
    instant:  '2022-11-06T02:00:00.000Z',
    local: '2022-11-05T22:00:00.000-04:00',
    desc: 'DST End'
  },
  {
    instant:  '2022-11-06T04:59:01.000Z',
    local: '2022-11-06T00:59:01.000-04:00',
    desc: 'DST End Start'
  },
  {
    instant:  '2022-11-06T06:00:00.000Z',
    local: '2022-11-06T01:00:00.000-05:00',
    desc: 'DST End Finish'
  },
]

export const addDays = {
  timeZone: 'America/New_York',
  now:  '2022-02-28T01:12:00.000',
  specs:  [
    {
      days: 3,
      expected: '2022-03-03T01:12:00.000',
      desc: 'ST - Month Boundary'
    },
    {
      timeZone: 'America/Denver',
      days: 366,
      now: '2021-03-02T01:12:00.000',
      expected: '2022-03-03T01:12:00.000',
      desc: 'ST - Year Plus 1'
    }

  ]}