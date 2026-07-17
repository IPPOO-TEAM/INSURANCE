# Sentinel Security Journal

## 2025-02-28 - Admin Authentication Isolation Gap
**Vulnerability:** Admin authentication at `/admin/login` only verified static environment credentials (`ADMIN_ACCOUNTS`), while the admin role creation endpoint (`/admin/roles`) registered dynamic administrator accounts into the `system:admin:roles` KV key. This resulted in an authentication bypass/gap where dynamically created admin accounts could not log in, breaking access control and isolation expectations.
**Learning:** Decoupling credential definition from the login verification flow can lead to non-functional authentication pathways. When user-management features (like dynamic role creation) are implemented, their authentication state must be fully integrated into the corresponding login flow.
**Prevention:** Always verify that every account creation or registration pipeline is paired with a corresponding verification pathway in the login/authentication endpoints. Add automated tests or static analysis to ensure that credentials from all supported account stores are properly verified.
