## 2025-07-03 - Sensitive Header Redaction in Webhook Logs
**Vulnerability:** Exposure of authentication tokens and payment provider secrets in persistent webhook logs.
**Learning:** Incoming webhooks often carry sensitive credentials in headers (e.g., `Authorization`, `x-kkiapay-secret`). Without explicit redaction, these are stored in plain text in the `system_kv` table, accessible to anyone with admin log access or if the database is compromised.
**Prevention:** Always use a blocklist (like `SENSITIVE_HEADERS`) to filter and redact headers before persisting request/response logs.
