import { describe, it, expect, vi } from 'vitest';

// Mocking the environment and global Deno BEFORE importing app
vi.stubGlobal('Deno', {
  env: {
    get: vi.fn((key: string) => {
      if (key === 'SUPABASE_URL') return 'https://example.supabase.co';
      if (key === 'SUPABASE_SERVICE_ROLE_KEY') return 'mock-key';
      if (key === 'ADMIN_ACCOUNTS') return '[]';
      return 'mock-value';
    }),
  },
});

// Mocking Supabase Client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    storage: {
      listBuckets: vi.fn().mockResolvedValue({ data: [] }),
      createBucket: vi.fn().mockResolvedValue({ data: {} }),
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          like: vi.fn().mockResolvedValue({ data: [] }),
        })),
      })),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        like: vi.fn().mockResolvedValue({ data: [] }),
      })),
    })),
  })),
}));

// Mocking KV Store to avoid timeouts
vi.mock('../kv_store.tsx', () => ({
  get: vi.fn().mockResolvedValue(null),
  set: vi.fn().mockResolvedValue(undefined),
  k: {
    site: vi.fn().mockReturnValue('site'),
  }
}));

// Import app after stubbing and mocking
const { app } = await import('../index');

describe('API Integration', () => {
  const PREFIX = "/make-server-752d1a39";

  it('should return 200 OK on GET /ping', async () => {
    const res = await app.request(`${PREFIX}/ping`);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('pong');
  });

  it('should return health status on GET /health', async () => {
    const res = await app.request(`${PREFIX}/health`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('status');
    expect(body).toHaveProperty('latencyMs');
  });

  it('should return 404 for unknown routes', async () => {
    const res = await app.request(`${PREFIX}/unknown-route`);
    expect(res.status).toBe(404);
  });
});
