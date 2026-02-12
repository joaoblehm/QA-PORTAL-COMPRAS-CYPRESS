Portal de Compras - Testes Automatizados com Cypress

📌 Visão Geral

Este projeto contém testes automatizados para validar funcionalidades do Portal de Compras, com foco nos filtros de pesquisa simples e avançada. Os cenários foram escritos em Gherkin para facilitar a leitura e entendimento por todos os envolvidos.

🎯 Funcionalidade

Filtros de Pesquisa do Portal

Como usuário do portal de compras, desejo utilizar filtros de pesquisa simples e avançada para localizar processos específicos com precisão e eficiência.

⚙️ Contexto

O usuário acessa a página de pesquisa pública.

🧪 Cenários de Teste

@interface @regressao

Validar renderização e acessibilidade dos filtros iniciais

Os campos "Objeto", "Processo" e "Órgão" devem estar visíveis.

O botão "BUSCAR" deve estar disponível.

A seção "Busca Avançada" deve estar oculta inicialmente.

@busca_avancada @funcional

Validar abertura da busca avançada

Ao clicar em "Busca Avançada", os filtros avançados devem ser exibidos.

@pesquisa_completa

Realizar pesquisa completa com critérios específicos

Preencher os campos básicos:

Objeto: 14.07.23 Conc Tecnica Preco Propostas

Processo: 14.07.23 Conc Tecnica Preco Propostas

Órgão: Luiz

Abrir a busca avançada.

Preencher os filtros avançados:

Status: Recebendo Propostas

Modalidade: Concorrência

Realização: Eletrônico

Julgamento: Técnica e Preço

UF: RS

Municípios: Arambaré

Validar que os filtros permanecem preenchidos.

Clicar em "BUSCAR".

A API deve retornar os resultados com sucesso.

🚀 Tecnologias Utilizadas

Cypress para automação de testes.

Linguagem Gherkin para especificação de cenários.

▶️ Como Executar os Testes

Instale as dependências:

npm install

Execute os testes:

npx cypress open

📂 Estrutura do Projeto

cypress/e2e/ → Contém os cenários de teste escritos em Gherkin.

cypress.config.js → Configuração do Cypress.

✅ Objetivo

Garantir que os filtros de pesquisa do Portal de Compras funcionem corretamente, oferecendo ao usuário uma experiência eficiente e confiável na busca por processos.
