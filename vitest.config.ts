import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    alias: [
      { find: /^npm:zod@.*$/, replacement: 'zod' },
      { find: /^npm:hono$/, replacement: 'hono' },
      { find: /^npm:hono\/(.*)$/, replacement: 'hono/$1' },
      { find: /^jsr:@supabase\/supabase-js@.*$/, replacement: '@supabase/supabase-js' },
      { find: /^npm:@simplewebauthn\/server@.*$/, replacement: '@simplewebauthn/server' },
      { find: /^npm:web-push@.*$/, replacement: 'web-push' },
    ]
  }
})
