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


    selecionarFiltro(tipo, valor) {
        const seletor = searchElements.selects[tipo] || searchElements.search[tipo];

        if (!seletor) {
            cy.log(`⚠️ Seletor para "${tipo}" não encontrado.`);
            return;
        }

        // Se estiver selecionando UF, precisamos garantir que o município recarregue depois
        if (tipo === 'uf') {
            cy.get(seletor).select(valor, { force: true });
            // Aguarda o select de municípios ser habilitado ou atualizar (comum em portais)
            cy.get(searchElements.selects.municipios).should('not.be.disabled');
            return;
        }

        cy.get(seletor, { timeout: 15000 }).then(($el) => {
            const tagName = $el.prop("tagName").toLowerCase();

            if (tagName === "select") {
                if (tipo === "municipios") {
                    // Garante que o select não está apenas com o "Carregando..." ou vazio
                    cy.get(`${seletor} option`, { timeout: 10000 })
                        .should("have.length.gt", 1);

                    const valorFinal = valor === "Arambaré" ? "100143016" : valor;
                    cy.get(seletor).select(valorFinal, { force: true });
                } else {
                    cy.wrap($el).select(valor, { force: true });
                }
            } else {
                cy.wrap($el).clear({ force: true }).type(valor, { force: true });
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