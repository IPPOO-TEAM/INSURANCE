## 2025-05-14 - SQL Injection Risk in Supabase Filters
**Vulnerability:** Manual string interpolation was used to construct an `IN` clause for a Supabase query: `.not("id", "in", `(${newIds.map(id => `"${id}"`).join(",")})`)`.
**Learning:** Manual construction of query filters, even with seemingly "safe" IDs, bypasses the library's built-in parameterization and escaping, creating a vector for SQL injection if inputs are not strictly validated.
**Prevention:** Always pass arrays or values directly to Supabase filter methods (e.g., `.in("column", array)`) instead of using template literals to build the filter string.
