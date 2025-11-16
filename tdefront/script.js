

function abrirMenu() {
    const sidebar = document.getElementById("sidebar");
    const conteudo = document.getElementById("conteudo");

    if (sidebar) {
        sidebar.style.width = "200px";
    }

    if (conteudo) {
        
        conteudo.style.marginLeft = "200px";
    }
}

function fecharMenu() {
    const sidebar = document.getElementById("sidebar");
    const conteudo = document.getElementById("conteudo");

    if (sidebar) {
        sidebar.style.width = "0";
    }

    if (conteudo) {
        
        conteudo.style.marginLeft = "0";
    }
}



document.addEventListener('DOMContentLoaded', () => {


    const carrossel = document.querySelector(".carrossel-filmes");
    const filmesCarrossel = document.querySelectorAll(".carrossel-filmes .filme");
    const btnEsquerda = document.querySelector(".seta.esquerda");
    const btnDireita = document.querySelector(".seta.direita");
    const filmeWidth = 220; 
    let scrollX = 0;
    
    
    if (carrossel && filmesCarrossel.length > 0 && btnDireita && btnEsquerda) {

        btnDireita.addEventListener("click", () => {
            const containerWidth = document.querySelector(".carrossel-container").offsetWidth;
            const totalWidth = filmesCarrossel.length * filmeWidth;

            scrollX -= filmeWidth;

            
            if (Math.abs(scrollX) >= totalWidth - containerWidth + filmeWidth) {
                scrollX = 0;
            }

            carrossel.style.transform = `translateX(${scrollX}px)`;
        });

        btnEsquerda.addEventListener("click", () => {
            const containerWidth = document.querySelector(".carrossel-container").offsetWidth;
            const totalWidth = filmesCarrossel.length * filmeWidth;

            scrollX += filmeWidth;

            
            if (scrollX > 0) {
                scrollX = -(totalWidth - containerWidth); 
            }

            carrossel.style.transform = `translateX(${scrollX}px)`;
        });
    }


    // -------------------------------------------------------------
    // 3. FERRAMENTA DE BUSCA DE FILMES (Filtro em tempo real na página filmes.html)
    // -------------------------------------------------------------
    const inputBusca = document.getElementById('campo-busca');

    if (inputBusca) {
        
        inputBusca.addEventListener('input', () => {
            
            const termoBusca = inputBusca.value.toLowerCase().trim();
            const listaFilmes = document.querySelectorAll('.filmes'); // Seleciona todos os cartões de filme
            
            listaFilmes.forEach(filme => {
                
                const tituloElemento = filme.querySelector('.fil-info h3');
                
                if (tituloElemento) {
                    const tituloFilme = tituloElemento.textContent.toLowerCase();
                    
                    const correspondeBusca = tituloFilme.includes(termoBusca);
                    
                    if (correspondeBusca) {
                        // Mostra o filme (use 'flex', 'block' ou o display correto do seu CSS)
                        filme.style.display = 'flex'; 
                    } else {
                        // Esconde o filme
                        filme.style.display = 'none';
                    }
                }
            });
        });
    }


    // -------------------------------------------------------------
    // 4. FUNCIONALIDADE DE ALTERNAR SESSÕES (Toggle de Visibilidade)
    // Mostra/Esconde as sessões ao clicar no título "Sessões Disponíveis"
    // -------------------------------------------------------------
    const titulosSessao = document.querySelectorAll('.sess h4');

    if (titulosSessao.length > 0) {
        
        titulosSessao.forEach(titulo => {
            
            titulo.addEventListener('click', () => {
                
                // Começa pelo primeiro elemento IRMÃO do h4 (o <h6>, que contém a data)
                let elementoConteudo = titulo.nextElementSibling; 

                // Loop para percorrer todos os irmãos (h6 e p) dentro da div.sess
                while (elementoConteudo) {
                    
                    // Alterna a propriedade 'display'
                    if (elementoConteudo.style.display === 'none') {
                        elementoConteudo.style.display = 'block'; // Mostra
                    } else {
                        elementoConteudo.style.display = 'none'; // Esconde
                    }

                    // Vai para o próximo elemento
                    elementoConteudo = elementoConteudo.nextElementSibling; 
                }
            });
            
            // É uma boa prática inicializar as sessões como escondidas
            // Itera novamente e esconde todos os irmãos (h6 e p)
            let irmaoInicial = titulo.nextElementSibling;
            while (irmaoInicial) {
                irmaoInicial.style.display = 'none';
                irmaoInicial = irmaoInicial.nextElementSibling;
            }
        });
    }

});
const selectFiltro = document.getElementById('filtro-genero');

if (selectFiltro) {
    
    // Adiciona o escutador de evento 'change' (quando a opção selecionada muda)
    selectFiltro.addEventListener('change', () => {
        
        // Pega o valor da opção selecionada (ex: 'crime', 'todos')
        const generoSelecionado = selectFiltro.value.toLowerCase().trim();
        
        // Seleciona todos os cartões de filme
        const listaFilmes = document.querySelectorAll('.filmes');
        
        // Percorre a lista de filmes para aplicar o filtro
        listaFilmes.forEach(filme => {
            
            // O gênero está na tag <p class="fil-extra">
            const infoExtraElemento = filme.querySelector('.fil-extra');
            
            if (infoExtraElemento) {
                // Pega todo o texto de informação extra
                const textoInfo = infoExtraElemento.textContent.toLowerCase();
                
                let deveMostrar = false;

                // 1. Caso o filtro seja "todos", mostre o filme.
                if (generoSelecionado === 'todos') {
                    deveMostrar = true;
                } 
                // 2. Caso contrário, verifica se o texto do filme inclui o gênero selecionado.
                else if (textoInfo.includes(generoSelecionado)) {
                    deveMostrar = true;
                }
                
                // Aplica a visibilidade
                if (deveMostrar) {
                    filme.style.display = 'flex'; // Mostra o filme
                } else {
                    filme.style.display = 'none'; // Esconde o filme
                }
            }
        });
        
        // IMPORTANTE: Após filtrar por categoria, garante que a barra de busca está limpa
        // para evitar conflito com a filtragem anterior por título.
        const inputBusca = document.getElementById('campo-busca');
        if (inputBusca) {
             inputBusca.value = ''; // Limpa o campo de busca
        }
    });

}