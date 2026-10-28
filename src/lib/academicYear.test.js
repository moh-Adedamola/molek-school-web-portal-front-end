import { test } from 'node:test';
import assert from 'node:assert/strict';
import { academicYear } from './academicYear.js';

test('academic year turns over in September', () => {
    assert.equal(academicYear(new Date(2026, 7, 31)), '2025/2026');
    assert.equal(academicYear(new Date(2026, 8, 1)), '2026/2027');
    assert.equal(academicYear(new Date(2026, 9, 28)), '2026/2027');
    assert.equal(academicYear(new Date(2027, 2, 15)), '2026/2027');
});
