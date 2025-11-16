let ingressosSelecionados = 0;
let totalPagar = 0;

// Seleciona os elementos principais da UI
const mapaAssentosContainer = document.getElementById('mapa-assentos');
const totalAssentosElement = document.getElementById('total-assentos');
const totalPagarElement = document.getElementById('total-pagar');
const btnComprar = document.getElementById('btn-comprar');

// A. Função para preencher o HTML com os dados da sessão
function preencherInfoSessao(dados) {
    document.getElementById('filme-titulo').textContent = dados.nomeFilme;
    document.getElementById('sessao-info').textContent = dados.dataHora;
    document.getElementById('preco-ingresso').textContent = dados.precoIngresso.toFixed(2);
}

// B. Função que desenha o mapa de assentos e adiciona os eventos
function renderizarMapaAssentos(dados) {
    if (!mapaAssentosContainer) return;

    mapaAssentosContainer.innerHTML = ''; // Limpa o mapa anterior

    dados.mapaAssentos.forEach((fileira, indiceFileira) => {
        const fileiraDiv = document.createElement('div');
        fileiraDiv.classList.add('fileira');
        
        const letraFileira = String.fromCharCode(65 + indiceFileira); // A=65, B=66...

        fileira.forEach((statusAssento, indiceAssento) => {
            const assento = document.createElement('div');
            assento.classList.add('assento');
            assento.dataset.fileira = letraFileira;
            assento.dataset.numero = indiceAssento + 1;
            assento.dataset.status = statusAssento; // 0, 1 ou 2

            // Aplica classes de estilo com base no status
            if (statusAssento === 1) {
                assento.classList.add('ocupado');
            } else if (statusAssento === 0) {
                assento.classList.add('livre');
                // Adiciona o evento de clique APENAS em assentos livres
                assento.addEventListener('click', selecionarAssento);
            }

            fileiraDiv.appendChild(assento);
        });
        mapaAssentosContainer.appendChild(fileiraDiv);
    });
}

// C. Lógica de clique: Selecionar/Deselecionar um assento livre
function selecionarAssento(evento) {
    const assentoClicado = evento.target;
    
    // Verifica se o assento já está selecionado
    const estaSelecionado = assentoClicado.classList.contains('selecionado');
    
    // Atualiza o Array 'mapaAssentos' (simulando o estado da sessão)
    const fileiraIndex = assentoClicado.dataset.fileira.charCodeAt(0) - 65;
    const assentoIndex = parseInt(assentoClicado.dataset.numero) - 1;

    if (estaSelecionado) {
        // DESSELECIONAR
        assentoClicado.classList.remove('selecionado');
        dadosSessao.mapaAssentos[fileiraIndex][assentoIndex] = 0; // Volta para Livre
        ingressosSelecionados--;
    } else {
        // SELECIONAR
        assentoClicado.classList.add('selecionado');
        dadosSessao.mapaAssentos[fileiraIndex][assentoIndex] = 2; // Passa para Selecionado
        ingressosSelecionados++;
    }

    // Atualiza o resumo e o botão
    atualizarResumoCompra();
}

// D. Função para atualizar o resumo de ingressos e o botão
function atualizarResumoCompra() {
    totalPagar = ingressosSelecionados * dadosSessao.precoIngresso;

    totalAssentosElement.textContent = ingressosSelecionados;
    totalPagarElement.textContent = totalPagar.toFixed(2);
    
    // Habilita o botão de compra se houver ingressos selecionados
    btnComprar.disabled = ingressosSelecionados === 0;
}

// E. Lógica de "Compra" (Simulação)
if (btnComprar) {
    btnComprar.addEventListener('click', () => {
        if (ingressosSelecionados > 0) {
            // Em um projeto real, aqui você enviaria os dados para o servidor (Firebase, etc.)
            alert(`Compra simulada com sucesso! Você reservou ${ingressosSelecionados} ingresso(s) por R$ ${totalPagar.toFixed(2)}.`);
            
            // Simula a ocupação dos assentos selecionados para evitar nova compra
            dadosSessao.mapaAssentos.forEach((fileira, i) => {
                fileira.forEach((status, j) => {
                    if (status === 2) {
                        dadosSessao.mapaAssentos[i][j] = 1; // Transforma Selecionado (2) em Ocupado (1)
                    }
                });
            });

            // Re-renderiza o mapa para mostrar os assentos como ocupados
            renderizarMapaAssentos(dadosSessao); 
            ingressosSelecionados = 0;
            atualizarResumoCompra(); // Reseta o resumo
        }
    });
}

// Chamada inicial (roda apenas se os elementos da página de compra existirem)
if (mapaAssentosContainer) {
    preencherInfoSessao(dadosSessao);
    renderizarMapaAssentos(dadosSessao);
    atualizarResumoCompra();
}