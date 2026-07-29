import { describe, it, expect } from 'vitest';

describe('module', () => {
  it('should be importable', async () => {
    const module = await import('../src/module');
    expect(module).toBeDefined();
    expect(module.default).toBeDefined();
  });
});
