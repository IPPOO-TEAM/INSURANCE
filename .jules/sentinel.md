## 2026-06-12 - [Redact Sensitive Headers in Webhook Logs]
**Vulnerability:** Sensitive authentication headers (e.g., `x-kkiapay-secret`, `x-callback-key`) were being logged in plain text in the `system_kv` table via `logWebhookEvent`.
**Learning:** Shared secrets used for webhook verification were being exposed to any admin with access to the webhook logs.
**Prevention:** Always implement a redaction whitelist/blacklist for header logging, especially in diagnostic tools or admin consoles.
