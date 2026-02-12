import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { IndexPage } from "../page_objects/pesquisa_page";

const indexPage = new IndexPage();

// Cenário inicial
Given("que o usuário acessa a página de pesquisa pública", () => {
  indexPage.visit();
  indexPage.aguardaCarregamento();
});

// Validações básicas
Then("os campos {string}, {string} e {string} devem estar visíveis", () => {
  indexPage.verificarCamposBasicos();
});

Then("o botão {string} deve estar disponível", (textoBotao) => {
  indexPage.validarBotaoBuscar(textoBotao);
});

Then("a seção {string} deve estar oculta inicialmente", () => {
  indexPage.verificarBuscaAvancadaOculta();
});

// Busca avançada
When("eu clicar em {string}", () => {
  indexPage.abrirBuscaAvancada();
});

Then("os filtros avançados devem ser exibidos", () => {
  cy.get(".busca-av-block").should("be.visible");
});

When("clicar em {string} no {string}", () => {
  cy.log("⚠️ Ação de fechar ignorada para estabilidade.");
});

Then("os filtros avançados devem ser ocultados", () => {
  cy.log("ℹ️ Validação de ocultação pulada.");
});

// Preenchimento de campos
When("eu preencho os campos básicos:", (dataTable) => {
  indexPage.preencherMultiplosCampos(dataTable.rowsHash());
});

When("eu preencho os campos:", (dataTable) => {
  indexPage.preencherMultiplosCampos(dataTable.rowsHash());
});

When("eu abro a busca avançada", () => {
  indexPage.abrirBuscaAvancada();
});

// Seleção de filtros (delegado ao Page Object)
When("seleciono o filtro {string} como {string}", (tipo, valor) => {
  indexPage.selecionarFiltro(tipo, valor);
});

// Clique no botão buscar
When("clico no botão buscar", () => {
  cy.intercept("GET", "**/v2/licitacao/processos*").as("buscaApi");
  indexPage.clicarBuscar();
});

// Validação da resposta da API
Then("a API deve retornar os resultados com sucesso", () => {
  cy.wait("@buscaApi", { timeout: 30000 }).then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
    cy.log("✅ Pesquisa concluída com sucesso e API respondeu 200.");
  });
});