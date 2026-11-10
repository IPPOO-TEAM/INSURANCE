# Sentinel Journal - Critical Security Learnings

## 2025-05-18 - Password Hash Disclosure in GET /admin/roles
**Vulnerability:** Dynamic admin role records stored in KV (`system:admin:roles`) contain `pwHash`. The `GET /admin/roles` endpoint returned raw KV records directly, exposing password hashes to API consumers.
**Learning:** KV objects stored with sensitive credentials or hashes must always be sanitized before being serialized in HTTP responses, even when endpoints are restricted to elevated admin roles.
**Prevention:** Consistently map and sanitize collections retrieved from persistence layers before returning them in JSON responses: `roles.map(({ pwHash, ...r }) => r)`.
