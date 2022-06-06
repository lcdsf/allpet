//EXIBE ALERTA ANTES DO USUARIO DELETAR A PROPRIA CONTA
if (document.querySelector('#formdeletacliente') != undefined){
    let deletaCliente = document.querySelector('#formdeletacliente');

    deletaCliente.addEventListener('click', function(event){
        let deleta = confirm("Tem certeza que deseja excluir a sua conta?\nTodos os seus dados serão apagados e esta ação é irreversível!")
        if (!deleta) event.preventDefault();
    });

}