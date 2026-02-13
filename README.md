Portal de Compras - Testes Automatizados com Cypress
📌 Visão Geral
Este projeto contém uma suíte de testes automatizados para validar o Portal de Compras. O foco principal é garantir a integridade dos filtros de pesquisa (simples e avançada) e a comunicação correta com a API de processos.

🎯 Funcionalidades Testadas
Pesquisa Simples: Validação de campos de texto (Objeto, Processo, Órgão).

Busca Avançada: Expansão de filtros e seleções dinâmicas (UF e Municípios).

Persistência de Estado: Garantia de que os dados inseridos permanecem nos campos após interações.

🧪 Cenários de Teste (Gherkin)
Os cenários seguem a estrutura BDD para maior clareza:

@interface: Valida se os elementos básicos estão visíveis ao carregar a página.

@busca_avancada: Testa a abertura do painel de filtros extras e a performance de carregamento.

@pesquisa_completa: Executa um fluxo ponta a ponta, incluindo o tratamento especial para municípios (ex: Arambaré) e validação de resposta 200 OK da API.

🚀 Tecnologias e Padrões
Cypress: Framework de automação.

Cucumber (Badeball): Suporte para sintaxe Gherkin.

Page Object Model (POM): Estrutura organizada em pesquisa_page.js para facilitar a manutenção.

Data-Driven Testing: Centralização de seletores e dados em arquivos JSON.

📂 Estrutura do Projeto
Plaintext

cypress/
├── e2e/
│   ├── features/          # Cenários escritos em Gherkin (.feature)
│   └── step_definitions/  # Implementação dos passos em JS
├── support/
│   └── page_objects/      # Lógica de interação com a página (POM)
└── fixtures/              # Massa de dados e seletores (processos.json)
▶️ Como Executar os Testes
Instale as dependências:

Bash

npm install
Abrir a interface do Cypress:

Bash

npx cypress open
Executar via terminal (Headless):

Bash

npx cypress run
🛠️ Ajustes de Estabilidade Realizados
Sincronismo de API: O teste aguarda automaticamente o carregamento da lista de municípios após a seleção da UF para evitar falhas de "elemento desabilitado".

Validação de Selects: Implementada lógica para validar o texto visível da opção selecionada, garantindo que o filtro realmente persistiu o dado correto.
