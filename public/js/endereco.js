if (document.querySelector('#deletaendereco') !== undefined){

    let enderecos = document.querySelectorAll("#deletaendereco");

    Array.from(enderecos).forEach(end => {
        end.addEventListener('click', function(event){
            let deleta = confirm("Tem certeza que deseja excluir este endereço?")
            if (!deleta) event.preventDefault();
        });
    });


}