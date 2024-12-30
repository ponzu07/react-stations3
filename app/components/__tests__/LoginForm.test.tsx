import { describe, test, expect } from 'vitest'

describe('Email Validation', () => {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  test('validateEmail関数は正しいメールアドレスを検証できる', () => {
    expect(validateEmail('test@example.com')).toBe(true)
    expect(validateEmail('user.name@domain.co.jp')).toBe(true)
    expect(validateEmail('email+alias@example.com')).toBe(true)
  })

  test('validateEmail関数は不正なメールアドレスを検出できる', () => {
    expect(validateEmail('invalid-email')).toBe(false)
    expect(validateEmail('@domain.com')).toBe(false)
    expect(validateEmail('user@')).toBe(false)
    expect(validateEmail('user@domain')).toBe(false)
    expect(validateEmail('')).toBe(false)
  })
})
