## 2026-07-04 - Centralized Header Redaction for Webhook Logs
**Vulnerability:** Sensitive headers (Authorization, secrets) were being logged in plain text when capturing webhook events via `raw.forEach` header iteration.
**Learning:** Generic header iteration can bypass specific redaction lists if they are not applied during the loop. Centralizing sensitive header names in a `Set` ensures consistency across different capture methods.
**Prevention:** Always use a centralized redaction list for logging and apply it to all forms of header or data collection. Use case-insensitive checks for header names.
