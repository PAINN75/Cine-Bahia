 document.addEventListener('DOMContentLoaded', function() {
    const datasDisponiveisDiv = document.querySelector('.datas-disponiveis');
    
    
    const NUM_DIAS_FUTUROS = 7;
    
    
    const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    
    function formatarData(data) {
        const diaSemana = diasDaSemana[data.getDay()];
        const dia = String(data.getDate()).padStart(2, '0');
        
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        
        return `${diaSemana}, ${dia}/${mes}`;
    }

    
    function gerarBotoesDeData() {
       
        datasDisponiveisDiv.innerHTML = '';
        
        const hoje = new Date();
        
        for (let i = 0; i < NUM_DIAS_FUTUROS; i++) {
            
            const dataAtual = new Date(hoje);
            
            
            dataAtual.setDate(hoje.getDate() + i);

            
            const textoBotao = formatarData(dataAtual);
            
            
            const dataISO = dataAtual.toISOString().split('T')[0];

           
            const botao = document.createElement('button');
            botao.className = 'data-btn';
            botao.setAttribute('type', 'button');
            botao.setAttribute('data-date', dataISO);
            botao.textContent = textoBotao;


            if (i === 0) {
                botao.classList.add('active');
            }


            datasDisponiveisDiv.appendChild(botao);
        }
        
        
        adicionarListenerNosBotoesDeData();
    }

    
    gerarBotoesDeData();


    function adicionarListenerNosBotoesDeData() {
        const botoes = document.querySelectorAll('.data-btn');
        botoes.forEach(botao => {
            botao.addEventListener('click', function() {
                
                
                botoes.forEach(btn => btn.classList.remove('active'));
                
                
                this.classList.add('active');
                
                
                const dataSelecionada = this.getAttribute('data-date');


                console.log('Data selecionada:', dataSelecionada);
                
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("assentosModal");
      const fecharBtn = modal.querySelector(".fechar");
      const assentosContainer = document.getElementById("assentosContainer");


      const totalAssentos = 20;
      for (let i = 1; i <= totalAssentos; i++) {
        const seat = document.createElement("div");
        seat.classList.add("assento");
        seat.textContent = i;
        seat.addEventListener("click", () => seat.classList.toggle("selecionado"));
        assentosContainer.appendChild(seat);
      }

      
      document.querySelectorAll(".horario-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          modal.style.display = "flex";
        });
      });

      
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