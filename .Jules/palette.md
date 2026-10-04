## 2024-10-04 - Conversational UX Pattern for Multi-line Inputs
**Learning:** Users naturally attempt to submit multi-line natural language queries with the `Enter` key. Forcing them to click a submit button breaks the conversational flow, but hijacking `Enter` entirely breaks the ability to use multiple lines.
**Action:** Implemented a standard conversational input pattern where `Enter` triggers submission while `Shift+Enter` allows for adding newlines. This pattern should be reused for all future conversational or chat-like interfaces in this design system.
