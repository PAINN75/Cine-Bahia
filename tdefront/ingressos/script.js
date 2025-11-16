document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (!usuario) {
        alert("Você precisa estar logado!");
        window.location.href = "login.html";
        return;
    }

    const container = document.getElementById("listaIngressos");

    if (!usuario.ingressos || usuario.ingressos.length === 0) {
        container.innerHTML = "<p>Você ainda não possui ingressos.</p>";
        return;
    }

    usuario.ingressos.forEach((ingresso, index) => {
        const item = document.createElement("div");
        item.classList.add("card-ingresso");

        item.innerHTML = `
            <h3>Ingresso ${index + 1}</h3>
            <p><strong>Filme:</strong> ${ingresso.filme}</p>
            <p><strong>Data:</strong> ${ingresso.data}</p>
            <p><strong>Sala:</strong> ${ingresso.sala}</p>
            <p><strong>Horário:</strong> ${ingresso.horario}</p>
            <p><strong>Assentos:</strong> ${ingresso.assentos.join(", ")}</p>
        `;

        container.appendChild(item);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));

    const titulo = document.getElementById("titulo-ingressos");

    if (usuarioLogado && usuarioLogado.nome) {
        titulo.textContent = `Aqui estão seus ingressos, ${usuarioLogado.nome}`;
    } else {
        titulo.textContent = "Você não está logado.";
    }
});