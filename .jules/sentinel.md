## 2025-05-30 - Fix `guardRate` Rate Limiting Parameter Mismatch in Admin Auth Endpoints
**Vulnerability:** The calls to `guardRate` in `/admin/login` and `/admin/login/2fa` passed 4 arguments instead of 5, omitting the `scope` and passing `scope:id` string into `scope`, resulting in `windowSec` evaluating to `undefined` and rate-limiting calculations evaluating to `NaN`.
**Learning:** Functions accepting positional parameters with optional defaults can fail silently if argument order or count is mismatched across call sites.
**Prevention:** Verify function signature alignment or consider using named object parameters for functions with multiple numeric or configuration parameters.
