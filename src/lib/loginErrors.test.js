import { test } from 'node:test';
import assert from 'node:assert/strict';
import { friendlyLoginError } from './loginErrors.js';

test('wrong details become a plain instruction', () => {
    assert.match(friendlyLoginError(new Error('Invalid admission number or password')), /wrong\. Check both/);
});
test("the school's fees message is shown as written", () => {
    const m = 'Outstanding fees. Please contact the bursary to regain portal access.';
    assert.equal(friendlyLoginError(new Error(m)), m);
});
test('network failures say what to do', () => {
    assert.match(friendlyLoginError(new TypeError('Failed to fetch')), /internet connection/);
});
test('anything else keeps the message or a safe default', () => {
    assert.equal(friendlyLoginError(new Error('Account disabled')), 'Account disabled');
    assert.match(friendlyLoginError({}), /did not work/);
});
