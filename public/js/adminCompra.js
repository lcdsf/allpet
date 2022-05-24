

if (document.querySelector('#formeditastatus') != undefined){
    let formEdit = document.querySelector('#formeditastatus');
    

    document.querySelector('#editastatus').addEventListener('click', function(){
        formEdit.style.display = "block";
    });

    document.querySelector('#cancelaedicaostatus').addEventListener('click', function(){
        formEdit.style.display = "none";
    });

    

}

if (document.querySelector('#formaddstatus') != undefined){
    let formAddStatus = document.querySelector('#formaddstatus');

    document.querySelector("#addstatus").addEventListener('click', function(){
        formAddStatus.style.display = 'block';
    });

    document.querySelector("#cancelaaddstatus").addEventListener('click', function(){
        formAddStatus.style.display = 'none';
    });

}

if (document.querySelector("#formfinalizacompra") != undefined){

    document.querySelector("#formfinalizacompra").addEventListener('submit', function(event){
        // console.log('CLICA DELETE')
        let deleta = confirm("Tem certeza que deseja finalizar a compra?\nApós finalizar, não será mais possível editá-la.")

        if (!deleta) event.preventDefault();

    });
}