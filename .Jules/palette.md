## 2024-05-15 - Auth Forms Accessibility Improvements
**Learning:** Found that auth forms were missing htmlFor/id linking, preventing screen readers from properly associating labels with inputs, and the password toggle button was removed from the tab order.
**Action:** Added htmlFor/id to email and password inputs, removed tabIndex={-1} from password toggle, and added focus-visible styles to it.
