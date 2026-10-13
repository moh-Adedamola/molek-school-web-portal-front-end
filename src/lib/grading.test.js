import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_PASS_MARK, passMarkOf, isPass, countPassed } from './grading.js';

test('falls back to 50 when the backend sends no pass mark', () => {
    assert.equal(DEFAULT_PASS_MARK, 50);
    assert.equal(passMarkOf({}), 50);
    assert.equal(passMarkOf({ pass_mark: null }), 50);
    assert.equal(passMarkOf({ pass_mark: 'x' }), 50);
});

test('uses the pass mark the backend sends', () => {
    assert.equal(passMarkOf({ pass_mark: 45 }), 45);
    assert.equal(passMarkOf({ pass_mark: '55.00' }), 55);
});

test('boundaries around the default pass mark', () => {
    for (const [score, expected] of [[44, false], [45, false], [49, false], [49.9, false], [50, true], [69, true], [70, true], [74, true], [75, true], [100, true]]) {
        assert.equal(isPass(score), expected, `score ${score}`);
    }
    assert.equal(isPass('50.00'), true);
    assert.equal(isPass(undefined), false);
});

test('counts passes row by row with each row\'s own pass mark', () => {
    const rows = [
        { total_score: 47, pass_mark: 50 },
        { total_score: 47, pass_mark: 45 },
        { total_score: 80 },
        { total_score: 12, pass_mark: 50 },
    ];
    assert.equal(countPassed(rows), 2);
    assert.equal(countPassed([]), 0);
    assert.equal(countPassed(undefined), 0);
});
