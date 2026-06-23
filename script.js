const senhaInput = document.getElementById('senha');
const progressoBarra = document.getElementById('progresso');
const textoStatus = document.getElementById('texto-status');

// Elementos da lista de requisitos
const reqComprimento = document.getElementById('req-comprimento');
const reqMaiuscula = document.getElementById('req-maiuscula');
const reqNumero = document.getElementById('req-numero');
const reqEspecial = document.getElementById('req-especial');

// Escuta cada tecla digitada no campo de senha
senhaInput.addEventListener('input', () => {
    const senha = senhaInput.value;
    let pontos = 0;

    // 1. Validação de Comprimento (Matemática: aumenta o tamanho L)
    if (senha.length >= 8) {
        pontos++;
        atualizarRequisito(reqComprimento, true);
    } else {
        atualizarRequisito(reqComprimento, false);
    }

    // 2. Validação de Letra Maiúscula (Aumenta o conjunto N)
    if (/[A-Z]/.test(senha)) {
        pontos++;
        atualizarRequisito(reqMaiuscula, true);
    } else {
        atualizarRequisito(reqMaiuscula, false);
    }

    // 3. Validação de Números (Aumenta o conjunto N)
    if (/[0-9]/.test(senha)) {
        pontos++;
        atualizarRequisito(reqNumero, true);
    } else {
        atualizarRequisito(reqNumero, false);
    }

    // 4. Validação de Caracteres Especiais (Aumenta drasticamente o conjunto N)
    if (/[^A-Za-z0-9]/.test(senha)) {
        pontos++;
        atualizarRequisito(reqEspecial, true);
    } else {
        atualizarRequisito(reqEspecial, false);
    }

    // Calcular e renderizar o status da força da senha
    atualizarInterface(senha, pontos);
});

// Função auxiliar para mudar a cor do texto das regras
function atualizarRequisito(elemento, valido) {
    if (valido) {
        elemento.classList.remove('invalido');
        elemento.classList.add('valido');
    } else {
        elemento.classList.remove('valido');
        elemento.classList.add('invalido');
    }
}

// Função para atualizar a barra e o texto de feedback
function atualizarInterface(senha, pontos) {
    if (senha.length === 0) {
        progressoBarra.style.width = '0%';
        textoStatus.innerHTML = 'Força: <span class="vazio">Esperando senha...</span>';
        return;
    }

    // Mapeamento de pontos para comportamento visual
    if (pontos <= 2) {
        progressoBarra.style.width = '33%';
        progressoBarra.style.backgroundColor = '#dc3545'; // Vermelho
        textoStatus.innerHTML = 'Força: <span class="fraca">Fraca (Baixa Entropia)</span>';
    } else if (pontos === 3) {
        progressoBarra.style.width = '66%';
        progressoBarra.style.backgroundColor = '#ffc107'; // Amarelo
        textoStatus.innerHTML = 'Força: <span class="media">Média (Aceitável)</span>';
    } else if (pontos === 4) {
        progressoBarra.style.width = '100%';
        progressoBarra.style.backgroundColor = '#28a745'; // Verde
        textoStatus.innerHTML = 'Força: <span class="forte">Forte (Alta Segurança!)</span>';
    }
}