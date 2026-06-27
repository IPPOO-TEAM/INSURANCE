## 2025-05-30 - Sensitive Header Redaction in Webhook Logs
**Vulnerability:** Webhook logging in `logWebhookEvent` previously captured all headers, including sensitive ones like `Authorization`, `X-Admin-Token`, and provider-specific secret keys (e.g., `X-Kkiapay-Secret`). This could lead to credential leakage in the database logs.
**Learning:** Even diagnostic logging must be defensive. Automatically capturing all request headers is a common pattern that inadvertently includes authentication and signing secrets.
**Prevention:** Always use a whitelist or a sensitive-field blacklist when logging request/response headers. Implement case-insensitive redaction for known sensitive keys.
