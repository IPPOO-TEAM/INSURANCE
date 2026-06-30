## 2025-05-15 - [Admin Authentication Gap & Weak Hashing]
**Vulnerability:** The admin login endpoint ignored dynamically created roles in KV, forcing reliance on static environment variables. Furthermore, dynamic roles were stored using a weak SHA-256 hash without a unique random salt, making them vulnerable to brute-force attacks.

**Learning:** Administrative accounts were partially implemented across static config and dynamic KV store without a bridge in the login logic. Reconstructing account objects for session persistence must preserve all metadata (like `totpSecret`) to avoid breaking security features like MFA.

**Prevention:** Use a unified authentication provider or bridge all storage backends in the login handler. Always use cryptographically strong hashing (like PBKDF2, Argon2, or bcrypt) with random salts for sensitive data like passwords.
