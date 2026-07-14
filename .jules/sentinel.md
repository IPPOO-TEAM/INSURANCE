## 2025-05-15 - Broken Rate Limiting due to Argument Mismatch
**Vulnerability:** Admin login and 2FA endpoints had broken rate limiting because `guardRate` was called with 4 arguments instead of the required 5. The `windowSec` parameter was missing, leading to `undefined` being used in time-based calculations, effectively bypassing the intended security control.
**Learning:** Inconsistency between utility function definitions and their usage can lead to silent security failures, especially in loosely-typed contexts or when refactoring.
**Prevention:** Always verify function signatures against all call sites. Use automated tests that exercise rate-limiting logic to ensure it triggers as expected.
