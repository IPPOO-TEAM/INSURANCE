## 2025-05-22 - [Secure IP Detection & Sensitive Log Redaction]
**Vulnerability:** IP Spoofing & Sensitive Data Exposure in Logs.
**Learning:** Relying on `x-forwarded-for` directly in environments behind Cloudflare allows attackers to bypass rate limits and spoof identity in audit logs. Additionally, iterating over all headers in `logWebhookEvent` for diagnostic purposes leaked sensitive tokens and PSP secrets into the database.
**Prevention:** Always prioritize trusted proxy headers like `cf-connecting-ip` and implement an explicit redaction set (`SENSITIVE_HEADERS`) with case-insensitive checks when logging request headers.
