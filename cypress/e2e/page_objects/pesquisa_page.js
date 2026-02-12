import searchElements from "../../fixtures/processos.json";

export class IndexPage {
    // Abre a página inicial e aceita cookies se existirem
    visit() {
        cy.visit("/");
        cy.get("body").then(($body) => {
            const btnAceitar = $body.find(
                "button#adopt-accept-all-button, button:contains('Aceitar')"
            );
            if (btnAceitar.length > 0) {
                cy.wrap(btnAceitar).click({ force: true });
                cy.log("✅ Banner de privacidade aceite.");
            }
        });
    }

    // Aguarda o carregamento do container principal
    aguardaCarregamento() {
        cy.get(searchElements.container.innerContainer, { timeout: 15000 })
            .should("be.visible");
    }

    // Valida que os campos básicos estão visíveis
    verificarCamposBasicos() {
        cy.get(searchElements.search.objeto).should("be.visible");
        cy.get(searchElements.search.processo).should("be.visible");
        cy.get(searchElements.search.orgao).should("be.visible");
    }

    // Confirma que a busca avançada começa oculta
    verificarBuscaAvancadaOculta() {
        cy.get(searchElements.search.blocoBuscaAvancada).should("not.be.visible");
    }

    // Valida que o botão de buscar está disponível
    validarBotaoBuscar(texto) {
        cy.get(searchElements.search.botaoBuscar)
            .first()
            .should("be.visible")
            .and("contain", texto);
    }

    // Abre a busca avançada apenas se ainda não estiver aberta
    abrirBuscaAvancada() {
        cy.get(searchElements.search.buscaAvancada).first().then(($btn) => {
            if (!$btn.hasClass("open")) {
                cy.wrap($btn).click({ force: true });
                cy.log("🔍 Busca avançada aberta.");
            }
        });
        cy.get(searchElements.search.blocoBuscaAvancada).should("be.visible");
    }

    // Fecha a busca avançada
    fecharBuscaAvancada() {
        cy.get(searchElements.icons.iconeFechar).first().click({ force: true });
        cy.get(searchElements.search.blocoBuscaAvancada).should("not.be.visible");
    }

    // Seleciona filtros de forma inteligente
    selecionarFiltro(tipo, valor) {
        const seletor = searchElements.selects[tipo] || searchElements.search[tipo];

        if (!seletor) {
            cy.log(`⚠️ Seletor para "${tipo}" não encontrado no JSON.`);
            return;
        }

        cy.get(seletor, { timeout: 15000 }).then(($el) => {
            const tagName = $el.prop("tagName").toLowerCase();

            if (tagName === "select") {
                if (tipo.toLowerCase() === "municipios") {
                    // Valida que o select tem pelo menos uma opção
                    cy.get("#municipios option", { timeout: 10000 })
                      .should("have.length.greaterThan", 0);

                    // Tratamento especial para Arambaré
                    const valorFinal = valor.trim() === "Arambaré" ? "100143016" : valor;
                    cy.get("#municipios").select(valorFinal, { force: true });
                } else {
                    // Seleção normal em outros dropdowns
                    cy.wrap($el).select(valor, { force: true });
                }

                cy.log(`✅ Selecionado no dropdown [${tipo}]: ${valor}`);
            } else {
                // Caso seja campo de texto
                cy.wrap($el)
                    .should("be.visible")
                    .clear({ force: true })
                    .type(valor, { force: true });
                cy.log(`⌨️ Preenchido no input [${tipo}]: ${valor}`);
            }
        });
    }

    // Preenche múltiplos campos
    preencherMultiplosCampos(dados) {
        Object.entries(dados).forEach(([campo, valor]) => {
            this.selecionarFiltro(campo, valor);
        });
    }

    // Clica no botão de busca
    clicarBuscar() {
        cy.get(searchElements.search.botaoBuscar).first().click({ force: true });
    }

    // Verifica se os filtros voltaram ao estado inicial
    verificarFiltrosPadrao() {
        const filtros = ["status", "modalidade", "uf", "municipios"];
        filtros.forEach((tipo) => {
            const seletor = searchElements.selects[tipo];
            if (seletor) {
                cy.get(seletor).invoke("val").then((val) => {
                    expect(val === "" || val === "0" || val === null).to.be.true;
                });
            }
        });
    }
}