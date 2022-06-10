//VALIDACAO CAMPOS CADASTRO PRODUTO
if (document.querySelector('#formuser') != undefined){
    let form = document.querySelector('#formuser');
    let cepInput = document.getElementById("cep");
    let ruaInput = document.getElementById("rua");
    let numeroInput = document.getElementById("numero");
    let bairroInput = document.getElementById("bairro");
    let cidadeInput = document.getElementById("cidade");


    let erro  = [];

//VALIDACAO AO DAR SUBMIT
    form.addEventListener('submit', function(e){

//VALIDACAO CAMPOS VAZIOS E DADOS
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

        if (erro.length > 0){
            e.preventDefault();
            erro = [];
        }else{
            alert('Informações enviadas com sucesso!');
        }
    })


//MUDANCA DE COR DOS INPUTS
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


}