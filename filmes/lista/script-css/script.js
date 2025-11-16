 document.addEventListener('DOMContentLoaded', function() {
    const datasDisponiveisDiv = document.querySelector('.datas-disponiveis');
    
    // Define o número de dias futuros que o cinema terá sessões (ex: 7 dias)
    const NUM_DIAS_FUTUROS = 7;
    
    // Nomes dos dias da semana (para formatar a exibição)
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Função para formatar a data como "Qui, 30/Out"
    function formatarData(data) {
        const diaSemana = diasDaSemana[data.getDay()];
        const dia = String(data.getDate()).padStart(2, '0');
        // O mês em JavaScript é zero-indexado (0 = Jan, 9 = Out). Adicionamos 1.
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        
        return `${diaSemana}, ${dia}/${mes}`;
    }

    // Função principal para gerar e exibir os botões de data
    function gerarBotoesDeData() {
        // Limpa o conteúdo existente (se houver)
        datasDisponiveisDiv.innerHTML = '';
        
        const hoje = new Date();
        
        for (let i = 0; i < NUM_DIAS_FUTUROS; i++) {
            // Clona a data de hoje para cada iteração
            const dataAtual = new Date(hoje);
            
            // Adiciona 'i' dias à data
            dataAtual.setDate(hoje.getDate() + i);

            // Formata a data para ser exibida no botão
            const textoBotao = formatarData(dataAtual);
            
            // Formata a data no padrão YYYY-MM-DD para o atributo 'data-date' (usado para buscas no servidor)
            const dataISO = dataAtual.toISOString().split('T')[0];

            // Cria o elemento botão
            const botao = document.createElement('button');
            botao.className = 'data-btn';
            botao.setAttribute('type', 'button');
            botao.setAttribute('data-date', dataISO);
            botao.textContent = textoBotao;

            // Define o primeiro botão como ativo
            if (i === 0) {
                botao.classList.add('active');
            }

            // Adiciona o botão ao contêiner HTML
            datasDisponiveisDiv.appendChild(botao);
        }
        
        // APÓS GERAR OS BOTÕES: Adiciona o listener para filtrar os horários
        adicionarListenerNosBotoesDeData();
    }

    // OBLIGATÓRIO: Chamada da função para criar os botões quando a página carrega
    gerarBotoesDeData();


    // --- PRÓXIMO PASSO: Adicionar o listener para interagir com esses botões ---
    function adicionarListenerNosBotoesDeData() {
        const botoes = document.querySelectorAll('.data-btn');
        botoes.forEach(botao => {
            botao.addEventListener('click', function() {
                
                // Remove a classe 'active' de todos os botões
                botoes.forEach(btn => btn.classList.remove('active'));
                
                // Adiciona a classe 'active' ao botão clicado
                this.classList.add('active');
                
                // Captura a data selecionada para uso futuro (Busca de horários no servidor)
                const dataSelecionada = this.getAttribute('data-date');
                
                // AQUI VOCÊ CHAMARIA A FUNÇÃO QUE CARREGA OS HORÁRIOS
                // Exemplo: carregarHorarios(dataSelecionada, idDoFilme);
                
                console.log('Data selecionada:', dataSelecionada);
                // Por enquanto, o console.log mostra que a lógica funciona!
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("assentosModal");
      const fecharBtn = modal.querySelector(".fechar");
      const assentosContainer = document.getElementById("assentosContainer");

      // Cria 20 assentos disponíveis
      const totalAssentos = 20;
      for (let i = 1; i <= totalAssentos; i++) {
        const seat = document.createElement("div");
        seat.classList.add("assento");
        seat.textContent = i;
        seat.addEventListener("click", () => seat.classList.toggle("selecionado"));
        assentosContainer.appendChild(seat);
      }

      // Abre o modal ao clicar em qualquer horário
      document.querySelectorAll(".horario-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          modal.style.display = "flex";
        });
      });

      // Fecha o modal
      fecharBtn.addEventListener("click", () => modal.style.display = "none");
      window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });
    });

// Variáveis
let horarioSelecionado = null;
let salaSelecionada = null;

// horário e sala
document.querySelectorAll(".horario-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        horarioSelecionado = btn.textContent.trim();

        salaSelecionada = btn.closest(".bloco-sala")
                             .querySelector(".sala-titulo").textContent.trim();

        document.getElementById("assentosModal").style.display = "flex";
    });
});

// Assentos
document.getElementById("confirmar-assentos").addEventListener("click", () => {
    const assentos = [...document.querySelectorAll(".assento.selecionado")]
                     .map(a => a.textContent);

    if (assentos.length === 0) {
        console.log("Nenhum assento selecionado.");
        return;
    }

    salvarIngressoTemp(assentos);

    
});

//localStorage
function salvarIngressoTemp(assentos) {
    const ingressoTemp = {
        filme: document.querySelector(".filme-titulo").textContent,
        data: document.querySelector(".data-btn.active")?.dataset.date || null,
        sala: salaSelecionada,
        horario: horarioSelecionado,
        assentos: assentos
    };

     let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuarioLogado) {
        alert("Nenhum usuário logado!");
        return;
    }
    alert("Assentos confirmados:", assentos);
    usuarioLogado.ingressos.push(ingressoTemp);

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    
    localStorage.setItem("ingressoTemp", JSON.stringify(ingressoTemp));

    window.location.href = "../../index.html";
}