//QUANDO MARCAR RETIRADA NA LOJA, DESATIVA O INPUT DE ENDERECO ENTREGA
let selectEndereco = document.querySelector('#enderecos')
let frete = document.querySelector('#semfrete')

frete.addEventListener('change', function (){
    if (this.checked){
        selectEndereco.disabled = true;
    }else{
        selectEndereco.disabled = false;
    }
});


if (document.querySelectorAll('#removeitem') !== undefined){

    let removeItens = document.querySelectorAll('#removeitem');

    Array.from(removeItens).forEach( item => {
        item.addEventListener('click', function(event){
            let deleta = confirm("Tem certeza que deseja remover este item do carrinho?")
            if (!deleta) event.preventDefault();
        });
    });


}
