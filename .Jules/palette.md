## 2026-10-07 - Conversational Textarea Inputs
**Learning:** Multi-line natural language inputs intended for AI chat/queries should follow conversational mental models where `Enter` submits the form and `Shift+Enter` adds a newline, rather than standard textarea behavior.
**Action:** Always intercept `Enter` without `Shift` on textareas used for conversational AI queries to trigger form submission.
