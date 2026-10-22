## 2024-05-24 - Conversational UX Pattern for Multi-line Input
**Learning:** For multi-line text areas used in conversational/chat interfaces, requiring users to explicitly click a submit button breaks flow. Users expect "Enter" to send and "Shift+Enter" to add newlines.
**Action:** Always implement `onKeyDown` listeners on textareas used for natural language queries to intercept `Enter` for submission while allowing `Shift+Enter` for multiline input. Add clear `<kbd>` shortcut hints to ensure discoverability.

## 2025-02-12 - Hidden Labels in Responsive Design
**Learning:** Responsive classes like `hidden sm:block` on button labels create inaccessible icon-only buttons on small screens. When the text is hidden visually, it is also hidden from screen readers.
**Action:** Always provide an `aria-label` on buttons with responsively hidden text, and use `aria-hidden="true"` on the text element itself to prevent duplicate reading when visible.
