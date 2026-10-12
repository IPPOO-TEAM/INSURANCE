## 2026-05-25 - Timing side-channel attacks on secret comparisons
**Vulnerability:** Webhook secret/signature validation, agent invitation code validation, and cron header checks were using standard `!==` string comparisons, vulnerable to timing side-channel attacks.
**Learning:** In Deno/Node edge environments without `crypto.timingSafeEqual`, constant-time string comparison can be implemented using `TextEncoder` byte buffers and bitwise XOR operations (`a[i] ^ b[i]`).
**Prevention:** Always compare secret headers, webhook signatures, tokens, and authorization keys using `safeCompare` or constant-time buffer comparison.
