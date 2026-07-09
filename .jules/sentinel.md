# Sentinel's Journal - Critical Security Learnings

## 2026-07-09 - [Missing Redaction of Sensitive Headers in Webhook Logs]
**Vulnerability:** Webhook logs were capturing and storing sensitive headers such as `Authorization` and `X-Kkiapay-Secret` in plain text.
**Learning:** The initial implementation of `logWebhookEvent` prioritized visibility for debugging but lacked a security filter for sensitive data.
**Prevention:** Always use a allowlist or denylist (like `SENSITIVE_HEADERS`) when logging request headers to ensure credentials and secrets are redacted before persistence.
