## 2026-10-13 - Conversational Textarea Pattern
**Learning:** Users naturally expect chat-like interfaces for natural language queries, meaning Enter should submit and Shift+Enter should create a new line. Missing this breaks mental models. A subtle visual hint is needed to communicate this without cluttering the UI.
**Action:** Always implement Enter to submit + Shift+Enter for new lines on multi-line natural language inputs. Include a small <kbd> hint that is hidden on mobile devices.
