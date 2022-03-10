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