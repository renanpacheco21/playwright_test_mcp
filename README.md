# Automação de Testes - Magazine Luiza

Este projeto contém testes automatizados para o site da Magazine Luiza usando Playwright, seguindo uma arquitetura organizada com Page Object Model (POM).

O desenvolvimento e depuração dos testes foram realizados no Cursor IDE, aproveitando as funcionalidades da tecnologia MPC Playwright para otimização do fluxo de trabalho.

## 📝 Prompt do Cenário

### Prompt utilizado para criação do teste:

```
Acesse o site https://www.magazineluiza.com.br/, no campo "buscar no magalu" procure o produto Iphone 17 Pro Max, e acesse o primeiro produto na lista de resultados que tenha o termo "laranja-cósmico" na sua descrição, e por fim gerar automação de testes destas ações em playwright.
```

## 🚀 Como executar

### Pré-requisitos

- Node.js instalado (versão 16 ou superior)
- npm ou yarn

### Instalação

```bash
npm install
```

### Executar os testes

```bash
# Executar todos os testes
npx playwright test

# Executar apenas os testes da Magazine Luiza
npx playwright test tests/specs/magazine-luiza.spec.ts

# Executar em modo headed (com interface gráfica)
npx playwright test --headed

# Executar com UI do Playwright
npx playwright test --ui

# Executar em um navegador específico
npx playwright test --project=chromium
```

### Ver relatório HTML

Após executar os testes, você pode visualizar o relatório HTML:

```bash
npx playwright show-report
```

## 📁 Estrutura do Projeto

```
.
├── tests/
│   ├── commands/               # Ações executadas (métodos/helpers)
│   │   └── common.ts           # Comandos comuns reutilizáveis
│   ├── constants/              # Dados estáticos reutilizáveis
│   │   ├── buttons.ts           # Botões e seletores padrões do sistema
│   │   ├── fields.ts            # Campos e IDs reutilizáveis
│   │   ├── messages.ts          # Mensagens e textos de validação
│   │   └── index.ts             # Exportações centralizadas
│   ├── fixtures/               # Massa de dados utilizada nos testes
│   │   └── products.ts          # Dados de produtos
│   ├── pages/                  # Implementação do Page Object Model (POM)
│   │   ├── elements/            # Mapeamento de seletores de cada página
│   │   │   ├── HomePageElements.ts
│   │   │   ├── SearchPageElements.ts
│   │   │   └── ProductPageElements.ts
│   │   ├── HomePage.ts          # POM da página inicial
│   │   ├── SearchPage.ts         # POM da página de busca
│   │   └── ProductPage.ts       # POM da página de produto
│   └── specs/                   # Testes automatizados (cenários)
│       └── magazine-luiza.spec.ts
├── config.env.json              # Configurações de ambiente (URL, timeouts, etc.)
├── playwright.config.ts         # Configurações globais do Playwright
├── package.json                 # Dependências do projeto
└── README.md                    # Este arquivo
```

## 🧪 Testes Implementados

### Teste: Buscar iPhone 17 Pro Max com cor "laranja-cósmico"
- Acessa o site da Magazine Luiza
- Fecha o banner de cookies (se existir)
- Busca por "Iphone 17 pro max" no campo de busca
- Encontra o primeiro produto que contenha "laranja-cósmico" na descrição
- Clica no produto encontrado
- Valida os elementos da página do produto (título, preço, botão de adicionar à sacola)


### Arquitetura aplicada:

O teste foi estruturado seguindo o padrão Page Object Model (POM) para:
- **Manutenibilidade**: Facilita atualizações quando a estrutura do site mudar
- **Reutilização**: Métodos e seletores podem ser reutilizados em outros testes
- **Organização**: Separação clara entre lógica de teste, mapeamento de elementos e dados

## 📝 Notas

- Os testes podem falhar se a estrutura do site da Magazine Luiza mudar
- Os seletores foram criados para serem flexíveis e funcionar com diferentes layouts
- A arquitetura POM facilita a manutenção e atualização dos testes
- Os dados de teste (produtos, mensagens, seletores) estão centralizados em arquivos de constantes e fixtures

## 🔧 Configuração

### Playwright Config
O arquivo `playwright.config.ts` contém as configurações do Playwright, incluindo:
- Navegadores configurados (Chromium por padrão)
- Configurações de retry
- Configurações de trace e screenshots
- Diretório de testes: `./tests`

### Configurações de Ambiente
O arquivo `config.env.json` contém:
- URL base do site
- Timeouts configuráveis (short, medium, long, veryLong)
- Configurações de busca (ex: maxProducts)

## 📊 Resultado Esperado

Ao executar os testes, você deve ver:
- ✅ Teste passando com sucesso
- Console logs mostrando o produto identificado
- Navegação para a página do produto
- Validação dos elementos da página


