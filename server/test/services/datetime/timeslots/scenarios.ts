
const createSchedule = (
  start: Date,
  end: Date,
  repeatOnDays: number[],
): any => ({
  start,
  end,
  repeatOnDays,
  id: 'id',
  name: 'Test',
  isActive: true,
  facilityId: 'facility-test',
  kitchenId: 'kitchen-id',
  sortedCategoryIds: [],
  type: 'REGULAR',
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const dstData = {
  timezone: 'America/Boise',
  schedule: createSchedule(
    new Date('2022-01-01T10:00:00.000Z'), // '2022-01-01T03:00:00.000[America/Boise]'
    new Date('2023-01-01T14:00:00.000Z'), // '2022-01-01T07:00:00.000[America/Boise]'
    [0, 1, 2, 3, 4, 5, 6],
  ),
  scenarios: [
    {
      title: 'DST Before',
      timeSlot: {
        start: new Date('2022-02-12T10:00:00.000Z'),
        end: new Date('2022-02-12T10:30:00.000Z'),
      },
      result: true
    },
    {
      title: 'DST starts at same time',
      timeSlot: {
        start: new Date('2022-03-13T10:00:00.000Z'),
        end: new Date('2022-03-13T19:30:00.000Z'),
      },
      result: true
    },
    {
      title: 'DST Begin - starts 30 min early',
      timeSlot: {
        start: new Date('2022-03-13T08:30:00.000Z'), // '2022-03-13T02:30:00.000[America/Boise]'
        end: new Date('2022-03-13T14:30:00.000Z'),
      },
      result: false,
    },
    {
      title: 'DST Begin - starts an hour early',
      timeSlot: {
        start: new Date('2022-03-13T08:00:00.000Z'), // '2022-03-13T02:30:00.000[America/Boise]'
        end: new Date('2022-03-13T14:30:00.000Z'),
      },
      result: false,
    },
    {
      title: 'DST Begin - starts at end time',
      timeSlot: {
        start: new Date('2022-03-13T13:00:00.000Z'),
        end: new Date('2022-03-13T13:30:00.000Z'),
      },
      result: true,
    },   
    {
      title: 'DST on Sunday change',
      timeSlot: {
        start: new Date('2022-03-13T10:00:00.000Z'),
        end: new Date('2022-03-13T10:30:00.000Z'),
      },
      result: true
    },
    {
      title: 'DST after',
      timeSlot: {
        start: new Date('2022-05-13T10:00:00.000Z'),
        end: new Date('2022-05-13T10:30:00.000Z'),
      },
      result: true
    },
    {
      title: 'DST on Sunday end',
      timeSlot: {
        start: new Date('2022-11-06T13:00:00.000Z'),
        end: new Date('2022-11-06T13:30:00.000Z'),
      },
      result: true
    },
    {
      title: 'DST End - starts at end time',
      timeSlot: {
        start: new Date('2022-11-06T14:00:00.000Z'),
        end: new Date('2022-11-06T14:30:00.000Z'),
      },
      result: true,
    },
    {
      title: 'DST End - starts at an hour late',
      timeSlot: {
        start: new Date('2022-11-06T15:00:00.000Z'),
        end: new Date('2022-11-06T15:30:00.000Z'),
      },
      result: false,
    },
  ]
}

export const menuScheduleData = {
  timezone: 'Europe/Prague',
  schedule: createSchedule(
    new Date('2021-08-20T01:00:00.000Z'),
    new Date('2021-08-20T02:00:00.000Z'),
    [0, 1, 2, 3, 4, 5, 6],
  ),
  scenarios: [
    {
      title: 'Starts totally before',
      timeSlot: {
        start: new Date('2021-08-20T00:30:00.000Z'),
        end: new Date('2021-08-20T00:59:00.000Z'),
      },
      result: false,
    },
    {
      title: 'Starts partially before',
      timeSlot: {
        start: new Date('2021-08-20T00:30:00.000Z'),
        end: new Date('2021-08-20T01:30:00.000Z'),
      },
      result: false,
    },
    {
      title: 'Starts at the same time',
      timeSlot: {
        start: new Date('2021-08-20T01:00:00.000Z'),
        end: new Date('2021-08-20T01:30:00.000Z'),
      },
      result: true,
    },
    {
      title: 'Ends at the same time',
      timeSlot: {
        start: new Date('2021-08-20T01:30:00.000Z'),
        end: new Date('2021-08-20T02:00:00.000Z'),
      },
      result: true,
    },
    {
      title: 'Starts at the same time & ends at the same time',
      timeSlot: {
        start: new Date('2021-08-20T01:00:00.000Z'),
        end: new Date('2021-08-20T02:00:00.000Z'),
      },
      result: true,
    },
    {
      title: 'Starts after',
      timeSlot: {
        start: new Date('2021-08-20T02:01:00.000Z'),
        end: new Date('2021-08-20T02:30:00.000Z'),
      },
      result: false,
    },
    {
      title: 'Ends after',
      timeSlot: {
        start: new Date('2021-08-20T01:30:00.000Z'),
        end: new Date('2021-08-20T02:01:00.000Z'),
      },
      result: true,
    },
    {
      title: 'Starts before & ends after',
      timeSlot: {
        start: new Date('2021-08-20T00:30:00.000Z'),
        end: new Date('2021-08-20T02:30:00.000Z'),
      },
      result: false,
    },
    {
      title: 'In between',
      timeSlot: {
        start: new Date('2021-08-20T01:15:00.000Z'),
        end: new Date('2021-08-20T01:45:00.000Z'),
      },
      result: true,
    },
  ]
}