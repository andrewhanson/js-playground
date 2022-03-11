import { DateTime } from 'luxon'

export default {
  asDateTime: function (datetime:any) {
    if (!datetime) {
      return ''
    }

    let dt = datetime

    if (!dt.isLuxonDateTime) {
      dt = DateTime.fromISO(dt)
    }

    if (!dt.isValid) {
      return 'invalid date'
    }

    return dt
  }
}
