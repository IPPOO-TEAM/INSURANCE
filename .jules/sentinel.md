## 2025-05-15 - SQL Injection via Manual Array Filtering
**Vulnerability:** The `syncArray` function in `kv_store.tsx` was manually constructing a SQL `IN` clause using string interpolation for a Supabase `.not()` filter.
**Learning:** Manual string interpolation of array elements into a query string bypasses the client library's built-in parameterization, potentially allowing malicious IDs to manipulate the query logic (Filter/SQL Injection).
**Prevention:** Always use the client library's native support for passing arrays to filters (e.g., `.not("id", "in", array)`) to ensure values are properly sanitized and parameterized.
