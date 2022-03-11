import { Clock } from 'clock-joda'

export interface ApplicationContext {
  facilityId: string,
  clock: Clock
}

declare global{
   namespace Express {
  export interface Request {
     context?: ApplicationContext
  }
}
}