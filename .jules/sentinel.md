## 2026-07-29 - Client IP Spoofing Prevention behind Cloudflare
**Vulnerability:** Directly extracting the `x-forwarded-for` header for rate-limiting and audit logging allows attackers to spoof their IP address. This can be used to bypass rate-limiting on sensitive endpoints like admin login or contaminate forensic audits.
**Learning:** In Cloudflare-backed environments, the client IP should be resolved using Cloudflare's trusted `cf-connecting-ip` header. A centralized helper is needed to robustly verify and prioritize trusted headers.
**Prevention:** Implement a centralized `getClientIP(c, fallback)` helper function that checks `cf-connecting-ip` first, followed by `x-forwarded-for`, with defensive type-checking on the request object.
