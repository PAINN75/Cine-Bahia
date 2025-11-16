document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
        alert(`Bem-vindo(a), ${usuario.nome}!`);
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.href = "../index.html";
    } else {
        alert("Email ou senha incorretos!");
    }
});
localStorage.setItem("usuarioLogado", JSON.stringify(usuario));