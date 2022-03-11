import { NextFunction, Request, Response } from 'express'
import { ApplicationContext } from 'src/types/context'
import { Clock } from 'clock-joda'
import { Instant, ChronoUnit } from '@js-joda/core'

/**
 * Middelware to setup the application request context
 */
export default async(req: Request, res:Response, next: NextFunction) => {
  try{
    const facilityId = (req.headers.facility_id as string)
    const tz = (req.headers.timezone as string) || 'UTC'

    let now:Instant|null = null

    let offsetHours:any =(req.headers.offset_hours as string) || undefined //ToDo: feature flag
    if(offsetHours){
      offsetHours = parseInt(offsetHours)
      now = Instant.now().plus(offsetHours, ChronoUnit.HOURS)
    }

    const clock = new Clock(tz, now)

    const context:ApplicationContext = {
      facilityId,
      clock 
    }

    req.context = context

    next()
  }
  catch(err){
    next(err)
  }
}