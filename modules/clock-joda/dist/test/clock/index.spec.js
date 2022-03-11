"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const clock_1 = require("../../src/clock");
const core_1 = require("@js-joda/core");
describe('Clock Test', function () {
    describe('TimeZone', function () {
        const clock = new clock_1.Clock('America/New_York');
        const local = clock.local();
        const expected = 'America/New_York';
        it('local', function () {
            (0, chai_1.expect)(local.zone().id(), expected);
        });
        it('localInZone', function () {
            const local = clock.localInZone('America/New_York');
            (0, chai_1.expect)(local.zone().id()).is.equal(expected);
        });
    });
    describe('constructor', function () {
        it('defaults to system', function () {
            const clock = new clock_1.Clock();
            const tz = core_1.ZonedDateTime.now().zone().id();
            const now = new Date();
            now.setMilliseconds(0);
            (0, chai_1.expect)(clock.timeZone.id()).is.equal(tz, 'Default to system timezone');
            (0, chai_1.expect)(clock.now().with(core_1.ChronoField.MILLI_OF_SECOND, 0).toString()).is.equal(now.toISOString(), `Default to system time`);
        });
    });
    describe('now', function () {
        const clock = new clock_1.Clock('America/New_York');
        const now = clock.now();
        const system = new Date();
        it('matches system time', function () {
            const millis = 0;
            const l = now.truncatedTo(core_1.ChronoUnit.SECONDS).atZone(core_1.ZoneId.UTC);
            system.setMilliseconds(millis);
            (0, chai_1.expect)(l.toString()).is.equal(system.toISOString(), 'same ISO');
            (0, chai_1.expect)(l.year()).is.equal(system.getUTCFullYear(), 'same year');
            (0, chai_1.expect)(l.month()).is.equal(system.getUTCMonth() + 1, 'same month');
            (0, chai_1.expect)(l.dayOfWeek()).is.equal(system.getUTCDate(), 'same day');
            (0, chai_1.expect)(l.hour()).is.equal(system.getUTCHours(), 'same hour');
            (0, chai_1.expect)(l.minute()).is.equal(system.getUTCMinutes(), 'same minute');
            (0, chai_1.expect)(l.second()).is.equal(system.getUTCSeconds(), 'same second');
        });
        it('matches current instant', function () {
            const instant = core_1.Instant.parse('2020-04-09T12:00:00Z');
            clock.setInstant(instant);
            (0, chai_1.expect)(instant.toString()).is.equal(clock.now().toString(), 'same ISO');
        });
        it('matches supplied timezone and instant', function () {
            const clock = new clock_1.Clock('America/New_York', '2020-04-09T12:00:00Z');
            (0, chai_1.expect)(clock.now().toString()).is.equal('2020-04-09T12:00:00.000Z', 'now is same ISO');
            (0, chai_1.expect)(clock.local().toString()).is.equal('2020-04-09T08:00:00.000-04:00', 'local is same ISO');
        });
        it('and local are same tick', function () {
            (0, chai_1.expect)(clock.now().toEpochMilli()).is.equal(clock.local().toEpochSecond() * 1000, 'now and local are same tick');
        });
    });
});
