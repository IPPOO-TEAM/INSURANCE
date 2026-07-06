# Sentinel's Journal

## 2026-05-30 - Enhanced Admin Authentication and Webhook Logging Security

**Vulnerability:**
1. Sensitive headers (e.g., `X-Kkiapay-Secret`, `Authorization`) were being logged in plaintext to the KV store in `logWebhookEvent`, accessible to anyone with admin/operator access.
2. Dynamic admin roles created via `/admin/roles` were using weak SHA-256 hashing without unique salts, and these roles were not actually checked during login.

**Learning:**
The application provided a mechanism for dynamic role management but didn't integrate it into the primary authentication flow, and the logging mechanism was too permissive with sensitive request data.

**Prevention:**
1. Use a `SENSITIVE_HEADERS` Set to proactively redact known sensitive headers in all logging functions.
2. Always use secure, salted password hashing (like PBKDF2 or Argon2) for any local account storage, and ensure dynamic management features are fully wired into the authentication logic.
