import { DateTime } from 'luxon'


export class Clock {
  constructor(timeZone?: string, instant?: DateTime|string|Date|number){
    this.timeZone = timeZone ?? DateTime.local().zoneName    
    this.setInstant(instant)
  }
  
  timeZone: string
  currentInstant?: DateTime

  /**
   * Sets the current time of the clock or no value to use the current UTC time.
   * 
   * Passing a DateTime will set the time to that time. Once set the clock will not move
   * 
   * @param instant Null or current time. For example: '2020-01-01T00:00:00Z'
   */
  setInstant(instant?:DateTime|string|Date|number):void{
    if(!instant){
      return
    }
    else if(instant instanceof DateTime){
      this.currentInstant = instant as DateTime
    }
    else if(typeof instant === 'number'){
      this.currentInstant = DateTime.fromMillis(instant)
    }
    else if(instant instanceof Date){
      this.currentInstant = DateTime.fromJSDate(instant)
    }
    else{
      this.currentInstant = DateTime.fromISO(instant as string)
    }
  }
  
  /**
   * Get the current Local Time in the timezone
   * 
   * @returns Current time in the timezone
   */
  local():DateTime {
    return this.now().setZone(this.timeZone)
  }

  /**
   * Get the current time in any timezone
   * 
   * @param tz Desired timezone
   * @returns Curent time in the timezone
   */
  localInZone(tz: string):DateTime{
    return this.now().setZone(tz)
  }

  /**
   * Get the current instant (UTC)
   * @returns Current time in UTC
   */
  now():DateTime{
    return this.currentInstant ?? DateTime.utc()
  }

  /**
   * Get an arbitrary instant in the configured timezone
   * 
   * @param instant Current instant
   * @returns Time in the clock timezone
   */
  toLocalDateTime(instant:DateTime): DateTime{
    return this.toZonedDateTime(instant, this.timeZone)
  }
  
  /**
   * Convert an instant to a timezone
   * 
   * @param instant Current instant
   * @param tz Desired timezone
   * @returns Time in the passed timezone
   */
  toZonedDateTime(instant:DateTime, tz:string): DateTime{
    return instant.setZone(tz);
  }

}