//EXIBE ALERTA ANTES DO ADMIN DELETAR PRODUTO
let deletaProduto = document.querySelector('.deletaProduto');

// console.log(deletaCliente);

deletaProduto.addEventListener('click', function(event){
    // console.log('CLICA DELETE')
    let deleta = confirm("Tem certeza que deseja excluir este produto?")

    if (!deleta) event.preventDefault();

});




if (document.querySelector("#preco") !== undefined){
    // let temp;
    let preco = document.querySelector("#preco")
    preco.addEventListener('keypress', function(event){

      
        if (preco.value.length <= 1){
            preco.value = "0.0"+preco.value;
        }
        if (preco.value.length == 4 && parseFloat(preco.value) < 0.10){
            preco.value = "0."+preco.value.slice(3,5);
        }
        if (preco.value.length == 4 && parseFloat(preco.value) < 1.00){
            preco.value = preco.value[2]+'.'+preco.value.slice(3,5);
        }
        if (preco.value.length == 4 && parseFloat(preco.value) < 10.00){
            preco.value = preco.value[0]+preco.value[2]+'.'+preco.value.slice(3,5);
        }
        if (preco.value.length == 5 && (parseFloat(preco.value) >= 10.00 && parseFloat(preco.value) < 100.00)){
            preco.value = preco.value.slice(0,2)+preco.value[3]+'.'+preco.value.slice(4,6);
        }
        if (preco.value.length == 6 && (parseFloat(preco.value) >= 100.00 && parseFloat(preco.value) < 1000.00)){
            preco.value = preco.value.slice(0, 3)+preco.value[4]+'.'+preco.value.slice(5,7);
        }
        if (preco.value.length == 7 && (parseFloat(preco.value) >= 1000.00 && parseFloat(preco.value) < 10000.00)){
            preco.value = preco.value.slice(0, 4)+preco.value[5]+'.'+preco.value.slice(6,8);
        }

        if (preco.value.length == 8 && preco.value[5] == '.'){
            alert('O valor deve ser menor que 100.000');
            event.preventDefault();
        }

    });
};



//VALIDACAO CAMPOS CADASTRO PRODUTO
if (document.querySelector('#formuser') != undefined){
    let form = document.getElementById('formuser');
    let nomeInput = document.getElementById("nome");
    let descricaoInput = document.getElementById("descricao");
    let precoInput = document.getElementById("preco");
    let qtdInput = document.getElementById("quantidade");
    let erro  = [];

//VALIDACAO AO DAR SUBMIT
    form.addEventListener('submit', function(e){
        if (nomeInput.value == "") {
            alert("O campo nome deve ser preenchido")
            nomeInput.style.border = "2px solid red"
            nomeInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (descricaoInput.value == "") {
            alert("O campo descrição deve ser preenchido")
            descricaoInput.style.border = "2px solid red"
            descricaoInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }
        
        if (precoInput.value == "") {
            alert("O campo preço deve ser preenchido")
            precoInput.style.border = "2px solid red"
            precoInput.style.backgroundColor = "#f5939362";
            erro.push(1);
        }

        if (qtdInput.value == "") {
            alert("O campo quantidade deve ser preenchido")
            qtdInput.style.border = "2px solid red"
            qtdInput.style.backgroundColor = "#f5939362";
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

    descricaoInput.addEventListener('blur', function(){
        if (descricaoInput.value != "") {
            descricaoInput.style.border = "2px solid green"
            descricaoInput.style.backgroundColor = "#d0e2d0";
        }else{
            descricaoInput.style.border = "2px solid red"
            descricaoInput.style.backgroundColor = "#f5939362";
        }
    });

    precoInput.addEventListener('blur', function(){
        if (precoInput.value != "") {
            precoInput.style.border = "2px solid green"
            precoInput.style.backgroundColor = "#d0e2d0";
        }else{
            precoInput.style.border = "2px solid red"
            precoInput.style.backgroundColor = "#f5939362";
        }
    });

    qtdInput.addEventListener('blur', function(){
        if (qtdInput.value != "") {
            qtdInput.style.border = "2px solid green"
            qtdInput.style.backgroundColor = "#d0e2d0";
        }else{
            qtdInput.style.border = "2px solid red"
            qtdInput.style.backgroundColor = "#f5939362";
        }
    });

}