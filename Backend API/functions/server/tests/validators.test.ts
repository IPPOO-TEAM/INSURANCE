import { describe, it, expect } from 'vitest';
import { SignupSchema, ClaimCreateSchema } from '../validators';

describe('Validators', () => {
  describe('SignupSchema', () => {
    it('should validate correct signup data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'John Doe',
        phone: '+22901234567'
      };
      const result = SignupSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'John Doe'
      };
      const result = SignupSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('ClaimCreateSchema', () => {
    it('should validate correct claim data', () => {
      const validData = {
        type: 'Maladie',
        description: 'Consultation médicale pour fièvre',
        amount: 15000
      };
      const result = ClaimCreateSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
