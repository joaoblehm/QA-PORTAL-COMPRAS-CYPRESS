# language: pt
@portal_compras
Funcionalidade: Filtros de Pesquisa do Portal
  Como um usuário do portal de compras
  Desejo utilizar os filtros de pesquisa simples e avançada
  Para localizar processos específicos com precisão e eficiência.

  Contexto:
    Dado que o usuário acessa a página de pesquisa pública

  @interface @regressao
  Cenário: Validar renderização e acessibilidade dos filtros iniciais
    Então os campos "Objeto", "Processo" e "Órgão" devem estar visíveis
    E o botão "BUSCAR" deve estar disponível
    E a seção "Busca Avançada" deve estar oculta inicialmente

  @busca_avancada @funcional
  Cenário: Validar abertura da busca avançada
    Quando eu clicar em "Busca Avançada"
    Então os filtros avançados devem ser exibidos

  @pesquisa_completa
  Cenário: Realizar pesquisa completa com critérios específicos
    Quando eu preencho os campos básicos:
      | objeto   | 14.07.23 Conc Tecnica Preco Propostas |
      | processo | 14.07.23 Conc Tecnica Preco Propostas |
      | orgao    | Luiz                                  |
    E eu abro a busca avançada
    E eu preencho os campos:
      | status     | Recebendo Propostas |
      | modalidade | Concorrência        |
      | realizacao | Eletrônico          |
      | julgamento | Técnica e Preço     |
      | uf         | RS                  |
   E seleciono o filtro "municipios" como "Arambaré"
    Então os filtros devem permanecer preenchidos
      | objeto     | 14.07.23 Conc Tecnica Preco Propostas |
      | municipios | Arambaré                              |
    E clico no botão buscar
    Então a API deve retornar os resultados com sucesso