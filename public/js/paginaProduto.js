

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

//CARROSSEL FOTOS DO PRODUTO
let esq = document.querySelector('#thumbesq');
let dir = document.querySelector('#thumbdir');
let t0 = document.querySelector('#mainthumb');
let t1 = document.querySelector('#thumb1');
let t2 = document.querySelector('#thumb2');
let t3 = document.querySelector('#thumb3');
let aux;
esq.addEventListener('click', function(){
    aux = t1.attributes.src.value;
    t1.attributes.src.value = t0.attributes.src.value;
    t0.attributes.src.value = t3.attributes.src.value;
    t3.attributes.src.value = t2.attributes.src.value;
    t2.attributes.src.value = aux;

});

dir.addEventListener('click', function(){
    aux = t0.attributes.src.value;
    t0.attributes.src.value = t1.attributes.src.value;
    t1.attributes.src.value = t2.attributes.src.value;
    t2.attributes.src.value = t3.attributes.src.value;
    t3.attributes.src.value = aux;

});

//ALERTA ITEM JA ADD NO CARRINHO

// if (document.querySelector('#btnaddcart') != undefined){
//     document.querySelector('#btnaddcart').addEventListener('click', function(){
//         if (window.location.search != ""){
//             alert(decodeURIComponent(window.location.search));
//         }
//     })
// }


