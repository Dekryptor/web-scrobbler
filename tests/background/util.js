'use strict';

/**
 * Tests for 'util' (background) module.
 */

const expect = require('chai').expect;
const Util = require('../../src/core/background/util/util');

const HIDE_STRING_IN_TEXT_DATA = [{
	description: 'should hide string in text',
	source: 'This is a SAMPLE string',
	string: 'SAMPLE',
	expected: 'This is a xxxxxE string'
}, {
	description: 'should do nothing if string is null',
	source: 'This is a SAMPLE string',
	string: null,
	expected: 'This is a SAMPLE string'
}, {
	description: 'should do nothing if string is empty',
	source: 'This is a SAMPLE string',
	string: '',
	expected: 'This is a SAMPLE string'
}, {
	description: 'should not fall on null source string',
	source: null,
	string: null,
	expected: null
}, {
	description: 'should not fall on empty source string',
	source: '',
	string: '',
	expected: ''
}];

const HIDE_STRING_DATA = [{
	description: 'should hide string',
	source: 'Sensitive Data',
	expected: 'xxxxxtive Data'
}, {
	description: 'should hide short string',
	source: 'Test',
	expected: 'xxxx'
}, {
	description: 'should not fall on null value',
	source: null,
	expected: null
}, {
	description: 'should not fall on empty value',
	source: '',
	expected: ''
}];

const GET_SECONDS_TO_SCROBBLE_DATA = [{
	description: 'should return min time if duration is zero',
	source: 0,
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration is null',
	source: null,
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration type is not number',
	source: 'duration',
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration is NaN',
	source: NaN,
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration is +Infinity',
	source: Infinity,
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return min time if duration is -Infinity',
	source: -Infinity,
	expected: Util.DEFAULT_SCROBBLE_TIME
}, {
	description: 'should return -1 for short songs',
	source: Util.MIN_TRACK_DURATION - 1,
	expected: -1
}, {
	description: 'should return half of song duration',
	source: 190,
	expected: 95
}, {
	description: 'should return max time for long songs',
	source: Util.MAX_SCROBBLE_TIME * 2 + 1,
	expected: Util.MAX_SCROBBLE_TIME
}];

/**
 * Run all tests.
 */
function runTests() {
	describe('hideString', testHideString);
	describe('hideStringInText', testHideStringInText);
	describe('getSecondsToScrobble', testGetSecondsToScrobble);
}

/**
 * Test generic function.
 * @param  {Function} func Function to test
 * @param  {Object} testData Test data
 */
function testFunction(func, testData) {
	for (let data of testData) {
		let { description, source, expected } = data;
		let actual = func(source);

		it(description, () => {
			expect(actual).to.be.equal(expected);
		});
	}
}

/**
 * Test 'Util.hideStringInText' function.
 */
function testHideStringInText() {
	for (let data of HIDE_STRING_IN_TEXT_DATA) {
		let { description, source, expected, string } = data;
		let actual = Util.hideStringInText(string, source);

		it(description, () => {
			expect(actual).to.be.equal(expected);
		});
	}
}

/**
 * Test 'Util.hideString' function.
 */
function testHideString() {
	testFunction(Util.hideString, HIDE_STRING_DATA);
}

/**
 * Test 'Util.getSecondsToScrobble' function.
 */
function testGetSecondsToScrobble() {
	testFunction(Util.getSecondsToScrobble, GET_SECONDS_TO_SCROBBLE_DATA);
}

runTests();
