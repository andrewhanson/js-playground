export const scenarios = [
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