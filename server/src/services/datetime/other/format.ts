import { DateTime } from 'luxon'
import parse from './parse'

export default {
  toMDTG: function (datetime:string) {
    let dt = parse.asDateTime(datetime)
    if (!dt.isValid) {
      return ''
    }

    dt = dt.setZone('utc')
    /*eslint-disable */
    return dt.toFormat('dd\' \'HHmm\'Z\'\' \'MMM\' \'yy').toUpperCase()
    /*eslint-enable */
  },
  toLocal: function (datetime:string, format?:object) {
    const dt = parse.asDateTime(datetime)

    if (!dt.isValid) {
      return ''
    }

    format = format || Object.assign(DateTime.DATETIME_MED, DateTime.TIME_24_SIMPLE)
    return dt.toLocaleString(format)
  },
  toISO: function (datetime:string) {
    const date = parse.asDateTime(datetime).toISO()
    return date
  }
}
