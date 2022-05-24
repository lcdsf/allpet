

//CLIENTE CRIA AVALIACAO

if (document.querySelector('#formCriaAvaliacao') != undefined){

    let formCriaAvaliacao = document.querySelector('#formCriaAvaliacao');

    document.querySelector("#btnAvaliarProduto").addEventListener('click', function(){
        formCriaAvaliacao.style.display = 'block';
        document.querySelector("#btnAvaliarProduto").style.display = 'none';
    });
    document.querySelector('#btnCancelaAvaliacao').addEventListener('click', function(){
        formCriaAvaliacao.style.display = 'none';
        document.querySelector("#btnAvaliarProduto").style.display = 'block';
    });
}



//CLIENTE EDITA A AVALIACAO
if (document.querySelector('#formEditaAvaliacao') != undefined){

    let formAvaliacao = document.querySelector('#formEditaAvaliacao');

    document.querySelector('#editaAvaliacao').addEventListener('click', function(){
        formAvaliacao.style.display = 'block';
    });

    document.querySelector('#fechaEdicao').addEventListener('click', function(){
        formAvaliacao.style.display = 'none';
    });

    document.querySelector('#btnDeletaAvaliacao').addEventListener('click', function(event){
        let deleta = confirm("Tem certeza que deseja excluir a sua avaliação?")
        if (!deleta) event.preventDefault();
    });

}