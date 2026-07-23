# Sentinel Security Journal

## 2026-05-30 - Dynamic Admin Accounts Auth Integration
**Vulnerability:** Dynamic admin accounts created in `system:admin:roles` were unable to log in because the authentication endpoints `/admin/login` and `/admin/login/2fa` only checked the static `ADMIN_ACCOUNTS` list loaded from environment variables. Furthermore, the lack of 2FA integration for these dynamically created roles could result in a 2FA bypass if they configured a `totpSecret` but the login handlers did not verify it properly.
**Learning:** In projects that combine static environment accounts with dynamically created/persisted database roles, credential search routines and authentication checks must be unified across both static and dynamic stores to enforce access control, password validation, and 2FA policies consistently across all admin identities.
**Prevention:** Avoid isolating static and dynamic credential validation logic in different modules. Always use unified routines to lookup accounts, load security-sensitive metadata (such as `totpSecret`), and enforce defensive checks (such as password hash comparisons) uniformly.
