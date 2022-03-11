import { Instant, ZonedDateTime, ZoneId } from '@js-joda/core';
import '@js-joda/timezone';
export declare class Clock {
    constructor(timeZone?: string, instant?: Instant | string | Date | number);
    timeZone: ZoneId;
    currentInstant?: Instant;
    /**
     * Sets the current time of the clock or no value to use the current UTC time.
     *
     * Passing a Instant will set the time to that time. Once set the clock will not move
     *
     * @param instant Null or current time. For example: '2020-01-01T00:00:00Z'
     */
    setInstant(instant?: Instant | string | Date | number): void;
    /**
     * Get the current Local Time in the timezone
     *
     * @returns Current time in the timezone
     */
    local(): ZonedDateTime;
    /**
     * Get the current time in any timezone
     *
     * @param tz Desired timezone
     * @returns Curent time in the timezone
     */
    localInZone(tz: string): ZonedDateTime;
    /**
     * Get the current instant (UTC)
     * @returns Current time in UTC
     */
    now(): Instant;
    /**
     * Get an arbitrary instant in the configured timezone
     *
     * @param instant Current instant
     * @returns Time in the clock timezone
     */
    toLocalDateTime(instant: Instant): ZonedDateTime;
    /**
     * Convert an instant to a timezone
     *
     * @param instant Current instant
     * @param tz Desired timezone
     * @returns Time in the passed timezone
     */
    toZonedDateTime(instant: Instant, tz: string | ZoneId): ZonedDateTime;
}
