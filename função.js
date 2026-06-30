// Captura de referências da interface do dashboard
const dashInputSenha = document.getElementById('dash-input-senha');
const dashTxtComprimento = document.getElementById('dash-txt-comprimento');
const dashBtnMenos = document.getElementById('dash-btn-menos');
const dashBtnMais = document.getElementById('dash-btn-mais');

const dashChkAlta = document.getElementById('dash-chk-alta');
const dashChkBaixa = document.getElementById('dash-chk-baixa');
const dashChkNum = document.getElementById('dash-chk-num');
const dashChkSimb = document.getElementById('dash-chk-simb');

const dashStatusBox = document.getElementById('dash-status-box');
const dashTxtNivel = document.getElementById('dash-txt-nivel');
const dashTxtInfo = document.getElementById('dash-txt-info');

// Banco de dados imutável
const baseDados = {
    alta: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    baixa: 'abcdefghijklmnopqrstuvwxyz',
    num: '0123456789',
    simb: '!@#$%&*()_+-=[]{}|'
};

let comprimentoDashboard = 12;

// Ouvintes para botões do componente stepper (+ / -)
dashBtnMenos.addEventListener('click', () => {
    if (comprimentoDashboard > 6) {
        comprimentoDashboard--;
        computarGerador();
    }
});

dashBtnMais.addEventListener('click', () => {
    if (comprimentoDashboard < 32) {
        comprimentoDashboard++;
        computarGerador();
    }
});

// Vincula alteração de estado dos seletores à re-geração instantânea
[dashChkAlta, dashChkBaixa, dashChkNum, dashChkSimb].forEach(checkbox => {
    checkbox.addEventListener('change', computarGerador);
});

// Orquestrador de processos
function computarGerador() {
    dashTxtComprimento.textContent = comprimentoDashboard;
    
    let stringConstruida = '';
    let filtrosSelecionados = 0;

    if (dashChkAlta.checked) { stringConstruida += baseDados.alta; filtrosSelecionados++; }
    if (dashChkBaixa.checked) { stringConstruida += baseDados.baixa; filtrosSelecionados++; }
    if (dashChkNum.checked) { stringConstruida += baseDados.num; filtrosSelecionados++; }
    if (dashChkSimb.checked) { stringConstruida += baseDados.simb; filtrosSelecionados++; }

    if (!stringConstruida) {
        dashInputSenha.value = '';
        dashStatusBox.className = 'dash-diagnostico';
        dashTxtNivel.textContent = 'INDEFINIDO';
        dashTxtInfo.textContent = 'Selecione um ou mais parâmetros de caracteres.';
        return;
    }

    // Processamento do sorteio posicional
    let senhaPronta = '';
    for (let i = 0; i < comprimentoDashboard; i++) {
        const indexAleatorio = Math.floor(Math.random() * stringConstruida.length);
        senhaPronta += stringConstruida.charAt(indexAleatorio);
    }

    dashInputSenha.value = senhaPronta;
    calcularResistenciaCripto(comprimentoDashboard, filtrosSelecionados);
}

// Analisador estatístico de entropia
function calcularResistenciaCripto(tamanho, modificadores) {
    dashStatusBox.className = 'dash-diagnostico'; // Reseta classes dinâmicas
    
    let pesoSeguranca = tamanho * modificadores;

    if (pesoSeguranca < 18 || tamanho < 8) {
        dashTxtNivel.textContent = 'FRACA';
        dashStatusBox.classList.add('borda-fraca');
    } else if (pesoSeguranca >= 18 && pesoSeguranca < 36) {
        dashTxtNivel.textContent = 'MÉDIA';
        dashStatusBox.classList.add('borda-media');
    } else {
        dashTxtNivel.textContent = 'FORTE';
        dashStatusBox.classList.add('borda-forte');
    }

    // Cálculo representativo simplificado para estimativa de cracking
    let combinacoes = Math.pow(modificadores * 14, tamanho);
    let diasProcessamento = Math.floor(combinacoes / 4000000000);

    if (diasProcessamento <= 1) {
        dashTxtInfo.textContent = 'Vulnerabilidade alta. Quebra estimada em menos de 24 horas por ataque de dicionário.';
    } else {
        dashTxtInfo.textContent = `Complexidade aceitável. Barreira de segurança estimada em cerca de ${diasProcessamento.toLocaleString('pt-BR')} dias contra ataques automatizados.`;
    }
}

// Inicializa a rotina operacional
computarGerador();
