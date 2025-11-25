import { Page, expect } from '@playwright/test';
import { ProductPageElements } from './elements/ProductPageElements';
import { MESSAGES } from '../constants/messages';

/**
 * Page Object Model para a página de produto
 */
export class ProductPage {
  private elements: ProductPageElements;

  constructor(private page: Page) {
    this.elements = new ProductPageElements(page);
  }

  /**
   * Verifica se o título do produto está visível
   */
  async verifyProductTitle() {
    const productTitle = this.elements.getProductTitle();
    
    const titleText = await productTitle.textContent();
    console.log(`${MESSAGES.PRODUCT_TITLE} ${titleText}`);
    return titleText;
  }

  /**
   * Verifica se o preço está visível
   */
  async verifyPrice() {
    const price = await this.elements.getPrice();
    if (price) {
      const priceText = await price.textContent();
      console.log(`${MESSAGES.PRICE_FOUND} ${priceText}`);
      return priceText;
    }
    return null;
  }

  /**
   * Verifica se o botão de adicionar à sacola está presente
   */
  async verifyAddToCartButton() {
    const addToCartButton = this.elements.getAddToCartButton();
    await expect(addToCartButton).toBeVisible({ timeout: 10000 });
    console.log(MESSAGES.ADD_TO_CART_BUTTON_FOUND);
  }

  /**
   * Verifica todos os elementos da página do produto
   */
  async verifyProductPage() {
    await this.verifyProductTitle();
    await this.verifyPrice();
    await this.verifyAddToCartButton();
    
    console.log(MESSAGES.PRODUCT_PAGE_LOADED);
    console.log(MESSAGES.SUMMARY);
  }

  /**
   * Retorna informações resumidas da página
   */
  async getPageSummary() {
    return {
      url: this.page.url(),
      title: await this.page.title(),
    };
  }
}

