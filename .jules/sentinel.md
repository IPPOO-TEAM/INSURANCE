## 2025-05-14 - [Rate-limiting Bypass in Admin Login]
**Vulnerability:** The `guardRate` function calls in `/admin/login` and `/admin/login/2fa` had misordered arguments, passing the IP address as the `scope` but omitting the `id`, which shifted the `max` and `windowSec` arguments. This resulted in `windowSec` being undefined and `max` being set to the intended `windowSec` value (600).
**Learning:** Inconsistent function signatures for rate limiting (some taking `scope` and `id`, others just `key`) can lead to integration errors that are hard to spot without type checking or tests.
**Prevention:** Use named arguments or objects for functions with many parameters, or ensure strict TypeScript enforcement.

## 2025-05-14 - [Sensitive Header Leakage in Webhook Logs]
**Vulnerability:** The `logWebhookEvent` function captured and stored all incoming request headers, including sensitive credentials like `Authorization`, `Cookie`, and PSP-specific secret keys (`x-kkiapay-secret`, etc.), making them visible to any administrator with access to the logs.
**Learning:** Debug logging and audit trails of external requests often inadvertently capture credentials.
**Prevention:** Implement a strict allow-list or a deny-list (redaction) for headers and sensitive body fields at the point of ingestion.
