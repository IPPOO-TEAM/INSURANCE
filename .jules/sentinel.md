## 2024-05-22 - [Sensitive Header Leakage in Webhook Logs]
**Vulnerability:** Webhook logging captured and persisted sensitive authentication headers (`authorization`, `x-kkiapay-secret`, etc.) in plain text within the KV store.
**Learning:** Generic header logging without a denylist/redaction mechanism easily leads to credential leakage when third-party providers or internal systems use custom headers for authentication.
**Prevention:** Implement a mandatory redaction layer for all logging functions that handle HTTP headers, using a case-insensitive denylist of known sensitive keys.
