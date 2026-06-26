## 2025-05-14 - Redact sensitive headers in webhook logs
**Vulnerability:** Webhook logs were capturing and storing sensitive authentication tokens and provider secrets in plain text.
**Learning:** The `logWebhookEvent` function was iterating over all request headers and storing them without filtering, which could lead to credential leakage if logs are accessed.
**Prevention:** Implement a blocklist for headers in logging functions and redact sensitive ones like `Authorization`, `X-Kkiapay-Secret`, etc.
