# Sentinel Security Journal

## 2026-05-30 - Sensitive Data Exposure in GET /admin/roles
**Vulnerability:** The `GET /admin/roles` endpoint returned raw role objects from the `system:admin:roles` KV store, exposing admin password hashes (`pwHash`) over the wire.
**Learning:** KV-backed administrative records often mix credential metadata with administrative display data. Endpoints serving administrative listings must sanitize objects before serializing to JSON to prevent credential leakages.
**Prevention:** Always project or strip authentication secrets/hashes from objects retrieved from storage before exposing them via API responses.
