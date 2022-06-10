//VALIDACAO CAMPOS CADASTRO PRODUTO
if (document.querySelector('#formuser') != undefined){
    let form = document.getElementById('formuser');
    let nomeInput = document.getElementById("nome");
    let sobrenomeInput = document.getElementById("sobrenome");
    let telInput = document.getElementById("telefone");

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

        if (telInput.value == "") {
            alert("O campo telefone deve ser preenchido")
            telInput.style.border = "2px solid red"
            telInput.style.backgroundColor = "#f5939362";
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

    telInput.addEventListener('blur', function(){
        if (telInput.value != "") {
            telInput.style.border = "2px solid green"
            telInput.style.backgroundColor = "#d0e2d0";
        }else{
            telInput.style.border = "2px solid red"
            telInput.style.backgroundColor = "#f5939362";
        }
    });

}