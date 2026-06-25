# Sentinel Journal

## 2025-05-22 - Redact sensitive headers in webhook logs
**Vulnerability:** The `logWebhookEvent` function was logging and persisting sensitive HTTP headers (e.g., `x-kkiapay-secret`, `x-fedapay-signature`, `authorization`) in plain text to the KV store. These logs were accessible via admin endpoints, risking credential leakage.
**Learning:** Webhook logging often captures full request state for debugging, but without a whitelist or blacklist for sensitive fields, it easily collects secrets provided by PSPs or auth tokens.
**Prevention:** Always use a redaction mechanism (e.g., a `sensitive` Set or a whitelist) when logging request headers or bodies, especially in systems where logs are persisted and accessible to various operators.
