## 2026-06-12 - Parameter Alignment in `guardRate` Security Middleware
**Vulnerability:** Misordered parameters when calling `guardRate` in `/admin/login` and `/admin/login/2fa` endpoints caused `windowSec` to be `undefined`, effectively bypassing rate limiting on admin authentication endpoints.
**Learning:** `guardRate(c, scope, id, max, windowSec)` requires `scope` and `id` as separate string parameters. Combining them (e.g., `admin-login:${ip}`) shifted parameter positions so `max` was received as `id` and `windowSec` was received as `max`.
**Prevention:** Ensure middleware helper function parameters match signature expectations across all route handlers.
