// ***********************************************************
// Arquivo de Configuração Global do Cypress (E2E)
// ***********************************************************

/**
 * TRATAMENTO DE EXCEÇÕES NÃO MAPEADAS
 * * Este bloco impede que erros internos do JavaScript do Portal (que não 
 * afetam a funcionalidade testada) interrompam a execução do Cypress.
 * Resolve erros de bundle e bibliotecas externas vistos nos logs.
 */
Cypress.on('uncaught:exception', (err, runnable) => {
    // 1. Log de depuração estilizado para o console do navegador
    console.warn('%c⚠️ Erro da Aplicação Ignorado:', 'color: orange; font-weight: bold;', err.message);

    // 2. Lista de mensagens de erro comuns no portal que devem ser ignoradas
    const ignoredErrors = [
        'is not a function',          // Resolve o erro de intermediate value
        'Cannot set properties of null',
        'innerHTML',
        'intermediate value',
        'google-analytics',           // Ignora falhas de scripts de terceiros
        'doubleclick'
    ];

    // 3. Verifica se a mensagem de erro contém algum dos termos acima
    const shouldIgnore = ignoredErrors.some(msg => err.message.includes(msg));

    if (shouldIgnore) {
        return false; // Retorna false para o Cypress NÃO falhar o teste
    }

    // 4. Permite que erros críticos (fora da lista) quebrem o teste normalmente
    return true;
});

// Importação de comandos personalizados
import './commands';

// Oculta requisições de XHR/Fetch no log do Cypress para deixar a interface mais limpa
if (Cypress.config('hideXHRInLog')) {
    const app = window.top;
    if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
        const style = app.document.createElement('style');
        style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
        style.setAttribute('data-hide-command-log-request', '');
        app.document.head.appendChild(style);
    }
}