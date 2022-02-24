import { Clock } from './services/datetime/clock'

export type Context = {
  facilityId: string,
  clock: Clock
}