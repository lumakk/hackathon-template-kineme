import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Simple sanity check test
describe('Simple Math', () => {
  it('adds 1 + 1', () => {
    expect(1 + 1).toBe(2);
  });
});
