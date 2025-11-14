// script.js
const palavras = ["javascript", "programacao", "forca", "html", "css", "desenvolvedor", "amendoim", "alambique", "asterisco", "bicarbonato", "marimbondo", "meteorologia", "psicologo", "universidade", "ventilador", "xadrez", "ziguezague", "camuflagem", "ornitologia", "pneumologia"];
let palavraSelecionada = "";
let letrasCorretas = [];
let letrasChutadas = [];
let tentativasRestantes = 6;

const canvas = document.getElementById('forcaCanvas');
const ctx = canvas.getContext('2d');

const palavraContainer = document.getElementById('palavraContainer');
const letrasChutadasSpan = document.getElementById('letrasChutadas');
const mensagem = document.getElementById('mensagem');
const letraInput = document.getElementById('letraInput');
const btnChutar = document.getElementById('btnChutar');
const btnReiniciar = document.getElementById('btnReiniciar');

// Inicializa o jogo
function iniciarJogo() {
    palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
    letrasCorretas = Array(palavraSelecionada.length).fill('_');
    letrasChutadas = [];
    tentativasRestantes = 6;
    mensagem.textContent = "";
    atualizarPalavra();
    atualizarLetrasChutadas();
    limparCanvas();
    desenharForcaBase();
    letraInput.value = "";
    letraInput.disabled = false;
    btnChutar.disabled = false;
    letraInput.focus();
}

// Atualiza a exibição da palavra com letras corretas e underlines
function atualizarPalavra() {
    palavraContainer.textContent = letrasCorretas.join(' ');
}

// Atualiza a lista de letras chutadas
function atualizarLetrasChutadas() {
    letrasChutadasSpan.textContent = letrasChutadas.join(', ');
}

// Evento de chute de letra
function chutarLetra() {
    let letra = letraInput.value.toLowerCase();
    letraInput.value = "";

    if (!letra || letra.length !== 1 || !letra.match(/[a-z]/i)) {
        mensagem.textContent = "Digite uma letra válida.";
        return;
    }

    if (letrasChutadas.includes(letra)) {
        mensagem.textContent = `Você já chutou a letra "${letra}".`;
        return;
    }

    letrasChutadas.push(letra);

    if (palavraSelecionada.includes(letra)) {
        // Atualiza letras corretas
        for (let i = 0; i < palavraSelecionada.length; i++) {
            if (palavraSelecionada[i] === letra) {
                letrasCorretas[i] = letra;
            }
        }
        mensagem.textContent = "Acertou!";
    } else {
        tentativasRestantes--;
        mensagem.textContent = `Errou! Tentativas restantes: ${tentativasRestantes}`;
        desenharForca();
    }

    atualizarPalavra();
    atualizarLetrasChutadas();
    verificarFimJogo();
    letraInput.focus();
}

// Verifica se o jogo terminou
function verificarFimJogo() {
    if (!letrasCorretas.includes('_')) {
        mensagem.textContent = "Parabéns, você ganhou!";
        letraInput.disabled = true;
        btnChutar.disabled = true;
    } else if (tentativasRestantes === 0) {
        mensagem.textContent = `Fim de jogo! A palavra era "${palavraSelecionada}".`;
        atualizarPalavraCompleta();
        letraInput.disabled = true;
        btnChutar.disabled = true;
    }
}

// Revela a palavra completa quando o jogo termina
function atualizarPalavraCompleta() {
    letrasCorretas = palavraSelecionada.split('');
    atualizarPalavra();
}

// Funções para desenhar a forca na canvas:

function limparCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function desenharForcaBase() {
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000";
    // Base
    ctx.beginPath();
    ctx.moveTo(10, 240);
    ctx.lineTo(190, 240);
    ctx.stroke();
    // Poste vertical
    ctx.beginPath();
    ctx.moveTo(40, 240);
    ctx.lineTo(40, 20);
    ctx.stroke();
    // Poste horizontal
    ctx.beginPath();
    ctx.moveTo(40, 20);
    ctx.lineTo(120, 20);
    ctx.stroke();
    // Corda
    ctx.beginPath();
    ctx.moveTo(120, 20);
    ctx.lineTo(120, 40);
    ctx.stroke();
}

function desenharForca() {
    switch (tentativasRestantes) {
        case 5: // Cabeça
            ctx.beginPath();
            ctx.arc(120, 60, 20, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 4: // Corpo
            ctx.beginPath();
            ctx.moveTo(120, 80);
            ctx.lineTo(120, 140);
            ctx.stroke();
            break;
        case 3: // Braço direito
            ctx.beginPath();
            ctx.moveTo(120, 90);
            ctx.lineTo(150, 110);
            ctx.stroke();
            break;
        case 2: // Braço esquerdo
            ctx.beginPath();
            ctx.moveTo(120, 90);
            ctx.lineTo(90, 110);
            ctx.stroke();
            break;
        case 1: // Perna direita
            ctx.beginPath();
            ctx.moveTo(120, 140);
            ctx.lineTo(150, 180);
            ctx.stroke();
            break;
        case 0: // Perna esquerda
            ctx.beginPath();
            ctx.moveTo(120, 140);
            ctx.lineTo(90, 180);
            ctx.stroke();
            break;
    }
}

btnChutar.addEventListener('click', chutarLetra);
letraInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        chutarLetra();
    }
});
btnReiniciar.addEventListener('click', iniciarJogo);

iniciarJogo();
