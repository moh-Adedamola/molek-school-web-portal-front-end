/**
 * MOLEK grading: one source of truth for every portal screen.
 *
 * The pass mark comes from the backend (the promotion rule for the class the
 * student sat in that session) on every grades row and report card as
 * `pass_mark`. 50 is only a fallback for responses that predate that field.
 * Never hard-code 40 or 45 anywhere else: that is how the portal used to say
 * "passed" for subjects the promotion engine counted as failed.
 */
export const DEFAULT_PASS_MARK = 50;

export function passMarkOf(source) {
    const n = Number(source?.pass_mark);
    return Number.isFinite(n) && n > 0 ? n : DEFAULT_PASS_MARK;
}

export function isPass(score, passMark = DEFAULT_PASS_MARK) {
    const n = Number.parseFloat(score);
    return Number.isFinite(n) && n >= passMark;
}

export function countPassed(rows, scoreKey = 'total_score') {
    return (rows || []).filter((row) => isPass(row?.[scoreKey], passMarkOf(row))).length;
}
