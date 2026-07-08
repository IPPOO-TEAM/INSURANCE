## 2026-07-08 - Sensitive Header Leakage in Webhook Logs
**Vulnerability:** The `logWebhookEvent` function was logging all HTTP headers, including sensitive ones like `Authorization`, `Cookie`, and PSP secret keys (`x-kkiapay-secret`, etc.), in plain text to the system Key-Value store.
**Learning:** Even diagnostic logs can become a source of credential leakage if they store raw request metadata without a redaction layer. The existing code had a fallback loop for common headers but didn't exclude secrets.
**Prevention:** Always use a blocklist (like `SENSITIVE_HEADERS`) when logging HTTP request headers or bodies. Implement case-insensitive redaction at the point of storage.
