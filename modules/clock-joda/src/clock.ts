import { Instant, ZonedDateTime, ZoneId, convert, nativeJs } from '@js-joda/core'
import '@js-joda/timezone'


export class Clock {
  constructor(timeZone?: string, instant?: Instant|string|Date|number){
    this.timeZone = timeZone ? ZoneId.of(timeZone) :ZonedDateTime.now().zone()
    this.setInstant(instant)
  }
  
  timeZone: ZoneId
  currentInstant?: Instant

  /**
   * Sets the current time of the clock or no value to use the current UTC time.
   * 
   * Passing a Instant will set the time to that time. Once set the clock will not move
   * 
   * @param instant Null or current time. For example: '2020-01-01T00:00:00Z'
   */
  setInstant(instant?:Instant|string|Date|number):void{
    if(!instant){
      return
    }
    else if(instant instanceof Instant){
      this.currentInstant = instant as Instant
    }
    else if(typeof instant === 'number'){
      this.currentInstant = Instant.ofEpochMilli(instant) 
    }
    else if(instant instanceof Date){
      this.currentInstant = Instant.from(nativeJs(instant))
    }
    else{
      this.currentInstant = Instant.parse(instant)
    }
  }
  
  /**
   * Get the current Local Time in the timezone
   * 
   * @returns Current time in the timezone
   */
  local():ZonedDateTime {
    return this.now().atZone(this.timeZone)
  }

  /**
   * Get the current time in any timezone
   * 
   * @param tz Desired timezone
   * @returns Curent time in the timezone
   */
  localInZone(tz: string):ZonedDateTime{
    return this.now().atZone(ZoneId.of(tz))
  }

  /**
   * Get the current instant (UTC)
   * @returns Current time in UTC
   */
  now():Instant{
    return this.currentInstant ?? Instant.now()
  }

  /**
   * Get an arbitrary instant in the configured timezone
   * 
   * @param instant Current instant
   * @returns Time in the clock timezone
   */
  toLocalDateTime(instant:Instant): ZonedDateTime{
    return this.toZonedDateTime(instant, this.timeZone)
  }
  
  /**
   * Convert an instant to a timezone
   * 
   * @param instant Current instant
   * @param tz Desired timezone
   * @returns Time in the passed timezone
   */
  toZonedDateTime(instant:Instant, tz:string|ZoneId): ZonedDateTime{
    const zone = tz instanceof ZoneId ? tz : ZoneId.of(tz)
    return instant.atZone(zone)
  }

}