import { NextFunction, Request, Response } from 'express'
import { LuxonClock } from '../services/datetime/clock'

export default async(req: Request, res:Response, next: NextFunction) => {

  const facilityId = (req.headers.facility_id as string)
  const tz = (req.headers.timezone as string) || 'utc'

  let offsetHours:any =(req.headers.offset_hours as string) || undefined //ToDo: feature flag
  if(offsetHours){
    offsetHours = parseInt(offsetHours)
  }

  const clock = new LuxonClock(tz, offsetHours)

    const context = {
      facilityId,
      clock 
    }

    req.appContext = context

    next()
}