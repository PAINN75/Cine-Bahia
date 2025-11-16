document.getElementById("registro-form").addEventListener("submit", function(e){
    e.preventDefault();

    const nome = document.getElementById("reg-nome").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const senha = document.getElementById("reg-senha").value;
    const confirmarSenha = document.getElementById("reg-confirma-senha").value;

    if(senha !== confirmarSenha){
        alert("As senhas não estão iguais!");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.email === email);

    if(existe){
        alert("Este email já está cadastrado.");
        return;
    }
    usuarios.push({ 
        nome, 
        email, 
        senha,
        ingressos: []
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "login.html";
    this.reset();
});
