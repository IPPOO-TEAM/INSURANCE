## 2025-05-30 - Sensitive Data Exposure in Webhook Logs
**Vulnerability:** Authentication tokens and provider secrets (e.g., `authorization`, `x-kkiapay-secret`) were logged in plain text within the `logWebhookEvent` function, exposing them to anyone with admin dashboard access.
**Learning:** Generic logging helpers that capture "all headers" or a broad list of metadata can inadvertently leak credentials if security-sensitive fields aren't explicitly redacted. This pattern was present in both the iterator-based and explicit header selection logic.
**Prevention:** Use a case-insensitive redaction mechanism (`toLowerCase()` check against a `sensitive` Set) for all request metadata logging to ensure defense-in-depth against credential leakage.
