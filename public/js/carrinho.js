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
