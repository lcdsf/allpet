//VALIDACAO CAMPOS CADASTRO PRODUTO
if (document.querySelector('#formuser') != undefined){
    let form = document.getElementById('formuser');
    let nomeInput = document.getElementById("nome");
    let sobrenomeInput = document.getElementById("sobrenome");

    let emailInput = document.getElementById("email");
    let senhaInput = document.getElementById("senha");
    let cSenhaInput = document.getElementById("confirmaSenha");

    let erro  = [];

//VALIDACAO AO DAR SUBMIT
    form.addEventListener('submit', function(e){

//VALIDACAO CAMPOS VAZIOS E DADOS
        if (nomeInput.value == "") {
            alert("O campo nome deve ser preenchido")
            nomeInput.style.border = "2px solid red"
            nomeInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (sobrenomeInput.value == "") {
            alert("O campo sobrenome deve ser preenchido")
            sobrenomeInput.style.border = "2px solid red"
            sobrenomeInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (emailInput.value == "") {
            alert("O e-mail deve ser preenchido")
            emailInput.style.border = "2px solid red"
            emailInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (senhaInput.value == "") {
            alert("A senha deve ser inserida")
            senhaInput.style.border = "2px solid red"
            senhaInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (senhaInput.value.length < 8 && senhaInput.value != "") {
            alert("A senha deve conter pelo menos 8 caracteres")
            senhaInput.style.border = "2px solid red"
            senhaInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (cSenhaInput.value == "") {
            alert("A confirmação da senha deve ser inserida")
            cSenhaInput.style.border = "2px solid red"
            cSenhaInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }


        if (senhaInput.value != cSenhaInput.value){
            alert("As senhas não concidem")
            senhaInput.style.border = "2px solid red"
            senhaInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (cSenhaInput.value.length < 8 && cSenhaInput.value != "") {
            alert("A confirmação da senha deve conter pelo menos 8 caracteres")
            cSenhaInput.style.border = "2px solid red"
            cSenhaInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }


        if (erro.length > 0){
            e.preventDefault();
            erro = [];
        }else{
            alert('Informações enviadas com sucesso!');
        }
    })


//MUDANCA DE COR DOS INPUTS
    nomeInput.addEventListener('blur', function(){
        if (nomeInput.value != "") {
            nomeInput.style.border = "2px solid green"
            nomeInput.style.backgroundColor = "#d0e2d0";
        }else{
            nomeInput.style.border = "2px solid red"
            nomeInput.style.backgroundColor = "#f5939362";
        }
    });

    sobrenomeInput.addEventListener('blur', function(){
        if (sobrenomeInput.value != "") {
            sobrenomeInput.style.border = "2px solid green"
            sobrenomeInput.style.backgroundColor = "#d0e2d0";
        }else{
            sobrenomeInput.style.border = "2px solid red"
            sobrenomeInput.style.backgroundColor = "#f5939362";
        }
    });

    emailInput.addEventListener('blur', function(){
        if (emailInput.value != "") {
            emailInput.style.border = "2px solid green"
            emailInput.style.backgroundColor = "#d0e2d0";
        }else{
            emailInput.style.border = "2px solid red"
            emailInput.style.backgroundColor = "#f5939362";
        }
    });

    senhaInput.addEventListener('blur', function(){
        if (senhaInput.value.length >= 8) {
            senhaInput.style.border = "2px solid green"
            senhaInput.style.backgroundColor = "#d0e2d0";
        }else{
            senhaInput.style.border = "2px solid red"
            senhaInput.style.backgroundColor = "#f5939362";
        }
    });

    cSenhaInput.addEventListener('blur', function(){
        if (cSenhaInput.value.length >= 8) {
            cSenhaInput.style.border = "2px solid green"
            cSenhaInput.style.backgroundColor = "#d0e2d0";
        }else{
            cSenhaInput.style.border = "2px solid red"
            cSenhaInput.style.backgroundColor = "#f5939362";
        }
    });

}