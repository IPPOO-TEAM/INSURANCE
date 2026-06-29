## 2025-05-30 - Webhook Header Redaction
**Vulnerability:** Plaintext logging of sensitive headers in webhook event logs.
**Learning:** Webhook logging often captures full request details for debugging, but this can inadvertently include secrets like API keys, signatures, and authorization tokens. In this repo, `logWebhookEvent` was specifically capturing `x-kkiapay-secret` and potentially `Authorization` headers without redaction.
**Prevention:** Always use a whitelist or blacklist of headers for logging. Sensitive headers should be explicitly redacted before being stored in persistent logs (like KV or a database). Implement a case-insensitive check to ensure redaction is robust against different client implementations.
