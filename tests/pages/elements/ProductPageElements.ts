import { Page } from '@playwright/test';
import { FIELDS, BUTTONS } from '../../constants';

/**
 * Mapeamento de elementos da página de produto
 */
export class ProductPageElements {
  constructor(private page: Page) {}

  /**
   * Retorna o título do produto
   */
  getProductTitle() {
    return this.page.getByRole('heading', { level: 1 });
  }

  /**
   * Retorna o preço do produto
   */
  async getPrice() {
    for (const selector of FIELDS.PRICE_SELECTORS) {
      try {
        const price = this.page.locator(selector).first();
        if (await price.isVisible({ timeout: 2000 })) {
          return price;
        }
      } catch (e) {
        continue;
      }
    }
    return null;
  }

  /**
   * Retorna o botão de adicionar à sacola
   */
  getAddToCartButton() {
    return this.page.getByRole('button', { name: BUTTONS.ADD_TO_CART });
  }
}

