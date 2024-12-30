import { test, expect } from '@playwright/test';

test.describe('ログインフォームのテスト', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login');
    });

    test('メールアドレスバリデーション', async ({ page }) => {
      // フォーム要素の取得
      const emailInput = page.getByRole('textbox', { name: 'メールアドレス' });
      const passwordInput = page.getByRole('textbox', { name: 'パスワード' });
      const loginButton = page.getByRole('button', { name: 'ログイン' });

      // 空のメールアドレスでのテスト
      await emailInput.fill('');
      await passwordInput.fill('password123');
      await loginButton.click();
      await expect(page.getByText('有効なメールアドレスを入力してください')).toBeVisible();

      // 不正なメールアドレスでのテスト
      await emailInput.fill('invalid-email');
      await loginButton.click();
      await expect(page.getByText('有効なメールアドレスを入力してください')).toBeVisible();

      // 正しいメールアドレスでのテスト
      await emailInput.fill('test@example.com');
      await loginButton.click();
      await expect(page.getByText('有効なメールアドレスを入力してください')).not.toBeVisible();
    });
});
