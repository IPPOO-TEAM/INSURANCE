import { describe, it, expect } from 'vitest';
import { computeBilling, BILLING, getDaysInMonth } from '../billing_logic';

describe('Billing Logic', () => {
  it('should compute billing for profile with no active contracts and no card', () => {
    const contracts: any[] = [];
    const profile = { cardActive: false };
    const result = computeBilling(contracts, profile);

    expect(result.total).toBe(BILLING.accountFee);
    expect(result.activeCount).toBe(0);
  });

  it('should compute billing with one active contract and card active for February (non-leap year)', () => {
    const contracts = [
      { id: 'c1', product: 'Santé', status: 'active' }
    ];
    const profile = { cardActive: true };
    const feb2025 = new Date('2025-02-01'); // Non-leap year
    const result = computeBilling(contracts, profile, feb2025);

    const daysInMonth = 28;
    const expectedTotal = (BILLING.dailyPerProduct * daysInMonth) +
                          BILLING.accountFee +
                          BILLING.cardFee;

    expect(result.daysInMonth).toBe(daysInMonth);
    expect(result.total).toBe(expectedTotal);
    expect(result.activeCount).toBe(1);
  });

  it('should handle leap year correctly (February 2024)', () => {
    const contracts = [
      { id: 'c1', product: 'Santé', status: 'active' }
    ];
    const profile = { cardActive: false };
    const feb2024 = new Date('2024-02-01'); // Leap year
    const result = computeBilling(contracts, profile, feb2024);

    expect(result.daysInMonth).toBe(29);
  });

  it('should compute correctly for a 31-day month', () => {
    const contracts = [
      { id: 'c1', product: 'Santé', status: 'active' }
    ];
    const profile = { cardActive: false };
    const jan2025 = new Date('2025-01-01');
    const result = computeBilling(contracts, profile, jan2025);

    expect(result.daysInMonth).toBe(31);
    const expectedTotal = (BILLING.dailyPerProduct * 31) + BILLING.accountFee;
    expect(result.total).toBe(expectedTotal);
  });

  describe('getDaysInMonth', () => {
    it('should return 31 for January', () => {
      expect(getDaysInMonth(new Date('2025-01-15'))).toBe(31);
    });
    it('should return 28 for February 2025', () => {
      expect(getDaysInMonth(new Date('2025-02-15'))).toBe(28);
    });
    it('should return 29 for February 2024', () => {
      expect(getDaysInMonth(new Date('2024-02-15'))).toBe(29);
    });
    it('should return 30 for April', () => {
      expect(getDaysInMonth(new Date('2025-04-15'))).toBe(30);
    });
  });
});
