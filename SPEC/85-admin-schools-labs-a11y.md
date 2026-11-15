# 85 — Admin shells, schools detail, labs polish, a11y pass

**Status:** Implemented (2026-08)  
**Builds on:** SPEC 79–84

## Deliverables

### Admin
- `AdminShell`: PageLoading gate, skip-to-content, drawer backdrop, Escape close, `aria-current`, landmark `admin-main`, Learn back-link.
- Admin home/users/metrics/feedback/audit/content: PageLoading instead of plain text.

### Schools
- `/schools/[id]`: PageLoading, EmptyState on error, labeled create class, members/classes regions.
- `/schools/class/[classId]`: PageLoading until class data ready.

### Labs polish
- `/referrals`: Labs badge, PageLoading/EmptyState, share + toast on copy.
- `/export`: Labs badge, toast on download, EmptyState for milestones, collapsible JSON preview.

### A11y
- Stronger `--ef-ink-muted` contrast.
- Expanded `prefers-reduced-motion` (animations/transitions/scroll).
- Primary nav `aria-label` + `aria-current="page"`.
- Sticky Continue: `role="complementary"` + min touch height.
- Main content `tabIndex={-1}` for skip-link focus target.

## Non-goals
- Full WCAG AA audit report
- Admin content rewrite
