## 2024-10-03 - Multiline Inputs for AI Queries
**Learning:** For AI interface inputs that expect natural language, users strongly expect `Enter` to submit the query (conversational UX) rather than inserting a newline, even when a `textarea` is used to accommodate longer prompts. Multiline textareas often trap the user in a less intuitive workflow if `Enter` isn't intercepted.
**Action:** When implementing multiline natural language query inputs, always intercept the `Enter` key (without shift) to trigger form submission, and leave `Shift+Enter` for adding actual newlines.
