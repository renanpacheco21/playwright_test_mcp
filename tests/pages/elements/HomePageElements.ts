import { Page } from '@playwright/test';
import { FIELDS, BUTTONS } from '../../constants';

/**
 * Mapeamento de elementos da página inicial (HomePage)
 */
export class HomePageElements {
  constructor(private page: Page) {}

  /**
   * Retorna o campo de busca
   */
  async getSearchInput() {
    // Tentar múltiplos seletores
    for (const selector of FIELDS.SEARCH_INPUT.SELECTORS) {
      try {
        const input = this.page.locator(selector).first();
        if (await input.isVisible({ timeout: 2000 })) {
          return input;
        }
      } catch (e) {
        continue;
      }
    }

    // Tentar pelo placeholder
    const input = this.page.getByPlaceholder(FIELDS.SEARCH_INPUT.PLACEHOLDER).first();
    if (await input.isVisible({ timeout: 2000 }).catch(() => false)) {
      return input;
    }

    throw new Error('Campo de busca não encontrado');
  }

  /**
   * Retorna o botão de dismiss de cookies
   */
  getDismissCookiesButton() {
    return this.page.getByRole('button', { name: BUTTONS.DISMISS_COOKIES });
  }
}

