import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { PRODUCTS } from '../fixtures/products';
import { MESSAGES } from '../constants/messages';

test.describe('Magazine Luiza - Buscar iPhone 17 Pro Max', () => {
  test('deve buscar iPhone 17 Pro Max e acessar produto com "laranja-cósmico"', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    let produtoSelecionadoNome = '';

    // 1. Acessar o site da Magazine Luiza
    await test.step('Acessar o site da Magazine Luiza', async () => {
      await homePage.goto();
    });

    // 2. Fechar o banner de cookies se existir
    await test.step('Fechar banner de cookies', async () => {
      await homePage.dismissCookiesBanner();
    });

    // 3. Buscar por "Iphone 17 pro max"
    await test.step('Buscar por Iphone 17 pro max', async () => {
      await homePage.search(PRODUCTS.IPHONE_17_PRO_MAX.searchTerm);
    });

    // 4. Aguardar resultados e encontrar produto com "laranja-cósmico"
    await test.step('Encontrar produto com "laranja-cósmico" na descrição', async () => {
      await searchPage.waitForResults();
      
      const result = await searchPage.findProductByDescription(PRODUCTS.IPHONE_17_PRO_MAX.colorFilter);
      
      if (!result) {
        throw new Error(MESSAGES.PRODUCT_NOT_FOUND);
      }

      produtoSelecionadoNome = result.name;

      // 5. Clicar no produto encontrado
      await test.step('Clicar no produto com "laranja-cósmico"', async () => {
        await searchPage.clickProduct(result.product);
      });
    });

    // 6. Verificar elementos da página do produto
    await test.step('Verificar elementos da página do produto', async () => {
      await productPage.verifyProductPage();
      
      const summary = await productPage.getPageSummary();
      console.log(`${MESSAGES.PRODUCT_IDENTIFIED} ${produtoSelecionadoNome}`);
      console.log(`${MESSAGES.URL} ${summary.url}`);
      console.log(`${MESSAGES.PAGE_TITLE} ${summary.title}`);
    });
  });
});

