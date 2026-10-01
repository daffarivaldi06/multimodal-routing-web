## 2024-05-18 - Missing ARIA labels in components
**Learning:** Found several buttons in `QueryInput.tsx`, `Navbar.tsx`, and `LoginForm.tsx` missing `aria-label` or basic accessibility improvements. In particular, `QueryInput.tsx` has a button that has a tooltip but lacks `aria-label`, and the "Examples" buttons can be navigated by keyboard but miss visible focus rings.
**Action:** Always verify keyboard navigation and screen reader attributes on interactive elements. Ensure focus visible styles for buttons.
