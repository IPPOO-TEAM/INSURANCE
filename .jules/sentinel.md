## 2026-05-10 - CSPRNG for Phone Verification OTP Generation
**Vulnerability:** Weak pseudo-random number generator (`Math.random()`) used for generating 6-digit phone verification OTP codes.
**Learning:** `Math.random()` in V8/Deno is non-cryptographic (PRNG) and susceptible to seed prediction attacks, allowing potential OTP bypass.
**Prevention:** Always use `crypto.getRandomValues()` (CSPRNG) when generating sensitive authentication, verification, or OTP tokens.
