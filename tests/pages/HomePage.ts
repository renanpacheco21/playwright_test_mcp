import { Page, expect } from '@playwright/test';
import { HomePageElements } from './elements/HomePageElements';
import { MESSAGES } from '../constants/messages';

/**
 * Page Object Model para a página inicial
 */
export class HomePage {
  private elements: HomePageElements;

  constructor(private page: Page) {
    this.elements = new HomePageElements(page);
  }

  /**
   * Navega para a página inicial
   */
  async goto() {
    await this.page.goto('https://www.magazineluiza.com.br');
    await expect(this.page).toHaveTitle(/Magazine Luiza/);
  }

  /**
   * Fecha o banner de cookies se existir
   */
  async dismissCookiesBanner() {
    try {
      const dismissButton = this.elements.getDismissCookiesButton();
      if (await dismissButton.isVisible({ timeout: 3000 })) {
        await dismissButton.click();
        await this.page.waitForTimeout(500);
      }
    } catch (error) {
      console.log(MESSAGES.COOKIES_BANNER_NOT_FOUND);
    }
  }

  /**
   * Realiza uma busca
   */
  async search(term: string) {
    await this.page.waitForLoadState('domcontentloaded');
    
    const searchInput = await this.elements.getSearchInput();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    console.log(MESSAGES.SEARCH_FIELD_FOUND);

    await searchInput.fill(term);
    await this.page.waitForTimeout(500);
    await searchInput.press('Enter');
    
    console.log(`${MESSAGES.SEARCH_PERFORMED} ${term}`);
  }
}

