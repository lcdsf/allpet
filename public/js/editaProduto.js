//EXIBE ALERTA ANTES DO ADMIN DELETAR PRODUTO
let deletaProduto = document.querySelector('.deletaProduto');

// console.log(deletaCliente);

deletaProduto.addEventListener('click', function(event){
    // console.log('CLICA DELETE')
    let deleta = confirm("Tem certeza que deseja excluir este produto?")

    if (!deleta) event.preventDefault();

});