"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clock = void 0;
const core_1 = require("@js-joda/core");
require("@js-joda/timezone");
class Clock {
    constructor(timeZone, instant) {
        this.timeZone = timeZone ? core_1.ZoneId.of(timeZone) : core_1.ZonedDateTime.now().zone();
        this.setInstant(instant);
    }
    isInstant(instant) {
        return instant.toEpochMilli ? true : false;
    }
    /**
     * Sets the current time of the clock or no value to use the current UTC time.
     *
     * Passing a Instant will set the time to that time. Once set the clock will not move
     *
     * @param instant Null or current time. For example: '2020-01-01T00:00:00Z'
     */
    setInstant(instant) {
        if (!instant) {
            return;
        }
        else if (instant instanceof core_1.Instant || this.isInstant(instant)) {
            this.currentInstant = instant;
        }
        else if (typeof instant === 'number') {
            this.currentInstant = core_1.Instant.ofEpochMilli(instant);
        }
        else if (instant instanceof Date) {
            this.currentInstant = core_1.Instant.from((0, core_1.nativeJs)(instant));
        }
        else {
            this.currentInstant = core_1.Instant.parse(instant);
        }
    }
    /**
     * Get the current Local Time in the timezone
     *
     * @returns Current time in the timezone
     */
    local() {
        return this.now().atZone(this.timeZone);
    }
    /**
     * Get the current time in any timezone
     *
     * @param tz Desired timezone
     * @returns Curent time in the timezone
     */
    localInZone(tz) {
        return this.now().atZone(tz instanceof core_1.ZoneId ? tz : core_1.ZoneId.of(tz));
    }
    /**
     * Get the current instant (UTC)
     * @returns Current time in UTC
     */
    now() {
        return this.currentInstant ?? core_1.Instant.now();
    }
    /**
     * Get an arbitrary instant in the configured timezone
     *
     * @param instant Current instant
     * @returns Time in the clock timezone
     */
    toLocalDateTime(instant) {
        return this.toZonedDateTime(instant, this.timeZone);
    }
    /**
     * Convert an instant to a timezone
     *
     * @param instant Current instant
     * @param tz Desired timezone
     * @returns Time in the passed timezone
     */
    toZonedDateTime(instant, tz) {
        const zone = tz instanceof core_1.ZoneId ? tz : core_1.ZoneId.of(tz);
        return instant.atZone(zone);
    }
}
exports.Clock = Clock;
