//EXIBE ALERTA ANTES DO USUARIO DELETAR A PROPRIA CONTA
let deletaCliente = document.querySelector('#deletaCliente');

// console.log(deletaCliente);

deletaCliente.addEventListener('click', function(event){
    // console.log('CLICA DELETE')
    let deleta = confirm("Tem certeza que deseja excluir a sua conta?\nTodos os seus dados serão apagados e esta ação é irreversível!")

    if (!deleta) event.preventDefault();

});