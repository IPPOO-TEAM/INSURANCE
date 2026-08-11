# Sentinel Security Journal

## 2026-05-30 - Admin Auth Integration & 2FA Bypass Protection
**Vulnerability:** Weak admin password hashing scheme combined with incomplete integration of dynamically created admin roles (`system:admin:roles` KV) under the `/admin/login` and `/admin/login/2fa` endpoints, creating a potential authentication gap where dynamically created roles are unable to log in, and their `totpSecret` could be ignored/bypassed if not verified.
**Learning:** Decoupling static and dynamic admin stores is necessary, but all authentication logic must uniformly query both sources. High-privilege actions like `totpSecret` verification must be applied dynamically to prevent privilege escalation or 2FA bypass.
**Prevention:** Integrate dynamic accounts directly into `/admin/login` and `/admin/login/2fa`, verifying hashed passwords with `sha256Hex` and validating `totpSecret` consistently.
