## 2024-05-24 - Conversational UX Pattern for Multi-line Input
**Learning:** For multi-line text areas used in conversational/chat interfaces, requiring users to explicitly click a submit button breaks flow. Users expect "Enter" to send and "Shift+Enter" to add newlines.
**Action:** Always implement `onKeyDown` listeners on textareas used for natural language queries to intercept `Enter` for submission while allowing `Shift+Enter` for multiline input. Add clear `<kbd>` shortcut hints to ensure discoverability.
