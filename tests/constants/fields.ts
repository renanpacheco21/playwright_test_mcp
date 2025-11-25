/**
 * Campos e IDs reutilizáveis
 */
export const FIELDS = {
  // Campo de busca
  SEARCH_INPUT: {
    SELECTORS: [
      'input[placeholder*="buscar" i]',
      'input[placeholder*="magalu" i]',
      'input[type="search"]',
      'input[name*="search" i]',
      '[data-testid*="search"]',
      'input[aria-label*="buscar" i]'
    ],
    PLACEHOLDER: /buscar no magalu/i
  },
  
  // Produtos
  PRODUCT_LINKS: 'a[href*="/p/"]',
  PRODUCT_HEADING: 'h3, h2, h1',
  
  // Preço
  PRICE_SELECTORS: [
    'text=/R\\$ [\\d.,]+/',
    '[data-testid*="price"]',
    '.price',
    '[class*="price"]'
  ],
} as const;

