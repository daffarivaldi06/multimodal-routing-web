## 2024-05-24 - Conversational UX Pattern for Multi-line Input
**Learning:** For multi-line text areas used in conversational/chat interfaces, requiring users to explicitly click a submit button breaks flow. Users expect "Enter" to send and "Shift+Enter" to add newlines.
**Action:** Always implement `onKeyDown` listeners on textareas used for natural language queries to intercept `Enter` for submission while allowing `Shift+Enter` for multiline input. Add clear `<kbd>` shortcut hints to ensure discoverability.

## 2024-10-18 - Form Input & Error Notification Accessibility
**Learning:** Auth forms lacked proper `<label>` to `<input>` association using `htmlFor` and `id`. Also, error messages were visually present but not announced to screen readers. Finally, icon buttons (like 'Show password') were explicitly excluded from the tab sequence.
**Action:** Always map `<label htmlFor="id">` to `<input id="id">` for robust a11y. Use `role="alert"` and `aria-live="polite"` on error feedback containers. Ensure all interactive buttons, including toggle icons, remain in the tab sequence unless explicitly hidden, and apply `focus-visible` outline styles.
