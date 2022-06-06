
//VALIDACAO CAMPOS CADASTRO PRODUTO
if (document.querySelector('#formuser') != undefined){
    let form = document.getElementById('formuser');
    let nomeInput = document.getElementById("nome");
    let sobrenomeInput = document.getElementById("sobrenome");
    let cpfInput = document.getElementById("cpf");
    let telInput = document.getElementById("telefone");

    let cepInput = document.getElementById("cep");
    let ruaInput = document.getElementById("rua");
    let numeroInput = document.getElementById("numero");
    let bairroInput = document.getElementById("bairro");
    let cidadeInput = document.getElementById("cidade");

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

        if (cpfInput.value == "") {
            alert("O campo CPF deve ser preenchido")
            cpfInput.style.border = "2px solid red"
            cpfInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (!Number(cpfInput.value) && cpfInput.value != "") {
            alert("O campo CPF conter apenas números")
            cpfInput.style.border = "2px solid red"
            cpfInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (telInput.value == "") {
            alert("O campo telefone deve ser preenchido")
            telInput.style.border = "2px solid red"
            telInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (cepInput.value == "") {
            alert("O campo CEP deve ser preenchido")
            cepInput.style.border = "2px solid red"
            cepInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (ruaInput.value == "") {
            alert("O campo nome da rua deve ser preenchido")
            ruaInput.style.border = "2px solid red"
            ruaInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (numeroInput.value == "") {
            alert("O campo número da rua deve ser preenchido")
            numeroInput.style.border = "2px solid red"
            numeroInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (bairroInput.value == "") {
            alert("O campo bairro deve ser preenchido")
            bairroInput.style.border = "2px solid red"
            bairroInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (cidadeInput.value == "") {
            alert("O campo cidade deve ser preenchido")
            cidadeInput.style.border = "2px solid red"
            cidadeInput.style.backgroundColor = "#f5939362";
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

    cpfInput.addEventListener('blur', function(){
        if (cpfInput.value != "" && Number(cpfInput.value)) {
            cpfInput.style.border = "2px solid green"
            cpfInput.style.backgroundColor = "#d0e2d0";
        }else{
            cpfInput.style.border = "2px solid red"
            cpfInput.style.backgroundColor = "#f5939362";
        }
    });

    telInput.addEventListener('blur', function(){
        if (telInput.value != "") {
            telInput.style.border = "2px solid green"
            telInput.style.backgroundColor = "#d0e2d0";
        }else{
            telInput.style.border = "2px solid red"
            telInput.style.backgroundColor = "#f5939362";
        }
    });

    cepInput.addEventListener('blur', function(){
        if (cepInput.value != "") {
            cepInput.style.border = "2px solid green"
            cepInput.style.backgroundColor = "#d0e2d0";
        }else{
            cepInput.style.border = "2px solid red"
            cepInput.style.backgroundColor = "#f5939362";
        }
    });

    ruaInput.addEventListener('blur', function(){
        if (ruaInput.value != "") {
            ruaInput.style.border = "2px solid green"
            ruaInput.style.backgroundColor = "#d0e2d0";
        }else{
            ruaInput.style.border = "2px solid red"
            ruaInput.style.backgroundColor = "#f5939362";
        }
    });

    numeroInput.addEventListener('blur', function(){
        if (numeroInput.value != "") {
            numeroInput.style.border = "2px solid green"
            numeroInput.style.backgroundColor = "#d0e2d0";
        }else{
            numeroInput.style.border = "2px solid red"
            numeroInput.style.backgroundColor = "#f5939362";
        }
    });

    bairroInput.addEventListener('blur', function(){
        if (bairroInput.value != "") {
            bairroInput.style.border = "2px solid green"
            bairroInput.style.backgroundColor = "#d0e2d0";
        }else{
            bairroInput.style.border = "2px solid red"
            bairroInput.style.backgroundColor = "#f5939362";
        }
    });

    cidadeInput.addEventListener('blur', function(){
        if (cidadeInput.value != "") {
            cidadeInput.style.border = "2px solid green"
            cidadeInput.style.backgroundColor = "#d0e2d0";
        }else{
            cidadeInput.style.border = "2px solid red"
            cidadeInput.style.backgroundColor = "#f5939362";
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