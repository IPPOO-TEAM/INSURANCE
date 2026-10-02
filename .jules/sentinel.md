## 2025-05-10 - Constant-Time String Comparison for Webhook Secrets and Cron Authentication
**Vulnerability:** Use of variable-time `!==` equality operators when verifying sensitive webhook signatures (KkiaPay, CinetPay, FedaPay, MTN MoMo) and cron secrets (`CRON_SECRET`) introduced timing side-channel risks.
**Learning:** In TypeScript/Deno server runtimes, standard string comparisons (`!==` / `===`) short-circuit on the first non-matching character, allowing attackers to measure execution time differences to deduce valid secret values character-by-character.
**Prevention:** Use a constant-time comparison helper (`safeCompare`) that compares encoded `Uint8Array` byte buffers with bitwise OR accumulation across the entire length of expected buffers.
