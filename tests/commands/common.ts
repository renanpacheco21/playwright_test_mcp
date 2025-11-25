import { Page } from '@playwright/test';

/**
 * Comandos comuns reutilizáveis
 */
export class CommonCommands {
  constructor(private page: Page) {}

  /**
   * Aguarda a página carregar completamente
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Faz scroll na página
   */
  async scroll(amount: number = 500) {
    await this.page.evaluate((scrollAmount) => {
      window.scrollBy(0, scrollAmount);
    }, amount);
  }

  /**
   * Aguarda um tempo específico
   */
  async wait(timeout: number) {
    await this.page.waitForTimeout(timeout);
  }
}

