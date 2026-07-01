# Sentinel Security Journal 🛡️

## 2025-05-22 - Improved Administrative Credential Storage & Logging Privacy
**Vulnerability:**
1. Administrative roles created via `/admin/roles` were stored in KV using a simple SHA-256 hash of `password + ":" + username` with no salt.
2. Webhook logs in `logWebhookEvent` were capturing sensitive headers like `x-kkiapay-secret` and `x-fedapay-signature` in plain text (up to 500 characters).

**Learning:**
Legacy hashing patterns (like `SHA256(password + username)`) are insufficient against modern GPU-accelerated brute-force attacks and offer no protection against rainbow tables if salts aren't unique. Additionally, verbose logging of incoming request headers can inadvertently leak secrets into persistent storage if not explicitly filtered.

**Prevention:**
1. Transitioned administrative role storage to use PBKDF2 with 100,000 iterations and a random 16-byte salt for new entries.
2. Implemented a centralized `SENSITIVE_HEADERS` redaction list in the webhook logging pipeline to ensure secrets are never persisted to the KV audit ring.
