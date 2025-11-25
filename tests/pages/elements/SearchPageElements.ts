import { Page, Locator } from '@playwright/test';
import { FIELDS } from '../../constants';

/**
 * Mapeamento de elementos da página de resultados de busca
 */
export class SearchPageElements {
  constructor(private page: Page) {}

  /**
   * Retorna todos os links de produtos
   */
  getProductLinks() {
    return this.page.locator(FIELDS.PRODUCT_LINKS);
  }

  /**
   * Retorna um produto específico por índice
   */
  getProductByIndex(index: number): Locator {
    return this.getProductLinks().nth(index);
  }

  /**
   * Verifica se um produto contém um texto específico na descrição
   */
  async productContainsText(product: Locator, searchText: string): Promise<boolean> {
    try {
      const productText = await product.textContent().catch(() => '');
      const ariaLabel = await product.getAttribute('aria-label').catch(() => '') || '';
      const title = await product.getAttribute('title').catch(() => '') || '';
      
      const fullText = `${productText} ${ariaLabel} ${title}`.toLowerCase();
      const searchLower = searchText.toLowerCase();
      
      return fullText.includes(searchLower) || 
             fullText.includes(searchLower.replace('-', ' '));
    } catch (e) {
      return false;
    }
  }

  /**
   * Extrai o nome do produto
   */
  async getProductName(product: Locator): Promise<string> {
    try {
      const productHeading = product.locator(FIELDS.PRODUCT_HEADING).first();
      if (await productHeading.isVisible({ timeout: 1000 }).catch(() => false)) {
        return (await productHeading.textContent()) || '';
      }
      
      const productText = await product.textContent().catch(() => '');
      const ariaLabel = await product.getAttribute('aria-label').catch(() => '') || '';
      const title = await product.getAttribute('title').catch(() => '') || '';
      
      return productText || ariaLabel || title || 'Produto não identificado';
    } catch (e) {
      return 'Produto não identificado';
    }
  }
}

