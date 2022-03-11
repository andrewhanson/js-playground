import { DateTime } from 'luxon'

export default {
  now: function () {
    return DateTime.local()
  },
  utc: function () {
    return DateTime.utc()
  },
  zoneName: function () {
    return DateTime.local().zoneName
  },
  offsetName: function () {
    return DateTime.local().offsetNameShort
  }
}
