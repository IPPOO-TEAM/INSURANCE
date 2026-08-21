## 2026-05-29 - Constant-Time String Comparison for Webhook Signatures
**Vulnerability:** Webhook verification endpoints (`/payments/webhook/cinetpay`, `/payments/webhook/fedapay`, `/payments/webhook/mtn`) used loose/standard inequality comparison (`!==`) for HMAC signatures and callback keys, exposing the backend to timing side-channel attacks.
**Learning:** Standard string equality operators (`===` / `!==`) fail early on the first non-matching character, allowing attackers to measure execution response time differences to forge valid signatures character-by-character.
**Prevention:** Use `safeCompare` (constant-time bitwise XOR byte comparison over UTF-8 encoded buffers) whenever verifying cryptographic signatures, webhook secrets, or API keys.
