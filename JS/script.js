/**
 * CONFIGURAÇÃO GLOBAL DE INTERAÇÃO (MODAL DE FEEDBACK)
 */

// Referências aos elementos DOM principais do formulário e do modal de feedback.
const form = document.getElementById('contact-form');
const modal = document.getElementById('feedback-modal');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.querySelector('.modal-close');

/**
 * Exibe o modal de feedback na tela com uma mensagem específica.
 * @param {string} message - A mensagem de status (sucesso ou erro) a ser exibida.
 */
function showFeedback(message) {
    modalMessage.textContent = message;
    modal.style.display = 'block'; // Define a propriedade display para exibir o modal.
}

/**
 * Oculta o modal de feedback.
 */
function hideFeedback() {
    modal.style.display = 'none'; // Define a propriedade display para ocultar o modal.
}

// Event listener para fechar o modal quando o elemento de fechamento ('x') é clicado.
modalClose.onclick = hideFeedback;

// Event listener global para fechar o modal se o clique ocorrer na área escura (backdrop) fora do conteúdo.
window.onclick = function(event) {
    if (event.target === modal) {
        hideFeedback();
    }
}

/*
 * 1. VALIDAÇÃO E SIMULAÇÃO DE ENVIO DO FORMULÁRIO DE CONTATO
 */

// Expressão regular (RegEx) para validação do formato básico de e-mail (RFC 5322 simplificado).
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Adiciona um listener para interceptar o evento de submissão do formulário.
form.addEventListener('submit', function(event) {
    // Impede o comportamento padrão de submissão (recarregamento da página) para permitir a validação via JavaScript.
    event.preventDefault();

    let isValid = true;
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    // Limpa quaisquer mensagens de erro de validação de submissões anteriores.
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // Validação de Preenchimento para o campo Nome.
    if (nome.value.trim() === '') {
        document.getElementById('nome-erro').textContent = 'O nome é obrigatório.';
        isValid = false;
    }

    // Validação de Preenchimento para o campo E-mail.
    if (email.value.trim() === '') {
        document.getElementById('email-erro').textContent = 'O e-mail é obrigatório.';
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        // Validação adicional de formato de e-mail usando a expressão regular (emailRegex).
        document.getElementById('email-erro').textContent = 'O formato do e-mail é inválido (ex: usuario@dominio.com).';
        isValid = false;
    }

    // Validação de Preenchimento para o campo Mensagem.
    if (mensagem.value.trim() === '') {
        document.getElementById('mensagem-erro').textContent = 'A mensagem é obrigatória.';
        isValid = false;
    }

    if (isValid) {
        // Bloco condicional para simulação de envio. Em um ambiente de produção, este bloco conteria a chamada AJAX/Fetch API para o endpoint do servidor.

        // Limpa os dados de todos os campos do formulário após a submissão bem-sucedida.
        form.reset();

        // Notifica o usuário sobre o status de envio (sucesso simulado) através do modal.
        showFeedback('Mensagem enviada com sucesso!');

    } else {
        // Exibe um feedback geral de erro caso a validação falhe.
        showFeedback('Por favor, preencha todos os campos corretamente.');
    }
});


/*
 * 2. INTERAÇÃO DE NAVEGAÇÃO: MENU RESPONSIVO (HAMBURGER)
 */
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Adiciona um listener para alternar a visibilidade do menu de navegação.
menuToggle.addEventListener('click', function() {
    // Alterna a classe CSS 'active' no elemento do menu. Essa classe controla a visibilidade e o estilo do menu em dispositivos móveis.
    navMenu.classList.toggle('active');
});

// Implementa funcionalidade de fechar o menu ao clicar em qualquer link de navegação (melhora a UX em mobile).
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // Verifica se o menu está visível antes de remover a classe 'active'.
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});


/*
 * 3. FUNCIONALIDADE DE TEMA: CLARO/ESCURO (DARK MODE)
 */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Recupera a preferência de tema do armazenamento local (localStorage) ou define 'light' como padrão.
const currentTheme = localStorage.getItem('theme') || 'light';

// Aplica o tema previamente salvo na inicialização da página.
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Alternar Tema: Claro';
} else {
    themeToggle.textContent = 'Alternar Tema: Escuro';
}

// Adiciona um listener ao botão de alternância de tema.
themeToggle.addEventListener('click', function() {
    // Alterna a classe CSS 'dark-mode' no elemento <body>, que aplica as regras de estilo do tema escuro.
    body.classList.toggle('dark-mode');

    let newTheme = 'light';
    if (body.classList.contains('dark-mode')) {
        newTheme = 'dark';
        themeToggle.textContent = 'Alternar Tema: Claro';
    } else {
        themeToggle.textContent = 'Alternar Tema: Escuro';
    }

    // Persiste a nova preferência de tema no localStorage para manter a escolha entre sessões.
    localStorage.setItem('theme', newTheme);
});