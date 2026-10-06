## 2024-05-24 - Accessibility and Character Limits
**Learning:** Character counts indicating maximum/minimum thresholds for textareas are critical for screen reader users and need `aria-live="polite"` so changes are announced without interrupting. Similarly, helper text such as "Min 10 characters" needs to be programmatically associated with the input using `aria-describedby`.
**Action:** When adding validation boundaries to forms or inputs, consistently apply `aria-describedby` to the constraint text and use `aria-live="polite"` for dynamic character counts.
