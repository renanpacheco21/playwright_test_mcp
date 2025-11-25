import { Page, Locator, expect } from '@playwright/test';
import { SearchPageElements } from './elements/SearchPageElements';
import { MESSAGES } from '../constants/messages';

/**
 * Page Object Model para a página de resultados de busca
 */
export class SearchPage {
  private elements: SearchPageElements;
  private readonly MAX_PRODUCTS = 50;

  constructor(private page: Page) {
    this.elements = new SearchPageElements(page);
  }

  /**
   * Aguarda os resultados carregarem
   */
  async waitForResults() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);

    const productLinks = this.elements.getProductLinks();
    await expect(productLinks.first()).toBeVisible({ timeout: 15000 });
  }

  /**
   * Encontra o primeiro produto que contém o texto especificado na descrição
   */
  async findProductByDescription(searchText: string): Promise<{ product: Locator; name: string } | null> {
    for (let i = 0; i < this.MAX_PRODUCTS; i++) {
      try {
        const product = this.elements.getProductByIndex(i);
        
        // Verificar se o produto está visível
        const isVisible = await product.isVisible({ timeout: 2000 }).catch(() => false);
        if (!isVisible) {
          // Tentar scroll para carregar mais produtos
          await this.page.evaluate(() => window.scrollBy(0, 500));
          await this.page.waitForTimeout(1000);
          const stillVisible = await product.isVisible({ timeout: 2000 }).catch(() => false);
          if (!stillVisible) {
            break; // Não há mais produtos
          }
        }

        // Verificar se contém o texto procurado
        if (await this.elements.productContainsText(product, searchText)) {
          const productName = await this.elements.getProductName(product);
          console.log(`${MESSAGES.PRODUCT_FOUND} ${productName}`);
          return { product, name: productName };
        }
      } catch (e) {
        continue;
      }
    }

    return null;
  }

  /**
   * Clica em um produto
   */
  async clickProduct(product: Locator) {
    const productUrl = await product.getAttribute('href');
    console.log(`${MESSAGES.PRODUCT_URL} ${productUrl}`);

    await product.scrollIntoViewIfNeeded();
    await product.click();

    console.log(MESSAGES.NAVIGATION_COMPLETE);
  }
}

