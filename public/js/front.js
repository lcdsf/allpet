console.log('JS FRONT...') 

//console.log(encodeURI(window.location.search))
 
  function mostraMenuLateral(){
        var menu = document.getElementById("menulateral");

        if (menu.style.display === "none"){
            menu.style.display = "flex";
        }else{
            menu.style.display = "none";
        }
    }

    function mostraTelaLogCad(){
        var tela = document.getElementById("telalogcad");

        if (tela.style.display === "none"){
            tela.style.display = "block";
        }else{
            tela.style.display = "none";
        }
    }



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
