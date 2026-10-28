/** The school year runs September to August: 15 Oct 2026 -> "2026/2027", 15 Mar 2027 -> "2026/2027". */
export function academicYear(date = new Date()) {
    const y = date.getFullYear();
    return date.getMonth() >= 8 ? `${y}/${y + 1}` : `${y - 1}/${y}`;
}
